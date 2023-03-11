import classNames from "classnames";
import { __, _n, sprintf } from "@wordpress/i18n";
import { select } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import { SelectControl, PanelBody, ToolbarButton, ToolbarGroup } from "@wordpress/components";
import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	__experimentalGetGradientClass as getGradientClass,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
} from "@wordpress/block-editor";

import { createHigherOrderComponent } from "@wordpress/compose";

import { toNumber, BOOTSTRAP_ICON_CLASSES } from "../../_common";

import { PanelBackgroundImage } from "../../components/panel-background-image";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BlockFlexItemAlignmentToolbar } from "../../components/alignment";
import { ResponsiveTabs } from "../../components/responsive-tabs";
import { columnClassNames, columnInnerClassNames } from "./render";

import ExpandIcon from "./expand-contents.svg";

const { config } = gutestrapGlobal;

export const COLUMN_OPTION_WIDTH_FIT_VALUE = "auto";
export const COLUMN_OPTION_WIDTH_DEFAULT_VALUE = "default";
export const COLUMN_OPTION_INHERIT_VALUE = "inherit";

export const COLUMN_SPECIAL_OPTIONS = [
	COLUMN_OPTION_WIDTH_FIT_VALUE,
	COLUMN_OPTION_WIDTH_DEFAULT_VALUE,
	COLUMN_OPTION_INHERIT_VALUE,
];

const INHERIT_OPTION = {
	label: __("Inherit from smaller (default)", "gutestrap"),
	value: COLUMN_OPTION_INHERIT_VALUE,
};

function generateColumnOptions(gridCols) {
	const columnsCount = Math.max(1, gridCols);
	const offsets = [INHERIT_OPTION];
	const widths = [
		INHERIT_OPTION,
		{
			label: __("Default width from row", "gutestrap"),
			value: COLUMN_OPTION_WIDTH_DEFAULT_VALUE,
		},
		{
			label: __("Fit content", "gutestrap"),
			value: COLUMN_OPTION_WIDTH_FIT_VALUE,
		},
	];

	for (let count = 1; count <= columnsCount; count++) {
		const offset = count - 1;
		offsets.push({
			value: offset,
			label: offset
				? sprintf(_n("%d column", "%d columns", offset, "gutestrap"), offset)
				: __("No offset", "gutestrap"),
		});
		widths.push({
			value: count,
			label: sprintf(_n("%d column", "%d columns", count, "gutestrap"), count),
		});
	}
	return { widths, offsets };
}

const { widths: COL_WIDTH_OPTIONS, offsets: COL_OFFSET_OPTIONS } = generateColumnOptions(12);

const COL_ALIGN_OPTIONS = [
	{
		label: __("Top", "gutestrap"),
		value: "start",
	},
	{
		label: __("Center", "gutestrap"),
		value: "center",
	},
	{
		label: __("Bottom", "gutestrap"),
		value: "end",
	},
	{
		label: __("Baseline", "gutestrap"),
		value: "baseline",
	},
	{
		label: __("Stretch to fit", "gutestrap"),
		value: "stretch",
	},
];

const COL_CONTENT_ALIGN_OPTIONS = [
	{
		label: __("Stretch to fit", "gutestrap"),
		value: "stretch stretch",
	},
	{
		label: __("Top left", "gutestrap"),
		value: "top left",
	},
	{
		label: __("Top centre", "gutestrap"),
		value: "top center",
	},
	{
		label: __("Top right", "gutestrap"),
		value: "top right",
	},
	{
		label: __("Centre left", "gutestrap"),
		value: "center left",
	},
	{
		label: __("Centre", "gutestrap"),
		value: "center center",
	},
	{
		label: __("Centre right", "gutestrap"),
		value: "center right",
	},
	{
		label: __("Bottom left", "gutestrap"),
		value: "bottom left",
	},
	{
		label: __("Bottom centre", "gutestrap"),
		value: "bottom center",
	},
	{
		label: __("Bottom right", "gutestrap"),
		value: "bottom right",
	},
];
/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Component.
 */
function ColumnEdit(props) {
	const { attributes, className, setAttributes, clientId, textColor, backgroundColor } = props;

	const {
		anchor = "",
		width = {},
		offset = {},
		alignment = {},
		background = {},
		gradient,
		style = {},
		contentAlignment = {},
	} = attributes;

	contentAlignment.xs = contentAlignment.xs || "stretch stretch";

	const { spacing = {}, color = {} } = style;

	const { padding, margin } = spacing;

	const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;
	let backgroundImageCSS = "";
	if (background?.image?.url) {
		backgroundImageCSS += `url(${background.image.url})`;
	}
	if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
		if (backgroundImageCSS) backgroundImageCSS += ", ";
		backgroundImageCSS += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
	} else if (customGradient) {
		backgroundImageCSS = customGradient;
	}

	return (
		<Fragment>
			<InspectorControls>
				<ResponsiveTabs
					hasNotification={(bp) => {
						if (bp === "xs") return false;
						return (
							(width[bp] && width[bp] !== COLUMN_OPTION_INHERIT_VALUE) ||
							(offset[bp] && offset[bp] !== COLUMN_OPTION_INHERIT_VALUE) ||
							(alignment[bp] && alignment[bp] !== COLUMN_OPTION_INHERIT_VALUE) ||
							(contentAlignment[bp] && contentAlignment[bp] !== COLUMN_OPTION_INHERIT_VALUE)
						);
					}}
				>
					{(tab) => {
						const { breakpoint, label } = tab;
						const canInherit = breakpoint !== "xs";

						const fallbacks = {
							width: canInherit ? COLUMN_OPTION_INHERIT_VALUE : COLUMN_OPTION_WIDTH_DEFAULT_VALUE,
							offset: canInherit ? COLUMN_OPTION_INHERIT_VALUE : 0,
							alignment: COLUMN_OPTION_INHERIT_VALUE,
							contentAlignment: canInherit ? COLUMN_OPTION_INHERIT_VALUE : "stretch stretch",
						};

						switch (breakpoint) {
							case "xs":
								fallbacks.width = 12;
								break;
							default:
								fallbacks.width = COLUMN_OPTION_INHERIT_VALUE;
								break;
						}

						return (
							<PanelBody>
								<p>{`${label} layout`}</p>
								<SelectControl
									label={__("Width", "gutestrap")}
									options={canInherit ? COL_WIDTH_OPTIONS : COL_WIDTH_OPTIONS.slice(1)}
									value={width[breakpoint] != null ? width[breakpoint] : fallbacks.width}
									onChange={(value) => {
										width[breakpoint] = COLUMN_SPECIAL_OPTIONS.includes(value) ? value : toNumber(value);
										setAttributes({ width: { ...width } });
									}}
								/>
								<SelectControl
									label={__("Offset", "gutestrap")}
									options={canInherit ? COL_OFFSET_OPTIONS : COL_OFFSET_OPTIONS.slice(1)}
									value={offset[breakpoint] != null ? offset[breakpoint] : fallbacks.offset}
									onChange={(value) => {
										offset[breakpoint] = value === COLUMN_OPTION_INHERIT_VALUE ? value : toNumber(value);
										setAttributes({ offset: { ...offset } });
									}}
								/>
								<SelectControl
									label={__("Column alignment", "gutestrap")}
									options={[
										canInherit
											? INHERIT_OPTION
											: {
													label: __("Default alignment from row", "gutestrap"),
													value: COLUMN_OPTION_INHERIT_VALUE,
											  },
										...COL_ALIGN_OPTIONS,
									]}
									value={alignment[breakpoint] != null ? alignment[breakpoint] : fallbacks.alignment}
									onChange={(value) => {
										alignment[breakpoint] = value;
										setAttributes({ alignment: { ...alignment } });
									}}
									help={__("Align the column within the row.", "gutestrap")}
								/>
								<SelectControl
									label={__("Content Alignment", "gutestrap")}
									options={canInherit ? [INHERIT_OPTION, ...COL_CONTENT_ALIGN_OPTIONS] : COL_CONTENT_ALIGN_OPTIONS}
									value={
										contentAlignment[breakpoint] != null ? contentAlignment[breakpoint] : fallbacks.contentAlignment
									}
									onChange={(value) => {
										contentAlignment[breakpoint] = value;
										setAttributes({ contentAlignment: { ...contentAlignment } });
									}}
									help={__("Align content within the column.", "gutestrap")}
								/>
							</PanelBody>
						);
					}}
				</ResponsiveTabs>
				<PanelBackgroundImage
					value={background}
					onChange={(value) => {
						setAttributes({ background: value });
					}}
					initialOpen={!!background.image}
				/>
			</InspectorControls>
			<BlockControls>
				<BlockFlexItemAlignmentToolbar
					label={__("column", "gutestrap")}
					value={alignment.xs}
					onChange={(value) => {
						alignment.xs = value;
						setAttributes({ alignment: { ...alignment } });
					}}
				/>
				<ToolbarGroup>
					<ToolbarButton
						showTooltip={true}
						label={__("Expand contents to fit", "gutestrap")}
						isPressed={contentAlignment.xs === "stretch stretch"}
						onClick={() => {
							contentAlignment.xs = contentAlignment.xs === "stretch stretch" ? "top left" : "stretch stretch";
							setAttributes({ contentAlignment: { ...contentAlignment } });
						}}
						icon={() => <ExpandIcon className={BOOTSTRAP_ICON_CLASSES} />}
					/>
				</ToolbarGroup>
				<BlockAlignmentMatrixControl
					label={__("Change content alignment", "gutestrap")}
					value={contentAlignment.xs}
					onChange={(value) => {
						contentAlignment.xs = value;
						setAttributes({ contentAlignment: { ...contentAlignment } });
					}}
				/>
			</BlockControls>
			<div
				id={anchor || null}
				className={classNames(className, columnInnerClassNames(attributes), {
					"has-text-color": textColor?.color || customTextColor,
					[textColor?.class]: textColor?.class,
					"has-background":
						backgroundColor?.color || customBackgroundColor || backgroundImageCSS || gradient || customGradient,
					[backgroundColor?.class]: backgroundColor?.class,
					[getGradientClass(gradient)]: gradient,
				})}
				style={{
					backgroundImage: backgroundImageCSS || null,
					backgroundPosition: background?.position || "center center",
					backgroundSize: background?.size || "cover",
					backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
					paddingTop: padding?.top,
					paddingRight: padding?.right,
					paddingBottom: padding?.bottom,
					paddingLeft: padding?.left,
					marginTop: margin?.top,
					marginBottom: margin?.bottom,
					color: textColor?.color || customTextColor,
					backgroundColor: backgroundColor?.color || customBackgroundColor,
				}}
			>
				<div className="col__content">
					<InnerBlocks
						template={[["core/paragraph"]]}
						renderAppender={() => {
							const block = select("core/block-editor").getBlock(clientId);
							return (
								<Fragment>
									<BlockControlsBlockAppender rootClientId={clientId} />
									{!block?.innerBlocks?.length ? <InnerBlocks.ButtonBlockAppender /> : null}
								</Fragment>
							);
						}}
					/>
				</div>
			</div>
		</Fragment>
	);
}

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-column-block-list-block-classes",
	createHigherOrderComponent((BlockListBlock) => {
		/**
		 * @arg {Object} props - Props.
		 * @arg {Object} props.attributes - Block attributes.
		 * @arg {Object} props.block - Block properties.
		 * @arg {string} props.block.name - Block name.
		 * @returns {*} JSX
		 */
		const gutestrapColumnBlockListBlockClasses = ({ className, ...props }) => {
			const { attributes, block, clientId } = props;
			const extraClasses = [];
			if (block.name === "gutestrap/col") {
				const _block = select("core/block-editor").getBlock(clientId);
				if (_block?.innerBlocks?.length) {
					extraClasses.push("has-inner-blocks");
				}
				extraClasses.push(columnClassNames(attributes));
			}
			className = classNames(className, ...extraClasses);
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapColumnBlockListBlockClasses;
	}, "withGutestrapColumnBlockListBlockClasses")
);

export { ColumnEdit };
export default ColumnEdit;

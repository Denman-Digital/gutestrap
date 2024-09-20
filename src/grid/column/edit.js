import classNames from "classnames";
import { __, _n, sprintf } from "@wordpress/i18n";
import { select } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";
import {
	InspectorControls,
	InnerBlocks,
	getColorClassName,
	useBlockProps,
	__experimentalGetGradientClass as getGradientClass,
} from "@wordpress/block-editor";

import { createHigherOrderComponent } from "@wordpress/compose";

import { toNumber } from "../../_common";

import { PanelBackgroundImage } from "../../components/panel-background-image";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BreakpointTabs } from "../../components/responsive-tabs";
import { columnClassNames, columnInnerClassNames, stripColClassNames } from "./render";

import { RichSelect } from "../../components/rich-select";

import WidthIcon from "./width.svg";
import OffsetAltIcon from "./offset.svg";

import AlignSelfNoneIcon from "../../components/alignment/align-self-none.svg";
import AlignSelfBaselineIcon from "../../components/alignment/align-self-baseline.svg";
import AlignSelfStretchIcon from "../../components/alignment/align-self-stretch.svg";
import AlignSelfTopIcon from "../../components/alignment/align-self-top.svg";
import AlignSelfCenterIcon from "../../components/alignment/align-self-middle.svg";
import AlignSelfBottomIcon from "../../components/alignment/align-self-bottom.svg";

import AlignWithinStretchIcon from "../../components/alignment/align-within-stretch.svg";
import AlignWithinBottomIcon from "../../components/alignment/align-within-bottom.svg";
import AlignWithinBottomRightIcon from "../../components/alignment/align-within-bottom-right.svg";
import AlignWithinBottomLeftIcon from "../../components/alignment/align-within-bottom-left.svg";
import AlignWithinTopIcon from "../../components/alignment/align-within-top.svg";
import AlignWithinTopRightIcon from "../../components/alignment/align-within-top-right.svg";
import AlignWithinTopLeftIcon from "../../components/alignment/align-within-top-left.svg";
import AlignWithinCenterIcon from "../../components/alignment/align-within-center.svg";
import AlignWithinLeftIcon from "../../components/alignment/align-within-left.svg";
import AlignWithinRightIcon from "../../components/alignment/align-within-right.svg";

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
			label: __("1 unit", "gutestrap"),
			icon: WidthIcon,
			value: 1,
		},
		{
			label: __("2 units", "gutestrap"),
			icon: WidthIcon,
			value: 2,
		},
		{
			label: __("3 units (1/4 width)", "gutestrap"),
			icon: WidthIcon,
			value: 3,
		},
		{
			label: __("4 units (1/3 width)", "gutestrap"),
			icon: WidthIcon,
			value: 4,
		},
		{
			label: __("5 units", "gutestrap"),
			icon: WidthIcon,
			value: 5,
		},
		{
			label: __("6 units (1/2 width)", "gutestrap"),
			icon: WidthIcon,
			value: 6,
		},
		{
			label: __("7 units", "gutestrap"),
			icon: WidthIcon,
			value: 7,
		},
		{
			label: __("8 units (2/3 width)", "gutestrap"),
			icon: WidthIcon,
			value: 8,
		},
		{
			label: __("9 units (3/4 width)", "gutestrap"),
			icon: WidthIcon,
			value: 9,
		},
		{
			label: __("10 units", "gutestrap"),
			icon: WidthIcon,
			value: 10,
		},
		{
			label: __("11 units", "gutestrap"),
			icon: WidthIcon,
			value: 11,
		},
		{
			label: __("12 units (full width)", "gutestrap"),
			icon: WidthIcon,
			value: 12,
		},
		{
			label: __("Expand to fill row", "gutestrap"),
			icon: WidthIcon,
			value: COLUMN_OPTION_WIDTH_DEFAULT_VALUE,
		},
		{
			label: __("Shrink to fit content", "gutestrap"),
			icon: WidthIcon,
			value: COLUMN_OPTION_WIDTH_FIT_VALUE,
		},
	];

	for (let count = 1; count <= columnsCount; count++) {
		const offset = count - 1;
		offsets.push({
			value: offset,
			icon: OffsetAltIcon,
			label: offset ? sprintf(_n("%d unit", "%d units", offset, "gutestrap"), offset) : __("No offset", "gutestrap"),
		});
		// widths.push({
		// 	value: count,
		// 	icon: WidthIcon,
		// 	label: sprintf(_n("%d column", "%d columns", count, "gutestrap"), count),
		// });
	}
	return { widths, offsets };
}

const { widths: COL_WIDTH_OPTIONS, offsets: COL_OFFSET_OPTIONS } = generateColumnOptions(12);

const COL_ALIGN_OPTIONS = [
	{
		label: __("Top", "gutestrap"),
		icon: AlignSelfTopIcon,
		value: "start",
	},
	{
		label: __("Centre", "gutestrap"),
		icon: AlignSelfCenterIcon,
		value: "center",
	},
	{
		label: __("Bottom", "gutestrap"),
		icon: AlignSelfBottomIcon,
		value: "end",
	},
	{
		label: __("Baseline", "gutestrap"),
		icon: AlignSelfBaselineIcon,
		value: "baseline",
	},
	{
		label: __("Stretch to fill", "gutestrap"),
		icon: AlignSelfStretchIcon,
		value: "stretch",
	},
];

const COL_CONTENT_ALIGN_OPTIONS = [
	{
		label: __("Stretch to fill", "gutestrap"),
		icon: AlignWithinStretchIcon,
		value: "stretch stretch",
	},
	{
		label: __("Top left", "gutestrap"),
		icon: AlignWithinTopLeftIcon,
		value: "top left",
	},
	{
		label: __("Top centre", "gutestrap"),
		icon: AlignWithinTopIcon,
		value: "top center",
	},
	{
		label: __("Top right", "gutestrap"),
		icon: AlignWithinTopRightIcon,
		value: "top right",
	},
	{
		label: __("Centre left", "gutestrap"),
		icon: AlignWithinLeftIcon,
		value: "center left",
	},
	{
		label: __("Centre", "gutestrap"),
		icon: AlignWithinCenterIcon,
		value: "center center",
	},
	{
		label: __("Centre right", "gutestrap"),
		icon: AlignWithinRightIcon,
		value: "center right",
	},
	{
		label: __("Bottom left", "gutestrap"),
		icon: AlignWithinBottomLeftIcon,
		value: "bottom left",
	},
	{
		label: __("Bottom centre", "gutestrap"),
		icon: AlignWithinBottomIcon,
		value: "bottom center",
	},
	{
		label: __("Bottom right", "gutestrap"),
		icon: AlignWithinBottomRightIcon,
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
	const { attributes, setAttributes, clientId } = props;

	if (attributes._isExample) {
		return (
			<div>
				<InnerBlocks />
			</div>
		);
	}

	const {
		anchor,
		width = {},
		offset = {},
		alignment = {},
		background = {},
		textColor,
		backgroundColor,
		gradient,
		style = {},
		contentAlignment = {},
		className,
	} = attributes;

	const blockProps = useBlockProps({
		id: anchor,
		className: classNames(stripColClassNames(className), columnClassNames(attributes), {
			"has-min-height": !!style.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(style.dimensions.minHeight),
		}),
	});
	/** @type {CSSStyleDeclaration} */
	let innerStyle = {};

	if (blockProps.style) {
		const { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight } = blockProps.style;
		innerStyle = { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight };
		delete blockProps.style.paddingTop;
		delete blockProps.style.paddingRight;
		delete blockProps.style.paddingBottom;
		delete blockProps.style.paddingLeft;
		delete blockProps.style.color;
		delete blockProps.style.backgroundColor;
		delete blockProps.style.minHeight;
	}

	contentAlignment.xs = contentAlignment.xs || "stretch stretch";

	const { color = {} } = style;

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

	// const [currentBreakpoint, setCurrentBreakpoint] = useState("md");
	return (
		<Fragment>
			<div {...blockProps}>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						[getColorClassName("color", textColor)]: textColor,
						"has-background":
							backgroundColor || customBackgroundColor || backgroundImageCSS || gradient || customGradient,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getGradientClass(gradient)]: gradient,
					})}
					style={{
						...innerStyle,
						backgroundImage: backgroundImageCSS || null,
						backgroundPosition: background?.position || "center center",
						backgroundSize: background?.size || "cover",
						backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
						color: customTextColor,
						backgroundColor: customBackgroundColor,
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
			</div>
			<InspectorControls>
				<BreakpointTabs
					// onBreakpointChange={setCurrentBreakpoint}
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
								<p>{label}</p>
								<RichSelect
									label={__("Width", "gutestrap")}
									noIcons={true}
									options={canInherit ? COL_WIDTH_OPTIONS : COL_WIDTH_OPTIONS.slice(1)}
									value={width[breakpoint] != null ? width[breakpoint] : fallbacks.width}
									onChange={(value) => {
										setAttributes({
											width: {
												...width,
												[breakpoint]: COLUMN_SPECIAL_OPTIONS.includes(value) ? value : toNumber(value),
											},
										});
									}}
								/>
								<RichSelect
									noIcons={true}
									label={__("Offset", "gutestrap")}
									options={canInherit ? COL_OFFSET_OPTIONS : COL_OFFSET_OPTIONS.slice(1)}
									value={offset[breakpoint] != null ? offset[breakpoint] : fallbacks.offset}
									onChange={(value) => {
										setAttributes({
											offset: {
												...offset,
												[breakpoint]: value === COLUMN_OPTION_INHERIT_VALUE ? value : toNumber(value),
											},
										});
									}}
								/>
								<RichSelect
									label={__("Vertical Alignment", "gutestrap")}
									options={[
										canInherit
											? INHERIT_OPTION
											: {
													label: __("Default alignment from row", "gutestrap"),
													icon: AlignSelfNoneIcon,
													value: COLUMN_OPTION_INHERIT_VALUE,
											  },
										...COL_ALIGN_OPTIONS,
									]}
									value={alignment[breakpoint] != null ? alignment[breakpoint] : fallbacks.alignment}
									onChange={(value) => {
										setAttributes({ alignment: { ...alignment, [breakpoint]: value } });
									}}
									help={__("Vertically align the column within the row.", "gutestrap")}
								/>
								<RichSelect
									label={__("Content Alignment", "gutestrap")}
									noIcons={true}
									options={canInherit ? [INHERIT_OPTION, ...COL_CONTENT_ALIGN_OPTIONS] : COL_CONTENT_ALIGN_OPTIONS}
									value={
										contentAlignment[breakpoint] != null ? contentAlignment[breakpoint] : fallbacks.contentAlignment
									}
									onChange={(value) => {
										setAttributes({ contentAlignment: { ...contentAlignment, [breakpoint]: value } });
									}}
									help={__("Align content within the column.", "gutestrap")}
								/>
							</PanelBody>
						);
					}}
				</BreakpointTabs>
				<PanelBackgroundImage
					value={background}
					onChange={(value) => {
						setAttributes({ background: value });
					}}
					initialOpen={!!background.image}
				/>
			</InspectorControls>
		</Fragment>
	);
}

wp.hooks.addFilter(
	"blocks.getBlockAttributes",
	"gutestrap/col/filter-block-attributes",
	/**
	 *
	 * @param {Object} blockAttributes Parsed attributes.
	 * @param {Object} blockType Block metadata.
	 * @param {string} _innerHTML Saved content.
	 * @param {Object} _knownAttributes Attributes from delimiters.
	 * @returns {Object} Parsed attributes.
	 */
	function filterColBlockAttributes(blockAttributes, blockType, _innerHTML, _knownAttributes) {
		if (blockType.name === "gutestrap/col" && blockAttributes.className) {
			blockAttributes.className = stripColClassNames(blockAttributes.className);
		}
		return blockAttributes;
	}
);

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-column-block-list-block-classes",
	createHigherOrderComponent((BlockListBlock) => {
		return function ({ className, ...props }) {
			const { block, clientId } = props;
			if (block.name === "gutestrap/col") {
				const _block = select("core/block-editor").getBlock(clientId);
				if (_block?.innerBlocks?.length) {
					className = classNames(className, ["has-inner-blocks"]);
				}
			}
			return <BlockListBlock {...props} className={className} />;
		};
	}, "withGutestrapColumnBlockListBlockClasses")
);

export { ColumnEdit };
export default ColumnEdit;

/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __, _n, _x } from "@wordpress/i18n";
import { sprintf } from "sprintf-js";
import classNames from "classnames";
import { select } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import { SelectControl, PanelBody } from "@wordpress/components";
import { InspectorControls, InnerBlocks, BlockControls, PanelColorSettings, withColors } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";

// import { toNumber } from "js-utils";
function toNumber(value, fallback = 0) {
	const number = Number(value);
	if (isNaN(number)) {
		return toNumber(fallback);
	}
	return number;
}

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { PanelBackgroundImage } from "../../components/panel-background-image";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BlockFlexItemAlignmentToolbar } from "../../components/alignment/flex-items-alignment";
import { ResponsiveTabs } from "../../components/responsive-tabs";
import { columnClassNames } from "./render";

export const COLUMN_OPTION_WIDTH_FIT_VALUE = "auto";
export const COLUMN_OPTION_WIDTH_DEFAULT_VALUE = "default";
export const COLUMN_OPTION_INHERIT_VALUE = "inherit";

const INHERIT_OPTION = {
	label: __("Inherit from smaller (default)", GUTESTRAP_TEXT_DOMAIN),
	value: COLUMN_OPTION_INHERIT_VALUE,
};

function generateColumnOptions(gridCols) {
	const columnsCount = Math.max(1, gridCols);
	const offsets = [INHERIT_OPTION];
	const widths = [
		INHERIT_OPTION,
		{
			label: __("Default width from row", GUTESTRAP_TEXT_DOMAIN),
			value: COLUMN_OPTION_WIDTH_DEFAULT_VALUE,
		},
		{
			label: __("Fit content", GUTESTRAP_TEXT_DOMAIN),
			value: COLUMN_OPTION_WIDTH_FIT_VALUE,
		},
	];

	for (let count = 1; count <= columnsCount; count++) {
		const offset = count - 1;
		offsets.push({
			value: offset,
			label: offset
				? sprintf(_n("%d column", "%d columns", offset, GUTESTRAP_TEXT_DOMAIN), offset)
				: __("No offset", GUTESTRAP_TEXT_DOMAIN),
		});
		widths.push({
			value: count,
			label: sprintf(_n("%d column", "%d columns", count, GUTESTRAP_TEXT_DOMAIN), count),
		});
	}
	return { widths, offsets };
}

const { widths: COL_WIDTH_OPTIONS, offsets: COL_OFFSET_OPTIONS } = generateColumnOptions(12);

const COL_ALIGN_OPTIONS = [
	{
		label: __("Top", GUTESTRAP_TEXT_DOMAIN),
		value: "start",
	},
	{
		label: __("Center", GUTESTRAP_TEXT_DOMAIN),
		value: "center",
	},
	{
		label: __("Bottom", GUTESTRAP_TEXT_DOMAIN),
		value: "end",
	},
	{
		label: __("Baseline", GUTESTRAP_TEXT_DOMAIN),
		value: "baseline",
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
function ColumnEdit({
	attributes,
	className,
	setAttributes,
	clientId,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const { width = {}, offset = {}, alignment = {}, background = {} } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<ResponsiveTabs
					hasNotification={(bp) => {
						if (bp === "xs") return false;
						return (
							(width[bp] && width[bp] !== COLUMN_OPTION_INHERIT_VALUE) ||
							(offset[bp] && offset[bp] !== COLUMN_OPTION_INHERIT_VALUE) ||
							(alignment[bp] && alignment[bp] !== COLUMN_OPTION_INHERIT_VALUE)
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
						};
						return (
							<PanelBody>
								<p>{`${label} layout`}</p>
								<SelectControl
									label={__("Width", GUTESTRAP_TEXT_DOMAIN)}
									options={canInherit ? COL_WIDTH_OPTIONS : COL_WIDTH_OPTIONS.slice(1)}
									value={width[breakpoint] != null ? width[breakpoint] : fallbacks.width}
									onChange={(value) => {
										width[breakpoint] = toNumber(value);
										setAttributes({ width: { ...width } });
									}}
								/>
								<SelectControl
									label={__("Offset", GUTESTRAP_TEXT_DOMAIN)}
									options={canInherit ? COL_OFFSET_OPTIONS : COL_OFFSET_OPTIONS.slice(1)}
									value={offset[breakpoint] != null ? offset[breakpoint] : fallbacks.offset}
									onChange={(value) => {
										offset[breakpoint] = toNumber(value);
										setAttributes({ offset: { ...offset } });
									}}
								/>
								<SelectControl
									label={__("Alignment", GUTESTRAP_TEXT_DOMAIN)}
									options={[
										canInherit
											? INHERIT_OPTION
											: {
													label: __("Default alignment from row", GUTESTRAP_TEXT_DOMAIN),
													value: COLUMN_OPTION_INHERIT_VALUE,
											  },
										...COL_ALIGN_OPTIONS,
									]}
									value={alignment[breakpoint] != null ? alignment[breakpoint] : fallbacks.alignment}
									onChange={(value) => {
										alignment[breakpoint] = value;
										setAttributes({ alignment: { ...alignment } });
									}}
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
				<PanelColorSettings
					title={__("Colour Settings", GUTESTRAP_TEXT_DOMAIN)}
					initialOpen={false}
					disableCustomColors={false}
					disableCustomGradients={true}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __("Background colour", GUTESTRAP_TEXT_DOMAIN),
						},
						{ value: textColor.color, onChange: setTextColor, label: __("Text colour", GUTESTRAP_TEXT_DOMAIN) },
					]}
				/>
			</InspectorControls>
			<BlockControls>
				<BlockFlexItemAlignmentToolbar
					label={__("column", GUTESTRAP_TEXT_DOMAIN)}
					value={alignment.xs}
					onChange={(value) => {
						alignment.xs = value;
						setAttributes({ alignment: { ...alignment } });
					}}
				/>
			</BlockControls>
			<div
				className={classNames(className, textColor?.class, backgroundColor?.class)}
				style={{
					backgroundImage: background?.image?.url ? `url(${background.image.url})` : null,
					backgroundPosition: background?.position || null,
					backgroundSize: background?.size || null,
					backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
				}}
			>
				<InnerBlocks
					__experimentalPassedProps={{ className: "gutestrap-block-col-inner-blocks" }}
					renderAppender={() => {
						const { innerBlocks } = select("core/block-editor").getBlock(clientId);
						return (
							<Fragment>
								<BlockControlsBlockAppender rootClientId={clientId} />
								{!innerBlocks.length && <InnerBlocks.ButtonBlockAppender />}
							</Fragment>
						);
					}}
				/>
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
			const { attributes, block } = props;
			if (block.name === "gutestrap/col") {
				className = classNames(className, columnClassNames(attributes));
			}
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapColumnBlockListBlockClasses;
	}, "withGutestrapColumnBlockListBlockClasses")
);

ColumnEdit = withColors({ textColor: "color", backgroundColor: "background-color" })(ColumnEdit);

export { ColumnEdit };
export default ColumnEdit;

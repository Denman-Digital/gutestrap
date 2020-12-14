import { __, _n } from "@wordpress/i18n";
import { sprintf } from "sprintf-js";
import classNames from "classnames";
import { select } from "@wordpress/data";
import { Fragment, useState } from "@wordpress/element";
import {
	SelectControl,
	PanelBody,
	ToolbarButton,
	Toolbar,
	Tooltip,
	BaseControl,
	Flex,
	FlexItem,
	Button,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";

import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	PanelColorSettings,
	withColors,
	__experimentalBlockAlignmentMatrixToolbar as BlockAlignmentMatrixToolbar,
} from "@wordpress/block-editor";
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
import { PanelSpacing, Visualizer } from "../../components/panel-spacing";
import { PanelBackgroundImage } from "../../components/panel-background-image";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BlockFlexItemAlignmentToolbar, BOOTSTRAP_ICON_CLASSES } from "../../components/alignment/flex-items-alignment";
import { ResponsiveTabs } from "../../components/responsive-tabs";
import { columnClassNames, columnInnerClassNames } from "./render";

import { ReactComponent as ExpandIcon } from "bootstrap-icons/icons/arrows-angle-expand.svg";

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
	{
		label: __("Stretch to fit", GUTESTRAP_TEXT_DOMAIN),
		value: "stretch",
	},
];

const COL_CONTENT_ALIGN_OPTIONS = [
	{
		label: __("Stretch to fit", GUTESTRAP_TEXT_DOMAIN),
		value: "stretch stretch",
	},
	{
		label: __("Top left", GUTESTRAP_TEXT_DOMAIN),
		value: "top left",
	},
	{
		label: __("Top centre", GUTESTRAP_TEXT_DOMAIN),
		value: "top center",
	},
	{
		label: __("Top right", GUTESTRAP_TEXT_DOMAIN),
		value: "top right",
	},
	{
		label: __("Centre left", GUTESTRAP_TEXT_DOMAIN),
		value: "center left",
	},
	{
		label: __("Centre", GUTESTRAP_TEXT_DOMAIN),
		value: "center center",
	},
	{
		label: __("Centre right", GUTESTRAP_TEXT_DOMAIN),
		value: "center right",
	},
	{
		label: __("Bottom left", GUTESTRAP_TEXT_DOMAIN),
		value: "bottom left",
	},
	{
		label: __("Bottom centre", GUTESTRAP_TEXT_DOMAIN),
		value: "bottom center",
	},
	{
		label: __("Bottom right", GUTESTRAP_TEXT_DOMAIN),
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
	const {
		width = {},
		offset = {},
		alignment = {},
		background = {},
		padding = {},
		margin = {},
		contentAlignment = {},
	} = attributes;

	const [isMarginLinked, setIsMarginLinked] = useState(margin?.top === margin?.bottom);
	contentAlignment.xs = contentAlignment.xs || "stretch stretch";

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
									label={__("Column alignment", GUTESTRAP_TEXT_DOMAIN)}
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
									help={__("Align the column within the row.", GUTESTRAP_TEXT_DOMAIN)}
								/>
								<SelectControl
									label={__("Content Alignment", GUTESTRAP_TEXT_DOMAIN)}
									options={canInherit ? [INHERIT_OPTION, ...COL_CONTENT_ALIGN_OPTIONS] : COL_CONTENT_ALIGN_OPTIONS}
									value={
										contentAlignment[breakpoint] != null ? contentAlignment[breakpoint] : fallbacks.contentAlignment
									}
									onChange={(value) => {
										contentAlignment[breakpoint] = value;
										setAttributes({ contentAlignment: { ...contentAlignment } });
									}}
									help={__("Align content within the column.", GUTESTRAP_TEXT_DOMAIN)}
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
							onChange: (value) => {
								console.log(value);
								setBackgroundColor(value);
							},
							label: __("Background colour", GUTESTRAP_TEXT_DOMAIN),
						},
						{ value: textColor.color, onChange: setTextColor, label: __("Text colour", GUTESTRAP_TEXT_DOMAIN) },
					]}
				/>
				{/* <PanelSpacing
					initialOpen={
						!!(
							parseFloat(padding?.top) ||
							parseFloat(padding?.right) ||
							parseFloat(padding?.bottom) ||
							parseFloat(padding?.left)
						)
					}
					spacingSettings={[
						{
							values: padding,
							onChange: (value) => setAttributes({ padding: value }),
							label: __("Padding", GUTESTRAP_TEXT_DOMAIN),
						},
					]}
				/> */}

				<PanelBody
					title={__("Spacing", GUTESTRAP_TEXT_DOMAIN)}
					initialOpen={
						!!(
							parseFloat(padding?.top) ||
							parseFloat(padding?.right) ||
							parseFloat(padding?.bottom) ||
							parseFloat(padding?.left) ||
							parseFloat(margin?.top) ||
							parseFloat(margin?.bottom)
						)
					}
				>
					<BaseControl>
						<BoxControl
							values={padding}
							onChange={(value) => setAttributes({ padding: value })}
							label={__("Padding", GUTESTRAP_TEXT_DOMAIN)}
						/>
					</BaseControl>
					<BaseControl
						label={__("Margin", GUTESTRAP_TEXT_DOMAIN)}
						className={isMarginLinked ? "spacing-linked" : "spacing-not-linked"}
						// help={__("Add margin above or below the column.")}
					>
						<Flex align={"flex-end"}>
							<FlexItem>
								<Flex>
									<FlexItem>
										<UnitControl
											className="spacing-unit-control"
											label={
												isMarginLinked ? __("Top and bottom", GUTESTRAP_TEXT_DOMAIN) : __("Top", GUTESTRAP_TEXT_DOMAIN)
											}
											size={"small"}
											value={margin?.top}
											onChange={(value) => {
												margin.top = value;
												if (isMarginLinked) {
													margin.bottom = value;
												}
												setAttributes({ margin: { ...margin } });
											}}
										/>
									</FlexItem>
									{!isMarginLinked && (
										<FlexItem>
											<UnitControl
												className="spacing-unit-control"
												label={__("Bottom", GUTESTRAP_TEXT_DOMAIN)}
												size={"small"}
												value={margin?.bottom}
												onChange={(value) => {
													margin.bottom = value;
													setAttributes({ margin: { ...margin } });
												}}
											/>
										</FlexItem>
									)}
								</Flex>
							</FlexItem>
							<FlexItem style={{ marginLeft: "auto" }}>
								<Tooltip
									text={
										isMarginLinked ? __("Unlink sides", GUTESTRAP_TEXT_DOMAIN) : __("Link sides", GUTESTRAP_TEXT_DOMAIN)
									}
								>
									<span>
										<Button
											onClick={() => {
												setIsMarginLinked((state) => !state);
												margin.bottom = margin.top;
												setAttributes({ margin: { ...margin } });
											}}
											className="spacing-linked-button"
											isPrimary={isMarginLinked}
											isSecondary={!isMarginLinked}
											isSmall
											icon={isMarginLinked ? link : linkOff}
											iconSize={16}
										/>
									</span>
								</Tooltip>
							</FlexItem>
						</Flex>
					</BaseControl>
				</PanelBody>
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
				<Toolbar>
					<ToolbarButton
						showTooltip={true}
						label={__("Expand contents to fit", GUTESTRAP_TEXT_DOMAIN)}
						isPressed={contentAlignment.xs === "stretch stretch"}
						onClick={() => {
							contentAlignment.xs = contentAlignment.xs === "stretch stretch" ? "top left" : "stretch stretch";
							setAttributes({ contentAlignment: { ...contentAlignment } });
						}}
						icon={() => <ExpandIcon className={BOOTSTRAP_ICON_CLASSES} />}
					/>
				</Toolbar>
				<BlockAlignmentMatrixToolbar
					label={__("Change content alignment", GUTESTRAP_TEXT_DOMAIN)}
					value={contentAlignment.xs}
					onChange={(value) => {
						contentAlignment.xs = value;
						setAttributes({ contentAlignment: { ...contentAlignment } });
					}}
				/>
			</BlockControls>
			<Visualizer values={margin} className="gutestrap-block-col-visualizer gutestrap-block-col-visualizer-margin" />
			<Visualizer values={padding} className="gutestrap-block-col-visualizer gutestrap-block-col-visualizer-padding">
				<div
					className={classNames(className, columnInnerClassNames(attributes), {
						"has-color": textColor?.color,
						[textColor?.class]: textColor?.class,
						"has-background-color": backgroundColor?.color,
						[backgroundColor?.class]: backgroundColor?.class,
					})}
					style={{
						backgroundImage: background?.image?.url ? `url(${background.image.url})` : null,
						backgroundPosition: background?.position || "center",
						backgroundSize: background?.size || "cover",
						backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
						paddingTop: padding?.top,
						paddingRight: padding?.right,
						paddingBottom: padding?.bottom,
						paddingLeft: padding?.left,
						marginTop: margin?.top,
						marginBottom: margin?.bottom,
						color: textColor?.color,
						backgroundColor: backgroundColor?.color,
					}}
				>
					<div className="col__content">
						<InnerBlocks
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
				</div>
			</Visualizer>
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
			if (block.name === "gutestrap/col" || block.name === "gutestrap/container") {
				const _block = select("core/block-editor").getBlock(clientId);
				if (_block?.innerBlocks?.length) {
					extraClasses.push("has-inner-blocks");
				}
			}
			if (block.name === "gutestrap/col") {
				extraClasses.push(columnClassNames(attributes));
			}
			className = classNames(className, ...extraClasses);
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapColumnBlockListBlockClasses;
	}, "withGutestrapColumnBlockListBlockClasses")
);

ColumnEdit = withColors({ textColor: "color", backgroundColor: "background-color" })(ColumnEdit);

export { ColumnEdit };
export default ColumnEdit;

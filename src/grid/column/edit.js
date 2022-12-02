import classNames from "classnames";
import { link, linkOff } from "@wordpress/icons";

import { __, _n, sprintf } from "@wordpress/i18n";
import { select } from "@wordpress/data";
import { Fragment, useState } from "@wordpress/element";
import {
	SelectControl,
	PanelBody,
	ToolbarButton,
	ToolbarGroup,
	Tooltip,
	BaseControl,
	Flex,
	FlexItem,
	Button,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	withColors,
	// __experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseGradient as useGradient,
	// __experimentalUseBorderProps as useBorderProps,
	// useBlockProps,
} from "@wordpress/block-editor";

import { createHigherOrderComponent } from "@wordpress/compose";

import { toNumber, BOOTSTRAP_ICON_CLASSES } from "../../_common";

// import { Visualizer } from "../../components/panel-spacing";
import { PanelBackgroundImage } from "../../components/panel-background-image";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BlockFlexItemAlignmentToolbar } from "../../components/alignment";
import { ResponsiveTabs } from "../../components/responsive-tabs";
import { columnClassNames, columnInnerClassNames } from "./render";

const { config } = gutestrapGlobal;

// import ExpandIcon from "bootstrap-icons/icons/arrows-angle-expand.svg";
import ExpandIcon from "./expand-contents.svg";

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
function ColumnEdit({
	attributes,
	className,
	setAttributes,
	clientId,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
	// borderColor,
	// setBorderColor,
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

	const { gradientClass, gradientValue, setGradient } = useGradient({
		gradientAttribute: "gradient",
		customGradientAttribute: "customGradient",
	});

	const colorSettings = [
		{
			colorValue: backgroundColor.color,
			onColorChange: setBackgroundColor,
			gradientValue,
			onGradientChange: setGradient,
			label: __("Background", "gutestrap"),
		},
		{
			colorValue: textColor.color,
			onColorChange: setTextColor,
			label: __("Text", "gutestrap"),
		},
	];

	// if (config.enableBorderColors) {
	// 	colorSettings.push({
	// 		colorValue: borderColor.color,
	// 		onColorChange: setBorderColor,
	// 		label: __("Border colour", "gutestrap"),
	// 	});
	// }

	let backgroundImageCSS = "";
	if (background?.image?.url) {
		backgroundImageCSS += `url(${background.image.url})`;
	}
	if (gradientValue) {
		if (backgroundImageCSS) backgroundImageCSS += ", ";
		backgroundImageCSS += gradientValue;
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
				<PanelColorGradientSettings
					title={__("Colour Settings", "gutestrap")}
					initialOpen={false}
					disableCustomColors={!!config.disableCustomColors}
					disableCustomGradients={!!config.disableCustomGradients}
					settings={colorSettings}
				/>
				<PanelBody
					title={__("Spacing", "gutestrap")}
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
							label={__("Padding", "gutestrap")}
						/>
					</BaseControl>
					<BaseControl
						label={__("Margin", "gutestrap")}
						className={isMarginLinked ? "spacing-linked" : "spacing-not-linked"}
						// help={__("Add margin above or below the column.")}
					>
						<Flex align={"flex-end"}>
							<FlexItem>
								<Flex>
									<FlexItem>
										<UnitControl
											className="spacing-unit-control"
											label={isMarginLinked ? __("Top and bottom", "gutestrap") : __("Top", "gutestrap")}
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
												label={__("Bottom", "gutestrap")}
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
								<Tooltip text={isMarginLinked ? __("Unlink sides", "gutestrap") : __("Link sides", "gutestrap")}>
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
			{/* <Visualizer values={margin} className="gutestrap-block-col-visualizer gutestrap-block-col-visualizer-margin" />
			<Visualizer values={padding} className="gutestrap-block-col-visualizer gutestrap-block-col-visualizer-padding"> */}
			<div
				// {...blockProps}
				className={classNames(className, columnInnerClassNames(attributes), {
					"has-color": textColor?.color,
					[textColor?.class]: textColor?.class,
					"has-background-color": backgroundColor?.color,
					[backgroundColor?.class]: backgroundColor?.class,
					// "has-border-color": borderColor?.color,
					// [borderColor?.class]: borderColor?.class,
					"has-gradient-background": !!gradientValue,
					[gradientClass]: !!gradientClass,
					// [borderProps.className]: !!borderProps.className,
				})}
				style={{
					backgroundImage: backgroundImageCSS || null,
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
					// borderColor: borderColor?.color,
					// ...borderProps.style,
				}}
			>
				<div className="col__content">
					<InnerBlocks
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
			{/* </Visualizer> */}
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

ColumnEdit = withColors({ textColor: "color", backgroundColor: "background-color", borderColor: "border-color" })(
	ColumnEdit
);

export { ColumnEdit };
export default ColumnEdit;

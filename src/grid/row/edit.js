import classNames from "classnames";
import { __, _x } from "@wordpress/i18n";
import { Fragment, useState } from "@wordpress/element";
import { InspectorControls, InspectorAdvancedControls, InnerBlocks, BlockControls } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
	Button,
	Tooltip,
	BaseControl,
} from "@wordpress/components";

// import { toNumber } from "js-utils";
function toNumber(value, fallback = 0) {
	const number = Number(value);
	if (isNaN(number)) {
		return toNumber(fallback);
	}
	return number;
}

import { createHigherOrderComponent } from "@wordpress/compose";
import { link, linkOff } from "@wordpress/icons";

import { Visualizer } from "../../components/panel-spacing";
import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { ResponsiveTabs } from "../../components/responsive-tabs";
import { BlockFlexItemsAlignmentToolbar } from "../../components/alignment/flex-items-alignment";
import { BlockContentJustificationToolbar } from "../../components/alignment/flex-content-justification";
import { GUTESTRAP_TEXT_DOMAIN } from "../../const";

import { rowClassNames } from "./render";
import { DEFAULT_ATTRIBUTES } from "./index";
import { name as rowBreakBlockName } from "./row-break";
import { name as columnBlockName } from "../column";

const ROW_CHILDREN_LABEL = __("columns", GUTESTRAP_TEXT_DOMAIN);

const generateRowColumnsOptions = (gridRowCols = 6) => {
	const opts = [];
	for (let count = 1; count <= gridRowCols; count++) {
		opts.push({
			label: `1/${count}`,
			value: count,
		});
	}
	return opts;
};
const ROW_COLS_OPTIONS = generateRowColumnsOptions();

const INHERIT_OPTION = {
	label: __("Inherit from smaller (default)", GUTESTRAP_TEXT_DOMAIN),
	value: 0,
};

const COLS_AUTO_OPTION = {
	label: __("Equal-width (default)", GUTESTRAP_TEXT_DOMAIN),
	value: 0,
};

const ROW_JUSTIFICATION_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", GUTESTRAP_TEXT_DOMAIN),
		value: "inherit",
	},
	{
		label: _x("Pack columns to the left", "Row columns justification setting", GUTESTRAP_TEXT_DOMAIN),
		value: "start",
	},
	{
		label: _x("Pack columns in the centre", "Row columns justification setting", GUTESTRAP_TEXT_DOMAIN),
		value: "center",
	},
	{
		label: _x("Pack columns to the right", "Row columns justification setting", GUTESTRAP_TEXT_DOMAIN),
		value: "end",
	},
	{
		label: _x("Distribute columns horizontally", "Row columns justification setting", GUTESTRAP_TEXT_DOMAIN),
		value: "between",
	},
	{
		label: _x(
			"Distribute columns with equal spacing on each end",
			"Row columns justification setting",
			GUTESTRAP_TEXT_DOMAIN
		),
		value: "evenly",
	},
	{
		label: _x(
			"Distribute columns with half-size spacing on each end",
			"Row columns justification setting",
			GUTESTRAP_TEXT_DOMAIN
		),
		value: "around",
	},
];
const ROW_JUSTIFICATION_OPTIONS_XS = [
	{
		label: _x("Pack columns to the left (default)", "Row columns justification setting", GUTESTRAP_TEXT_DOMAIN),
		value: "start",
	},
	...ROW_JUSTIFICATION_OPTIONS.slice(2),
];

const ROW_ALIGNMENT_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", GUTESTRAP_TEXT_DOMAIN),
		value: "inherit",
	},
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
		label: __("Stretch", GUTESTRAP_TEXT_DOMAIN),
		value: "stretch",
	},
];

const ROW_ALIGNMENT_OPTIONS_XS = [
	{
		label: __("Top (default)", GUTESTRAP_TEXT_DOMAIN),
		value: "start",
	},
	...ROW_ALIGNMENT_OPTIONS.slice(2),
];

// /**
//  * WordPress dependencies
//  */

// function LinkedButton({ isLinked, ...props }) {
// 	const linkedTooltipText = ;

// 	return (
// 	);
// }

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
export const RowEdit = (props) => {
	const { attributes, className, setAttributes, clientId } = props;
	const {
		defaultColWidth = {},
		alignment = {},
		justification = {},
		padding = {},
		noGutters,
		verticalGutters,
		disabled,
	} = attributes;
	const [isPaddingLinked, setIsPaddingLinked] = useState(padding?.top === padding?.bottom);

	return (
		<Fragment>
			<BlockControls>
				<BlockContentJustificationToolbar
					label={ROW_CHILDREN_LABEL}
					value={justification.xs}
					onChange={(value) => {
						justification.xs = value;
						setAttributes({ justification: { ...justification } });
					}}
				/>
				<BlockFlexItemsAlignmentToolbar
					label={ROW_CHILDREN_LABEL}
					value={alignment.xs}
					onChange={(value) => {
						alignment.xs = value;
						setAttributes({ alignment: { ...alignment } });
					}}
				/>
			</BlockControls>
			<InspectorControls>
				<ResponsiveTabs
					hasNotification={(bp) => {
						if (bp === "xs") return false;
						return (
							defaultColWidth[bp] ||
							(alignment[bp] && alignment[bp] !== "inherit") ||
							(justification[bp] && justification[bp] !== "inherit")
						);
					}}
				>
					{(tab) => {
						const { label, breakpoint } = tab;
						const canInherit = breakpoint !== "xs";
						return (
							<PanelBody>
								<p>{`${label} layout`}</p>
								<SelectControl
									label={__("Default column width", GUTESTRAP_TEXT_DOMAIN)}
									options={[canInherit ? INHERIT_OPTION : COLS_AUTO_OPTION, ...ROW_COLS_OPTIONS]}
									value={
										defaultColWidth[breakpoint] != null
											? defaultColWidth[breakpoint]
											: DEFAULT_ATTRIBUTES.defaultColWidth[breakpoint]
									}
									onChange={(value) => {
										defaultColWidth[breakpoint] = toNumber(value);
										setAttributes({ defaultColWidth: { ...defaultColWidth } });
									}}
								/>
								<SelectControl
									label={__("Distribute columns", GUTESTRAP_TEXT_DOMAIN)}
									options={canInherit ? ROW_JUSTIFICATION_OPTIONS : ROW_JUSTIFICATION_OPTIONS_XS}
									value={
										justification[breakpoint] != null
											? justification[breakpoint]
											: DEFAULT_ATTRIBUTES.justification[breakpoint]
									}
									onChange={(value) => {
										justification[breakpoint] = value;
										setAttributes({ justification: { ...justification } });
									}}
								/>
								<SelectControl
									label={__("Align columns", GUTESTRAP_TEXT_DOMAIN)}
									options={canInherit ? ROW_ALIGNMENT_OPTIONS : ROW_ALIGNMENT_OPTIONS_XS}
									value={
										alignment[breakpoint] != null ? alignment[breakpoint] : DEFAULT_ATTRIBUTES.alignment[breakpoint]
									}
									onChange={(value) => {
										alignment[breakpoint] = value;
										setAttributes({ alignment: { ...alignment } });
									}}
								/>
							</PanelBody>
						);
					}}
				</ResponsiveTabs>
				<PanelBody
					title={__("Spacing", GUTESTRAP_TEXT_DOMAIN)}
					initialOpen={!!(parseFloat(padding?.top) || parseFloat(padding?.bottom))}
				>
					<BaseControl
						label={__("Padding", GUTESTRAP_TEXT_DOMAIN)}
						className={isPaddingLinked ? "spacing-linked" : "spacing-not-linked"}
					>
						<Flex align={"flex-end"}>
							<FlexItem>
								<Flex>
									<FlexItem>
										<UnitControl
											className="spacing-unit-control"
											label={
												isPaddingLinked ? __("Top and bottom", GUTESTRAP_TEXT_DOMAIN) : __("Top", GUTESTRAP_TEXT_DOMAIN)
											}
											size="small"
											value={padding?.top}
											onChange={(value) => {
												padding.top = value;
												if (isPaddingLinked) {
													padding.bottom = value;
												}
												setAttributes({ padding: { ...padding } });
											}}
										/>
									</FlexItem>
									{!isPaddingLinked && (
										<FlexItem>
											<UnitControl
												className="spacing-unit-control"
												label={__("Bottom", GUTESTRAP_TEXT_DOMAIN)}
												size="small"
												value={padding?.bottom}
												onChange={(value) => {
													padding.bottom = value;
													setAttributes({ padding: { ...padding } });
												}}
											/>
										</FlexItem>
									)}
								</Flex>
							</FlexItem>
							<FlexItem style={{ marginLeft: "auto" }}>
								<Tooltip
									text={
										isPaddingLinked
											? __("Unlink sides", GUTESTRAP_TEXT_DOMAIN)
											: __("Link sides", GUTESTRAP_TEXT_DOMAIN)
									}
								>
									<span>
										<Button
											onClick={() => setIsPaddingLinked((state) => !state)}
											className="spacing-linked-button"
											isPrimary={isPaddingLinked}
											isSecondary={!isPaddingLinked}
											isSmall
											icon={isPaddingLinked ? link : linkOff}
											iconSize={16}
										/>
									</span>
								</Tooltip>
							</FlexItem>
						</Flex>
					</BaseControl>
				</PanelBody>
				<PanelBody title={__("Gutters", GUTESTRAP_TEXT_DOMAIN)} initialOpen={false}>
					<ToggleControl
						checked={!noGutters}
						// help={__("Add gutters between the columns of this row.", GUTESTRAP_TEXT_DOMAIN)}
						label={__("Horizontal gutters", GUTESTRAP_TEXT_DOMAIN)}
						onChange={(checked) => {
							setAttributes({ noGutters: !checked });
						}}
					/>
					<ToggleControl
						checked={!!verticalGutters}
						// help={__("Add gutters between the lines of columns of this row.", GUTESTRAP_TEXT_DOMAIN)}
						label={__("Vertical gutters", GUTESTRAP_TEXT_DOMAIN)}
						onChange={(checked) => {
							setAttributes({ verticalGutters: !!checked });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__("Disable block", GUTESTRAP_TEXT_DOMAIN)}
					help={__("Prevent this block and its contents from rendering.", GUTESTRAP_TEXT_DOMAIN)}
					checked={disabled}
					onChange={(checked) => {
						setAttributes({ disabled: !!checked });
					}}
				/>
			</InspectorAdvancedControls>
			<Visualizer values={padding}>
				<div
					className={classNames(className, rowClassNames(attributes))}
					style={{
						paddingTop: padding?.top,
						paddingBottom: padding?.bottom,
					}}
				>
					<InnerBlocks
						allowedBlocks={[rowBreakBlockName, columnBlockName]}
						orientation="horizontal"
						renderAppender={() => {
							return (
								<Fragment>
									<BlockControlsBlockAppender rootClientId={clientId} />
									<InnerBlocks.ButtonBlockAppender />
								</Fragment>
							);
						}}
					/>
				</div>
			</Visualizer>
		</Fragment>
	);
};

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-example-classes",
	createHigherOrderComponent((BlockListBlock) => {
		/**
		 * @arg {Object} props - Props.
		 * @arg {Object} props.attributes - Block attributes.
		 * @arg {Object} props.block - Block properties.
		 * @arg {string} props.block.name - Block name.
		 * @returns {*} JSX
		 */
		const gutestrapExampleClasses = ({ className, ...props }) => {
			const { attributes } = props;
			return (
				<BlockListBlock
					{...props}
					className={classNames(className, {
						"-is-example": !!attributes?._isExample,
					})}
				/>
			);
		};
		return gutestrapExampleClasses;
	}, "withGutestrapExampleClasses")
);

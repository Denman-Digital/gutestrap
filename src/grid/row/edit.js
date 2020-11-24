import classNames from "classnames";
import { __, _x } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { InspectorControls, InspectorAdvancedControls, InnerBlocks, BlockControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl, Toolbar, Tooltip, Button } from "@wordpress/components";
// import { toNumber } from "js-utils";
function toNumber(value, fallback = 0) {
	const number = Number(value);
	if (isNaN(number)) {
		return toNumber(fallback);
	}
	return number;
}
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
export const RowEdit = ({ attributes, className, setAttributes }) => {
	const { defaultColWidth = {}, alignment = {}, justification = {}, noGutters, disabled } = attributes;
	const rowProps = {
		className: classNames(className, rowClassNames(attributes)),
	};

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
				<PanelBody title={__("Gutters", GUTESTRAP_TEXT_DOMAIN)}>
					<ToggleControl
						checked={!!noGutters}
						help={__("Remove gutters between the columns of this row.", GUTESTRAP_TEXT_DOMAIN)}
						label={__("No gutters", GUTESTRAP_TEXT_DOMAIN)}
						onChange={(checked) => {
							setAttributes({ noGutters: !!checked });
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
			<InnerBlocks
				allowedBlocks={[rowBreakBlockName, columnBlockName]}
				orientation="horizontal"
				__experimentalPassedProps={rowProps}
				renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
			/>
		</Fragment>
	);
};

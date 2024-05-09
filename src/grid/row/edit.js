import classnames from "classnames";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { InspectorControls, InspectorAdvancedControls, InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import { BreakpointTabs } from "../../components/responsive-tabs";

import { rowClassNames, stripRowClassNames } from "./render";
import { RichSelect } from "../../components/rich-select";
import { name as rowBreakBlockName } from "../row-break";
import { name as columnBlockName } from "../column/block.json";

import AlignItemsTopIcon from "../../components/alignment/align-items-top.svg";
import AlignItemsCenterIcon from "../../components/alignment/align-items-center.svg";
import AlignItemsBottomIcon from "../../components/alignment/align-items-bottom.svg";
import AlignItemsBaselineIcon from "../../components/alignment/align-items-baseline.svg";
import AlignItemsStretchIcon from "../../components/alignment/align-items-stretch.svg";

import JustifyContentStartIcon from "../../components/alignment/justify-start.svg";
import JustifyContentCenterIcon from "../../components/alignment/justify-center.svg";
import JustifyContentEndIcon from "../../components/alignment/justify-end.svg";
import JustifyContentAroundIcon from "../../components/alignment/justify-space-around.svg";
import JustifyContentBetweenIcon from "../../components/alignment/justify-space-between.svg";
import JustifyContentEvenlyIcon from "../../components/alignment/justify-space-evenly.svg";

const DEFAULT_ATTRIBUTES = {
	noGutters: false,
	verticalGutters: true,
	disabled: false,
	alignment: {
		xs: "stretch",
		sm: "inherit",
		md: "inherit",
		lg: "inherit",
		xl: "inherit",
		xxl: "inherit",
	},
	justification: {
		xs: "start",
		sm: "inherit",
		md: "inherit",
		lg: "inherit",
		xl: "inherit",
		xxl: "inherit",
	},
	direction: {
		xs: "row",
		sm: "inherit",
		md: "inherit",
		lg: "inherit",
		xl: "inherit",
		xxl: "inherit",
	},
};

const ROW_JUSTIFICATION_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", "gutestrap"),
		value: "inherit",
	},
	{
		label: __("Pack columns to the left", "gutestrap"),
		icon: JustifyContentStartIcon,
		value: "start",
	},
	{
		label: __("Pack columns in the centre", "gutestrap"),
		icon: JustifyContentCenterIcon,
		value: "center",
	},
	{
		label: __("Pack columns to the right", "gutestrap"),
		icon: JustifyContentEndIcon,
		value: "end",
	},
	{
		label: __("Distribute columns horizontally", "gutestrap"),
		icon: JustifyContentBetweenIcon,
		value: "between",
	},
	{
		label: __("Distribute columns with equal spacing on each end", "gutestrap"),
		icon: JustifyContentEvenlyIcon,
		value: "evenly",
	},
	{
		label: __("Distribute columns with half-size spacing on each end", "gutestrap"),
		icon: JustifyContentAroundIcon,
		value: "around",
	},
];
const ROW_JUSTIFICATION_OPTIONS_XS = [
	{
		label: __("Pack columns to the left (default)", "gutestrap"),
		icon: JustifyContentStartIcon,
		value: "start",
	},
	...ROW_JUSTIFICATION_OPTIONS.slice(2),
];

const ROW_ALIGNMENT_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", "gutestrap"),
		value: "inherit",
	},
	{
		label: __("Stretch", "gutestrap"),
		icon: AlignItemsStretchIcon,
		value: "stretch",
	},
	{
		label: __("Top", "gutestrap"),
		icon: AlignItemsTopIcon,
		value: "start",
	},
	{
		label: __("Centre", "gutestrap"),
		icon: AlignItemsCenterIcon,
		value: "center",
	},
	{
		label: __("Bottom", "gutestrap"),
		icon: AlignItemsBottomIcon,
		value: "end",
	},
	{
		label: __("Baseline", "gutestrap"),
		icon: AlignItemsBaselineIcon,
		value: "baseline",
	},
];

const ROW_ALIGNMENT_OPTIONS_XS = [
	{
		label: __("Stretch (default)", "gutestrap"),
		icon: AlignItemsStretchIcon,
		value: "stretch",
	},
	...ROW_ALIGNMENT_OPTIONS.slice(2),
];

const ROW_DIRECTION_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", "gutestrap"),
		value: "inherit",
	},
	{
		label: __("Normal", "gutestrap"),
		value: "row",
	},
	{
		label: __("Reversed", "gutestrap"),
		value: "row-reverse",
	},
];

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Component.
 */
export const RowEdit = (props) => {
	const { attributes, className, setAttributes, clientId } = props;

	if (attributes._isExample) {
		return (
			<div>
				<InnerBlocks />
			</div>
		);
	}

	const {
		defaultColWidth = {},
		alignment = {},
		direction = {},
		justification = {},
		noGutters,
		verticalGutters,
		disabled,
		anchor,
	} = attributes;

	const blockProps = useBlockProps({
		id: anchor,
		className: classnames(className, rowClassNames(attributes), {
			"has-min-height":
				!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
		}),
	});

	return (
		<Fragment>
			<div {...blockProps}>
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
			<InspectorControls>
				<BreakpointTabs
					hasNotification={(bp) => {
						if (bp === "xs") return false;
						return (
							defaultColWidth[bp] ||
							(alignment[bp] && alignment[bp] !== "inherit") ||
							(justification[bp] && justification[bp] !== "inherit") ||
							(direction[bp] && direction[bp] !== "inherit")
						);
					}}
				>
					{(tab) => {
						const { label, breakpoint } = tab;
						const canInherit = breakpoint !== "xs";
						return (
							<PanelBody>
								<p>{label}</p>
								<RichSelect
									label={__("Distribute columns", "gutestrap")}
									options={canInherit ? ROW_JUSTIFICATION_OPTIONS : ROW_JUSTIFICATION_OPTIONS_XS}
									value={
										justification[breakpoint] != null
											? justification[breakpoint]
											: DEFAULT_ATTRIBUTES.justification[breakpoint]
									}
									onChange={(value) => {
										setAttributes({ justification: { ...justification, [breakpoint]: value } });
									}}
								/>
								<RichSelect
									label={__("Align columns", "gutestrap")}
									options={canInherit ? ROW_ALIGNMENT_OPTIONS : ROW_ALIGNMENT_OPTIONS_XS}
									value={
										alignment[breakpoint] != null ? alignment[breakpoint] : DEFAULT_ATTRIBUTES.alignment[breakpoint]
									}
									onChange={(value) => {
										setAttributes({ alignment: { ...alignment, [breakpoint]: value } });
									}}
								/>
								<SelectControl
									label={__("Row direction", "gutestrap")}
									options={
										canInherit
											? ROW_DIRECTION_OPTIONS
											: [
													{
														label: __("Normal (Default)", "gutestrap"),
														value: "row",
													},
													ROW_DIRECTION_OPTIONS[2],
											  ]
									}
									value={
										direction[breakpoint] != null ? direction[breakpoint] : DEFAULT_ATTRIBUTES.direction[breakpoint]
									}
									onChange={(value) => {
										setAttributes({ direction: { ...direction, [breakpoint]: value } });
									}}
								/>
							</PanelBody>
						);
					}}
				</BreakpointTabs>
				<PanelBody title={__("Gutters", "gutestrap")} initialOpen={false}>
					<ToggleControl
						checked={!noGutters}
						label={__("Horizontal gutters", "gutestrap")}
						onChange={(checked) => {
							setAttributes({ noGutters: !checked });
						}}
					/>
					<ToggleControl
						checked={!!verticalGutters}
						label={__("Vertical gutters", "gutestrap")}
						onChange={(checked) => {
							setAttributes({ verticalGutters: !!checked });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__("Disable block", "gutestrap")}
					help={__("Prevent this block and its contents from rendering.", "gutestrap")}
					checked={disabled}
					onChange={(checked) => {
						setAttributes({ disabled: !!checked });
					}}
				/>
			</InspectorAdvancedControls>
		</Fragment>
	);
};

wp.hooks.addFilter(
	"blocks.getBlockAttributes",
	"gutestrap/row/allowed-custom-classes",
	/**
	 *
	 * @param {{className: ?string}} blockAttributes Block attributes.
	 * @param {{name: string}} blockType Block type settings.
	 * @returns {Object} blockAttributes
	 */
	function filterRowCustomClasses(blockAttributes, blockType) {
		if (blockType?.name === "gutestrap/row" && blockAttributes.className) {
			blockAttributes.className = stripRowClassNames(blockAttributes.className);
		}
		return blockAttributes;
	}
);

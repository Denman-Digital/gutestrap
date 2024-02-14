import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	// BlockControls,
	useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

import { BlockControlsBlockAppender } from "../../components/block-controls-block-appender";
import {
	BreakpointTabs,
	// BreakpointBlockControls,
	// LinkedBreakpointContext
} from "../../components/responsive-tabs";
// import { BlockFlexItemsAlignmentToolbar, BlockContentJustificationToolbar } from "../../components/alignment";
// import { toNumber } from "../../_common";

import { rowClassNames, stripRowClassNames } from "./render";
import { name as rowBreakBlockName } from "../row-break";
import { name as columnBlockName } from "../column/block.json";

const DEFAULT_ATTRIBUTES = {
	noGutters: false,
	verticalGutters: false,
	disabled: false,
	alignment: {
		xs: "top",
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

// const ROW_CHILDREN_LABEL = __("columns", "gutestrap");

// const generateRowColumnsOptions = (gridRowCols = 6) => {
// 	const opts = [];
// 	for (let count = 1; count <= gridRowCols; count++) {
// 		opts.push({
// 			label: `1/${count}`,
// 			value: count,
// 		});
// 	}
// 	return opts;
// };
// const ROW_COLS_OPTIONS = generateRowColumnsOptions();

// const INHERIT_OPTION = {
// 	label: __("Inherit from smaller (default)", "gutestrap"),
// 	value: 0,
// };

// const COLS_AUTO_OPTION = {
// 	label: __("Equal-width (default)", "gutestrap"),
// 	value: 0,
// };

const ROW_JUSTIFICATION_OPTIONS = [
	{
		label: __("Inherit from smaller (default)", "gutestrap"),
		value: "inherit",
	},
	{
		label: __("Pack columns to the left", "gutestrap"),
		value: "start",
	},
	{
		label: __("Pack columns in the center", "gutestrap"),
		value: "center",
	},
	{
		label: __("Pack columns to the right", "gutestrap"),
		value: "end",
	},
	{
		label: __("Distribute columns horizontally", "gutestrap"),
		value: "between",
	},
	{
		label: __("Distribute columns with equal spacing on each end", "gutestrap"),
		value: "evenly",
	},
	{
		label: __("Distribute columns with half-size spacing on each end", "gutestrap"),
		value: "around",
	},
];
const ROW_JUSTIFICATION_OPTIONS_XS = [
	{
		label: __("Pack columns to the left (default)", "gutestrap"),
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
		value: "stretch",
	},
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
];

const ROW_ALIGNMENT_OPTIONS_XS = [
	{
		label: __("Stretch (default)", "gutestrap"),
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
		className: classNames(className, rowClassNames(attributes), {
			"has-min-height":
				!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
		}),
	});

	// const [bp, setBP] = useState("md");

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
			{/* <LinkedBreakpointContext.Provider value={}> */}
			{/* <BlockControls> */}
			{/* <BlockContentJustificationToolbar
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
					controls={["stretch", "start", "center", "end", "baseline"]}
					onChange={(value) => {
						alignment.xs = value;
						setAttributes({ alignment: { ...alignment } });
					}}
				/> */}
			{/* <BreakpointBlockControls initialBreakpoint=""/> */}
			{/* <BreakpointBlockControls> */}
			{/* {(tab) => {
						const { label, breakpoint } = tab;
						const canInherit = breakpoint !== "xs";
						return (
							<Fragment>
								<SelectControl
									label={__("Distribute columns", "gutestrap")}
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
									label={__("Align columns", "gutestrap")}
									options={canInherit ? ROW_ALIGNMENT_OPTIONS : ROW_ALIGNMENT_OPTIONS_XS}
									value={
										alignment[breakpoint] != null ? alignment[breakpoint] : DEFAULT_ATTRIBUTES.alignment[breakpoint]
									}
									onChange={(value) => {
										alignment[breakpoint] = value;
										setAttributes({ alignment: { ...alignment } });
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
										direction[breakpoint] = value;
										setAttributes({ direction: { ...direction } });
									}}
								/>
							</Fragment>
						);
					}} */}
			{/* </BreakpointBlockControls> */}
			{/* </BlockControls> */}
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
								<p>{`${label} layout`}</p>
								<SelectControl
									label={__("Distribute columns", "gutestrap")}
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
									label={__("Align columns", "gutestrap")}
									options={canInherit ? ROW_ALIGNMENT_OPTIONS : ROW_ALIGNMENT_OPTIONS_XS}
									value={
										alignment[breakpoint] != null ? alignment[breakpoint] : DEFAULT_ATTRIBUTES.alignment[breakpoint]
									}
									onChange={(value) => {
										alignment[breakpoint] = value;
										setAttributes({ alignment: { ...alignment } });
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
										direction[breakpoint] = value;
										setAttributes({ direction: { ...direction } });
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
			{/* </LinkedBreakpointContext.Provider> */}
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

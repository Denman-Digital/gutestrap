import { __ } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";

import { BOOTSTRAP_ICON_CLASSES } from "../../_common";

import AlignItemsTopIcon from "./align-items-top.svg";
import AlignItemsCenterIcon from "./align-items-center.svg";
import AlignItemsBottomIcon from "./align-items-bottom.svg";
import AlignItemsBaselineIcon from "./align-items-baseline.svg";
import AlignItemsStretchIcon from "./align-items-stretch.svg";

import AlignSelfNoneIcon from "./align-self-none.svg";
import AlignSelfBaselineIcon from "./align-self-baseline.svg";
import AlignSelfStretchIcon from "./align-self-stretch.svg";
import AlignSelfTopIcon from "./align-self-top.svg";
import AlignSelfCenterIcon from "./align-self-middle.svg";
import AlignSelfBottomIcon from "./align-self-bottom.svg";

export const FLEX_ALIGN_ITEMS_OPTIONS = [
	{
		name: "start",
		icon: <AlignItemsTopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEMS% top", "gutestrap"),
	},
	{
		name: "center",
		icon: <AlignItemsCenterIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEMS% centre", "gutestrap"),
	},
	{
		name: "end",
		icon: <AlignItemsBottomIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEMS% bottom", "gutestrap"),
	},
	{
		name: "baseline",
		icon: <AlignItemsBaselineIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEMS% on baseline", "gutestrap"),
	},
	{
		name: "stretch",
		icon: <AlignItemsStretchIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Stretch %ITEMS% to fill", "gutestrap"),
	},
];

const BLOCK_FLEX_ITEMS_ALIGNMENT_CONTROLS = FLEX_ALIGN_ITEMS_OPTIONS.reduce((controls, { name, icon, title }) => {
	controls[name] = { icon, title };
	return controls;
}, {});

const POPOVER_PROPS = {
	isAlternate: true,
};

/**
 * BlockControl Toolbar for setting flex & grid alignments.
 *
 * @arg {Object} props - Props.
 * @arg {string} props.value - Value.
 * @arg {Function} props.onChange - Value change event handler.
 * @arg {string[]} props.controls - List of controls. Supported and default controls are "top", "middle", "bottom", and "baseline".
 * @arg {boolean} props.isCollapsed - Whether toolbar is open.
 * @arg {string} props.label - Item label for options. Default "item".
 * @returns {*} JSX.
 */
export function BlockFlexItemsAlignmentToolbar({
	value,
	onChange,
	controls = ["start", "center", "end", "baseline", "stretch"],
	isCollapsed = true,
	label = __("items", "gutestrap"),
}) {
	function applyOrUnset(align) {
		return () => onChange(value === align ? undefined : align);
	}

	const activeAlignment = BLOCK_FLEX_ITEMS_ALIGNMENT_CONTROLS[value];
	const defaultAlignmentControl = controls.length && BLOCK_FLEX_ITEMS_ALIGNMENT_CONTROLS[controls[0]];

	return (
		<ToolbarGroup
			popoverProps={POPOVER_PROPS}
			isCollapsed={isCollapsed}
			icon={activeAlignment ? activeAlignment.icon : defaultAlignmentControl.icon}
			label={__("Change %ITEMS% alignment", "gutestrap").replace("%ITEMS%", label)}
			controls={controls.map((control) => {
				const { icon, title } = BLOCK_FLEX_ITEMS_ALIGNMENT_CONTROLS[control];
				return {
					icon,
					title: title.replaceAll("%ITEMS%", label),
					isActive: value === control,
					role: isCollapsed ? "menuitemradio" : undefined,
					onClick: applyOrUnset(control),
				};
			})}
		/>
	);
}

export const FLEX_ALIGN_SELF_OPTIONS = {
	none: {
		name: "none",
		icon: <AlignSelfNoneIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Inherit alignment", "gutestrap"),
	},
	start: {
		name: "start",
		icon: <AlignSelfTopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEM% top", "gutestrap"),
	},
	center: {
		name: "center",
		icon: <AlignSelfCenterIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEM% centre", "gutestrap"),
	},
	end: {
		name: "end",
		icon: <AlignSelfBottomIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEM% bottom", "gutestrap"),
	},
	baseline: {
		name: "baseline",
		icon: <AlignSelfBaselineIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Align %ITEM% on baseline", "gutestrap"),
	},
	stretch: {
		name: "stretch",
		icon: <AlignSelfStretchIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Stretch %ITEM% to fill", "gutestrap"),
	},
};

// const BLOCK_FLEX_ITEM_ALIGNMENT_CONTROLS = FLEX_ALIGN_SELF_OPTIONS.reduce((controls, { name, icon, title }) => {
// 	controls[name] = { icon, title };
// 	return controls;
// }, {});

/**
 * BlockControl Toolbar for setting flex & grid alignments.
 *
 * @arg {Object} props - Props.
 * @arg {string} props.value - Value.
 * @arg {Function} props.onChange - Value change event handler.
 * @arg {string[]} props.controls - List of controls. Supported and default controls are "top", "middle", "bottom", and "baseline".
 * @arg {boolean} props.isCollapsed - Whether toolbar is open.
 * @arg {string} props.label - Item label for options. Default "item".
 * @returns {*} JSX.
 */
export function BlockFlexItemAlignmentToolbar({
	value,
	onChange,
	controls = ["none", "start", "center", "end", "baseline", "stretch"],
	isCollapsed = true,
	label = __("item", "gutestrap"),
}) {
	function applyOrUnset(align) {
		return () => onChange(value === align ? undefined : align);
	}

	const activeAlignment = FLEX_ALIGN_SELF_OPTIONS[value];
	const defaultAlignmentControl = FLEX_ALIGN_SELF_OPTIONS.none;

	return (
		<ToolbarGroup
			popoverProps={POPOVER_PROPS}
			isCollapsed={isCollapsed}
			icon={activeAlignment ? activeAlignment.icon : defaultAlignmentControl.icon}
			label={__("Change %ITEM% alignment", "gutestrap").replace("%ITEM%", label)}
			controls={controls.map((control) => {
				const { icon, title } = FLEX_ALIGN_SELF_OPTIONS[control];
				return {
					icon,
					title: title.replaceAll("%ITEM%", label),
					isActive: value === control,
					role: isCollapsed ? "menuitemradio" : undefined,
					onClick: applyOrUnset(control),
				};
			})}
		/>
	);
}

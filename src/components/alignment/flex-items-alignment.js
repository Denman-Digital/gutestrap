import { _x } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";

//

import { ReactComponent as AlignItemsTopIcon } from "./align-items-top.svg";
import { ReactComponent as AlignItemsCenterIcon } from "./align-items-center.svg";
import { ReactComponent as AlignItemsBottomIcon } from "./align-items-bottom.svg";
import { ReactComponent as AlignItemsBaselineIcon } from "./align-items-baseline.svg";
import { ReactComponent as AlignItemsStretchIcon } from "./align-items-stretch.svg";

import { ReactComponent as AlignSelfNoneIcon } from "./align-self-none.svg";
import { ReactComponent as AlignSelfBaselineIcon } from "./align-self-baseline.svg";
import { ReactComponent as AlignSelfStretchIcon } from "./align-self-stretch.svg";
import { ReactComponent as AlignSelfTopIcon } from "bootstrap-icons/icons/align-top.svg";
import { ReactComponent as AlignSelfCenterIcon } from "bootstrap-icons/icons/align-middle.svg";
import { ReactComponent as AlignSelfBottomIcon } from "bootstrap-icons/icons/align-bottom.svg";

export const BOOTSTRAP_ICON_CLASSES = "bi bi-block-control-icon";

export const FLEX_ALIGN_ITEMS_OPTIONS = [
	{
		name: "start",
		icon: <AlignItemsTopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEMS% top", "Block flex content alignment setting", "gutestrap"),
	},
	{
		name: "center",
		icon: <AlignItemsCenterIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEMS% center", "Block flex content alignment setting", "gutestrap"),
	},
	{
		name: "end",
		icon: <AlignItemsBottomIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEMS% bottom", "Block flex content alignment setting", "gutestrap"),
	},
	{
		name: "baseline",
		icon: <AlignItemsBaselineIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEMS% on baseline", "Block flex content alignment setting", "gutestrap"),
	},
	{
		name: "stretch",
		icon: <AlignItemsStretchIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Stretch %ITEMS% to fill", "Block flex content alignment setting", "gutestrap"),
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
	label = _x("items", "Block items reference for alignment labels", "gutestrap"),
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
			label={_x("Change %ITEMS% alignment", "Block items alignment setting label", "gutestrap").replace(
				"%ITEMS%",
				label
			)}
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
		title: _x("Inherit alignment", "Block flex self alignment setting", "gutestrap"),
	},
	start: {
		name: "start",
		icon: <AlignSelfTopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEM% top", "Block flex self alignment setting", "gutestrap"),
	},
	center: {
		name: "center",
		icon: <AlignSelfCenterIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEM% center", "Block flex self alignment setting", "gutestrap"),
	},
	end: {
		name: "end",
		icon: <AlignSelfBottomIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEM% bottom", "Block flex self alignment setting", "gutestrap"),
	},
	baseline: {
		name: "baseline",
		icon: <AlignSelfBaselineIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Align %ITEM% on baseline", "Block flex self alignment setting", "gutestrap"),
	},
	stretch: {
		name: "stretch",
		icon: <AlignSelfStretchIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Stretch %ITEM% to fill", "Block flex self alignment setting", "gutestrap"),
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
	label = _x("item", "Block self reference for alignment labels", "gutestrap"),
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
			label={_x("Change %ITEM% alignment", "Block item self alignment setting label", "gutestrap").replace(
				"%ITEM%",
				label
			)}
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

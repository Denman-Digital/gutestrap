import { __, _x } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";

import "./editor.scss";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { ReactComponent as JustifyStartIcon } from "./justify-start.svg";
import { ReactComponent as JustifyCenterIcon } from "./justify-center.svg";
import { ReactComponent as JustifyEndIcon } from "./justify-end.svg";
import { ReactComponent as JustifySpaceBetweenIcon } from "./justify-space-between.svg";
import { ReactComponent as JustifySpaceEvenlyIcon } from "./justify-space-evenly.svg";
import { ReactComponent as JustifySpaceAroundIcon } from "./justify-space-around.svg";

const BOOTSTRAP_ICON_CLASSES = "bi bi-block-control-icon";

export const FLEX_JUSTIFY_CONTENT_OPTIONS = [
	{
		name: "start",
		icon: <JustifyStartIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Pack %ITEMS% to the left", "Block content justification setting", GUTESTRAP_TEXT_DOMAIN),
	},
	{
		name: "center",
		icon: <JustifyCenterIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Pack %ITEMS% in the centre", "Block content justification setting", GUTESTRAP_TEXT_DOMAIN),
	},
	{
		name: "end",
		icon: <JustifyEndIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Pack %ITEMS% to the right", "Block content justification setting", GUTESTRAP_TEXT_DOMAIN),
	},
	{
		name: "between",
		icon: <JustifySpaceBetweenIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x("Distribute %ITEMS% horizontally", "Block content justification setting", GUTESTRAP_TEXT_DOMAIN),
	},
	{
		name: "evenly",
		icon: <JustifySpaceEvenlyIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x(
			"Distribute %ITEMS% with equal spacing on each end",
			"Block content justification setting",
			GUTESTRAP_TEXT_DOMAIN
		),
	},
	{
		name: "around",
		icon: <JustifySpaceAroundIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: _x(
			"Distribute %ITEMS% with half-size spacing on each end",
			"Block content justification setting",
			GUTESTRAP_TEXT_DOMAIN
		),
	},
];

const BLOCK_CONTENT_JUSTIFICATION_CONTROLS = FLEX_JUSTIFY_CONTENT_OPTIONS.reduce((controls, { name, title, icon }) => {
	controls[name] = { icon, title };
	return controls;
}, {});

const DEFAULT_CONTROLS = ["start", "center", "end", "between", "evenly", "around"];
const DEFAULT_CONTROL = "start";
const DEFAULT_LABEL = __("items", GUTESTRAP_TEXT_DOMAIN);

const POPOVER_PROPS = {
	isAlternate: true,
	className: "popover-align-text-start",
};

/**
 * BlockControl Toolbar for setting flex content justification.
 *
 * @arg {Object} props - Props.
 * @arg {string} props.value - Value.
 * @arg {Function} props.onChange - Value change event handler.
 * @arg {string[]} props.controls - List of controls. Supported and default controls are ["start", "center", "end", "between", "evenly", and "around".
 * @arg {boolean} props.isCollapsed - Whether toolbar is open.
 * @arg {string} props.label - Item label for options. Default "item".
 * @returns {*} JSX.
 */
export function BlockContentJustificationToolbar({
	value,
	onChange,
	controls = DEFAULT_CONTROLS,
	isCollapsed = true,
	label = DEFAULT_LABEL,
}) {
	function applyOrUnset(align) {
		return () => onChange(value === align ? undefined : align);
	}

	const activeAlignment = BLOCK_CONTENT_JUSTIFICATION_CONTROLS[value];
	const defaultAlignmentControl = BLOCK_CONTENT_JUSTIFICATION_CONTROLS[DEFAULT_CONTROL];

	return (
		<ToolbarGroup
			popoverProps={POPOVER_PROPS}
			isCollapsed={isCollapsed}
			icon={activeAlignment ? activeAlignment.icon : defaultAlignmentControl.icon}
			label={_x("Change content distribution", "Block content justification setting label", GUTESTRAP_TEXT_DOMAIN)}
			controls={controls.map((control) => {
				/** @type {{icon: *, title: string}} */
				const { icon, title } = BLOCK_CONTENT_JUSTIFICATION_CONTROLS[control];
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

export default BlockContentJustificationToolbar;

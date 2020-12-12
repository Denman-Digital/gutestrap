import { __ } from "@wordpress/i18n";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { RowEdit as edit } from "./edit";
import { RowRender as save, deprecated } from "./render";
import { ReactComponent as icon } from "bootstrap-icons/icons/layout-three-columns.svg";

import RowBreakBlock from "./row-break";
export { RowBreakBlock };

/** Block name. */
export const name = "gutestrap/row";

/** Block title. */
export const title = __("Row", GUTESTRAP_TEXT_DOMAIN);

/** Block attributes. */
export const attributes = {
	noGutters: { type: "boolean" },
	verticalGutters: { type: "boolean" },
	alignment: { type: "object" },
	justification: { type: "object" },
	defaultColWidth: { type: "object" },
	disabled: { type: "boolean" },
	padding: { type: "object" },
	anchor: { type: "string" },
};

/** Block attribute default values. */
export const DEFAULT_ATTRIBUTES = {
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
	defaultColWidth: {
		xs: 0,
		sm: 0,
		md: 0,
		lg: 0,
		xl: 0,
		xxl: 0,
	},
};

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
};

export { icon, edit, save };

export default { name, settings: { title, icon, attributes, edit, save, supports, deprecated } };

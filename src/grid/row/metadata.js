import { __ } from "@wordpress/i18n";

/** Block name. */
export const name = "gutestrap/row";

/** Block title. */
export const title = __("Row", "gutestrap");

/** Block Description. */
export const description = __("Use rows to create responsive & mobile-first multi-column layouts", "gutestrap");

/** Block attributes. */
export const attributes = {
	noGutters: { type: "boolean" },
	verticalGutters: { type: "boolean" },
	alignment: { type: "object" },
	justification: { type: "object" },
	defaultColWidth: { type: "object" },
	direction: { type: "object" },
	disabled: { type: "boolean" },
	padding: { type: "object" },
	anchor: { type: "string" },
	_isExample: { type: "boolean" },
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
	direction: {
		xs: "row",
		sm: "inherit",
		md: "inherit",
		lg: "inherit",
		xl: "inherit",
		xxl: "inherit",
	},
};

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
};

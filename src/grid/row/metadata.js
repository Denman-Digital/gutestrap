import { __ } from "@wordpress/i18n";

export const apiVersion = 2;

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
	direction: { type: "object" },
	disabled: { type: "boolean" },
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
	alignWide: false,
	spacing: {
		padding: ["top", "bottom"], // Enable vertical padding.
		margin: ["top", "bottom"], // Enable vertical margin.
	},
	dimensions: {
		minHeight: true,
	},
};

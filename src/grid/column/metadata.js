import { __ } from "@wordpress/i18n";

/** Block name. */
export const name = "gutestrap/col";

/** Block title. */
export const title = __("Row Column", "gutestrap");

/** Block Description. */
export const description = __("Row columns are the building blocks of responsive layouts.", "gutestrap");

/** Block attributes. */
export const attributes = {
	width: {
		type: "object",
		default: {
			xs: 12,
		},
	},
	offset: { type: "object" },
	alignment: { type: "object" },
	contentAlignment: { type: "object" },
	background: { type: "object" },
	_isExample: { type: "boolean" },
};

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
	alignWide: false,
	color: {
		gradients: true,
		background: true,
		text: true,
	},
	spacing: {
		margin: ["top", "bottom"], // Enable vertical margins.
		padding: true, // Enable padding for all sides.
	},
};

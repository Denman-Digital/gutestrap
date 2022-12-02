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
			md: "default",
		},
	},
	offset: { type: "object" },
	alignment: { type: "object" },
	contentAlignment: { type: "object" },
	background: { type: "object" },
	textColor: { type: "string" },
	backgroundColor: { type: "string" },
	// borderColor: { type: "string" },
	gradient: { type: "string" },
	customTextColor: { type: "string" },
	customBackgroundColor: { type: "string" },
	// customBorderColor: { type: "string" },
	// border: {
	// 	type: "object",
	// 	default: {
	// 		color: "transparent",
	// 		width: "2px",
	// 		style: "solid",
	// 		radius: 0,
	// 	},
	// },
	customGradient: { type: "string" },
	padding: { type: "object" },
	margin: { type: "object" },
	_isExample: { type: "boolean" },
};

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
	alignWide: false,
	// border: {
	// 	radius: true,
	// },
	// __experimentalBorder: {
	// 	color: true,
	// 	radius: true,
	// 	style: true,
	// 	width: true,
	// 	// __experimentalSkipSerialization: true,
	// 	__experimentalDefaultControls: {
	// 		color: true,
	// 		radius: true,
	// 		style: true,
	// 		width: true,
	// 	},
	// },
};

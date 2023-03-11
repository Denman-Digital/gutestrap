import { __ } from "@wordpress/i18n";

/** Block name. */
export const name = "gutestrap/container";

/** Block title. */
export const title = __("Container", "gutestrap");

/** Block Description. */
export const description = __(
	"Containers are used to contain, pad, and (sometimes) center the content within them",
	"gutestrap"
);

/** Block attributes. */
export const attributes = {
	fluid: { type: "boolean" },
	breakpoint: { type: "string" },
	disabled: { type: "boolean" },
	insetVertical: { type: "boolean" },
	insetExpand: { type: "boolean" },
	insetConditional: { type: "boolean" },
	background: { type: "object" },
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
		padding: ["top", "bottom"], // Enable vertical padding.
		margin: ["top", "bottom"], // Enable vertical margin.
	},
};

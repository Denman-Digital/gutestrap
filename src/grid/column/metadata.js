const { __ } = wp.i18n;

/** Block name. */
export const name = "gutestrap/col";

/** Block title. */
export const title = __("Row Column", "gutestrap");

/** Block Description. */
export const description = __("Row columns are the building blocks of responsive layouts.", "gutestrap");

/** Block attributes. */
export const attributes = {
	width: { type: "object" },
	offset: { type: "object" },
	alignment: { type: "object" },
	contentAlignment: { type: "object" },
	// order: { type: "object" },
	background: { type: "object" },
	textColor: { type: "string" },
	backgroundColor: { type: "string" },
	borderColor: { type: "string" },
	gradient: { type: "string" },
	customTextColor: { type: "string" },
	customBackgroundColor: { type: "string" },
	customBorderColor: { type: "string" },
	customGradient: { type: "string" },
	padding: { type: "object" },
	margin: { type: "object" },
	_isExample: { type: "boolean" },
};

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
	alignWide: false,
};

/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from "@wordpress/i18n";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save, deprecated } from "./render";
import { ReactComponent as icon } from "./icon.svg";
import { name as rowBlockName } from "../row";

/** Block name. */
export const name = "gutestrap/col";

/** Block title. */
export const title = __("Row Column", GUTESTRAP_TEXT_DOMAIN);

/** Block Description. */
export const description = __("Row columns are the building blocks of responsive layouts.", GUTESTRAP_TEXT_DOMAIN);

/** Block attributes. */
export const attributes = {
	width: { type: "object" },
	offset: { type: "object" },
	alignment: { type: "object" },
	contentAlignment: { type: "object" },
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

/** @type {string[]} Allowed parent blocks. */
export const parent = [rowBlockName];

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
	alignWide: false,
};

export const example = {
	attributes: {
		width: {
			xs: 6,
		},
		offset: {
			xs: 3,
		},
		_isExample: true,
	},
	innerBlocks: [
		{
			name: "core/heading",
			attributes: {
				/* translators: example text. */
				content: __("Cyborg Roundup", GUTESTRAP_TEXT_DOMAIN),
			},
		},
		{
			name: "core/paragraph",
			attributes: {
				/* translators: example text. */
				content: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", GUTESTRAP_TEXT_DOMAIN),
			},
		},
	],
};

export { icon, edit, save };

export default {
	name,
	settings: { title, description, icon, parent, attributes, supports, edit, save, deprecated, example },
};

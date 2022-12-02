import { __ } from "@wordpress/i18n";

import { name, title, description, attributes, supports } from "./metadata";
import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save, deprecated } from "./render";
import icon from "./icon.svg";

import { name as rowBlockName } from "../row";

/** @type {string[]} Allowed parent blocks. */
export const parent = [rowBlockName];

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
				content: __("Cyborg Roundup", "gutestrap"),
			},
		},
		{
			name: "core/paragraph",
			attributes: {
				/* translators: example text. */
				content: __("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "gutestrap"),
			},
		},
	],
};

export { name, title, description, icon, attributes, supports, edit, save, deprecated };

export default {
	name,
	settings: { title, description, icon, parent, attributes, supports, edit, save, deprecated, example },
};

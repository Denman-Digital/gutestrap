import { name, title, description, attributes, supports } from "./metadata";
import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save, deprecated } from "./render";
import icon from "./icon.svg";

import { name as rowBlockName } from "../row";

/** @type {string[]} Allowed parent blocks. */
const parent = [rowBlockName];

const example = {
	attributes: {
		width: {
			xs: 6,
		},
		offset: {
			xs: 3,
		},
		style: {
			color: {
				text: "#1a1a1a",
				background: "#e0e0e0",
			},
			// spacing: {
			// 	padding: {
			// 		top: "1rem",
			// 		right: "1rem",
			// 		bottom: "1rem",
			// 		left: "1rem",
			// 	},
			// },
		},
		_isExample: true,
	},
	innerBlocks: [
		{
			name: "core/heading",
			attributes: {
				content: "Nulla Dies Umquam Memori Vos Eximet Aevo",
			},
		},
		{
			name: "core/paragraph",
			attributes: {
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			},
		},
	],
};

export { name, title, description, icon, parent, attributes, supports, edit, save, deprecated, example };

export default {
	name,
	settings: { title, description, icon, parent, attributes, supports, edit, save, deprecated, example },
};

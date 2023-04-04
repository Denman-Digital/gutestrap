import { name, title, description, attributes, supports, apiVersion } from "./metadata";
import { RowEdit as edit } from "./edit";
import { RowRender as save, deprecated } from "./render";
import icon from "bootstrap-icons/icons/layout-three-columns.svg";

import RowBreakBlock from "./row-break";
export { RowBreakBlock };

export const example = {
	attributes: {
		_isExample: true,
	},
	viewportWidth: 800,
	// innerBlocks: [
	// 	{
	// 		name: colBlockName,
	// 		attributes: {
	// 			width: { xs: 4 },
	// 		},
	// 		innerBlocks: [
	// 			{
	// 				name: "core/image",
	// 				attributes: {
	// 					url: "https://s.w.org/images/core/5.3/MtBlanc1.jpg",
	// 					caption: __("The mountain top appears.", "gutestrap"),
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		name: colBlockName,
	// 		attributes: {
	// 			width: { xs: 8 },
	// 		},
	// 		innerBlocks: [
	// 			{
	// 				name: "core/heading",
	// 				attributes: {
	// 					/* translators: example text. */
	// 					content: __("Legendary Crustaceans", "gutestrap"),
	// 				},
	// 			},
	// 			{
	// 				name: "core/paragraph",
	// 				attributes: {
	// 					/* translators: example text. */
	// 					content: __(
	// 						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	// 						"gutestrap"
	// 					),
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		name: colBlockName,
	// 		attributes: {
	// 			width: { xs: 6 },
	// 		},
	// 		innerBlocks: [
	// 			{
	// 				name: "core/paragraph",
	// 				attributes: {
	// 					/* translators: example text. */
	// 					content: __(
	// 						"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
	// 						"gutestrap"
	// 					),
	// 				},
	// 			},
	// 		],
	// 	},
	// 	{
	// 		name: colBlockName,
	// 		attributes: {
	// 			width: { xs: 6 },
	// 		},
	// 		innerBlocks: [
	// 			{
	// 				name: "core/paragraph",
	// 				attributes: {
	// 					/* translators: example text. */
	// 					content: __(
	// 						"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	// 						"gutestrap"
	// 					),
	// 				},
	// 			},
	// 		],
	// 	},
	// ],
};

export { name, title, description, attributes, icon, edit, save, supports, deprecated, apiVersion };

export default {
	name,
	settings: { title, description, icon, attributes, example, edit, save, supports, deprecated, apiVersion },
};

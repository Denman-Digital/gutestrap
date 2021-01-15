import { __ } from "@wordpress/i18n";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { RowEdit as edit } from "./edit";
import { RowRender as save, deprecated } from "./render";
import { ReactComponent as icon } from "bootstrap-icons/icons/layout-three-columns.svg";

import { name as colBlockName } from "../column";
import RowBreakBlock from "./row-break";
export { RowBreakBlock };

/** Block name. */
export const name = "gutestrap/row";

/** Block title. */
export const title = __("Row", GUTESTRAP_TEXT_DOMAIN);

/** Block Description. */
export const description = __(
	"Use rows to create responsive & mobile-first multi-column layouts",
	GUTESTRAP_TEXT_DOMAIN
);

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

export const example = {
	attributes: {
		_isExample: true,
	},
	viewportWidth: 800,
	innerBlocks: [
		{
			name: colBlockName,
			attributes: {
				width: { xs: 4 },
			},
			innerBlocks: [
				{
					name: "core/image",
					attributes: {
						url: "https://s.w.org/images/core/5.3/MtBlanc1.jpg",
						caption: __("The mountain top appears.", GUTESTRAP_TEXT_DOMAIN),
					},
				},
			],
		},
		{
			name: colBlockName,
			attributes: {
				width: { xs: 8 },
			},
			innerBlocks: [
				{
					name: "core/heading",
					attributes: {
						/* translators: example text. */
						content: __("Legendary Crustaceans", GUTESTRAP_TEXT_DOMAIN),
					},
				},
				{
					name: "core/paragraph",
					attributes: {
						/* translators: example text. */
						content: __(
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
							GUTESTRAP_TEXT_DOMAIN
						),
					},
				},
			],
		},
		{
			name: colBlockName,
			attributes: {
				width: { xs: 6 },
			},
			innerBlocks: [
				{
					name: "core/paragraph",
					attributes: {
						/* translators: example text. */
						content: __(
							"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
							GUTESTRAP_TEXT_DOMAIN
						),
					},
				},
			],
		},
		{
			name: colBlockName,
			attributes: {
				width: { xs: 6 },
			},
			innerBlocks: [
				{
					name: "core/paragraph",
					attributes: {
						/* translators: example text. */
						content: __(
							"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
							GUTESTRAP_TEXT_DOMAIN
						),
					},
				},
			],
		},
	],
};

export { icon, edit, save };

export default { name, settings: { title, description, icon, attributes, example, edit, save, supports, deprecated } };

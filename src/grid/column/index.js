/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from "@wordpress/i18n";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save } from "./render";
import { ReactComponent as icon } from "./icon.svg";
import { name as rowBlockName } from "../row";

/** Block name. */
export const name = "gutestrap/col";

/** Block title. */
export const title = __("Column", GUTESTRAP_TEXT_DOMAIN); // Block title.

/** Block attributes. */
export const attributes = {
	width: { type: "object" },
	offset: { type: "object" },
	alignment: { type: "object" },
};

/** Block category. */
export const category = "layout";

/** @type {string[]} Allowed parent blocks. */
export const parent = [rowBlockName];

export { icon, edit, save };

export default { name, settings: { title, category, icon, parent, attributes, edit, save } };

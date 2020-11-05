/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from "@wordpress/i18n";
import { column as icon } from "@wordpress/icons";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save } from "./render";

const name = "gutestrap/col"; // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.

const title = __("Column", GUTESTRAP_TEXT_DOMAIN); // Block title.

const attributes = {
	width: { type: "object" },
	offset: { type: "object" },
};

const category = "layout";

const parent = ["gutestrap/row"];

export default { name, settings: { title, category, icon, parent, attributes, edit, save } };

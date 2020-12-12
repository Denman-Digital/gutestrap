/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from "@wordpress/i18n";
import { createHigherOrderComponent } from "@wordpress/compose";
import classNames from "classnames";

import { ReactComponent as BreakIcon } from "./break-icon.svg";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import { name as rowBlockName } from "./index";

export const name = "gutestrap/row-break";

export const title = __("Row Break", GUTESTRAP_TEXT_DOMAIN);

export const description = __(
	"Row breaks will cause any following columns to start on a new line.",
	GUTESTRAP_TEXT_DOMAIN
);

/** @type {string[]} Allowed parent blocks. */
export const parent = [rowBlockName];

export const save = ({ className }) => {
	return <div className={classNames("w-100", className)} aria-hidden="true" />;
};

export const edit = ({ className }) => {
	return (
		<div className={classNames("w-100", className)} aria-hidden="true">
			<BreakIcon width="24" height="24" className="bi bi-row-break-icon" />
		</div>
	);
};

// /** Supported WordPress/Gutenberg features. */
// export const supports = {
// 	anchor: true,
// };

export { BreakIcon as icon };

export default { name, settings: { title, icon: BreakIcon, description, parent, edit, save } };

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-row-break-block-list-block-classes",
	createHigherOrderComponent((BlockListBlock) => {
		/**
		 * @arg {Object} props - Props.
		 * @arg {Object} props.attributes - Block attributes.
		 * @arg {Object} props.block - Block properties.
		 * @arg {string} props.block.name - Block name.
		 * @returns {*} JSX
		 */
		const gutestrapRowBreakBlockListBlockClasses = ({ className, ...props }) => {
			const { block } = props;
			if (block.name === name) {
				className = classNames(className, "w-100");
			}
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapRowBreakBlockListBlockClasses;
	}, "withGutestrapRowBreakBlockListBlockClasses")
);

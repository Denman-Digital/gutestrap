/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { registerBlockType } = wp.blocks;
const { createHigherOrderComponent } = wp.compose;
import classNames from "classnames";

import ContainerBlock from "./container";
import RowBlock, { RowBreakBlock } from "./row";
import ColumnBlock from "./column";

/** Block category. */
const category = "bootstrap-grid";

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(ContainerBlock.name, { category, ...ContainerBlock.settings });
registerBlockType(RowBlock.name, { category, ...RowBlock.settings });
registerBlockType(RowBreakBlock.name, { category, ...RowBreakBlock.settings });
registerBlockType(ColumnBlock.name, { category, ...ColumnBlock.settings });

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-block-list-block-classes",
	createHigherOrderComponent((BlockListBlock) => {
		/**
		 * @arg {Object} props - Props.
		 * @arg {Object} props.attributes - Block attributes.
		 * @arg {Object} props.block - Block properties.
		 * @arg {string} props.block.name - Block name.
		 * @returns {*} JSX
		 */
		const gutestrapBlockListBlockClasses = ({ className, ...props }) => {
			const { block, attributes } = props;
			if (block.name.startsWith("gutestrap/")) {
				className = classNames(className, {
					"gutestrap-block": true,
					[`gutestrap-block-${block.name.slice(10)}`]: true,
					"-is-disabled": !!attributes?.disabled,
					"-is-example": !!attributes?._isExample,
				});
			}
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapBlockListBlockClasses;
	}, "withGutestrapBlockListBlockClasses")
);

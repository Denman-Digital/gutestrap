/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import "./editor.scss";
import "./style.scss";
import { GUTESTRAP_TEXT_DOMAIN } from "../const";

import classNames from "classnames";

import { __ } from "@wordpress/i18n";

import { Fragment } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";

import RowBlock, { RowBreakBlock } from "./row";
import ColumnBlock from "./column";

/**
 * Register: aa Gutenberg Block.
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
registerBlockType("gutestrap/container", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Container", GUTESTRAP_TEXT_DOMAIN), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "layout",
	attributes: {
		fluid: {
			type: "boolean",
		},
		breakpoint: {
			type: "string",
		},
	},
	description: "Containers are used to contain, pad, and (sometimes) center the content within them",
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ({ attributes, className, setAttributes }) => {
		const { breakpoint, fluid } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Responsive Max-Width", GUTESTRAP_TEXT_DOMAIN)}>
						<ToggleControl
							label={__("Enable fluid-width", GUTESTRAP_TEXT_DOMAIN)}
							help={__("Allow this container to stretch to full-width for certain breakpoints.", GUTESTRAP_TEXT_DOMAIN)}
							checked={fluid}
							onChange={(checked) => {
								setAttributes({ fluid: !!checked });
							}}
						/>
						<SelectControl
							label={__("Max-width breakpoint", GUTESTRAP_TEXT_DOMAIN)}
							help={__(
								"Choose the viewport width at which this container should set a max-width.",
								GUTESTRAP_TEXT_DOMAIN
							)}
							disabled={!fluid}
							options={[
								{
									label: __("576px and up (landscape smartphone)", GUTESTRAP_TEXT_DOMAIN),
									value: "",
								},
								{ label: __("768px and up (tablet)", GUTESTRAP_TEXT_DOMAIN), value: "md" },
								{ label: __("992px and up (landscape tablet)", GUTESTRAP_TEXT_DOMAIN), value: "lg" },
								{
									label: __("1200px and up (laptop)", GUTESTRAP_TEXT_DOMAIN),
									value: "xl",
								},
								{
									label: __("1440px and up (desktop)", GUTESTRAP_TEXT_DOMAIN),
									value: "xxl",
								},
								{ label: __("No max-width", GUTESTRAP_TEXT_DOMAIN), value: "fluid" },
							]}
							onChange={(value) => setAttributes({ breakpoint: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={classNames(className, `container${breakpoint ? "-" + breakpoint : ""}`)}>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({ attributes, className }) => {
		const { breakpoint } = attributes;
		return (
			<div className={classNames(className, `container${breakpoint ? "-" + breakpoint : ""}`)}>
				<InnerBlocks.Content />
			</div>
		);
	},
});

registerBlockType(RowBlock.name, RowBlock.settings);
registerBlockType(ColumnBlock.name, ColumnBlock.settings);
registerBlockType(RowBreakBlock.name, RowBreakBlock.settings);

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
			const { block } = props;
			if (block.name.startsWith("gutestrap/")) {
				className = classNames(className, "gutestrap-block", `gutestrap-block-${block.name.slice(10)}`);
			}
			return <BlockListBlock {...props} className={className} />;
		};
		return gutestrapBlockListBlockClasses;
	}, "withGutestrapBlockListBlockClasses")
);

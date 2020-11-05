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
import { sprintf } from "sprintf-js";

import { __, _n } from "@wordpress/i18n";

import { Fragment, useMemo } from "@wordpress/element";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, SelectControl, TabPanel } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { columns as columnsIcon, column as columnIcon } from "@wordpress/icons";

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
		const { breakpoint } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Responsive Max-Width", GUTESTRAP_TEXT_DOMAIN)}>
						<SelectControl
							label={__("Max-width breakpoint", GUTESTRAP_TEXT_DOMAIN)}
							help={__(
								"Choose the viewport width at which this container should set a max-width.",
								GUTESTRAP_TEXT_DOMAIN
							)}
							options={[
								{
									label: __("576px and up (default)", GUTESTRAP_TEXT_DOMAIN),
									value: "",
								},
								{ label: __("768px and up", GUTESTRAP_TEXT_DOMAIN), value: "md" },
								{ label: __("992px and up", GUTESTRAP_TEXT_DOMAIN), value: "lg" },
								{
									label: __("1200px and up", GUTESTRAP_TEXT_DOMAIN),
									value: "lg",
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

const generateRowOptions = (gridCols = 12) => {
	const opts = [];
	for (let count = 1; count <= gridCols; count++) {
		opts.push({
			label: sprintf(_n("%d column", "%d columns", count, GUTESTRAP_TEXT_DOMAIN), count),
			value: count,
		});
	}
	return opts;
};

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
registerBlockType("gutestrap/row", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Row", GUTESTRAP_TEXT_DOMAIN), // Block title.
	icon: columnsIcon,
	category: "layout",
	attributes: {
		gutters: {
			type: "boolean",
		},
		defaultColWidth: {
			type: "object",
		},
	},
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
		const { defaultColWidth = {} } = attributes;
		const rowProps = {
			className: classNames(className, {
				row: true,
				[`row-cols-${defaultColWidth.xs}`]: !!defaultColWidth.xs,
				[`row-cols-sm-${defaultColWidth.sm}`]: !!defaultColWidth.sm,
				[`row-cols-md-${defaultColWidth.md}`]: !!defaultColWidth.md,
				[`row-cols-lg-${defaultColWidth.lg}`]: !!defaultColWidth.lg,
				[`row-cols-xl-${defaultColWidth.xl}`]: !!defaultColWidth.xl,
			}),
		};

		const options = useMemo(generateRowOptions, [generateRowOptions]);
		const inheritOption = {
			label: __("Inherit from smaller (default)", GUTESTRAP_TEXT_DOMAIN),
			value: 0,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Default Column Layout", GUTESTRAP_TEXT_DOMAIN)}>
						<p>
							{__(
								"Quickly set the number of columns that best render your content and layout. Columns can still be configured individually",
								GUTESTRAP_TEXT_DOMAIN
							)}
						</p>
						<SelectControl
							label={__("Base", GUTESTRAP_TEXT_DOMAIN)}
							options={[
								{
									label: __("Equal-width auto-layout (default)", GUTESTRAP_TEXT_DOMAIN),
									value: 0,
								},
								...options,
							]}
							value={defaultColWidth.xs || 0}
							onChange={(xs) => setAttributes({ defaultColWidth: { ...defaultColWidth, xs } })}
						/>
						<SelectControl
							label={__("Small (576px and up)", GUTESTRAP_TEXT_DOMAIN)}
							options={[inheritOption, ...options]}
							value={defaultColWidth.sm || 0}
							onChange={(sm) => setAttributes({ defaultColWidth: { ...defaultColWidth, sm } })}
						/>
						<SelectControl
							label={__("Medium (768px and up)", GUTESTRAP_TEXT_DOMAIN)}
							options={[inheritOption, ...options]}
							value={defaultColWidth.md || 0}
							onChange={(md) => setAttributes({ defaultColWidth: { ...defaultColWidth, md } })}
						/>
						<SelectControl
							label={__("Large (992px and up)", GUTESTRAP_TEXT_DOMAIN)}
							options={[inheritOption, ...options]}
							value={defaultColWidth.lg || 0}
							onChange={(lg) => setAttributes({ defaultColWidth: { ...defaultColWidth, lg } })}
						/>
						<SelectControl
							label={__("Extra-large (1200px and up)", GUTESTRAP_TEXT_DOMAIN)}
							options={[inheritOption, ...options]}
							value={defaultColWidth.xl || 0}
							onChange={(xl) => setAttributes({ defaultColWidth: { ...defaultColWidth, xl } })}
						/>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks
					allowedBlocks={["gutestrap/col"]}
					orientation="horizontal"
					__experimentalPassedProps={rowProps}
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
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
		const { defaultColWidth = {} } = attributes;
		return (
			<div
				className={classNames(className, {
					row: true,
					[`row-cols-${defaultColWidth.xs}`]: !!defaultColWidth.xs,
					[`row-cols-sm-${defaultColWidth.sm}`]: !!defaultColWidth.sm,
					[`row-cols-md-${defaultColWidth.md}`]: !!defaultColWidth.md,
					[`row-cols-lg-${defaultColWidth.lg}`]: !!defaultColWidth.lg,
					[`row-cols-xl-${defaultColWidth.xl}`]: !!defaultColWidth.xl,
				})}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});

registerBlockType(ColumnBlock.name, ColumnBlock.settings);

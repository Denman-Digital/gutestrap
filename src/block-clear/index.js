/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { InspectorControls } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { PanelBody, BaseControl } from "@wordpress/components";
import { withInstanceId } from "@wordpress/compose";

/**
 * Register a Gutenberg Block.
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
registerBlockType("gutestrap/clear", {
	title: __("Clear", "gutestrap"),
	description: __(
		"Push the following content below any floating elements, such as left‐ or right‐aligned images and other media.",
		"gutestrap"
	),
	icon: "forms",
	category: "layout",
	keywords: [__("layout", "gutestrap"), __("alignment", "gutestrap"), __("clear", "gutestrap")],
	attributes: {
		height: {
			type: "integer",
			source: "attribute",
			default: 0,
			attribute: "height",
		},
	},
	transforms: {
		to: [
			{
				type: "block",
				blocks: ["core/spacer"],
				transform: ({ height }) => {
					createBlock("core/spacer", { height });
				},
			},
		],
		from: [
			{
				type: "block",
				blocks: ["core/spacer"],
				transform: ({ height }) => {
					createBlock("gutestrap/clear", { height });
				},
			},
		],
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: withInstanceId(({ attributes, instanceId, className, setAttributes }) => {
		const id = `block-spacer-height-input-${instanceId}`;
		const { height } = attributes;
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__("Settings", "gutestrap")}>
						<BaseControl label={__("Height in pixels")} id={id}>
							<input
								type="number"
								id={id}
								onChange={(event) => {
									let clearHeight = parseInt(event.target.value, 10);
									if (clearHeight < 0) {
										clearHeight = 0;
									}
									setAttributes({
										height: clearHeight,
									});
								}}
								value={height}
								min="0"
								step="1"
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<div className={className} height={height}>
					<hr className={"gutestrap-block-clear-placeholder"} />
				</div>
			</Fragment>
		);
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({ attributes, className }) => {
		return <div className={className} height={attributes.height}></div>;
	},
});

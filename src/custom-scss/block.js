const { registerBlockType } = wp.blocks;
const { useState, useRef, useEffect, Fragment } = wp.element;
const { initialize: initializeCodeMirror } = wp.codeEditor;
const { __ } = wp.i18n;

export const CustomScssEditor = ({ value: valueProp, onChange = () => {} }) => {
	const scssInput = useRef();
	const scssEditor = useRef();

	useEffect(() => {
		scssEditor.current = initializeCodeMirror(scssInput.current, gutestrapCodeMirrorSettings);
		const { codemirror } = scssEditor.current;
		setTimeout(function () {
			codemirror.refresh();
		}, 1);
	}, []);

	useEffect(() => {
		const { codemirror } = scssEditor.current;
		const listener = () => {
			onChange(codemirror.getValue());
		};
		codemirror.on("change", listener);
		return () => codemirror.off("change", listener);
	}, [onChange]);

	return (
		<div className="gutestrap-custom-scss-editor">
			<textarea ref={scssInput} cols="80" rows="20" value={valueProp} />
		</div>
	);
};

/**
 * Internal dependencies
 */
import { GUTESTRAP_TEXT_DOMAIN } from "../const";

export const registerCustomSCSSBlock = () => {
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
	registerBlockType("gutestrap/custom-scss", {
		title: __("Custom SCSS", GUTESTRAP_TEXT_DOMAIN),
		description: __("Add custom styles to the post, written in SASS/SCSS", GUTESTRAP_TEXT_DOMAIN),
		icon: "admin-appearance",
		category: "advanced",
		// keywords: [
		// 	__("layout", GUTESTRAP_TEXT_DOMAIN),
		// 	__("alignment", GUTESTRAP_TEXT_DOMAIN),
		// 	__("clear", GUTESTRAP_TEXT_DOMAIN),
		// ],
		attributes: {
			raw: {
				type: "string",
			},
			css: {
				type: "string",
				source: "html",
				selector: "style",
			},
		},
		supports: {
			customClassName: false,
		},
		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 * @param {Object} props Props.
		 * @returns {Mixed} JSX Component.
		 */
		edit: ({ attributes, setAttributes }) => {
			const { raw } = attributes;
			console.log(attributes);
			return (
				<CustomScssEditor
					value={raw}
					onChange={(value) => {
						setAttributes({ raw: value });
					}}
				/>
			);
		},

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
		save: ({ attributes }) => {
			const { css, raw } = attributes;
			return <style dangerouslySetInnerHTML={{ __html: css }} />;
		},
	});
};

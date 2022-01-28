const { registerBlockType } = wp.blocks;
const { useRef, useEffect } = wp.element;
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
		codemirror.on("changes", listener);
		return () => codemirror.off("changes", listener);
	}, [onChange, scssEditor.current]);

	return (
		<div className="gutestrap-custom-scss-editor">
			<textarea ref={scssInput} cols="80" rows="20" value={valueProp} />
		</div>
	);
};

/**
 * Internal dependencies
 */
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
		title: __("Custom SCSS", "gutestrap"),
		description: __("Add custom styles to the post, written in SASS/SCSS", "gutestrap"),
		icon: "admin-appearance",
		category: "advanced",
		// keywords: [
		// 	__("layout", "gutestrap"),
		// 	__("alignment", "gutestrap"),
		// 	__("clear", "gutestrap"),
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
			// eslint-disable-next-line no-unused-vars
			const { css, raw } = attributes;
			return <style dangerouslySetInnerHTML={{ __html: css }} />;
		},
	});
};

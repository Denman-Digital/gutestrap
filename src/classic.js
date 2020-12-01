window.gutestrap = window.gutestrap || {};
jQuery(function ($) {
	const { gutestrap } = window;
	const customScssMetabox = $("#gutenberg_custom_scss_metabox");
	if (customScssMetabox.length) {
		gutestrap.customScssEditor = wp.codeEditor.initialize(customScssMetabox, gutestrapCodeMirrorSettings);
		gutestrap.customScssEditor.codemirror.on("blur", () => {
			gutestrap.customScssEditor.codemirror.save();
		});
		setTimeout(function () {
			gutestrap.customScssEditor.codemirror.refresh();
		}, 1);
	}
});

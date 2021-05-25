window.gutestrap = window.gutestrap || {};
jQuery(function ($) {
	const { gutestrap } = window;

	function initializeCodemirror() {
		const customScssMetabox = $("#gutestrap_custom_scss_metabox");
		if (!customScssMetabox.length) {
			return false;
		}
		gutestrap.customScssEditor = wp.codeEditor.initialize(customScssMetabox, gutestrapCodeMirrorSettings);
		gutestrap.customScssEditor.codemirror.on("blur", () => {
			gutestrap.customScssEditor.codemirror.save();
		});
		setTimeout(function () {
			gutestrap.customScssEditor.codemirror.refresh();
		}, 1);
	}
	if (!initializeCodemirror()) {
		$(document).on("gutestrap_custom_scss_metabox", initializeCodemirror);
	}
});

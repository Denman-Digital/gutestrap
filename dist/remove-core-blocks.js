// my-plugin.js
const { unregisterBlockType } = wp.blocks;

wp.domReady(function () {
	// unregisterBlockType("core/columns");
	console.log("I FIRED ON READY");
});

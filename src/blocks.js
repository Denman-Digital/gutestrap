/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import "./grid/";
import "./block-clear/";
import "./custom-scss/";

import { select } from "@wordpress/data";
import { getBlockTypes, unregisterBlockType, unregisterBlockVariation } from "@wordpress/blocks";

const { debounce } = lodash;

const { excludedPostTypes } = gutestrapGlobal.config;

/**
 * Unregister selected blocktypes.
 */
const clearBlockTypes = debounce(() => {
	getBlockTypes().forEach((blockType) => {
		if (/^(gutestrap)\//.test(blockType.name)) {
			unregisterBlockType(blockType.name);
			document.body.classList.remove("gutestrap-enabled");
		}
	});
}, 50);

const getPostType = () => select("core/editor")?.getCurrentPostType?.();
let currentPostType = null;
wp.data.subscribe(() => {
	const postType = getPostType();
	if (currentPostType !== postType) {
		if (postType && excludedPostTypes[postType]) {
			wp.domReady(clearBlockTypes);
		} else {
			wp.domReady(() => {
				document.body.classList.add("gutestrap-enabled");
			});
		}
	}
	currentPostType = postType;
});

wp.domReady(() => {
	unregisterBlockVariation("core/group", "group-row");
});

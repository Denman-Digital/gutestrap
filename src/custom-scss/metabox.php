<?php

use ScssPhp\ScssPhp;

if (!defined("WP_DEBUG")) {
	define("WP_DEBUG", false);
}
if (!defined("WP_DEBUG_LOG")) {
	define("WP_DEBUG_LOG", false);
}

/**
 * Compile SCSS/SASS to CSS
 *
 * @param string $raw_scss
 * @param string[] $import_paths Optional. Paths of other Sass files to import before compiling.
 * @return string
 */
function gutestrap_compile_custom_scss($raw_scss, $import_paths = [])
{
	$scssphp = new ScssPhp\Compiler();
	if (WP_DEBUG) {
		$scssphp->setOutputStyle(ScssPhp\OutputStyle::EXPANDED);
	} else {
		$scssphp->setOutputStyle(ScssPhp\OutputStyle::COMPRESSED);
	}
	// Set up SCSS compiler (2) - import paths
	$scssphp->setImportPaths($import_paths);
	// Compile SCSS -> CSS
	$css = $scssphp->compileString($raw_scss);
	if (WP_DEBUG && WP_DEBUG_LOG) {
		error_log(print_r([
			"name" => "gutestrap_compile_custom_scss",
			"input" => $raw_scss,
			"output" => $css
		], true));
	}
	return $css;
}

/**
 * @param WP_Post $post
 * @param WP_REST_Request $request
 */
function gutestrap_compile_custom_scss_after_rest_insert($post, $request)
{
	$request_meta = $request->get_param("meta");
	$has_custom_scss_meta = $request_meta && isset($request_meta["_custom_scss"]);
	$has_custom_scss_blocks = has_block("gutestrap/custom-scss", $post);
	if (!$has_custom_scss_meta && !$has_custom_scss_blocks) {
		return;
	}
	$import_paths = apply_filters("gutestrap_custom_scss_import_paths", [], $post->ID, $post);

	if ($has_custom_scss_meta) {
		$meta_raw_scss = $request_meta["_custom_scss"];
		$meta_css = gutestrap_compile_custom_scss($meta_raw_scss, $import_paths);
		update_post_meta($post->ID, '_custom_css',	$meta_css);
	}

	if ($has_custom_scss_blocks) {
		$blocks = parse_blocks($post->post_content);
		$new_content = "";
		foreach ($blocks as $block) {
			if ($block["blockName"] === "gutestrap/custom-scss") {
				$block_raw_scss = $block["attrs"]["raw"];
				$block_css = gutestrap_compile_custom_scss($block_raw_scss, $import_paths);

				$block["attrs"]["css"] = $block_css;
				$block["innerHTML"] = "<style class=\"wp-block-gutestrap-custom-scss\">$block_css</style>";
				$block["innerContent"] = [$block["innerHTML"]];

				$block = serialize_block(filter_block_kses($block, "post", []));
				$block = str_replace(["\\n", "\\t"], ["\\\\n", "\\\\t"], $block);
			} else {
				$block = serialize_block(filter_block_kses($block, "post", []));
			}
			$new_content .= $block;
		}
		wp_update_post([
			"ID" => $post->ID,
			"post_content" => $new_content,
		]);
	}
};

/**
 * Register custom (S)CSS meta fields for selected post types.
 */
function gutestrap_register_custom_scss_meta()
{
	$can_edit_posts = function () {
		return current_user_can('edit_posts');
	};
	$pass_through = function ($arg = null) {
		return $arg;
	};

	/**
	 * Get a list of post types to add the custom CSS meta fields.
	 *
	 * @since 1.1.0
	 * @param string[] $post_types
	 */
	$post_types = apply_filters("gutestrap_custom_scss_post_types", ["post", "page"]);

	foreach ($post_types as $post_type) {
		register_meta('post', '_custom_css', [
			"object_subtype" => (string) $post_type,
			'show_in_rest' => true,
			'type' => 'string',
			'single' => true,
			'sanitize_callback' => $pass_through,
			'auth_callback' => $can_edit_posts,
		]);

		register_meta('post', '_custom_scss', [
			"object_subtype" => (string) $post_type,
			'show_in_rest' => true,
			'type' => 'string',
			'single' => true,
			'sanitize_callback' => $pass_through,
			'auth_callback' => $can_edit_posts,
		]);

		add_action("rest_after_insert_$post_type", "gutestrap_compile_custom_scss_after_rest_insert", 10, 2);
	}
}
add_action('init', 'gutestrap_register_custom_scss_meta');

/**
 * Add custom meta fields to post revisions (support Gutenberg previews)
 *
 * * Doesn't work without plugin
 *
 * @param string[] $keys
 * @return string[]
 */
function gutestrap_add_meta_keys_to_revision($keys)
{
	$keys[] = '_custom_css';
	$keys[] = '_custom_scss';
	return $keys;
}
add_filter('wp_post_revision_meta_keys', 'gutestrap_add_meta_keys_to_revision');

/**
 * Print out custom CSS after all enqueued style tags
 */
function gutestrap_print_custom_scss_compiled()
{
	if (is_admin() || !is_singular()) {
		return;
	}
	global $post;
	$css = get_post_meta(get_the_ID(), '_custom_css', true);
	echo "<style>$css</style>";
}
add_action("wp_print_scripts", "gutestrap_print_custom_scss_compiled", 1);

/**
 * Add custom sass metabox for classic editor.
 */
function gutestrap_add_custom_scss_metabox()
{
	add_meta_box(
		"gutestrap_custom_scss", //id
		__("Custom SCSS", "gutestrap"), // title
		"gutestrap_custom_scss_metabox_render", // callback
		apply_filters("gutestrap_add_custom_scss_metabox_screens", null),
		"normal",
		"default",
		[
			'__back_compat_meta_box' => true,
		]
	);
}
add_action('add_meta_boxes', 'gutestrap_add_custom_scss_metabox');

/**
 * Custom SCSS metabox render callback
 * @param WP_Post $post
 * @return void
 */
function gutestrap_custom_scss_metabox_render($post)
{
	$scss = get_post_meta($post->ID, '_custom_scss', true);
	wp_nonce_field('gutestrap_update_post_scss_metabox', 'gutestrap_update_custom_scss_nonce');
?>
	<textarea name="custom_scss" id="gutestrap_custom_scss_metabox" cols="80" rows="15"><?= esc_textarea($scss); ?></textarea>
	<script>jQuery(document).trigger("gutestrap_custom_scss_metabox");</script>
<?php
}

/**
 * Save custom SCSS metabox content from classic editor.
 *
 * @param int $post_id
 * @param WP_Post $post
 * @return void
 */
function gutestrap_save_custom_scss_metabox($post_id, $post)
{
	// Verify user capabilities
	$edit_cap = get_post_type_object($post->post_type)->cap->edit_post;
	if (!current_user_can($edit_cap, $post_id)) {
		return;
	}
	// Verify nonce
	if (!isset($_POST['gutestrap_update_custom_scss_nonce']) || !wp_verify_nonce($_POST['gutestrap_update_custom_scss_nonce'], 'gutestrap_update_post_scss_metabox')) {
		return;
	}
	if (array_key_exists('custom_scss', $_POST)) {
		// Get raw data
		$raw = $_POST['custom_scss'];
		$import_paths = apply_filters("gutestrap_custom_scss_import_paths", [], $post_id, $post);
		// compile
		$css = gutestrap_compile_custom_scss($raw, $import_paths);
		// Update post metas
		update_post_meta($post_id, '_custom_scss', $raw);
		update_post_meta($post_id, '_custom_css',	$css);
	}
}
add_action('save_post', 'gutestrap_save_custom_scss_metabox', 10, 2);

<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package gutestrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

use ScssPhp\ScssPhp;

// require_once __DIR__ . '/custom-scss/profile-options.php';
require_once __DIR__ . '/custom-scss/metabox.php';

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function gutestrap_block_assets()
{ // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'gutestrap-style-css',
		plugins_url('dist/blocks.style.build.css', dirname(__FILE__)),
		null,
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css') // Version: File modification time.
	);

	wp_register_style(
		'gutestrap-style-rtl-css',
		plugins_url('dist/blocks.style.build.css', dirname(__FILE__)),
		null,
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css') // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'gutestrap-block-js',
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		[
			'wp-blocks',
			'wp-block-editor',
			'wp-i18n',
			'wp-element',
			"wp-components",
			"wp-plugins",
			"wp-theme-plugin-editor",
			"wp-data",
			"wp-core-data",
			"lodash"
		],
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js'), // Version: filemtime — Gets file modification time.
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'gutestrap-block-editor-css',
		plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
		null, // Dependency to include the CSS after it.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css') // Version: File modification time.
	);


	$block_assets = [
		'editor_script' => 'gutestrap-block-js',
		'editor_style' => 'gutestrap-block-editor-css',
	];

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type('gutestrap/container', $block_assets);
	register_block_type('gutestrap/row', $block_assets);
	register_block_type(__DIR__ . "/grid/column/block.json");

	add_action("wp_enqueue_scripts", function () {
		wp_enqueue_style(is_rtl() ? 'gutestrap-style-rtl-css' : 'gutestrap-style-css');
	});
}
add_action('init', 'gutestrap_block_assets');

function gutestrap_disabled_block_render(string $block_content, array $block): string
{
	$blockName = $block["blockName"];
	$attributes = $block["attrs"];
	if (in_array($blockName, ["gutestrap/row", "gutestrap/container"])) {
		if (!is_admin() && isset($attributes["disabled"]) && $attributes["disabled"]) {
			return "<!-- Block disabled [$blockName] -->";
		}
	}
	return $block_content;
}
add_filter("render_block", "gutestrap_disabled_block_render", 10, 2);

function gutestrap_setup_js_globals()
{
	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `gutestrapGlobal` object.

	$js_globals = [
		"pluginDirPath" => plugin_dir_path(__DIR__),
		"pluginDirUrl"  => plugin_dir_url(__DIR__),
		// Add more data here that you want to access from `gutestrapGlobal` object.
		"config" => [
			"enableBorderColors" => current_theme_supports("gutestrap-border-colors"),
			"disableCustomColors" => current_theme_supports("disable-custom-colors"),
			"disableCustomGradients" => current_theme_supports("disable-custom-gradients"),
			"enableLayeredGridBackgrounds" => current_theme_supports("gutestrap-layered-grid-backgrounds"),
			// "enableResponsiveSpacing" => current_theme_supports("gutestrap-rfs-spacing"),
			"excludedPostTypes" => [],
		]
	];

	$post_types = get_post_types([
		"public" => true,
	]);
	foreach ($post_types as $post_type_name) {
		$js_globals["config"]["excludedPostTypes"][$post_type_name] = !apply_filters("gutestrap_enable_for_post_type", true, $post_type_name);
	}

	wp_localize_script(
		'gutestrap-block-js',
		'gutestrapGlobal', // Array containing dynamic data for a JS Global.
		$js_globals,
	);
}
add_action('admin_enqueue_scripts', 'gutestrap_setup_js_globals');

/**
 * Enqueue Custom SCSS CodeMirror assets
 * @return void
 */
function gutestrap_custom_scss_codemirror_assets()
{
	$screen = get_current_screen();
	$codemirror_settings['codeEditor'] = wp_enqueue_code_editor([
		'type' => 'text/x-scss',
		"codemirror" => [
			"indentWithTabs" => true,
			// "indentUnit" => $tab_size,
			"tabSize" => 2,
		],

	]);
	wp_localize_script('gutestrap-block-js', 'gutestrapCodeMirrorSettings', $codemirror_settings);
	wp_enqueue_style('wp-codemirror');
	if ($screen->is_block_editor()) {
		return;
	}
	wp_enqueue_script(
		'gutestrap-classic-js',
		plugins_url('/dist/classic.build.js', dirname(__FILE__)),
		["jquery"],
		filemtime(plugin_dir_path(__DIR__) . 'dist/classic.build.js'),
		true
	);

	wp_localize_script('gutestrap-classic-js', 'gutestrapCodeMirrorSettings', $codemirror_settings);
}
add_action('admin_enqueue_scripts', 'gutestrap_custom_scss_codemirror_assets');

/**
 * Add Block categories
 * @param string[] $categories
 * @return string[]
 */
function gutestrap_block_categories(array $categories): array
{
	return array_merge(
		[
			[
				"slug" => "gutestrap-grid",
				"title" => __("GuteStrap Grid", "gutestrap"),
			],
		],
		$categories,
		[
			[
				'slug' => 'advanced',
				'title' => __('Advanced', "gutestrap"),
			]
		]
	);
}
add_filter('block_categories_all', 'gutestrap_block_categories', 10);

/**
 * Add script to check for and include compat styles if needed.
 * @return void
 */
function gutestrap_compat_styles_logic()
{
	$stylesheet_path = is_rtl() ? 'dist/blocks.compat-rtl.build.css' : 'dist/blocks.compat.build.css';
	$stylesheet_link_html = sprintf(
		'<link rel="stylesheet" id="gutestrap-compat-css" href="%s?v=%s" media="all" />',
		esc_url(plugins_url($stylesheet_path, dirname(__FILE__))),
		filemtime(plugin_dir_path(__DIR__) . $stylesheet_path)
	);
?>
	<script type='text/javascript'>
		(function() {
			var gutestrapStyles = document.getElementById("gutestrap-style-css") || document.getElementById("gutestrap-style-rtl-css");
			if (gutestrapStyles && !CSS.supports("(top:var(--x))")) {
				console.warn("GuteStrap: custom properties not supported, compat stylesheet being added");
				gutestrapStyles.insertAdjacentHTML("afterEnd", '<?= $stylesheet_link_html; ?>');
			}
		})();
	</script>
<?php
}
add_action('wp_print_footer_scripts', 'gutestrap_compat_styles_logic');

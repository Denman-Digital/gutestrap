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
if (!defined('ABSPATH')) {
	exit;
}

define("GUTESTRAP_TEXT_DOMAIN", "gutestrap");

include_once __DIR__ . '/custom-scss/profile-options.php';
include_once __DIR__ . '/custom-scss/metabox.php';

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
		is_admin() ? ['wp-editor', "gutestrap-fontawesome"] : ["gutestrap-fontawesome"],
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css') // Version: File modification time.
	);

	// wp_register_style(
	// 	'gutestrap-bootstrap-grid',
	// 	plugins_url('assets/bootstrap@4.5.3/css/bootstrap-grid.min.css', dirname(__FILE__)), // Block style CSS.
	// 	is_admin() ? ['wp-editor'] : null, // Dependency to include the CSS after it.
	// 	"4.5.3"
	// );

	wp_register_style(
		'gutestrap-fontawesome',
		plugins_url('assets/fontawesome-pro@5.15.1/css/all.css', dirname(__FILE__)), // Block style CSS.
		is_admin() ? ['wp-editor'] : null, // Dependency to include the CSS after it.
		"5.15.1"
	);

	// Register block editor script for backend.
	wp_register_script(
		'gutestrap-block-js',
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-components", "wp-plugins", "wp-edit-post", "wp-theme-plugin-editor"], // Dependencies, defined above.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js'), // Version: filemtime — Gets file modification time.
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'gutestrap-block-editor-css',
		plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
		['wp-edit-blocks'], // Dependency to include the CSS after it.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css') // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `gutestrapGlobal` object.
	wp_localize_script(
		'gutestrap-block-js',
		'gutestrapGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path(__DIR__),
			'pluginDirUrl'  => plugin_dir_url(__DIR__),
			// Add more data here that you want to access from `gutestrapGlobal` object.
		]
	);

	$block_assets = [
		'style' => 'gutestrap-style-css',
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
	register_block_type('gutestrap/col', $block_assets);
}
add_action('init', 'gutestrap_block_assets');

function gutestrap_disabled_block_render($block_content, $block)
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

function gutenberg_custom_scss_codemirror_assets()
{
	$screen = get_current_screen(); //pYF%u2Tel6XTva9*%COq
	$user_id = get_current_user_id();
	$tab_size = $user_id ? validate_user_meta_tab_width(get_user_meta($user_id, "codemirror_tab_width", true)) : 2;

	$codemirror_settings['codeEditor'] = wp_enqueue_code_editor([
		'type' => 'text/x-scss',
		"codemirror" => [
			"indentWithTabs" => true,
			"indentUnit" => $tab_size,
			"tabSize" => $tab_size,
		],
	]);
	wp_localize_script('gutestrap-block-js', 'gutestrapCodeMirrorSettings', $codemirror_settings);
	wp_enqueue_style('wp-codemirror');
	if ($screen->is_block_editor()) {
		return;
	}
	wp_enqueue_script(
		'gutestrap-classic-js',
		plugins_url('/dist/classic.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		["jquery", "wp-theme-plugin-editor"], // Dependencies, defined above.
		filemtime(plugin_dir_path(__DIR__) . 'dist/classic.build.js'), // Version: filemtime — Gets file modification time.
		true
	);
	wp_localize_script('gutestrap-classic-js', 'gutestrapCodeMirrorSettings', $codemirror_settings);
}
add_action('admin_enqueue_scripts', 'gutenberg_custom_scss_codemirror_assets');

function gutestrap_block_categories($categories, $post)
{
	// if ($post->post_type !== 'post') {
	// 	return $categories;
	// }
	return array_merge(
		[
			[
				"slug" => "bootstrap-grid",
				"title" => __("Bootstrap Grid", GUTESTRAP_TEXT_DOMAIN),
				"icon" => "layout",
			],
		],
		$categories,
		[
			[
				'slug' => 'advanced',
				'title' => __('Advanced', GUTESTRAP_TEXT_DOMAIN),
				'icon'  => 'code-standards',
			]
		]
	);
}
add_filter('block_categories', 'gutestrap_block_categories', 10, 2);

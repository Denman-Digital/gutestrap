<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

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
function gutestrap_cgb_block_assets()
{ // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'gutestrap-cgb-style-css',
		plugins_url('dist/blocks.style.build.css', dirname(__FILE__)),
		is_admin() ? ['wp-editor', "gutestrap-bootstrap-grid", "gutestrap-fontawesome"] : ["gutestrap-bootstrap-grid", "gutestrap-fontawesome"],
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css') // Version: File modification time.
	);

	wp_register_style(
		'gutestrap-bootstrap-grid',
		plugins_url('assets/bootstrap@4.5.3/css/bootstrap-grid.min.css', dirname(__FILE__)), // Block style CSS.
		is_admin() ? ['wp-editor'] : null, // Dependency to include the CSS after it.
		"4.5.3"
	);

	wp_register_style(
		'gutestrap-fontawesome',
		plugins_url('assets/fontawesome-pro@5.15.1/css/all.css', dirname(__FILE__)), // Block style CSS.
		is_admin() ? ['wp-editor'] : null, // Dependency to include the CSS after it.
		"5.15.1"
	);

	// Register block editor script for backend.
	wp_register_script(
		'gutestrap-cgb-block-js',
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'], // Dependencies, defined above.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js'), // Version: filemtime — Gets file modification time.
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'gutestrap-cgb-block-editor-css',
		plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
		['wp-edit-blocks'], // Dependency to include the CSS after it.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css') // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'gutestrap-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path(__DIR__),
			'pluginDirUrl'  => plugin_dir_url(__DIR__),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	$block_assets = [
		'style' => 'gutestrap-cgb-style-css',
		'editor_script' => 'gutestrap-cgb-block-js',
		'editor_style' => 'gutestrap-cgb-block-editor-css',
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
add_action('init', 'gutestrap_cgb_block_assets');

function gutestrap_apply_settings()
{
	// function gutestrap_block_wrapper($block_content, $block)
	// {
	// 	echo '<pre>';
	// 	var_dump($block);
	// 	echo '</pre>';
	// 	switch ($block['blockName']) {
	// 		case 'core/paragraph':
	// 			# code...
	// 			break;
	// 	}
	// 	return $block_content;
	// }
	// // add_filter('render_block', 'gutestrap_block_wrapper', 10, 2);
	// function sdlkfjhasdlfkj($context, $parsed_block)
	// {
	// 	echo '<pre>';
	// 	var_dump($parsed_block);
	// 	echo '</pre>';
	// 	return $context;
	// }
	// add_filter('render_block_context', 'sdlkfjhasdlfkj', 10, 2);
}
add_action('init', 'gutestrap_apply_settings');


function my_plugin_deny_list_blocks()
{
	wp_enqueue_script(
		'my-plugin-deny-list-blocks',
		// plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.

		plugins_url('dist/remove-core-blocks.js', dirname(__FILE__)),
		array('wp-blocks', 'wp-dom-ready', 'wp-edit-post')
	);
}
add_action('enqueue_block_editor_assets', 'my_plugin_deny_list_blocks');

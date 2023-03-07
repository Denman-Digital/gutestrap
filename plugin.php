<?php

/**
 * Plugin Name: Gutestrap
 * Plugin URI: https://github.com/Denman-Digital/gutestrap/tree/compat
 * Update URI: gutestrap
 * Description: Supercharge your Gutenberg layouts with Bootstrap Grid (and other goodies). The Compat version limits and polyfills modern features to provide greater support for older devices/browsers.
 * Author: Denman Digital
 * Author URI: https://denman.digital
 * Version: 2.0.0-compat
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package gutestrap
 */

// Exit if accessed directly.
defined('ABSPATH') ||	exit;

if (!defined("WP_DEBUG")) {
	define("WP_DEBUG", false);
}
if (!defined("WP_DEBUG_LOG")) {
	define("WP_DEBUG_LOG", false);
}

define("GUTESTRAP_PLUGIN_BASENAME", plugin_basename(__FILE__));

define("GUTESTRAP_PLUGIN_FILE", basename(__FILE__));

/**
 * PHP Dependencies
 */
require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';

/**
 * Update Check
 */
require_once plugin_dir_path(__FILE__) . 'src/update.php';

<?php

/**
 * Plugin Name: GuteStrap
 * Plugin URI: https://github.com/Denman-Digital/gutestrap
 * Update URI: gutestrap
 * Description: Supercharge your Gutenberg layouts with Bootstrap Grid (and other goodies).
 * Author: Denman Digital
 * Author URI: https://denman.digital
 * Version: 2.1.8
 * Requires at least: 6.4
 * Requires PHP: 8.1
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: gutestrap
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

define("GUTESTRAP_PLUGIN_URI", plugin_dir_url(__FILE__));

define("GUTESTRAP_PLUGIN_PATH", plugin_dir_path(__FILE__));

global $gutestrap_plugin_data;
$gutestrap_plugin_data = get_plugin_data(__FILE__);

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

/**
 * Load plugin textdomain.
 */
function gutestrap_load_textdomain()
{
	load_plugin_textdomain('gutestrap', false, dirname(GUTESTRAP_PLUGIN_BASENAME) . '/languages');
}
add_action('init', 'gutestrap_load_textdomain');

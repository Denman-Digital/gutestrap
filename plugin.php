<?php
/**
 * Plugin Name: Gutestrap
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Supercharge your Gutenberg layouts with Bootstrap Grid.
 * Author: Denman Digital
 * Author URI: https://denman.digital
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package gutestrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) ||	exit;

require __DIR__ . '/vendor/autoload.php';

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';


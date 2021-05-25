<?php

/**
 * Create A Simple Theme Options Panel
 *
 * @since 1.2.0
 * @package gutestrap
 */

use function Denman_Utils\array_exclude_keys;
use function Denman_Utils\html_attrs;

// Exit if accessed directly.
defined('ABSPATH') || exit;

class Gutestrap_Settings
{

	const MENU_SLUG = 'gutestrap-settings';
	const SETTING_KEY = 'gutestrap_settings';

	/**
	 * Start things up
	 *
	 * @since 1.2.0
	 */
	public function __construct()
	{
		// We only need to register the admin panel on the back-end
		if (is_admin()) {
			add_action('admin_menu', array('Gutestrap_Settings', 'add_admin_menu'));
			add_action('admin_init', array('Gutestrap_Settings', 'register_settings'));
		}
	}

	/**
	 * Returns all theme options
	 *
	 * @since 1.2.0
	 */
	public static function get_settings()
	{
		return get_option(self::SETTING_KEY);
	}

	/**
	 * Returns single setting
	 *
	 * @since 1.2.0
	 */
	public static function get_setting($setting_name)
	{
		$options = self::get_settings();
		if (isset($options[$setting_name])) {
			return $options[$setting_name];
		}
	}

	/**
	 * Add sub menu page
	 *
	 * @since 1.2.0
	 */
	public static function add_admin_menu()
	{
		add_menu_page(
			esc_html__("Gutestrap Settings", "gutestrap"),
			esc_html__("Gutestrap Settings", "gutestrap"),
			"manage_options",
			self::MENU_SLUG,
			array("Gutestrap_Settings", "render")
		);
	}

	/**
	 * Register a setting and its sanitization callback.
	 *
	 * We are only registering 1 setting so we can store all options in a single option as
	 * an array. You could, however, register a new setting for each option
	 *
	 * @since 1.2.0
	 */
	public static function register_settings()
	{
		register_setting(self::MENU_SLUG, self::SETTING_KEY, [
			"type" => "array",
			"description" => "",
			"sanitize_callback" => ["Gutestrap_Settings", "sanitize"],
			"default" => []
		]);

		add_settings_section(
			"gutestrap_section_developers",
			__("The Matrix has you.", "gutestrap"),
			array("Gutestrap_Settings", "gutestrap_section_developers_callback"),
			self::MENU_SLUG
		);

		self::add_settings_field(
			'example_text',
			'gutestrap_section_developers',
			__('Text', "gutestrap"),
			['wporg_custom_data' => 'custom'],
		);

		self::add_settings_field(
			'example_select',
			'gutestrap_section_developers',
			__('Select', "gutestrap"),
			[
				"type" => "select",
				'options' => [
					"Sally" => "fields",
					"Billy" => "pastures",
					"Tommy" => [
						"Monkey" => "monkey",
						"chunky"
					]
				],
				"multiple"
			],
		);

		self::add_settings_field(
			'example_textarea',
			'gutestrap_section_developers',
			__('TextArea', "gutestrap"),
			[
				"type" => "textarea",
			],
		);
		self::add_settings_field(
			'example_radio',
			'gutestrap_section_developers',
			__('Radios', "gutestrap"),
			[
				"type" => "radio",
				'options' => [
					"Sally" => "fields",
					"Billy" => "pastures",
					"Monkey" => "monkey",
					"chunky"
				]
			],
		);
		self::add_settings_field(
			'example_checkbox',
			'gutestrap_section_developers',
			__('Checkboxes', "gutestrap"),
			[
				"type" => "checkbox",
				'options' => [
					"Sally" => "fields",
					"Billy" => "pastures",
					"Monkey" => "monkey",
					"chunky"
				]
			],
		);
	}

	private static function add_settings_field($name, $section, $title, $args = [])
	{
		if (in_array($args["type"] ?? null, ["checkbox", "radio"])) {
			unset($args["label_for"]);
		} else {
			$args["label_for"] = $name;
		}
		$args["name"] = $name;
		$args["class"] = ($args["class"] ?? "") . " gutestrap-settings-row";
		add_settings_field(
			$name,
			$title,
			["Gutestrap_Settings", "render_field"],
			self::MENU_SLUG,
			$section,
			$args
		);
	}


	/**
	 * WordPress has magic interaction with the following keys: label_for, class.
	 * - the "label_for" key value is used for the "for" attribute of the <label>.
	 * - the "class" key value is used for the "class" attribute of the <tr> containing the field.
	 *
	 * @param array $args
	 */
	public static function render_field($args)
	{
		$setting_name = $args['name'];
		$setting_value = self::get_setting($setting_name);
		$id = esc_attr($setting_name);
		$name = esc_attr(sprintf("%s[%s]", self::SETTING_KEY, $setting_name));
		$type = (string) ($args["type"] ?? "text");

		$excluded_boolean_attrs = ["multiple", "checked"];
		$extra_attrs = html_attrs(
			array_exclude_keys(
				array_diff($args, $excluded_boolean_attrs),
				["options", "class", "type", "label_for", "id", "name", "value"],
				$excluded_boolean_attrs
			)
		);
		switch ($type) {
			case 'select':
				printf(
					'<select id="%s" name="%s" %s>%s</select>',
					$id,
					$name,
					$extra_attrs,
					self::render_select_options($args["options"], $setting_name)
				);
				break;
			case 'checkbox':
				$name .= "[]";
			case 'radio':
				foreach ($args["options"] as $label => $value) {
					if (is_numeric($label)) {
						$label = $value;
					}
					$is_checked = is_array($setting_value) ?
						in_array((string) $value, $setting_value) :
						(string) $value === (string) $setting_value;
					printf(
						'<label><input id="%s" name="%s" type="%s" value="%s" %s %s> %s</label>',
						$id,
						$name,
						$type,
						esc_attr($value),
						$extra_attrs,
						$is_checked ? "checked" : "",
						// "__checked__",
						esc_html($label)
					);
				}
				break;
			case 'textarea':
				printf(
					'<textarea id="%s" name="%s" %s>%s</textarea>',
					$id,
					$name,
					$extra_attrs,
					esc_textarea($setting_value),
				);
				break;
			default:
				printf(
					'<input id="%s" name="%s" type="%s" value="%s" %s>',
					$id,
					$name,
					$type,
					esc_attr($setting_value),
					$extra_attrs,
				);
				break;
		}
		printf('<p class="description">%s</p>', esc_html($args["description"] ?? ""));
	}


	private static function render_select_options($options, $setting_name)
	{
		$setting_value = self::get_setting($setting_name);
		$output = "";
		foreach ($options as $label => $value) {
			if (is_numeric($label)) {
				$label = $value;
			}
			if (is_array($value)) {
				$inner = self::render_select_options($value, $setting_name);
				$output .= sprintf('<optgroup label="%s">%s</optgroup>', esc_attr($label), $inner);
			} else {
				$output .= sprintf(
					'<option value="%s" %s>%s</option>',
					$value,
					selected($setting_value, $value, false),
					esc_html($label)
				);
			}
		}
		return $output;
	}

	/**
	 * Developers section callback function.
	 *
	 * @param array $args  The settings array, defining title, id, callback.
	 */
	public static function gutestrap_section_developers_callback($args)
	{
?>
		<p id="<?= esc_attr($args['id']); ?>"><?php esc_html_e('Follow the white rabbit.', "gutestrap"); ?></p>
	<?php
	}

	/**
	 * Sanitization callback
	 *
	 * @since 1.2.0
	 */
	public static function sanitize($options)
	{

		error_log(print_r($options, true));

		// If we have options lets sanitize them
		if ($options) {

			// Checkbox
			if (!empty($options['checkbox_example'])) {
				$options['checkbox_example'] = 'on';
			} else {
				unset($options['checkbox_example']); // Remove from options if not checked
			}

			// Input
			if (!empty($options['input_example'])) {
				$options['input_example'] = sanitize_text_field($options['input_example']);
			} else {
				unset($options['input_example']); // Remove from options if empty
			}

			// Select
			if (!empty($options['select_example'])) {
				$options['select_example'] = sanitize_text_field($options['select_example']);
			}
		}

		// Return sanitized options
		return $options;
	}

	/**
	 * Settings page output
	 *
	 * @since 1.2.0
	 */
	public static function render()
	{
		if (!current_user_can('manage_options')) {
			return;
		}
		if (isset($_GET['settings-updated'])) {
			add_settings_error('gutestrap_messages', 'gutestrap_message', __('Settings Saved', "gutestrap"), 'updated');
		}
		settings_errors('gutestrap_messages');
	?>

		<div class="wrap">

			<h1><?php esc_html_e(get_admin_page_title()); ?></h1>

			<pre><?php var_dump(self::get_settings()); ?></pre>
			<pre><?php var_dump($_POST); ?></pre>

			<form method="post" action="options.php">

				<?php
				// output security fields for the registered setting "wporg"
				settings_fields(self::MENU_SLUG);
				// output setting sections and their fields
				do_settings_sections(self::MENU_SLUG);
				// output save settings button
				submit_button('Save Settings');
				?>

			</form>

		</div><!-- .wrap -->
<?php }
}
new Gutestrap_Settings();

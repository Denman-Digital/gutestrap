<?php

/**
 * Handle Updates
 *
 * @since   1.4
 * @package gutestrap
 */

namespace Gutestrap;

class Gutestrap_Update
{
	private static $instance = null;

	private $remote_endpoint_base = "https://raw.githubusercontent.com/Denman-Digital/gutestrap/main";

	private $did_fetch_remote_data = false;

	private function __construct()
	{
		add_filter("update_plugins_gutestrap", [$this, "update_plugins_gutestrap_data"], 10, 1);
		add_filter('pre_set_site_transient_update_plugins', [$this, "modify_plugins_transient"], 10, 1);
	}

	public static function instance(): Gutestrap_Update
	{
		if (self::$instance == null) {
			self::$instance = new Gutestrap_Update();
		}
		return self::$instance;
	}

	public function get_remote_plugin_data(): array
	{
		$remote_plugin_data = get_plugin_data($this->remote_endpoint_base . GUTESTRAP_PLUGIN_FILE);
		if (!$remote_plugin_data) return [];
		return [
			"slug" => "gutestrap",
			"plugin" => GUTESTRAP_PLUGIN_BASENAME,
			"version" => $remote_plugin_data["Version"],
			"new_version" => $remote_plugin_data["Version"],
			"url" => $remote_plugin_data["PluginURI"],
			"package" => $remote_plugin_data["UpdateURI"],
			"requires" => $remote_plugin_data["RequiresWP"],
			"icons" => [
				"2x" => $this->remote_endpoint_base . "assets/icon-256x256.png",
				"1x" => $this->remote_endpoint_base . "assets/icon-128x128.png",
				"svg" => $this->remote_endpoint_base . "assets/icon.svg",
			]
		];
	}

	public function update_plugins_gutestrap_data($value)
	{
		if ($data = $this->get_remote_plugin_data()) {
			$this->did_fetch_remote_data = true;
			$value = $data;
		}
		return $value;
	}

	public function modify_plugins_transient($transient)
	{
		// bail early if no response (error)
		if (!isset($transient->response)) {
			return $transient;
		}

		if (
			isset(
				$transient->checked,
				$transient->checked[GUTESTRAP_PLUGIN_BASENAME],
				$transient->no_update[GUTESTRAP_PLUGIN_BASENAME]
			)
			&& !$this->did_fetch_remote_data
		) {
			$remote_data = (object) $this->get_remote_plugin_data();
			$local_data = get_plugin_data(__FILE__);

			if (version_compare($remote_data->new_version, $local_data['Version'], '>')) {
				$transient->response[GUTESTRAP_PLUGIN_BASENAME] = $remote_data;
				unset($transient->no_update[GUTESTRAP_PLUGIN_BASENAME]);
			}
		}

		return $transient;
	}
}

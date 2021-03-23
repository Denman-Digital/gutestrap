<?php

/**
 * Utility functions
 *
 * @since 1.2.0
 * @package gutestrap
 */

namespace Utils;

use InvalidArgumentException;

/**
 * Check if variable is not null.
 *
 * Since isset() is a PHP language construct, this wrapper allows us to call it using variable functions
 *
 * @param mixed $var
 * @return bool
 */
function is_not_null($var): bool
{
	return isset($var);
}

/**
 * Flatten nested arrays.
 *
 * * Returns only array values, keys are lost
 *
 * @param array[]|mixed[] $array Array containing arrays
 * @return mixed[]
 */
function array_flatten($array)
{
	$array = array_values($array);
	$output = [];
	foreach (array_values($array) as $value) {
		if (is_array($value)) {
			$output = array_merge($output, array_flatten($value));
		} else {
			$output[] = $value;
		}
	}
	return $output;
}

/**
 * Resolves an array with only one value that is a non empty array
 *
 * @param array[] $arglist
 * @return array
 */
function resolve_arglist($arglist)
{
	if ($arglist[0] && count($arglist) == 1 && is_array($arglist[0])) {
		$arglist = array_values($arglist[0]);
	}
	return $arglist;
}

/**
 * Returns only array entries whose keys are not listed in an exclusion list.
 *
 * @uses resolve_arglist
 * @uses array_flatten
 *
 * @param array $array Original array to operate on.
 * @param array ...$excluded_keys Keys or arrays of keys you want to remove.
 * @return array
 */
function array_exclude_keys($array, ...$excluded_keys)
{
	$excluded_keys = array_flatten(resolve_arglist($excluded_keys));
	return array_diff_key($array, array_flip($excluded_keys));
}

/**
 * Returns only array entries whose values are not listed in an exclusion list.
 *
 * @uses resolve_arglist
 * @uses array_flatten
 *
 * @param array $array Original array to operate on.
 * @param array ...$excluded_values Values or arrays of values you want to remove.
 * @return array
 */
function array_exclude_values($array, ...$excluded_values)
{
	$excluded_values = array_flatten(resolve_arglist($excluded_values));
	error_log(print_r([
		$array,
		$excluded_values
	], true));
	return array_filter($array, function ($value) use ($excluded_values) {
		return !in_array($value, $excluded_values);
	});
}


/**
 * Turn an assoc. array into HTML attributes as `key="value"`.
 *
 * * Assumes values are already suitable escaped.
 * * Outputs numerically indexed values as boolean attributes.
 * * Keys with null values will be excluded from output.
 * * Non-string values will be passed through var_export
 *
 * @param mixed[] $attrs
 * @return string
 */
function html_attrs($attrs)
{
	$attrs = array_map(function ($value) {
		return fallback_until("is_string", $value, esc_attr(var_export($value, true)));
	}, array_filter($attrs, "Utils\is_not_null"));
	$output = "";
	foreach ($attrs as $name => $value) {
		if (is_numeric($name)) {
			$output .= " $value";
		} else {
			$output .= " $name=\"$value\"";
		}
	}
	return trim($output);
}

/**
 * Returns the first argument that passes a validation callback, or the last argument.
 * * If passed a single non-empty Array, will return the first truthy value, or the last entry.
 *
 * @throws InvalidArgumentException if $validation_callback is not callable
 *
 * @param callable $validation_callback
 * @param mixed[]|mixed ...$values
 * @return mixed
 */
function fallback_until($validation_callback, ...$values)
{
	if (!is_callable($validation_callback)) {
		throw new InvalidArgumentException("First argument in fallback_until() was not callable");
	}
	$values = resolve_arglist($values);
	foreach ($values as $result) {
		if (call_user_func($validation_callback, $result)) {
			return $result;
		}
	}
	return $result;
}

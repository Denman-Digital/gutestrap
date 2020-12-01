<?php

function validate_user_meta_tab_width($value)
{
	return min(max((int) $value, 2), 8);
}

add_action('show_user_profile', 'extra_user_profile_fields');
add_action('edit_user_profile', 'extra_user_profile_fields');

function extra_user_profile_fields($user)
{
	if (!user_can($user->ID, 'publish_posts')) {
		return;
	}
	$user_meta = get_user_meta($user->ID);
?>
	<h3><?php _e("Code Editor Settings", "text_domain"); ?></h3>

	<table class="form-table">
		<tr>
			<th><label for="codemirror_tab_width"><?php _e("Tab Width"); ?></label></th>
			<td>
				<?php $tab_size = validate_user_meta_tab_width($user_meta['codemirror_tab_width'] ?? 2); ?>
				<input type="number" name="codemirror_tab_width" id="codemirror_tab_width" min="2" max="8" step="1" value="<?php echo esc_attr($tab_size); ?>" class="regular-text" /><br />
				<p class="description">
					<?php _e("Choose your preferred tab width for the code editor."); ?>
				</p>
			</td>
		</tr>
	</table>
<?php
}

add_action('personal_options_update', 'save_extra_user_profile_fields');
add_action('edit_user_profile_update', 'save_extra_user_profile_fields');

function save_extra_user_profile_fields($user_id)
{
	if (!current_user_can('edit_user', $user_id)) {
		return false;
	}
	update_user_meta($user_id, 'codemirror_tab_width', $_POST['codemirror_tab_width']);
}

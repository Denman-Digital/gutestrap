/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, IconButton, BaseControl } from "@wordpress/components";
import { select } from "@wordpress/data";
import { withInstanceId } from "@wordpress/compose";
import { GUTESTRAP_TEXT_DOMAIN } from "../const";

function MediaSelectControl({
	label,
	className,
	value,
	allowedTypes,
	help,
	addText,
	editText,
	removeText,
	fallback,
	instanceId,
	onSelect,
	onRemove,
}) {
	const img = value ? select("core").getMedia(value) : undefined,
		id = `inspector-media-select-control-${instanceId}`;
	return (
		<BaseControl label={label} id={id} help={help} className={classnames(className, "components-media-select-control")}>
			<MediaUploadCheck fallback={fallback}>
				<MediaUpload
					value={value}
					allowedTypes={allowedTypes}
					onSelect={onSelect}
					multiple={false}
					render={({ open }) => {
						return (
							<>
								{img && img.source_url && (
									<div className="component-media-select-control-edit-image-wrapper">
										<IconButton
											icon="edit"
											onClick={open}
											className="component-media-select-control-edit-image-button"
											label={
												editText ||
												(label && sprintf(__("Click to edit or change the %s"), label.toLowerCase())) ||
												__("Click to edit or change the selected image")
											}
										/>
										<img
											className="component-media-select-control-edit-image"
											src={
												img.media_details && img.media_details.sizes && img.media_details.sizes.medium
													? img.media_details.sizes.medium.source_url
													: img.source_url
											}
											alt={img.alt_text}
											data-id={img.id}
										/>
									</div>
								)}
								<div>
									<Button isDefault={true} onClick={open}>
										{addText ||
											(label && sprintf(__("Add %s", GUTESTRAP_TEXT_DOMAIN), label.toLowerCase())) ||
											__("Add image")}
									</Button>
									{img && img.source_url && (
										<Button isDestructive={true} isTertiary={true} isLink={true} onClick={onRemove}>
											{removeText ||
												(label && sprintf(__("Remove %s", GUTESTRAP_TEXT_DOMAIN), label.toLowerCase())) ||
												__("Remove image")}
										</Button>
									)}
								</div>
							</>
						);
					}}
				/>
			</MediaUploadCheck>
		</BaseControl>
	);
}

export default withInstanceId(MediaSelectControl);

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, BaseControl, Flex, FlexItem } = wp.components;
const { Fragment } = wp.element;
const { withInstanceId } = wp.compose;

let MediaSelectControl = function ({
	label,
	className,
	value: img,
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
	const id = `inspector-media-select-control-${instanceId}`;
	const btnText = img?.url
		? editText ||
		  // translators: %s: media destination/type label
		  (label && sprintf(__("Change %s", "gutestrap"), label.toLowerCase())) ||
		  __("Change image", "gutestrap")
		: addText ||
		  // translators: %s media destination/type label
		  (label && sprintf(__("Add %s", "gutestrap"), label.toLowerCase())) ||
		  __("Add image", "gutestrap");
	return (
		<BaseControl label={label} id={id} help={help} className={classnames(className, "components-media-select-control")}>
			<MediaUploadCheck fallback={fallback}>
				<MediaUpload
					value={img?.id}
					allowedTypes={allowedTypes}
					onSelect={onSelect}
					multiple={false}
					render={({ open }) => {
						return (
							<Fragment>
								{img?.url && (
									<img
										className="component-media-select-control-edit-image"
										src={img.sizes?.medium?.url || img.url}
										alt={img.alt_text}
										data-id={img.id}
									/>
								)}
								<Flex justify="flex-start">
									<FlexItem>
										<Button isSecondary onClick={open}>
											{btnText}
										</Button>
									</FlexItem>
									{img?.url && (
										<FlexItem>
											<Button isDestructive onClick={onRemove}>
												{removeText ||
													{
														/* translators: %s: media destination/type label */
													}(label && sprintf(__("Remove %s", "gutestrap"), label.toLowerCase())) ||
													__("Remove image", "gutestrap")}
											</Button>
										</FlexItem>
									)}
								</Flex>
							</Fragment>
						);
					}}
				/>
			</MediaUploadCheck>
		</BaseControl>
	);
};
MediaSelectControl = withInstanceId(MediaSelectControl);
export { MediaSelectControl };
export default MediaSelectControl;

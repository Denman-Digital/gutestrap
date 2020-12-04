import { sprintf } from "sprintf-js";
const { __ } = wp.i18n;
const { SelectControl, ToggleControl, PanelBody } = wp.components;
const { Fragment, useState, useEffect } = wp.element;

import { GUTESTRAP_TEXT_DOMAIN } from "../const";
import { MediaSelectControl } from "./media-select-control";

const useStateProp = (stateProp, checkShouldUpdate = (newStateProp, state) => newStateProp !== state) => {
	const [state, setState] = useState(stateProp);
	useEffect(() => {
		if (checkShouldUpdate(stateProp, state)) setState(stateProp);
	}, [stateProp]);
	return [state, setState];
};

const instructions = (attr) => (
	<p>{sprintf(__("To edit the %s, you need permission to upload media.", GUTESTRAP_TEXT_DOMAIN), attr)}</p>
);

const positionOptions = [
	{
		label: __("Center (default)", GUTESTRAP_TEXT_DOMAIN),
		value: "center",
	},
	{
		label: __("Top", GUTESTRAP_TEXT_DOMAIN),
		value: "top",
	},
	{
		label: __("Bottom", GUTESTRAP_TEXT_DOMAIN),
		value: "bottom",
	},
	{
		label: __("Left", GUTESTRAP_TEXT_DOMAIN),
		value: "left",
	},
	{
		label: __("Right", GUTESTRAP_TEXT_DOMAIN),
		value: "right",
	},
	{
		label: __("Top left", GUTESTRAP_TEXT_DOMAIN),
		value: "top left",
	},
	{
		label: __("Top right", GUTESTRAP_TEXT_DOMAIN),
		value: "top right",
	},
	{
		label: __("Bottom left", GUTESTRAP_TEXT_DOMAIN),
		value: "bottom left",
	},
	{
		label: __("Bottom right", GUTESTRAP_TEXT_DOMAIN),
		value: "bottom right",
	},
	// {
	// 	label: __("Custom", GUTESTRAP_TEXT_DOMAIN),
	// 	value: "custom",
	// },
];

const sizeOptions = [
	{ label: __("Cover (default)", GUTESTRAP_TEXT_DOMAIN), value: "cover" },
	{ label: __("Contain", GUTESTRAP_TEXT_DOMAIN), value: "contain" },
	{ label: __("Auto", GUTESTRAP_TEXT_DOMAIN), value: "auto" },
	// { label: __("Custom", GUTESTRAP_TEXT_DOMAIN), value: "custom" },
];

// const positionOptionValues = positionOptions.map(({ value }) => value);

export const PanelBackgroundImage = ({ initialOpen = true, value = {}, onChange = (_value) => {} }) => {
	const [image, setImage] = useStateProp(value.image);
	const [position, setPosition] = useStateProp(value.position);
	// const [customPosition, setCustomPosition] = useStateProp(value.position);
	const [size, setSize] = useStateProp(value.size);
	const [repeat, setRepeat] = useStateProp(value.repeat);

	useEffect(() => {
		// const positionValue ;
		onChange({ image, position, size, repeat });
	}, [image, position, size, repeat]);

	return (
		<PanelBody title={__("Background Image", GUTESTRAP_TEXT_DOMAIN)} initialOpen={initialOpen}>
			<MediaSelectControl
				value={image}
				allowedTypes="image"
				onSelect={setImage}
				onRemove={() => setImage(null)}
				fallback={instructions(__("background image", GUTESTRAP_TEXT_DOMAIN))}
				editText={__("Replace", GUTESTRAP_TEXT_DOMAIN)}
				removeText={__("Remove", GUTESTRAP_TEXT_DOMAIN)}
			/>
			{image && (
				<Fragment>
					<SelectControl label={__("Position")} options={positionOptions} value={position} onChange={setPosition} />
					{/* TODO: CUSTOM POSITION */}
					<SelectControl label={__("Size")} options={sizeOptions} value={size} onChange={setSize} />
					{/* TODO: CUSOTM SIZING */}
					<ToggleControl
						checked={repeat}
						onChange={(checked) => setRepeat(!!checked)}
						label={__("Tile image", GUTESTRAP_TEXT_DOMAIN)}
					/>
					{/* TODO: background clip */}
					{/* TODO: background attachment */}
				</Fragment>
			)}
		</PanelBody>
	);
};

export function getBackgroundStyle(background) {
	if (!background?.image?.url) return "";
	const { image, position = "center", size = "cover" } = background;
	return `url(${image.url}) ${position}/${size} no-repeat`;
}

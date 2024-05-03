const { __, _x } = wp.i18n;
const { SelectControl, ToggleControl, PanelBody } = wp.components;
const { Fragment, useEffect } = wp.element;
import { MediaSelectControl } from "./media-select-control";
import { useStateProp } from "./hooks";

const instructions = <p>{__("To edit the background image, you need permission to upload media.", "gutestrap")}</p>;

const positionOptions = [
	{
		label: __("Centre (default)", "gutestrap"),
		value: "center center",
	},
	{
		label: __("Top", "gutestrap"),
		value: "top center",
	},
	{
		label: __("Bottom", "gutestrap"),
		value: "bottom center",
	},
	{
		label: __("Left", "gutestrap"),
		value: "center left",
	},
	{
		label: __("Right", "gutestrap"),
		value: "center right",
	},
	{
		label: __("Top left", "gutestrap"),
		value: "top left",
	},
	{
		label: __("Top right", "gutestrap"),
		value: "top right",
	},
	{
		label: __("Bottom left", "gutestrap"),
		value: "bottom left",
	},
	{
		label: __("Bottom right", "gutestrap"),
		value: "bottom right",
	},
	// {
	// 	label: __("Custom", "gutestrap"),
	// 	value: "custom",
	// },
];

const sizeOptions = [
	{ label: _x("Cover (default)", "background image sizing", "gutestrap"), value: "cover" },
	{ label: __("Contain", "gutestrap"), value: "contain" },
	{ label: _x("Auto", "abbreviation: automatic", "gutestrap"), value: "auto" },
	// { label: __("Custom", "gutestrap"), value: "custom" },
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
		<PanelBody title={__("Background Image", "gutestrap")} initialOpen={initialOpen}>
			<MediaSelectControl
				value={image}
				allowedTypes="image"
				onSelect={setImage}
				onRemove={() => setImage(null)}
				fallback={instructions}
				editText={__("Replace", "gutestrap")}
				removeText={__("Remove", "gutestrap")}
			/>
			{image && (
				<Fragment>
					<SelectControl
						label={__("Position", "gutestrap")}
						options={positionOptions}
						value={position}
						onChange={setPosition}
					/>
					{/* TODO: CUSTOM POSITION */}
					<SelectControl label={__("Size", "gutestrap")} options={sizeOptions} value={size} onChange={setSize} />
					{/* TODO: CUSOTM SIZING */}
					<ToggleControl
						checked={repeat}
						onChange={(checked) => setRepeat(!!checked)}
						label={__("Tile image", "gutestrap")}
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

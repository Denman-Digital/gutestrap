import { GUTESTRAP_TEXT_DOMAIN } from "../../const";

import classNames from "classnames";

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	// PanelColorSettings,
	withColors,
	__experimentalPanelColorGradientSettings: PanelColorGradientSettings,
	__experimentalUseGradient: useGradient,
} = wp.blockEditor;
const { PanelBody, SelectControl, ToggleControl } = wp.components;
import { PanelBackgroundImage } from "../../components/panel-background-image";

function ContainerEdit({
	attributes,
	className,
	setAttributes,
	textColor,
	setTextColor,
	backgroundColor,
	setBackgroundColor,
}) {
	const { breakpoint, fluid, disabled, background } = attributes;
	const { gradientClass, gradientValue, setGradient } = useGradient({
		gradientAttribute: "gradient",
		customGradientAttribute: "customGradient",
	});

	let backgroundImageCSS = "";
	if (background?.image?.url) {
		backgroundImageCSS += `url(${background.image.url})`;
	}
	if (gradientValue) {
		if (backgroundImageCSS) backgroundImageCSS += ", ";
		backgroundImageCSS += gradientValue;
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Responsive Max-Width", GUTESTRAP_TEXT_DOMAIN)}>
					<ToggleControl
						label={__("Enable fluid-width", GUTESTRAP_TEXT_DOMAIN)}
						help={__("Allow this container to stretch to full-width for certain breakpoints.", GUTESTRAP_TEXT_DOMAIN)}
						checked={fluid}
						onChange={(checked) => {
							setAttributes({ fluid: !!checked });
						}}
					/>
					<SelectControl
						label={__("Max-width breakpoint", GUTESTRAP_TEXT_DOMAIN)}
						help={__(
							"Choose the viewport width at which this container should set a max-width.",
							GUTESTRAP_TEXT_DOMAIN
						)}
						disabled={!fluid}
						options={[
							{
								label: __("576px and up (landscape smartphone, default)", GUTESTRAP_TEXT_DOMAIN),
								value: "",
							},
							{
								label: __("768px and up (tablet)", GUTESTRAP_TEXT_DOMAIN),
								value: "md",
							},
							{
								label: __("992px and up (landscape tablet)", GUTESTRAP_TEXT_DOMAIN),
								value: "lg",
							},
							{
								label: __("1200px and up (laptop)", GUTESTRAP_TEXT_DOMAIN),
								value: "xl",
							},
							{
								label: __("1440px and up (desktop)", GUTESTRAP_TEXT_DOMAIN),
								value: "xxl",
							},
							{
								label: __("No max-width", GUTESTRAP_TEXT_DOMAIN),
								value: "fluid",
							},
						]}
						onChange={(value) => setAttributes({ breakpoint: value })}
					/>
				</PanelBody>
				<PanelBackgroundImage
					value={background}
					onChange={(value) => {
						setAttributes({ background: value });
					}}
					initialOpen={!!background?.image}
				/>
				{/* <PanelColorSettings
					title={__("Colour Settings", GUTESTRAP_TEXT_DOMAIN)}
					initialOpen={false}
					disableCustomColors={false}
					disableCustomGradients={true}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __("Background", GUTESTRAP_TEXT_DOMAIN),
						},
						{ value: textColor.color, onChange: setTextColor, label: __("Text", GUTESTRAP_TEXT_DOMAIN) },
					]}
				/> */}
				<PanelColorGradientSettings
					title={__("Colour Settings", GUTESTRAP_TEXT_DOMAIN)}
					initialOpen={false}
					disableCustomColors={false}
					disableCustomGradients={false}
					settings={[
						{
							colorValue: backgroundColor.color,
							gradientValue: gradientValue,
							onColorChange: setBackgroundColor,
							onGradientChange: setGradient,
							label: __("Background", GUTESTRAP_TEXT_DOMAIN),
						},
						{
							colorValue: textColor.color,
							onColorChange: setTextColor,
							label: __("Text", GUTESTRAP_TEXT_DOMAIN),
						},
					]}
				/>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__("Disable block", GUTESTRAP_TEXT_DOMAIN)}
					help={__("Prevent this block and its contents from rendering.", GUTESTRAP_TEXT_DOMAIN)}
					checked={disabled}
					onChange={(checked) => {
						setAttributes({ disabled: !!checked });
					}}
				/>
			</InspectorAdvancedControls>
			<div
				className={classNames({
					"has-text-color": textColor?.color,
					[textColor?.class]: textColor?.class,
					"has-background-color": backgroundColor?.color,
					[backgroundColor?.class]: backgroundColor?.class,
					"has-gradient-background": !!gradientValue,
					[gradientClass]: !!gradientClass,
				})}
				style={{
					backgroundImage: backgroundImageCSS || null,
					backgroundPosition: background?.position || null,
					backgroundSize: background?.size || null,
					backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
					color: textColor?.color,
					backgroundColor: backgroundColor?.color,
				}}
			>
				<div
					className={classNames(className, {
						container: !fluid,
						[`container-${breakpoint}`]: fluid && breakpoint,
					})}
				>
					<InnerBlocks />
				</div>
			</div>
		</Fragment>
	);
}

ContainerEdit = withColors({ textColor: "color", backgroundColor: "background-color" })(ContainerEdit);

export { ContainerEdit };
export default ContainerEdit;

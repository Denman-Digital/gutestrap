import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	// PanelColorSettings,
	withColors,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseGradient as useGradient,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { PanelBackgroundImage } from "../../components/panel-background-image";

const { config } = gutestrapGlobal;

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
				<PanelBody title={__("Responsive Max-Width", "gutestrap")}>
					<ToggleControl
						label={__("Enable fluid-width", "gutestrap")}
						help={__("Allow this container to stretch to full-width for certain breakpoints.", "gutestrap")}
						checked={fluid}
						onChange={(checked) => {
							setAttributes({ fluid: !!checked });
						}}
					/>
					<SelectControl
						label={__("Max-width breakpoint", "gutestrap")}
						help={__("Choose the viewport width at which this container should set a max-width.", "gutestrap")}
						disabled={!fluid}
						value={breakpoint}
						options={[
							{
								label: __("576px and up (landscape smartphone, default)", "gutestrap"),
								value: "",
							},
							{
								label: __("768px and up (tablet)", "gutestrap"),
								value: "md",
							},
							{
								label: __("992px and up (landscape tablet)", "gutestrap"),
								value: "lg",
							},
							{
								label: __("1200px and up (laptop)", "gutestrap"),
								value: "xl",
							},
							{
								label: __("1440px and up (compact desktop)", "gutestrap"),
								value: "xxl",
							},
							{
								label: __("1680px and up (desktop)", "gutestrap"),
								value: "xxxl",
							},
							{
								label: __("No max-width", "gutestrap"),
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
					title={__("Colour Settings", "gutestrap")}
					initialOpen={false}
					disableCustomColors={false}
					disableCustomGradients={true}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __("Background", "gutestrap"),
						},
						{ value: textColor.color, onChange: setTextColor, label: __("Text", "gutestrap") },
					]}
				/> */}
				<PanelColorGradientSettings
					title={__("Colour Settings", "gutestrap")}
					initialOpen={false}
					disableCustomColors={!!config.disableCustomColors}
					disableCustomGradients={!!config.disableCustomGradients}
					settings={[
						{
							colorValue: backgroundColor.color,
							gradientValue: gradientValue,
							onColorChange: setBackgroundColor,
							onGradientChange: setGradient,
							label: __("Background", "gutestrap"),
						},
						{
							colorValue: textColor.color,
							onColorChange: setTextColor,
							label: __("Text", "gutestrap"),
						},
					]}
				/>
			</InspectorControls>
			<InspectorAdvancedControls>
				<ToggleControl
					label={__("Disable block", "gutestrap")}
					help={__("Prevent this block and its contents from rendering.", "gutestrap")}
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
						container: !fluid || !breakpoint,
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

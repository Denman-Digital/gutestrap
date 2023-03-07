import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	__experimentalGetGradientClass as getGradientClass,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { PanelBackgroundImage } from "../../components/panel-background-image";

const { config } = gutestrapGlobal;

function ContainerEdit({ attributes, className, setAttributes, textColor, backgroundColor }) {
	const { breakpoint, fluid, disabled, background, gradient, style = {} } = attributes;
	const { color = {} } = style;
	const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;

	let backgroundImageCSS = "";
	if (background?.image?.url) {
		backgroundImageCSS += `url(${background.image.url})`;
	}
	if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
		if (backgroundImageCSS) backgroundImageCSS += ", ";
		backgroundImageCSS += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
	} else if (customGradient) {
		backgroundImageCSS = customGradient;
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
					"has-text-color": textColor?.color || customTextColor,
					[textColor?.class]: textColor?.class,
					"has-background": backgroundColor?.color || customBackgroundColor,
					[backgroundColor?.class]: backgroundColor?.class,
					[getGradientClass(gradient)]: gradient,
				})}
				style={{
					backgroundImage: backgroundImageCSS || null,
					backgroundPosition: background?.position || "center center",
					backgroundSize: background?.size || "cover",
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

export { ContainerEdit };
export default ContainerEdit;

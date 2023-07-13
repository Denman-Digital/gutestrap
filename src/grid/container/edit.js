import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import { InspectorControls, InspectorAdvancedControls, InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { select } from "@wordpress/data";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { PanelBackgroundImage } from "../../components/panel-background-image";

const { config } = gutestrapGlobal;

function ContainerEdit({ attributes, className, setAttributes }) {
	const { breakpoint, fluid, anchor, disabled, background, insetVertical, insetExpand, insetConditional } = attributes;

	const blockProps = useBlockProps({
		id: anchor,
		className: classNames(className, {
			"has-min-height":
				!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
		}),
	});

	return (
		<Fragment>
			<div {...blockProps}>
				<div
					className={classNames(className, {
						container: !fluid || !breakpoint,
						[`container-${breakpoint || "fluid"}`]: fluid || breakpoint,
						"contain-inset-vert": insetVertical,
						"contain-inset-wide": insetExpand,
						"uncontain-nested": insetConditional,
					})}
				>
					<InnerBlocks />
				</div>
			</div>
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
				<PanelBody title={__("Container Inset", "gutestrap")} initialOpen={false}>
					<p>
						By default, containers apply a horizontal inset to their contents equal to half of the gutter between row
						columns.
					</p>
					<ToggleControl
						label={__("Add vertical container inset", "gutestrap")}
						help={__("Inset container contents vertically as well as horizontally.", "gutestrap")}
						checked={!!insetVertical}
						onChange={(checked) => {
							setAttributes({ insetVertical: !!checked });
						}}
					/>
					<ToggleControl
						label={__("Expand insets", "gutestrap")}
						help={__("Double the size of the container inset to match the gutter between row columns.", "gutestrap")}
						checked={!!insetExpand}
						onChange={(checked) => {
							setAttributes({ insetExpand: !!checked });
						}}
					/>
					<ToggleControl
						label={__("Prevent nested inset", "gutestrap")}
						help={__(
							"Remove the container inset (horizantal & vertical) when this container is the child of another container.",
							"gutestrap"
						)}
						checked={!!insetConditional}
						onChange={(checked) => {
							setAttributes({ insetConditional: !!checked });
						}}
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
		</Fragment>
	);
}

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"gutestrap/with-column-block-list-block-classes",
	createHigherOrderComponent((BlockListBlock) => {
		/**
		 * @arg {Object} props - Props.
		 * @arg {Object} props.attributes - Block attributes.
		 * @arg {Object} props.block - Block properties.
		 * @arg {string} props.block.name - Block name.
		 * @returns {*} JSX
		 */
		const gutestrapColumnBlockListBlockClasses = ({ className, ...props }) => {
			const { attributes, block, clientId } = props;
			const extraClasses = [];
			const wrapperProps = {};

			if (block.name === "gutestrap/container") {
				const _block = select("core/block-editor").getBlock(clientId);
				if (_block?.innerBlocks?.length) {
					extraClasses.push("has-inner-blocks");
				}

				const { background, gradient, style = {} } = attributes;
				const { color = {} } = style;
				const { gradient: customGradient } = color;
				let backgroundImage = "";
				if (background?.image?.url) {
					backgroundImage += `url(${background.image.url})`;
				}
				if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
					if (backgroundImage) backgroundImage += ", ";
					backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
				}

				if (backgroundImage) {
					const backgroundStyles = {
						backgroundImage,
						backgroundPosition: background?.position || "center center",
						backgroundSize: background?.size || "cover",
						backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
					};
					wrapperProps.style = { ...backgroundStyles };
				}
			}
			className = classNames(className, ...extraClasses);
			return <BlockListBlock {...props} className={className} wrapperProps={wrapperProps} />;
		};
		return gutestrapColumnBlockListBlockClasses;
	}, "withGutestrapColumnBlockListBlockClasses")
);
export { ContainerEdit };
export default ContainerEdit;

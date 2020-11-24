import { GUTESTRAP_TEXT_DOMAIN } from "../../const";

import classNames from "classnames";

import { __ } from "@wordpress/i18n";

import { Fragment } from "@wordpress/element";
import { InspectorControls, InspectorAdvancedControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

export const ContainerEdit = ({ attributes, className, setAttributes }) => {
	const { breakpoint, fluid, disabled } = attributes;
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
								label: __("576px and up (landscape smartphone)", GUTESTRAP_TEXT_DOMAIN),
								value: "",
							},
							{ label: __("768px and up (tablet)", GUTESTRAP_TEXT_DOMAIN), value: "md" },
							{ label: __("992px and up (landscape tablet)", GUTESTRAP_TEXT_DOMAIN), value: "lg" },
							{
								label: __("1200px and up (laptop)", GUTESTRAP_TEXT_DOMAIN),
								value: "xl",
							},
							{
								label: __("1440px and up (desktop)", GUTESTRAP_TEXT_DOMAIN),
								value: "xxl",
							},
							{ label: __("No max-width", GUTESTRAP_TEXT_DOMAIN), value: "fluid" },
						]}
						onChange={(value) => setAttributes({ breakpoint: value })}
					/>
				</PanelBody>
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
				className={classNames(className, {
					container: !fluid,
					[`container-${breakpoint}`]: fluid && breakpoint,
				})}
			>
				<InnerBlocks />
			</div>
		</Fragment>
	);
};

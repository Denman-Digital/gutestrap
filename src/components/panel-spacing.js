const { __ } = wp.i18n;
const { PanelBody } = wp.components;

import { __experimentalBoxControl as BoxControl } from "@wordpress/components";

export const PanelSpacing = ({ initialOpen = true, spacingSettings = [] }) => {
	return (
		<PanelBody title={__("Spacing", "gutestrap")} initialOpen={initialOpen}>
			{spacingSettings.map((props, index) => (
				<BoxControl key={index} {...props} />
			))}
		</PanelBody>
	);
};

export default PanelSpacing;

export const Visualizer = BoxControl.__Visualizer;

const { __ } = wp.i18n;
const { PanelBody } = wp.components;

import { __experimentalBoxControl as BoxControl } from "@wordpress/components";

import { GUTESTRAP_TEXT_DOMAIN } from "../const";

export const PanelSpacing = ({ initialOpen = true, spacingSettings = [] }) => {
	return (
		<PanelBody title={__("Spacing", GUTESTRAP_TEXT_DOMAIN)} initialOpen={initialOpen}>
			{spacingSettings.map((props, index) => (
				<BoxControl key={index} {...props} />
			))}
		</PanelBody>
	);
};

PanelSpacing.Visualizer = BoxControl.__Visualizer;

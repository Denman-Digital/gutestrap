const { __ } = wp.i18n;
const { PanelBody, __experimentalBoxControl: BoxControl } = wp.components;

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

// export const Visualizer = BoxControl.__Visualizer;

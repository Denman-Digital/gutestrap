const { _x } = wp.i18n;
const { PanelBody, __experimentalBoxControl: BoxControl } = wp.components;

export const PanelSpacing = ({ initialOpen = true, spacingSettings = [] }) => {
	return (
		<PanelBody title={_x("Spacing", "layout", "gutestrap")} initialOpen={initialOpen}>
			{spacingSettings.map((props, index) => (
				<BoxControl key={index} {...props} />
			))}
		</PanelBody>
	);
};

export default PanelSpacing;

// export const Visualizer = BoxControl.__Visualizer;

import classNames from "classnames";
const {
	InnerBlocks,
	getColorClassName,
	validateThemeGradients,
	getGradientValueBySlug,
	__experimentalGetGradientClass: getGradientClass,
} = wp.blockEditor;

export const ContainerRender = ({ attributes, className }) => {
	const {
		breakpoint,
		background,
		textColor,
		customTextColor,
		backgroundColor,
		customBackgroundColor,
		gradient,
		customGradient,
	} = attributes;
	const style = {
		color: customTextColor || null,
		backgroundColor: customBackgroundColor || null,
	};
	if (background?.image?.url) {
		style.backgroundImage = `url(${background.image.url})`;
		style.backgroundPosition = background?.position || "center";
		style.backgroundSize = background?.size || "cover";
		style.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
	}
	if (customGradient || (gradient && background?.image?.url)) {
		if (style.backgroundImage) {
			style.backgroundImage += ", ";
		} else {
			style.backgroundImage = "";
		}
		style.backgroundImage += customGradient || getGradientValueBySlug(validateThemeGradients(), gradient);
	}
	return (
		<div
			className={classNames(className, {
				"has-text-color": textColor || customTextColor,
				"has-background-color": backgroundColor || customBackgroundColor,
				"has-gradient-background": gradient || customGradient,
				[getColorClassName("color", textColor)]: textColor,
				[getColorClassName("background-color", backgroundColor)]: backgroundColor,
				[getGradientClass(gradient)]: gradient,
			})}
			style={style}
		>
			<div className={`container${breakpoint ? `-${breakpoint}` : ""}`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

//==============================================================================
// DEPRECATED VERSIONS
//

const v4 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		customTextColor: { type: "string" },
		customBackgroundColor: { type: "string" },
	},
	save: ({ attributes, className }) => {
		const { breakpoint, background, textColor, customTextColor, backgroundColor, customBackgroundColor } = attributes;
		const style = {
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
		};
		if (background?.image?.url) {
			style.backgroundImage = `url(${background.image.url})`;
			style.backgroundPosition = background?.position || "center";
			style.backgroundSize = background?.size || "cover";
			style.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
		}
		return (
			<div
				className={classNames(className, {
					"has-text-color": textColor || customTextColor,
					"has-background-color": backgroundColor || customBackgroundColor,
					[getColorClassName("color", textColor)]: textColor,
					[getColorClassName("background-color", backgroundColor)]: backgroundColor,
				})}
				style={style}
			>
				<div className={`container${breakpoint ? "-" + breakpoint : ""}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v3 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			background: true,
			gradient: true,
			text: true,
		},
	},
	save: ({ attributes, className }) => {
		const { breakpoint, background, textColor, backgroundColor } = attributes;
		const style = background?.image?.url
			? {
					backgroundImage: `url(${background.image.url})`,
					backgroundPosition: background?.position || "center",
					backgroundSize: background?.size || "cover",
					backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
			  }
			: null;
		return (
			<div
				className={classNames(className, {
					[getColorClassName("color", textColor)]: textColor,
					[getColorClassName("background-color", backgroundColor)]: backgroundColor,
				})}
				style={style}
			>
				<div className={`container${breakpoint ? "-" + breakpoint : ""}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v2 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const { breakpoint, background, textColor, backgroundColor } = attributes;
		const style = {
			backgroundImage: background?.image?.url ? `url(${background.image.url})` : null,
			backgroundPosition: background?.position || null,
			backgroundSize: background?.size || null,
			backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
		};
		return (
			<div
				className={classNames(className, {
					[getColorClassName("color", textColor)]: textColor,
					[getColorClassName("background-color", backgroundColor)]: backgroundColor,
				})}
				style={style}
			>
				<div className={`container${breakpoint ? "-" + breakpoint : ""}`}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v1 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const { breakpoint } = attributes;
		return (
			<div className={classNames(className, `container${breakpoint ? "-" + breakpoint : ""}`)}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export const deprecated = [v4, v3, v2, v1];

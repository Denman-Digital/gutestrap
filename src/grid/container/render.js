import classNames from "classnames";
import {
	InnerBlocks,
	getColorClassName,
	validateThemeGradients,
	getGradientValueBySlug,
	__experimentalGetGradientClass as getGradientClass,
} from "@wordpress/block-editor";

const { config } = gutestrapGlobal;

export const ContainerRender = ({ attributes, className }) => {
	const { breakpoint, background, textColor, backgroundColor, gradient, style = {} } = attributes;
	const { color = {} } = style;
	const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;

	/** @type {CSSStyleDeclaration} */
	const styles = {
		color: customTextColor || null,
		backgroundColor: customBackgroundColor || null,
	};
	if (background?.image?.url) {
		styles.backgroundImage = `url(${background.image.url})`;
		styles.backgroundPosition = background?.position || "center center";
		styles.backgroundSize = background?.size || "cover";
		styles.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
	}
	if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
		if (styles.backgroundImage) styles.backgroundImage += ", ";
		styles.backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
	} else if (customGradient) {
		styles.backgroundImage = customGradient;
	}

	return (
		<div
			className={classNames(className, {
				"has-text-color": textColor || customTextColor,
				"has-background": backgroundColor || customBackgroundColor || styles.backgroundImage,
				[getColorClassName("color", textColor)]: textColor,
				[getColorClassName("background-color", backgroundColor)]: backgroundColor,
				[getGradientClass(gradient)]: gradient,
			})}
			style={styles}
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

const v5 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		gradient: { type: "string" },
		customTextColor: { type: "string" },
		customBackgroundColor: { type: "string" },
		customGradient: { type: "string" },
	},
	migrate: (attributes, innerBlocks) => {
		const { customTextColor, customBackgroundColor, customGradient, ...attrs } = attributes;
		attrs.style = attrs.style || {};
		attrs.style.color = attrs.style.color || {};
		if (customTextColor) {
			attrs.style.color.text = customTextColor;
		}
		if (customBackgroundColor) {
			attrs.style.color.background = customBackgroundColor;
		}
		if (customGradient) {
			attrs.style.color.gradient = customGradient;
		}
		console.log("Migrate Container:", { old: attributes, new: attrs });
		return [attrs, innerBlocks];
	},
	supports: {
		anchor: true,
		alignWide: false,
	},
	save: ({ attributes, className }) => {
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
	},
};

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

export const deprecated = [v5, v4, v3, v2, v1];

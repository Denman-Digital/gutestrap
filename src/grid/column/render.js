import classNames from "classnames";
import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
	__experimentalGetGradientClass as getGradientClass,
	// __experimentalUseBorderProps as useBorderProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
} from "@wordpress/block-editor";
import { denyProps } from "@pwalton/js-utils";

import { optimizeBoxStyle } from "../../_common";
import {
	COLUMN_OPTION_INHERIT,
	COLUMN_OPTION_WIDTH_DEFAULT,
	COLUMN_OPTION_WIDTH_FIT,
} from "./column-width-offset-control";

const { config } = gutestrapGlobal;

const columnWidthSuffix = (width) => {
	switch (width) {
		case COLUMN_OPTION_WIDTH_DEFAULT:
			return "";
		case COLUMN_OPTION_WIDTH_FIT:
			return "-auto";
		default:
			return `-${width}`;
	}
};

const hasOption = (optionVal) => optionVal != null && optionVal !== COLUMN_OPTION_INHERIT;

export const columnClassNames = ({ width = {}, offset = {}, alignment = {} }) => {
	return classNames({
		[`col${columnWidthSuffix(width.xs || 12)}`]: true,
		[`col-sm${columnWidthSuffix(width.sm)}`]: hasOption(width.sm),
		[`col-md${columnWidthSuffix(width.md)}`]: hasOption(width.md),
		[`col-lg${columnWidthSuffix(width.lg)}`]: hasOption(width.lg),
		[`col-xl${columnWidthSuffix(width.xl)}`]: hasOption(width.xl),
		[`col-xxl${columnWidthSuffix(width.xxl)}`]: hasOption(width.xxl),
		[`col-xxxl${columnWidthSuffix(width.xxxl)}`]: hasOption(width.xxxl),
		[`offset-${offset.xs}`]: !!offset.xs,
		[`offset-sm-${offset.sm}`]: hasOption(offset.sm),
		[`offset-md-${offset.md}`]: hasOption(offset.md),
		[`offset-lg-${offset.lg}`]: hasOption(offset.lg),
		[`offset-xl-${offset.xl}`]: hasOption(offset.xl),
		[`offset-xxl-${offset.xxl}`]: hasOption(offset.xxl),
		[`offset-xxxl-${offset.xxxl}`]: hasOption(offset.xxxl),
		[`align-self-${alignment.xs}`]: !!alignment.xs,
		[`align-self-sm-${alignment.sm}`]: hasOption(alignment.sm),
		[`align-self-md-${alignment.md}`]: hasOption(alignment.md),
		[`align-self-lg-${alignment.lg}`]: hasOption(alignment.lg),
		[`align-self-xl-${alignment.xl}`]: hasOption(alignment.xl),
		[`align-self-xxl-${alignment.xxl}`]: hasOption(alignment.xxl),
		[`align-self-xxxl-${alignment.xxxl}`]: hasOption(alignment.xxxl),
	});
};

/**
 * @arg {string} contentAlignmentValue Value from content alignment.
 * @returns {{justify: string?, align: string?}} Transformed alignments.
 */
function decodeContentAlignment(contentAlignmentValue) {
	let justify, align;
	if (!contentAlignmentValue || contentAlignmentValue === COLUMN_OPTION_INHERIT) {
		return { justify, align };
	}
	const [alignY, alignX] = contentAlignmentValue.split(" ");
	switch (alignX) {
		case "left":
			justify = "start";
			break;
		case "right":
			justify = "end";
			break;
		default:
			justify = alignX;
	}
	switch (alignY) {
		case "top":
			align = "start";
			break;
		case "bottom":
			align = "end";
			break;
		default:
			align = alignY;
	}
	return { justify, align };
}

export const columnInnerClassNames = ({ contentAlignment = {} }) => {
	const contentAlignClasses = {};
	contentAlignment.xs = contentAlignment?.xs || "stretch stretch";
	for (const breakpoint in contentAlignment) {
		if (!contentAlignment.hasOwnProperty(breakpoint)) continue;
		const { justify, align } = decodeContentAlignment(contentAlignment[breakpoint]);
		const infix = breakpoint === "xs" ? "" : "-" + breakpoint;
		contentAlignClasses[`align-items${infix}-${align}`] = !!align;
		contentAlignClasses[`justify-content${infix}-${justify}`] = !!justify;
	}
	return classNames("col__inner", contentAlignClasses);
};

export function stripColClassNames(className = "") {
	if (className) {
		className = className
			.replace(/^(.*\s)?col-(?:\d{1,2}|auto)(\s.*)?$/gi, "$1$2")
			.replace(/^(.*\s)?col(?:-(?:xs|sm|md|lg|x{1,3}l))(?:-(?:\d{1,2}|auto))?(\s.*)?$/gi, "$1$2")
			.replace(/^(.*\s)?offset(?:-(?:xs|sm|md|lg|x{1,3}l))?-\d{1,2}(\s.*)?$/gi, "$1$2")
			.replace(
				/^(.*\s)?align-self(?:-(?:xs|sm|md|lg|x{1,3}l))?-(?:stretch|start|end|center|baseline|none)(\s.*)?$/gi,
				"$1$2"
			)
			.replace(/^(.*\s)?has-[\w-]+-background-color(\s.*)?$/gi, "$1$2")
			.replace(/\s{2,}/g, " ");
	}
	return className.trim();
}

export const COL_INNER_STYLE_PROPS = [
	"paddingTop",
	"paddingRight",
	"paddingBottom",
	"paddingLeft",
	"color",
	"backgroundColor",
	"minHeight",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor",
	"borderWidth",
	"borderTopWidth",
	"borderRightWidth",
	"borderBottomWidth",
	"borderLeftWidth",
	"borderRadius",
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomLeftRadius",
	"borderBottomRightRadius",
];

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * The "save" property must be specified and must be a valid function.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @param {Object} props.attributes Attributes.
 * @param {string} props.className Class name.
 * @returns {Mixed} JSX Frontend HTML.
 */
export const ColumnRender = (props) => {
	const { attributes } = props;
	const { className = "" } = attributes;

	const blockProps = useBlockProps.save({
		className: classNames(stripColClassNames(className), columnClassNames(attributes), {
			"has-min-height":
				!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
		}),
	});

	const borderProps = getBorderClassesAndStyles(attributes);
	// console.log(borderProps);

	/** @type {CSSStyleDeclaration} */
	let innerStyle = {};

	if (blockProps?.style) {
		const { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight } = blockProps.style;
		innerStyle = { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight };
		innerStyle = optimizeBoxStyle(innerStyle, "padding");
		blockProps.style = denyProps(COL_INNER_STYLE_PROPS, blockProps.style);
	}
	if (borderProps?.style) {
		delete borderProps.style.borderRadius;
		delete borderProps.style.borderTopLeftRadius;
		delete borderProps.style.borderTopRightRadius;
		delete borderProps.style.borderBottomLeftRadius;
		delete borderProps.style.borderBottomRightRadius;
		borderProps.style = optimizeBoxStyle(borderProps.style, "borderColor", [
			"borderTopColor",
			"borderRightColor",
			"borderBottomColor",
			"borderLeftColor",
		]);
		borderProps.style = optimizeBoxStyle(borderProps.style, "borderWidth", [
			"borderTopWidth",
			"borderRightWidth",
			"borderBottomWidth",
			"borderLeftWidth",
		]);
		innerStyle = { ...innerStyle, ...borderProps.style };
	}

	const {
		hasBorderRadius,
		hasDropShadow,
		background,
		textColor,
		backgroundColor,
		borderColor,
		gradient,
		style = {},
	} = attributes;
	const { color = {}, border = {} } = style;
	const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;
	const { color: customBorderColor } = border;

	innerStyle.color = customTextColor || null;
	innerStyle.backgroundColor = customBackgroundColor || null;
	if (customBorderColor) {
		innerStyle.borderColor = customBorderColor;
	}

	if (background?.image?.url) {
		innerStyle.backgroundPosition = background?.position || "center center";
		innerStyle.backgroundSize = background?.size || "cover";
		innerStyle.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
		innerStyle.backgroundImage = `url(${background.image.url})`;
	}

	if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
		if (innerStyle.backgroundImage) innerStyle.backgroundImage += ", ";
		innerStyle.backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
	} else if (customGradient) {
		innerStyle.backgroundImage = customGradient;
	}

	return (
		<div {...blockProps}>
			<div
				className={classNames(columnInnerClassNames(attributes), {
					"has-text-color": textColor || customTextColor,
					[getColorClassName("color", textColor)]: textColor,
					"has-background": backgroundColor || customBackgroundColor || innerStyle.backgroundImage,
					[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					[getGradientClass(gradient)]: gradient,
					"has-border-color": borderColor || customBorderColor,
					[getColorClassName("border-color", borderColor)]: borderColor,
					"has-border-radius": hasBorderRadius,
					"has-drop-shadow": hasDropShadow,
				})}
				style={innerStyle}
			>
				<div className="col__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

wp.hooks.addFilter(
	"blocks.getSaveContent.extraProps",
	"gutestrap/col/strip-bad-classes-on-save",
	function stripBadClassesOnSave(props, blockType, attributes) {
		if (blockType.name === "gutestrap/col" && props.className) {
			props.className = classNames(stripColClassNames(props.className), columnClassNames(attributes));
		}
		return props;
	}
);

//==============================================================================
// DEPRECATED VERSIONS
//

function migrateColumnAttributes(attributes, innerBlocks) {
	const { padding, margin, customTextColor, customBackgroundColor, customGradient, ...attrs } = attributes;
	attrs.style = attrs.style || {};
	attrs.style.spacing = attrs.style.spacing || {};
	attrs.style.color = attrs.style.color || {};
	if (padding) {
		attrs.style.spacing.padding = padding;
	}
	if (margin) {
		attrs.style.spacing.margin = margin;
	}

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

	console.log("GuteStrap Column migration:", { old: attributes, new: attrs });
	return [attrs, innerBlocks];
}

export const v11 = {
	attributes: {
		width: {
			type: "object",
			default: {
				xs: 12,
			},
		},
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		hasBorderRadius: { type: "boolean" },
		hasDropShadow: { type: "boolean" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			gradients: true,
			background: true,
			text: true,
		},
		spacing: {
			margin: ["top", "bottom"],
			padding: true,
		},
		dimensions: {
			minHeight: true,
		},
		defaultStylePicker: false,
		renaming: false,
	},
	save: (props) => {
		const { attributes } = props;
		const { className = "" } = attributes;

		const blockProps = useBlockProps.save({
			className: classNames(stripColClassNames(className), columnClassNames(attributes), {
				"has-min-height":
					!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
			}),
		});

		/** @type {CSSStyleDeclaration} */
		let innerStyle = {};

		if (blockProps?.style) {
			const { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight } = blockProps.style;
			innerStyle = { paddingTop, paddingRight, paddingBottom, paddingLeft, minHeight };
			delete blockProps.style.paddingTop;
			delete blockProps.style.paddingRight;
			delete blockProps.style.paddingBottom;
			delete blockProps.style.paddingLeft;
			delete blockProps.style.color;
			delete blockProps.style.backgroundColor;
			delete blockProps.style.minHeight;
		}

		const { hasBorderRadius, hasDropShadow, background, textColor, backgroundColor, gradient, style = {} } = attributes;
		const { color = {} } = style;
		const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;

		innerStyle.color = customTextColor || null;
		innerStyle.backgroundColor = customBackgroundColor || null;

		if (background?.image?.url) {
			innerStyle.backgroundPosition = background?.position || "center center";
			innerStyle.backgroundSize = background?.size || "cover";
			innerStyle.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
			innerStyle.backgroundImage = `url(${background.image.url})`;
		}

		if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
			if (innerStyle.backgroundImage) innerStyle.backgroundImage += ", ";
			innerStyle.backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
		} else if (customGradient) {
			innerStyle.backgroundImage = customGradient;
		}

		return (
			<div {...blockProps}>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background": backgroundColor || customBackgroundColor || innerStyle.backgroundImage,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getGradientClass(gradient)]: gradient,
						"has-border-radius": hasBorderRadius,
						"has-drop-shadow": hasDropShadow,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export const v10 = {
	attributes: {
		width: {
			type: "object",
			default: {
				xs: 12,
			},
		},
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			gradients: true,
			background: true,
			text: true,
		},
		spacing: {
			margin: ["top", "bottom"], // Enable vertical margins.
			padding: true, // Enable padding for all sides.
		},
	},
	save: ({ attributes, className = "" }) => {
		const { width, anchor, background, textColor, backgroundColor, gradient, style = {} } = attributes;
		const { color = {}, spacing = {} } = style;
		const { padding, margin } = spacing;
		const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;

		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
		};
		if (!hasOption(width?.lg)) {
			className = className.replace(/col-lg(?:-(?:\d{1,2}|auto))?/g, "");
		}
		if (!hasOption(width?.md)) {
			className = className.replace(/col-md(?:-(?:\d{1,2}|auto))?/g, "");
		}

		if (background?.image?.url) {
			innerStyle.backgroundPosition = background?.position || "center center";
			innerStyle.backgroundSize = background?.size || "cover";
			innerStyle.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
			innerStyle.backgroundImage = `url(${background.image.url})`;
		}

		if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
			if (innerStyle.backgroundImage) innerStyle.backgroundImage += ", ";
			innerStyle.backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
		} else if (customGradient) {
			innerStyle.backgroundImage = customGradient;
		}

		return (
			<div
				id={anchor || null}
				className={classNames(className, columnClassNames(attributes))}
				style={{
					marginTop: margin?.top,
					marginBottom: margin?.bottom,
				}}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background": backgroundColor || customBackgroundColor || innerStyle.backgroundImage,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getGradientClass(gradient)]: gradient,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export const v9 = {
	attributes: {
		width: {
			type: "object",
			default: {
				xs: 12,
			},
		},
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		padding: { type: "object" },
		margin: { type: "object" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			gradients: true,
			background: true,
			text: true,
		},
	},
	migrate: migrateColumnAttributes,
	save: ({ attributes, className = "" }) => {
		const { width, anchor, background, textColor, backgroundColor, gradient, padding, margin, style = {} } = attributes;
		const { color = {} } = style;
		const { text: customTextColor, background: customBackgroundColor, gradient: customGradient } = color;

		/** @type {CSSStyleDeclaration} */
		const innerStyle = {
			paddingTop: padding?.top || null,
			paddingRight: padding?.right || null,
			paddingBottom: padding?.bottom || null,
			paddingLeft: padding?.left || null,
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
		};

		if (!hasOption(width?.lg)) {
			className = className.replace(/col-lg(?:-(?:\d{1,2}|auto))?/g, "");
		}
		if (!hasOption(width?.md)) {
			className = className.replace(/col-md(?:-(?:\d{1,2}|auto))?/g, "");
		}

		if (background?.image?.url) {
			innerStyle.backgroundPosition = background?.position || "center center";
			innerStyle.backgroundSize = background?.size || "cover";
			innerStyle.backgroundRepeat = background?.repeat ? "repeat" : "no-repeat";
			innerStyle.backgroundImage = `url(${background.image.url})`;
		}

		if (config.enableLayeredGridBackgrounds && (gradient || customGradient)) {
			if (innerStyle.backgroundImage) innerStyle.backgroundImage += ", ";
			innerStyle.backgroundImage += gradient ? `var(--wp--preset--gradient--${gradient})` : customGradient;
		} else if (customGradient) {
			innerStyle.backgroundImage = customGradient;
		}

		return (
			<div
				id={anchor || null}
				className={classNames(className, columnClassNames(attributes))}
				style={{
					marginTop: margin?.top || null,
					marginBottom: margin?.bottom || null,
				}}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background": backgroundColor || customBackgroundColor || innerStyle.backgroundImage,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getGradientClass(gradient)]: gradient,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

export const v8 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		gradient: { type: "string" },
		customTextColor: { type: "string" },
		customBackgroundColor: { type: "string" },
		customGradient: { type: "string" },
		padding: { type: "object" },
		margin: { type: "object" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
		alignWide: false,
	},
	migrate: migrateColumnAttributes,
	save: ({ attributes, className }) => {
		const {
			background,
			textColor,
			customTextColor,
			backgroundColor,
			customBackgroundColor,
			borderColor,
			customBorderColor,
			gradient,
			customGradient,
			padding,
			margin,
		} = attributes;
		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
			borderColor: customBorderColor || null,
		};
		if (background?.image?.url) {
			innerStyle.backgroundImage = `url(${background.image.url})`;
			innerStyle.backgroundPosition = background.position || "center";
			innerStyle.backgroundSize = background.size || "cover";
			innerStyle.backgroundRepeat = background.repeat ? "repeat" : "no-repeat";
		}
		if (customGradient || (gradient && background?.image?.url)) {
			if (innerStyle.backgroundImage) {
				innerStyle.backgroundImage += ", ";
			} else {
				innerStyle.backgroundImage = "";
			}
			innerStyle.backgroundImage += customGradient;
		}

		return (
			<div
				className={classNames(className, columnClassNames(attributes))}
				style={{
					marginTop: margin?.top,
					marginBottom: margin?.bottom,
				}}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background-color": backgroundColor || customBackgroundColor,
						"has-border-color": borderColor || customBorderColor,
						"has-background-gradient": gradient || customGradient,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getColorClassName("border-color", borderColor)]: borderColor,
						[getGradientClass(gradient)]: gradient,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

const v7 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		borderColor: { type: "string" },
		customTextColor: { type: "string" },
		customBackgroundColor: { type: "string" },
		customBorderColor: { type: "string" },
		padding: { type: "object" },
		margin: { type: "object" },
		_isExample: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const {
			background,
			textColor,
			customTextColor,
			backgroundColor,
			customBackgroundColor,
			borderColor,
			customBorderColor,
			padding,
			margin,
		} = attributes;
		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
			borderColor: customBorderColor || null,
		};
		if (background?.image?.url) {
			innerStyle.backgroundImage = `url(${background.image.url})`;
			innerStyle.backgroundPosition = background.position || "center";
			innerStyle.backgroundSize = background.size || "cover";
			innerStyle.backgroundRepeat = background.repeat ? "repeat" : "no-repeat";
		}
		return (
			<div
				className={classNames(className, columnClassNames(attributes))}
				style={{
					marginTop: margin?.top,
					marginBottom: margin?.bottom,
				}}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background-color": backgroundColor || customBackgroundColor,
						"has-border-color": borderColor || customBorderColor,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
						[getColorClassName("border-color", borderColor)]: borderColor,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

const v6 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		customTextColor: { type: "string" },
		customBackgroundColor: { type: "string" },
		padding: { type: "object" },
		margin: { type: "object" },
		_isExample: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const { background, textColor, customTextColor, backgroundColor, customBackgroundColor, padding, margin } =
			attributes;
		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			color: customTextColor || null,
			backgroundColor: customBackgroundColor || null,
		};
		if (background?.image?.url) {
			innerStyle.backgroundImage = `url(${background.image.url})`;
			innerStyle.backgroundPosition = background.position || "center";
			innerStyle.backgroundSize = background.size || "cover";
			innerStyle.backgroundRepeat = background.repeat ? "repeat" : "no-repeat";
		}
		return (
			<div
				className={classNames(className, columnClassNames(attributes))}
				style={{
					marginTop: margin?.top,
					marginBottom: margin?.bottom,
				}}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						"has-text-color": textColor || customTextColor,
						"has-background-color": backgroundColor || customBackgroundColor,
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

const v5 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
		contentAlignment: { type: "object" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		padding: { type: "object" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			background: true,
			gradient: true,
			text: true,
		},
		padding: true,
	},
	save: ({ attributes, className }) => {
		const { background, textColor, backgroundColor, padding } = attributes;
		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
		};
		if (background?.image?.url) {
			innerStyle.backgroundImage = `url(${background.image.url})`;
			innerStyle.backgroundPosition = background.position || "center";
			innerStyle.backgroundSize = background.size || "cover";
			innerStyle.backgroundRepeat = background.repeat ? "repeat" : "no-repeat";
		}
		return (
			<div
				className={classNames(className, columnClassNames(attributes))
					.replace(getColorClassName("color", textColor), "")
					.replace(getColorClassName("background-color", backgroundColor), "")
					.replace(/\s+/g, " ")}
			>
				<div
					className={classNames(columnInnerClassNames(attributes), {
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					})}
					style={innerStyle}
				>
					<div className="col__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
};

const v4 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
		background: { type: "object" },
		textColor: { type: "string" },
		backgroundColor: { type: "string" },
		padding: { type: "object" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		color: {
			background: true,
			gradient: true,
			text: true,
		},
		padding: true,
	},
	save: ({ attributes, className }) => {
		const { background, textColor, backgroundColor, padding } = attributes;
		const innerStyle = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
		};
		if (background?.image?.url) {
			innerStyle.backgroundImage = `url(${background.image.url})`;
			innerStyle.backgroundPosition = background.position || "center";
			innerStyle.backgroundSize = background.size || "cover";
			innerStyle.backgroundRepeat = background.repeat ? "repeat" : "no-repeat";
		}
		return (
			<div className={classNames(className, columnClassNames(attributes))}>
				<div
					className={classNames({
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					})}
					style={innerStyle}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v3 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
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
		const { background, textColor, backgroundColor } = attributes;
		const style = background?.image?.url
			? {
					backgroundImage: `url(${background.image.url})`,
					backgroundPosition: background.position || "center",
					backgroundSize: background.size || "cover",
					backgroundRepeat: background.repeat ? "repeat" : "no-repeat",
			  }
			: null;
		return (
			<div className={classNames(className, columnClassNames(attributes))}>
				<div
					className={classNames({
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					})}
					style={style}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v2 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
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
		const { background, textColor, backgroundColor } = attributes;
		const style = {
			backgroundImage: background?.image?.url ? `url(${background.image.url})` : null,
			backgroundPosition: background?.position || null,
			backgroundSize: background?.size || null,
			backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
		};
		return (
			<div className={classNames(className, columnClassNames(attributes))}>
				<div
					className={classNames({
						[getColorClassName("color", textColor)]: textColor,
						[getColorClassName("background-color", backgroundColor)]: backgroundColor,
					})}
					style={style}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

const v1 = {
	attributes: {
		width: { type: "object" },
		offset: { type: "object" },
		alignment: { type: "object" },
	},
	supports: {
		anchor: true,
		alignWide: false,
	},
	save: ({ attributes, className }) => {
		return (
			<div className={classNames(className, columnClassNames(attributes))}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export const deprecated = [v11, v10, v9, v8, v7, v6, v5, v4, v3, v2, v1];

import classNames from "classnames";
const { InnerBlocks, getColorClassName } = wp.blockEditor;

import {
	COLUMN_OPTION_INHERIT,
	COLUMN_OPTION_WIDTH_DEFAULT,
	COLUMN_OPTION_WIDTH_FIT,
} from "./column-width-offset-control";

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

export const columnClassNames = ({ width = {}, offset = {}, alignment = {} }) => {
	return classNames({
		[`col${columnWidthSuffix(width.xs || COLUMN_OPTION_WIDTH_DEFAULT)}`]: true,
		[`col-sm${columnWidthSuffix(width.sm)}`]: width.sm != null && width.sm !== COLUMN_OPTION_INHERIT,
		[`col-md${columnWidthSuffix(width.md)}`]: width.md != null && width.md !== COLUMN_OPTION_INHERIT,
		[`col-lg${columnWidthSuffix(width.lg)}`]: width.lg != null && width.lg !== COLUMN_OPTION_INHERIT,
		[`col-xl${columnWidthSuffix(width.xl)}`]: width.xl != null && width.xl !== COLUMN_OPTION_INHERIT,
		[`col-xxl${columnWidthSuffix(width.xxl)}`]: width.xxl != null && width.xxl !== COLUMN_OPTION_INHERIT,
		[`offset-${offset.xs}`]: !!offset.xs,
		[`offset-sm-${offset.sm}`]: offset.sm != null && offset.sm !== COLUMN_OPTION_INHERIT,
		[`offset-md-${offset.md}`]: offset.md != null && offset.md !== COLUMN_OPTION_INHERIT,
		[`offset-lg-${offset.lg}`]: offset.lg != null && offset.lg !== COLUMN_OPTION_INHERIT,
		[`offset-xl-${offset.xl}`]: offset.xl != null && offset.xl !== COLUMN_OPTION_INHERIT,
		[`offset-xxl-${offset.xxl}`]: offset.xxl != null && offset.xxl !== COLUMN_OPTION_INHERIT,
		[`align-self-${alignment.xs}`]: !!alignment.xs,
		[`align-self-sm-${alignment.sm}`]: alignment.sm != null && alignment.sm !== COLUMN_OPTION_INHERIT,
		[`align-self-md-${alignment.md}`]: alignment.md != null && alignment.md !== COLUMN_OPTION_INHERIT,
		[`align-self-lg-${alignment.lg}`]: alignment.lg != null && alignment.lg !== COLUMN_OPTION_INHERIT,
		[`align-self-xl-${alignment.xl}`]: alignment.xl != null && alignment.xl !== COLUMN_OPTION_INHERIT,
		[`align-self-xxl-${alignment.xxl}`]: alignment.xxl != null && alignment.xxl !== COLUMN_OPTION_INHERIT,
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

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * The "save" property must be specified and must be a valid function.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Frontend HTML.
 */
export const ColumnRender = ({ attributes, className }) => {
	const {
		background,
		textColor,
		customTextColor,
		backgroundColor,
		customBackgroundColor,
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

export const deprecated = [v5, v4, v3, v2, v1];

import classNames from "classnames";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export const rowClassNames = (attributes) => {
	return classNames(
		rowBasicClassNames(attributes),
		rowAlignmentClassNames(attributes),
		rowJustificationClassNames(attributes),
		rowDirectionClassNames(attributes),
		rowWrapClassNames(attributes)
	);
};
export const rowBasicClassNames = ({ noGutters = false, verticalGutters = false }) => {
	return classNames({
		row: true,
		"no-gutters": !!noGutters,
		"vertical-gutters": !!verticalGutters,
	});
};
export const rowColumnWidthClassNames = ({ defaultColWidth = {} }) => {
	return classNames({
		[`row-cols-${defaultColWidth.xs}`]: !!defaultColWidth.xs,
		[`row-cols-sm-${defaultColWidth.sm}`]: !!defaultColWidth.sm,
		[`row-cols-md-${defaultColWidth.md}`]: !!defaultColWidth.md,
		[`row-cols-lg-${defaultColWidth.lg}`]: !!defaultColWidth.lg,
		[`row-cols-xl-${defaultColWidth.xl}`]: !!defaultColWidth.xl,
		[`row-cols-xxl-${defaultColWidth.xxl}`]: !!defaultColWidth.xxl,
		[`row-cols-xxxl-${defaultColWidth.xxxl}`]: !!defaultColWidth.xxxl,
	});
};
export const rowAlignmentClassNames = ({ alignment = {} }) => {
	return classNames({
		[`align-items-${alignment.xs}`]: alignment.xs,
		[`align-items-sm-${alignment.sm}`]: !!alignment.sm && alignment.sm !== "inherit",
		[`align-items-md-${alignment.md}`]: !!alignment.md && alignment.md !== "inherit",
		[`align-items-lg-${alignment.lg}`]: !!alignment.lg && alignment.lg !== "inherit",
		[`align-items-xl-${alignment.xl}`]: !!alignment.xl && alignment.xl !== "inherit",
		[`align-items-xxl-${alignment.xxl}`]: !!alignment.xxl && alignment.xxl !== "inherit",
		[`align-items-xxxl-${alignment.xxxl}`]: !!alignment.xxxl && alignment.xxxl !== "inherit",
	});
};
export const rowJustificationClassNames = ({ justification = {} }) => {
	return classNames({
		[`justify-content-${justification.xs}`]: justification.xs,
		[`justify-content-sm-${justification.sm}`]: !!justification.sm && justification.sm !== "inherit",
		[`justify-content-md-${justification.md}`]: !!justification.md && justification.md !== "inherit",
		[`justify-content-lg-${justification.lg}`]: !!justification.lg && justification.lg !== "inherit",
		[`justify-content-xl-${justification.xl}`]: !!justification.xl && justification.xl !== "inherit",
		[`justify-content-xxl-${justification.xxl}`]: !!justification.xxl && justification.xxl !== "inherit",
		[`justify-content-xxxl-${justification.xxxl}`]: !!justification.xxxl && justification.xxxl !== "inherit",
	});
};
export const rowDirectionClassNames = ({ direction = {} }) => {
	return classNames({
		[`flex-${direction.xs}`]: direction.xs,
		[`flex-sm-${direction.sm}`]: !!direction.sm && direction.sm !== "inherit",
		[`flex-md-${direction.md}`]: !!direction.md && direction.md !== "inherit",
		[`flex-lg-${direction.lg}`]: !!direction.lg && direction.lg !== "inherit",
		[`flex-xl-${direction.xl}`]: !!direction.xl && direction.xl !== "inherit",
		[`flex-xxl-${direction.xxl}`]: !!direction.xxl && direction.xxl !== "inherit",
		[`flex-xxxl-${direction.xxxl}`]: !!direction.xxxl && direction.xxxl !== "inherit",
	});
};
export const rowWrapClassNames = ({ direction = {} }) => {
	return classNames({
		[`flex-${direction.xs?.replace("row", "wrap")}`]: direction.xs,
		[`flex-sm-${direction.sm?.replace("row", "wrap")}`]: !!direction.sm && direction.sm !== "inherit",
		[`flex-md-${direction.md?.replace("row", "wrap")}`]: !!direction.md && direction.md !== "inherit",
		[`flex-lg-${direction.lg?.replace("row", "wrap")}`]: !!direction.lg && direction.lg !== "inherit",
		[`flex-xl-${direction.xl?.replace("row", "wrap")}`]: !!direction.xl && direction.xl !== "inherit",
		[`flex-xxl-${direction.xxl?.replace("row", "wrap")}`]: !!direction.xxl && direction.xxl !== "inherit",
		[`flex-xxxl-${direction.xxxl?.replace("row", "wrap")}`]: !!direction.xxxl && direction.xxxl !== "inherit",
	});
};

/**
 * Used to prevent critical classes from being used in the custom classname field.
 * @param {string} className Custom className attribute.
 * @returns {string} filtered class name
 */
export function stripRowClassNames(className = "") {
	if (className) {
		className = className
			.replace(/^(.*\s)?row(\s.*)?$/gi, "$1$2")
			.replace(/^(.*\s)?(?:no|vertical)-gutters(\s.*)?$/gi, "$1$2")
			.replace(/^(.*\s)?flex(?:-(?:xs|sm|md|lg|x{1,3}l))?-row(?:-reverse)?(\s.*)?$/gi, "$1$2")
			.replace(/^(.*\s)?flex(?:-(?:xs|sm|md|lg|x{1,3}l))?-wrap(?:-reverse)?(\s.*)?$/gi, "$1$2")
			.replace(
				/^(.*\s)?align-items(?:-(?:xs|sm|md|lg|x{1,3}l))?-(?:stretch|start|end|center|baseline|none)(\s.*)?$/gi,
				"$1$2"
			)
			.replace(
				/^(.*\s)?justify-content(?:-(?:xs|sm|md|lg|x{1,3}l))?-(?:stretch|start|end|center|between|evenly|around|none)(\s.*)?$/gi,
				"$1$2"
			);
	}
	return className.trim();
}

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Frontend HTML.
 */
export const RowRender = ({ attributes }) => {
	const { className = "" } = attributes;
	const blockProps = useBlockProps.save({
		className: classNames(stripRowClassNames(className), {
			"has-min-height":
				!!attributes.style?.dimensions?.minHeight && !/^0(%|[a-zA-Z]+)?$/.test(attributes.style.dimensions.minHeight),
		}),
	});

	return (
		<div {...blockProps}>
			<div className={classNames(rowClassNames(attributes))}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

// function stripBadClassesOnSave(props, block, attributes) {
// 	if (block.name === "gutestrap/row") {
// 		/** @type {{className: string}} className */
// 		let { className } = props;

// 		if (className) {
// 			className = className.replace(/^(.*?\s)?row(\s.*)?$/gi, "$1$2");
// 			className = className.replace(classRegexs.gutters, "");
// 			className = className.replace(classRegexs.alignment, "");
// 			className = className.replace(classRegexs.justification, "");
// 			className = className.replace(classRegexs.direction, "");
// 			className = className.replace(classRegexs.wrap, "");
// 			className = className.replace(/\s{2,}/g, " ");
// 		}
// 		props.className = classNames(className.trim());
// 	}
// 	return props;
// }

// // wp.hooks.addFilter(
// // 	"blocks.getSaveContent.extraProps",
// // 	"gutestrap/row/strip-bad-classes-on-save",
// // 	stripBadClassesOnSave
// // );

//==============================================================================
// DEPRECATED VERSIONS
//

const v6 = {
	attributes: {
		noGutters: { type: "boolean" },
		verticalGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		direction: { type: "object" },
		disabled: { type: "boolean" },
		anchor: { type: "string" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
		alignWide: false,
		spacing: {
			padding: ["top", "bottom"], // Enable vertical padding.
			margin: ["top", "bottom"], // Enable vertical margin.
		},
	},
	save: ({ attributes }) => {
		const { className } = attributes;
		const blockProps = useBlockProps.save({
			className: classNames(className, rowClassNames(attributes)),
		});
		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

const v5 = {
	attributes: {
		noGutters: { type: "boolean" },
		verticalGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		defaultColWidth: { type: "object" },
		direction: { type: "object" },
		disabled: { type: "boolean" },
		anchor: { type: "string" },
		_isExample: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const { style = {}, anchor } = attributes;
		const { spacing = {} } = style;
		const { padding } = spacing;
		return (
			<div
				id={anchor || null}
				className={classNames(className, rowClassNames(attributes), rowColumnWidthClassNames(attributes))}
				style={{
					paddingTop: padding?.top,
					paddingBottom: padding?.bottom,
				}}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
};

const v4 = {
	attributes: {
		noGutters: { type: "boolean" },
		verticalGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		defaultColWidth: { type: "object" },
		direction: { type: "object" },
		disabled: { type: "boolean" },
		anchor: { type: "string" },
		padding: { type: "object" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
	},
	migrate: (attributes, innerBlocks) => {
		const { padding, ...attrs } = attributes;
		attrs.style = attrs.style || {};
		attrs.style.spacing = attrs.style.spacing || {};
		if (padding) {
			attrs.style.spacing.padding = padding;
		}
		return [attrs, innerBlocks];
	},
	save: ({ attributes, className }) => {
		const { padding, anchor } = attributes;
		const style = {
			paddingTop: padding?.top,
			paddingBottom: padding?.bottom,
		};
		return (
			<div id={anchor || null} className={classNames(className, rowClassNames(attributes))} style={style}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

const v3 = {
	attributes: {
		noGutters: { type: "boolean" },
		verticalGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		defaultColWidth: { type: "object" },
		direction: { type: "object" },
		disabled: { type: "boolean" },
		padding: { type: "object" },
		anchor: { type: "string" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
	},
	save: ({ attributes, className }) => {
		const { padding, anchor } = attributes;
		const style = {
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
		};
		return (
			<div
				id={anchor || null}
				className={classNames(
					className,
					rowBasicClassNames(attributes),
					rowColumnWidthClassNames(attributes),
					rowAlignmentClassNames(attributes),
					rowJustificationClassNames(attributes),
					rowDirectionClassNames(attributes)
				)}
				style={style}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
};

const v2 = {
	attributes: {
		noGutters: { type: "boolean" },
		verticalGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		defaultColWidth: { type: "object" },
		disabled: { type: "boolean" },
		padding: { type: "object" },
		anchor: { type: "string" },
		_isExample: { type: "boolean" },
	},
	supports: {
		anchor: true,
	},
	save: ({ attributes, className }) => {
		return (
			<div className={classNames(className, rowClassNames(attributes))}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

const v1 = {
	attributes: {
		noGutters: { type: "boolean" },
		alignment: { type: "object" },
		justification: { type: "object" },
		defaultColWidth: { type: "object" },
		disabled: { type: "boolean" },
	},
	supports: {
		anchor: true,
	},
	save: ({ attributes, className }) => {
		return (
			<div className={classNames(className, rowClassNames(attributes))}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export const deprecated = [v6, v5, v4, v3, v2, v1];

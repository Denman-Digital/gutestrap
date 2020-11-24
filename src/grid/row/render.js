import classNames from "classnames";
import { InnerBlocks } from "@wordpress/block-editor";

export const rowClassNames = ({ defaultColWidth = {}, noGutters = false, justification = {}, alignment = {} }) => {
	return classNames({
		row: true,
		"no-gutters": !!noGutters,
		[`row-cols-${defaultColWidth.xs}`]: !!defaultColWidth.xs,
		[`row-cols-sm-${defaultColWidth.sm}`]: !!defaultColWidth.sm,
		[`row-cols-md-${defaultColWidth.md}`]: !!defaultColWidth.md,
		[`row-cols-lg-${defaultColWidth.lg}`]: !!defaultColWidth.lg,
		[`row-cols-xl-${defaultColWidth.xl}`]: !!defaultColWidth.xl,
		[`row-cols-xxl-${defaultColWidth.xxl}`]: !!defaultColWidth.xxl,
		[`align-items-${alignment.xs}`]: alignment.xs,
		[`align-items-sm-${alignment.sm}`]: !!alignment.sm && alignment.sm !== "inherit",
		[`align-items-md-${alignment.md}`]: !!alignment.md && alignment.md !== "inherit",
		[`align-items-lg-${alignment.lg}`]: !!alignment.lg && alignment.lg !== "inherit",
		[`align-items-xl-${alignment.xl}`]: !!alignment.xl && alignment.xl !== "inherit",
		[`align-items-xxl-${alignment.xxl}`]: !!alignment.xxl && alignment.xxl !== "inherit",
		[`justify-content-${justification.xs}`]: justification.xs,
		[`justify-content-sm-${justification.sm}`]: !!justification.sm && justification.sm !== "inherit",
		[`justify-content-md-${justification.md}`]: !!justification.md && justification.md !== "inherit",
		[`justify-content-lg-${justification.lg}`]: !!justification.lg && justification.lg !== "inherit",
		[`justify-content-xl-${justification.xl}`]: !!justification.xl && justification.xl !== "inherit",
		[`justify-content-xxl-${justification.xxl}`]: !!justification.xxl && justification.xxl !== "inherit",
	});
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
export const RowRender = ({ attributes, className }) => {
	return (
		<div className={classNames(className, rowClassNames(attributes))}>
			<InnerBlocks.Content />
		</div>
	);
};
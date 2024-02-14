import classnames from "classnames";
import { __, _n, sprintf } from "@wordpress/i18n";
import { useState, useEffect, useRef } from "@wordpress/element";
import { BaseControl, SelectControl } from "@wordpress/components";

export const COLUMN_OPTION_WIDTH_FIT = "auto";
export const COLUMN_OPTION_WIDTH_DEFAULT = "default";
export const COLUMN_OPTION_INHERIT = "inherit";

const INHERIT_OPTION = { label: __("Inherit from smaller", "gutestrap"), value: COLUMN_OPTION_INHERIT };

function generateOptions(gridCols, canInherit) {
	const widths = canInherit ? [INHERIT_OPTION] : [];
	const offsets = canInherit ? [INHERIT_OPTION] : [];
	const columnsCount = Math.max(1, gridCols);
	for (let count = 1; count <= columnsCount; count++) {
		const offset = count - 1;
		offsets.push({
			value: offset,
			label: offset
				? // translators: %d: number of columns
				  sprintf(_n("%d column", "%d columns", offset, "gutestrap"), offset)
				: __("No offset", "gutestrap"),
		});
		widths.push({
			value: count,
			// translators: %d: number of columns
			label: sprintf(_n("%d column", "%d columns", count, "gutestrap"), count),
		});
	}
	return { widths, offsets };
}
export const ColumnWidthOffsetControl = ({
	label,
	help,
	className,
	gridCols = 12,
	canInherit = true,
	onChange = () => {},
	value: { width: widthProp, offset: offsetProp },
}) => {
	const [width, setWidth] = useState(widthProp != null ? widthProp : 0);
	useEffect(() => setWidth(widthProp), [widthProp]);

	const [offset, setOffset] = useState(
		(offsetProp != null && offsetProp) || (canInherit && COLUMN_OPTION_INHERIT) || 0
	);
	useEffect(() => setOffset(offsetProp), [offsetProp]);

	useEffect(() => {
		onChange({ width, offset });
	}, [width, offset]);

	const options = useRef(generateOptions(gridCols, canInherit));

	useEffect(() => {
		const { widths, offsets } = generateOptions(gridCols, canInherit);
		options.current.offsets = offsets;
		options.current.widths = widths;
	}, [gridCols, canInherit]);

	return (
		<BaseControl label={label} help={help} className={classnames(className, "components-column-width-offset-control")}>
			<div className="components-column-width-offset-control__fields">
				<SelectControl
					label={__("Width", "gutestrap")}
					options={[
						{
							label: __("Default width from row", "gutestrap"),
							value: COLUMN_OPTION_WIDTH_DEFAULT,
						},
						{
							label: __("Fit content", "gutestrap"),
							value: COLUMN_OPTION_WIDTH_FIT,
						},
						...options.current.widths,
					]}
					onChange={(value) => setWidth(value)}
					value={width}
				/>
				<SelectControl
					label={__("Offset", "gutestrap")}
					options={options.current.offsets}
					onChange={(value) => setOffset(value)}
					value={offset}
				/>
			</div>
		</BaseControl>
	);
};

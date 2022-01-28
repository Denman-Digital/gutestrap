import classNames from "classnames";
const { Fragment } = wp.element;
import PropTypes from "prop-types";

export const Icon = ({
	alt,
	icon,
	style = "regular",
	size = "",
	fixedWidth = false,
	rotate = "",
	flip = "",
	className,
}) => {
	if (!icon) return;
	style = style || "regular";
	return (
		<Fragment>
			<i
				className={classNames(className, {
					[`fa${style.charAt(0).toLowerCase()}`]: true,
					[`fa-${icon.toLowerCase()}`]: true,
					"fa-fw": fixedWidth,
					[`fa-${size.toLowerCase()}`]: !!size,
					[`fa-flip-${flip.toLowerCase()}`]: !!flip,
					[`fa-rotate-${rotate}`]: !!rotate,
				})}
				aria-hidden={true}
				title={alt}
			/>
			{alt && <span className="sr-only">{alt}</span>}
		</Fragment>
	);
};

Icon.propTypes = {
	icon: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.oneOf(["regular", "light", "solid", "duotone", "brands"]),
	size: PropTypes.oneOf(["xs", "sm", "lg", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"]),
	rotate: PropTypes.oneOf(["90", "180", "270"]),
	flip: PropTypes.oneOf(["horizontal", "vertical", "both"]),
	fixedWidth: PropTypes.bool,
};

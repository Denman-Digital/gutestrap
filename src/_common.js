export const BOOTSTRAP_ICON_CLASSES = "bi bi-block-control-icon";

export const GRID_BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1440,
	xxxl: 1680,
	xxxxl: 1900,
};

export const CONTAINER_MAX_WIDTHS = {
	sm: 540,
	md: 720,
	lg: 960,
	xl: 1140,
	xxl: 1320,
	xxxl: 1440,
	xxxxl: 1700,
};

export const GRID_GUTTER_WIDTH = 30;

export function toNumber(value, fallback = 0) {
	const number = Number(value);
	if (isNaN(number)) {
		return toNumber(fallback);
	}
	return number;
}

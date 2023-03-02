import { sprintf } from "sprintf-js";

export const BOOTSTRAP_ICON_CLASSES = "bi bi-block-control-icon";

export function toNumber(value, fallback = 0) {
	const number = Number(value);
	if (isNaN(number)) {
		return toNumber(fallback);
	}
	return number;
}

export class RFS {
	base = 1.0;
	base_unit = "rem";
	breakpoint = 118.75;
	factor = 10.0;
	twoDimensional = false;

	static UNIT_PX = "px";
	static UNIT_REM = "rem";
	static UNIT_VMIN = "vmin";
	static UNIT_VW = "vw";

	/**
	 * Constructor
	 * @param {Object} [options] Options object.
	 * @param {?number} [options.base=1] RFS base value in rems.
	 * @param {?number} [options.breakpoint=1900] RFS breakpoint value in rem/em.
	 * @param {?number} [options.factor=10] RFS scaling factor. SHould be >= 1.
	 * @param {?number} [options.twoDimensional=false] Whether RFS should scale based on both screen size axes.
	 */
	constructor(options = {}) {
		this.base = Math.abs(options.base || 1);
		this.breakpoint = Math.abs(options.breakpoint || 118.75);
		this.factor = Math.max(options.factor || 10, 1);
		this.twoDimensional = !!(options.twoDimensional || false);
	}

	/**
	 * Turn a CSS rem or px value into a responsively scaling value.
	 * @param {string} value CSS value string with unit.
	 * @param {boolean} [keepUnit=false] Whether to keep the supplied unit or convert to rem.
	 * @param {?number} [baseOverride] Optionally override the instance's RFS base value.
	 * @param {?number} [factorOverride] Optionally override the instance's RFS scaling factor.
	 * @returns {string} CSS string for variable value.
	 */
	calculate = (value, keepUnit = false, baseOverride = null, factorOverride = null) => {
		let matches = value.match(/(\d*?\.?\d+)(px|r?em|%|v(?:w|h|min|max))/);

		if (!matches) {
			return value;
		}
		// eslint-disable-next-line no-unused-vars
		let [_value, val, unit] = matches;
		if (![RFS.UNIT_PX, RFS.UNIT_REM].includes(unit)) {
			return value;
		}
		val = toNumber(val);
		const remVal = unit === RFS.UNIT_PX ? val / 16 : val;
		let useRem = unit === RFS.UNIT_REM || !keepUnit;

		let rfsBase = this.base;
		if (baseOverride != null) {
			rfsBase = Math.abs(toNumber(baseOverride));
		}

		if (Math.abs(remVal) <= rfsBase) {
			if (useRem) {
				return sprintf("%.4f%s", remVal, RFS.UNIT_REM);
			}
			return sprintf("%.1f%s", remVal * 16, unit);
		}

		let rfsFactor = this.factor;
		if (factorOverride != null) {
			rfsFactor = Math.max(toNumber(factorOverride), 1);
		}

		const remValMin = rfsBase + (Math.abs(remVal) - rfsBase) / rfsFactor;

		const remValDiff = Math.abs(remVal) - remValMin;

		let minSize = "";
		if (useRem) {
			minSize = sprintf("%.4f%s", remValMin, RFS.UNIT_REM);
		} else {
			minSize = sprintf("%.1f%s", remValMin * 16, unit);
		}

		if (val < 0) {
			minSize = `-${minSize}`;
		}

		const variableUnit = this.twoDimensional ? RFS.UNIT_VMIN : RFS.UNIT_VW;

		const variableSize = sprintf("%.8f%s", (remValDiff * 100) / this.breakpoint, variableUnit);

		return `min(calc(${minSize} ${val < 0 ? "-" : "+"} ${variableSize}), ${value})`;
	};
}

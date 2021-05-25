import { __ } from "@wordpress/i18n";

import { Fragment } from "@wordpress/element";

import { ReactComponent as PhonePortraitIcon } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as PhoneLandscapeIcon } from "bootstrap-icons/icons/phone-landscape.svg";
import { ReactComponent as TabletPortraitIcon } from "bootstrap-icons/icons/tablet.svg";
import { ReactComponent as TabletLandscapeIcon } from "bootstrap-icons/icons/tablet-landscape.svg";
import { ReactComponent as LaptopIcon } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as DesktopIcon } from "bootstrap-icons/icons/tv.svg";

const BootstrapIconWrapper = ({ alt = "", icon }) => {
	return (
		<Fragment>
			<span className="bi" title={alt} aria-hidden={true}>
				{icon}
			</span>
			{alt && <span className="sr-only">{alt}</span>}
		</Fragment>
	);
};

export default BootstrapIconWrapper;

export const XSIcon = ({ alt = __("Extra-small viewports, 0px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<PhonePortraitIcon />} />;
};
export const SMIcon = ({ alt = __("Small viewports, 576px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<PhoneLandscapeIcon />} />;
};
export const MDIcon = ({ alt = __("Medium viewports, 768px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<TabletPortraitIcon />} />;
};
export const LGIcon = ({ alt = __("Large viewports, 992px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<TabletLandscapeIcon />} />;
};
export const XLIcon = ({ alt = __("Extra-large viewports, 1200px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<LaptopIcon />} />;
};
export const XXLIcon = ({ alt = __("Extra-extra-large viewports, 1440px wide and up.", "gutestrap") }) => {
	return <BootstrapIconWrapper alt={alt} icon={<DesktopIcon />} />;
};

import classNames from "classnames";

const { __ } = wp.i18n;
const { TabPanel } = wp.components;

import PhonePortraitIcon from "bootstrap-icons/icons/phone.svg";
import PhoneLandscapeIcon from "bootstrap-icons/icons/phone-landscape.svg";
import TabletPortraitIcon from "bootstrap-icons/icons/tablet.svg";
import TabletLandscapeIcon from "bootstrap-icons/icons/tablet-landscape.svg";
import LaptopIcon from "bootstrap-icons/icons/laptop.svg";
import DesktopSmallIcon from "bootstrap-icons/icons/display.svg";
import DesktopLargeIcon from "bootstrap-icons/icons/tv.svg";

const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

export const ResponsiveTabs = ({ className, initialBreakpoint = "md", children, hasNotification = () => false }) => {
	let haveNotifications = breakpoints.filter(hasNotification);
	haveNotifications =
		Array.isArray(haveNotifications) && haveNotifications.filter((value) => breakpoints.includes(value));
	if (haveNotifications.length === 0) {
		haveNotifications = false;
	}

	const iconAttributes = {
		viewBox: "0 0 16 16",
		width: null,
		height: null,
		style: { width: "1.5em", height: "1.5em" },
	};

	return (
		<TabPanel
			className={classNames("gutestrap-responsive-tabs", className)}
			initialTabName={initialBreakpoint}
			tabs={[
				{
					name: "xs",
					// title: <span>{__("Base", "gutestrap")}</span>,
					title: (
						<span>
							<PhonePortraitIcon {...iconAttributes} />
						</span>
					),
					label: __("Mobile", "gutestrap"),
					description: __("Settings for devices of all sizes.", "gutestrap"),
					breakpoint: "xs",
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xs"),
					}),
				},
				{
					name: "sm",
					title: (
						<span>
							<PhoneLandscapeIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("sm"),
					}),
					label: __("Mobile landscape", "gutestrap"),
					description: __("Settings for landscape mobile devices and larger. 576px wide and up.", "gutestrap"),
					breakpoint: "sm",
				},
				{
					name: "md",
					title: (
						<span>
							<TabletPortraitIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("md"),
					}),
					label: __("Tablet", "gutestrap"),
					description: __("Settings for tablets and larger devices. 768px wide and up.", "gutestrap"),
					breakpoint: "md",
				},
				{
					name: "lg",
					title: (
						<span>
							<TabletLandscapeIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("lg"),
					}),
					label: __("Tablet landscape", "gutestrap"),
					description: __("Settings for landscape tablets and larger devices. 992px wide and up.", "gutestrap"),
					breakpoint: "lg",
				},
				{
					name: "xl",
					title: (
						<span>
							<LaptopIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xl"),
					}),
					label: __("Laptop", "gutestrap"),
					description: __("Settings for laptops and larger devices. 1200px wide and up.", "gutestrap"),
					breakpoint: "xl",
				},
				{
					name: "xxl",
					title: (
						<span>
							<DesktopSmallIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xxl"),
					}),
					label: __("Compact desktop", "gutestrap"),
					description: __("Settings for compact desktop devices and larger. 1440px wide and up.", "gutestrap"),
					breakpoint: "xxl",
				},
				{
					name: "xxxl",
					title: (
						<span>
							<DesktopLargeIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xxxl"),
					}),
					label: __("Desktop", "gutestrap"),
					description: __("Settings for large desktop devices and larger. 1680px wide and up.", "gutestrap"),
					breakpoint: "xxxl",
				},
			]}
		>
			{children}
		</TabPanel>
	);
};

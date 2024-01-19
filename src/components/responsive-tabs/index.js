import classNames from "classnames";

import { __ } from "@wordpress/i18n";
import { TabPanel } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

import { useExternalContext } from "../hooks";

import PhonePortraitIcon from "bootstrap-icons/icons/phone.svg";
import PhoneLandscapeIcon from "bootstrap-icons/icons/phone-landscape.svg";
import TabletPortraitIcon from "bootstrap-icons/icons/tablet.svg";
import TabletLandscapeIcon from "bootstrap-icons/icons/tablet-landscape.svg";
import LaptopIcon from "bootstrap-icons/icons/laptop.svg";
import DesktopSmallIcon from "bootstrap-icons/icons/display.svg";
import DesktopLargeIcon from "bootstrap-icons/icons/tv.svg";

const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

export const getBreakpointLabel = (bp) => {
	switch (bp) {
		case "xs":
			return __("Mobile", "gutestrap");
		case "sm":
			return __("Mobile landscape", "gutestrap");
		case "md":
			return __("Tablet", "gutestrap");
		case "lg":
			return __("Tablet landscape", "gutestrap");
		case "xl":
			return __("Laptop", "gutestrap");
		case "xxl":
			return __("Compact desktop", "gutestrap");
		case "xxxl":
			return __("Desktop", "gutestrap");
	}
};

export const getBreakpointIcon = (bp, classes) => {
	switch (bp) {
		case "xs":
			return <PhonePortraitIcon className={classes} />;
		case "sm":
			return <PhoneLandscapeIcon className={classes} />;
		case "md":
			return <TabletPortraitIcon className={classes} />;
		case "lg":
			return <TabletLandscapeIcon className={classes} />;
		case "xl":
			return <LaptopIcon className={classes} />;
		case "xxl":
			return <DesktopSmallIcon className={classes} />;
		case "xxxl":
			return <DesktopLargeIcon className={classes} />;
	}
};

export const ResponsiveTabs = ({
	children,
	className,
	initialBreakpoint = "md",
	onBreakpointChange = () => {},
	hasNotification = () => false,
}) => {
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

	const [currentBreakpoint, updateCurrentBreakpoint] = useExternalContext(
		"gutestrap/responsiveBreakpoint",
		initialBreakpoint
	);

	useEffect(() => {
		onBreakpointChange(currentBreakpoint);
	}, [currentBreakpoint]);

	return (
		<TabPanel
			className={classNames("gutestrap-responsive-tabs", className)}
			initialTabName={currentBreakpoint}
			// initialTabName={initialBreakpoint}
			onSelect={(x) => updateCurrentBreakpoint(x)}
			tabs={[
				{
					name: "xs",
					// title: <span>{__("Base", "gutestrap")}</span>,
					title: (
						<span title={__("Mobile", "gutestrap")}>
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
						<span title={__("Mobile landscape", "gutestrap")}>
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
						<span title={__("Tablet", "gutestrap")}>
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
						<span title={__("Tablet landscape", "gutestrap")}>
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
						<span title={__("Laptop", "gutestrap")}>
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
						<span title={__("Compact desktop", "gutestrap")}>
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
						<span title={__("Desktop", "gutestrap")}>
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

import classNames from "classnames";

import { __ } from "@wordpress/i18n";
import { TabPanel, Dashicon } from "@wordpress/components";

import "./editor.scss";

const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];

export const ResponsiveTabs = ({ className, initialBreakpoint = "md", children, hasNotification = () => false }) => {
	let haveNotifications = breakpoints.filter(hasNotification);
	haveNotifications =
		Array.isArray(haveNotifications) && haveNotifications.filter((value) => breakpoints.includes(value));
	if (haveNotifications.length === 0) {
		haveNotifications = false;
	}
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
							<Dashicon icon="smartphone" />
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
							<Dashicon icon="smartphone" style={{ transform: "scale(-1, 1) rotate(90deg)" }} />
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
							<Dashicon icon="tablet" />
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
							<Dashicon icon="tablet" style={{ transform: "scale(-1, 1) rotate(90deg)" }} />
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
							<Dashicon icon="laptop" />
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
							<Dashicon icon="desktop" />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xxl"),
					}),
					label: __("Desktop", "gutestrap"),
					description: __("Settings for desktop devices and larger. 1200px wide and up.", "gutestrap"),
					breakpoint: "xxl",
				},
			]}
		>
			{children}
		</TabPanel>
	);
};

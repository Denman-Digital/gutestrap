import classNames from "classnames";

import { __ } from "@wordpress/i18n";
import { TabPanel, Dashicon } from "@wordpress/components";

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";

import "./editor.scss";

const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];

export const ResponsiveTabs = ({ className, children, hasNotification = () => false }) => {
	let haveNotifications = breakpoints.filter(hasNotification);
	haveNotifications =
		Array.isArray(haveNotifications) && haveNotifications.filter((value) => breakpoints.includes(value));
	if (haveNotifications.length === 0) {
		haveNotifications = false;
	}
	return (
		<TabPanel
			className={classNames("gutestrap-responsive-tabs", className)}
			tabs={[
				{
					name: "xs",
					title: <span>{__("Base", GUTESTRAP_TEXT_DOMAIN)}</span>,
					// title: <Dashicon icon="smartphone" />,
					// className: "has-icon-title",
					label: __("Base", GUTESTRAP_TEXT_DOMAIN),
					description: __("Settings for devices of all sizes.", GUTESTRAP_TEXT_DOMAIN),
					breakpoint: "xs",
					className: classNames({
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
					label: __("Mobile landscape", GUTESTRAP_TEXT_DOMAIN),
					description: __(
						"Settings for landscape mobile devices and larger. 576px wide and up.",
						GUTESTRAP_TEXT_DOMAIN
					),
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
					label: __("Tablet", GUTESTRAP_TEXT_DOMAIN),
					description: __("Settings for tablets and larger devices. 768px wide and up.", GUTESTRAP_TEXT_DOMAIN),
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
					label: __("Tablet landscape", GUTESTRAP_TEXT_DOMAIN),
					description: __(
						"Settings for landscape tablets and larger devices. 992px wide and up.",
						GUTESTRAP_TEXT_DOMAIN
					),
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
					label: __("Laptop", GUTESTRAP_TEXT_DOMAIN),
					description: __("Settings for laptops and larger devices. 1200px wide and up.", GUTESTRAP_TEXT_DOMAIN),
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
					label: __("Desktop", GUTESTRAP_TEXT_DOMAIN),
					description: __("Settings for desktop devices and larger. 1200px wide and up.", GUTESTRAP_TEXT_DOMAIN),
					breakpoint: "xxl",
				},
			]}
		>
			{children}
		</TabPanel>
	);
};

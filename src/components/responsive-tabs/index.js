import classNames from "classnames";

import { __ } from "@wordpress/i18n";
// import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import {
	TabPanel,
	// ToolbarGroup, ToolbarButton
} from "@wordpress/components";
// import { Fragment, useState, useEffect, useContext, createContext } from "@wordpress/element";

// import { useExternalContext } from "../hooks";
import { BOOTSTRAP_ICON_CLASSES } from "../../_common";

import PhonePortraitIcon from "./device-phone.svg";
import PhoneLandscapeIcon from "./device-phone-landscape.svg";
import TabletPortraitIcon from "./device-tablet.svg";
import TabletLandscapeIcon from "./device-tablet-landscape.svg";
// import TabletHybridIcon from "./device-tablet-hybrid.svg";
import CompactLaptopIcon from "./device-compact-laptop.svg";
import LaptopIcon from "./device-laptop.svg";
import DesktopIcon from "./device-display.svg";

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
			return __("Compact laptop", "gutestrap");
		case "xxl":
			return __("Laptop", "gutestrap");
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
			return <CompactLaptopIcon className={classes} />;
		case "xxl":
			return <LaptopIcon className={classes} />;
		case "xxxl":
			return <DesktopIcon className={classes} />;
	}
};

// export const LinkedBreakpointContext = createContext("md");

export let commonBreakpoint = "md";

export const BLOCK_CONTROL_BREAKPOINTS = {
	xs: {
		name: "xs",
		icon: <PhonePortraitIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("All devices", "gutestrap"),
	},
	sm: {
		name: "sm",
		icon: <PhoneLandscapeIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Landscape phones and larger", "gutestrap"),
	},
	md: {
		name: "md",
		icon: <TabletPortraitIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Tablets and larger", "gutestrap"),
	},
	lg: {
		name: "lg",
		icon: <TabletLandscapeIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Landscape tablets and larger", "gutestrap"),
	},
	xl: {
		name: "xl",
		icon: <CompactLaptopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Compact laptops and larger", "gutestrap"),
	},
	xxl: {
		name: "xxl",
		icon: <LaptopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Laptops and larger", "gutestrap"),
	},
	xxxl: {
		name: "xxxl",
		icon: <DesktopIcon className={BOOTSTRAP_ICON_CLASSES} />,
		title: __("Desktops and larger", "gutestrap"),
	},
};

export const BreakpointTabs = ({
	children,
	className,
	// initialBreakpoint = commonBreakpoint,
	// onBreakpointChange = () => {},
	hasNotification = () => false,
}) => {
	// const linkedBreakpoint = useContext(LinkedBreakpointContext);

	let haveNotifications = breakpoints.filter(hasNotification);
	haveNotifications =
		Array.isArray(haveNotifications) &&
		haveNotifications.filter((currentBreakpoint) => breakpoints.includes(currentBreakpoint));
	if (haveNotifications.length === 0) {
		haveNotifications = false;
	}

	const iconAttributes = {
		viewBox: "0 0 16 16",
		width: "1.5em",
		height: "1.5em",
		// style: { width: "1.5em", height: "1.5em" },
	};

	// const [currentBreakpoint, updateCurrentBreakpoint] = useExternalContext(
	// 	"gutestrap/responsiveBreakpoint",
	// 	initialBreakpoint
	// );

	// useEffect(() => {
	// 	onBreakpointChange(currentBreakpoint);
	// }, [currentBreakpoint]);

	return (
		<TabPanel
			className={classNames("gutestrap-responsive-tabs", className)}
			initialTabName={commonBreakpoint}
			// initialTabName={initialBreakpoint}
			// onSelect={(x) => updateCurrentBreakpoint(x)}
			onSelect={(x) => (commonBreakpoint = x)}
			tabs={[
				{
					name: "xs",
					// title: <span>{__("Base", "gutestrap")}</span>,
					title: (
						<span title={__("Mobile", "gutestrap")}>
							<PhonePortraitIcon {...iconAttributes} />
						</span>
					),
					label: __("Mobile (base settings)", "gutestrap"),
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
					label: __("Mobile landscape (576px and up)", "gutestrap"),
					// description: __("Settings for landscape mobile devices and larger. 576px wide and up.", "gutestrap"),
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
					label: __("Tablet (768px and up)", "gutestrap"),
					// description: __("Settings for tablets and larger devices. 768px wide and up.", "gutestrap"),
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
					label: __("Tablet landscape (992px and up)", "gutestrap"),
					// description: __("Settings for landscape tablets and larger devices. 992px wide and up.", "gutestrap"),
					breakpoint: "lg",
				},
				{
					name: "xl",
					title: (
						<span title={__("Compact laptop", "gutestrap")}>
							<CompactLaptopIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xl"),
					}),
					label: __("Compact laptop (1200px and up)", "gutestrap"),
					// description: __("Settings for compact laptops and larger devices. 1200px wide and up.", "gutestrap"),
					breakpoint: "xl",
				},
				{
					name: "xxl",
					title: (
						<span title={__("Laptop", "gutestrap")}>
							<LaptopIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xxl"),
					}),
					label: __("Laptop (1440px and up)", "gutestrap"),
					// description: __("Settings for laptops and larger devices. 1440px wide and up.", "gutestrap"),
					breakpoint: "xxl",
				},
				{
					name: "xxxl",
					title: (
						<span title={__("Desktop", "gutestrap")}>
							<DesktopIcon {...iconAttributes} />
						</span>
					),
					className: classNames("has-icon-title", {
						"has-notification": haveNotifications && haveNotifications.includes("xxxl"),
					}),
					label: __("Desktop (1680px and up)", "gutestrap"),
					// description: __("Settings for desktop devices and larger. 1680px wide and up.", "gutestrap"),
					breakpoint: "xxxl",
				},
			]}
		>
			{children}
		</TabPanel>
	);
};

// export const BreakpointBlockControls = ({
// 	children,
// 	className,
// 	// initialBreakpoint = "md",
// 	onBreakpointChange = () => {},
// 	// currentBreakpoint,
// 	// onChange,
// 	isCollapsed = true,
// }) => {
// 	const [_refresh, _setRefresh] = useState(0);
// 	const refresh = () => _setRefresh(_refresh + 1);

// 	// function applyOrUnset(align) {
// 	// 	return () => onChange(value === align ? undefined : align);
// 	// }

// 	// const [currentBreakpoint, updateCurrentBreakpoint] = useExternalContext(
// 	// 	"gutestrap/responsiveBreakpoint",
// 	// 	initialBreakpoint
// 	// );

// 	// useEffect(() => {
// 	// 	console.log("current bp useEffect");
// 	// 	onBreakpointChange(currentBreakpoint);
// 	// }, [currentBreakpoint]);

// 	// console.log(currentBreakpoint, value);

// 	// const activeAlignment = BLOCK_CONTROL_BREAKPOINTS[currentBreakpoint];
// 	const activeBreakpoint = BLOCK_CONTROL_BREAKPOINTS[commonBreakpoint];
// 	return (
// 		<Fragment>
// 			{children}
// 			<ToolbarGroup
// 				className={classNames(className, "gutestrap-breakpoint-block-controls")}
// 				// popoverProps={{
// 				// 	isAlternate: true,

// 				// }}
// 				isCollapsed={isCollapsed}
// 				icon={activeBreakpoint.icon}
// 				label={__("Switch breakpoint settings", "gutestrap")}
// 				controls={breakpoints.map((bp) => {
// 					const { icon, title } = BLOCK_CONTROL_BREAKPOINTS[bp];
// 					return {
// 						icon,
// 						title,
// 						// isActive: currentBreakpoint === bp,
// 						isActive: commonBreakpoint === bp,
// 						role: isCollapsed ? "menuitemradio" : undefined,
// 						onClick: () => {
// 							if (breakpoints.includes(bp)) {
// 								commonBreakpoint = bp;
// 								onBreakpointChange(commonBreakpoint);
// 							}
// 							refresh();
// 						},
// 					};
// 				})}
// 			/>
// 			{/* <ToolbarGroup>
// 				<ToolbarButton
// 					showTooltip={true}
// 					// label={sprintf(__("Editing %s layout", "gutestrap"), getBreakpointLabel(currentBreakpoint))}
// 					isPressed={false}
// 					// icon={() => getBreakpointIcon(currentBreakpoint, BOOTSTRAP_ICON_CLASSES)}
// 				/>
// 			</ToolbarGroup> */}
// 		</Fragment>
// 	);
// };

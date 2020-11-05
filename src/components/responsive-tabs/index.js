import { GUTESTRAP_TEXT_DOMAIN } from "../../const";

import classNames from "classnames";
import { sprintf } from "sprintf-js";

import { __, _n } from "@wordpress/i18n";

import { Fragment, useMemo } from "@wordpress/element";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody, Panel, PanelRow, SelectControl, TabPanel } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";

import { Icon } from "../fontawesome-icons";

import "./editor.scss";

export const ResponsiveTabs = ({ className, children }) => {
	return (
		<TabPanel
			className={classNames("gutestrap-responsive-tabs", className)}
			tabs={[
				{
					name: "sm",
					title: __("Base", GUTESTRAP_TEXT_DOMAIN),
					className: "",
					breakpoint: "sm",
				},
				{
					name: "xs",
					title: <Icon style="regular" icon="mobile" alt={__("Extra-small", GUTESTRAP_TEXT_DOMAIN)} size="lg" />,
					className: "has-icon-title",
					breakpoint: "xs",
				},
				{
					name: "md",
					title: <Icon style="regular" icon="tablet" alt={__("Medium", GUTESTRAP_TEXT_DOMAIN)} size="lg" />,
					className: "has-icon-title",
					breakpoint: "md",
				},
				{
					name: "lg",
					title: <Icon style="regular" icon="laptop" alt={__("Large", GUTESTRAP_TEXT_DOMAIN)} size="lg" />,
					className: "has-icon-title",
					breakpoint: "lg",
				},
				{
					name: "xl",
					title: <Icon style="regular" icon="desktop" alt={__("Extra-large", GUTESTRAP_TEXT_DOMAIN)} size="lg" />,
					className: "has-icon-title",
					breakpoint: "xl",
				},
			]}
		>
			{children}
		</TabPanel>
	);
};

import { __ } from "@wordpress/i18n";
import { ContainerEdit as edit } from "./edit";
import { ContainerRender as save, deprecated } from "./render";
import icon from "bootstrap-icons/icons/view-list.svg";

/** Block name. */
export const name = "gutestrap/container";

/** Block title. */
export const title = __("Container", "gutestrap");

/** Block attributes. */
export const attributes = {
	fluid: { type: "boolean" },
	breakpoint: { type: "string" },
	disabled: { type: "boolean" },
	background: { type: "object" },
};

/** Block Description. */
export const description = __(
	"Containers are used to contain, pad, and (sometimes) center the content within them",
	"gutestrap"
);

/** Supported WordPress/Gutenberg features. */
export const supports = {
	anchor: true,
	alignWide: false,
	color: {
		gradients: true,
		background: true,
		text: true,
	},
};

export { icon, edit, save };

export default {
	name,
	settings: { title, icon, attributes, description, supports, edit, save, deprecated },
};

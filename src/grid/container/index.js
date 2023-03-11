import { name, title, description, attributes, supports } from "./metadata";

import { ContainerEdit as edit } from "./edit";
import { ContainerRender as save, deprecated } from "./render";
import icon from "bootstrap-icons/icons/view-list.svg";

export { icon, edit, save };

export default {
	name,
	settings: { title, icon, attributes, description, supports, edit, save, deprecated },
};

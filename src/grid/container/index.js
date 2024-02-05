import { ContainerEdit as edit } from "./edit";
import { ContainerRender as save, deprecated } from "./render";
import icon from "bootstrap-icons/icons/view-list.svg";
import metadata from "./block.json";

// eslint-disable-next-line no-unused-vars
const { name, icon: _icon, ...meta } = metadata;

export { name, edit, save, deprecated, icon };
export default { name, edit, save, deprecated, icon, ...meta };

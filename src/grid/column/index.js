import { ColumnEdit as edit } from "./edit";
import { ColumnRender as save, deprecated } from "./render";
import icon from "./icon.svg";
import metadata from "./block.json";

const { name } = metadata;

export { name, icon, edit, save, deprecated };
export default { name, icon, edit, save, deprecated };

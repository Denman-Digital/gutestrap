const { __ } = wp.i18n;
const { BlockControls, Inserter } = wp.blockEditor;
const { ToolbarGroup, Tooltip, ToolbarButton } = wp.components;
import { BOOTSTRAP_ICON_CLASSES } from "../_common";
import AddBlockIcon from "./plus-square.svg";

export function BlockControlsBlockAppender({ rootClientId, label, className, icon }) {
	return (
		<Inserter
			rootClientId={rootClientId}
			isAppender
			__experimentalIsQuick
			renderToggle={({ onToggle, disabled }) => (
				<BlockControls>
					<ToolbarGroup>
						<Tooltip text={label || __("Add a block", "gutestrap")}>
							<ToolbarButton className={className} onClick={onToggle} disabled={disabled}>
								{icon || <AddBlockIcon className={BOOTSTRAP_ICON_CLASSES} />}
							</ToolbarButton>
						</Tooltip>
					</ToolbarGroup>
				</BlockControls>
			)}
		/>
	);
}

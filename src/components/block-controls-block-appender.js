import { GUTESTRAP_TEXT_DOMAIN } from "../const";

const { __ } = wp.i18n;
const { BlockControls, Inserter } = wp.blockEditor;
const { Toolbar, Tooltip, ToolbarButton } = wp.components;
import { BOOTSTRAP_ICON_CLASSES } from "./alignment/flex-items-alignment";
import { ReactComponent as AddBlockIcon } from "bootstrap-icons/icons/plus-square.svg";

export function BlockControlsBlockAppender({ rootClientId, label, className, icon }) {
	return (
		<Inserter
			rootClientId={rootClientId}
			isAppender
			__experimentalIsQuick
			renderToggle={({ onToggle, disabled }) => (
				<BlockControls>
					<Toolbar>
						<Tooltip text={label || __("Add a block", GUTESTRAP_TEXT_DOMAIN)}>
							<ToolbarButton className={className} onClick={onToggle} disabled={disabled}>
								{icon || <AddBlockIcon className={BOOTSTRAP_ICON_CLASSES} />}
							</ToolbarButton>
						</Tooltip>
					</Toolbar>
				</BlockControls>
			)}
		/>
	);
}

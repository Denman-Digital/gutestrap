/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import classNames from "classnames";
import BreakIcon from "./break-icon.svg";
import metadata from "./block.json";

// eslint-disable-next-line no-unused-vars
const { name, icon: _icon, ...meta } = metadata;

const save = (props) => {
	// eslint-disable-next-line no-unused-vars
	const { attributes, className } = props;
	const blockProps = useBlockProps.save({
		className: classNames(className, "w-100"),
	});

	return <div aria-hidden="true" {...blockProps} />;
};

const edit = (props) => {
	const { attributes, className } = props;

	if (attributes._isExample) {
		return (
			<div>
				<InnerBlocks />
			</div>
		);
	}

	const blockProps = useBlockProps({
		className: classNames(className, "w-100"),
	});

	return (
		<div aria-hidden="true" {...blockProps}>
			<BreakIcon width="24" height="24" className="bi bi-row-break-icon" />
		</div>
	);
};

export { name, edit, save, BreakIcon as icon };

export default { name, edit, save, icon: BreakIcon, ...meta };

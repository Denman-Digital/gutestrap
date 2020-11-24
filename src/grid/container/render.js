import classNames from "classnames";
import { InnerBlocks } from "@wordpress/block-editor";

export const ContainerRender = ({ attributes, className }) => {
	const { breakpoint } = attributes;
	return (
		<div className={classNames(className, `container${breakpoint ? "-" + breakpoint : ""}`)}>
			<InnerBlocks.Content />
		</div>
	);
};

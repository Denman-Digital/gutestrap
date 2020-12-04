import classNames from "classnames";
const { InnerBlocks, getColorClassName } = wp.blockEditor;

export const ContainerRender = ({ attributes, className }) => {
	const { breakpoint, background, textColor, backgroundColor } = attributes;
	const style = background?.image?.url
		? {
				backgroundImage: `url(${background.image.url})`,
				backgroundPosition: background?.position || "center",
				backgroundSize: background?.size || "cover",
				backgroundRepeat: background?.repeat ? "repeat" : "no-repeat",
		  }
		: null;
	return (
		<div
			className={classNames(className, {
				[getColorClassName("color", textColor)]: textColor,
				[getColorClassName("background-color", backgroundColor)]: backgroundColor,
			})}
			style={style}
		>
			<div className={`container${breakpoint ? "-" + breakpoint : ""}`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

const v1 = {
	attributes: {
		fluid: { type: "boolean" },
		breakpoint: { type: "string" },
		disabled: { type: "boolean" },
	},
	save: ({ attributes, className }) => {
		const { breakpoint } = attributes;
		return (
			<div className={classNames(className, `container${breakpoint ? "-" + breakpoint : ""}`)}>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export const deprecated = [v1];

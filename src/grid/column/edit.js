/**
 * BLOCK: gutestrap
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { GUTESTRAP_TEXT_DOMAIN } from "../../const";
import {
	ColumnWidthOffsetControl,
	COLUMN_OPTION_INHERIT,
	COLUMN_OPTION_WIDTH_DEFAULT,
} from "./column-width-offset-control";

import classNames from "classnames";

import { __ } from "@wordpress/i18n";

import { Fragment } from "@wordpress/element";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";

import { ResponsiveTabs } from "../../components/responsive-tabs";
import { columnClassName } from "./render";

// const optionsXS =
/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
 *
 * @param {Object} props Props.
 * @returns {Mixed} JSX Component.
 */
export const ColumnEdit = ({ attributes, className, setAttributes }) => {
	attributes.width = attributes.width || {};
	attributes.offset = attributes.offset || {};
	return (
		<Fragment>
			<InspectorControls>
				{/* <PanelBody title={__("Responsive Width & Offset", GUTESTRAP_TEXT_DOMAIN)}>
					<p>
						{__(
							"Bootstrap rows and columns are based on a 12-column grid. Each column can span and be offset by a number of the available columns, wrapping as needed.",
							GUTESTRAP_TEXT_DOMAIN
						)}
					</p> */}
				<pre>{JSON.stringify(attributes, null, 2)}</pre>

				<ResponsiveTabs>
					{(tab) => {
						console.log(tab);
						const { title, breakpoint } = tab;
						const fallbacks = {
							width: ["xs", "sm"].includes(breakpoint) ? COLUMN_OPTION_WIDTH_DEFAULT : COLUMN_OPTION_INHERIT,
							offset: ["xs", "sm"].includes(breakpoint) ? 0 : COLUMN_OPTION_INHERIT,
						};
						return (
							<div>
								<ColumnWidthOffsetControl
									label={title}
									value={{
										width: attributes.width[breakpoint] != null ? attributes.width[breakpoint] : fallbacks.width,
										offset: attributes.offset[breakpoint] != null ? attributes.offset[breakpoint] : fallbacks.offset,
									}}
									onChange={({ width, offset }) => {
										const { [breakpoint]: _w, ...widths } = attributes.width;
										const { [breakpoint]: _o, ...offsets } = attributes.offset;
										setAttributes({
											width: { [breakpoint]: width, ...widths },
											offset: { [breakpoint]: offset, ...offsets },
										});
									}}
									canInherit={breakpoint !== "xs"}
								/>
							</div>
						);
					}}
				</ResponsiveTabs>
				{/* </PanelBody> */}
			</InspectorControls>
			<div className={className}>
				<InnerBlocks />
			</div>
		</Fragment>
	);
};

const gutestrapBlockListBlockClasses = createHigherOrderComponent((BlockListBlock) => {
	return ({ className, ...props }) => {
		const { attributes, block } = props;
		switch (block.name) {
			case "gutestrap/col":
				// console.log(`${block.name}:`, props);
				className = classNames(className, columnClassName(attributes));
				break;
		}
		return <BlockListBlock {...props} className={className} />;
	};
}, "withBlockListBlockClasses");

wp.hooks.addFilter("editor.BlockListBlock", "gutestrap/with-block-list-block-classes", gutestrapBlockListBlockClasses);

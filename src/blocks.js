/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import "./grid/";

// const { registerPlugin } = wp.plugins;
// const { PluginDocumentSettingPanel } = wp.editPost;

// import { Button, Modal, Flex, FlexItem } from "@wordpress/components";
// import { useState, Fragment } from "@wordpress/element";

// const MyModal = () => {
// 	const [isOpen, setOpen] = useState(false);
// 	const openModal = () => setOpen(true);
// 	const closeModal = () => setOpen(false);

// 	return (
// 		<Fragment>
// 			<Button isSecondary onClick={openModal}>
// 				Open Modal
// 			</Button>
// 			{isOpen && (
// 				<Modal title="This is my modal" onRequestClose={closeModal}>
// 					<Flex justify="flex-end">
// 						<FlexItem>
// 							<Button isPrimary onClick={closeModal}>
// 								Save changes
// 							</Button>
// 						</FlexItem>
// 						<FlexItem>
// 							<Button isSecondary isDestructive onClick={closeModal}>
// 								Discard
// 							</Button>
// 						</FlexItem>
// 					</Flex>
// 				</Modal>
// 			)}
// 		</Fragment>
// 	);
// };
// const PluginDocumentSettingPanelDemo = () => (
// 	<PluginDocumentSettingPanel name="advanced-document-panel" title="Advanced" className="advanced-document-panel">
// 		Custom Panel Contents
// 		<MyModal />
// 	</PluginDocumentSettingPanel>
// );
// registerPlugin("plugin-document-setting-panel-demo", {
// 	render: PluginDocumentSettingPanelDemo,
// 	icon: "",
// });

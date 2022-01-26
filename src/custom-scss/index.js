const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useState } = wp.element;
const { Button, Modal, Flex, FlexItem } = wp.components;
// const { initialize: initializeCodeMirror } = wp.codeEditor;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;

import { CustomScssEditor } from "./block";

const AdvancedDocumentSettingPanel = () => {
	const postType = useSelect((select) => select("core/editor").getCurrentPostType(), []);
	if (postType === "wp_block") {
		// Re-usable blocks -> abort!
		return null;
	}
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const [meta, setMeta] = useEntityProp("postType", postType, "meta");

	function updateCustomScss(value) {
		// eslint-disable-next-line camelcase
		setMeta({ ...meta, _custom_scss: value });
	}
	const [scss, setScss] = useState(meta._custom_scss);

	return (
		<PluginDocumentSettingPanel name="advanced-document-panel" title="Advanced" className="advanced-document-panel">
			<Button isSecondary onClick={openModal}>
				Add Custom Styles
			</Button>
			{isModalOpen && (
				<Modal title="Post Custom SCSS" onRequestClose={closeModal}>
					<CustomScssEditor value={scss} onChange={setScss} />
					<Flex justify="flex-end">
						<FlexItem>
							<Button
								isPrimary
								onClick={() => {
									updateCustomScss(scss);
									closeModal();
								}}
							>
								Save changes
							</Button>
						</FlexItem>
						<FlexItem>
							<Button isSecondary isDestructive onClick={closeModal}>
								Discard
							</Button>
						</FlexItem>
					</Flex>
				</Modal>
			)}
		</PluginDocumentSettingPanel>
	);
};

registerPlugin("gutestrap-advanced-document-panel", {
	render: AdvancedDocumentSettingPanel,
	icon: "",
});

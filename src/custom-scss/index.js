const { registerPlugin } = wp.plugins;
const { useState } = wp.element;
const { Button, Modal, Flex, FlexItem } = wp.components;
// const { initialize: initializeCodeMirror } = wp.codeEditor;
const { InnerBlocks } = wp.blockEditor;

const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;

import { CustomScssEditor } from "./block";

const NOOP_JSX = () => <InnerBlocks />;

const PluginDocumentSettingPanel = wp.editPost?.PluginDocumentSettingPanel || NOOP_JSX;

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

	if (!meta) {
		// No meta (widget block?) -> abort!
		return null;
	}

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

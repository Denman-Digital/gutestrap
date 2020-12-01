const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useState, useRef, useEffect } = wp.element;
const { Button, Modal, Flex, FlexItem } = wp.components;
const { initialize: initializeCodeMirror } = wp.codeEditor;
const { useSelect } = wp.data;
const { useEntityProp } = wp.coreData;

const CustomScssEditor = ({ value: valueProp, onChange = () => {} }) => {
	const scssInput = useRef();
	const scssEditor = useRef();

	useEffect(() => {
		scssEditor.current = initializeCodeMirror(scssInput.current, gutestrapCodeMirrorSettings);
		const { codemirror } = scssEditor.current;
		setTimeout(function () {
			codemirror.refresh();
		}, 1);
	}, []);

	useEffect(() => {
		const { codemirror } = scssEditor.current;
		const listener = () => {
			onChange(codemirror.getValue());
		};
		codemirror.on("change", listener);
		return () => codemirror.off("change", listener);
	}, [onChange]);

	return <textarea ref={scssInput} cols="80" rows="20" value={valueProp} />;
};

const AdvancedDocumentSettingPanel = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const postType = useSelect((select) => select("core/editor").getCurrentPostType(), []);
	const [meta, setMeta] = useEntityProp("postType", postType, "meta");

	// const { _custom_scss: customScss, _custom_css: customCSS } = meta;
	function updateCustomScss(value) {
		// eslint-disable-next-line camelcase
		setMeta({ ...meta, _custom_scss: value });
	}
	const [scss, setScss] = useState(meta._custom_scss);

	return (
		<PluginDocumentSettingPanel name="advanced-document-panel" title="Advanced" className="advanced-document-panel">
			Custom Panel Contents
			<pre>{JSON.stringify(meta, null, 2)}</pre>
			<Button isSecondary onClick={openModal}>
				Open Modal
			</Button>
			{isModalOpen && (
				<Modal title="This is my modal" onRequestClose={closeModal}>
					<CustomScssEditor
						value={scss}
						onChange={(value) => {
							setScss(value);
						}}
					/>
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

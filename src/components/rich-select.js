/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { Button, Dropdown, NavigableMenu, BaseControl, useBaseControlProps } from "@wordpress/components";

function mergeProps(defaultProps = {}, props = {}) {
	const mergedProps = {
		...defaultProps,
		...props,
	};

	if (props.className && defaultProps.className) {
		mergedProps.className = classnames(props.className, defaultProps.className);
	}

	return mergedProps;
}

/**
 * @typedef {Object} RichSelectNavigableMenuProps
 * @prop {?boolean} cycle whether or not to cycle from the end back to the beginning and vice versa
 * @prop {?(event: KeyboardEvent) => void} onKeyDown callback invoked on the keydown event
 * @prop {?(index: number, focusable: HTMLElement) => void} onNavigate callback invoked when the menu navigates to one of its children passing the index and child as an argument
 * @prop {?'vertical'|'horizontal'|'both'} orientation
 */

/**
 * @typedef {Object} RichSelectCallbackProps
 * @prop {boolean} isOpen
 * @prop {() => void} onToggle
 * @prop {() => void} onClose
 */

/**
 * @typedef {Object} RichSelectOption
 * @prop {?*} value
 * @prop {?string} label
 * @prop {?*} icon
 * @prop {?boolean} isDisabled
 * @prop {?boolean} isHidden
 * @prop {?boolean} isSelected
 */

/**
 * @typedef {Object} RichSelectProps
 * @prop {?(callbackProps: RichSelectCallbackProps) => ReactNode} children
 * @prop {?string} className
 * @prop {?RichSelectOption[]|RichSelectOption[][]} options
 * @prop {?*} icon
 * @prop {string} label
 * @prop {?PopoverProps} popoverProps
 * @prop {?ToggleProps} toggleProps
 * @prop {?RichSelectNavigableMenuProps} menuProps
 * @prop {?boolean} disableOpenOnArrowDown
 * @prop {?string} text
 * @prop {?boolean} noIcons
 * @prop {?boolean} open
 * @prop {?boolean} defaultOpen
 * @prop {?(willOpen: boolean) => void} onToggle
 * @prop {?(value: ?*, option: RichSelectOption) => void} onChange
 */

/**
 * @param {RichSelectProps} props Props
 * @param {React.ForwardedRef} ref reference
 * @returns {Mixed} JSX Component.
 */
function RichSelect(props, ref) {
	const {
		help,
		className,
		label,
		popoverProps,
		toggleProps,
		menuProps,
		disableOpenOnArrowDown = false,
		text,
		noIcons,
		open,
		defaultOpen,
		placeholder: placeholderProp,
		disabled = false,
		id: idProp,
		onChange,
		options = [],
		value: valueProp,

		onToggle: onToggleProp,
	} = props;

	let { icon } = props;

	const { baseControlProps, controlProps } = useBaseControlProps({ id: idProp, label, help });

	if (!options?.length) {
		return null;
	}

	// Normalize options to nested array of objects (sets of options)
	/** @type {RichSelectOption[][]} */
	let optionSets;
	if (options?.length) {
		// @ts-expect-error The check below is needed because `DropdownMenus`
		// rendered by `ToolBarGroup` receive options as a nested array.
		optionSets = options;
		if (!Array.isArray(optionSets[0])) {
			// This is not ideal, but at this point we know that `options` is
			// not a nested array, even if TypeScript doesn't.
			optionSets = [options];
		}
	}

	const mergedPopoverProps = mergeProps({ className: "components-dropdown-menu__popover" }, popoverProps);

	return (
		<BaseControl {...baseControlProps}>
			<div
				className="rich-select-input-wrapper"
				style={{
					alignItems: "center",
					boxSizing: "border-box",
					borderRadius: "inherit",
					display: "flex",
					flex: 1,
					position: "relative",
				}}
			>
				<Dropdown
					className={className}
					popoverProps={mergedPopoverProps}
					renderToggle={({ isOpen, onToggle }) => {
						const openOnArrowDown = (event) => {
							if (disableOpenOnArrowDown) {
								return;
							}

							if (!isOpen && event.code === "ArrowDown") {
								event.preventDefault();
								onToggle();
							}
						};
						const { as: Toggle = Button, ...restToggleProps } = toggleProps ?? {};

						const mergedToggleProps = mergeProps(
							{
								className: classnames("components-dropdown-menu__toggle components-rich-select__toggle", {
									"is-opened": isOpen,
								}),
								id: controlProps.id,
							},
							restToggleProps
						);
						const helpId = help ? `${baseControlProps.id}__help` : null;

						const activeOption = optionSets
							.flat()
							.find((option) => (valueProp != null ? option.value === valueProp : option.isSelected));

						return (
							<Toggle
								{...mergedToggleProps}
								icon={activeOption?.icon || icon}
								onClick={(event) => {
									onToggle();
									if (mergedToggleProps.onClick) {
										mergedToggleProps.onClick(event);
									}
								}}
								onKeyDown={(event) => {
									openOnArrowDown(event);
									if (mergedToggleProps.onKeyDown) {
										mergedToggleProps.onKeyDown(event);
									}
								}}
								aria-haspopup="true"
								aria-expanded={isOpen}
								label={label}
								text={text}
								showTooltip={toggleProps?.showTooltip ?? true}
								aria-describedby={helpId}
								disabled={disabled}
							>
								{activeOption?.label || (
									<span className="components-rich-select__placeholder">
										{placeholderProp || mergedToggleProps.children}
									</span>
								)}
							</Toggle>
						);
					}}
					renderContent={(renderContentProps) => {
						const mergedMenuProps = mergeProps(
							{
								"aria-label": label,
								className: classnames("components-dropdown-menu__menu components-rich-select__menu", {
									"no-icons": noIcons,
								}),
							},
							menuProps
						);

						return (
							<NavigableMenu {...mergedMenuProps} role="menu">
								{optionSets?.flatMap((optionSet, indexOfSet) =>
									optionSet.map((option, indexOfOption) => {
										return (
											<Button
												key={[indexOfSet, indexOfOption].join()}
												onClick={(event) => {
													event.stopPropagation();
													renderContentProps.onClose();
													onChange?.(option.value, option);
												}}
												className={classnames("components-dropdown-menu__menu-item components-rich-select__menu-item", {
													"has-separator": indexOfSet > 0 && indexOfOption === 0,
													"is-active": option.value === valueProp,
													"is-icon-only": !option.label,
												})}
												icon={!noIcons && option.icon}
												label={option.label}
												aria-checked={option.value === valueProp}
												role="menuitemradio"
												disabled={option.isDisabled}
												hidden={option.isHidden}
											>
												{option.label}
											</Button>
										);
									})
								)}
							</NavigableMenu>
						);
					}}
					open={open}
					defaultOpen={defaultOpen}
					onToggle={onToggleProp}
				/>
			</div>
		</BaseControl>
	);
}

export { RichSelect };

export default RichSelect;

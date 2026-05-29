import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { BaseComponent } from '../../interfaces/base-component';
import { Instance, Props } from 'tippy.js';
import { SelectLabelConfig, SelectLocaleInterface, SelectSize, SelectTypes, SelectValue } from '../wpp-select/types';
import { AriaProps, DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { ListItemChangeEventDetail, ListValue } from '../wpp-list-item/types';
import { InputChangeEventDetail, InputTypes, MaskOptions, WppInputCustomEvent, WppListItemCustomEvent } from '../../components';
import { ListItemInterface, SelectChangeEventDetails } from './types';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { InlineMessage } from '../../interfaces/inline-message';
/**
 * @slot icon-start - can contain an icon that will be placed before the main content, e.g. a search icon.
 */
export declare class WppSelect implements BaseComponent, BaseFormControl<SelectValue[] | SelectValue>, InlineMessage {
  private resizeObserver;
  private hasReachedLimit;
  private themeSubscription;
  protected canSelectAll: boolean;
  protected canClearAll: boolean;
  protected listRef?: HTMLDivElement;
  private LIB_COMPONENTS_PREFIX;
  protected versionToCompare: string;
  protected tippyInstance?: Instance<Props>;
  protected anchorRef?: HTMLDivElement;
  protected portalRef?: HTMLDivElement;
  protected inputRef?: HTMLDivElement;
  protected overflowContainerRef?: HTMLDivElement;
  protected _locales: SelectLocaleInterface;
  host: HTMLWppSelectElement;
  isOpen: boolean;
  searchText: string;
  internalList: ListItemInterface[];
  renderedText: string;
  emittedValue: SelectValue | null;
  hasIconStartSlot: boolean;
  anchorButton: boolean;
  shouldShowSearch: boolean;
  focusType: FOCUS_TYPE;
  isRenderMessageInTooltip: boolean;
  withScroll: boolean;
  checkedItems: number;
  disabledItems: number;
  textOverflows: boolean;
  pinnedItems: ListItemInterface[];
  isContainerFocused: boolean;
  shouldTruncate: boolean;
  /**
   * If `true`, the search input should retain its value when the dropdown is closed.
   * This is useful for cases where the user might want to continue searching
   */
  readonly consistentSearch: boolean;
  /**
   * Defines the input value.
   */
  value: SelectValue | SelectValue[];
  /**
   * List of items in the dropdown. The items should have at least a `label` and a `value`.
   */
  readonly list: ListItemInterface[];
  /**
   * Defines the WppSelect component type.
   * Valid values: 'single' | 'multiple' | 'combined'
   */
  readonly type: SelectTypes;
  /**
   * This is property for internal use only. It is used to render text variant of the WppSelect component (used in WppPagination component)
   * @internal
   */
  readonly isTextSelect: boolean;
  /**
   * If `true` the search field will appear. The default value 'auto' displays the search
   * only when the number of items displayed is >= 10.
   */
  readonly withSearch: boolean | 'auto';
  /**
   * If the input is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the input is required.
   */
  readonly required: boolean;
  /**
   * If `true`, the input should be focused on page load.
   */
  readonly autoFocus: boolean;
  /**
   * If the component is loading.
   */
  readonly loading: boolean;
  /**
   * If `true` the dropdown has controls folder, meaning that the "Select All" and "Clear All" button will appear at the bottom of the dropdown.
   * This property works just for the multiple select.
   */
  readonly withFolder: boolean;
  /**
   * Used to control whether or not the selected value from a text-select should be truncated with an ellipsis (three dots)
   * to fit within a specified width. If set to false, the selected value from the text-select may appear on
   * multiple lines. If set to true (which is the default), the content will always be on 1 line and will be truncated.
   */
  readonly truncate: boolean;
  /**
   * Defines the maximum number of items the user can select in a dropdown. If the maximum number is reached, the other items are disabled.
   * This property can be used only on the "multiple" select.
   */
  readonly maximumSelectedItems?: number;
  /**
   * Helper function to return the key of the list-item in the list.
   * Should be used when the value of the list item is an object.
   */
  readonly getItemKey: (value: ListValue) => string | number | undefined;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * Defines the input name.
   */
  readonly name?: string;
  /**
   * Indicates the configuration of the label.
   */
  labelConfig?: SelectLabelConfig;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the input size.
   */
  readonly size: SelectSize;
  /**
   * If true, wouldn't update `select` when the list changes.
   */
  readonly enableStaticOptions: boolean;
  /**
   * Defines multiple select, maximum selected items to show.
   */
  readonly maxItemsToDisplay: number;
  /**
   * Defines the dropdown width. The width of the dropdown cannot be smaller than the width of the trigger element.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * Defines the displayed input value. If provided overrides the existing displayed value.
   * This property should be used only in custom single selects.
   */
  displayValue: string;
  /**
   * Defines if the dropdown of the select is opened or not. This property is used to control the direction of chevron icon (opened / closed).
   * This property should be used only in custom single selects.
   */
  readonly isDropdownOpen: boolean;
  /**
   * Contains the component `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the input message. The message is placed right below the select or in a tooltip when `messageInTooltip` is enabled.
   */
  readonly message?: string;
  /**
   * Defines the input message type, which can be "error" or "warning". This controls the visual validation state even when no message is provided.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the input message maximum length. The message will get truncated after
   * limit is reached. This property has to be used together with "message".
   */
  readonly maxMessageLength?: number;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<SelectLocaleInterface>;
  /**
   * If 'true', instead of displaying comma-separated values, the input should show the text "All selected"
   * when all options in the multi-select are selected.
   */
  readonly showSelectAllText: boolean;
  /**
   * If `true`, renders a "Select all (N)" checkbox at the top of the dropdown list and replaces
   * the bottom "Select All" / "Clear All" buttons with "Clear" / "Apply" buttons.
   * Selected items are rendered at the top of the dropdown when it is opened.
   * This property works only for the multiple select with `withFolder` enabled.
   */
  readonly showSelectAllOption: boolean;
  /**
   * Defines the combined input value.
   */
  inputValue: string;
  /**
   * Defines the custom mask options. Currently, it can be used with the following types: 'decimal', 'text', 'tel'
   * NOTE: Used only in `WppCombinedSelect`.
   */
  readonly maskOptions?: MaskOptions;
  /**
   * Defines the type of input
   * NOTE: Used only in `WppCombinedSelect`
   */
  readonly inputType: InputTypes;
  /**
   * Defines the dropdown configuration of the tooltip of the select's message. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Render error/warning/info message in tooltip instead of an inline message below a select element.
   * Only renders a tooltip when `message` is provided with an error or warning `messageType`; otherwise it has no effect.
   */
  readonly messageInTooltip: boolean;
  /**
   * Emitted when an input value changes.
   */
  readonly wppChange: EventEmitter<SelectChangeEventDetails>;
  /**
   * Emitted when the input is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the user clicks the Apply button in the multiple select with showSelectAllOption.
   */
  readonly wppApply: EventEmitter<void>;
  onUpdateDisplayValue(): void;
  onUpdateValue(): void;
  onUpdateEmittedValue(): void;
  private getSelectedItems;
  onUpdateList(): void;
  onUpdateSearchText(): void;
  onUpdateLoading(): void;
  onUpdateMaximumSelectedItems(): void;
  onUpdateMessage(): void;
  onUpdateLocales(newLocales: Partial<SelectLocaleInterface>): void;
  /**
   * Sets focus on the select and opens the dropdown.
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private checkMessageInTooltip;
  private checkTruncationInTextSelect;
  private onUpdateListSingle;
  private onUpdateListMultiple;
  private updateItemsAfterChangeMultiple;
  private checkListAgainstValueSingle;
  private checkListAgainstValueMultiple;
  private convertValueToKey;
  protected renderList: () => HTMLElement;
  protected get filteredPinnedItems(): ListItemInterface[];
  protected renderPinnedItems: () => VNode;
  private renderSlotsInListItem;
  private setHasBeenInternallyDisabled;
  private disableOtherElements;
  private enablePreviousElements;
  protected checkIfTextOverflows: () => void;
  private setRenderedTextMultiple;
  protected onShowDropdown: (instance: Instance<Props>) => false | void;
  private onShowDropdownText;
  protected onHiddenDropdown: (instance: Instance<Props>) => void;
  protected createTippyInstance: () => void;
  private focusFirstListItem;
  private focusSearchInput;
  protected handleSearch: (event: WppInputCustomEvent<InputChangeEventDetail>) => void;
  protected handleClickListItem: (event: WppListItemCustomEvent<ListItemChangeEventDetail>) => void;
  private onClickListItemSingle;
  private onClickListItemMultiple;
  private updateScrollState;
  protected handleSelectAll: () => void;
  protected handleClearAll: () => void;
  protected get visibleItems(): ListItemInterface[];
  protected get canClearVisible(): boolean;
  protected get isSelectAllChecked(): boolean;
  protected get isSelectAllIndeterminate(): boolean;
  protected get selectAllCount(): number;
  protected get isSelectAllDisabled(): boolean;
  protected handleSelectAllToggle: () => void;
  protected handleApply: () => void;
  protected setShouldShowSearch: () => false | undefined;
  protected handleClick: (shouldFocus?: boolean) => void;
  protected updateSlotData: () => void;
  protected onKeyUp: (event: KeyboardEvent) => void;
  protected onKeyDown: (event: KeyboardEvent) => void;
  protected onKeyDownPortal: (event: KeyboardEvent) => void;
  protected onFocus: (event: FocusEvent) => void;
  protected onBlur: (event?: FocusEvent) => void;
  protected hasErrorsOrWarnings: (type: 'error' | 'warning') => boolean;
  protected iconStartCssClasses: () => {
    'icon-start': boolean;
    'slot-hidden': boolean;
    disabled: boolean;
  };
  protected labelCssClasses: () => {
    disabled: boolean;
  };
  render(): any;
}

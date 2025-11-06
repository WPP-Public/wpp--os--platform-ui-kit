import { Event, EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { ListPosition, AriaProps } from '../../types/common';
import { BaseComponent } from '../../interfaces/base-component';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { InlineMessage } from '../../interfaces/inline-message';
import { InputChangeEventDetail } from '../wpp-input/types';
import { SelectChangeEventDetail, SelectValue, SelectTypes, SelectOptionChangeEventDetail, SelectLabelConfig, SelectLocaleInterface, SelectTabElements, SelectSize, SelectOption, GetSelectOptionIdHandler, GetSelectOptionLabelHandler } from './types';
import { LoadMoreHandler } from '../wpp-autocomplete/types';
import { Instance } from 'tippy.js';
interface FocusType {
  input: FOCUS_TYPE;
  listItem: FOCUS_TYPE;
}
/**
 * @slot wpp-list-item - contains list items. List items must have distinct value properties, and value should not be `undefined` or `null` to ensure proper functionality. The default slot, without the name attribute.
 * @slot icon-start - can contain an icon that will be placed before the main content, e.g. a search icon.
 *
 * @part single-select-input - Single-select input element
 * @part multiple-select-input - Multiple-select input element
 * @part text-select-wrapper - Text-select input element
 *
 * @part label - Label text element
 * @part input-wrapper - input wrapper element
 * @part input - input element
 * @part message - message element
 *
 * @part wrapper - component wrapper element
 * @part body - Main content wrapper
 * @part text - Main text content
 * @part icon-chevron - icon chevron element
 *
 * @part placeholder-wrap - placeholder wrapper element
 * @part placeholder - placeholder text element

 * @part options-list - options list element
 */
export declare class WppSelect implements BaseComponent, BaseFormControl<SelectValue[] | SelectValue>, InlineMessage {
  protected triggerEl?: HTMLElement;
  protected inputRef?: HTMLDivElement;
  protected menuRef?: HTMLDivElement;
  protected inputSearchRef?: HTMLWppInputElement;
  protected totalItems: number;
  protected multipleSelectDropdownHeight: number;
  protected singleSelectDropdownHeight: number;
  protected enabledElements: HTMLWppListItemElement[];
  protected listWrapperRef?: HTMLDivElement;
  private observers;
  private infiniteLoadingPromise?;
  host: HTMLWppSelectElement;
  hasIconStartSlot: boolean;
  isEmpty: boolean;
  isOnSearch: boolean;
  searchText: string;
  isAllSelected: boolean;
  isInputFilled: boolean;
  activeItem: HTMLElement | null;
  activeItems: HTMLWppListItemElement[];
  textToDisplay: string;
  selectedItemsTextList: string[];
  isFocused: boolean;
  focusType: FocusType;
  withScroll: boolean;
  isInfiniteLoading: boolean;
  hasClickedBtn: boolean;
  isHiddenDropdown: boolean;
  shouldTruncate: boolean;
  displayedItemsCount: number;
  isInModal: boolean;
  modalRef?: HTMLElement | null;
  /**
   * If the component is loading.
   */
  readonly loading: boolean;
  /**
   * If the autocomplete options list has infinite scroll.
   * This prop shouldn't change after the component is rendered.
   */
  readonly infinite: boolean;
  /**
   * If infinite scroll can request more pages to load.
   */
  readonly infiniteLastPage: boolean;
  /**
   * Helper that requests to load more options on infinite scroll.
   * This request is considered done when the returned `Promise` is settled.
   * This prop is required when `infinite` is set to `true`.
   */
  readonly loadMore?: LoadMoreHandler;
  /**
   * Defines the input name.
   */
  readonly name?: string;
  /**
   * Defines the input type.
   */
  readonly type: SelectTypes;
  /**
   * Defines the input value.
   */
  value: SelectValue[] | SelectValue | SelectOption[];
  /**
   * If `true`, the component can accept custom value objects.
   * Additionally, the `getOptionId` and `getOptionLabel` property may be overwritten to retrieve the necessary property for object identification.
   */
  readonly withCustomValue: boolean;
  /**
   * Helper that gets ID values from the select options.
   */
  readonly getOptionId: GetSelectOptionIdHandler;
  /**
   * Helper that gets a label for the select options.
   */
  readonly getOptionLabel: GetSelectOptionLabelHandler;
  /**
   * Defines the combined input value.
   */
  inputValue: string;
  /**
   * Defines the displayed input value. If provided overrides the existing displayed value
   */
  displayValue: string;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * If the input is required.
   */
  readonly required: boolean;
  /**
   * If the input is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true` the search field will appear. The default value 'auto' displays the search
   * only when the number of items displayed is >= 10.
   */
  readonly withSearch: boolean | 'auto';
  /**
   * If `true` the dropdown has controls folder.
   */
  readonly withFolder: boolean;
  /**
   * If `true`, the input should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the input size.
   */
  readonly size: SelectSize;
  /**
   * Defines the input message.
   */
  readonly message?: string;
  /**
   * Defines the input message type.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the input message maximum length.
   */
  readonly maxMessageLength?: number;
  /**
   * Defines multiple select, maximum selected items to show.
   */
  readonly maxItemsToDisplay: number;
  /**
   * Defines the dropdown CSS position. If you want to overlay `overflow: hidden`, use `fixed`.
   */
  readonly dropdownPosition: ListPosition;
  /**
   * Contains the component `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly dropdownConfig: DropdownConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: SelectLabelConfig;
  /**
   * If true, wouldn't update `select` on `options` change
   */
  readonly enableStaticOptions: boolean;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the component locale types.
   */
  readonly locales: SelectLocaleInterface;
  /**
   * Defines the dropdown width. The width of the dropdown cannot be smaller than the width of the trigger element.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * If 'true', instead of displaying comma-separated values, the input should show the text "All selected"
   * when all options in the multi-select are selected.
   */
  readonly showSelectAllText: boolean;
  /**
   * Used to control whether or not the selected value from a text-select should be truncated with an ellipsis (three dots)
   * to fit within a specified width. If set to false, the selected value from the text-select may appear on
   * multiple lines. If set to true (which is the default), the content will always be on 1 line and will be truncated.
   */
  readonly truncate: boolean;
  /**
   * Defines the maximum number of items the user can select in a dropdown. If the maximum number is reached, the other items are disabled.
   */
  readonly maximumSelectedItems?: number;
  /**
   * Emitted when an input value changes.
   */
  readonly wppChange: EventEmitter<SelectChangeEventDetail>;
  /**
   * Emitted when the input is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the search value changes
   */
  wppSearchValueChange: EventEmitter<string>;
  handleSelectOptionClick(params: CustomEvent<SelectOptionChangeEventDetail>): void;
  componentWillLoad(): void;
  protected updateSlotData: () => void;
  private getEnabledItems;
  private disableNonSelectedItems;
  private enableListItems;
  private validateMaxSelected;
  private isOptionsValueEqual;
  protected getUpdatedFocusInfo: (type: SelectTabElements, updateValue: FOCUS_TYPE) => FocusType;
  private updateValue;
  protected handleInputChange: (event: CustomEvent<InputChangeEventDetail>) => void;
  private countDisplayedItems;
  protected hasSimpleSearch: () => boolean;
  protected handleSearch: (initSearchText: string) => void;
  protected updateScrollState: () => void;
  onUpdateValue(newValue: SelectValue, oldValue: SelectValue): void;
  onLoadingChange(loading: boolean): void;
  /**
   * Sets focus on native input
   */
  setFocus(): Promise<void>;
  /**
   * Update options list programmatically
   */
  updateOptions(): Promise<void>;
  private findParentModal;
  private updateDropdownHeight;
  private onWindowResize;
  componentDidLoad(): void;
  private customDropdownConfig;
  protected shouldShowSearch: () => boolean;
  private changeSlotsAttribute;
  protected handleMenuListShow: (instance: Instance) => boolean | void;
  protected handleMenuListHide: (instance: Instance) => false | void;
  disconnectedCallback(): void;
  private getValueFromDOM;
  private updateIsFilled;
  private setMultipleTextToDisplay;
  protected anyClearable: () => boolean;
  protected handleClearAll: (e?: Event | undefined) => void;
  protected canSelectAll: () => boolean;
  protected handleSelectAll: () => void;
  protected handleShouldCloseOnOutsideClick: (event: Event) => boolean;
  protected canLoadMore: () => boolean | undefined;
  protected requestLoadMore: () => void;
  protected scrollOptionsToTop: () => void;
  protected handleOptionsScroll: (event: UIEvent) => void;
  protected handleLabelClick: () => void;
  protected onFocus: (event: FocusEvent) => void;
  protected onMouseDown: () => void;
  private handleBlurCall;
  protected onBlur: (event: FocusEvent) => void;
  protected onKeyUp: (event: KeyboardEvent, type: SelectTabElements) => void;
  protected areOptionsProvided: () => boolean;
  private countItems;
  protected handleSlotChange: () => void;
  protected getDropdownWidth: (instance: Instance) => void;
  protected labelCssClasses: () => {
    label: boolean;
    focused: boolean;
    disabled: boolean;
  };
  protected iconStartCssClasses: () => {
    [x: string]: boolean;
    'icon-start': boolean;
    'slot-hidden': boolean;
    disabled: boolean;
    filled: boolean;
    'filled-active': boolean;
    'filled-pressed': boolean;
  };
  render(): any;
}
export {};

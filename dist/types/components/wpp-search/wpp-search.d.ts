import { EventEmitter } from '../../stencil-public-runtime';
import { BaseComponent } from '../../interfaces/base-component';
import { InlineMessage } from '../../interfaces/inline-message';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { SearchChangeEventDetail, SearchLabelConfig, SearchLocales, SearchGetOptionIdHandler, SearchGetOptionLabelHandler, SearchOption } from './types';
import { ListItemChangeEventDetail } from '../wpp-list-item/types';
import { LoadMoreHandler } from '../wpp-autocomplete/types';
/**
 * @slot - Should contain a list of `wpp-list-item` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part dropdown-header - Dropdown header
 * @part options - Options list container
 * @part anchor - Search input tooltip
 */
export declare class WppSearch implements BaseComponent, InlineMessage {
  private inputEl?;
  private triggerEl?;
  private dropdownEl?;
  private valuesContainerEl?;
  private valuesResizeObserver?;
  private optionElements?;
  private shownOptionElements?;
  private tippyInstance?;
  private infiniteLoadingPromise?;
  private optionsListEl?;
  private placeholderEl?;
  private hasActiveEllipses?;
  private observer;
  private _locales;
  private isDropdownShown;
  private themeSubscription;
  host: HTMLWppSearchElement;
  isFocused: boolean;
  searchValue: string;
  isEmptyOptions: boolean;
  isInfiniteLoading: boolean;
  focusType: FOCUS_TYPE;
  isInComponent: boolean;
  /**
   * Defines the search name.
   */
  readonly name?: string;
  /**
   * If the component is loading.
   */
  readonly loading: boolean;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the component should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * Defines the selected items.
   */
  value: SearchOption[];
  /**
   * Helper that gets ID values from the search options.
   */
  readonly getOptionId: SearchGetOptionIdHandler;
  /**
   * Helper that gets a label from the search options.
   */
  readonly getOptionLabel: SearchGetOptionLabelHandler;
  /**
   * If `true`, the input is required
   */
  readonly required: boolean;
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
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Defines the input size.
   */
  readonly size: 'm' | 's';
  /**
   * Indicates locales for search component
   */
  readonly locales: Partial<SearchLocales>;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: SearchLabelConfig;
  /**
   * If `true`, search automatically filters options on search instead of relying on updates of the slotted options list.
   * This prop shouldn't change after the component is rendered.
   */
  readonly simpleSearch: boolean;
  /**
   * Defines the dropdown width.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * If `true`, the search will highlight options
   */
  readonly highlight: boolean;
  /**
   * If `true`, the dropdown will be opened on click
   */
  readonly openDropdownOnClick: boolean;
  /**
   * If `true`, search will show the dropdown with options
   */
  readonly showOptions: boolean;
  /**
   * If the autocomplete options list has infinite scroll.
   * This overrides the `simpleSearch` prop and considers it as `false`.
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
   * Emitted when the search value changes
   */
  wppChange: EventEmitter<SearchChangeEventDetail>;
  /**
   * Emitted when the search receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the search loses focus
   */
  readonly wppBlur: EventEmitter<void>;
  /**
   * Emitted when the search value changes
   */
  wppSearchValueChange: EventEmitter<string>;
  handleOptionToggle(event: CustomEvent<ListItemChangeEventDetail>): void;
  onNextValueChange(): void;
  onSearchValueChange(initSearchValue: string): never[] | undefined;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  onLoadingChange(loading: boolean): void;
  updateIsInComponent(value: boolean): void;
  onUpdateLocales(newLocales: Partial<SearchLocales>): void;
  /**
   * Sets focus on native input
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  connectedCallback(): void;
  private valueResizeObserver;
  private createTippyInstance;
  private hasClearButton;
  private hasSearchButton;
  private hasSimpleSearch;
  private canLoadMore;
  private requestLoadMore;
  private isOptionHidden;
  private isOptionChecked;
  private scrollOptionsToTop;
  private isOptionNodesChanged;
  private getOptionElements;
  private focusInput;
  private blurInput;
  private showDropdown;
  private hideDropdown;
  private updateOptions;
  private handleTriggerContainerMouseDown;
  private handleTriggerClick;
  private handleMouseDown;
  private handleInputMouseDown;
  private handleKeyUp;
  private handleInput;
  private handleFocus;
  private handleOptionsScroll;
  private handleBlur;
  private isEllipsisActive;
  private handleOptionsChange;
  private handleClearClick;
  private hostCssClasses;
  private searchWrapperCssClasses;
  private triggerCssClasses;
  private inputCssClasses;
  private labelCssClasses;
  private dropdownListCssClasses;
  private tooltipCSSClasses;
  private hostStyle;
  private getInputValue;
  private renderInputPlaceholder;
  private getDropdownWidth;
  private renderDropdownContent;
  render(): any;
}

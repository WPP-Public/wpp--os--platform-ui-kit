import { EventEmitter } from '../../stencil-public-runtime';
import { BaseComponent } from '../../interfaces/base-component';
import { InlineMessage } from '../../interfaces/inline-message';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { AutocompleteChangeEventDetail, AutocompleteExtendedOption, AutocompleteLabelConfig, AutocompleteLocales, AutocompleteOption, AutocompleteTypes, GetOptionIdHandler, GetOptionLabelHandler, LoadMoreHandler } from './types';
import { ListItemChangeEventDetail } from '../wpp-list-item/types';
/**
 * @slot - Should contain a list of `wpp-autocomplete-option` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part options - Options list container
 * @part selected-values - Dropdown values for selected values
 */
export declare class WppAutocomplete implements BaseComponent, InlineMessage {
  private inputEl?;
  private triggerEl?;
  private dropdownEl?;
  private valuesContainerEl?;
  private optionsListEl?;
  private valuesResizeObserver?;
  private optionElements?;
  private shownOptionElements?;
  private tippyInstance?;
  private isScrollToInputRequested;
  private infiniteLoadingPromise?;
  private hasChecked?;
  private mutationObserver;
  private handleOptionsTimer;
  private isDropdownShown;
  private resizeInProgress;
  private selectedPillsWrapperRef?;
  private headerWrapperRef?;
  private withPills;
  private LIB_COMPONENTS_PREFIX;
  private _locales;
  host: HTMLWppAutocompleteElement;
  isFocused: boolean;
  searchValue: string;
  isEmptyOptions: boolean;
  isInfiniteLoading: boolean;
  focusType: FOCUS_TYPE;
  hiddenSelectedOptionsNumber: number;
  isShowMore: boolean;
  activePillsTruncationState: boolean[];
  activePillsTruncationLabelState: boolean[];
  suggestionListTruncationState: boolean[];
  componentSuggestions: AutocompleteOption[] | AutocompleteExtendedOption[];
  lastSelectedElement: HTMLWppListItemElement | null;
  isInComponent: boolean;
  /**
   * Defines the autocomplete name.
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
   * If the autocomplete options list has infinite scroll.
   * This overrides the `simpleSearch` prop and considers it as `false`.
   * This prop shouldn't change after the component is rendered.
   */
  readonly infinite: boolean;
  /**
   * Title displayed above the suggestions list when the input is focused or clicked.
   */
  readonly suggestionsTitle?: string;
  /**
   * List of suggestion options to display when the input is focused or clicked.
   */
  readonly suggestions: AutocompleteOption[] | AutocompleteExtendedOption[];
  /**
   * If infinite scroll can request more pages to load.
   */
  readonly infiniteLastPage: boolean;
  /**
   * Maximum number of options that can be selected. Allowed only in case when 'multiple' prop is set to 'true'.
   * Zero or fewer means there is no limit on number of selected items.
   */
  readonly limitSelectedItems: number;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * Defines the selected items.
   */
  value: AutocompleteOption[];
  /**
   * Helper that gets ID values from the autocomplete options.
   */
  readonly getOptionId: GetOptionIdHandler;
  /**
   * Helper that gets a label from the autocomplete options.
   */
  readonly getOptionLabel: GetOptionLabelHandler;
  /**
   * Helper that requests to load more options on infinite scroll.
   * This request is considered done when the returned `Promise` is settled.
   * This prop is required when `infinite` is set to `true`.
   */
  readonly loadMore?: LoadMoreHandler;
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
   * Defines the autocomplete type.
   */
  readonly type?: AutocompleteTypes;
  /**
   * Defines the input size.
   */
  readonly size: 'm' | 's';
  /**
   * Indicates locales for autocomplete component
   */
  readonly locales: Partial<AutocompleteLocales>;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Tooltip config for WppPill's, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly pillTooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: AutocompleteLabelConfig;
  /**
   * If `true`, the autocomplete will give possibility to select multiple options
   */
  readonly multiple: boolean;
  /**
   * If `true`, the autocomplete will show the "Create new element" button. 'displayBtnWhenListEmpty' prop controls when it will be displayed.
   */
  readonly showCreateNewElement: boolean;
  /**
   * Controls when the "Create new element" button is displayed. By default, it is true, meaning that it will be displayed only when
   * the list is empty. If set to "false", then the button will always be displayed.
   */
  readonly displayBtnWhenListEmpty: boolean;
  /**
   * If `true`, autocomplete automatically filters options on search instead of relying on updates of the slotted options list.
   * This prop shouldn't change after the component is rendered.
   */
  readonly simpleSearch: boolean;
  /**
   * If `true`, the search will be persistent and will not be cleared on losing the focus.
   */
  readonly persistentSearch: boolean;
  /**
   * Defines the dropdown width.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * Emitted when the autocomplete value changes
   */
  wppChange: EventEmitter<AutocompleteChangeEventDetail>;
  /**
   * Emitted when the autocomplete receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the autocomplete loses focus
   */
  readonly wppBlur: EventEmitter<void>;
  /**
   * Emitted when the autocomplete search value changes
   */
  wppSearchValueChange: EventEmitter<string>;
  /**
   * Emitted when the "Create new element" button is clicked
   */
  wppCreateNewOption: EventEmitter<string>;
  handleOptionToggle(event: CustomEvent<ListItemChangeEventDetail>): void;
  onLoadingChange(loading: boolean): void;
  onNextValueChange(newValue: AutocompleteOption): void;
  onSearchValueChange(initSearchValue: string): never[] | undefined;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  onShowMoreChange(isShowMore: boolean): void;
  onUpdateSuggestions(): void;
  updateIsInComponent(value: boolean): void;
  onUpdateLocales(newLocales: Partial<AutocompleteLocales>): void;
  /**
   * Sets focus on native input
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  private addHandleOptionsChangeTimer;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  connectedCallback(): void;
  private handleClickOutside;
  private checkSuggestions;
  private valueResizeObserver;
  private createTippyInstance;
  private triggerTooltipCalculation;
  private isSelectedItemsLimitReached;
  private canLoadMore;
  private hasClearButton;
  private hasSimpleSearch;
  private isOptionHidden;
  private isOptionNodesChanged;
  private getOptionElements;
  private scrollOptionsToTop;
  /**
   * If return `true`, need to interrupt function
   * for the cases, when user have Single WppAutocomplete and clicking into already selected WppListItem
   * @param event
   */
  private toggleSingleAutocompleteListItem;
  private focusInput;
  private blurInput;
  private showDropdown;
  private hideDropdown;
  private isItemSelected;
  private updateOptions;
  private requestLoadMore;
  private handleTriggerContainerMouseDown;
  private handleCreateNewOptionClick;
  private handleTriggerClick;
  private handleMouseDown;
  private handleKeyUp;
  private handleInput;
  private handleFocus;
  private handleBlur;
  private handleOptionsScroll;
  private handleOptionsChange;
  private handleClearClick;
  private hostCssClasses;
  private autocompleteWrapperCssClasses;
  private triggerCssClasses;
  private inputCssClasses;
  private labelCssClasses;
  private dropdownListCssClasses;
  private selectedValuesCssClasses;
  private hostStyle;
  private selectedPillsWrapperCssClasses;
  private getInputValue;
  private renderInputPlaceholder;
  private countHiddenElements;
  private getNearestPowForRowsNumber;
  private getDropdownWidth;
  private isOptionSelected;
  private handleSuggestionClick;
  private renderDropdownContent;
  private renderSlotsListItem;
  private renderSelectedOptions;
  private renderPillComponent;
  /**
   * Validate each WppPill if it has truncated text label inside or WppPill got truncated when it's in `showMore` mode
   */
  private validateTruncatedPills;
  private showMoreLessRender;
  private handleShowMoreLessClick;
  render(): any;
}

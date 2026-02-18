import { EventEmitter } from '../../stencil-public-runtime';
import { Instance } from 'tippy.js';
import { AriaProps, ListValue } from '../../components';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { ListItemInterface } from '../wpp-select/types';
import { LabelConfig } from '../wpp-label/types';
import { ListItemChangeEventDetail } from '../wpp-list-item/types';
import { AutocompleteChangeEventDetail, AutocompleteLocales, AutocompleteOption, AutocompleteTypes, GetItemKeyType, LoadMoreHandler } from './types';
export declare class WppAutocomplete {
  host: HTMLWppAutocompleteElement;
  protected _locales: AutocompleteLocales;
  protected triggerRef?: HTMLDivElement;
  private dropdownRef?;
  private inputRef?;
  protected inputPlaceholderRef?: HTMLWppTypographyElement;
  protected hiddenInputPlaceholderRef?: HTMLWppTypographyElement;
  protected selectedPillsWrapperRef?: HTMLDivElement;
  protected headerWrapperRef?: HTMLDivElement;
  protected showMoreElementRef?: HTMLDivElement;
  protected selectedPillRefs: HTMLWppPillElement[];
  protected tippyInstance?: Instance;
  private resizeObserver?;
  protected withPills: boolean;
  protected activeListNdx: number | null;
  protected activeSuggestionNdx: number | null;
  protected listItemsRefs: HTMLWppListItemElement[];
  protected suggestionsItemsRefs: HTMLWppListItemElement[];
  private infiniteLoadingPromise?;
  private preventBlur;
  isFocused: boolean;
  isDropdownShown: boolean;
  isInfiniteLoading: boolean;
  internalList: ListItemInterface[];
  placeholderText: string | undefined;
  searchText: string;
  visibleOptionsLength: number;
  selectedOptions: ListItemInterface[];
  extendedSelectedValues: ListItemInterface[];
  hiddenSelectedOptionsNumber: number;
  hiddenCountElWidth: number;
  activePillsTruncationState: boolean[];
  isShowMore: boolean;
  componentSuggestions: ListItemInterface[];
  activeNdx: number;
  activeSourceList: 'list' | 'suggestions';
  focusType: FOCUS_TYPE;
  isInputValueTransparent: boolean;
  /**
   * Indicates label config
   */
  readonly labelConfig?: LabelConfig;
  /**
   * Defines the autocomplete name.
   */
  readonly name?: string;
  /**
   * If `true`, the component should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the input is required
   */
  readonly required: boolean;
  /**
   * If the component is loading.
   */
  readonly loading: boolean;
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
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * Defines the input size.
   */
  readonly size: 'm' | 's';
  /**
   * If `true`, the autocomplete will give the possibility to select multiple options
   */
  readonly multiple: boolean;
  /**
   * Defines the autocomplete type.
   */
  readonly type: AutocompleteTypes;
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
   * If `true`, autocomplete automatically filters options on search instead of relying on updates of the slotted options list.
   * This prop shouldn't change after the component is rendered.
   */
  readonly simpleSearch: boolean;
  /**
   * If `true`, the search will be persistent and will not be cleared on losing the focus.
   */
  readonly persistentSearch: boolean;
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
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly dropdownConfig: DropdownConfig;
  /**
   * Tooltip config for WppPill's, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly pillTooltipConfig: DropdownConfig;
  /**
   * Defines the dropdown width.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * List of items in the dropdown.
   */
  readonly list: ListItemInterface[];
  /**
   * Suggestion list of items in the dropdown.
   */
  readonly suggestions?: ListItemInterface[];
  /**
   * Defines the selected items.
   */
  value: ListValue[];
  /**
   * Maximum number of options that can be selected. Allowed only in case when 'multiple' prop is set to 'true'.
   * Zero or fewer means there is no limit on number of selected items.
   */
  readonly limitSelectedItems: number;
  /**
   * Indicates locales for autocomplete component
   */
  readonly locales: Partial<AutocompleteLocales>;
  /**
   * Helper function to return the key of the list-item in the list.
   * Should be used when the value of the list item is an object.
   */
  readonly getItemKey: GetItemKeyType;
  /**
   * Contains the autocomplete `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Emitted when the autocomplete value changes
   */
  readonly wppChange: EventEmitter<AutocompleteChangeEventDetail>;
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
  readonly wppSearchValueChange: EventEmitter<string>;
  /**
   * Emitted when the "Create new element" button is clicked
   */
  readonly wppCreateNewOption: EventEmitter<string>;
  onValueChange(nextValue: AutocompleteOption[]): void;
  onSearchTextChange(searchText: string): void;
  onListChange(nextList: ListItemInterface[]): void;
  onPlaceholderTextChange(): void;
  onShowMoreChange(isShowMore: boolean): void;
  onExtendedSelectedValuesChange(): void;
  onSuggestionsChange(nextSuggestions: ListItemInterface[]): void;
  onLoadingChange(loading: boolean): void;
  /**
   * Sets focus on native input
   */
  setFocus(isOutlined?: boolean): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Observers
   */
  private setupResizeObserver;
  /**
   * Dropdown methods
   */
  private createTippyInstance;
  private showDropdown;
  private hideDropdown;
  /**
   * List items click handlers
   */
  protected handleClickListItem: (event: CustomEvent<ListItemChangeEventDetail>) => void;
  private onClickListItemSingle;
  private onClickListItemMultiple;
  /**
   * Component handlers
   */
  private handleInput;
  private handleFocus;
  protected handleBlur: (event?: FocusEvent, options?: {
    force?: boolean;
  }) => void;
  private handleCrossIconFocus;
  private handleCrossIconKeyDown;
  private handleTriggerClick;
  private handleSearch;
  private handleListChange;
  private handleClearClick;
  private handleOptionsScroll;
  private onKeyUp;
  private onKeyDown;
  /**
   * Validators
   */
  private checkListAgainstValue;
  private checkVisibleOptionsLength;
  /**
   * Render methods
   */
  private renderPlaceholderText;
  private renderDropdownPills;
  private renderDropdownList;
  private renderExtendedSelectedValues;
  private renderCreateNewElement;
  /**
   * Infinity Loading methods
   */
  private requestLoadMore;
  /**
   * Helper methods
   */
  private getDropdownWidth;
  private canLoadMore;
  private isSelectedItemsLimitReached;
  /**
   * Placeholder methods
   */
  private getHiddenCountElWidth;
  private countHiddenElements;
  private updatePlaceholderText;
  /**
   * Dropdown Pills methods
   */
  /**
   * Validate each WppPill if it has a truncated text label inside or WppPill got truncated when it's in `showMore` mode
   */
  private validateTruncatedPills;
  protected handleShowMoreLessClick: () => void;
  /**
   * Accessibility Methods
   */
  protected getVisibleSource: () => "list" | "suggestions" | undefined;
  private isListItemVisible;
  private clampListNdx;
  private findNextActiveNdx;
  private setActiveClass;
  private clearActive;
  /**
   * CSS Classes Methods
   */
  private hostCssClasses;
  private labelCssClasses;
  private triggerCssClasses;
  private inputCssClasses;
  private dropdownCssClasses;
  private iconCrossCssClasses;
  render(): any;
}

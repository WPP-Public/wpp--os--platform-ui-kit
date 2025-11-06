import highlightWords from 'highlight-words';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { getSlotEmptyStates, isEventTargetContained, setHasFocused, transformToVersionedTag, autoFocusElement, } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { renderCombinedSelect } from './components/wpp-combined-select/wpp-combined-select';
import { renderMultipleSelect } from './components/wpp-multiple-select/wpp-multiple-select';
import { renderSingleSelect } from './components/wpp-single-select/wpp-single-select';
import { renderTextSelect } from './components/wpp-text-select/wpp-text-select';
// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
const MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH = 10;
const TRUNCATION_DELAY = 100;
const SELECT_OPTION_TAG_NAME = 'wpp-list-item';
const MULTIPLE_SELECT_SINGLE_VALUE_ERROR = 'Value should be an Array in the multiple select.';
const getInitFocusInfo = () => ({
  input: FOCUS_TYPE.NONE,
  listItem: FOCUS_TYPE.NONE,
});
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
export class WppSelect {
  constructor() {
    this.totalItems = 0;
    this.multipleSelectDropdownHeight = 412;
    this.singleSelectDropdownHeight = 372;
    this.enabledElements = [];
    this.observers = [];
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.getEnabledItems = () => {
      this.host.childNodes.forEach(el => {
        const item = el;
        if (item.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() && !item.disabled) {
          this.enabledElements.push(item);
        }
      });
    };
    this.disableNonSelectedItems = () => {
      this.enabledElements.forEach(el => {
        if (el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() && !el.checked) {
          el.disabled = true;
        }
      });
    };
    this.enableListItems = () => {
      this.enabledElements.forEach(el => {
        el.removeAttribute('disabled');
      });
    };
    this.validateMaxSelected = () => {
      if (!this.maximumSelectedItems)
        return;
      this.activeItems.length === this.maximumSelectedItems ? this.disableNonSelectedItems() : this.enableListItems();
    };
    this.isOptionsValueEqual = (leftValue, rightValue) => {
      if (this.withCustomValue) {
        const leftValueArray = Array.isArray(leftValue) ? leftValue : [leftValue];
        const rightValueArray = Array.isArray(rightValue) ? rightValue : [rightValue];
        return isEqual(leftValueArray.map(this.getOptionId), rightValueArray.map(this.getOptionId));
      }
      return isEqual(leftValue, rightValue);
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleInputChange = (event) => {
      this.inputValue = String(event.detail.value);
      this.wppChange.emit({
        value: this.value,
        inputValue: this.inputValue,
        name: this.name,
      });
    };
    this.countDisplayedItems = () => {
      this.displayedItemsCount = Array.from(this.host.querySelectorAll(`.${SELECT_OPTION_TAG_NAME}`)).filter((item) => !item.hidden).length;
    };
    this.hasSimpleSearch = () => !this.infinite;
    this.handleSearch = (initSearchText) => {
      setTimeout(() => {
        this.updateScrollState();
      }, 0);
      const searchText = initSearchText.trim();
      this.searchText = searchText;
      const isOnSearch = Boolean(searchText.length);
      this.isOnSearch = isOnSearch;
      if (!this.hasSimpleSearch()) {
        this.wppSearchValueChange.emit(searchText);
      }
      let isEveryItemHidden = true;
      const hasRedundantSpace = new RegExp(/^\s\s+|\s\s+$/, 'g').test(searchText);
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          element.setAttribute('highlight', searchText);
          const chunks = highlightWords({
            text: element.textContent || '',
            query: searchText,
            matchExactly: true,
          });
          if (!isOnSearch || (!hasRedundantSpace && chunks.some(el => el.match))) {
            isEveryItemHidden = false;
            element.removeAttribute('hidden');
          }
          else {
            element.setAttribute('hidden', 'true');
          }
        }
      });
      this.isEmpty = isOnSearch && isEveryItemHidden && !this.isInfiniteLoading && !this.loading;
    };
    this.updateScrollState = () => {
      const scrollHeight = this.menuRef?.scrollHeight || 0;
      const maxHeight = this.type === 'multiple' ? this.multipleSelectDropdownHeight : this.singleSelectDropdownHeight;
      this.withScroll = scrollHeight > maxHeight;
    };
    this.findParentModal = () => {
      // Set current to the host element as default value
      let current = this.host;
      while (current) {
        // Check if current element is one of the modals
        if (current.tagName &&
          [
            transformToVersionedTag('wpp-modal').toUpperCase(),
            transformToVersionedTag('wpp-side-modal').toUpperCase(),
            transformToVersionedTag('wpp-full-screen-modal').toUpperCase(),
          ].includes(current.tagName)) {
          const dialog = current.shadowRoot?.querySelector('[role="dialog"]');
          return dialog || current;
        }
        current = current?.parentElement;
        // If there is no parent element, break the loop and return null (not in modal)
        if (!current)
          break;
      }
      return null;
    };
    this.updateDropdownHeight = () => {
      const isSmallWindowHeight = window.innerHeight < 800;
      if (!this.menuRef)
        return;
      if (this.isInModal) {
        Object.assign(this.menuRef?.style, {
          '--input-select-dropdown-max-height': 'none',
          width: '100%',
        });
        return;
      }
      if (this.type === 'single') {
        this.singleSelectDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.6 : 372;
        this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${this.singleSelectDropdownHeight}px`);
      }
      if (this.type === 'multiple') {
        this.multipleSelectDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.7 : 412;
        this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${this.multipleSelectDropdownHeight}px`);
      }
    };
    this.onWindowResize = () => {
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
      }
    };
    this.customDropdownConfig = () => ({
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            name: 'applyStyles',
            fn: ({ state }) => {
              // Get the reference element (trigger element)
              const referenceRect = state.elements.reference.getBoundingClientRect();
              // Get the modal element
              const modalRect = this.modalRef?.getBoundingClientRect();
              if (!modalRect)
                return;
              // Get the modal's scroll position
              const modalScrollTop = this.modalRef?.scrollTop || 0;
              const modalScrollLeft = this.modalRef?.scrollLeft || 0;
              // Calculate position relative to modal
              const left = referenceRect.left - modalRect.left + modalScrollLeft;
              const modalHeight = modalRect.height;
              const actualDropdownHeight = state.elements.popper.getBoundingClientRect().height;
              let top = 0;
              let maxDropdownHeight = 0;
              const isSmallWindowHeight = window.innerHeight < 800;
              if (this.type === 'single') {
                maxDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.4 : this.singleSelectDropdownHeight;
              }
              if (this.type === 'multiple') {
                maxDropdownHeight = isSmallWindowHeight ? window.innerHeight * 0.4 : this.multipleSelectDropdownHeight;
              }
              // If the dropdown height is less than the predefined max height, set the dropdown height to the actual height
              let dropdownHeight = maxDropdownHeight > actualDropdownHeight ? actualDropdownHeight : maxDropdownHeight;
              // Calculate available space above and below the reference element
              const availableSpaceAbove = referenceRect.top - modalRect.top + modalScrollTop;
              const availableSpaceBelow = modalHeight - (referenceRect.bottom - modalRect.top + modalScrollTop);
              if (availableSpaceBelow > dropdownHeight) {
                // If there is enough space below, position the dropdown below the reference element and update the top position
                top = referenceRect.bottom - modalRect.top + modalScrollTop;
              }
              else if (availableSpaceAbove >= dropdownHeight) {
                // If there is enough space above, position the dropdown above the reference element and update the top position
                top = referenceRect.top - modalRect.top + modalScrollTop - dropdownHeight;
              }
              else if (availableSpaceAbove < dropdownHeight && availableSpaceBelow <= dropdownHeight) {
                // If there is not enough space above and below, checking where there is more space
                if (availableSpaceAbove <= availableSpaceBelow) {
                  dropdownHeight = availableSpaceBelow;
                }
                else {
                  dropdownHeight = availableSpaceAbove;
                  // Update the top position to be above the reference element
                  top = referenceRect.top - modalRect.top + modalScrollTop - dropdownHeight;
                }
              }
              /**
               * We need to set tippyBox and tippyContent to display flex and width 100% to make the dropdown a correct size
               */
              const tippyBoxEl = state.elements.popper.querySelector('.tippy-box');
              if (tippyBoxEl) {
                tippyBoxEl.style.width = '100%';
              }
              const tippyContentEl = state.elements.popper.querySelector('.tippy-content');
              if (tippyContentEl) {
                tippyContentEl.style.width = '100%';
              }
              const maxHeight = Math.min(modalRect.height, this.type === 'multiple' ? 412 : 372);
              this.menuRef?.style.setProperty('--input-select-dropdown-max-height', `${maxHeight}px`);
              // Update the dropdown position
              Object.assign(state.elements.popper.style, {
                display: 'flex',
                position: 'fixed',
                left: `${left}px`,
                top: `${top}px`,
                maxHeight: `${maxHeight}px`,
              });
            },
          },
        ],
      },
    });
    this.shouldShowSearch = () => {
      if (!this.host || typeof this.host.getAttributeNames !== 'function')
        return false;
      return ((this.host?.getAttributeNames().includes('with-search') && !['auto', false].includes(this.withSearch)) ||
        (this.withSearch === 'auto' && this.displayedItemsCount >= MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH));
    };
    this.changeSlotsAttribute = (attributeValue) => {
      const contentSlots = this.host?.querySelectorAll(`.${SELECT_OPTION_TAG_NAME}`);
      contentSlots.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          element.setAttribute('container-state', attributeValue);
        }
      });
    };
    this.handleMenuListShow = (instance) => {
      this.triggerEl?.setAttribute('aria-expanded', 'true');
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
        this.updateScrollState();
        this.isFocused = true;
      }
      this.changeSlotsAttribute('shown');
      if (this.dropdownConfig?.onShow) {
        return this.dropdownConfig.onShow(instance);
      }
    };
    this.handleMenuListHide = (instance) => {
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.NONE);
      this.triggerEl?.setAttribute('aria-expanded', 'false');
      this.changeSlotsAttribute('hidden');
      if (['multiple', 'single'].includes(this.type) && this.shouldShowSearch()) {
        setTimeout(() => {
          this.isOnSearch = false;
          this.handleSearch('');
        }, 300);
      }
      if (this.dropdownConfig?.onHide) {
        return this.dropdownConfig.onHide(instance);
      }
    };
    this.getValueFromDOM = () => Array.from(this.host.childNodes).reduce((acc, el) => {
      const element = el;
      if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
        !element.disabled &&
        element.checked) {
        if (this.type === 'multiple') {
          acc.push(element.value);
        }
        else {
          acc = element.value;
        }
      }
      return acc;
    }, (this.type === 'multiple' ? [] : ''));
    this.updateIsFilled = () => {
      const selectedItems = Array.from(this.inputRef.querySelectorAll('.selected-item-text-wrapper') || []);
      this.isInputFilled = selectedItems.some(el => el.clientWidth < el.scrollWidth);
    };
    this.setMultipleTextToDisplay = () => {
      this.selectedItemsTextList = Array.from(this.activeItems)
        .filter(el => el.multiple)
        .slice(0, this.maxItemsToDisplay)
        .map(el => {
        if (this.withCustomValue) {
          return this.getOptionLabel(el.value);
        }
        return el.querySelector('[slot="label"]')?.textContent || el.textContent || '';
      });
      this.textToDisplay =
        this.activeItems.length > this.maxItemsToDisplay ? String(this.activeItems.length - this.maxItemsToDisplay) : '';
    };
    this.anyClearable = () => {
      let anyClearable = false;
      this.activeItems.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          element.checked &&
          !element.disabled) {
          anyClearable = true;
        }
      });
      return anyClearable;
    };
    this.handleClearAll = (e) => {
      if (e) {
        this.hasClickedBtn = true;
      }
      const oldValue = this.value;
      const selectionList = [];
      this.activeItems.forEach(el => {
        const element = el;
        if (element.disabled) {
          selectionList.push(element.value);
        }
      });
      this.value = [...new Set([...selectionList])];
      if (!this.isOptionsValueEqual(oldValue, this.value)) {
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
    };
    this.canSelectAll = () => {
      let selectableCount = 0;
      if (this.maximumSelectedItems)
        return false;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          !element.checked &&
          !element.hidden &&
          !element.disabled) {
          selectableCount++;
        }
      });
      return (selectableCount > 0 &&
        (!this.maximumSelectedItems || this.activeItems.length + selectableCount <= this.maximumSelectedItems));
    };
    this.handleSelectAll = () => {
      this.hasClickedBtn = true;
      const oldValue = this.value;
      const selectionList = [];
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          (element.checked || !element.disabled)) {
          selectionList.push(element.value);
        }
      });
      this.value = [...new Set([...selectionList])];
      if (!this.isOptionsValueEqual(oldValue, this.value)) {
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
    };
    this.handleShouldCloseOnOutsideClick = (event) => event.target !== this.host && !isEventTargetContained(this.host, event);
    this.canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading;
    this.requestLoadMore = () => {
      if (this.loadMore) {
        this.isInfiniteLoading = true;
        const promise = this.loadMore().finally(() => {
          if (!promise.cancelled) {
            this.isInfiniteLoading = false;
            this.infiniteLoadingPromise = undefined;
          }
        });
        this.infiniteLoadingPromise = promise;
      }
    };
    this.scrollOptionsToTop = () => {
      if (this.menuRef) {
        this.menuRef.scrollTop = 0;
      }
    };
    this.handleOptionsScroll = (event) => {
      if (this.canLoadMore()) {
        const container = event.target;
        const scrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop;
        if (scrolledToBottom < INFINITE_SCROLL_THRESHOLD) {
          this.requestLoadMore();
        }
      }
    };
    this.handleLabelClick = () => {
      const host = this.host.shadowRoot;
      if (['multiple', 'single', 'text'].includes(this.type)) {
        const triggerElement = host.querySelector('.trigger-element');
        triggerElement.click();
        if (this.type === 'text') {
          triggerElement.focus();
        }
        else {
          const input = host.querySelector('.input');
          input.focus();
        }
      }
      if (this.type === 'combined') {
        const input = host.querySelector('.wpp-input')?.shadowRoot?.querySelector('input');
        input.select();
      }
    };
    this.onFocus = (event) => {
      this.isFocused = true;
      this.wppFocus.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.MOUSE);
    };
    this.handleBlurCall = (event) => {
      if (event.relatedTarget || this.hasClickedBtn) {
        this.hasClickedBtn = false;
        return;
      }
      const host = this.host.shadowRoot;
      const triggerElement = host.querySelector('.trigger-element');
      if (triggerElement.getAttribute('aria-expanded') === 'true') {
        triggerElement.click();
      }
    };
    this.onBlur = (event) => {
      // Handle ref?.current?.blur() on any Select component
      this.handleBlurCall(event);
      this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('listItem', FOCUS_TYPE.NONE);
      this.isFocused = false;
      this.wppBlur.emit(event);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
        if (this.focusType.listItem === FOCUS_TYPE.TAB) {
          this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE);
        }
      }
    };
    this.areOptionsProvided = () => {
      if (this.infinite || this.loading || this.isInfiniteLoading || this.isOnSearch) {
        return true;
      }
      let result = false;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          result = true;
        }
      });
      return result;
    };
    this.countItems = () => {
      this.totalItems = 0;
      this.host.childNodes.forEach(el => {
        const element = el;
        if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
          if (!element.hasAttribute('multiple')) {
            element.setAttribute('multiple', 'true');
          }
          if (!element.hasAttribute('selectable')) {
            element.setAttribute('selectable', 'true');
          }
          const isItemChecked = this.value.some((valueItem) => this.isOptionsValueEqual(valueItem, element.value));
          if (this.enabledElements.includes(element) || (element.disabled && isItemChecked)) {
            this.totalItems = this.totalItems + 1;
          }
          element.checked = isItemChecked;
        }
      });
      this.isAllSelected = this.totalItems !== 0 && this.activeItems.length === this.totalItems;
    };
    this.handleSlotChange = () => {
      if (this.type === 'multiple' || this.type === 'single') {
        requestAnimationFrame(() => {
          this.countDisplayedItems();
        });
      }
      this.updateScrollState();
      if (this.type === 'multiple') {
        if (!Array.isArray(this.value)) {
          throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
        }
        this.countItems();
        this.setMultipleTextToDisplay();
      }
      else {
        this.host.childNodes.forEach(el => {
          const element = el;
          element.checked = isEqual(this.value, element.value);
        });
      }
    };
    this.getDropdownWidth = (instance) => {
      if (!this.triggerEl)
        return;
      if (this.dropdownWidth !== 'auto') {
        instance.popper.style.width = `${Math.max(this.triggerEl.clientWidth, parseInt(this.dropdownWidth, 10))}px`;
      }
      else {
        instance.popper.style.width = `${this.triggerEl.clientWidth}px`;
      }
    };
    this.labelCssClasses = () => ({
      label: true,
      focused: this.isFocused,
      disabled: this.disabled,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
      filled: !!this.textToDisplay || this.selectedItemsTextList.length > 0,
      'filled-active': (!!this.textToDisplay || this.selectedItemsTextList.length > 0) && !this.isHiddenDropdown,
      'filled-pressed': (!!this.textToDisplay || this.selectedItemsTextList.length > 0) && !!this.isHiddenDropdown && !!this.isFocused,
    });
    this.hasIconStartSlot = false;
    this.isEmpty = false;
    this.isOnSearch = false;
    this.searchText = '';
    this.isAllSelected = false;
    this.isInputFilled = false;
    this.activeItem = undefined;
    this.activeItems = [];
    this.textToDisplay = undefined;
    this.selectedItemsTextList = [];
    this.isFocused = false;
    this.focusType = getInitFocusInfo();
    this.withScroll = false;
    this.isInfiniteLoading = false;
    this.hasClickedBtn = false;
    this.isHiddenDropdown = true;
    this.shouldTruncate = false;
    this.displayedItemsCount = 0;
    this.isInModal = false;
    this.modalRef = undefined;
    this.loading = false;
    this.infinite = false;
    this.infiniteLastPage = true;
    this.loadMore = undefined;
    this.name = undefined;
    this.type = 'single';
    this.value = undefined;
    this.withCustomValue = false;
    this.getOptionId = item => item.id;
    this.getOptionLabel = item => item.label;
    this.inputValue = undefined;
    this.displayValue = undefined;
    this.placeholder = undefined;
    this.required = false;
    this.disabled = false;
    this.withSearch = 'auto';
    this.withFolder = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.maxItemsToDisplay = 2;
    this.dropdownPosition = 'absolute';
    this.ariaProps = {};
    this.dropdownConfig = {};
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.enableStaticOptions = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.locales = {
      emptyText: 'Nothing Found',
      clearAllText: 'Clear All',
      selectAllText: 'Select All',
      searchInputPlaceholder: 'Search',
      allSelectedText: 'All selected',
      selectLabel: 'selected',
    };
    this.dropdownWidth = 'auto';
    this.showSelectAllText = true;
    this.truncate = true;
    this.maximumSelectedItems = undefined;
  }
  handleSelectOptionClick(params) {
    const oldValue = this.value;
    const { target, value } = params.detail;
    if (this.type === 'multiple') {
      const list = (this.value || []);
      if (list.some(val => this.isOptionsValueEqual(val, value))) {
        target.removeAttribute('checked');
        this.isAllSelected = false;
        this.value = list.filter(val => !this.isOptionsValueEqual(val, value));
        this.activeItems = this.activeItems.filter(el => !this.isOptionsValueEqual(el.value, value));
      }
      else {
        target.setAttribute('checked', 'true');
        this.value = [...list, value];
        this.activeItems = [...new Set([...this.activeItems, target])];
      }
      this.setMultipleTextToDisplay();
      this.countItems();
    }
    else {
      this.value = value;
      if (this.type === 'text' && this.truncate) {
        this.shouldTruncate = false;
        setTimeout(() => {
          const textEl = this.host.shadowRoot?.querySelector('[part="text"]');
          if (textEl) {
            this.shouldTruncate = textEl.clientWidth > this.host.clientWidth;
          }
        }, TRUNCATION_DELAY);
      }
    }
    this.inputRef?.focus();
    if (!this.isOptionsValueEqual(oldValue, this.value)) {
      this.type === 'combined'
        ? this.wppChange.emit({
          value: this.value,
          inputValue: this.inputValue,
          name: this.name,
        })
        : this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    if (this.type === 'multiple')
      this.getEnabledItems();
  }
  updateValue(newValue) {
    const stringifiedNewValue = String(newValue);
    if (this.type !== 'multiple' && (!stringifiedNewValue || newValue === undefined)) {
      this.value = '';
      this.activeItem = null;
      this.textToDisplay = '';
    }
    if (this.type === 'multiple' && isEmpty(newValue) && !isEmpty(this.value)) {
      this.handleClearAll();
      return;
    }
    this.totalItems = 0;
    const activeItemsValues = this.activeItems.map(({ value }) => value);
    this.host.childNodes.forEach(el => {
      const element = el;
      if (element.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase()) {
        if (this.type === 'multiple') {
          const isItemChecked = this.value.some((valueItem) => this.isOptionsValueEqual(valueItem, element.value));
          if (!element.disabled || (element.disabled && isItemChecked)) {
            this.totalItems = this.totalItems + 1;
          }
          const list = (this.value || []);
          if (list.some(val => this.isOptionsValueEqual(val, element.value))) {
            element.setAttribute('checked', 'true');
            if (!activeItemsValues.some(val => this.isOptionsValueEqual(val, element.value))) {
              this.activeItems = [...new Set([...this.activeItems, element])];
            }
          }
          else {
            element.removeAttribute('checked');
            this.activeItems = this.activeItems.filter(el => !this.isOptionsValueEqual(el.value, element.value));
          }
        }
        else {
          if (this.isOptionsValueEqual(element.value, newValue)) {
            element.setAttribute('checked', 'true');
            this.activeItem = element;
            const textContent = this.withCustomValue
              ? this.getOptionLabel(this.activeItem.value)
              : this.activeItem.querySelector('[slot="label"]')?.textContent || this.activeItem.textContent || '';
            this.textToDisplay = textContent;
          }
          else {
            element.removeAttribute('checked');
          }
        }
      }
    });
    if (this.type === 'multiple') {
      this.setMultipleTextToDisplay();
      this.validateMaxSelected();
      this.isAllSelected = this.totalItems !== 0 && this.activeItems.length === this.totalItems;
    }
  }
  onUpdateValue(newValue, oldValue) {
    if (this.type === 'multiple' && !Array.isArray(newValue)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    if (this.isOptionsValueEqual(oldValue, newValue) && !isEmpty(newValue) && !this.isAllSelected) {
      return;
    }
    this.updateValue(newValue);
  }
  onLoadingChange(loading) {
    setTimeout(() => {
      this.updateOptions();
    }, 0);
    if (loading) {
      this.scrollOptionsToTop();
      if (this.isInfiniteLoading) {
        this.isInfiniteLoading = false;
        if (this.infiniteLoadingPromise) {
          this.infiniteLoadingPromise.cancelled = true;
        }
      }
    }
    else {
      this.handleSearch(this.searchText);
    }
  }
  /**
   * Sets focus on native input
   */
  async setFocus() {
    setTimeout(() => {
      this.handleLabelClick();
    }, 0);
  }
  /**
   * Update options list programmatically
   */
  async updateOptions() {
    setTimeout(() => {
      this.handleSlotChange();
      this.updateValue(this.value);
    }, 0);
  }
  componentDidLoad() {
    const parentModal = this.findParentModal();
    if (parentModal) {
      this.isInModal = true;
      this.modalRef = parentModal;
      // Apply custom dropdown config for modal only for the case with modal
      Object.assign(this.dropdownConfig, this.customDropdownConfig());
    }
    if (this.type === 'multiple' && !Array.isArray(this.value)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    setTimeout(() => {
      if (['multiple', 'single'].includes(this.type)) {
        this.updateDropdownHeight();
      }
    }, 0);
    window.addEventListener('resize', this.onWindowResize);
    if (!this.enableStaticOptions && this.host) {
      const observer = new MutationObserver(mutationsList => {
        const addedValues = mutationsList
          .flatMap(el => Array.from(el.addedNodes))
          .filter(el => el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase())
          .map(el => el.value);
        const removedValues = mutationsList
          .flatMap(el => Array.from(el.removedNodes))
          .filter(el => el.tagName === transformToVersionedTag(SELECT_OPTION_TAG_NAME).toUpperCase() &&
          !addedValues.find(addedValue => addedValue === el.value))
          .map(el => {
          if (this.type === 'multiple') {
            const htmlEl = el;
            htmlEl.removeAttribute('checked');
          }
          return el.value;
        });
        if (typeof this.value === 'object' && isEmpty(this.value))
          return;
        if (this.canLoadMore())
          return;
        if (this.type === 'multiple') {
          const remainValues = (this.value || []).filter((val) => !removedValues.some(removedVal => removedVal === val));
          this.activeItems = this.activeItems.filter(activeItem => remainValues.find((remainValueItem) => activeItem.value === remainValueItem));
          this.updateValue(remainValues);
          if (!this.isOptionsValueEqual(this.value, remainValues)) {
            this.value = remainValues;
            this.wppChange.emit({
              value: this.value,
              name: this.name,
            });
          }
        }
        else {
          if (removedValues.some(removedVal => removedVal === this.value)) {
            this.updateValue('');
          }
        }
        this.handleSlotChange();
      });
      observer.observe(this.host, { childList: true, subtree: true });
      this.observers.push(observer);
    }
    if (this.type === 'multiple') {
      const placeholderElement = this.inputRef.querySelector('.input-text');
      const mutationObserver = new MutationObserver(this.updateIsFilled);
      const resizeObserver = new ResizeObserver(this.updateIsFilled);
      mutationObserver.observe(placeholderElement, { childList: true });
      this.observers.push(mutationObserver);
      if (resizeObserver) {
        resizeObserver.observe(placeholderElement);
      }
      this.observers.push(resizeObserver);
    }
    if (typeof this.value === 'object' && isEmpty(this.value))
      return;
    this.value = this.value || this.getValueFromDOM();
    this.updateValue(this.value);
    if (this.type === 'multiple') {
      this.countItems();
    }
    requestAnimationFrame(() => {
      if (this.type === 'single' || this.type === 'multiple') {
        this.countDisplayedItems();
      }
      if (this.type === 'text' && this.truncate) {
        const textEl = this.host.shadowRoot?.querySelector('[part="text"]');
        const triggerEl = this.host.shadowRoot?.querySelector('.trigger-element');
        this.shouldTruncate = (triggerEl?.clientWidth || 0) < (textEl?.clientWidth || 0);
      }
    });
    autoFocusElement(this.autoFocus, this.inputRef);
  }
  disconnectedCallback() {
    setHasFocused(false);
    this.observers.forEach((observer, i) => {
      if (observer) {
        observer.disconnect();
        delete this.observers[i];
      }
    });
    window.removeEventListener('resize', this.onWindowResize);
  }
  render() {
    if (this.type === 'single') {
      return renderSingleSelect.call(this);
    }
    if (this.type === 'multiple') {
      return renderMultipleSelect.call(this);
    }
    if (this.type === 'combined') {
      return renderCombinedSelect.call(this);
    }
    return renderTextSelect.call(this);
  }
  static get is() { return "wpp-select"; }
  static get registryIs() { return "wpp-select-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-select.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-select.css"]
    };
  }
  static get properties() {
    return {
      "loading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is loading."
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
      },
      "infinite": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the autocomplete options list has infinite scroll.\nThis prop shouldn't change after the component is rendered."
        },
        "attribute": "infinite",
        "reflect": false,
        "defaultValue": "false"
      },
      "infiniteLastPage": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If infinite scroll can request more pages to load."
        },
        "attribute": "infinite-last-page",
        "reflect": false,
        "defaultValue": "true"
      },
      "loadMore": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "LoadMoreHandler",
          "resolved": "(() => Promise<void>) | undefined",
          "references": {
            "LoadMoreHandler": {
              "location": "import",
              "path": "../wpp-autocomplete/types",
              "id": "src/components/wpp-autocomplete/types.ts::LoadMoreHandler"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Helper that requests to load more options on infinite scroll.\nThis request is considered done when the returned `Promise` is settled.\nThis prop is required when `infinite` is set to `true`."
        }
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input name."
        },
        "attribute": "name",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectTypes",
          "resolved": "\"combined\" | \"multiple\" | \"single\" | \"text\"",
          "references": {
            "SelectTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input type."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'single'"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "SelectValue[] | SelectValue | SelectOption[]",
          "resolved": "any",
          "references": {
            "SelectValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectValue"
            },
            "SelectOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input value."
        },
        "attribute": "value",
        "reflect": false
      },
      "withCustomValue": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component can accept custom value objects.\nAdditionally, the `getOptionId` and `getOptionLabel` property may be overwritten to retrieve the necessary property for object identification."
        },
        "attribute": "with-custom-value",
        "reflect": false,
        "defaultValue": "false"
      },
      "getOptionId": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "GetSelectOptionIdHandler",
          "resolved": "(item: SelectOption) => SelectOptionId",
          "references": {
            "GetSelectOptionIdHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::GetSelectOptionIdHandler"
            },
            "SelectDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets ID values from the select options."
        },
        "defaultValue": "item => (item as SelectDefaultOption).id"
      },
      "getOptionLabel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "GetSelectOptionLabelHandler",
          "resolved": "(item: SelectOption) => string",
          "references": {
            "GetSelectOptionLabelHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::GetSelectOptionLabelHandler"
            },
            "SelectDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets a label for the select options."
        },
        "defaultValue": "item => (item as SelectDefaultOption).label"
      },
      "inputValue": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the combined input value."
        },
        "attribute": "input-value",
        "reflect": false
      },
      "displayValue": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the displayed input value. If provided overrides the existing displayed value"
        },
        "attribute": "display-value",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the input is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "withSearch": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "boolean | 'auto'",
          "resolved": "\"auto\" | boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true` the search field will appear. The default value 'auto' displays the search\nonly when the number of items displayed is >= 10."
        },
        "attribute": "with-search",
        "reflect": true,
        "defaultValue": "'auto'"
      },
      "withFolder": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true` the dropdown has controls folder."
        },
        "attribute": "with-folder",
        "reflect": true,
        "defaultValue": "false"
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the input should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SelectSize",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "SelectSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message."
        },
        "attribute": "message",
        "reflect": false
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputMessageTypes",
          "resolved": "\"error\" | \"warning\" | undefined",
          "references": {
            "InputMessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::InputMessageTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message type."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "maxMessageLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input message maximum length."
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "maxItemsToDisplay": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines multiple select, maximum selected items to show."
        },
        "attribute": "max-items-to-display",
        "reflect": false,
        "defaultValue": "2"
      },
      "dropdownPosition": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ListPosition",
          "resolved": "\"absolute\" | \"fixed\"",
          "references": {
            "ListPosition": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::ListPosition"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown CSS position. If you want to overlay `overflow: hidden`, use `fixed`."
        },
        "attribute": "dropdown-position",
        "reflect": false,
        "defaultValue": "'absolute'"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the component `aria-` props."
        },
        "defaultValue": "{}"
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SelectLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "SelectLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "enableStaticOptions": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If true, wouldn't update `select` on `options` change"
        },
        "attribute": "enable-static-options",
        "reflect": false,
        "defaultValue": "false"
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SelectLocaleInterface",
          "resolved": "SelectLocaleInterface",
          "references": {
            "SelectLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{\n    emptyText: 'Nothing Found',\n    clearAllText: 'Clear All',\n    selectAllText: 'Select All',\n    searchInputPlaceholder: 'Search',\n    allSelectedText: 'All selected',\n    selectLabel: 'selected',\n  }"
      },
      "dropdownWidth": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown width. The width of the dropdown cannot be smaller than the width of the trigger element."
        },
        "attribute": "dropdown-width",
        "reflect": false,
        "defaultValue": "'auto'"
      },
      "showSelectAllText": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If 'true', instead of displaying comma-separated values, the input should show the text \"All selected\"\nwhen all options in the multi-select are selected."
        },
        "attribute": "show-select-all-text",
        "reflect": false,
        "defaultValue": "true"
      },
      "truncate": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Used to control whether or not the selected value from a text-select should be truncated with an ellipsis (three dots)\nto fit within a specified width. If set to false, the selected value from the text-select may appear on\nmultiple lines. If set to true (which is the default), the content will always be on 1 line and will be truncated."
        },
        "attribute": "truncate",
        "reflect": false,
        "defaultValue": "true"
      },
      "maximumSelectedItems": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the maximum number of items the user can select in a dropdown. If the maximum number is reached, the other items are disabled."
        },
        "attribute": "maximum-selected-items",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {},
      "isEmpty": {},
      "isOnSearch": {},
      "searchText": {},
      "isAllSelected": {},
      "isInputFilled": {},
      "activeItem": {},
      "activeItems": {},
      "textToDisplay": {},
      "selectedItemsTextList": {},
      "isFocused": {},
      "focusType": {},
      "withScroll": {},
      "isInfiniteLoading": {},
      "hasClickedBtn": {},
      "isHiddenDropdown": {},
      "shouldTruncate": {},
      "displayedItemsCount": {},
      "isInModal": {},
      "modalRef": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an input value changes."
        },
        "complexType": {
          "original": "SelectChangeEventDetail",
          "resolved": "BaseFormControlEventDetail<any> & { name?: string | undefined; } | CombinedSelectControl<any> & { name?: string | undefined; }",
          "references": {
            "SelectChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppSearchValueChange",
        "name": "wppSearchValueChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the search value changes"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets focus on native input",
          "tags": []
        }
      },
      "updateOptions": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Update options list programmatically",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onUpdateValue"
      }, {
        "propName": "loading",
        "methodName": "onLoadingChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppChangeListItem",
        "method": "handleSelectOptionClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}

import { Fragment, h, Host } from '@stencil/core';
import { isEqual } from 'lodash';
import { FOCUS_TYPE } from '../../types/common';
import { menuListConfig } from '../../common/menuListConfig';
import { debounce, isEventTargetContained, selectDropdownWidth } from '../../utils/utils';
import { DEFAULT_DROPDOWN_CONFIG, INFINITE_SCROLL_THRESHOLD, LOCALES_DEFAULTS, PILL_MARGIN } from './const';
import { isSelected, selectedOptionsByOrder } from './utils';
import { renderDropdownPillsComponent } from './components/wpp-dropdown-pills';
import { renderPlaceholderTextComponent } from './components/wpp-placeholder-text';
import { renderDropdownListComponent } from './components/wpp-dropdown-list';
import { renderExtendedSelectedValuesComponent } from './components/wpp-extended-selected-values';
import { renderCreateNewOptionComponent } from './components/wpp-create-new-option';
export class WppAutocomplete {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    this.selectedPillRefs = [];
    this.withPills = false;
    this.activeListNdx = null;
    this.activeSuggestionNdx = null;
    this.listItemsRefs = [];
    this.suggestionsItemsRefs = [];
    this.preventBlur = false;
    /**
     * Observers
     */
    this.setupResizeObserver = () => {
      this.resizeObserver = new ResizeObserver(debounce(() => {
        this.countHiddenElements();
        this.tippyInstance?.popper.style.setProperty('--custom-dropdown-width', this.getDropdownWidth());
      }, 100));
      this.resizeObserver?.observe(this.host);
    };
    /**
     * Dropdown methods
     */
    this.createTippyInstance = () => {
      if (!this.triggerRef || !this.dropdownRef)
        return;
      this.tippyInstance = menuListConfig({
        anchor: this.triggerRef,
        content: this.dropdownRef,
        ...DEFAULT_DROPDOWN_CONFIG,
        ...this.dropdownConfig,
        onShow: (instance) => {
          instance.popper.style.setProperty('--custom-dropdown-width', this.getDropdownWidth());
          if (this.value.length && this.withPills)
            requestAnimationFrame(this.validateTruncatedPills);
          // Re-position in case it was not position correctly initially.
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 0);
          if (this.dropdownConfig?.onShow) {
            this.dropdownConfig?.onShow(instance);
          }
        },
        onShown: (instance) => {
          if (this.dropdownConfig?.onShown) {
            this.dropdownConfig?.onShown(instance);
          }
        },
        onHide: (instance) => {
          if (!this.isShowMore)
            this.isShowMore = true;
          this.updatePlaceholderText();
          if (this.dropdownConfig?.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: () => {
          if (this.multiple && this.value.length && !this.persistentSearch && !this.simpleSearch) {
            this.handleListChange(this.internalList.map(item => ({ ...item, hidden: true })));
            this.visibleOptionsLength = 0;
          }
        },
        onClickOutside: (instance, event) => {
          if (isEventTargetContained(this.host, event))
            return;
          instance.hide();
          this.isDropdownShown = false;
          if (this.dropdownConfig?.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
      });
    };
    this.showDropdown = () => {
      if (!this.tippyInstance)
        return;
      /**
       * Need to show dropdown only in cases:
       * 1. When we have selected option(s) and multiple props are `true` or have searchText
       * 2. When we have searchText with: extended autocomplete type or single autocomplete type
       */
      const hasSearch = this.searchText.length > 0;
      const hasSelection = this.value.length > 0;
      const shouldShow = (this.multiple && (hasSelection || hasSearch)) ||
        ((this.type === 'extended' || !this.multiple) && hasSearch) ||
        (!!this.componentSuggestions.length && !this.searchText.trim().length);
      this.isDropdownShown = shouldShow;
      shouldShow ? this.tippyInstance.show() : this.hideDropdown();
    };
    this.hideDropdown = () => {
      if (!this.tippyInstance)
        return;
      if (this.isDropdownShown)
        this.isDropdownShown = false;
      if (this.tippyInstance.state.isShown) {
        this.tippyInstance.hide();
        this.clearActive();
      }
    };
    /**
     * List items click handlers
     */
    this.handleClickListItem = (event) => {
      const clickedValue = event.detail.value;
      if (clickedValue === undefined)
        return;
      this.multiple ? this.onClickListItemMultiple(clickedValue) : this.onClickListItemSingle(clickedValue);
      this.checkListAgainstValue();
    };
    this.onClickListItemSingle = (listItemValue) => {
      const current = this.value?.[0];
      let isSame = false;
      if (this.getItemKey && typeof current === 'object' && typeof listItemValue === 'object') {
        isSame = this.getItemKey(current) === this.getItemKey(listItemValue);
      }
      else {
        isSame = isEqual(current, listItemValue);
      }
      if (!isSame) {
        this.value = [listItemValue];
        this.wppChange.emit({
          value: this.value,
          selectedOptions: listItemValue.length > 0 ? this.internalList.filter(e => e.checked) : [],
          reason: 'selectOption',
          name: this.name,
        });
      }
      if (!this.persistentSearch) {
        this.searchText = '';
      }
      else {
        this.isInputValueTransparent = true;
        this.onSearchTextChange(this.searchText);
      }
      this.isFocused = false;
      this.preventBlur = true;
      this.inputRef?.blur();
      this.hideDropdown();
    };
    this.onClickListItemMultiple = (listItemValue) => {
      const already = isSelected(this.value, listItemValue, this.getItemKey);
      let next;
      if (already) {
        next = this.value.filter(v => {
          if (this.getItemKey) {
            const vKey = typeof v === 'object' ? this.getItemKey(v) : v;
            const itemKey = typeof listItemValue === 'object' ? this.getItemKey(listItemValue) : listItemValue;
            return vKey !== itemKey;
          }
          return !isEqual(v, listItemValue);
        });
      }
      else {
        next = [...this.value, listItemValue];
      }
      if (!already && this.isSelectedItemsLimitReached(this.value))
        return;
      if (!isEqual(this.value, next)) {
        this.value = next;
        this.wppChange.emit({
          value: next,
          selectedOptions: next.length > 0 ? this.internalList.filter(e => e.checked) : [],
          reason: already ? 'removeOption' : 'selectOption',
          name: this.name,
        });
      }
    };
    /**
     * Component handlers
     */
    this.handleInput = () => {
      this.showDropdown();
    };
    this.handleFocus = (event) => {
      this.isInputValueTransparent = false;
      if (!this.isFocused) {
        this.isFocused = true;
        if (this.canLoadMore() && !this.selectedOptions.length && !this.loading && this.searchText.length > 0) {
          this.requestLoadMore();
        }
      }
      this.showDropdown();
      if (event)
        this.wppFocus.emit(event);
    };
    this.handleBlur = (event, options) => {
      if (this.preventBlur) {
        this.triggerRef?.focus();
        this.preventBlur = false;
        return;
      }
      const nextTarget = event?.relatedTarget ??
        event?.composedPath?.()?.[0] ??
        document.activeElement;
      // If focus remains inside the component (host or dropdown) and this isn’t forced, skip blur
      if (!options?.force && nextTarget && (this.host?.contains(nextTarget) || this.dropdownRef?.contains(nextTarget)))
        return;
      this.isInputValueTransparent = !!this.value.length;
      this.focusType = FOCUS_TYPE.NONE;
      this.isFocused = false;
      !this.persistentSearch ? (this.searchText = '') : this.onSearchTextChange(this.searchText);
      this.hideDropdown();
      this.wppBlur.emit();
    };
    this.handleCrossIconFocus = () => {
      this.isInputValueTransparent = true;
      this.isFocused = false;
      this.hideDropdown();
    };
    this.handleCrossIconKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleClearClick(event);
        this.setFocus();
      }
    };
    this.handleTriggerClick = () => {
      if (this.disabled)
        return;
      if (!this.isFocused)
        this.isFocused = true;
      this.setFocus();
    };
    this.handleSearch = (event) => {
      const searchValue = event.detail.value;
      if (searchValue === undefined) {
        this.searchText = '';
        return;
      }
      this.searchText = searchValue;
    };
    this.handleListChange = (list) => {
      if (!list) {
        this.checkListAgainstValue();
        return;
      }
      this.internalList = list;
      this.checkListAgainstValue();
      this.checkVisibleOptionsLength(list);
    };
    this.handleClearClick = (event) => {
      event.stopPropagation();
      this.value = [];
      this.placeholderText = undefined;
      this.hiddenSelectedOptionsNumber = 0;
      this.checkListAgainstValue();
      this.setFocus();
      this.wppChange.emit({
        value: this.value,
        selectedOptions: [],
        reason: 'removeOption',
        name: this.name,
      });
    };
    this.handleOptionsScroll = (event) => {
      if (!this.canLoadMore())
        return;
      const container = event.target;
      const scrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop;
      if (scrolledToBottom < INFINITE_SCROLL_THRESHOLD)
        this.requestLoadMore();
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onKeyDown = (event) => {
      if (!this.isFocused)
        return;
      switch (event.key) {
        case 'Escape': {
          this.handleBlur();
          return;
        }
        case 'ArrowDown': {
          event.preventDefault();
          const src = this.getVisibleSource();
          if (!src)
            return;
          const prev = src === 'list' ? this.activeListNdx : this.activeSuggestionNdx;
          const next = this.findNextActiveNdx(prev, 1, src);
          if (src === 'list')
            this.activeListNdx = next;
          else
            this.activeSuggestionNdx = next;
          this.setActiveClass(src, prev, next);
          return;
        }
        case 'ArrowUp': {
          event.preventDefault();
          const src = this.getVisibleSource();
          if (!src)
            return;
          const prev = src === 'list' ? this.activeListNdx : this.activeSuggestionNdx;
          const next = this.findNextActiveNdx(prev, -1, src);
          if (src === 'list')
            this.activeListNdx = next;
          else
            this.activeSuggestionNdx = next;
          this.setActiveClass(src, prev, next);
          return;
        }
        case 'Enter': {
          const src = this.getVisibleSource();
          const ndx = src === 'list' ? this.clampListNdx(this.activeListNdx) : this.clampListNdx(this.activeSuggestionNdx);
          if (src == null || ndx == null)
            return;
          const item = src === 'list' ? this.internalList[ndx] : this.componentSuggestions[ndx];
          if (item && this.isListItemVisible(item)) {
            event.preventDefault();
            const val = item.value;
            if (!val)
              return;
            this.multiple ? this.onClickListItemMultiple(val) : this.onClickListItemSingle(val);
            this.checkListAgainstValue();
          }
        }
      }
    };
    /**
     * Validators
     */
    this.checkListAgainstValue = () => {
      const next = this.internalList?.map(item => ({
        ...item,
        checked: isSelected(this.value, item, this.getItemKey),
      }));
      if (next && !isEqual(next, this.internalList))
        this.internalList = next;
      const mergeByKey = (arr = []) => {
        const map = new Map();
        arr.forEach(it => {
          const key = typeof it.value === 'object' ? this.getItemKey?.(it.value) : it.value;
          map.set(key, it);
        });
        return map;
      };
      // merge internalList first, then suggestions (list should win on collisions)
      const listMap = mergeByKey(this.internalList);
      const sugMap = mergeByKey(this.componentSuggestions);
      const mergedMap = new Map(listMap);
      sugMap.forEach((val, key) => {
        if (!mergedMap.has(key))
          mergedMap.set(key, val);
      });
      const mergedSource = Array.from(mergedMap.values());
      const _selectedOptions = selectedOptionsByOrder(mergedSource, this.value, this.getItemKey);
      this.selectedOptions = _selectedOptions;
      if (this.type === 'extended') {
        this.extendedSelectedValues = _selectedOptions;
      }
      else {
        this.updatePlaceholderText();
      }
      if (this.withPills && !!_selectedOptions.length)
        requestAnimationFrame(this.validateTruncatedPills);
    };
    this.checkVisibleOptionsLength = (source) => {
      if (this.searchText.trim().length > 0) {
        this.visibleOptionsLength = source?.filter(item => !item.hidden).length;
      }
      else {
        this.visibleOptionsLength = 0;
      }
    };
    /**
     * Render methods
     */
    this.renderPlaceholderText = () => renderPlaceholderTextComponent.call(this);
    this.renderDropdownPills = () => renderDropdownPillsComponent.call(this);
    this.renderDropdownList = () => renderDropdownListComponent.call(this);
    this.renderExtendedSelectedValues = () => renderExtendedSelectedValuesComponent.call(this);
    this.renderCreateNewElement = () => renderCreateNewOptionComponent.call(this);
    /**
     * Infinity Loading methods
     */
    this.requestLoadMore = () => {
      if (!this.loadMore)
        return;
      this.isInfiniteLoading = true;
      const promise = this.loadMore().finally(() => {
        if (!promise.cancelled) {
          this.isInfiniteLoading = false;
          this.infiniteLoadingPromise = undefined;
        }
      });
      this.infiniteLoadingPromise = promise;
    };
    /**
     * Helper methods
     */
    this.getDropdownWidth = () => {
      if (this.dropdownWidth === 'auto') {
        return this.triggerRef ? `${this.triggerRef.offsetWidth}px` : `${this.host.offsetWidth}px`;
      }
      return selectDropdownWidth(this.dropdownWidth, this.triggerRef, this.host);
    };
    this.canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading;
    this.isSelectedItemsLimitReached = (value) => !(this.limitSelectedItems <= 0 || value.length < this.limitSelectedItems);
    /**
     * Placeholder methods
     */
    this.getHiddenCountElWidth = (num) => {
      if (!this.hiddenInputPlaceholderRef)
        return 0;
      this.hiddenInputPlaceholderRef.textContent = `, +${num}`;
      return this.hiddenInputPlaceholderRef.clientWidth;
    };
    this.countHiddenElements = () => {
      if (!this.multiple)
        return;
      if (!this.value.length || !this.triggerRef || !this.inputPlaceholderRef || !this.hiddenInputPlaceholderRef)
        return;
      // Reset to get an accurate base measurement
      this.triggerRef.style.setProperty('--hidden-count-width', '0px');
      const baseMaxWidth = this.inputPlaceholderRef.clientWidth;
      // Buffer to account for CSS ellipsis
      const TRUNCATION_BUFFER = 14;
      let displayedElements = 0;
      let currentLabel = '';
      for (let i = 0; i < this.selectedOptions.length; i++) {
        const nextLabel = currentLabel
          ? `${currentLabel}, ${this.selectedOptions[i].label}`
          : this.selectedOptions[i].label;
        this.hiddenInputPlaceholderRef.textContent = nextLabel;
        const nextLabelWidth = this.hiddenInputPlaceholderRef.clientWidth;
        const remainingItems = this.selectedOptions.length - (i + 1);
        // All items fit without truncation
        if (remainingItems === 0) {
          if (nextLabelWidth + TRUNCATION_BUFFER <= baseMaxWidth) {
            this.hiddenSelectedOptionsNumber = 0;
            this.triggerRef.style.setProperty('--hidden-count-width', '0px');
            return;
          }
          // The last item doesn't fit, use previous displayed count
          break;
        }
        if (remainingItems === 1) {
          // Try to fit all items without a hidden count
          this.hiddenInputPlaceholderRef.textContent = `${nextLabel}, ${this.selectedOptions[i + 1].label}`;
          const allLabelWidth = this.hiddenInputPlaceholderRef.clientWidth;
          if (allLabelWidth + TRUNCATION_BUFFER <= baseMaxWidth) {
            this.hiddenSelectedOptionsNumber = 0;
            this.triggerRef.style.setProperty('--hidden-count-width', '0px');
            return;
          }
          // Try with hidden count "+1"
          const hiddenCountWidth = this.getHiddenCountElWidth(1);
          if (nextLabelWidth + TRUNCATION_BUFFER <= baseMaxWidth - hiddenCountWidth) {
            this.triggerRef.style.setProperty('--hidden-count-width', `${hiddenCountWidth}px`);
            this.hiddenSelectedOptionsNumber = 1;
            return;
          }
          // Doesn't fit, use previous state
          break;
        }
        // Check if the next item fits with space for hidden count
        const hiddenCountWidth = this.getHiddenCountElWidth(remainingItems);
        if (nextLabelWidth + TRUNCATION_BUFFER <= baseMaxWidth - hiddenCountWidth) {
          currentLabel = nextLabel;
          displayedElements = i + 1;
        }
        else {
          // overflow - stop here
          break;
        }
      }
      const finalHiddenCount = this.selectedOptions.length - displayedElements;
      if (finalHiddenCount > 0) {
        const finalHiddenCountWidth = this.getHiddenCountElWidth(finalHiddenCount);
        this.triggerRef.style.setProperty('--hidden-count-width', `${finalHiddenCountWidth}px`);
        this.hiddenSelectedOptionsNumber = finalHiddenCount;
      }
      else {
        this.triggerRef.style.setProperty('--hidden-count-width', '0px');
        this.hiddenSelectedOptionsNumber = 0;
      }
    };
    this.updatePlaceholderText = () => {
      /**
       * Do not set the placeholder in cases:
       * - when input is focused
       * - when input has no value
       * - when dropdown is shown
       */
      if (!this.value.length) {
        this.placeholderText = undefined;
        return;
      }
      this.placeholderText =
        this.type === 'extended'
          ? this._locales.selected(this.value.length)
          : this.selectedOptions
            .map(el => el.label)
            .filter(Boolean)
            .join(', ');
    };
    /**
     * Dropdown Pills methods
     */
    /**
     * Validate each WppPill if it has a truncated text label inside or WppPill got truncated when it's in `showMore` mode
     */
    this.validateTruncatedPills = () => {
      if (!this.tippyInstance ||
        !this.dropdownRef ||
        !this.selectedPillsWrapperRef ||
        !this.headerWrapperRef ||
        !this.showMoreElementRef ||
        !this.isDropdownShown)
        return;
      const pillsElements = (this.selectedPillRefs || []).filter(Boolean);
      if (!pillsElements.length)
        return;
      // When Show more is active, we need to check if we have one or multi-line pills
      // in single-line mode, we need to toggle Show More value and hide Show Less button
      if (!this.isShowMore) {
        const wrapperHeight = parseFloat(getComputedStyle(this.selectedPillsWrapperRef).height);
        const firstChildHeight = pillsElements[0].getBoundingClientRect().height;
        if (wrapperHeight !== firstChildHeight)
          return;
        this.isShowMore = true;
      }
      this.headerWrapperRef.style.setProperty('--pills-wrapper-width', '100%');
      const dropdownRight = this.dropdownRef.getBoundingClientRect().right;
      const showMoreWidth = this.showMoreElementRef.clientWidth;
      const thresholdWithLabel = dropdownRight - showMoreWidth - PILL_MARGIN;
      let firstTruncationFound = false;
      // Single pass measurement
      const truncationData = pillsElements.map((pill, ndx) => {
        if (firstTruncationFound) {
          return {
            base: true,
            withLabel: true,
          };
        }
        const pillRight = pill.getBoundingClientRect().right;
        const base = pillRight >= dropdownRight;
        const withLabel = pillRight >= thresholdWithLabel;
        // If met truncation, the next pills will go outside of dropdown width and next calculations is not needed.
        if (base || withLabel) {
          firstTruncationFound = true;
          if (ndx === 0)
            return { base: false, withLabel: false };
        }
        return { base, withLabel };
      });
      const isPillsTruncated = truncationData.some(d => d.base);
      if (!isPillsTruncated) {
        this.activePillsTruncationState = truncationData.map(d => d.base);
        return;
      }
      this.activePillsTruncationState = truncationData.map(d => d.withLabel);
      // Adjust width for "+n more" positioning (single-line mode only)
      const visibleCount = truncationData.filter(d => !d.withLabel).length;
      const visiblePills = pillsElements.slice(0, visibleCount);
      const totalWidth = visiblePills.reduce((acc, pill) => acc + pill.getBoundingClientRect().width, 0) +
        Math.max(0, visibleCount - 1) * PILL_MARGIN;
      this.headerWrapperRef.style.setProperty('--pills-wrapper-width', `${totalWidth}px`);
    };
    this.handleShowMoreLessClick = () => {
      this.isShowMore = !this.isShowMore;
      this.setFocus();
    };
    /**
     * Accessibility Methods
     */
    this.getVisibleSource = () => {
      if (this.loading)
        return;
      const search = !!this.searchText.trim().length;
      if (!search && this.componentSuggestions.length)
        return 'suggestions';
      return 'list';
    };
    this.isListItemVisible = (item) => !item.hidden && !item.disabled;
    this.clampListNdx = (ndx) => {
      if (ndx == null)
        return null;
      const n = this.internalList.length ?? 0;
      if (!n)
        return null;
      if (ndx < 0)
        return null;
      if (ndx >= n)
        return n - 1;
      return ndx;
    };
    this.findNextActiveNdx = (from, step, source) => {
      const list = source === 'list' ? this.internalList : this.componentSuggestions;
      const n = list.length;
      if (!n)
        return null;
      let i = from == null ? (step === 1 ? 0 : n - 1) : from + step;
      while (i >= 0 && i < n) {
        const item = list[i];
        if (item && !item.hidden && !item.disabled)
          return i;
        i += step;
      }
      return from;
    };
    this.setActiveClass = (source, prev, next) => {
      const arr = source === 'list' ? this.listItemsRefs : this.suggestionsItemsRefs;
      if (prev != null && arr[prev]) {
        arr[prev].classList.remove('tab-focus');
        arr[prev].removeAttribute('aria-selected');
      }
      if (next != null && arr[next]) {
        arr[next].classList.add('tab-focus');
        arr[next].setAttribute('aria-selected', 'true');
        arr[next].scrollIntoView({ block: 'nearest' });
      }
    };
    this.clearActive = () => {
      if (this.activeListNdx != null)
        this.listItemsRefs[this.activeListNdx]?.classList.remove('tab-focus');
      if (this.activeSuggestionNdx != null)
        this.suggestionsItemsRefs[this.activeSuggestionNdx]?.classList.remove('tab-focus');
      this.activeListNdx = null;
      this.activeSuggestionNdx = null;
    };
    /**
     * CSS Classes Methods
     */
    this.hostCssClasses = () => ({
      'wpp-autocomplete': true,
    });
    this.labelCssClasses = () => ({
      label: true,
    });
    this.triggerCssClasses = () => ({
      trigger: true,
      disabled: this.disabled,
      focused: this.isFocused,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: !!this.size,
      single: !this.multiple,
    });
    this.inputCssClasses = () => ({
      hidden: !this.isFocused && !!this.value.length,
      transparent: this.isInputValueTransparent,
    });
    this.dropdownCssClasses = () => ({
      'wpp-autocomplete-dropdown': true,
      'wpp-empty-list': !this.visibleOptionsLength && this.searchText.length === 0 && !this.componentSuggestions.length,
    });
    this.iconCrossCssClasses = () => ({
      'wpp-hidden': this.value.length === 0 || this.isDropdownShown || this.isFocused || !this.multiple,
    });
    this.isFocused = false;
    this.isDropdownShown = false;
    this.isInfiniteLoading = false;
    this.internalList = undefined;
    this.placeholderText = undefined;
    this.searchText = '';
    this.visibleOptionsLength = 0;
    this.selectedOptions = [];
    this.extendedSelectedValues = [];
    this.hiddenSelectedOptionsNumber = 0;
    this.hiddenCountElWidth = 0;
    this.activePillsTruncationState = [];
    this.isShowMore = true;
    this.componentSuggestions = [];
    this.activeNdx = -1;
    this.activeSourceList = 'list';
    this.focusType = undefined;
    this.isInputValueTransparent = false;
    this.labelConfig = undefined;
    this.name = undefined;
    this.autoFocus = false;
    this.disabled = false;
    this.required = false;
    this.loading = false;
    this.infinite = false;
    this.infiniteLastPage = true;
    this.loadMore = undefined;
    this.labelTooltipConfig = {};
    this.placeholder = undefined;
    this.size = 'm';
    this.multiple = false;
    this.type = 'regular';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.simpleSearch = false;
    this.persistentSearch = false;
    this.showCreateNewElement = false;
    this.displayBtnWhenListEmpty = true;
    this.dropdownConfig = {};
    this.pillTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
      placement: 'right',
    };
    this.dropdownWidth = 'auto';
    this.list = [];
    this.suggestions = [];
    this.value = [];
    this.limitSelectedItems = 0;
    this.locales = {};
    this.getItemKey = undefined;
    this.ariaProps = {};
  }
  onValueChange(nextValue) {
    if (this.limitSelectedItems > 0 && nextValue.length > this.limitSelectedItems) {
      const slicedValue = nextValue.slice(0, this.limitSelectedItems);
      if (!isEqual(this.value, slicedValue)) {
        this.value = slicedValue;
        this.wppChange.emit({
          value: this.value,
          selectedOptions: this.selectedOptions.slice(0, this.limitSelectedItems),
          reason: 'removeOption',
          name: this.name,
        });
        return;
      }
    }
    if (this.isSelectedItemsLimitReached(nextValue) && this.isFocused) {
      this.handleBlur(undefined, { force: true });
    }
    this.checkListAgainstValue();
  }
  onSearchTextChange(searchText) {
    this.clearActive();
    const trimmed = searchText.trim();
    const query = trimmed.toLowerCase();
    let countVisibleOptions = searchText.length === 0 ? 0 : this.simpleSearch ? 0 : this.internalList.length;
    this.wppSearchValueChange.emit(trimmed);
    const next = this.internalList?.map(item => {
      const labelStr = (item.label ?? (typeof item.value === 'string' ? item.value : '')).toString();
      const match = query !== '' ? labelStr.toLowerCase().includes(query) : !this.simpleSearch;
      if (this.simpleSearch)
        countVisibleOptions += match ? 1 : 0;
      return {
        ...item,
        hidden: this.simpleSearch ? !match : searchText.length === 0,
        highlight: trimmed,
      };
    });
    this.visibleOptionsLength = countVisibleOptions;
    if (isEqual(next, this.internalList))
      return;
    this.internalList = next;
    if (this.isFocused)
      this.showDropdown();
  }
  onListChange(nextList) {
    const trimmedSearch = this.searchText.trim();
    const normalized = (nextList ?? []).map(item => ({
      ...item,
      hidden: this.simpleSearch || trimmedSearch.length === 0,
      checked: isSelected(this.value, item, this.getItemKey),
      highlight: trimmedSearch,
    }));
    this.handleListChange(normalized);
  }
  onPlaceholderTextChange() {
    if (this.type !== 'regular')
      return;
    this.countHiddenElements();
  }
  onShowMoreChange(isShowMore) {
    if (isShowMore) {
      setTimeout(this.validateTruncatedPills, 0);
    }
    else {
      this.selectedPillRefs?.forEach(el => el?.classList.remove('transparent'));
    }
  }
  onExtendedSelectedValuesChange() {
    this.updatePlaceholderText();
  }
  onSuggestionsChange(nextSuggestions) {
    if (this.searchText !== '')
      return;
    this.componentSuggestions = (nextSuggestions ?? []).map(({ checked: _ignore, ...rest }) => ({
      ...rest,
      hidden: false,
    }));
    this.handleListChange();
    if (this.isFocused)
      this.showDropdown();
  }
  onLoadingChange(loading) {
    if (!loading || !this.isInfiniteLoading)
      return;
    this.isInfiniteLoading = false;
    if (!this.infiniteLoadingPromise)
      return;
    this.infiniteLoadingPromise.cancelled = true;
  }
  /**
   * Sets focus on native input
   */
  async setFocus(isOutlined) {
    if (!this.isFocused)
      this.isFocused = true;
    requestAnimationFrame(() => {
      this.inputRef?.setFocus(isOutlined);
      this.handleFocus();
    });
  }
  componentWillLoad() {
    if (this.limitSelectedItems > 0 && !this.multiple) {
      throw new Error('There could be only one selected item in single mode, otherwise, use multiple mode.');
    }
    this._locales = { ...this._locales, ...this.locales };
    this.withPills = this.type === 'regular' && this.multiple;
    const normalized = (this.list ?? []).map(item => ({
      ...item,
      hidden: this.simpleSearch || this.searchText.length === 0,
      checked: isSelected(this.value, item, this.getItemKey),
    }));
    this.componentSuggestions = (this.suggestions ?? []).map(({ checked: _ignore, ...rest }) => ({
      ...rest,
      hidden: false,
    }));
    this.handleListChange(normalized);
  }
  componentDidLoad() {
    this.createTippyInstance();
    if (this.type === 'regular')
      this.setupResizeObserver();
    this.checkListAgainstValue();
    if (this.autoFocus)
      this.setFocus(true);
  }
  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.tippyInstance?.destroy();
    this.resizeObserver?.disconnect();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.handleBlur, onKeyUp: this.onKeyUp, exportparts: "input, dropdown, trigger, label" }, this.labelConfig?.text && (h("wpp-label-v4-0-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleTriggerClick })), h("div", { ref: ref => (this.triggerRef = ref), tabindex: -1, class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, this.renderPlaceholderText(), h("wpp-input-v4-0-0", { ref: ref => (this.inputRef = ref), part: "input", type: "text", role: "combobox", "aria-autocomplete": "list", "aria-expanded": this.isDropdownShown.toString(), "aria-controls": `${this.name}-listbox`, autocomplete: "off", class: this.inputCssClasses(), id: this.name, name: this.name, value: this.searchText, onWppChange: this.handleSearch, disabled: this.disabled, required: this.required, placeholder: this.isFocused || this.isDropdownShown || this.value.length > 0 || this.searchText.trim().length > 0
        ? undefined
        : this.placeholder, onInput: this.handleInput, onFocus: this.handleFocus, onKeyDown: this.onKeyDown, size: this.size, withCrossIcon: false, ariaProps: {
        activedescendant: true,
      } }), this.multiple && (h("wpp-icon-cross-v4-0-0", { class: this.iconCrossCssClasses(), role: "button", "aria-label": this.multiple ? this._locales.clearMultiple : this._locales.clearSingle, tabindex: this.value.length > 0 && this.multiple ? 0 : -1, onClick: this.handleClearClick, onFocus: this.handleCrossIconFocus, onKeyDown: this.handleCrossIconKeyDown }))), h("div", { ref: ref => (this.dropdownRef = ref), class: this.dropdownCssClasses(), part: "dropdown" }, this.isDropdownShown ? (h(Fragment, null, this.type === 'regular' && this.multiple ? this.renderDropdownPills() : null, h("div", { class: "wpp-autocomplete-dropdown-list", onMouseDown: e => e.preventDefault(), onScroll: this.handleOptionsScroll, id: `${this.name}-listbox`, role: "listbox", "aria-label": this.ariaProps?.label, "aria-busy": this.isInfiniteLoading || this.loading }, this.renderDropdownList()), this.renderCreateNewElement())) : null), !!this.message && (h("wpp-inline-message-v4-0-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType })), this.type === 'extended' && this.multiple ? this.renderExtendedSelectedValues() : null));
  }
  static get is() { return "wpp-autocomplete"; }
  static get registryIs() { return "wpp-autocomplete-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-autocomplete.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-autocomplete.css"]
    };
  }
  static get properties() {
    return {
      "labelConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../wpp-label/types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
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
          "text": "Defines the autocomplete name."
        },
        "attribute": "name",
        "reflect": false
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
          "text": "If `true`, the component should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
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
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "If `true`, the input is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
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
          "text": "If the autocomplete options list has infinite scroll.\nThis overrides the `simpleSearch` prop and considers it as `false`.\nThis prop shouldn't change after the component is rendered."
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
              "path": "./types",
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
        "defaultValue": "{}"
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
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'m' | 's'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
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
      "multiple": {
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
          "text": "If `true`, the autocomplete will give the possibility to select multiple options"
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "false"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AutocompleteTypes",
          "resolved": "\"extended\" | \"regular\"",
          "references": {
            "AutocompleteTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the autocomplete type."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'regular'"
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
      "simpleSearch": {
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
          "text": "If `true`, autocomplete automatically filters options on search instead of relying on updates of the slotted options list.\nThis prop shouldn't change after the component is rendered."
        },
        "attribute": "simple-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "persistentSearch": {
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
          "text": "If `true`, the search will be persistent and will not be cleared on losing the focus."
        },
        "attribute": "persistent-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "showCreateNewElement": {
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
          "text": "If `true`, the autocomplete will show the \"Create new element\" button. 'displayBtnWhenListEmpty' prop controls when it will be displayed."
        },
        "attribute": "show-create-new-element",
        "reflect": false,
        "defaultValue": "false"
      },
      "displayBtnWhenListEmpty": {
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
          "text": "Controls when the \"Create new element\" button is displayed. By default, it is true, meaning that it will be displayed only when\nthe list is empty. If set to \"false\", then the button will always be displayed."
        },
        "attribute": "display-btn-when-list-empty",
        "reflect": false,
        "defaultValue": "true"
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
      "pillTooltipConfig": {
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
          "text": "Tooltip config for WppPill's, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n    placement: 'right',\n  }"
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
          "text": "Defines the dropdown width."
        },
        "attribute": "dropdown-width",
        "reflect": false,
        "defaultValue": "'auto'"
      },
      "list": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ListItemInterface[]",
          "resolved": "ListItemInterface[]",
          "references": {
            "ListItemInterface": {
              "location": "import",
              "path": "../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::ListItemInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of items in the dropdown."
        },
        "defaultValue": "[]"
      },
      "suggestions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ListItemInterface[]",
          "resolved": "ListItemInterface[] | undefined",
          "references": {
            "ListItemInterface": {
              "location": "import",
              "path": "../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::ListItemInterface"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Suggestion list of items in the dropdown."
        },
        "defaultValue": "[]"
      },
      "value": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ListValue[]",
          "resolved": "ListValue[]",
          "references": {
            "ListValue": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::unknown"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the selected items."
        },
        "defaultValue": "[]"
      },
      "limitSelectedItems": {
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
          "text": "Maximum number of options that can be selected. Allowed only in case when 'multiple' prop is set to 'true'.\nZero or fewer means there is no limit on number of selected items."
        },
        "attribute": "limit-selected-items",
        "reflect": false,
        "defaultValue": "0"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<AutocompleteLocales>",
          "resolved": "{ nothingFound?: string | undefined; loading?: string | undefined; selected?: ((count: number) => string) | undefined; showMore?: string | undefined; showLess?: string | undefined; suggestionTitle?: string | undefined; createNewElement?: ((query: string) => string) | undefined; clearMultiple?: string | undefined; clearSingle?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "AutocompleteLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for autocomplete component"
        },
        "defaultValue": "{}"
      },
      "getItemKey": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "GetItemKeyType",
          "resolved": "(value: any) => string | number | undefined",
          "references": {
            "GetItemKeyType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::GetItemKeyType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper function to return the key of the list-item in the list.\nShould be used when the value of the list item is an object."
        }
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
              "path": "../../components",
              "id": "src/components.d.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the autocomplete `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isFocused": {},
      "isDropdownShown": {},
      "isInfiniteLoading": {},
      "internalList": {},
      "placeholderText": {},
      "searchText": {},
      "visibleOptionsLength": {},
      "selectedOptions": {},
      "extendedSelectedValues": {},
      "hiddenSelectedOptionsNumber": {},
      "hiddenCountElWidth": {},
      "activePillsTruncationState": {},
      "isShowMore": {},
      "componentSuggestions": {},
      "activeNdx": {},
      "activeSourceList": {},
      "focusType": {},
      "isInputValueTransparent": {}
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
          "text": "Emitted when the autocomplete value changes"
        },
        "complexType": {
          "original": "AutocompleteChangeEventDetail",
          "resolved": "SelectOptionChangeEventDetail & { reason: \"selectOption\"; } & { name?: string | undefined; } | { value: ListValue[]; selectedOptions: ListItemInterface[]; reason: AutocompleteChangeReason; } & { name?: string | undefined; } | { value: null; reason: \"removeOption\"; } & { name?: string | undefined; }",
          "references": {
            "AutocompleteChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteChangeEventDetail"
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
          "text": "Emitted when the autocomplete receives focus"
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
          "text": "Emitted when the autocomplete loses focus"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppSearchValueChange",
        "name": "wppSearchValueChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the autocomplete search value changes"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "wppCreateNewOption",
        "name": "wppCreateNewOption",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"Create new element\" button is clicked"
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
          "signature": "(isOutlined?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
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
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onValueChange"
      }, {
        "propName": "searchText",
        "methodName": "onSearchTextChange"
      }, {
        "propName": "list",
        "methodName": "onListChange"
      }, {
        "propName": "placeholderText",
        "methodName": "onPlaceholderTextChange"
      }, {
        "propName": "isShowMore",
        "methodName": "onShowMoreChange"
      }, {
        "propName": "extendedSelectedValues",
        "methodName": "onExtendedSelectedValuesChange"
      }, {
        "propName": "suggestions",
        "methodName": "onSuggestionsChange"
      }, {
        "propName": "loading",
        "methodName": "onLoadingChange"
      }];
  }
}

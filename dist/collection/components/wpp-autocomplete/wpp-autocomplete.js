import { Fragment, h, Host, } from '@stencil/core';
import { autoFocusElement, debounce, isEventTargetContained, selectDropdownWidth, transformToVersionedTag, } from '../../utils/utils';
import isEqual from 'lodash/isEqual';
import { menuListConfig } from '../../common/menuListConfig';
import { FOCUS_TYPE } from '../../types/common';
import { Z_INDEX } from '../../common/consts';
import { DROPDOWN_ANIMATION_TIME, LOCALES_DEFAULTS, PILL_MARGIN } from './const';
import { getTempNodeWidthBasedOnLabel } from './utils';
// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
/**
 * @slot - Should contain a list of `wpp-autocomplete-option` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part options - Options list container
 * @part selected-values - Dropdown values for selected values
 */
export class WppAutocomplete {
  constructor() {
    this.isScrollToInputRequested = false;
    this.hasChecked = false;
    // Used instead of Tippy's `state.isShown`, which is not updated when transitioning
    this.isDropdownShown = false;
    this.resizeInProgress = false;
    this.withPills = false;
    this.LIB_COMPONENTS_PREFIX = 'wpp-';
    this._locales = LOCALES_DEFAULTS;
    this.addHandleOptionsChangeTimer = (shouldUpdate = false) => {
      if (this.handleOptionsTimer) {
        clearTimeout(this.handleOptionsTimer);
      }
      this.handleOptionsTimer = setTimeout(() => {
        this.handleOptionsChange(shouldUpdate);
        this.handleOptionsTimer = null;
      }, 0);
    };
    this.checkSuggestions = () => {
      if (this.suggestions && !!this.suggestions.length) {
        //Need to be reassigned due to props from WppListItem `checked`, need to be removed
        this.componentSuggestions = this.suggestions.map(suggestion => {
          const { checked, ...restProps } = suggestion;
          if (checked)
            this.value.push(suggestion);
          return restProps;
        });
      }
      if (this.suggestions?.length === 0) {
        this.componentSuggestions = [];
      }
    };
    this.valueResizeObserver = () => {
      if (this.valuesContainerEl) {
        this.valuesResizeObserver = new ResizeObserver(debounce(() => {
          if (this.resizeInProgress)
            return;
          try {
            this.resizeInProgress = true;
            if (this.type === 'regular') {
              this.countHiddenElements();
            }
            if (this.isDropdownShown) {
              this.tippyInstance?.popperInstance?.forceUpdate();
            }
          }
          catch (error) {
            console.error('Error in ResizeObserver callback:', error);
          }
          finally {
            this.resizeInProgress = false;
          }
        }, 100));
        if (this.valuesResizeObserver) {
          this.valuesResizeObserver.observe(this.valuesContainerEl);
        }
      }
    };
    this.createTippyInstance = () => {
      if (this.triggerEl && this.dropdownEl) {
        this.tippyInstance = menuListConfig({
          anchor: this.triggerEl,
          content: this.dropdownEl,
          zIndex: Z_INDEX.AUTOCOMPLETE,
          ...this.dropdownConfig,
          duration: DROPDOWN_ANIMATION_TIME,
          trigger: 'manual',
          maxWidth: 'none',
          hideOnClick: false,
          popperOptions: {
            ...this.dropdownConfig?.popperOptions,
            modifiers: [
              ...(this.dropdownConfig?.popperOptions?.modifiers || []),
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['top'],
                },
              },
            ],
          },
          onShow: () => {
            requestAnimationFrame(this.validateTruncatedPills);
            requestAnimationFrame(this.triggerTooltipCalculation);
            if (this.componentSuggestions && this.componentSuggestions.length > 0)
              requestAnimationFrame(() => {
                const listItems = this.optionsListEl?.querySelectorAll(transformToVersionedTag('wpp-list-item'));
                Array.from(listItems || []).forEach(item => {
                  item.setAttribute('container-state', 'tooltipTrigger');
                });
              });
          },
          onHide: () => {
            this.isShowMore = true;
            this.isInComponent = false;
            requestAnimationFrame(this.validateTruncatedPills);
          },
          onClickOutside: (_, event) => {
            if (!isEventTargetContained(this.host, event)) {
              this.hideDropdown();
            }
          },
        });
      }
    };
    this.triggerTooltipCalculation = () => {
      this.optionElements?.forEach(option => {
        if (!option.hidden) {
          if (option.containerState === 'tooltipTrigger' && this.isDropdownShown) {
            option.setAttribute('container-state', '');
            option.setAttribute('container-state', 'tooltipTrigger');
          }
          else {
            option.setAttribute('container-state', 'tooltipTrigger');
          }
        }
      });
    };
    this.isSelectedItemsLimitReached = () => {
      if (this.limitSelectedItems <= 0)
        return false;
      return this.value.length >= this.limitSelectedItems;
    };
    this.canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading;
    this.hasClearButton = () => !!this.value.length && !this.isDropdownShown && this.multiple;
    this.hasSimpleSearch = () => this.simpleSearch && !this.infinite;
    this.isOptionHidden = (option) => {
      if (!this.hasSimpleSearch()) {
        return false;
      }
      const trimmedSearch = this.searchValue.trim().toLocaleLowerCase();
      if (trimmedSearch.length > 0) {
        const optionValue = option.value;
        if (!optionValue) {
          return false;
        }
        const optionLabel = (this.getOptionLabel(optionValue) || '').toLocaleLowerCase();
        return !optionLabel.includes(trimmedSearch);
      }
      return false;
    };
    this.isOptionNodesChanged = (nextOptions) => nextOptions.length !== this.optionElements?.length ||
      !nextOptions.every((el, index) => this.optionElements?.[index] === el);
    this.getOptionElements = () => Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-list-item')));
    this.scrollOptionsToTop = () => {
      if (this.optionsListEl) {
        this.optionsListEl.scrollTop = 0;
      }
    };
    /**
     * If return `true`, need to interrupt function
     * for the cases, when user have Single WppAutocomplete and clicking into already selected WppListItem
     * @param event
     */
    this.toggleSingleAutocompleteListItem = (event) => {
      const suggestion = event.detail.target;
      if (this.lastSelectedElement)
        this.lastSelectedElement.checked = false;
      this.lastSelectedElement = suggestion;
      if (isEqual(this.value[0], suggestion.value)) {
        event.stopPropagation();
        suggestion.checked = true;
        this.hideDropdown();
        this.blurInput();
        return true;
      }
      return;
    };
    this.focusInput = () => {
      this.inputEl?.focus();
    };
    this.blurInput = () => {
      this.inputEl?.blur();
    };
    this.showDropdown = () => {
      if (!this.isDropdownShown) {
        this.isDropdownShown = true;
        this.tippyInstance?.show();
      }
    };
    this.hideDropdown = () => {
      if (this.isDropdownShown) {
        if (this.type === 'regular') {
          this.countHiddenElements();
        }
        this.tippyInstance?.hide();
        this.isDropdownShown = false;
      }
    };
    this.isItemSelected = (item) => {
      const itemId = this.getOptionId(item);
      return (this.value.some(selectedOption => this.getOptionId(selectedOption) === itemId) ||
        this.componentSuggestions.some(suggestion => this.getOptionId(suggestion) === itemId && this.isOptionSelected(suggestion)));
    };
    this.updateOptions = () => {
      this.shownOptionElements = [];
      this.optionElements?.forEach(option => {
        const optionValue = option.value;
        option.selectable = true;
        option.hidden = this.isOptionHidden(option);
        option.checked = this.isItemSelected(optionValue);
        option.highlight = this.searchValue;
        if (!option.hidden) {
          if (this.isDropdownShown) {
            option.setAttribute('container-state', '');
            option.setAttribute('container-state', 'tooltipTrigger');
          }
          this.shownOptionElements.push(option);
        }
      });
      this.isEmptyOptions = !this.shownOptionElements.length;
    };
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
    this.handleTriggerContainerMouseDown = (event) => {
      if (!this.disabled) {
        // Prevent input blur when the component is used
        if (event.target !== this.inputEl) {
          event.preventDefault();
        }
      }
    };
    this.handleCreateNewOptionClick = () => {
      this.wppCreateNewOption.emit(this.searchValue);
    };
    this.handleTriggerClick = () => {
      if (!this.isFocused) {
        this.focusInput();
      }
    };
    this.handleMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handleKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.handleInput = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.searchValue = this.inputEl?.value || '';
      if (this.componentSuggestions?.length > 0 || (this.searchValue?.length ?? 0) > 0) {
        this.showDropdown();
      }
      else {
        if (!this.multiple || (this.multiple && !this.value.length)) {
          this.hideDropdown();
        }
      }
    };
    this.handleFocus = (event) => {
      this.isInComponent = true;
      if (!this.isFocused) {
        this.isScrollToInputRequested = true;
        this.isFocused = true;
        if ((this.componentSuggestions?.length ?? 0) > 0 ||
          (this.searchValue?.length ?? 0) > 0 ||
          (this.withPills && !!this.value.length)) {
          this.showDropdown();
        }
        if (this.canLoadMore() && this.isEmptyOptions && !this.loading) {
          this.requestLoadMore();
        }
      }
      this.wppFocus.emit(event);
    };
    // We allow input blur only when the dropdown is hidden or the component got disabled.
    // Outside clicks will close the dropdown first.
    this.handleBlur = () => {
      if (this.isInComponent)
        return;
      this.focusType = FOCUS_TYPE.NONE;
      if (this.host.shadowRoot?.activeElement !== this.inputEl) {
        this.hideDropdown();
      }
      if (!this.isDropdownShown) {
        this.isFocused = false;
        if (this.persistentSearch) {
          this.onSearchValueChange(this.searchValue);
        }
        else {
          this.searchValue = '';
        }
      }
      else {
        this.focusInput();
      }
      this.wppBlur.emit();
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
    // For some reason this handler is not triggered by the browser
    // while Tippy instance is being created. Though it is covered
    // after the dropdown is opened, since Tippy moves the dropdown node.
    this.handleOptionsChange = (shouldUpdate = false) => {
      const currentNodes = this.getOptionElements();
      const isNodesChanged = this.isOptionNodesChanged(currentNodes);
      if (isNodesChanged || shouldUpdate) {
        this.optionElements = currentNodes;
        this.updateOptions();
      }
    };
    this.handleClearClick = (event) => {
      event.stopPropagation();
      this.value = [];
      this.hiddenSelectedOptionsNumber = 0;
      this.updateOptions();
      this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name });
    };
    this.hostCssClasses = () => ({
      'wpp-autocomplete': true,
      'wpp-disabled': this.disabled,
    });
    this.autocompleteWrapperCssClasses = () => ({
      'autocomplete-wrapper': true,
    });
    this.triggerCssClasses = () => ({
      trigger: true,
      disabled: this.disabled,
      focused: this.isFocused,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: !!this.size,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.inputCssClasses = () => ({
      'autocomplete-input': true,
      hidden: !this.isFocused && this.value.length > 0,
    });
    this.labelCssClasses = () => ({
      label: true,
      focused: this.isFocused,
    });
    this.dropdownListCssClasses = () => ({
      'dropdown-list': true,
      hidden: this.searchValue.length !== this.searchValue.trim().length && !this.searchValue.trim().length,
      'with-create-new': this.showCreateNewElement && this.searchValue !== '' && !this.displayBtnWhenListEmpty && !this.isEmptyOptions,
      'empty-with-create-new': this.showCreateNewElement && this.searchValue !== '' && this.isEmptyOptions,
    });
    this.selectedValuesCssClasses = () => ({
      'selected-values': true,
      focused: this.isFocused,
      [`${this.type}`]: true,
    });
    this.hostStyle = () => {
      const style = {
        '--wpp-list-item-width': '100%',
      };
      return style;
    };
    this.selectedPillsWrapperCssClasses = () => ({
      'selected-pills-wrapper': true,
      overflow: this.isShowMore,
      'not-empty': !!this.searchValue.length || !!this.value.length || !!this.shownOptionElements?.length,
    });
    this.getInputValue = () => this.searchValue;
    this.renderInputPlaceholder = () => {
      if (!this.multiple && this.value.length && !this.isFocused) {
        return (h("wpp-typography-v3-5-0", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, this.getOptionLabel(this.value[0])));
      }
      if (this.isFocused && !this.searchValue)
        return null;
      if (this.isDropdownShown)
        return null;
      if (this.type === 'regular') {
        const itemsToDisplay = this.value;
        if (!itemsToDisplay.length)
          return null;
        const placeholder = itemsToDisplay.map(this.getOptionLabel).filter(Boolean).join(', ');
        return (h("wpp-typography-v3-5-0", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, placeholder));
      }
      if (this.type === 'extended' && this.value.length && !this.isFocused) {
        return (h("wpp-typography-v3-5-0", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, this._locales.selected(this.value.length)));
      }
    };
    this.countHiddenElements = () => {
      const el = this.host.shadowRoot.querySelector('.input-placeholder');
      if (!el) {
        this.hiddenSelectedOptionsNumber = 0;
        return 0;
      }
      const shownItems = this.value;
      const maxWidth = el.clientWidth;
      const textStyles = getComputedStyle(el, null).cssText;
      let displayedElements = 1;
      let label = this.getOptionLabel(shownItems[0]);
      for (let i = 1; i < shownItems.length; i++) {
        label += this.getOptionLabel(shownItems[i]);
        const currWidth = getTempNodeWidthBasedOnLabel(textStyles, label);
        if (currWidth > maxWidth) {
          this.hiddenSelectedOptionsNumber = this.value.length - displayedElements;
          return;
        }
        else {
          displayedElements++;
        }
      }
      this.hiddenSelectedOptionsNumber = this.value.length - displayedElements;
    };
    this.getNearestPowForRowsNumber = () => Math.ceil(Math.log10(this.hiddenSelectedOptionsNumber + 1));
    this.getDropdownWidth = () => {
      if (this.dropdownWidth === 'auto') {
        return this.triggerEl ? `${this.triggerEl.offsetWidth}px` : `${this.host.offsetWidth}px`;
      }
      return selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host);
    };
    this.isOptionSelected = (option) => this.value.some(selectedOption => this.getOptionId(selectedOption) === this.getOptionId(option));
    this.handleSuggestionClick = (event) => {
      const option = event.detail.value;
      if (option.disabled)
        return;
      if (!this.multiple && this.toggleSingleAutocompleteListItem(event))
        return;
      const isAlreadySelected = this.isOptionSelected(option);
      if (this.multiple) {
        if (isAlreadySelected) {
          this.value = this.value.filter(selectedOption => this.getOptionId(selectedOption) !== this.getOptionId(option));
          this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name });
        }
        else {
          if (this.isSelectedItemsLimitReached())
            return;
          this.value = [...this.value, option];
          this.wppChange.emit({ value: this.value, reason: 'selectOption', name: this.name });
        }
        this.updateOptions();
      }
      else {
        if (isAlreadySelected)
          return;
        this.value = [option];
        this.wppChange.emit({ value: this.value, reason: 'selectOption', name: this.name });
        this.hideDropdown();
        this.blurInput();
        this.updateOptions();
      }
    };
    this.renderDropdownContent = () => {
      const isLoading = this.loading || (this.isInfiniteLoading && this.isEmptyOptions);
      const isEmptyStringEntered = this.searchValue.trim().length === 0;
      if (isLoading) {
        return (h("div", { class: "loading-wrapper" }, h("wpp-spinner-v3-5-0", { slot: "left" }), h("wpp-typography-v3-5-0", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (isEmptyStringEntered && this.componentSuggestions?.length > 0) {
        return (h(Fragment, null, h("wpp-typography-v3-5-0", { type: "s-strong", class: "suggestions-heading" }, this.suggestionsTitle), this.componentSuggestions?.map((suggestion, index) => {
          const { slots, checked, label, ...restProps } = suggestion;
          const isChecked = checked || this.isItemSelected(suggestion);
          return (h("wpp-list-item-v3-5-0", { key: this.getOptionId(suggestion), selectable: true, checked: isChecked, value: suggestion, onWppChangeListItem: this.handleSuggestionClick, class: { 'suggestion-item': true, 'last-item': index === this.componentSuggestions?.length - 1 }, ...restProps }, label && h("span", { slot: "label" }, this.getOptionLabel(suggestion)), slots && this.renderSlotsListItem(slots, Boolean(label)).map(slotNode => slotNode)));
        })));
      }
      if (this.isEmptyOptions) {
        return (h(Fragment, null, h("wpp-list-item-v3-5-0", { class: "nothing-found-wrapper" }, h("wpp-typography-v3-5-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound))));
      }
      return (h(Fragment, null, !this.searchValue ? (!this.withPills ? (h("div", { class: this.selectedValuesCssClasses(), part: "selected-values" }, h("slot", { name: "selected-values" }))) : null) : (h("slot", null)), h("div", null, this.isInfiniteLoading && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v3-5-0", null))))));
    };
    this.renderSlotsListItem = (slots, isLabelExists) => slots
      .map(slotElement => {
      if (!slotElement)
        return null;
      const { type, props, slot, children } = slotElement;
      if (props.slot === 'label' && isLabelExists)
        return null;
      if (!type.startsWith(this.LIB_COMPONENTS_PREFIX)) {
        const { children: text, ...restProps } = props;
        const Tag = type;
        return (h(Tag, { ...restProps }, text));
      }
      if (!children)
        return h(transformToVersionedTag(type), { slot, ...props });
      const slotNode = h(transformToVersionedTag(type), { slot, ...props });
      slotNode.$children$ = Array.isArray(children)
        ? this.renderSlotsListItem(Array.from(children), isLabelExists)
        : this.renderSlotsListItem([children], isLabelExists);
      return slotNode;
    })
      .filter(item => item !== null);
    this.renderPillComponent = (option, isTooltip, isTransparentTooltip = false, isTransparentPill = false) => {
      const labelText = option.label ||
        option.slots?.find((slot) => slot.type === 'span' && slot.props.slot === 'label')?.props.children;
      if (isTooltip) {
        return (h("wpp-tooltip-v3-5-0", { class: {
            'in-dropdown': true,
            transparent: isTransparentTooltip,
          }, text: labelText, part: "tooltip", config: { ...this.pillTooltipConfig } }, h("wpp-pill-v3-5-0", { class: { transparent: isTransparentPill }, label: labelText, type: "display", removable: true, onWppClose: event => this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } }) })));
      }
      else {
        return (h("wpp-pill-v3-5-0", { class: { transparent: isTransparentPill }, label: labelText, type: "display", removable: true, onWppClose: event => this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } }) }));
      }
    };
    /**
     * Validate each WppPill if it has truncated text label inside or WppPill got truncated when it's in `showMore` mode
     */
    this.validateTruncatedPills = () => {
      this.selectedPillsWrapperRef?.style.removeProperty('width');
      // remove transparent class for a case when we have truncated WppPill and need to check which elements are not visible
      this.selectedPillsWrapperRef
        ?.querySelectorAll('.wpp-pill.transparent')
        .forEach(el => el.classList.remove('transparent'));
      // Need to toggle class for re-calculation which elements are not visible
      if (!this.isShowMore) {
        this.selectedPillsWrapperRef?.classList.toggle('overflow');
        this.headerWrapperRef?.classList.toggle('visible');
      }
      const pillsWrapperElement = this.host?.shadowRoot?.querySelector('.selected-pills-wrapper');
      const headerPillsWrapperElement = this.host?.shadowRoot?.querySelector('.header-wrapper');
      const showMoreElement = this.host?.shadowRoot?.querySelector('.show-more-action');
      if (!pillsWrapperElement || !showMoreElement || !headerPillsWrapperElement)
        return;
      const pillsWrapperRight = headerPillsWrapperElement.getBoundingClientRect().right;
      const pillWrapperWithLabel = pillsWrapperRight - showMoreElement.getBoundingClientRect().width;
      const pillsElements = Array.from(pillsWrapperElement.querySelectorAll(transformToVersionedTag('wpp-pill')));
      const activePillsTruncationStateTmp = [];
      const activePillsTruncationStateWithMoreLabelTmp = [];
      const activePillsTruncationLabelStateTmp = [];
      if (!pillsElements || !pillsElements.length)
        return;
      pillsElements.forEach((pillElement, ndx) => {
        const pillElementRect = pillElement.getBoundingClientRect();
        const labelEl = pillElement.shadowRoot?.querySelector('.label');
        // Check right corner of .selected-pills-wrapper and each .wpp-pill
        activePillsTruncationStateTmp.push(pillElementRect.right > pillsWrapperRight);
        // first item must be `false`, because it can't be truncated by `+n more` label
        activePillsTruncationStateWithMoreLabelTmp.push(ndx === 0 ? false : pillElementRect.right > pillWrapperWithLabel);
        if (!labelEl) {
          activePillsTruncationLabelStateTmp.push(false);
          return;
        }
        // Check if WppPill .label has text truncation
        activePillsTruncationLabelStateTmp.push(labelEl.scrollWidth > labelEl.clientWidth);
      });
      const isPillsTruncated = activePillsTruncationStateTmp.includes(true);
      // If at least one WppPill got truncated, we need to include `+n more` in truncated list items
      this.activePillsTruncationState = isPillsTruncated
        ? activePillsTruncationStateWithMoreLabelTmp
        : activePillsTruncationStateTmp;
      this.activePillsTruncationLabelState = activePillsTruncationLabelStateTmp;
      // Need to toggle class for re-calculation which elements are not visible (revert changes)
      if (!this.isShowMore) {
        this.selectedPillsWrapperRef?.classList.toggle('overflow');
        this.headerWrapperRef?.classList.toggle('visible');
        if (!this.selectedPillsWrapperRef)
          return;
        // If we have situation when after removing WppPill we have one line, we need to toggle isShowMore (reset the value)
        if (Number.parseFloat(window.getComputedStyle(this.selectedPillsWrapperRef).height) ===
          this.selectedPillsWrapperRef?.children[0].getBoundingClientRect().height)
          this.handleShowMoreLessClick();
      }
      // Need to adjust width of selectedPillsWrapperRef to adjust placement for a `+n more` CTA
      if (this.isShowMore && isPillsTruncated) {
        const visiblePills = pillsElements.slice(0, activePillsTruncationStateWithMoreLabelTmp.filter(x => !x).length);
        let visiblePillsWidth = visiblePills.reduce((acc, pill) => acc + pill.getBoundingClientRect().width, 0);
        if (visiblePills.length > 1)
          visiblePillsWidth += (visiblePills.length - 1) * PILL_MARGIN;
        // Set width eq to all visible WppPills and N-1 margins
        this.selectedPillsWrapperRef?.style.setProperty('width', `${visiblePillsWidth}px`);
      }
    };
    // Render Show More/Show Less button only in cases when we have truncated WppPill (not .label inside)
    this.showMoreLessRender = (label) => (h("wpp-action-button-v3-5-0", { "data-testid": "wpp-autocomplete-show-btn", class: "nowrap", variant: "secondary", onClick: this.handleShowMoreLessClick }, label));
    this.handleShowMoreLessClick = () => {
      this.isShowMore = !this.isShowMore;
    };
    this.isFocused = false;
    this.searchValue = '';
    this.isEmptyOptions = true;
    this.isInfiniteLoading = false;
    this.focusType = undefined;
    this.hiddenSelectedOptionsNumber = 0;
    this.isShowMore = true;
    this.activePillsTruncationState = [];
    this.activePillsTruncationLabelState = [];
    this.suggestionListTruncationState = [];
    this.componentSuggestions = [];
    this.lastSelectedElement = null;
    this.isInComponent = false;
    this.name = undefined;
    this.loading = false;
    this.disabled = false;
    this.autoFocus = false;
    this.infinite = false;
    this.suggestionsTitle = 'Suggestions';
    this.suggestions = [];
    this.infiniteLastPage = true;
    this.limitSelectedItems = 0;
    this.placeholder = undefined;
    this.value = [];
    this.getOptionId = item => item.id;
    this.getOptionLabel = item => item.label;
    this.loadMore = undefined;
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.dropdownConfig = {};
    this.type = 'regular';
    this.size = 'm';
    this.locales = {};
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.pillTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
      placement: 'right',
    };
    this.labelConfig = undefined;
    this.multiple = false;
    this.showCreateNewElement = false;
    this.displayBtnWhenListEmpty = true;
    this.simpleSearch = false;
    this.persistentSearch = false;
    this.dropdownWidth = 'auto';
  }
  handleOptionToggle(event) {
    if (!this.multiple && this.toggleSingleAutocompleteListItem(event))
      return;
    const isCurrValueAlreadySelected = this.value.find(option => this.getOptionId(option) === this.getOptionId(event.detail.value));
    if (this.isSelectedItemsLimitReached() && !isCurrValueAlreadySelected) {
      const listItem = event.target;
      listItem.checked = false;
      return;
    }
    this.value = event.detail.checked
      ? [...(this.multiple ? this.value : []), event.detail.value]
      : this.value.filter(option => this.getOptionId(option) !== this.getOptionId(event.detail.value));
    this.wppChange.emit({
      value: this.value,
      reason: event.detail.checked ? 'selectOption' : 'removeOption',
      name: this.name,
    });
  }
  onLoadingChange(loading) {
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
      this.addHandleOptionsChangeTimer(true);
    }
  }
  onNextValueChange(newValue) {
    if (newValue.length && this.withPills) {
      requestAnimationFrame(this.validateTruncatedPills);
    }
    if (!newValue.length && this.isDropdownShown && !this.componentSuggestions.length && !this.searchValue) {
      this.hideDropdown();
    }
    if (this.isSelectedItemsLimitReached()) {
      this.hideDropdown();
      this.blurInput();
      this.searchValue = '';
    }
    if (!this.multiple) {
      this.hideDropdown();
      this.blurInput();
    }
  }
  onSearchValueChange(initSearchValue) {
    const searchValue = initSearchValue.trim();
    if (!this.hasSimpleSearch()) {
      this.wppSearchValueChange.emit(searchValue);
      this.addHandleOptionsChangeTimer(true);
      return;
    }
    if (!searchValue) {
      if (!(this.componentSuggestions?.length > 0)) {
        this.optionElements?.forEach(option => {
          option.hidden = true;
        });
      }
      this.shownOptionElements = [];
      this.isEmptyOptions = false;
      this.hideDropdown();
      return [];
    }
    this.updateOptions();
    this.wppSearchValueChange.emit(searchValue);
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  onShowMoreChange(isShowMore) {
    isShowMore
      ? this.selectedPillsWrapperRef?.classList.add('overflow')
      : this.selectedPillsWrapperRef?.classList.remove('overflow');
    requestAnimationFrame(this.validateTruncatedPills);
  }
  onUpdateSuggestions() {
    if (this.searchValue !== '')
      return;
    this.checkSuggestions();
    this.updateOptions();
  }
  updateIsInComponent(value) {
    if (!value)
      this.handleBlur();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  /**
   * Sets focus on native input
   */
  async setFocus() {
    this.inputEl?.focus();
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.withPills = this.type === 'regular' && this.multiple;
    if (this.limitSelectedItems > 0 && !this.multiple) {
      throw new Error('There could be only one selected item in single mode, otherwise, use multiple mode.');
    }
    this.optionElements = this.getOptionElements();
    if (!this.multiple && this.value.length > 0) {
      this.lastSelectedElement = this.optionElements.filter((el) => el.value?.id === this.value[0]?.id)[0];
    }
    this.updateOptions();
  }
  componentDidLoad() {
    // Watches the size of values container, which changes when
    // autocomplete is focused and `limitLines` prop is set
    this.valueResizeObserver();
    this.mutationObserver = new MutationObserver(() => {
      if (!this.loading && !this.isInfiniteLoading) {
        this.addHandleOptionsChangeTimer();
      }
    });
    this.mutationObserver.observe(this.host, { childList: true, subtree: true });
    this.createTippyInstance();
    autoFocusElement(this.autoFocus, this.inputEl);
    this.checkSuggestions();
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }
  disconnectedCallback() {
    if (this.valuesResizeObserver) {
      this.valuesResizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    this.tippyInstance?.destroy();
    document.removeEventListener('click', this.handleClickOutside);
  }
  connectedCallback() {
    this.valueResizeObserver();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  handleClickOutside(event) {
    if (!isEventTargetContained(this.host, event) && this.isInComponent)
      this.isInComponent = false;
  }
  renderSelectedOptions() {
    if (!this.withPills)
      return;
    if (!this.value.length)
      return;
    /**
     * When isShowMore is `true`:
     * - Checks if child elements (WppPill/WppTooltip) have text truncation:
     *   If truncated, need to add `transparent` class to WppPill/WppTooltip
     * When isShowMore is `false`:
     * - Checks if child elements (WppPill) have text truncation:
     *    - If `true` wrap WppPill with WppTooltip
     *    - If `false` render WppPill
     */
    const isNeedDivider = (!!this.value.length &&
      this.searchValue !== '' &&
      (!!this.componentSuggestions?.length ||
        !!this.shownOptionElements?.length ||
        !!this.shownOptionElements?.length)) ||
      this.loading ||
      this.isInfiniteLoading;
    return (h(Fragment, null, this.value.length > 0 && (h("div", { class: {
        'header-wrapper': true,
        visible: this.activePillsTruncationState.includes(true) && this.isShowMore,
      }, ref: ref => (this.headerWrapperRef = ref) }, h("div", { "data-testid": "wpp-autocomplete-selected-pills-wrapper", class: this.selectedPillsWrapperCssClasses(), ref: ref => (this.selectedPillsWrapperRef = ref) }, this.value.map((option, ndx) => {
      if (this.isShowMore) {
        const isHideElement = this.activePillsTruncationState[ndx];
        return this.activePillsTruncationLabelState[ndx]
          ? this.renderPillComponent(option, true, isHideElement)
          : this.renderPillComponent(option, false, false, isHideElement);
      }
      else {
        return this.activePillsTruncationLabelState[ndx]
          ? this.renderPillComponent(option, true)
          : this.renderPillComponent(option, false);
      }
    })), h("div", { class: "show-more-action" }, this.showMoreLessRender(`+${this.activePillsTruncationState.filter(x => x).length} ${this._locales.showMore}`)))), !this.isShowMore && h("div", { class: "show-less-action" }, this.showMoreLessRender(this._locales.showLess)), isNeedDivider && h("wpp-divider-v3-5-0", { class: "nothing-found-divider" })));
  }
  render() {
    const style = { '--custom-dropdown-width': this.getDropdownWidth() };
    return (h(Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, "aria-disabled": this.disabled, "aria-required": this.required, exportparts: "input, dropdown, options, selected-values" }, h("div", { class: this.autocompleteWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (h("wpp-label-v3-5-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.renderInputPlaceholder(), this.hiddenSelectedOptionsNumber > 0 && !this.isDropdownShown && (h("div", { class: "hidden-count", style: { '--hidden-number': this.getNearestPowForRowsNumber() + '' } }, h("wpp-typography-v3-5-0", { type: "s-body" }, ", + ", this.hiddenSelectedOptionsNumber))), h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", onInput: this.handleInput, tabIndex: this.disabled ? -1 : 0, title: "" })), h("div", { class: "trigger-actions" }, this.hasClearButton() && h("wpp-icon-cross-v3-5-0", { onClick: this.handleClearClick }))), !!this.message && (h("wpp-inline-message-v3-5-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), part: "options", class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll }, this.renderSelectedOptions(), this.renderDropdownContent(), this.showCreateNewElement &&
      this.searchValue !== '' &&
      ((this.displayBtnWhenListEmpty && this.isEmptyOptions) || !this.displayBtnWhenListEmpty) && (h("div", { class: "actions" }, h("wpp-divider-v3-5-0", { class: "nothing-found-divider" }), h("div", { class: "actions-container" }, h("wpp-list-item-v3-5-0", { onClick: this.handleCreateNewOptionClick }, h("wpp-typography-v3-5-0", { type: "s-strong", class: "create-new-option", slot: "label" }, this._locales.createNewElement))))))), this.type === 'extended' && this.multiple ? h("slot", { name: "selected-values" }) : null));
  }
  static get is() { return "wpp-autocomplete"; }
  static get registryIs() { return "wpp-autocomplete-v3-5-0"; }
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
      "suggestionsTitle": {
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
          "text": "Title displayed above the suggestions list when the input is focused or clicked."
        },
        "attribute": "suggestions-title",
        "reflect": false,
        "defaultValue": "'Suggestions'"
      },
      "suggestions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AutocompleteOption[] | AutocompleteExtendedOption[]",
          "resolved": "AutocompleteExtendedOption[] | AutocompleteOption[]",
          "references": {
            "AutocompleteOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteOption"
            },
            "AutocompleteExtendedOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteExtendedOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of suggestion options to display when the input is focused or clicked."
        },
        "defaultValue": "[]"
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
      "value": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "AutocompleteOption[]",
          "resolved": "AutocompleteOption[]",
          "references": {
            "AutocompleteOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteOption"
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
      "getOptionId": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "GetOptionIdHandler",
          "resolved": "(item: AutocompleteOption) => AutocompleteOptionId",
          "references": {
            "GetOptionIdHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::GetOptionIdHandler"
            },
            "AutocompleteDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets ID values from the autocomplete options."
        },
        "defaultValue": "item => (item as AutocompleteDefaultOption).id"
      },
      "getOptionLabel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "GetOptionLabelHandler",
          "resolved": "(item: AutocompleteOption) => string",
          "references": {
            "GetOptionLabelHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::GetOptionLabelHandler"
            },
            "AutocompleteDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets a label from the autocomplete options."
        },
        "defaultValue": "item => (item as AutocompleteDefaultOption).label"
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
      "dropdownConfig": {
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
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AutocompleteTypes",
          "resolved": "\"extended\" | \"regular\" | undefined",
          "references": {
            "AutocompleteTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the autocomplete type."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'regular'"
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
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<AutocompleteLocales>",
          "resolved": "{ nothingFound?: string | undefined; beginTyping?: string | undefined; more?: string | undefined; showMore?: string | undefined; showLess?: string | undefined; selected?: ((count: number) => string) | undefined; loading?: string | undefined; createNewElement?: string | undefined; }",
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
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "AutocompleteLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "AutocompleteLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-autocomplete/types.ts::AutocompleteLabelConfig"
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
          "text": "If `true`, the autocomplete will give possibility to select multiple options"
        },
        "attribute": "multiple",
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
      }
    };
  }
  static get states() {
    return {
      "isFocused": {},
      "searchValue": {},
      "isEmptyOptions": {},
      "isInfiniteLoading": {},
      "focusType": {},
      "hiddenSelectedOptionsNumber": {},
      "isShowMore": {},
      "activePillsTruncationState": {},
      "activePillsTruncationLabelState": {},
      "suggestionListTruncationState": {},
      "componentSuggestions": {},
      "lastSelectedElement": {},
      "isInComponent": {}
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
          "resolved": "SelectOptionChangeEventDetail & { reason: \"selectOption\"; } & { name?: string | undefined; } | { value: AutocompleteOptionList; reason: AutocompleteChangeReason; } & { name?: string | undefined; } | { value: null; reason: \"removeOption\"; } & { name?: string | undefined; }",
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
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "loading",
        "methodName": "onLoadingChange"
      }, {
        "propName": "value",
        "methodName": "onNextValueChange"
      }, {
        "propName": "searchValue",
        "methodName": "onSearchValueChange"
      }, {
        "propName": "dropdownConfig",
        "methodName": "updateDropdownConfig"
      }, {
        "propName": "isShowMore",
        "methodName": "onShowMoreChange"
      }, {
        "propName": "suggestions",
        "methodName": "onUpdateSuggestions"
      }, {
        "propName": "isInComponent",
        "methodName": "updateIsInComponent"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppChangeListItem",
        "method": "handleOptionToggle",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}

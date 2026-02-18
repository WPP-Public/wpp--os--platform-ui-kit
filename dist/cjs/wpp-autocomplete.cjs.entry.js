'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const lodash = require('./lodash-04cddce7.js');
const common = require('./common-ee802540.js');
const menuListConfig = require('./menuListConfig-bbde46c0.js');
const utils = require('./utils-ce5c8ac5.js');
const consts = require('./consts-dba6e6dd.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
const DEFAULT_DROPDOWN_CONFIG = {
  maxWidth: 'none',
  hideOnClick: false,
  trigger: 'manual',
  placement: 'bottom-start',
  offset: [0, 4],
  zIndex: consts.Z_INDEX.AUTOCOMPLETE,
  appendTo: () => utils.getHighestContainerInDOM(),
};
const LOCALES_DEFAULTS = {
  nothingFound: 'Nothing found',
  loading: 'Loading...',
  selected: count => `${count} selected`,
  showMore: 'Show More',
  showLess: 'Show Less',
  suggestionTitle: 'Suggestions',
  createNewElement: query => `Create "${query}"`,
  clearMultiple: 'Clear selections',
  clearSingle: 'Clear selection',
};
const PILL_MARGIN = 8;

const LIB_COMPONENTS_PREFIX = 'wpp-';
const renderSlotsInListItem = (slots, isLabelExists) => slots
  .map(slotElement => {
  if (!slotElement)
    return null;
  const { type, props, slot, children } = slotElement;
  if (props.slot === 'label' && isLabelExists)
    return null;
  if (!type.startsWith(LIB_COMPONENTS_PREFIX)) {
    const { children: text, ...restProps } = props;
    const Tag = type;
    return (index.h(Tag, { ...restProps }, text));
  }
  if (!children)
    return index.h(utils.transformToVersionedTag(type), { slot, ...props });
  const slotNode = index.h(utils.transformToVersionedTag(type), { slot, ...props });
  slotNode.$children$ = Array.isArray(children)
    ? renderSlotsInListItem(Array.from(children), isLabelExists)
    : renderSlotsInListItem([children], isLabelExists);
  return slotNode;
})
  .filter(item => item !== null);
const isSelected = (value, item, getItemKey) => {
  if (!value?.length)
    return false;
  const itemValue = item.value ?? item;
  const itemKey = typeof itemValue === 'object' ? getItemKey?.(itemValue) : itemValue;
  return value.some(selected => {
    const selectedValue = selected.value ?? selected;
    const selectedKey = typeof selectedValue === 'object' ? getItemKey?.(selectedValue) : selectedValue;
    if (itemKey !== undefined && selectedKey !== undefined) {
      return itemKey === selectedKey;
    }
    return lodash.lodash.isEqual(itemValue, selectedValue);
  });
};
// Select in order
const selectedOptionsByOrder = (internalList, value, getItemKey) => {
  const mapByKey = new Map();
  for (const it of internalList ?? []) {
    const itValue = it.value ?? it;
    const k = typeof itValue === 'object' ? getItemKey?.(itValue) : itValue;
    if (k !== undefined)
      mapByKey.set(k, it);
  }
  const selectedInOrder = [];
  for (const v of value ?? []) {
    const vValue = v.value ?? v;
    const k = typeof vValue === 'object' ? getItemKey?.(vValue) : vValue;
    let match;
    if (k !== undefined && mapByKey.has(k)) {
      match = mapByKey.get(k);
    }
    else {
      match = (internalList ?? []).find(it => lodash.lodash.isEqual(it.value ?? it, vValue));
    }
    if (match)
      selectedInOrder.push(match);
  }
  return selectedInOrder;
};

function renderDropdownPillsComponent() {
  if (!this.withPills)
    return null;
  this.selectedPillRefs = [];
  /**
   * When isShowMore is `true`:
   * - Checks if child elements (WppPill/WppTooltip) have text truncation:
   *   If truncated, need to add `transparent` class to WppPill/WppTooltip
   * When isShowMore is `false`:
   * - Checks if child elements (WppPill) have text truncation:
   *    - If `true` wrap WppPill with WppTooltip
   *    - If `false` render WppPill
   */
  const isNeedDivider = !!this.selectedOptions.length;
  // Render Show More/Show Less button only in cases when we have truncated WppPill (not .label inside)
  const showMoreLessRender = (label) => (index.h("wpp-action-button-v4-0-0", { "data-testid": "wpp-autocomplete-show-btn", class: "nowrap", variant: "secondary", onClick: this.handleShowMoreLessClick }, label));
  const renderPillComponent = (option, ndx, isTransparentPill = false) => (index.h("wpp-pill-v4-0-0", { ref: ref => {
      if (ref)
        this.selectedPillRefs[ndx] = ref;
    }, class: { transparent: this.isShowMore && isTransparentPill }, label: option.label, type: "display", onWppClose: event => {
      this.handleClickListItem({
        ...event,
        ...{ detail: { value: option.value } },
      });
      this.setFocus();
    }, removable: true }));
  const selectedPillsWrapperCssClasses = () => ({
    'selected-pills-wrapper': true,
    'not-empty': !!this.searchText.length || !!this.value.length,
  });
  return (index.h(index.Fragment, null,
    this.value.length > 0 && (index.h("div", { ref: ref => (this.headerWrapperRef = ref), class: {
        'header-wrapper': true,
        overflow: this.isShowMore,
        visible: this.isShowMore && this.activePillsTruncationState.includes(true),
      }, tabindex: "-1", onClick: () => this.setFocus() },
      index.h("div", { ref: ref => (this.selectedPillsWrapperRef = ref), class: selectedPillsWrapperCssClasses() }, this.selectedOptions.map((option, ndx) => renderPillComponent(option, ndx, this.activePillsTruncationState[ndx]))),
      index.h("div", { ref: ref => (this.showMoreElementRef = ref), class: "show-more-action" }, showMoreLessRender(`+${this.activePillsTruncationState.filter(x => x).length} ${this._locales.showMore}`)))),
    !this.isShowMore && index.h("div", { class: "show-less-action" }, showMoreLessRender(this._locales.showLess)),
    isNeedDivider && index.h("wpp-divider-v4-0-0", { class: "nothing-found-divider" })));
}

function renderPlaceholderTextComponent() {
  const inputPlaceholderCssClasses = () => ({
    'input-placeholder': true,
    'with-hidden-count': this.hiddenSelectedOptionsNumber > 0 && this.value.length > 1,
    hidden: this.isFocused && this.searchText.length > 0,
    disabled: this.disabled,
  });
  const hiddenCountCssClasses = () => ({
    'hidden-count': true,
    computed: this.hiddenSelectedOptionsNumber > 0 && this.value.length > 1,
  });
  return (index.h(index.Fragment, null,
    index.h("wpp-typography-v4-0-0", { ref: ref => (this.inputPlaceholderRef = ref), type: "s-body", class: inputPlaceholderCssClasses() }, this.placeholderText),
    index.h("wpp-typography-v4-0-0", { ref: ref => (this.hiddenInputPlaceholderRef = ref), role: "presentation", type: "s-body", class: "hidden-input-placeholder" }),
    this.value.length > 1 && (index.h("wpp-typography-v4-0-0", { class: hiddenCountCssClasses(), type: "s-body" },
      "+ ",
      this.hiddenSelectedOptionsNumber))));
}

function renderDropdownListComponent() {
  const convertValueToKey = (value) => {
    if (typeof value === 'object') {
      return this.getItemKey ? this.getItemKey(value) : undefined;
    }
    return value;
  };
  const renderListOptions = () => {
    this.listItemsRefs = [];
    return (index.h(index.Fragment, null,
      this.internalList.map((item, ndx) => {
        const { label, slots, ...rest } = item;
        return (index.h("wpp-list-item-v4-0-0", { ref: el => (this.listItemsRefs[ndx] = el), onWppChangeListItem: this.handleClickListItem, key: convertValueToKey(item.value), ...rest, id: item.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" },
          index.h("span", { slot: "label" }, label),
          slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
      }),
      this.isInfiniteLoading && (index.h("div", { class: "wpp-dropdown-infinite-loader" },
        index.h("wpp-spinner-v4-0-0", null)))));
  };
  const renderSuggestionOptions = () => {
    this.suggestionsItemsRefs = [];
    return (index.h(index.Fragment, null,
      index.h("wpp-typography-v4-0-0", { role: "presentation", type: "s-strong", class: "suggestions-heading" }, this._locales.suggestionTitle),
      this.componentSuggestions?.map((suggestion, ndx) => {
        const { slots, checked, label, ...restProps } = suggestion;
        const isChecked = checked || isSelected(this.value, suggestion, this.getItemKey);
        return (index.h("wpp-list-item-v4-0-0", { ref: el => (this.suggestionsItemsRefs[ndx] = el), onWppChangeListItem: this.handleClickListItem, key: convertValueToKey(suggestion.value), ...restProps, id: suggestion.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${suggestion.id}` : undefined, checked: isChecked, class: { 'suggestion-item': true, 'last-item': ndx === this.componentSuggestions.length - 1 }, role: "option" },
          index.h("span", { slot: "label" }, label),
          slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
      })));
  };
  if (this.loading) {
    return (index.h("wpp-list-item-v4-0-0", { role: "status", "non-interactive": true },
      index.h("wpp-spinner-v4-0-0", { slot: "left" }),
      index.h("span", { slot: "label" }, this._locales.loading)));
  }
  if (!this.visibleOptionsLength && this.searchText.length > 0) {
    return (index.h("wpp-list-item-v4-0-0", { labelTypography: { color: 'var(--wpp-grey-color-700)', type: 's-body' }, nonInteractive: true },
      index.h("wpp-typography-v4-0-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound)));
  }
  if (!this.searchText.trim().length && !!this.componentSuggestions?.length) {
    return renderSuggestionOptions();
  }
  return renderListOptions();
}

function renderExtendedSelectedValuesComponent() {
  return (index.h("div", { class: "selected-values" }, this.extendedSelectedValues?.map(el => (index.h("wpp-pill-v4-0-0", { label: el.label, type: "display", onWppClose: event => this.handleClickListItem({
      ...event,
      ...{ detail: { value: el.value } },
    }), removable: true })))));
}

function renderCreateNewOptionComponent() {
  if (this.loading ||
    !this.showCreateNewElement ||
    this.searchText.length === 0 ||
    (this.displayBtnWhenListEmpty && this.visibleOptionsLength))
    return;
  const handleCreateNewOptionClick = () => {
    this.wppCreateNewOption.emit(this.searchText);
    this.handleBlur(undefined, { force: true });
  };
  return (index.h("div", { class: "wpp-dropdown-actions" },
    index.h("wpp-divider-v4-0-0", null),
    index.h("wpp-list-item-v4-0-0", { onClick: handleCreateNewOptionClick },
      index.h("wpp-typography-v4-0-0", { type: "s-strong", class: "wpp-create-new-option", slot: "label" }, this._locales.createNewElement(this.searchText)))));
}

const wppAutocompleteCss = ":host{--autocomplete-min-width:var(--wpp-autocomplete-min-width, 184px);position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;outline:none;min-width:var(--autocomplete-min-width)}.trigger{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:transparent;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-500);border-radius:var(--wpp-border-radius-m);cursor:text;outline:none}.trigger.size-s{height:32px}.trigger.size-m{height:40px}.trigger:hover{background-color:var(--wpp-grey-color-200);border-color:var(--wpp-grey-color-700)}.trigger:active{background-color:transparent;border-color:var(--wpp-grey-color-800)}.trigger:active .trigger-actions .wpp-icon-chevron,.trigger:active .wpp-icon-cross{color:var(--wpp-icon-color-active)}.trigger.focused{background-color:var(--wpp-grey-color-000);border-color:var(--wpp-grey-color-800)}.trigger.focused .input-placeholder,.trigger.focused .hidden-count{position:absolute;opacity:0;pointer-events:none;visibility:hidden}.trigger.warning,.trigger.warning:hover{border:var(--wpp-border-width-s) solid var(--wpp-warning-color-400)}.trigger.error,.trigger.error:hover{border:var(--wpp-border-width-s) solid var(--wpp-danger-color-400)}.trigger.disabled{background-color:var(--wpp-grey-color-100);border-color:var(--wpp-grey-color-400);pointer-events:none}.trigger.disabled .input-placeholder{--wpp-typography-color:var(--wpp-text-color-disabled)}.trigger.single .hidden-count{right:10px}.label{margin-bottom:8px}.wpp-input{min-width:70px;padding:0;background:transparent;border:none;outline:none;width:calc(100% + 2px);left:-1px;-ms-flex:1 0 auto;flex:1 0 auto;--wpp-input-border-width:0;--wpp-input-bg-color-hover:transparent;--wpp-input-bg-color-active:transparent;--wpp-input-bg-color-disabled:transparent}.wpp-input::-moz-placeholder{color:var(--wpp-grey-color-700);opacity:1}.wpp-input::-webkit-input-placeholder{color:var(--wpp-grey-color-700)}.wpp-input:-ms-input-placeholder{color:var(--wpp-grey-color-700)}.wpp-input::-ms-input-placeholder{color:var(--wpp-grey-color-700)}.wpp-input::placeholder{color:var(--wpp-grey-color-700)}.wpp-input.wpp-size-m{--wpp-input-padding-m:9px 10px 9px 12px}.wpp-input.wpp-size-s{--wpp-input-padding-s:5px 10px 5px 12px}.wpp-input.transparent::part(input){color:transparent}.input-placeholder{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:11px;width:calc(100% - 50px - var(--hidden-count-width, -26px));-ms-flex:1 1 auto;flex:1 1 auto;min-width:0}.input-placeholder.hidden{opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.input-placeholder.disabled{color:var(--wpp-text-color-disabled)}.hidden-input-placeholder{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;visibility:hidden;position:absolute;z-index:-1}.wpp-icon-cross{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:10px;display:-ms-flexbox;display:flex;cursor:pointer}.wpp-icon-cross:hover{color:var(--wpp-icon-color-hover)}.hidden-count{position:absolute;top:50%;right:38px;-webkit-transform:translateY(-50%);transform:translateY(-50%);max-width:0;opacity:0}.hidden-count.computed{max-width:100px;opacity:1}.wpp-icon-cross.wpp-hidden{opacity:0;pointer-events:none}.selected-values{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:8px;margin-top:12px}.selected-values .wpp-pill{max-width:100%}.empty-focus-anchor{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;outline:none}.inline-message{margin-top:4px}";

const WppAutocomplete = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppSearchValueChange = index.createEvent(this, "wppSearchValueChange", 1);
    this.wppCreateNewOption = index.createEvent(this, "wppCreateNewOption", 1);
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
      this.resizeObserver = new ResizeObserver(utils.debounce(() => {
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
      this.tippyInstance = menuListConfig.menuListConfig({
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
          if (utils.isEventTargetContained(this.host, event))
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
        isSame = lodash.lodash.isEqual(current, listItemValue);
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
          return !lodash.lodash.isEqual(v, listItemValue);
        });
      }
      else {
        next = [...this.value, listItemValue];
      }
      if (!already && this.isSelectedItemsLimitReached(this.value))
        return;
      if (!lodash.lodash.isEqual(this.value, next)) {
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
      this.focusType = common.FOCUS_TYPE.NONE;
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
        this.focusType = common.FOCUS_TYPE.TAB;
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
      if (next && !lodash.lodash.isEqual(next, this.internalList))
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
      return utils.selectDropdownWidth(this.dropdownWidth, this.triggerRef, this.host);
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
      if (!lodash.lodash.isEqual(this.value, slicedValue)) {
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
    if (lodash.lodash.isEqual(next, this.internalList))
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
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.handleBlur, onKeyUp: this.onKeyUp, exportparts: "input, dropdown, trigger, label" }, this.labelConfig?.text && (index.h("wpp-label-v4-0-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, onClick: this.handleTriggerClick })), index.h("div", { ref: ref => (this.triggerRef = ref), tabindex: -1, class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, this.renderPlaceholderText(), index.h("wpp-input-v4-0-0", { ref: ref => (this.inputRef = ref), part: "input", type: "text", role: "combobox", "aria-autocomplete": "list", "aria-expanded": this.isDropdownShown.toString(), "aria-controls": `${this.name}-listbox`, autocomplete: "off", class: this.inputCssClasses(), id: this.name, name: this.name, value: this.searchText, onWppChange: this.handleSearch, disabled: this.disabled, required: this.required, placeholder: this.isFocused || this.isDropdownShown || this.value.length > 0 || this.searchText.trim().length > 0
        ? undefined
        : this.placeholder, onInput: this.handleInput, onFocus: this.handleFocus, onKeyDown: this.onKeyDown, size: this.size, withCrossIcon: false, ariaProps: {
        activedescendant: true,
      } }), this.multiple && (index.h("wpp-icon-cross-v4-0-0", { class: this.iconCrossCssClasses(), role: "button", "aria-label": this.multiple ? this._locales.clearMultiple : this._locales.clearSingle, tabindex: this.value.length > 0 && this.multiple ? 0 : -1, onClick: this.handleClearClick, onFocus: this.handleCrossIconFocus, onKeyDown: this.handleCrossIconKeyDown }))), index.h("div", { ref: ref => (this.dropdownRef = ref), class: this.dropdownCssClasses(), part: "dropdown" }, this.isDropdownShown ? (index.h(index.Fragment, null, this.type === 'regular' && this.multiple ? this.renderDropdownPills() : null, index.h("div", { class: "wpp-autocomplete-dropdown-list", onMouseDown: e => e.preventDefault(), onScroll: this.handleOptionsScroll, id: `${this.name}-listbox`, role: "listbox", "aria-label": this.ariaProps?.label, "aria-busy": this.isInfiniteLoading || this.loading }, this.renderDropdownList()), this.renderCreateNewElement())) : null), !!this.message && (index.h("wpp-inline-message-v4-0-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType })), this.type === 'extended' && this.multiple ? this.renderExtendedSelectedValues() : null));
  }
  static get registryIs() { return "wpp-autocomplete-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"],
    "searchText": ["onSearchTextChange"],
    "list": ["onListChange"],
    "placeholderText": ["onPlaceholderTextChange"],
    "isShowMore": ["onShowMoreChange"],
    "extendedSelectedValues": ["onExtendedSelectedValuesChange"],
    "suggestions": ["onSuggestionsChange"],
    "loading": ["onLoadingChange"]
  }; }
};
WppAutocomplete.style = wppAutocompleteCss;

exports.wpp_autocomplete = WppAutocomplete;

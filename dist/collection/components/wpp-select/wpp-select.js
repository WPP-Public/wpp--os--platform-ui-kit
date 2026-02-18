import { h, Fragment } from '@stencil/core';
import { menuListConfig } from '../../common/menuListConfig';
import { FOCUS_TYPE } from '../../types/common';
import { DEFAULT_DROPDOWN_CONFIG, LOCALES_DEFAULTS, MULTIPLE_SELECT_SINGLE_VALUE_ERROR } from './config';
import { isEqual } from 'lodash';
import version from '../../../versioned-components/version';
import { getSlotEmptyStates, isEventTargetContained, transformToVersionedTag } from '../../utils/utils';
import { renderSingleSelect } from './components/wpp-single-select/wpp-single-select';
import { renderMultipleSelect } from './components/wpp-multiple-select/wpp-multiple-select';
import { renderTextSelect } from './components/wpp-text-select/wpp-text-select';
import { renderCombinedSelect } from './components/wpp-combined-select/wpp-combined-select';
const MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH = 10;
const TRUNCATION_DELAY = 100;
/**
 * @slot icon-start - can contain an icon that will be placed before the main content, e.g. a search icon.
 */
export class WppSelect {
  constructor() {
    this.hasReachedLimit = false;
    this.canSelectAll = false;
    this.canClearAll = false;
    // ************************************
    this.LIB_COMPONENTS_PREFIX = 'wpp-';
    this._locales = LOCALES_DEFAULTS;
    this.getSelectedItems = () => {
      if (this.type === 'multiple') {
        const selectedItems = this.internalList?.filter((item) => this.emittedValue.some((emittedValueItem) => isEqual(emittedValueItem, item.value)));
        return selectedItems;
      }
      else {
        const selectedItem = this.internalList?.find((listItem) => isEqual(listItem.value, this.emittedValue));
        return [selectedItem];
      }
    };
    this.checkMessageInTooltip = () => {
      const shouldRenderInTooltip = !!(this.messageInTooltip &&
        this.message &&
        (this.messageType === 'error' || this.messageType === 'warning'));
      if (this.isRenderMessageInTooltip !== shouldRenderInTooltip) {
        this.isRenderMessageInTooltip = shouldRenderInTooltip;
        if (this.tippyInstance)
          this.tippyInstance.destroy();
        setTimeout(() => {
          if (this.portalRef && this.anchorRef) {
            this.createTippyInstance();
          }
        }, 100);
      }
      else {
        this.isRenderMessageInTooltip = shouldRenderInTooltip;
      }
    };
    this.checkTruncationInTextSelect = () => {
      this.shouldTruncate = false;
      setTimeout(() => {
        const textEl = this.host.shadowRoot?.querySelector('#select-text');
        if (textEl) {
          this.shouldTruncate = textEl.clientWidth > this.host.clientWidth;
        }
      }, TRUNCATION_DELAY);
    };
    this.onUpdateListSingle = () => {
      // This function is called when "this.list" has been updated in the single select.
      const searchTextLowerCase = this.searchText.toLowerCase().trim();
      this.internalList = [
        ...this.list.map((listItem) => {
          const hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
          const checked = isEqual(listItem.value, this.value);
          if (checked) {
            this.renderedText = listItem.label;
          }
          return {
            ...listItem,
            checked,
            hidden,
            highlight: this.searchText,
          };
        }),
      ];
    };
    this.onUpdateListMultiple = () => {
      // This function is called when "this.list" has been updated in the multiple select.
      // We count again all checked and visible items and all disabled or hidden items.
      let checkedItems = 0;
      let disabledItems = 0;
      const searchTextLowerCase = this.searchText.toLowerCase().trim();
      this.internalList = [
        ...this.list.map((listItem) => {
          const hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
          const checked = !!this.value?.find((valueItem) => isEqual(listItem.value, valueItem));
          if (listItem.disabled) {
            disabledItems++;
          }
          else if (checked) {
            checkedItems++;
          }
          return {
            ...listItem,
            hidden,
            checked,
            selectable: true,
            multiple: true,
            highlight: this.searchText,
          };
        }),
      ];
      this.updateItemsAfterChangeMultiple(checkedItems, disabledItems);
    };
    this.updateItemsAfterChangeMultiple = (checkedItems, disabledItems) => {
      this.checkedItems = checkedItems;
      this.disabledItems = disabledItems;
      this.setRenderedTextMultiple();
      if (this.maximumSelectedItems) {
        if (this.checkedItems >= this.maximumSelectedItems) {
          this.disableOtherElements();
        }
        else {
          this.enablePreviousElements();
        }
      }
      if (this.internalList?.length === 0) {
        this.canSelectAll = false;
        this.canClearAll = false;
      }
      else {
        this.canSelectAll = this.maximumSelectedItems
          ? false
          : this.checkedItems < this.internalList?.length - this.disabledItems;
        this.canClearAll = this.checkedItems >= 1;
      }
    };
    this.checkListAgainstValueSingle = () => {
      // Check items against value provided to component and set renderedText in input. This function is called for single-select.
      this.internalList?.forEach((listItem) => {
        const checked = isEqual(listItem.value, this.value);
        if (checked) {
          this.renderedText = listItem.label;
        }
        listItem.checked = checked;
      });
    };
    this.checkListAgainstValueMultiple = () => {
      // Every time value changes, we make updates to the list and count again
      // the "checked and visible" items and "disabled or hidden" ones.
      let checkedItems = 0;
      let disabledItems = 0;
      this.internalList?.forEach((listItem) => {
        const checked = !!this.value?.find((item) => isEqual(listItem.value, item));
        if (listItem.disabled) {
          disabledItems++;
        }
        else if (checked) {
          checkedItems++;
        }
        listItem.checked = checked;
      });
      this.updateItemsAfterChangeMultiple(checkedItems, disabledItems);
    };
    this.convertValueToKey = (value) => {
      if (typeof value === 'object') {
        return this.getItemKey ? this.getItemKey(value) : undefined;
      }
      return value;
    };
    this.renderList = () => {
      if (!this.isOpen) {
        return h(Fragment, null);
      }
      if (this.loading) {
        return (h("div", { class: "loading-container" }, h("wpp-spinner-v3-5-0", null), h("wpp-typography-v3-5-0", { type: "s-body" }, this._locales.loadingText)));
      }
      if (this.internalList?.length === 0) {
        return (h("wpp-typography-v3-5-0", { class: "nothing-found", type: "s-body" }, this._locales.emptyText));
      }
      let hiddeItemsCount = 0;
      return (h(Fragment, null, this.internalList?.map((item) => {
        const { label, hidden, ...rest } = item;
        if (hidden) {
          hiddeItemsCount++;
          if (hiddeItemsCount === this.internalList?.length) {
            return (h("wpp-typography-v3-5-0", { class: "nothing-found", type: "s-body" }, this._locales.emptyText));
          }
          return null;
        }
        return (h("wpp-list-item-v3-5-0", { onWppChangeListItem: this.handleClickListItem, key: this.convertValueToKey(item.value), ...rest, id: item.id !== undefined ? `${this.LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined }, h("p", { slot: "label" }, label), item?.slots && this.renderSlotsInListItem(item.slots, Boolean(label)).map((slotNode) => slotNode)));
      })));
    };
    this.renderSlotsInListItem = (slots, isLabelExists) => slots
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
        ? this.renderSlotsInListItem(Array.from(children), isLabelExists)
        : this.renderSlotsInListItem([children], isLabelExists);
      return slotNode;
    })
      .filter(item => item !== null);
    this.setHasBeenInternallyDisabled = (listItem) => {
      if (listItem.hasBeenInternallyDisabled)
        return true;
      if (listItem.disabled || listItem.checked)
        return null;
      return true;
    };
    this.disableOtherElements = () => {
      if (this.hasReachedLimit)
        return;
      let disabledItems = 0;
      // This function is called when items in the list are checked
      // and "maximumSelectedItems" property is defined.
      this.internalList?.forEach((listItem) => {
        if (listItem.hasBeenInternallyDisabled || listItem.disabled || !(listItem.disabled || listItem.checked)) {
          disabledItems++;
        }
        listItem.hasBeenInternallyDisabled = this.setHasBeenInternallyDisabled(listItem);
        listItem.disabled = listItem.disabled ? listItem.disabled : !listItem.checked;
      });
      this.disabledItems = disabledItems;
      this.hasReachedLimit = true;
    };
    this.enablePreviousElements = () => {
      if (!this.hasReachedLimit)
        return;
      let disabledItems = 0;
      // This function is called to revert the effects of "this.disableOtherElements"
      this.internalList?.forEach((listItem) => {
        if (listItem.hasBeenInternallyDisabled) {
          listItem.disabled = false;
          listItem.hasBeenInternallyDisabled = null;
        }
        if (this.disabled) {
          disabledItems++;
        }
      });
      this.disabledItems = disabledItems;
      this.hasReachedLimit = false;
    };
    this.checkIfTextOverflows = () => {
      if (this.inputRef) {
        this.inputRef.style.width = this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto';
        this.textOverflows = this.inputRef.scrollWidth > this.inputRef.clientWidth;
      }
    };
    this.setRenderedTextMultiple = () => {
      const labels = [];
      let numberOfExtraItems = 0;
      // We need to parse this.value in order to get the labels in the exact order they
      // were selected.
      this.value?.forEach((valueItem) => {
        const listItem = this.internalList?.find((listItem) => isEqual(valueItem, listItem.value));
        if (listItem) {
          if (labels.length >= this.maxItemsToDisplay) {
            numberOfExtraItems++;
          }
          else {
            labels.push(listItem.label);
          }
        }
      });
      if (numberOfExtraItems > 0) {
        this.renderedText = `${labels.join(', ')}, +${numberOfExtraItems}`;
      }
      else {
        this.renderedText = labels.join(', ');
      }
    };
    this.onShowDropdown = (instance) => {
      if (!this.anchorRef)
        return false;
      if (this.type === 'text' || this.isTextSelect) {
        this.onShowDropdownText(instance);
      }
      else {
        // Set width of dropdown based on "dropdownWidth" property and "this.anchorRef"
        if (this.dropdownWidth !== 'auto') {
          instance.popper.style.width = `${Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth, 10))}px`;
        }
        else {
          instance.popper.style.width = `${this.anchorRef.clientWidth}px`;
        }
      }
      if (this.dropdownConfig?.onShow) {
        if (this.dropdownConfig.onShow(instance) === false) {
          return false;
        }
        this.dropdownConfig?.onShow(instance);
      }
      this.isOpen = true;
    };
    this.onShowDropdownText = (instance) => {
      if (!this.anchorRef)
        return;
      if (this.dropdownWidth === 'auto') {
        if (this.anchorRef.clientWidth < 350) {
          instance.setProps({ maxWidth: '350px' });
          instance.popper.style.width = 'auto';
        }
        else {
          instance.setProps({ maxWidth: `${this.anchorRef.clientWidth}px` });
          instance.popper.style.width = `${this.anchorRef.clientWidth}px`;
        }
      }
      else {
        const widthValue = Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth));
        instance.setProps({ maxWidth: `${widthValue}px` });
        instance.popper.style.width = `${widthValue}px`;
      }
    };
    this.onHiddenDropdown = (instance) => {
      this.isOpen = false;
      if (!this.consistentSearch) {
        this.searchText = '';
      }
      if (this.dropdownConfig?.onHidden) {
        this.dropdownConfig?.onHidden(instance);
      }
    };
    this.createTippyInstance = () => {
      if (!this.anchorRef || !this.portalRef)
        return;
      this.tippyInstance = menuListConfig({
        anchor: this.anchorRef,
        content: this.portalRef,
        ...DEFAULT_DROPDOWN_CONFIG,
        ...this.dropdownConfig,
        onShow: (instance) => {
          if (this.disabled)
            return false;
          this.setShouldShowSearch();
          // Re-position in case it was not position correctly initially.
          setTimeout(() => {
            instance.popperInstance?.update();
          }, 0);
          return this.onShowDropdown(instance);
        },
        onShown: (instance) => {
          this.updateScrollState();
          if (['single', 'multiple'].includes(this.type)) {
            this.focusSearchInput();
          }
          else {
            this.focusFirstListItem();
          }
          if (this.dropdownConfig?.onShown) {
            this.dropdownConfig?.onShown(instance);
          }
        },
        onHide: (instance) => {
          this.onBlur();
          if (this.dropdownConfig?.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: this.onHiddenDropdown,
        onClickOutside: (instance, event) => {
          if (this.tippyInstance && !isEventTargetContained(this.host, event)) {
            this.tippyInstance.hide();
          }
          if (this.dropdownConfig?.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
      });
    };
    this.focusFirstListItem = () => {
      if (!this.portalRef)
        return;
      const listItem = this.portalRef.querySelector('.wpp-list-item');
      if (!listItem)
        return;
      listItem.setFocus();
    };
    this.focusSearchInput = () => {
      if (!this.portalRef)
        return;
      const inputEl = this.portalRef.querySelector('.select-portal-search-input');
      setTimeout(() => {
        if (!inputEl)
          return;
        inputEl.setFocus();
      }, 0);
    };
    this.handleSearch = (event) => {
      const searchValue = event.detail.value;
      if (searchValue === undefined) {
        this.searchText = '';
        return;
      }
      this.searchText = searchValue;
    };
    this.handleClickListItem = (event) => {
      const listItemValue = event.detail.value;
      if (listItemValue === undefined)
        return;
      if (this.type === 'multiple') {
        this.onClickListItemMultiple(listItemValue);
      }
      else {
        this.onClickListItemSingle(listItemValue);
      }
    };
    this.onClickListItemSingle = (listItemValue) => {
      if (isEqual(this.value, listItemValue)) {
        this.tippyInstance?.hide();
        return;
      }
      else {
        this.emittedValue = listItemValue;
        // Hide dropdown only when user clicked a new item.
        this.tippyInstance?.hide();
      }
    };
    this.onClickListItemMultiple = (listItemValue) => {
      const valueItem = this.value?.find((item) => isEqual(item, listItemValue));
      if (valueItem) {
        this.emittedValue = this.value
          ? [...this.value.filter((item) => !isEqual(item, listItemValue))]
          : [];
      }
      else {
        this.emittedValue = [...this.value, listItemValue];
      }
    };
    this.updateScrollState = () => {
      if (!this.listRef)
        return;
      this.withScroll = this.listRef.scrollHeight > this.listRef.clientHeight;
    };
    this.handleSelectAll = () => {
      // We select all the items that are not disabled. Even hidden ones.
      const valueOfItems = [];
      this.internalList?.forEach((listItem) => {
        if (!listItem.disabled) {
          valueOfItems.push(listItem.value);
        }
        listItem.checked = listItem.disabled ? listItem.checked : true;
      });
      this.emittedValue = [...valueOfItems];
    };
    this.handleClearAll = () => {
      // We un-check all items that are not disabled. Even hidden ones.
      const valueOfItems = [];
      this.internalList?.forEach((listItem) => {
        if (listItem.checked && listItem.disabled) {
          valueOfItems.push(listItem.value);
        }
        listItem.checked = listItem.disabled ? listItem.checked : false;
      });
      this.emittedValue = [...valueOfItems];
    };
    this.setShouldShowSearch = () => {
      if (!this.host)
        return false;
      if (this.type === 'text' || this.isTextSelect) {
        this.shouldShowSearch = false;
        return;
      }
      this.shouldShowSearch =
        (this.host?.getAttributeNames().includes('with-search') && !['auto', false].includes(this.withSearch)) ||
          (this.withSearch === 'auto' && this.list.length >= MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH);
    };
    this.handleClick = (shouldFocus) => {
      if (!this.tippyInstance || this.disabled || this.displayValue !== undefined)
        return;
      if (shouldFocus) {
        this.focusType = FOCUS_TYPE.TAB;
        this.anchorRef?.focus();
      }
      if (this.tippyInstance.state.isVisible) {
        this.tippyInstance.hide();
      }
      else {
        this.tippyInstance.show();
      }
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
        anchorButton: '[slot="anchor-button"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
      this.anchorButton = !emptyStates.anchorButton;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.tippyInstance?.show();
      }
    };
    this.onKeyDownPortal = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.tippyInstance?.hide();
        this.anchorRef?.focus();
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      if (event?.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget)) {
        return;
      }
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.hasErrorsOrWarnings = (type) => this.message ? this.message.length > 0 && this.messageType === type : false;
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
      disabled: this.disabled,
    });
    this.labelCssClasses = () => ({
      disabled: this.disabled,
    });
    this.isOpen = false;
    this.searchText = '';
    this.internalList = undefined;
    this.renderedText = undefined;
    this.emittedValue = undefined;
    this.hasIconStartSlot = false;
    this.anchorButton = false;
    this.shouldShowSearch = false;
    this.focusType = undefined;
    this.isRenderMessageInTooltip = false;
    this.withScroll = false;
    this.checkedItems = 0;
    this.disabledItems = 0;
    this.textOverflows = false;
    this.isContainerFocused = false;
    this.shouldTruncate = false;
    this.consistentSearch = false;
    this.value = undefined;
    this.list = [];
    this.type = 'single';
    this.isTextSelect = false;
    this.withSearch = 'auto';
    this.disabled = false;
    this.required = false;
    this.autoFocus = false;
    this.loading = false;
    this.withFolder = false;
    this.truncate = true;
    this.maximumSelectedItems = undefined;
    this.getItemKey = undefined;
    this.placeholder = undefined;
    this.name = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.size = 'm';
    this.enableStaticOptions = false;
    this.maxItemsToDisplay = 2;
    this.dropdownWidth = 'auto';
    this.displayValue = undefined;
    this.isDropdownOpen = false;
    this.ariaProps = {};
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.dropdownConfig = {};
    this.locales = {};
    this.showSelectAllText = true;
    this.inputValue = undefined;
    this.maskOptions = undefined;
    this.inputType = 'text';
    this.tooltipConfig = {};
    this.messageInTooltip = false;
  }
  onUpdateDisplayValue() {
    if (this.type === 'single' && this.displayValue !== undefined) {
      setTimeout(() => {
        this.checkIfTextOverflows();
      }, 50);
    }
  }
  onUpdateValue() {
    if (this.type === 'multiple' && !Array.isArray(this.value)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
    }
    // Every time this.value changes the text in the anchor is changed.
    this.renderedText = '';
    this.emittedValue = this.value;
    // We filter the whole list passed to the component, not just the renderedList,
    // because we can select items programatically that are not currently visible
    if (this.type === 'multiple') {
      this.checkListAgainstValueMultiple();
    }
    else {
      this.checkListAgainstValueSingle();
    }
    if (this.type === 'text' || this.isTextSelect) {
      if (this.truncate) {
        this.checkTruncationInTextSelect();
      }
    }
    else {
      requestAnimationFrame(() => {
        this.checkIfTextOverflows();
      });
    }
  }
  onUpdateEmittedValue() {
    // Every time this.emittedValue is changed, we emit it, except when it is equal to this.value. The user will change
    // the value of the component on his side and this.onUpdateValue is triggered.
    if (isEqual(this.value, this.emittedValue))
      return;
    this.value = this.type === 'multiple' ? [...this.emittedValue] : this.emittedValue;
    this.wppChange.emit({
      value: this.value,
      selectedItems: this.getSelectedItems(),
      ...(this.name !== undefined && { name: this.name }),
      ...(this.type === 'combined'
        ? { inputValue: this.inputValue || '' }
        : this.shouldShowSearch && { inputValue: this.searchText }),
    });
  }
  onUpdateList() {
    // When "enableStaticOptions=true", only the initial list is taken into consideration.
    if (this.enableStaticOptions)
      return;
    this.renderedText = '';
    if (this.type === 'multiple') {
      this.onUpdateListMultiple();
    }
    else {
      this.onUpdateListSingle();
    }
    // Every time "this.list" changes, we check if we can still render search input.
    this.setShouldShowSearch();
  }
  onUpdateSearchText() {
    if (this.searchText === '') {
      this.internalList?.forEach((listItem) => {
        listItem.highlight = '';
        listItem.hidden = false;
      });
      return;
    }
    // When search changes, we also set "highlight=this.searchText" in order to
    // highlight characters in each label.
    const searchTextLowerCase = this.searchText.toLowerCase().trim();
    this.internalList?.forEach((listItem) => {
      listItem.highlight = this.searchText;
      listItem.hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase);
    });
  }
  onUpdateLoading() {
    if (!this.loading) {
      setTimeout(() => {
        this.updateScrollState();
      }, 50);
    }
  }
  onUpdateMaximumSelectedItems() {
    this.canSelectAll = this.maximumSelectedItems ? false : true;
    if (this.maximumSelectedItems) {
      if (this.checkedItems === this.maximumSelectedItems) {
        this.hasReachedLimit = false;
        this.disableOtherElements();
        this.setRenderedTextMultiple();
        return;
      }
      else if (this.checkedItems > this.maximumSelectedItems) {
        this.hasReachedLimit = false;
        const values = this.value.slice(0, this.maximumSelectedItems);
        this.emittedValue = values;
        return;
      }
    }
    this.enablePreviousElements();
    this.setRenderedTextMultiple();
  }
  onUpdateMessage() {
    this.checkMessageInTooltip();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  /**
   * Sets focus on the select and opens the dropdown.
   */
  async setFocus() {
    this.handleClick(true);
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    if (this.type === 'text')
      console.warn('The value "text" for the type property is deprecated and will be removed in version 4.0.0.');
    this.versionToCompare = version.slice(1).split('-').join('');
    this.updateSlotData();
    this.checkMessageInTooltip();
    // Specific "componentWillLoad()" behaviour based on type of component.
    if (this.type === 'multiple') {
      if (!Array.isArray(this.value)) {
        throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR);
      }
      // Search is controlled by the component, so initially all items should have "hidden: false"
      this.internalList = [
        ...this.list.map((item) => ({
          ...item,
          selectable: true,
          multiple: true,
          hidden: false,
          checked: false,
        })),
      ];
      if (this.value?.length > 0) {
        this.checkListAgainstValueMultiple();
      }
      else {
        this.canClearAll = false;
        this.canSelectAll = true;
      }
    }
    else {
      this.internalList = [
        ...this.list.map((listItem) => ({ ...listItem, hidden: false, checked: false })),
      ];
      if (this.value === undefined)
        return;
      this.checkListAgainstValueSingle();
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      if (this.displayValue === undefined) {
        this.createTippyInstance();
      }
      if (this.anchorRef &&
        this.autoFocus &&
        document.activeElement?.tagName.toLowerCase() !== transformToVersionedTag(`${this.LIB_COMPONENTS_PREFIX}select`)) {
        // If multiple select elements on a page have the "this.autoFocus=true" property,
        // we should open only the first select with this property.
        this.handleClick(true);
      }
      if (this.type !== 'text' || !this.isTextSelect) {
        this.resizeObserver = new ResizeObserver(this.checkIfTextOverflows);
        if (this.resizeObserver && this.anchorRef) {
          this.resizeObserver.observe(this.anchorRef);
        }
      }
      else {
        if (this.truncate) {
          this.checkTruncationInTextSelect();
        }
      }
    });
  }
  connectedCallback() {
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    if (this.tippyInstance) {
      this.tippyInstance.destroy();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    if (this.type === 'single' && !this.isTextSelect) {
      return renderSingleSelect.call(this, true, this.size, this.isRenderMessageInTooltip);
    }
    if (this.type === 'multiple') {
      return renderMultipleSelect.call(this);
    }
    if (this.type === 'text' || (this.type === 'single' && this.isTextSelect)) {
      return renderTextSelect.call(this);
    }
    return renderCombinedSelect.call(this);
  }
  static get is() { return "wpp-select"; }
  static get registryIs() { return "wpp-select-v3-5-0"; }
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
      "consistentSearch": {
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
          "text": "If `true`, the search input should retain its value when the dropdown is closed.\nThis is useful for cases where the user might want to continue searching"
        },
        "attribute": "consistent-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "SelectValue | SelectValue[]",
          "resolved": "any",
          "references": {
            "SelectValue": {
              "location": "import",
              "path": "../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::SelectValue"
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
      "list": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ListItemInterface[]",
          "resolved": "ListItemInterface[]",
          "references": {
            "ListItemInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::ListItemInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "List of items in the dropdown. The items should have at least a `label` and a `value`."
        },
        "defaultValue": "[]"
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
              "path": "../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::SelectTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the WppSelect component type.\n* Valid values: 'single' | 'multiple' | 'combined'\n* Note: The value 'text' is deprecated and will be removed in version 4.0.0. Use WppActionButton with WppMenuContext to achieve the same result."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'single'"
      },
      "isTextSelect": {
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
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": "This is property for internal use only. It is used to render text variant of the WppSelect component (used in WppPagination component)"
        },
        "attribute": "is-text-select",
        "reflect": false,
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
          "text": "If `true`, the input should be focused on page load."
        },
        "attribute": "auto-focus",
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
        "reflect": false,
        "defaultValue": "false"
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
          "text": "If `true` the dropdown has controls folder, meaning that the \"Select All\" and \"Clear All\" button will appear at the bottom of the dropdown.\nThis property works just for the multiple select."
        },
        "attribute": "with-folder",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "Defines the maximum number of items the user can select in a dropdown. If the maximum number is reached, the other items are disabled.\nThis property can be used only on the \"multiple\" select."
        },
        "attribute": "maximum-selected-items",
        "reflect": false
      },
      "getItemKey": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(value: ListValue) => string | number | undefined",
          "resolved": "(value: ListValue) => string | number | undefined",
          "references": {
            "ListValue": {
              "location": "import",
              "path": "../wpp-list-item/types",
              "id": "src/components/wpp-list-item/types.ts::ListValue"
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
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SelectLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "SelectLabelConfig": {
              "location": "import",
              "path": "../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::SelectLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the configuration of the label."
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
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
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
              "path": "../wpp-select/types",
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
          "text": "If true, wouldn't update `select` when the list changes."
        },
        "attribute": "enable-static-options",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the displayed input value. If provided overrides the existing displayed value.\nThis property should be used only in custom single selects."
        },
        "attribute": "display-value",
        "reflect": false
      },
      "isDropdownOpen": {
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
          "text": "Defines if the dropdown of the select is opened or not. This property is used to control the direction of chevron icon (opened / closed).\nThis property should be used only in custom single selects."
        },
        "attribute": "is-dropdown-open",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the input message. The message is placed right below the select."
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
          "text": "Defines the input message type, which can be \"error\" or \"warning\". This property\nhas to be used together with \"message\"."
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
          "text": "Defines the input message maximum length. The message will get truncated after\nlimit is reached. This property has to be used together with \"message\"."
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
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<SelectLocaleInterface>",
          "resolved": "{ emptyText?: string | undefined; clearAllText?: string | undefined; selectAllText?: string | undefined; searchInputPlaceholder?: string | undefined; allSelectedText?: string | undefined; selectLabel?: string | undefined; loadingText?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "SelectLocaleInterface": {
              "location": "import",
              "path": "../wpp-select/types",
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
        "defaultValue": "{}"
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
      "maskOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MaskOptions",
          "resolved": "undefined | { decimalPatternOptions?: MaskitoNumberParams | undefined; maskPlaceholder?: string | undefined; customPatternOptions?: MaskitoOptions | undefined; telPatternOptions?: MaskitoTelephoneParams | undefined; }",
          "references": {
            "MaskOptions": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::MaskOptions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the custom mask options. Currently, it can be used with the following types: 'decimal', 'text', 'tel'\nNOTE: Used only in `WppCombinedSelect`."
        }
      },
      "inputType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputTypes",
          "resolved": "\"decimal\" | \"email\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"url\"",
          "references": {
            "InputTypes": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::InputTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the type of input\nNOTE: Used only in `WppCombinedSelect`"
        },
        "attribute": "input-type",
        "reflect": false,
        "defaultValue": "'text'"
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
          "text": "Defines the dropdown configuration of the tooltip of the select's message. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "messageInTooltip": {
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
          "text": "Render error/warning/info message in tooltip instead of an inline message below a select element"
        },
        "attribute": "message-in-tooltip",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isOpen": {},
      "searchText": {},
      "internalList": {},
      "renderedText": {},
      "emittedValue": {},
      "hasIconStartSlot": {},
      "anchorButton": {},
      "shouldShowSearch": {},
      "focusType": {},
      "isRenderMessageInTooltip": {},
      "withScroll": {},
      "checkedItems": {},
      "disabledItems": {},
      "textOverflows": {},
      "isContainerFocused": {},
      "shouldTruncate": {}
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
          "original": "SelectChangeEventDetails",
          "resolved": "SelectChangeEventDetails",
          "references": {
            "SelectChangeEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-select/types.ts::SelectChangeEventDetails"
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
          "text": "Sets focus on the select and opens the dropdown.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "displayValue",
        "methodName": "onUpdateDisplayValue"
      }, {
        "propName": "value",
        "methodName": "onUpdateValue"
      }, {
        "propName": "emittedValue",
        "methodName": "onUpdateEmittedValue"
      }, {
        "propName": "list",
        "methodName": "onUpdateList"
      }, {
        "propName": "searchText",
        "methodName": "onUpdateSearchText"
      }, {
        "propName": "loading",
        "methodName": "onUpdateLoading"
      }, {
        "propName": "maximumSelectedItems",
        "methodName": "onUpdateMaximumSelectedItems"
      }, {
        "propName": "messageInTooltip",
        "methodName": "onUpdateMessage"
      }, {
        "propName": "message",
        "methodName": "onUpdateMessage"
      }, {
        "propName": "messageType",
        "methodName": "onUpdateMessage"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}

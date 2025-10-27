import { Fragment, h, Host, } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { autoFocusElement, isEventTargetContained, selectDropdownWidth, transformToVersionedTag, } from '../../utils/utils';
import { menuListConfig } from '../../common/menuListConfig';
import { FOCUS_TYPE } from '../../types/common';
import { Z_INDEX } from '../../common/consts';
import { BLUR_TIME, DROPDOWN_ANIMATION_TIME, LOCALES_DEFAULTS } from './const';
// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
/**
 * @slot - Should contain a list of `wpp-list-item` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part dropdown-header - Dropdown header
 * @part options - Options list container
 * @part anchor - Search input tooltip
 */
export class WppSearch {
  constructor() {
    this.hasActiveEllipses = false;
    this._locales = LOCALES_DEFAULTS;
    // Used instead of Tippy's `state.isShown`, which is not updated when transitioning
    this.isDropdownShown = false;
    this.valueResizeObserver = () => {
      if (this.valuesContainerEl) {
        this.valuesResizeObserver = new ResizeObserver(() => {
          if (this.isDropdownShown) {
            this.tippyInstance?.popperInstance?.forceUpdate();
          }
        });
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
          zIndex: Z_INDEX.SEARCH,
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
          onClickOutside: (_, event) => {
            if (!isEventTargetContained(this.host, event)) {
              this.hideDropdown();
            }
          },
          onHidden: () => {
            this.isInComponent = false;
          },
        });
      }
    };
    this.hasClearButton = () => !!this.value.length && !this.isDropdownShown;
    this.hasSearchButton = () => true;
    this.hasSimpleSearch = () => this.simpleSearch && !this.infinite;
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
    this.isOptionHidden = (option) => {
      if (!this.hasSimpleSearch()) {
        return false;
      }
      const trimmedSearch = this.searchValue.trim().toLocaleLowerCase();
      if (!trimmedSearch)
        return false;
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
    this.isOptionChecked = (option) => {
      if (option.value && this.value.length) {
        const checkedID = this.getOptionId(option.value);
        return this.getOptionId(this.value[0]) === checkedID;
      }
      return false;
    };
    this.scrollOptionsToTop = () => {
      if (this.optionsListEl) {
        this.optionsListEl.scrollTop = 0;
      }
    };
    this.isOptionNodesChanged = (nextOptions) => nextOptions.length !== this.optionElements?.length ||
      !nextOptions.every((el, index) => this.optionElements?.[index] === el);
    this.getOptionElements = () => Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-list-item')));
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
        this.tippyInstance?.hide();
        this.isDropdownShown = false;
      }
    };
    this.updateOptions = () => {
      this.shownOptionElements = [];
      this.optionElements?.forEach(option => {
        option.selectable = true;
        option.hidden = this.isOptionHidden(option);
        option.checked = this.isOptionChecked(option);
        if (this.highlight) {
          option.highlight = this.searchValue;
        }
        if (!option.hidden) {
          this.shownOptionElements.push(option);
        }
      });
      this.isEmptyOptions = !this.shownOptionElements.length;
    };
    this.handleTriggerContainerMouseDown = (event) => {
      if (!this.disabled) {
        // Prevent input blur when the component is used
        if (event.target !== this.inputEl) {
          event.preventDefault();
        }
      }
    };
    this.handleTriggerClick = () => {
      if (!this.isFocused) {
        this.focusInput();
      }
    };
    this.handleMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handleInputMouseDown = () => {
      if (this.openDropdownOnClick) {
        this.showDropdown();
      }
    };
    this.handleKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.handleInput = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.searchValue = this.inputEl?.value || '';
      if (this.searchValue) {
        this.showDropdown();
      }
      else if (!this.value.length && !this.openDropdownOnClick) {
        this.hideDropdown();
      }
    };
    this.handleFocus = (event) => {
      this.isInComponent = true;
      if (!this.isFocused) {
        this.isFocused = true;
        if (this.value.length) {
          this.showDropdown();
        }
        if (this.canLoadMore() && this.isEmptyOptions && !this.loading) {
          this.requestLoadMore();
        }
      }
      this.wppFocus.emit(event);
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
    // We allow input blur only when the dropdown is hidden or the component got disabled.
    // Outside clicks will close the dropdown first.
    this.handleBlur = () => {
      if (this.isInComponent)
        return;
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled) {
        this.hideDropdown();
      }
      if (!this.isDropdownShown) {
        this.isFocused = false;
        // Need setTimeout method to wait until closing animation is finished
        setTimeout(() => {
          this.searchValue = '';
        }, BLUR_TIME);
      }
      else {
        this.focusInput();
      }
      this.wppBlur.emit();
    };
    this.isEllipsisActive = (e) => e.offsetWidth < e.scrollWidth;
    // For some reason this handler is not triggered by the browser
    // while Tippy instance is being created. Though it is covered
    // after the dropdown is opened, since Tippy moves the dropdown node.
    this.handleOptionsChange = () => {
      const placeholderContent = this.placeholderEl?.shadowRoot?.querySelector('[part="typography"]');
      this.hasActiveEllipses = placeholderContent ? this.isEllipsisActive(placeholderContent) : false;
      const currentNodes = this.getOptionElements();
      const isNodesChanged = this.isOptionNodesChanged(currentNodes);
      if (isNodesChanged) {
        this.optionElements = currentNodes;
        this.updateOptions();
      }
    };
    this.handleClearClick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.value = [];
      this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name });
    };
    this.hostCssClasses = () => ({
      'wpp-search': true,
      'wpp-disabled': this.disabled,
    });
    this.searchWrapperCssClasses = () => ({
      'search-wrapper': true,
    });
    this.triggerCssClasses = () => ({
      trigger: true,
      'with-value': this.value.length > 0 || this.searchValue.length > 0,
      disabled: this.disabled,
      focused: this.isFocused,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: !!this.size,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.inputCssClasses = () => ({
      'search-input': true,
      hidden: !this.isFocused && this.value.length > 0,
    });
    this.labelCssClasses = () => ({
      label: true,
      focused: this.isFocused,
    });
    this.dropdownListCssClasses = () => ({
      'dropdown-list': true,
      hidden: !this.showOptions,
    });
    this.tooltipCSSClasses = () => ({
      'with-tooltip': true,
      visible: !this.isFocused && this.value.length > 0,
    });
    this.hostStyle = () => {
      const style = {
        '--wpp-list-item-width': '100%',
      };
      return style;
    };
    this.getInputValue = () => this.searchValue;
    this.renderInputPlaceholder = () => {
      if ((this.isFocused && !this.searchValue) || this.isDropdownShown || !this.value.length)
        return null;
      return (h("wpp-typography-v3-3-0", { type: "s-body", class: "input-placeholder", ref: placeholderEl => (this.placeholderEl = placeholderEl) }, this.getOptionLabel(this.value[0])));
    };
    this.getDropdownWidth = () => {
      if (this.dropdownWidth === 'auto') {
        return this.triggerEl ? `${this.triggerEl.offsetWidth}px` : `${this.host.offsetWidth}px`;
      }
      return selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host);
    };
    this.renderDropdownContent = () => {
      if (!this.showOptions || !this.isFocused)
        return null;
      if (this.isFocused && !this.searchValue.trim() && !this.openDropdownOnClick)
        return null;
      if (this.value.length && !this.isFocused)
        return null;
      if (this.loading) {
        return (h("div", { class: "loading" }, h("wpp-spinner-v3-3-0", { slot: "left" }), h("wpp-typography-v3-3-0", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (this.isEmptyOptions) {
        return (h(Fragment, null, h("wpp-list-item-v3-3-0", { class: "nothing-found-wrapper" }, h("wpp-typography-v3-3-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound))));
      }
      return (h(Fragment, null, !!this._locales.dropdownHeader && (h("wpp-list-item-v3-3-0", { class: "dropdown-header", part: "dropdown-header" }, h("wpp-typography-v3-3-0", { type: "s-strong", slot: "label" }, this._locales.dropdownHeader))), h("slot", null), h("div", null, this.isInfiniteLoading && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v3-3-0", null))))));
    };
    this.isFocused = false;
    this.searchValue = '';
    this.isEmptyOptions = true;
    this.isInfiniteLoading = false;
    this.focusType = undefined;
    this.isInComponent = false;
    this.name = undefined;
    this.loading = false;
    this.disabled = false;
    this.autoFocus = false;
    this.placeholder = undefined;
    this.value = [];
    this.getOptionId = item => item.id;
    this.getOptionLabel = item => item.label;
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.dropdownConfig = {};
    this.size = 'm';
    this.locales = {};
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelConfig = undefined;
    this.simpleSearch = false;
    this.dropdownWidth = 'auto';
    this.highlight = true;
    this.openDropdownOnClick = false;
    this.showOptions = true;
    this.infinite = false;
    this.infiniteLastPage = true;
    this.loadMore = undefined;
  }
  handleOptionToggle(event) {
    this.value = event.detail.checked
      ? [event.detail.value]
      : this.value.filter(option => this.getOptionId(option) !== this.getOptionId(event.detail.value));
    this.optionElements?.forEach(option => {
      option.checked = this.isOptionChecked(option);
    });
    this.searchValue = '';
    this.wppChange.emit({
      value: this.value,
      reason: event.detail.checked ? 'selectOption' : 'removeOption',
      name: this.name,
    });
  }
  onNextValueChange() {
    this.hideDropdown();
    this.blurInput();
    this.optionElements?.forEach(option => {
      option.checked = this.isOptionChecked(option);
    });
  }
  onSearchValueChange(initSearchValue) {
    const searchValue = initSearchValue.trim();
    if (!this.hasSimpleSearch()) {
      this.wppSearchValueChange.emit(searchValue);
      this.optionElements?.forEach(option => {
        option.checked = this.isOptionChecked(option);
        if (this.highlight)
          option.highlight = this.searchValue;
      });
      return;
    }
    if (!searchValue && !this.openDropdownOnClick) {
      this.optionElements?.forEach(option => {
        option.hidden = true;
      });
      this.shownOptionElements = [];
      this.isEmptyOptions = false;
      return [];
    }
    this.shownOptionElements = [];
    this.optionElements?.forEach(option => {
      option.hidden = this.isOptionHidden(option);
      option.checked = this.isOptionChecked(option);
      if (this.highlight) {
        option.highlight = searchValue;
      }
      if (!option.hidden) {
        this.shownOptionElements.push(option);
      }
    });
    this.isEmptyOptions = !this.shownOptionElements.length;
    this.wppSearchValueChange.emit(searchValue);
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  onLoadingChange(loading) {
    setTimeout(() => {
      this.handleOptionsChange();
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
    this.optionElements = this.getOptionElements();
    this.updateOptions();
  }
  componentDidLoad() {
    // Watches the size of values container, which changes when
    // search is focused and `limitLines` prop is set
    this.valueResizeObserver();
    this.createTippyInstance();
    autoFocusElement(this.autoFocus, this.inputEl);
    this.observer = new MutationObserver(() => {
      this.handleOptionsChange();
    });
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }
  disconnectedCallback() {
    if (this.valuesResizeObserver)
      this.valuesResizeObserver.disconnect();
    if (this.observer)
      this.observer.disconnect();
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    this.valueResizeObserver();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    const style = {
      '--custom-dropdown-width': this.getDropdownWidth(),
    };
    return (h(Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, "aria-disabled": this.disabled, "aria-required": this.required, exportparts: "input, dropdown, dropdown-header, options" }, h("div", { class: this.searchWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (h("wpp-label-v3-3-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.hasSearchButton() && h("wpp-icon-search-v3-3-0", null), this.hasActiveEllipses ? (h("wpp-tooltip-v3-3-0", { part: "anchor", value: this.value.length ? this.getOptionLabel(this.value[0]) : undefined, class: this.tooltipCSSClasses() }, this.renderInputPlaceholder())) : (this.renderInputPlaceholder()), h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", onInput: this.handleInput, onClick: this.handleInputMouseDown, tabIndex: this.disabled ? -1 : 0, title: "" })), h("div", { class: "trigger-actions" }, this.hasClearButton() && h("wpp-icon-cross-v3-3-0", { onClick: this.handleClearClick }))), !!this.message && (h("wpp-inline-message-v3-3-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), part: "options", class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll }, this.renderDropdownContent()))));
  }
  static get is() { return "wpp-search"; }
  static get registryIs() { return "wpp-search-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-search.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-search.css"]
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
          "text": "Defines the search name."
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
          "original": "SearchOption[]",
          "resolved": "SearchOption[]",
          "references": {
            "SearchOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchOption"
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
          "original": "SearchGetOptionIdHandler",
          "resolved": "(item: SearchOption) => SearchOptionId",
          "references": {
            "SearchGetOptionIdHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchGetOptionIdHandler"
            },
            "SearchDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets ID values from the search options."
        },
        "defaultValue": "item => (item as SearchDefaultOption).id"
      },
      "getOptionLabel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SearchGetOptionLabelHandler",
          "resolved": "(item: SearchOption) => string",
          "references": {
            "SearchGetOptionLabelHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchGetOptionLabelHandler"
            },
            "SearchDefaultOption": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchDefaultOption"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that gets a label from the search options."
        },
        "defaultValue": "item => (item as SearchDefaultOption).label"
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
          "original": "Partial<SearchLocales>",
          "resolved": "{ nothingFound?: string | undefined; loading?: string | undefined; dropdownHeader?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "SearchLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for search component"
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
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SearchLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "SearchLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchLabelConfig"
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
          "text": "If `true`, search automatically filters options on search instead of relying on updates of the slotted options list.\nThis prop shouldn't change after the component is rendered."
        },
        "attribute": "simple-search",
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
      },
      "highlight": {
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
          "text": "If `true`, the search will highlight options"
        },
        "attribute": "highlight",
        "reflect": false,
        "defaultValue": "true"
      },
      "openDropdownOnClick": {
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
          "text": "If `true`, the dropdown will be opened on click"
        },
        "attribute": "open-dropdown-on-click",
        "reflect": false,
        "defaultValue": "false"
      },
      "showOptions": {
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
          "text": "If `true`, search will show the dropdown with options"
        },
        "attribute": "show-options",
        "reflect": false,
        "defaultValue": "true"
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
          "text": "Emitted when the search value changes"
        },
        "complexType": {
          "original": "SearchChangeEventDetail",
          "resolved": "SelectOptionChangeEventDetail & { reason: \"selectOption\"; } & { name?: string | undefined; } | { value: SearchOptionList; reason: SearchChangeReason; } & { name?: string | undefined; } | { value: null; reason: \"removeOption\"; } & { name?: string | undefined; }",
          "references": {
            "SearchChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-search/types.ts::SearchChangeEventDetail"
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
          "text": "Emitted when the search receives focus"
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
          "text": "Emitted when the search loses focus"
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
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onNextValueChange"
      }, {
        "propName": "searchValue",
        "methodName": "onSearchValueChange"
      }, {
        "propName": "dropdownConfig",
        "methodName": "updateDropdownConfig"
      }, {
        "propName": "loading",
        "methodName": "onLoadingChange"
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

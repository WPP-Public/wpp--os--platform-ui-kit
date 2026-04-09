import { proxyCustomElement, HTMLElement, createEvent, h, Fragment, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, i as isEqual_1 } from './menuListConfig.js';
import { k as transformToVersionedTag, s as selectDropdownWidth, n as autoFocusElement, b as isEventTargetContained } from './utils.js';
import { F as FOCUS_TYPE } from './common.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$k } from './wpp-action-button2.js';
import { d as defineCustomElement$j } from './wpp-checkbox2.js';
import { d as defineCustomElement$i } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$h } from './wpp-icon-cross2.js';
import { d as defineCustomElement$g } from './wpp-icon-dash2.js';
import { d as defineCustomElement$f } from './wpp-icon-error2.js';
import { d as defineCustomElement$e } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$d } from './wpp-icon-search2.js';
import { d as defineCustomElement$c } from './wpp-icon-success2.js';
import { d as defineCustomElement$b } from './wpp-icon-tick2.js';
import { d as defineCustomElement$a } from './wpp-icon-warning2.js';
import { d as defineCustomElement$9 } from './wpp-inline-message2.js';
import { d as defineCustomElement$8 } from './wpp-internal-label2.js';
import { d as defineCustomElement$7 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$6 } from './wpp-label2.js';
import { d as defineCustomElement$5 } from './wpp-list-item2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const BLUR_TIME = 250;
const DROPDOWN_ANIMATION_TIME = [300, BLUR_TIME];
const LOCALES_DEFAULTS = {
  nothingFound: 'Nothing found',
  loading: 'Loading...',
  dropdownHeader: '',
};

const wppSearchCss = ":host{--search-border-radius:var(--wpp-search-border-radius, var(--wpp-border-radius-m));--search-placeholder-color:var(--wpp-search-placeholder-color, var(--wpp-grey-color-700));--search-placeholder-color-disabled:var(--wpp-search-placeholder-color-disabled, var(--wpp-text-color-disabled));--search-hidden-count-text-color-disabled:var(\n    --wpp-search-hidden-count-text-color-disabled,\n    var(--wpp-text-color-disabled)\n  );--search-trigger-icon-right-position:var(--wpp-search-trigger-actions-right-position, 10px);--search-inline-message-margin:var(--wpp-search-inline-message-margin, 4px 0 0 0);--search-label-margin:var(--wpp-search-label-margin, 0 0 8px 0);--search-limit-lines:var(--wpp-search-limit-lines, 10000);--search-line-height:var(--wpp-search-line-height, 34px);--search-box-shadow:var(--wpp-search-box-shadow, var(--wpp-box-shadow-m));--search-first-border-color-focus:var(--wpp-search-first-border-color-focus, var(--wpp-grey-color-000));--search-second-border-color-focus:var(--wpp-search-second-border-color-focus, var(--wpp-brand-color));--search-height-m:var(--wpp-search-height-m, 40px);--search-height-s:var(--wpp-search-height-s, 32px);--search-padding-s:var(--wpp-search-padding-s, 5px 0 5px 12px);--search-padding-m:var(--wpp-search-padding-m, 9px 0 9px 12px);--search-bg-color:var(--wpp-search-bg-color, transparent);--search-bg-color-hover:var(--wpp-search-bg-color-hover, var(--wpp-grey-color-200));--search-bg-color-active:var(--wpp-search-bg-color-active, transparent);--search-bg-color-focused:var(--wpp-search-bg-color-focused, var(--wpp-grey-color-000));--search-bg-color-disabled:var(--wpp-search-bg-color-disabled, var(--wpp-grey-color-100));--search-trigger-icon-color:var(--wpp-search-trigger-actions-right-position, var(--wpp-grey-color-800));--search-trigger-icon-color-hover:var(--wpp-search-trigger-icon-color-hover, var(--wpp-grey-color-800));--search-trigger-icon-color-active:var(--wpp-search-trigger-icon-color-active, var(--wpp-grey-color-800));--search-trigger-icon-color-disabled:var(--wpp-search-trigger-icon-color-disabled, var(--wpp-icon-color-disabled));--search-border-color:var(--wpp-search-border-color, var(--wpp-grey-color-500));--search-border-color-hover:var(--wpp-search-border-color-hover, var(--wpp-grey-color-700));--search-border-color-active:var(--wpp-search-border-color-active, var(--wpp-grey-color-800));--search-border-color-focused:var(--wpp-search-border-color-focused, var(--wpp-grey-color-800));--search-border-color-disabled:var(--wpp-search-border-color-disabled, var(--wpp-grey-color-400));--search-border-width:var(--wpp-search-border-width, var(--wpp-border-width-s));--search-border-style:var(--wpp-search-border-style, solid);--search-single-border-color-disabled:var(--wpp-search-single-border-color-disabled, var(--wpp-grey-color-400));--search-dropdown-max-height:var(--wpp-search-dropdown-max-height, 372px);--search-dropdown-checkbox-margin:var(--wpp-search-dropdown-checkbox-margin, 1px 8px 1px 0);--search-dropdown-bg-color:var(--wpp-search-dropdown-bg-color, var(--wpp-grey-color-000));--search-dropdown-border-radius:var(--wpp-search-dropdown-border-radius, var(--wpp-border-radius-s));--search-dropdown-padding:var(--wpp-search-dropdown-padding, 8px);--search-dropdown-header-margin:var(--wpp-search-dropdown-header-margin, 0);--search-create-new-element-color:var(--wpp-search-create-new-element-color, var(--wpp-primary-color-500));--search-nothing-found-message-color:var(--wpp-search-nothing-found-message-color, var(--wpp-grey-color-700));--search-search-icon-margin-right:var(--wpp-search-search-icon-margin-right, 8px);--search-item-margin-bottom:var(--wpp-search-item-margin-bottom, 4px);--search-regular-selected-values-wrapper-padding:var(\n    --wpp-search-regular-selected-values-wrapper-padding,\n    10px 10px 2px 10px\n  );--search-extended-selected-values-wrapper-padding:var(\n    --wpp-search-extended-selected-values-wrapper-padding,\n    10px 10px 2px 10px\n  );--search-min-width:var(--wpp-search-min-width, 184px);position:relative;display:block;outline:none;min-width:var(--search-min-width)}:host ::slotted([slot=selected-values]){display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host .label:not(.focused):hover+.trigger{background-color:var(--search-bg-color-hover);border-color:var(--search-border-color-hover)}:host .label:not(.focused):hover+.trigger .trigger-actions .wpp-icon-chevron,:host .label:not(.focused):hover+.trigger .wpp-icon-cross{color:var(--search-trigger-icon-color-hover)}:host .label:not(.focused):hover+.trigger.warning{border-color:var(--wpp-warning-color-500)}:host .label:not(.focused):hover+.trigger.error{border-color:var(--wpp-danger-color-500)}:host(.wpp-disabled){cursor:not-allowed}:host(.wpp-disabled) .label{pointer-events:none}.infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}.trigger-actions{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:var(--search-trigger-icon-right-position);display:-ms-flexbox;display:flex}.trigger-actions .wpp-icon-chevron,.trigger-actions .wpp-icon-cross{color:var(--search-trigger-icon-color);cursor:pointer;-webkit-transition:all 0.15s ease-out 0s;transition:all 0.15s ease-out 0s}.values{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;min-width:0;max-height:calc(var(--search-limit-lines) * var(--search-line-height));padding-right:36px;overflow-y:auto}.values::-webkit-scrollbar{width:4px;height:4px}.values::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.values .hidden-count{-ms-flex:0 1 auto;flex:0 1 auto;margin:3px 2px;min-width:calc(25px + (var(--hidden-number) - 1) * 7.5px)}.values .hidden-count{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}.values .search-input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-ms-flex:1 1 70px;flex:1 1 70px;min-width:70px;padding:0;background:var(--search-bg-color);border:none;outline:none;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.values .search-input.hidden{position:absolute;right:0;bottom:0;z-index:-1;width:1px;min-width:1px;height:1px;opacity:0}.values .search-input::-moz-placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input::-webkit-input-placeholder{color:var(--search-placeholder-color)}.values .search-input:-ms-input-placeholder{color:var(--search-placeholder-color)}.values .search-input::-ms-input-placeholder{color:var(--search-placeholder-color)}.values .search-input::placeholder{color:var(--search-placeholder-color)}.values .input-placeholder{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%}.values .wpp-chip+.search-input{margin-left:6px}.count-block{display:none}.with-tooltip{display:none}.with-tooltip.visible{display:-ms-flexbox;display:flex;width:100%;overflow:hidden}.with-tooltip.visible::part(anchor){width:100%}.trigger{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:transparent;border:var(--search-border-width) var(--search-border-style) var(--search-border-color);border-radius:var(--search-border-radius);cursor:text}.trigger.size-s{height:var(--search-height-s);padding:var(--search-padding-s)}.trigger.size-m{height:var(--search-height-m);padding:var(--search-padding-m)}.trigger:hover{background-color:var(--search-bg-color-hover);border-color:var(--search-border-color-hover)}.trigger:hover .trigger-actions .wpp-icon-chevron,.trigger:hover .wpp-icon-cross,.trigger:hover .wpp-icon-search{color:var(--search-trigger-icon-color-hover)}.trigger:active{background-color:var(--search-bg-color-active);border-color:var(--search-border-color-active)}.trigger:active .trigger-actions .wpp-icon-chevron,.trigger:active .wpp-icon-cross{color:var(--search-trigger-icon-color-active)}.trigger.focused{background-color:var(--search-bg-color-focused);border-color:var(--search-border-color-focused)}.trigger.focused .values{padding-right:35px}.trigger.warning,.trigger.warning:hover{border:var(--search-border-width) var(--search-border-style) var(--wpp-warning-color-400)}.trigger.error,.trigger.error:hover{border:var(--search-border-width) var(--search-border-style) var(--wpp-danger-color-400)}.trigger.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--search-first-border-color-focus), 0 0 0 3px var(--search-second-border-color-focus);box-shadow:0 0 0 1px var(--search-first-border-color-focus), 0 0 0 3px var(--search-second-border-color-focus)}.trigger.disabled{background-color:var(--search-bg-color-disabled);border-color:var(--search-border-color-disabled);pointer-events:none}.trigger.disabled .values .search-input{color:var(--wpp-grey-color-500)}.trigger.disabled .values .search-input::-webkit-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::-moz-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input:-ms-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::-ms-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .hidden-count .wpp-typography{color:var(--search-hidden-count-text-color-disabled)}.trigger.disabled .values .input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .trigger-actions .wpp-icon-chevron,.trigger.disabled .wpp-icon-cross,.trigger.disabled .wpp-icon-search{color:var(--search-trigger-icon-color-disabled)}.trigger.disabled{border-color:var(--search-single-border-color-disabled)}.trigger.error{border-color:var(--wpp-danger-color-400)}.trigger.warning{border-color:var(--wpp-warning-color-400)}.trigger[aria-expanded=true]>.trigger-actions .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.trigger .wpp-icon-search{color:var(--wpp-grey-color-600);margin-right:var(--search-search-icon-margin-right)}.trigger.with-value:not(.disabled) .wpp-icon-search{color:var(--wpp-grey-color-800)}.wpp-inline-message::part(message-block){margin:var(--search-inline-message-margin)}.dropdown{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--search-dropdown-max-height);overflow:hidden;background:var(--search-dropdown-bg-color);border-radius:var(--search-dropdown-border-radius);-webkit-box-shadow:var(--search-box-shadow);box-shadow:var(--search-box-shadow);width:var(--custom-dropdown-width)}.dropdown .dropdown-header{pointer-events:none;margin:var(--search-dropdown-header-margin)}.dropdown .dropdown-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;min-height:0;padding:var(--search-dropdown-padding);overflow-x:hidden;overflow-y:auto}.dropdown .dropdown-list::-webkit-scrollbar{width:4px;height:4px}.dropdown .dropdown-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.dropdown .dropdown-list.hidden{display:none}.dropdown .dropdown-list:empty{display:none}.dropdown .dropdown-list .infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}.dropdown .dropdown-list .loading{pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;height:32px;padding:0 8px}.dropdown .dropdown-list .loading ::part(info-wrapper){height:inherit}.dropdown .dropdown-list .loading .wpp-spinner{margin-right:8px}.dropdown .dropdown-list .nothing-found-wrapper{pointer-events:none}.dropdown .dropdown-list .nothing-found-wrapper .nothing-found{color:var(--search-nothing-found-message-color)}.dropdown .dropdown-list .nothing-found-divider{margin:8px 0}.dropdown .dropdown-list .create-new-option{color:var(--search-create-new-element-color)}.dropdown .dropdown-list .selected-values{display:-ms-flexbox;display:flex}.dropdown .dropdown-list .selected-values.regular{padding:var(--search-regular-selected-values-wrapper-padding)}.dropdown .dropdown-list .selected-values.extended{padding:var(--search-extended-selected-values-wrapper-padding)}.dropdown .dropdown-list ::slotted(.wpp-list-item){width:100%}.dropdown .dropdown-list ::slotted(.wpp-list-item:not(:last-child)){margin-bottom:var(--search-item-margin-bottom)}.label{margin:var(--search-label-margin)}";

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
const WppSearch$1 = /*@__PURE__*/ proxyCustomElement(class WppSearch extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppSearchValueChange = createEvent(this, "wppSearchValueChange", 1);
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
      return (h("wpp-typography-v3-6-0", { type: "s-body", class: "input-placeholder", ref: placeholderEl => (this.placeholderEl = placeholderEl) }, this.getOptionLabel(this.value[0])));
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
        return (h("div", { class: "loading" }, h("wpp-spinner-v3-6-0", { slot: "left" }), h("wpp-typography-v3-6-0", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (this.isEmptyOptions) {
        return (h(Fragment, null, h("wpp-list-item-v3-6-0", { class: "nothing-found-wrapper" }, h("wpp-typography-v3-6-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound))));
      }
      return (h(Fragment, null, !!this._locales.dropdownHeader && (h("wpp-list-item-v3-6-0", { class: "dropdown-header", part: "dropdown-header" }, h("wpp-typography-v3-6-0", { type: "s-strong", slot: "label" }, this._locales.dropdownHeader))), h("slot", null), h("div", null, this.isInfiniteLoading && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v3-6-0", null))))));
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
    if (!isEqual_1(newConfig, oldConfig)) {
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
    return (h(Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, "aria-disabled": this.disabled, "aria-required": this.required, exportparts: "input, dropdown, dropdown-header, options" }, h("div", { class: this.searchWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (h("wpp-label-v3-6-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.hasSearchButton() && h("wpp-icon-search-v3-6-0", null), this.hasActiveEllipses ? (h("wpp-tooltip-v3-6-0", { part: "anchor", value: this.value.length ? this.getOptionLabel(this.value[0]) : undefined, class: this.tooltipCSSClasses() }, this.renderInputPlaceholder())) : (this.renderInputPlaceholder()), h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", onInput: this.handleInput, onClick: this.handleInputMouseDown, tabIndex: this.disabled ? -1 : 0, title: "" })), h("div", { class: "trigger-actions" }, this.hasClearButton() && h("wpp-icon-cross-v3-6-0", { onClick: this.handleClearClick }))), !!this.message && (h("wpp-inline-message-v3-6-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), part: "options", class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll }, this.renderDropdownContent()))));
  }
  static get registryIs() { return "wpp-search-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onNextValueChange"],
    "searchValue": ["onSearchValueChange"],
    "dropdownConfig": ["updateDropdownConfig"],
    "loading": ["onLoadingChange"],
    "isInComponent": ["updateIsInComponent"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppSearchCss; }
}, [1, "wpp-search", "wpp-search-v3-6-0", {
    "name": [1],
    "loading": [516],
    "disabled": [516],
    "autoFocus": [4, "auto-focus"],
    "placeholder": [1],
    "value": [1040],
    "getOptionId": [16],
    "getOptionLabel": [16],
    "required": [516],
    "message": [1],
    "messageType": [1, "message-type"],
    "maxMessageLength": [2, "max-message-length"],
    "dropdownConfig": [1040],
    "size": [1],
    "locales": [16],
    "labelTooltipConfig": [16],
    "labelConfig": [1040],
    "simpleSearch": [4, "simple-search"],
    "dropdownWidth": [1, "dropdown-width"],
    "highlight": [4],
    "openDropdownOnClick": [4, "open-dropdown-on-click"],
    "showOptions": [4, "show-options"],
    "infinite": [4],
    "infiniteLastPage": [4, "infinite-last-page"],
    "loadMore": [16],
    "isFocused": [32],
    "searchValue": [32],
    "isEmptyOptions": [32],
    "isInfiniteLoading": [32],
    "focusType": [32],
    "isInComponent": [32],
    "setFocus": [64]
  }, [[2, "wppChangeListItem", "handleOptionToggle"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-search-v3-6-0", "wpp-action-button-v3-6-0", "wpp-checkbox-v3-6-0", "wpp-icon-chevron-v3-6-0", "wpp-icon-cross-v3-6-0", "wpp-icon-dash-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-info-message-v3-6-0", "wpp-icon-search-v3-6-0", "wpp-icon-success-v3-6-0", "wpp-icon-tick-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-inline-message-v3-6-0", "wpp-internal-label-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-label-v3-6-0", "wpp-list-item-v3-6-0", "wpp-spinner-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-search-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSearch$1);
      }
      break;
    case "wpp-action-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-checkbox-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-chevron-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-cross-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-dash-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-info-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-search-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-success-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-tick-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-inline-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-list-item-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppSearch = WppSearch$1;
const defineCustomElement = defineCustomElement$1;

export { WppSearch, defineCustomElement };

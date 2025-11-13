import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-9177bb6d.js';
import { d as debounce, k as transformToVersionedTag, s as selectDropdownWidth, n as autoFocusElement, b as isEventTargetContained } from './utils-b49ad9c8.js';
import { i as isEqual_1 } from './isEqual-9c20096c.js';
import { m as menuListConfig } from './menuListConfig-bcc0f2a9.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { Z as Z_INDEX } from './consts-5bf9c29f.js';
import './_commonjsHelpers-ba3f0406.js';

const DROPDOWN_ANIMATION_TIME = [0, 0];
const PILL_MARGIN = 8;
const LOCALES_DEFAULTS = {
  nothingFound: 'Nothing found',
  beginTyping: 'Begin typing',
  more: 'more',
  showMore: 'more',
  showLess: 'Show less',
  selected: count => `${count} selected`,
  loading: 'Loading...',
  createNewElement: 'Create new element',
};

const getTempNodeWidthBasedOnLabel = (textStyles, label) => {
  const tmp = document.createElement('span');
  const textNode = document.createTextNode('');
  tmp.appendChild(textNode);
  document.body.appendChild(tmp);
  tmp.style.cssText = textStyles;
  tmp.style.opacity = '0';
  tmp.style.position = 'absolute';
  tmp.style.width = 'auto';
  tmp.style.overflow = 'scroll';
  tmp.style.whiteSpace = 'no-wrap';
  tmp.innerText = label;
  const nodeWidth = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return nodeWidth;
};

const wppAutocompleteCss = ":host{--autocomplete-border-radius:var(--wpp-autocomplete-border-radius, var(--wpp-border-radius-m));--autocomplete-placeholder-color:var(--wpp-autocomplete-placeholder-color, var(--wpp-grey-color-700));--autocomplete-placeholder-color-disabled:var(--wpp-autocomplete-placeholder-color-disabled, var(--wpp-text-color-disabled));--autocomplete-hidden-count-text-color-disabled:var(--wpp-autocomplete-hidden-count-text-color-disabled, var(--wpp-text-color-disabled));--autocomplete-trigger-icon-right-position:var(--wpp-autocomplete-trigger-actions-right-position, 10px);--autocomplete-inline-message-margin:var(--wpp-autocomplete-inline-message-margin, 4px 0 0 0);--autocomplete-label-margin:var(--wpp-autocomplete-label-margin, 0 0 8px 0);--autocomplete-limit-lines:var(--wpp-autocomplete-limit-lines, 10000);--autocomplete-line-height:var(--wpp-autocomplete-line-height, 34px);--autocomplete-box-shadow:var(--wpp-autocomplete-box-shadow, var(--wpp-box-shadow-m));--autocomplete-first-border-color-focus:var(--wpp-autocomplete-first-border-color-focus, var(--wpp-grey-color-000));--autocomplete-second-border-color-focus:var(--wpp-autocomplete-second-border-color-focus, var(--wpp-brand-color));--autocomplete-height-m:var(--wpp-autocomplete-height-m, 40px);--autocomplete-height-s:var(--wpp-autocomplete-height-s, 32px);--autocomplete-padding-s:var(--wpp-autocomplete-padding-s, 5px 0 5px 12px);--autocomplete-padding-m:var(--wpp-autocomplete-padding-m, 9px 0 9px 12px);--autocomplete-bg-color:var(--wpp-autocomplete-bg-color, transparent);--autocomplete-bg-color-hover:var(--wpp-autocomplete-bg-color-hover, var(--wpp-grey-color-200));--autocomplete-bg-color-active:var(--wpp-autocomplete-bg-color-active, transparent);--autocomplete-bg-color-focused:var(--wpp-autocomplete-bg-color-focused, var(--wpp-grey-color-000));--autocomplete-bg-color-disabled:var(--wpp-autocomplete-bg-color-disabled, var(--wpp-grey-color-100));--autocomplete-trigger-icon-color:var(--wpp-autocomplete-trigger-actions-right-position, var(--wpp-icon-color));--autocomplete-trigger-icon-color-hover:var(--wpp-autocomplete-trigger-icon-color-hover, var(--wpp-icon-color-hover));--autocomplete-trigger-icon-color-active:var(--wpp-autocomplete-trigger-icon-color-active, var(--wpp-icon-color-active));--autocomplete-trigger-icon-color-disabled:var(--wpp-autocomplete-trigger-icon-color-disabled, var(--wpp-icon-color-disabled));--autocomplete-border-color:var(--wpp-autocomplete-border-color, var(--wpp-grey-color-500));--autocomplete-border-color-hover:var(--wpp-autocomplete-border-color-hover, var(--wpp-grey-color-700));--autocomplete-border-color-active:var(--wpp-autocomplete-border-color-active, var(--wpp-grey-color-800));--autocomplete-border-color-focused:var(--wpp-autocomplete-border-color-focused, var(--wpp-grey-color-800));--autocomplete-border-color-disabled:var(--wpp-autocomplete-border-color-disabled, var(--wpp-grey-color-400));--autocomplete-border-width:var(--wpp-autocomplete-border-width, var(--wpp-border-width-s));--autocomplete-border-style:var(--wpp-autocomplete-border-style, solid);--autocomplete-single-border-color-disabled:var(--wpp-autocomplete-single-border-color-disabled, var(--wpp-grey-color-400));--autocomplete-dropdown-max-height:var(--wpp-autocomplete-dropdown-max-height, 372px);--autocomplete-dropdown-checkbox-margin:var(--wpp-autocomplete-dropdown-checkbox-margin, 1px 8px 1px 0);--autocomplete-dropdown-bg-color:var(--wpp-autocomplete-dropdown-bg-color, var(--wpp-grey-color-000));--autocomplete-dropdown-border-radius:var(--wpp-autocomplete-dropdown-border-radius, var(--wpp-border-radius-s));--autocomplete-dropdown-padding:var(--wpp-autocomplete-dropdown-padding, 8px);--autocomplete-dropdown-actions-border-radius:0 0 var(--autocomplete-dropdown-border-radius) var(--autocomplete-dropdown-border-radius);--autocomplete-dropdown-actions-bg-color:var(--wpp-autocomplete-bg-color, var(--wpp-grey-color-000));--autocomplete-create-new-element-color:var(--wpp-autocomplete-create-new-element-color, var(--wpp-primary-color-500));--autocomplete-nothing-found-message-color:var(--wpp-autocomplete-nothing-found-message-color, var(--wpp-grey-color-700));--autocomplete-search-icon-margin-right:var(--wpp-autocomplete-search-icon-margin-right, 8px);--autocomplete-item-margin-bottom:var(--wpp-autocomplete-item-margin-bottom, 4px);--autocomplete-regular-selected-values-wrapper-padding:var(--wpp-autocomplete-regular-selected-values-wrapper-padding, 0 8px 8px 8px);--autocomplete-extended-selected-values-wrapper-padding:var(--wpp-autocomplete-extended-selected-values-wrapper-padding, 0 8px 8px 8px);--autocomplete-suggestion-title-padding:var(--wpp-autocomplete-suggestion-title-padding, 5px 0);--autocomplete-suggestion-title-margin-left:var(--wpp-autocomplete-suggestion-title-margin-left, 8px);--autocomplete-min-width:var(--wpp-autocomplete-min-width, 184px);position:relative;display:block;outline:none;min-width:var(--autocomplete-min-width)}:host ::slotted([slot=selected-values]){margin-top:8px !important;gap:8px;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host .label:not(.focused):hover+.trigger{background-color:var(--autocomplete-bg-color-hover);border-color:var(--autocomplete-border-color-hover)}:host .label:not(.focused):hover+.trigger .trigger-actions .wpp-icon-chevron,:host .label:not(.focused):hover+.trigger .wpp-icon-cross{color:var(--autocomplete-trigger-icon-color-hover)}:host .label:not(.focused):hover+.trigger.warning{border-color:var(--wpp-warning-color-500)}:host .label:not(.focused):hover+.trigger.error{border-color:var(--wpp-danger-color-500)}:host(.wpp-disabled){cursor:not-allowed}:host(.wpp-disabled) .label{pointer-events:none}.trigger-actions{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:var(--autocomplete-trigger-icon-right-position);display:-ms-flexbox;display:flex}.trigger-actions .wpp-icon-chevron,.trigger-actions .wpp-icon-cross{color:var(--autocomplete-trigger-icon-color);cursor:pointer;-webkit-transition:all 0.15s ease-out 0s;transition:all 0.15s ease-out 0s}.values{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;min-width:0;max-height:calc(var(--autocomplete-limit-lines) * var(--autocomplete-line-height));padding-right:36px;overflow-y:auto}.values::-webkit-scrollbar{width:4px;height:4px}.values::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.values .hidden-count{-ms-flex:0 1 auto;flex:0 1 auto;margin:3px 2px;min-width:calc(25px + (var(--hidden-number) - 1) * 7.5px)}.values .hidden-count .wpp-typography{white-space:nowrap}.values .hidden-count{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}.values .autocomplete-input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-ms-flex:1 1 70px;flex:1 1 70px;min-width:70px;padding:0;background:var(--autocomplete-bg-color);border:none;outline:none;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.values .autocomplete-input.hidden{position:absolute;right:0;bottom:0;z-index:-1;width:1px;min-width:1px;height:1px;opacity:0}.values .autocomplete-input::-moz-placeholder{color:var(--autocomplete-placeholder-color);opacity:1}.values .autocomplete-input::-webkit-input-placeholder{color:var(--autocomplete-placeholder-color)}.values .autocomplete-input:-ms-input-placeholder{color:var(--autocomplete-placeholder-color)}.values .autocomplete-input::-ms-input-placeholder{color:var(--autocomplete-placeholder-color)}.values .autocomplete-input::placeholder{color:var(--autocomplete-placeholder-color)}.values .input-placeholder{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%}.values .wpp-chip+.autocomplete-input{margin-left:6px}.count-block{display:none}.trigger{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:transparent;border:var(--autocomplete-border-width) var(--autocomplete-border-style) var(--autocomplete-border-color);border-radius:var(--autocomplete-border-radius);cursor:text}.trigger.size-s{height:var(--autocomplete-height-s);padding:var(--autocomplete-padding-s)}.trigger.size-m{height:var(--autocomplete-height-m);padding:var(--autocomplete-padding-m)}.trigger:hover{background-color:var(--autocomplete-bg-color-hover);border-color:var(--autocomplete-border-color-hover)}.trigger:hover .trigger-actions .wpp-icon-chevron,.trigger:hover .wpp-icon-cross{color:var(--autocomplete-trigger-icon-color-hover)}.trigger:active{background-color:var(--autocomplete-bg-color-active);border-color:var(--autocomplete-border-color-active)}.trigger:active .trigger-actions .wpp-icon-chevron,.trigger:active .wpp-icon-cross{color:var(--autocomplete-trigger-icon-color-active)}.trigger.focused{background-color:var(--autocomplete-bg-color-focused);border-color:var(--autocomplete-border-color-focused)}.trigger.focused .values{padding-right:35px}.trigger.warning,.trigger.warning:hover{border:var(--autocomplete-border-width) var(--autocomplete-border-style) var(--wpp-warning-color-400)}.trigger.error,.trigger.error:hover{border:var(--autocomplete-border-width) var(--autocomplete-border-style) var(--wpp-danger-color-400)}.trigger.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--autocomplete-first-border-color-focus), 0 0 0 3px var(--autocomplete-second-border-color-focus);box-shadow:0 0 0 1px var(--autocomplete-first-border-color-focus), 0 0 0 3px var(--autocomplete-second-border-color-focus)}.trigger.disabled{background-color:var(--autocomplete-bg-color-disabled);border-color:var(--autocomplete-border-color-disabled);pointer-events:none}.trigger.disabled .values .autocomplete-input{color:var(--wpp-grey-color-500)}.trigger.disabled .values .autocomplete-input::-webkit-input-placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .values .autocomplete-input::-moz-placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .values .autocomplete-input:-ms-input-placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .values .autocomplete-input::-ms-input-placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .values .autocomplete-input::placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .values .hidden-count .wpp-typography{color:var(--autocomplete-hidden-count-text-color-disabled)}.trigger.disabled .values .input-placeholder{color:var(--autocomplete-placeholder-color-disabled)}.trigger.disabled .trigger-actions .wpp-icon-chevron,.trigger.disabled .wpp-icon-cross,.trigger.disabled .wpp-icon-search{color:var(--autocomplete-trigger-icon-color-disabled)}.trigger.disabled{border-color:var(--autocomplete-single-border-color-disabled)}.trigger.error{border-color:var(--wpp-danger-color-400)}.trigger.warning{border-color:var(--wpp-warning-color-400)}.trigger[aria-expanded=true]>.trigger-actions .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.trigger .wpp-icon-search{margin-right:var(--autocomplete-search-icon-margin-right)}.wpp-inline-message::part(message-block){margin:var(--autocomplete-inline-message-margin)}.dropdown{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--autocomplete-dropdown-max-height);overflow:hidden;background:var(--autocomplete-dropdown-bg-color);border-radius:var(--autocomplete-dropdown-border-radius);-webkit-box-shadow:var(--autocomplete-box-shadow);box-shadow:var(--autocomplete-box-shadow);width:var(--custom-dropdown-width)}.dropdown .selected-pills-wrapper{display:-ms-flexbox;display:flex;overflow:hidden;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:8px 0 0;gap:8px;max-width:100%;width:auto}.dropdown .selected-pills-wrapper .wpp-pill{max-width:100%}.dropdown .selected-pills-wrapper.overflow{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.dropdown .selected-pills-wrapper.not-empty{padding-bottom:8px}.dropdown .selected-pills-wrapper.show-action{cursor:pointer}.dropdown .header-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center}.dropdown .header-wrapper .show-more-action{padding-left:8px;position:absolute;opacity:0;pointer-events:none}.dropdown .header-wrapper.visible .show-more-action{position:relative;opacity:1;pointer-events:auto}.dropdown .show-less-action{margin-bottom:8px}.dropdown .suggestions-divider{margin:8px 0}.dropdown .dropdown-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;min-height:0;padding:var(--autocomplete-dropdown-padding);overflow-x:hidden;overflow-y:auto}.dropdown .dropdown-list::-webkit-scrollbar{width:4px;height:4px}.dropdown .dropdown-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.dropdown .dropdown-list.hidden{display:none}.dropdown .dropdown-list:empty{display:none}.dropdown .dropdown-list.with-create-new{padding-bottom:53px}.dropdown .dropdown-list.empty-with-create-new{padding-bottom:57px}.dropdown .dropdown-list .actions{position:absolute;bottom:0;left:0;right:0;background-color:var(--autocomplete-dropdown-actions-bg-color);border-radius:var(--autocomplete-dropdown-actions-border-radius)}.dropdown .dropdown-list .actions .actions-container{padding:var(--autocomplete-dropdown-padding);padding-top:0}.dropdown .dropdown-list .infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}.dropdown .dropdown-list .nothing-found-wrapper{pointer-events:none}.dropdown .dropdown-list .nothing-found-wrapper .nothing-found{color:var(--autocomplete-nothing-found-message-color)}.dropdown .dropdown-list .nothing-found-divider{margin-bottom:8px}.dropdown .dropdown-list .create-new-option{color:var(--autocomplete-create-new-element-color)}.dropdown .dropdown-list .selected-values{display:-ms-flexbox;display:flex;-webkit-transition-delay:300ms;transition-delay:300ms;-webkit-transition-property:padding-top;transition-property:padding-top}.dropdown .dropdown-list .selected-values.focused{-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-property:padding-top;transition-property:padding-top}.dropdown .dropdown-list .selected-values.regular{padding:var(--autocomplete-regular-selected-values-wrapper-padding)}.dropdown .dropdown-list .selected-values.regular.focused{--autocomplete-regular-selected-values-wrapper-padding:0 8px 8px 8px}.dropdown .dropdown-list .selected-values.extended{padding:var(--autocomplete-extended-selected-values-wrapper-padding)}.dropdown .dropdown-list .selected-values.extended.focused{--autocomplete-extended-selected-values-wrapper-padding:0 8px 8px 8px}.dropdown .dropdown-list ::slotted(.wpp-list-item){width:100%}.dropdown .dropdown-list ::slotted(.wpp-list-item:not(:last-child)){margin-bottom:var(--autocomplete-item-margin-bottom)}.dropdown .suggestion-item{width:100%}.dropdown .suggestion-item:not(.last-item){margin-bottom:var(--autocomplete-item-margin-bottom)}.dropdown .suggestions-heading,.dropdown .show-action{padding:var(--autocomplete-suggestion-title-padding);margin-left:var(--autocomplete-suggestion-title-margin-left)}.label{margin:var(--autocomplete-label-margin)}.loading-wrapper{display:-ms-flexbox;display:flex;gap:4px;padding:5px 8px}";

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
const WppAutocomplete = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppSearchValueChange = createEvent(this, "wppSearchValueChange", 1);
    this.wppCreateNewOption = createEvent(this, "wppCreateNewOption", 1);
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
    this.hasSearchButton = () => true;
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
      if (isEqual_1(this.value[0], suggestion.value)) {
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
      else if (!this.value.length) {
        this.hideDropdown();
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
        return (h("wpp-typography-v3-3-1", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, this.getOptionLabel(this.value[0])));
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
        return (h("wpp-typography-v3-3-1", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, placeholder));
      }
      if (this.type === 'extended' && this.value.length && !this.isFocused) {
        return (h("wpp-typography-v3-3-1", { "data-testid": "wpp-autocomplete-input-placeholder", type: "s-body", class: "input-placeholder" }, this._locales.selected(this.value.length)));
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
        return (h("div", { class: "loading-wrapper" }, h("wpp-spinner-v3-3-1", { slot: "left" }), h("wpp-typography-v3-3-1", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (isEmptyStringEntered && this.componentSuggestions?.length > 0) {
        return (h(Fragment, null, h("wpp-typography-v3-3-1", { type: "s-strong", class: "suggestions-heading" }, this.suggestionsTitle), this.componentSuggestions?.map((suggestion, index) => {
          const { slots, checked, label, ...restProps } = suggestion;
          const isChecked = checked || this.isItemSelected(suggestion);
          return (h("wpp-list-item-v3-3-1", { key: this.getOptionId(suggestion), selectable: true, checked: isChecked, value: suggestion, onWppChangeListItem: this.handleSuggestionClick, class: { 'suggestion-item': true, 'last-item': index === this.componentSuggestions?.length - 1 }, ...restProps }, label && h("span", { slot: "label" }, this.getOptionLabel(suggestion)), slots && this.renderSlotsListItem(slots, Boolean(label)).map(slotNode => slotNode)));
        })));
      }
      if (this.isEmptyOptions) {
        return (h(Fragment, null, h("wpp-list-item-v3-3-1", { class: "nothing-found-wrapper" }, h("wpp-typography-v3-3-1", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound))));
      }
      return (h(Fragment, null, !this.searchValue && !this.withPills ? (h("div", { class: this.selectedValuesCssClasses(), part: "selected-values" }, h("slot", { name: "selected-values" }))) : (h("slot", null)), h("div", null, this.isInfiniteLoading && (h("div", { class: "infinite-loader" }, h("wpp-spinner-v3-3-1", null))))));
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
        return (h("wpp-tooltip-v3-3-1", { class: {
            'in-dropdown': true,
            transparent: isTransparentTooltip,
          }, text: labelText, part: "tooltip", config: { ...this.pillTooltipConfig } }, h("wpp-pill-v3-3-1", { class: { transparent: isTransparentPill }, label: labelText, type: "display", removable: true, onWppClose: event => this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } }) })));
      }
      else {
        return (h("wpp-pill-v3-3-1", { class: { transparent: isTransparentPill }, label: labelText, type: "display", removable: true, onWppClose: event => this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } }) }));
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
    this.showMoreLessRender = (label) => (h("wpp-action-button-v3-3-1", { "data-testid": "wpp-autocomplete-show-btn", class: "nowrap", variant: "secondary", onClick: this.handleShowMoreLessClick }, label));
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
    if (!newValue.length && this.isDropdownShown && !this.componentSuggestions.length) {
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
    if (!isEqual_1(newConfig, oldConfig)) {
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
    const isNeedDivider = !!this.value.length &&
      (!!this.componentSuggestions?.length || !!this.shownOptionElements?.length || !!this.shownOptionElements?.length);
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
    })), h("div", { class: "show-more-action" }, this.showMoreLessRender(`+${this.activePillsTruncationState.filter(x => x).length} ${this._locales.showMore}`)))), !this.isShowMore && h("div", { class: "show-less-action" }, this.showMoreLessRender(this._locales.showLess)), isNeedDivider && h("wpp-divider-v3-3-1", { class: "nothing-found-divider" })));
  }
  render() {
    const style = { '--custom-dropdown-width': this.getDropdownWidth() };
    return (h(Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, "aria-disabled": this.disabled, "aria-required": this.required, exportparts: "input, dropdown, options, selected-values" }, h("div", { class: this.autocompleteWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (h("wpp-label-v3-3-1", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.hasSearchButton() && h("wpp-icon-search-v3-3-1", null), this.renderInputPlaceholder(), this.hiddenSelectedOptionsNumber > 0 && !this.isDropdownShown && (h("div", { class: "hidden-count", style: { '--hidden-number': this.getNearestPowForRowsNumber() + '' } }, h("wpp-typography-v3-3-1", { type: "s-body" }, ", + ", this.hiddenSelectedOptionsNumber))), h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", onInput: this.handleInput, tabIndex: this.disabled ? -1 : 0, title: "" })), h("div", { class: "trigger-actions" }, this.hasClearButton() && h("wpp-icon-cross-v3-3-1", { onClick: this.handleClearClick }))), !!this.message && (h("wpp-inline-message-v3-3-1", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), part: "options", class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll }, this.renderSelectedOptions(), this.renderDropdownContent(), this.showCreateNewElement &&
      this.searchValue !== '' &&
      ((this.displayBtnWhenListEmpty && this.isEmptyOptions) || !this.displayBtnWhenListEmpty) && (h("div", { class: "actions" }, h("wpp-divider-v3-3-1", { class: "nothing-found-divider" }), h("div", { class: "actions-container" }, h("wpp-list-item-v3-3-1", { onClick: this.handleCreateNewOptionClick }, h("wpp-typography-v3-3-1", { type: "s-strong", class: "create-new-option", slot: "label" }, this._locales.createNewElement))))))), this.type === 'extended' && this.multiple ? h("slot", { name: "selected-values" }) : null));
  }
  static get registryIs() { return "wpp-autocomplete-v3-3-1"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "loading": ["onLoadingChange"],
    "value": ["onNextValueChange"],
    "searchValue": ["onSearchValueChange"],
    "dropdownConfig": ["updateDropdownConfig"],
    "isShowMore": ["onShowMoreChange"],
    "suggestions": ["onUpdateSuggestions"],
    "isInComponent": ["updateIsInComponent"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppAutocomplete.style = wppAutocompleteCss;

export { WppAutocomplete as wpp_autocomplete };

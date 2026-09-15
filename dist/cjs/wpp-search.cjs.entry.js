'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const isEqual = require('./isEqual-c003d7ce.js');
const utils = require('./utils-a6513d61.js');
const menuListConfig = require('./menuListConfig-ec0bf6d4.js');
const common = require('./common-ee802540.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');
require('./theme-observer-4179316e.js');

const BLUR_TIME = 250;
const DROPDOWN_ANIMATION_TIME = [300, BLUR_TIME];
const LOCALES_DEFAULTS = {
  nothingFound: 'Nothing found',
  loading: 'Loading...',
  dropdownHeader: '',
  clearButtonLabel: 'Clear search',
  optionsListLabel: 'Search results',
  searchLabel: 'Search',
};

const wppSearchCss = ":host{--search-border-radius:var(--wpp-search-border-radius, var(--wpp-border-radius-m));--search-placeholder-color:var(--wpp-search-placeholder-color, var(--wpp-grey-color-700));--search-placeholder-color-disabled:var(--wpp-search-placeholder-color-disabled, var(--wpp-text-color-disabled));--search-hidden-count-text-color-disabled:var(\n    --wpp-search-hidden-count-text-color-disabled,\n    var(--wpp-text-color-disabled)\n  );--search-trigger-icon-right-position:var(--wpp-search-trigger-actions-right-position, 10px);--search-inline-message-margin:var(--wpp-search-inline-message-margin, 4px 0 0 0);--search-label-margin:var(--wpp-search-label-margin, 0 0 8px 0);--search-limit-lines:var(--wpp-search-limit-lines, 10000);--search-line-height:var(--wpp-search-line-height, 34px);--search-box-shadow:var(--wpp-search-box-shadow, var(--wpp-box-shadow-m));--search-first-border-color-focus:var(--wpp-search-first-border-color-focus, var(--wpp-grey-color-000));--search-second-border-color-focus:var(--wpp-search-second-border-color-focus, var(--wpp-brand-color));--search-height-m:var(--wpp-search-height-m, 40px);--search-height-s:var(--wpp-search-height-s, 32px);--search-padding-s:var(--wpp-search-padding-s, 5px 0 5px 12px);--search-padding-m:var(--wpp-search-padding-m, 9px 0 9px 12px);--search-bg-color:var(--wpp-search-bg-color, transparent);--search-bg-color-hover:var(--wpp-search-bg-color-hover, var(--wpp-grey-color-200));--search-bg-color-active:var(--wpp-search-bg-color-active, transparent);--search-bg-color-focused:var(--wpp-search-bg-color-focused, transparent);--search-bg-color-disabled:var(--wpp-search-bg-color-disabled, var(--wpp-grey-color-100));--search-trigger-icon-color:var(--wpp-search-trigger-actions-right-position, var(--wpp-grey-color-800));--search-trigger-icon-color-hover:var(--wpp-search-trigger-icon-color-hover, var(--wpp-grey-color-800));--search-trigger-icon-color-active:var(--wpp-search-trigger-icon-color-active, var(--wpp-grey-color-800));--search-trigger-icon-color-disabled:var(--wpp-search-trigger-icon-color-disabled, var(--wpp-icon-color-disabled));--search-border-color:var(--wpp-search-border-color, var(--wpp-grey-color-500));--search-border-color-hover:var(--wpp-search-border-color-hover, var(--wpp-grey-color-700));--search-border-color-active:var(--wpp-search-border-color-active, var(--wpp-grey-color-800));--search-border-color-focused:var(--wpp-search-border-color-focused, var(--wpp-grey-color-800));--search-border-color-disabled:var(--wpp-search-border-color-disabled, var(--wpp-grey-color-400));--search-border-width:var(--wpp-search-border-width, var(--wpp-border-width-s));--search-border-style:var(--wpp-search-border-style, solid);--search-single-border-color-disabled:var(--wpp-search-single-border-color-disabled, var(--wpp-grey-color-400));--search-dropdown-max-height:var(--wpp-search-dropdown-max-height, 372px);--search-dropdown-checkbox-margin:var(--wpp-search-dropdown-checkbox-margin, 1px 8px 1px 0);--search-dropdown-bg-color:var(--wpp-search-dropdown-bg-color, var(--wpp-grey-color-000));--search-dropdown-border-radius:var(--wpp-search-dropdown-border-radius, var(--wpp-border-radius-s));--search-dropdown-padding:var(--wpp-search-dropdown-padding, 8px);--search-dropdown-header-margin:var(--wpp-search-dropdown-header-margin, 0);--search-create-new-element-color:var(--wpp-search-create-new-element-color, var(--wpp-primary-color-500));--search-nothing-found-message-color:var(--wpp-search-nothing-found-message-color, var(--wpp-grey-color-700));--search-search-icon-margin-right:var(--wpp-search-search-icon-margin-right, 8px);--search-item-margin-bottom:var(--wpp-search-item-margin-bottom, 4px);--search-regular-selected-values-wrapper-padding:var(\n    --wpp-search-regular-selected-values-wrapper-padding,\n    10px 10px 2px 10px\n  );--search-extended-selected-values-wrapper-padding:var(\n    --wpp-search-extended-selected-values-wrapper-padding,\n    10px 10px 2px 10px\n  );--search-min-width:var(--wpp-search-min-width, 184px);position:relative;display:block;outline:none;min-width:var(--search-min-width)}:host ::slotted([slot=selected-values]){display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}:host .label:not(.focused):hover+.trigger{background-color:var(--search-bg-color-hover);border-color:var(--search-border-color-hover)}:host .label:not(.focused):hover+.trigger .trigger-actions .wpp-icon-chevron,:host .label:not(.focused):hover+.trigger .wpp-icon-cross{color:var(--search-trigger-icon-color-hover)}:host .label:not(.focused):hover+.trigger.warning{border-color:var(--wpp-warning-color-500)}:host .label:not(.focused):hover+.trigger.error{border-color:var(--wpp-danger-color-500)}:host(.wpp-disabled){cursor:not-allowed}:host(.wpp-disabled) .label{pointer-events:none}.infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}.trigger-actions{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);right:var(--search-trigger-icon-right-position);display:-ms-flexbox;display:flex}.trigger-actions .wpp-icon-chevron,.trigger-actions .wpp-icon-cross{color:var(--search-trigger-icon-color);cursor:pointer;-webkit-transition:all 0.15s ease-out 0s;transition:all 0.15s ease-out 0s}.trigger-actions .wpp-icon-cross{outline:none}.trigger-actions .wpp-icon-cross:focus-visible{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.values{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;align-items:center;min-width:0;max-height:calc(var(--search-limit-lines) * var(--search-line-height));padding-right:36px;overflow-y:auto}.values::-webkit-scrollbar{width:4px;height:4px}.values::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.values .hidden-count{-ms-flex:0 1 auto;flex:0 1 auto;margin:3px 2px;min-width:calc(25px + (var(--hidden-number) - 1) * 7.5px)}.values .hidden-count{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}.values .search-input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-ms-flex:1 1 70px;flex:1 1 70px;min-width:70px;padding:0;background:var(--search-bg-color);border:none;outline:none;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.values .search-input.hidden{position:absolute;right:0;bottom:0;z-index:-1;width:1px;min-width:1px;height:1px;opacity:0}.values .search-input::-webkit-input-placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input::-moz-placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input:-ms-input-placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input::-ms-input-placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input::placeholder{color:var(--search-placeholder-color);opacity:1}.values .search-input::-webkit-input-placeholder{color:var(--search-placeholder-color)}.values .search-input::-moz-placeholder{color:var(--search-placeholder-color)}.values .search-input:-ms-input-placeholder{color:var(--search-placeholder-color)}.values .search-input::-ms-input-placeholder{color:var(--search-placeholder-color)}.values .search-input::placeholder{color:var(--search-placeholder-color)}.values .input-placeholder{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:100%}.values .value-tooltip{display:-ms-flexbox;display:flex;width:100%;min-width:0;overflow:hidden}.values .value-tooltip::part(anchor){display:block;width:100%;overflow:hidden}.values .wpp-chip+.search-input{margin-left:6px}.trigger{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:transparent;border:var(--search-border-width) var(--search-border-style) var(--search-border-color);border-radius:var(--search-border-radius);cursor:text}.trigger.size-s{height:var(--search-height-s);padding:var(--search-padding-s)}.trigger.size-m{height:var(--search-height-m);padding:var(--search-padding-m)}.trigger:hover{background-color:var(--search-bg-color-hover);border-color:var(--search-border-color-hover)}.trigger:hover .trigger-actions .wpp-icon-chevron,.trigger:hover .wpp-icon-cross,.trigger:hover .wpp-icon-search{color:var(--search-trigger-icon-color-hover)}.trigger:active{background-color:var(--search-bg-color-active);border-color:var(--search-border-color-active)}.trigger:active .trigger-actions .wpp-icon-chevron,.trigger:active .wpp-icon-cross{color:var(--search-trigger-icon-color-active)}.trigger.focused{background-color:var(--search-bg-color-focused);border-color:var(--search-border-color-focused)}.trigger.focused .values{padding-right:35px}.trigger.warning,.trigger.warning:hover{border:var(--search-border-width) var(--search-border-style) var(--wpp-warning-color-400)}.trigger.error,.trigger.error:hover{border:var(--search-border-width) var(--search-border-style) var(--wpp-danger-color-400)}.trigger.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--search-first-border-color-focus), 0 0 0 3px var(--search-second-border-color-focus);box-shadow:0 0 0 1px var(--search-first-border-color-focus), 0 0 0 3px var(--search-second-border-color-focus)}.trigger.disabled{background-color:var(--search-bg-color-disabled);border-color:var(--search-border-color-disabled);pointer-events:none}.trigger.disabled .values .search-input{color:var(--wpp-grey-color-500)}.trigger.disabled .values .search-input::-webkit-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::-moz-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input:-ms-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::-ms-input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .search-input::placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .values .hidden-count .wpp-typography{color:var(--search-hidden-count-text-color-disabled)}.trigger.disabled .values .input-placeholder{color:var(--search-placeholder-color-disabled)}.trigger.disabled .trigger-actions .wpp-icon-chevron,.trigger.disabled .wpp-icon-cross,.trigger.disabled .wpp-icon-search{color:var(--search-trigger-icon-color-disabled)}.trigger.disabled{border-color:var(--search-single-border-color-disabled)}.trigger.error{border-color:var(--wpp-danger-color-400)}.trigger.warning{border-color:var(--wpp-warning-color-400)}.trigger[aria-expanded=true]>.trigger-actions .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.trigger .wpp-icon-search{color:var(--wpp-grey-color-600);margin-right:var(--search-search-icon-margin-right)}.trigger.with-value:not(.disabled) .wpp-icon-search{color:var(--wpp-grey-color-800)}.wpp-inline-message::part(message-block){margin:var(--search-inline-message-margin)}.dropdown{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--search-dropdown-max-height);overflow:hidden;background:var(--search-dropdown-bg-color);border-radius:var(--search-dropdown-border-radius);-webkit-box-shadow:var(--search-box-shadow);box-shadow:var(--search-box-shadow);width:var(--custom-dropdown-width)}.dropdown .dropdown-header{pointer-events:none;margin:var(--search-dropdown-header-margin)}.dropdown .dropdown-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;min-height:0;padding:var(--search-dropdown-padding);overflow:hidden auto}.dropdown .dropdown-list::-webkit-scrollbar{width:4px;height:4px}.dropdown .dropdown-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.dropdown .dropdown-list.hidden{display:none}.dropdown .dropdown-list:empty{display:none}.dropdown .dropdown-list .infinite-loader{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:32px}.dropdown .dropdown-list .loading{pointer-events:none;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;height:32px;padding:0 8px}.dropdown .dropdown-list .loading ::part(info-wrapper){height:inherit}.dropdown .dropdown-list .loading .wpp-spinner{margin-right:8px}.dropdown .dropdown-list .nothing-found-wrapper{pointer-events:none}.dropdown .dropdown-list .nothing-found-wrapper .nothing-found{color:var(--search-nothing-found-message-color)}.dropdown .dropdown-list .nothing-found-divider{margin:8px 0}.dropdown .dropdown-list .create-new-option{color:var(--search-create-new-element-color)}.dropdown .dropdown-list .selected-values{display:-ms-flexbox;display:flex}.dropdown .dropdown-list .selected-values.regular{padding:var(--search-regular-selected-values-wrapper-padding)}.dropdown .dropdown-list .selected-values.extended{padding:var(--search-extended-selected-values-wrapper-padding)}.dropdown .dropdown-list ::slotted(.wpp-list-item){width:100%}.dropdown .dropdown-list ::slotted(.wpp-list-item:not(:last-child)){margin-bottom:var(--search-item-margin-bottom)}.visually-hidden{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;white-space:nowrap;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%)}.label{margin:var(--search-label-margin)}.dropdown:has([data-wpp-theme=dark]){background-color:var(--wpp-grey-color-200)}";

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
// Per-instance counter so the listbox and its options get unique, stable ids that
// `aria-controls` on the combobox input can reference.
let searchInstanceId = 0;
const WppSearch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppSearchValueChange = index.createEvent(this, "wppSearchValueChange", 1);
    // Index of the option currently highlighted by keyboard navigation, or -1 when
    // none is active. The highlight is conveyed via the `aria-live` region rather than
    // `aria-activedescendant`, since a shadow-DOM input cannot reference a light-DOM option id.
    this.activeOptionIndex = -1;
    // Set by a keyboard (Enter) selection so focus can be moved to the clear button once it renders
    // (the button only exists after the value commits and the dropdown closes). Consumed in
    // `componentDidRender`. Pointer selections leave it false and keep the existing behavior.
    this.focusClearAfterSelect = false;
    // Measuring in `onShow` means the read always happens post-layout, and returning `false` cancels
    // the tooltip when the label already fits. Held as a stable object so the `config` watcher
    // doesn't call `setProps` on every render.
    this.valueTooltipConfig = {
      onShow: () => {
        if (!this.isValueTruncated())
          return false;
      },
    };
    // Unique ids used to wire the combobox input to its listbox popup.
    this.listboxId = '';
    this.optionIdPrefix = '';
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.dropdownEl);
    // Shared selection path used by both pointer clicks (via `wppChangeListItem`) and
    // keyboard activation (Enter on the active descendant), so both stay in sync.
    this.commitSelection = (optionValue, checked) => {
      this.value = checked
        ? [optionValue]
        : this.value.filter(option => this.getOptionId(option) !== this.getOptionId(optionValue));
      this.optionElements?.forEach(option => {
        option.checked = this.isOptionChecked(option);
        option.setAttribute('aria-selected', option.checked ? 'true' : 'false');
      });
      this.searchValue = '';
      this.wppChange.emit({
        value: this.value,
        reason: checked ? 'selectOption' : 'removeOption',
        name: this.name,
      });
    };
    // The label is clipped by CSS, so compare the inner typography node's scroll vs client width.
    // Read from the tooltip's `onShow`, where the element is guaranteed laid out.
    this.isValueTruncated = () => {
      const el = this.placeholderEl;
      if (!el)
        return false;
      const measured = el.shadowRoot?.querySelector('[part="typography"]') ?? el;
      return measured.scrollWidth > measured.clientWidth;
    };
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
        this.tippyInstance = menuListConfig.menuListConfig({
          anchor: this.triggerEl,
          content: this.dropdownEl,
          zIndex: consts.Z_INDEX.SEARCH,
          ...this.dropdownConfig,
          duration: DROPDOWN_ANIMATION_TIME,
          trigger: 'manual',
          maxWidth: 'none',
          hideOnClick: false,
          // Tippy labels its box `role="tooltip"` by default. This box is only a positioning and
          // animation wrapper — the popup's semantics live on the `role="listbox"` inside it — so an
          // unnamed tooltip node is both wrong and an axe failure (aria-tooltip-name). A falsy role
          // makes tippy drop the attribute entirely rather than swap it for another wrong one.
          role: '',
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
            if (!utils.isEventTargetContained(this.host, event)) {
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
    this.getOptionElements = () => Array.from(this.host.querySelectorAll(utils.transformToVersionedTag('wpp-list-item')));
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
        this.clearActiveOption();
      }
    };
    this.updateOptions = () => {
      this.shownOptionElements = [];
      this.optionElements?.forEach((option, index) => {
        this.applyOptionSemantics(option, index);
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
      this.clearActiveOption();
    };
    // Exposes each slotted item as a `role="option"` with a stable id and a selection state
    // so the listbox is valid for assistive tech.
    //
    // Option content must not be focusable — a `role="option"` with focusable descendants fails
    // WCAG ("nested-interactive") and puts stray tab stops inside the listbox. That is the caller's
    // contract, not something this component enforces: pass `role="presentation"` on decorative
    // `wpp-avatar` content (see the readme).
    this.applyOptionSemantics = (option, index) => {
      option.setAttribute('role', 'option');
      if (!option.id) {
        option.id = `${this.optionIdPrefix}-${index}`;
      }
      option.setAttribute('aria-selected', this.isOptionChecked(option) ? 'true' : 'false');
    };
    // Options the keyboard highlight can land on. Mirrors the guard in `selectActiveOption` so the
    // highlight never stops on an entry that Enter would then refuse to select.
    this.isOptionNavigable = (option) => !option.disabled && !option.nonInteractive && option.selectable;
    // Highlights the first navigable option at or after `index`, moving by `step` and wrapping
    // around the ends, so disabled and non-interactive entries are skipped instead of becoming dead
    // stops. Moves the visual highlight, scrolls it into view and announces it through the
    // `aria-live` region. DOM focus never leaves the input, so typing keeps working while the user
    // browses the results.
    this.setActiveOption = (index, step = 1) => {
      const options = this.shownOptionElements ?? [];
      const count = options.length;
      if (!count) {
        this.clearActiveOption();
        return;
      }
      const wrap = (i) => ((i % count) + count) % count;
      let nextIndex = -1;
      for (let offset = 0; offset < count; offset++) {
        const candidate = wrap(index + offset * step);
        if (this.isOptionNavigable(options[candidate])) {
          nextIndex = candidate;
          break;
        }
      }
      // Every shown option is disabled — leave the highlight off rather than parking it somewhere
      // Enter cannot act on.
      if (nextIndex === -1) {
        this.clearActiveOption();
        return;
      }
      this.activeOptionIndex = nextIndex;
      options.forEach((option, i) => {
        option.classList.toggle('wpp-list-item-active', i === nextIndex);
      });
      const activeEl = options[nextIndex];
      const label = (activeEl.getAttribute('label') || activeEl.textContent || '').trim();
      // Count within the navigable set, so "3 of 8" matches what the highlight can actually reach.
      const navigable = options.filter(this.isOptionNavigable);
      this.activeOptionAnnouncement = label ? `${label}, ${navigable.indexOf(activeEl) + 1} of ${navigable.length}` : '';
      activeEl.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    this.clearActiveOption = () => {
      this.activeOptionIndex = -1;
      this.activeOptionAnnouncement = '';
      this.shownOptionElements?.forEach(option => {
        option.classList.remove('wpp-list-item-active');
      });
    };
    this.selectActiveOption = () => {
      const option = this.activeOptionIndex >= 0 ? this.shownOptionElements?.[this.activeOptionIndex] : undefined;
      if (!option || option.disabled || option.nonInteractive || !option.selectable)
        return false;
      // Toggle exactly like a mouse selection via the shared selection path: this updates `value`,
      // whose watcher collapses the field (hide dropdown + blur) so the picked option's label is
      // shown. Keyboard and pointer selection stay in sync and both display the selected value.
      this.commitSelection(option.value, !option.checked);
      // This path is keyboard-only (Enter on the active option). The option that had the highlight
      // is gone with the closed popup, so move the focus ring to the clear button that now stands in
      // for the committed value, instead of letting focus fall back to the page body (WCAG 2.4.3).
      this.focusClearAfterSelect = true;
      return true;
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
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.handleInputMouseDown = () => {
      if (this.openDropdownOnClick) {
        this.showDropdown();
      }
    };
    this.handleKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.handleInput = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
      // Editing the query rebuilds the visible option set, so any prior highlight is stale.
      this.clearActiveOption();
      this.searchValue = this.inputEl?.value || '';
      if (this.searchValue) {
        this.showDropdown();
      }
      else if (!this.value.length && !this.openDropdownOnClick) {
        this.hideDropdown();
      }
    };
    // Editable-combobox keyboard model (W3C ARIA APG): arrows move a virtual highlight
    // through the listbox while real focus stays in the input, Enter selects the active
    // option, Escape closes the popup. Home/End are left to the browser for text caret
    // movement since this is an editable text field.
    this.handleInputKeyDown = (event) => {
      if (this.disabled)
        return;
      switch (event.key) {
        // With no option highlighted yet, Down enters the list at the top and Up at the bottom,
        // whether the popup was already open or is opening now (APG listbox behaviour).
        case 'ArrowDown':
          event.preventDefault();
          if (!this.isDropdownShown)
            this.showDropdown();
          this.setActiveOption(this.activeOptionIndex < 0 ? 0 : this.activeOptionIndex + 1, 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!this.isDropdownShown)
            this.showDropdown();
          this.setActiveOption(this.activeOptionIndex < 0 ? (this.shownOptionElements?.length ?? 1) - 1 : this.activeOptionIndex - 1, -1);
          break;
        case 'Enter':
          if (this.isDropdownShown && this.activeOptionIndex >= 0) {
            event.preventDefault();
            this.selectActiveOption();
          }
          break;
        case 'Escape':
          if (this.isDropdownShown) {
            event.preventDefault();
            this.hideDropdown();
          }
          break;
      }
    };
    this.handleFocus = (event) => {
      this.isInComponent = true;
      this.wppFocus.emit(event);
    };
    // The input's own focus handler is the single source of truth for entering the editing state.
    // It fires only when the text input itself gains focus — never when the ring lands on the clear
    // button, which is also a tab stop and would unmount itself if focusing it opened the popup — and
    // it also covers focus moving *within* the shadow root (e.g. Shift+Tabbing from the clear button
    // back onto the input), which never re-fires the Host's `focus` handler.
    this.handleInputFocus = () => {
      this.isInputFocused = true;
      if (this.isFocused)
        return;
      this.isFocused = true;
      if (this.value.length) {
        this.showDropdown();
      }
      if (this.canLoadMore() && this.isEmptyOptions && !this.loading) {
        this.requestLoadMore();
      }
    };
    // Mirror of `handleInputFocus`: the input losing focus *within* the widget (e.g. Tabbing forward
    // onto the clear button) does not reach the Host's blur handler — that bails while focus is still
    // `:focus-within`. Reset the flag here so the field collapses back to its label and its keyboard
    // ring clears, leaving only the clear button's ring (rather than showing two rings at once).
    this.handleInputBlur = () => {
      this.isInputFocused = false;
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
    // Tears the field down on a genuine focus-out. A blur can fire while focus is only moving
    // *within* the widget — into the open dropdown, onto the clear control, or during a Tippy DOM
    // reshuffle (the popup is portaled inside the shadow root, so it counts as focus-within). We
    // defer a frame and use `:focus-within` as the source of truth: if focus has settled outside,
    // we collapse the field (drop the keyboard focus ring, close the popup, clear the query). This
    // is what lets a keyboard Tab-away remove the ring — previously `isInComponent` stayed true
    // until the popup fired Tippy's `onHidden`, which a Tab-away never triggers, so the ring stuck.
    this.handleBlur = () => {
      requestAnimationFrame(() => {
        if (this.host.matches(':focus-within')) {
          return;
        }
        // Idempotent: the native blur and the `isInComponent` watcher can both land here.
        if (!this.isFocused)
          return;
        this.isInComponent = false;
        this.focusType = common.FOCUS_TYPE.NONE;
        this.hideDropdown();
        this.isFocused = false;
        this.isInputFocused = false;
        // Need setTimeout method to wait until closing animation is finished
        setTimeout(() => {
          this.searchValue = '';
        }, BLUR_TIME);
        this.wppBlur.emit();
      });
    };
    // For some reason this handler is not triggered by the browser
    // while Tippy instance is being created. Though it is covered
    // after the dropdown is opened, since Tippy moves the dropdown node.
    this.handleOptionsChange = () => {
      const currentNodes = this.getOptionElements();
      if (this.isOptionNodesChanged(currentNodes)) {
        this.optionElements = currentNodes;
        this.updateOptions();
      }
    };
    this.handleClearClick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (this.disabled)
        return;
      this.value = [];
      this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name });
      // Keep focus in the field after the clear control unmounts (parity with wpp-input.onClear)
      this.focusInput();
    };
    this.handleClearKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClearClick(event);
      }
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
      // Only the text input wears the trigger's keyboard focus ring. When focus is on the clear button
      // or the scrollable results list, they carry their own ring, so suppress the trigger's to avoid
      // showing two rings at once.
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB && this.isInputFocused,
    });
    this.inputCssClasses = () => ({
      'search-input': true,
      hidden: !this.isInputFocused && this.value.length > 0,
    });
    this.labelCssClasses = () => ({
      label: true,
      focused: this.isFocused,
    });
    this.dropdownListCssClasses = () => ({
      'dropdown-list': true,
      hidden: !this.showOptions,
    });
    this.hostStyle = () => {
      const style = {
        '--wpp-list-item-width': '100%',
      };
      return style;
    };
    this.getInputValue = () => this.searchValue;
    this.renderInputPlaceholder = () => {
      if ((this.isInputFocused && !this.searchValue) || this.isDropdownShown || !this.value.length)
        return null;
      const label = this.getOptionLabel(this.value[0]);
      return (index.h("wpp-tooltip-v4-4-0", { class: "value-tooltip", text: label, config: this.valueTooltipConfig }, index.h("wpp-typography-v4-4-0", { ref: (el) => {
          this.placeholderEl = el;
        }, type: "s-body", class: "input-placeholder" }, label)));
    };
    this.getDropdownWidth = () => {
      if (this.dropdownWidth === 'auto') {
        return this.triggerEl ? `${this.triggerEl.offsetWidth}px` : `${this.host.offsetWidth}px`;
      }
      return utils.selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host);
    };
    this.renderDropdownContent = () => {
      if (!this.showOptions || !this.isFocused)
        return null;
      if (this.isFocused && !this.searchValue.trim() && !this.openDropdownOnClick)
        return null;
      if (this.value.length && !this.isFocused)
        return null;
      // The `role="listbox"` wraps only its option children. The header and the infinite-scroll
      // loader are kept as siblings (outside the listbox) so they don't violate the listbox's
      // required-children contract.
      return (index.h(index.Fragment, null, !!this._locales.dropdownHeader && (index.h("wpp-list-item-v4-4-0", { class: "dropdown-header", part: "dropdown-header", nonInteractive: true }, index.h("wpp-typography-v4-4-0", { type: "s-strong", slot: "label" }, this._locales.dropdownHeader))), index.h("div", { id: this.listboxId, role: "listbox", "aria-label": this._locales.optionsListLabel, "aria-busy": this.loading ? 'true' : undefined, part: "options", class: "listbox" }, this.renderListboxItems()), this.isInfiniteLoading && (index.h("div", { class: "infinite-loader", role: "status" }, index.h("wpp-spinner-v4-4-0", null)))));
    };
    this.renderListboxItems = () => {
      if (this.loading) {
        return (index.h("div", { class: "loading", role: "option", "aria-disabled": "true" }, index.h("wpp-spinner-v4-4-0", { slot: "left" }), index.h("wpp-typography-v4-4-0", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (this.isEmptyOptions) {
        return (index.h("wpp-list-item-v4-4-0", { class: "nothing-found-wrapper", role: "option", "aria-disabled": "true", nonInteractive: true }, index.h("wpp-typography-v4-4-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound)));
      }
      return index.h("slot", null);
    };
    this.isFocused = false;
    this.isInputFocused = false;
    this.searchValue = '';
    this.isEmptyOptions = true;
    this.isInfiniteLoading = false;
    this.focusType = undefined;
    this.isInComponent = false;
    this.isDropdownShown = false;
    this.isOptionsScrollable = false;
    this.activeOptionAnnouncement = '';
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
    this.commitSelection(event.detail.value, event.detail.checked);
  }
  onNextValueChange() {
    this.hideDropdown();
    // Selecting a value collapses the field: the input is blurred so it renders the chosen
    // option's label (the input only shows the typed query while focused). Keyboard (Enter)
    // and pointer selections go through here identically, so both display the picked value.
    //
    // Reset `isInputFocused` synchronously here rather than relying on the input's blur event:
    // after a keyboard selection focus is programmatically moved to the clear button, and the
    // label (`renderInputPlaceholder`) only shows while the input is not "focused". Waiting for
    // the async blur left a render where the input still counted as focused with an empty query,
    // so the picked label never appeared. Collapsing the flag here makes the label deterministic.
    this.isInputFocused = false;
    this.blurInput();
    this.optionElements?.forEach(option => {
      option.checked = this.isOptionChecked(option);
      option.setAttribute('aria-selected', option.checked ? 'true' : 'false');
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
    if (!isEqual.isEqual_1(newConfig, oldConfig)) {
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
  /**
   * Sets focus on native input
   */
  async setFocus() {
    this.inputEl?.focus();
  }
  componentWillLoad() {
    const instanceId = ++searchInstanceId;
    this.listboxId = `wpp-search-listbox-${instanceId}`;
    this.optionIdPrefix = `wpp-search-option-${instanceId}`;
    this.optionElements = this.getOptionElements();
    this.updateOptions();
  }
  componentDidLoad() {
    this.themeSubscription.start();
    // Watches the size of values container, which changes when
    // search is focused and `limitLines` prop is set
    this.valueResizeObserver();
    this.createTippyInstance();
    utils.autoFocusElement(this.autoFocus, this.inputEl);
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
  componentDidRender() {
    // After a keyboard selection the clear button is only in the DOM once the value change has
    // rendered. Focus it now so the ring lands on it; the keyboard origin makes it show its
    // `:focus-visible` ring. Guarded by the flag so pointer selections are unaffected.
    if (this.focusClearAfterSelect) {
      const clearButton = this.host.shadowRoot?.querySelector('[part="icon-cross"]');
      if (clearButton) {
        this.focusClearAfterSelect = false;
        clearButton.focus();
      }
    }
    // Keep the results list in the tab order only while it can actually scroll. Measured here so it
    // stays in sync as options load in or the query changes. The guard avoids a render loop.
    const scrollable = this.isDropdownShown && !!this.optionsListEl && this.optionsListEl.scrollHeight > this.optionsListEl.clientHeight;
    if (scrollable !== this.isOptionsScrollable) {
      this.isOptionsScrollable = scrollable;
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.valuesResizeObserver)
      this.valuesResizeObserver.disconnect();
    if (this.observer)
      this.observer.disconnect();
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.valueResizeObserver();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  // Text piped to the polite live region. Highlight announcements take priority; when the open
  // dropdown has no matches (the visible "nothing found" state) we announce that instead, so a
  // screen-reader user typing a query with no results hears the outcome rather than silence.
  get liveAnnouncement() {
    if (this.activeOptionAnnouncement)
      return this.activeOptionAnnouncement;
    const hasQuery = !!this.searchValue.trim() || this.openDropdownOnClick;
    if (this.isFocused && this.showOptions && !this.loading && this.isEmptyOptions && hasQuery) {
      return this._locales.nothingFound ?? '';
    }
    return '';
  }
  render() {
    const style = {
      '--custom-dropdown-width': this.getDropdownWidth(),
    };
    return (index.h(index.Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, exportparts: "input, dropdown, dropdown-header, options, icon-cross" }, index.h("div", { class: this.searchWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (index.h("wpp-label-v4-4-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), index.h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, index.h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.hasSearchButton() && index.h("wpp-icon-search-v4-4-0", null), this.renderInputPlaceholder(), index.h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", role: "combobox", "aria-label": this.labelConfig?.text || this.placeholder || this._locales.searchLabel, "aria-required": this.required ? 'true' : undefined, "aria-expanded": this.isDropdownShown ? 'true' : 'false', "aria-haspopup": "listbox", "aria-controls": this.listboxId, "aria-autocomplete": "list", onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onInput: this.handleInput, onClick: this.handleInputMouseDown, onKeyDown: this.handleInputKeyDown, tabIndex: this.disabled ? -1 : 0 }), index.h("span", { class: "visually-hidden", "aria-live": "polite" }, this.liveAnnouncement)), index.h("div", { class: "trigger-actions" }, this.hasClearButton() && (index.h("wpp-icon-cross-v4-4-0", { part: "icon-cross", "aria-label": this._locales.clearButtonLabel || LOCALES_DEFAULTS.clearButtonLabel, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onClick: this.handleClearClick, onMouseDown: (event) => event.preventDefault(), onKeyDown: this.handleClearKeyDown })))), !!this.message && (index.h("wpp-inline-message-v4-4-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), index.h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, index.h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll, tabIndex: this.isDropdownShown && this.isOptionsScrollable ? 0 : -1 }, this.renderDropdownContent()))));
  }
  static get registryIs() { return "wpp-search-v4-4-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["onNextValueChange"],
    "searchValue": ["onSearchValueChange"],
    "dropdownConfig": ["updateDropdownConfig"],
    "loading": ["onLoadingChange"],
    "isInComponent": ["updateIsInComponent"]
  }; }
};
WppSearch.style = wppSearchCss;

exports.wpp_search = WppSearch;

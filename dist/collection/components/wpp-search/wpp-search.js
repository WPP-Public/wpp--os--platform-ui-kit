import { Fragment, h, Host, } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { autoFocusElement, isEventTargetContained, mergeLocales, selectDropdownWidth, transformToVersionedTag, } from '../../utils/utils';
import { menuListConfig } from '../../common/menuListConfig';
import { FOCUS_TYPE } from '../../types/common';
import { Z_INDEX } from '../../common/consts';
import { BLUR_TIME, DROPDOWN_ANIMATION_TIME, LOCALES_DEFAULTS } from './const';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15;
// Per-instance counter so the listbox and its options get unique, stable ids that
// `aria-controls` on the combobox input can reference.
let searchInstanceId = 0;
/**
 * @slot - Should contain a list of `wpp-list-item` elements that represents the current options list. The default slot, without the name attribute.
 *
 * Slotted option content must be non-interactive: each `wpp-list-item` is exposed as
 * `role="option"`, and a `role="option"` must not contain focusable descendants (WCAG
 * "nested-interactive"). Do not slot links, buttons or other tabbable elements inside an option —
 * they become stray tab stops inside the listbox. Note that `wpp-avatar` defaults to
 * `role="button"` with a tab stop, so a decorative avatar needs `role="presentation"` on it.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part dropdown-header - Dropdown header
 * @part options - Options list container
 * @part anchor - Search input tooltip
 * @part icon-cross - Clear (erase) button
 */
export class WppSearch {
  constructor() {
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
    this.themeSubscription = themeSubscriptionController(() => this.dropdownEl);
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
        this.tippyInstance = menuListConfig({
          anchor: this.triggerEl,
          content: this.dropdownEl,
          zIndex: Z_INDEX.SEARCH,
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
        default:
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
        this.focusType = FOCUS_TYPE.NONE;
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
      'tab-focus': this.focusType === FOCUS_TYPE.TAB && this.isInputFocused,
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
      return (h("wpp-tooltip-v4-4-0", { class: "value-tooltip", text: label, config: this.valueTooltipConfig }, h("wpp-typography-v4-4-0", { ref: (el) => {
          this.placeholderEl = el;
        }, type: "s-body", class: "input-placeholder" }, label)));
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
      // The `role="listbox"` wraps only its option children. The header and the infinite-scroll
      // loader are kept as siblings (outside the listbox) so they don't violate the listbox's
      // required-children contract.
      return (h(Fragment, null, !!this._locales.dropdownHeader && (h("wpp-list-item-v4-4-0", { class: "dropdown-header", part: "dropdown-header", nonInteractive: true }, h("wpp-typography-v4-4-0", { type: "s-strong", slot: "label" }, this._locales.dropdownHeader))), h("div", { id: this.listboxId, role: "listbox", "aria-label": this._locales.optionsListLabel, "aria-busy": this.loading ? 'true' : undefined, part: "options", class: "listbox" }, this.renderListboxItems()), this.isInfiniteLoading && (h("div", { class: "infinite-loader", role: "status" }, h("wpp-spinner-v4-4-0", null)))));
    };
    this.renderListboxItems = () => {
      if (this.loading) {
        return (h("div", { class: "loading", role: "option", "aria-disabled": "true" }, h("wpp-spinner-v4-4-0", { slot: "left" }), h("wpp-typography-v4-4-0", { type: "s-body", slot: "label" }, this._locales.loading)));
      }
      if (this.isEmptyOptions) {
        return (h("wpp-list-item-v4-4-0", { class: "nothing-found-wrapper", role: "option", "aria-disabled": "true", nonInteractive: true }, h("wpp-typography-v4-4-0", { type: "s-body", class: "nothing-found", slot: "label" }, this._locales.nothingFound)));
      }
      return h("slot", null);
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
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
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
    return (h(Host, { style: this.hostStyle(), class: this.hostCssClasses(), onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseDown: this.handleMouseDown, onKeyUp: this.handleKeyUp, exportparts: "input, dropdown, dropdown-header, options, icon-cross" }, h("div", { class: this.searchWrapperCssClasses(), onMouseDown: this.handleTriggerContainerMouseDown }, this.labelConfig?.text && (h("wpp-label-v4-4-0", { class: this.labelCssClasses(), htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: triggerEl => (this.triggerEl = triggerEl), class: this.triggerCssClasses(), onClick: this.handleTriggerClick }, h("div", { ref: valuesEl => (this.valuesContainerEl = valuesEl), class: "values" }, this.hasSearchButton() && h("wpp-icon-search-v4-4-0", null), this.renderInputPlaceholder(), h("input", { part: "input", ref: inputEl => (this.inputEl = inputEl), class: this.inputCssClasses(), id: this.name, name: this.name, type: "text", value: this.getInputValue(), disabled: this.disabled, placeholder: this.placeholder, required: this.required, autocomplete: "off", role: "combobox", "aria-label": this.labelConfig?.text || this.placeholder || this._locales.searchLabel, "aria-required": this.required ? 'true' : undefined, "aria-expanded": this.isDropdownShown ? 'true' : 'false', "aria-haspopup": "listbox", "aria-controls": this.listboxId, "aria-autocomplete": "list", onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, onInput: this.handleInput, onClick: this.handleInputMouseDown, onKeyDown: this.handleInputKeyDown, tabIndex: this.disabled ? -1 : 0 }), h("span", { class: "visually-hidden", "aria-live": "polite" }, this.liveAnnouncement)), h("div", { class: "trigger-actions" }, this.hasClearButton() && (h("wpp-icon-cross-v4-4-0", { part: "icon-cross", "aria-label": this._locales.clearButtonLabel || LOCALES_DEFAULTS.clearButtonLabel, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onClick: this.handleClearClick, onMouseDown: (event) => event.preventDefault(), onKeyDown: this.handleClearKeyDown })))), !!this.message && (h("wpp-inline-message-v4-4-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))), h("div", { class: "dropdown", part: "dropdown", ref: dropdownEl => (this.dropdownEl = dropdownEl), style: style }, h("div", { ref: optionsListEl => (this.optionsListEl = optionsListEl), class: this.dropdownListCssClasses(), onScroll: this.handleOptionsScroll, tabIndex: this.isDropdownShown && this.isOptionsScrollable ? 0 : -1 }, this.renderDropdownContent()))));
  }
  static get is() { return "wpp-search"; }
  static get registryIs() { return "wpp-search-v4-4-0"; }
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
          "resolved": "{ nothingFound?: string | undefined; loading?: string | undefined; dropdownHeader?: string | undefined; clearButtonLabel?: string | undefined; optionsListLabel?: string | undefined; searchLabel?: string | undefined; }",
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
      "isInputFocused": {},
      "searchValue": {},
      "isEmptyOptions": {},
      "isInfiniteLoading": {},
      "focusType": {},
      "isInComponent": {},
      "isDropdownShown": {},
      "isOptionsScrollable": {},
      "activeOptionAnnouncement": {}
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

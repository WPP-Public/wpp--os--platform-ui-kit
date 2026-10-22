import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, c as isEqual_1 } from './menuListConfig.js';
import { F as FOCUS_TYPE } from './common.js';
import { Z as Z_INDEX } from './consts.js';
import { w as getHighestContainerInDOM, b as isEventTargetContained, c as hasParentWithId, g as getSlotEmptyStates, y as mergeLocales } from './utils.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { d as defineCustomElement$f } from './wpp-action-button2.js';
import { d as defineCustomElement$e } from './wpp-icon-cross2.js';
import { d as defineCustomElement$d } from './wpp-icon-error2.js';
import { d as defineCustomElement$c } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$b } from './wpp-icon-search2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$8 } from './wpp-inline-message2.js';
import { d as defineCustomElement$7 } from './wpp-input2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const DEFAULT_POPOVER_LOCALES = {
  searchInputPlaceholder: 'Search',
  clearText: 'Clear',
  closeText: 'Close popover',
  actionsText: 'Popover actions',
};
const NATIVE_INTERACTIVE_SELECTOR = 'button, a[href], input, select, textarea, summary';
// Elements that can be the trigger control themselves, as opposed to wrappers around it (e.g. `wpp-tooltip`)
const TRIGGER_CONTROL_SELECTOR = `${NATIVE_INTERACTIVE_SELECTOR}, [tabindex]:not([tabindex="-1"])`;
// Dropdown roles that `aria-haspopup` can announce on the trigger
const ARIA_HASPOPUP_ROLES = ['menu', 'listbox', 'tree', 'grid', 'dialog'];

const wppPopoverCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:-ms-inline-flexbox;display:inline-flex}:host .wpp-popover-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .wpp-popover-content.wpp-hidden{position:absolute;z-index:-1;opacity:0}:host .wpp-popover-content.inline-edit-popover{display:-ms-inline-flexbox;display:inline-flex;width:100%;height:100%;-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-800);border-radius:var(--wpp-border-radius-s);scrollbar-width:thin;position:relative;overflow:hidden}:host .wpp-popover-content.wpp-with-footer{overflow:hidden}:host .wpp-popover-content .wpp-popover-footer{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:8px;width:100%;padding:8px;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:var(--wpp-border-width-s) solid var(--wpp-grey-color-300)}:host .wpp-popover-content .wpp-popover-clear-action,:host .wpp-popover-content .wpp-popover-footer-actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}:host .wpp-popover-content .wpp-popover-footer-actions{-ms-flex-pack:end;justify-content:flex-end;margin-left:auto}:host slot{display:block}:host slot[name=trigger-element]{display:contents}";

const WppPopover = /*@__PURE__*/ proxyCustomElement(class WppPopover extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSearchChange = createEvent(this, "wppSearchChange", 1);
    this.wppClear = createEvent(this, "wppClear", 1);
    this.isTriggerExpanded = false;
    this.hasClickedOutside = false;
    // How the user last interacted with the open dropdown, so handing focus back only paints the ring for the keyboard
    this.focusType = FOCUS_TYPE.NONE;
    // Whether the dropdown was opened with a pointer, so moving focus into it only paints the ring for the keyboard
    this.isOpenedWithPointer = false;
    this.themeSubscription = themeSubscriptionController(() => this.contentEl);
    this.isTriggerEnabled = () => {
      // Checks if the trigger element, or the control it wraps, is enabled or disabled.
      const slottedElement = this.getSlottedTriggerElement();
      if (!slottedElement)
        return false;
      const isDisabled = (element) => (element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false') ||
        element.classList.contains('disabled');
      return !isDisabled(slottedElement) && !isDisabled(this.getTriggerElement() ?? slottedElement);
    };
    this.createTippyInstance = () => {
      const hostChildren = Array.from(this.host.children);
      const slotContent = hostChildren.find(child => !child.hasAttribute('slot'));
      const actionContents = hostChildren.filter(child => child.getAttribute('slot') === 'actions');
      if (slotContent && this.contentEl) {
        this.contentEl.insertBefore(slotContent, this.footerEl || null);
      }
      if (this.footerActionsEl) {
        actionContents.forEach(actionContent => this.footerActionsEl?.append(actionContent));
      }
      if (this.focusScopeEl && this.contentEl && this.anchorRef) {
        this.tippyInstance = menuListConfig({
          anchor: this.anchorRef,
          content: this.focusScopeEl,
          zIndex: Z_INDEX.POPOVER,
          duration: [300, 300],
          triggerElementWidth: false,
          trigger: 'click',
          maxWidth: 'none',
          hideOnClick: 'toggle',
          popperOptions: {
            ...this.config?.popperOptions,
            modifiers: [...(this.config?.popperOptions?.modifiers || [])],
          },
          appendTo: () => getHighestContainerInDOM(),
          ...this.config,
          ...this.getTippyLifecycleCallbacks(),
        });
        this.updateTriggerExpandedState(false);
      }
    };
    this.getTippyLifecycleCallbacks = () => ({
      onClickOutside: (instance, event) => {
        if (isEventTargetContained(this.host, event) ||
          (event.target && hasParentWithId(event.target, 'tippy-')))
          return;
        if (this.shouldCloseOnOutsideClick(event)) {
          this.hasClickedOutside = true;
          this.tippyInstance.hide();
          this.hasClickedOutside = false;
        }
        if (this.config?.onClickOutside) {
          this.config.onClickOutside(instance, event);
        }
      },
      onTrigger: (instance, event) => {
        this.isOpenedWithPointer = this.isPointerEvent(event);
        if (this.config?.onTrigger) {
          this.config.onTrigger(instance, event);
        }
      },
      onShow: (instance) => {
        if (!this.isTriggerEnabled())
          return false;
        this.focusType = FOCUS_TYPE.NONE;
        if (this.dropdownWidth !== 'auto') {
          instance.popper.style.width = this.dropdownWidth;
        }
        if (this.config?.onShow?.(instance) === false)
          return false;
        this.updateTriggerExpandedState(true);
      },
      onShown: (instance) => {
        this.focusDropdown(!this.isOpenedWithPointer);
        if (this.config?.onShown) {
          this.config.onShown(instance);
        }
      },
      onHide: (instance) => {
        if (this.config?.onHide?.(instance) === false)
          return false;
        this.updateTriggerExpandedState(false);
        if (!this.hasClickedOutside && this.isFocusWithinPopper(instance)) {
          // Focus would otherwise fall back to the document body once the popper is unmounted
          this.focusTriggerElement(this.focusType !== FOCUS_TYPE.MOUSE);
        }
      },
      onHidden: (instance) => {
        // `openPopover` shows the dropdown without a trigger event, so it must not inherit the last one
        this.isOpenedWithPointer = false;
        if (!this.persistantSearch && this.withSearch) {
          this.wppSearchChange.emit({ name: this.internalSearchName, value: '' });
        }
        if (this.config?.onHidden) {
          this.config.onHidden(instance);
        }
      },
    });
    this.removeDisabledTag = () => {
      if (this.anchorRef?.getAttribute('disabled') === 'false') {
        this.anchorRef.removeAttribute('disabled');
      }
    };
    this.handleCrossButtonClick = () => this.tippyInstance.hide();
    this.handleClearButtonClick = () => {
      this.wppClear.emit({ clear: true });
    };
    this.handleSearchChange = (e) => {
      const { value } = e.detail;
      this.wppSearchChange.emit({ name: this.internalSearchName, value });
    };
    this.getSlottedTriggerElement = () => this.host.querySelector('[slot="trigger-element"]');
    this.isTriggerControl = (element) => typeof element.setFocus === 'function' || element.matches(TRIGGER_CONTROL_SELECTOR);
    // The slotted interactive element, looked up through wrappers around it (e.g. `wpp-tooltip`)
    this.getTriggerElement = () => {
      const slottedElement = this.getSlottedTriggerElement();
      let element = slottedElement;
      while (element) {
        if (this.isTriggerControl(element))
          return element;
        element = element.firstElementChild;
      }
      return slottedElement;
    };
    // WPP components always paint their keyboard ring from `setFocus`, so a pointer hand-back focuses their native control
    this.getTriggerFocusTarget = (triggerElement) => triggerElement.shadowRoot?.querySelector('button, [tabindex]:not([tabindex="-1"])') ?? triggerElement;
    this.focusTriggerElement = (withFocusRing = true) => {
      const triggerElement = this.getTriggerElement();
      if (!triggerElement)
        return;
      if (!withFocusRing) {
        this.getTriggerFocusTarget(triggerElement).focus();
        return;
      }
      if (typeof triggerElement.setFocus === 'function') {
        void triggerElement.setFocus();
        return;
      }
      triggerElement.focus();
    };
    this.hasAriaPropsProperty = (element) => {
      const tagName = element.tagName.toLowerCase();
      return ('ariaProps' in element ||
        ['wpp-button', 'wpp-action-button', 'wpp-more-button'].some(tag => tagName.includes(tag)));
    };
    // Exposes the dropdown state on the trigger, the same way wpp-menu-context does
    this.updateTriggerExpandedState = (isExpanded) => {
      const triggerElement = this.getTriggerElement();
      this.isTriggerExpanded = isExpanded;
      if (!triggerElement)
        return;
      const dropdownRole = this.ariaProps.role || 'dialog';
      const haspopup = ARIA_HASPOPUP_ROLES.includes(dropdownRole) ? dropdownRole : undefined;
      if (this.hasAriaPropsProperty(triggerElement)) {
        const triggerAriaProps = triggerElement.ariaProps || {};
        triggerElement.ariaProps = {
          ...triggerAriaProps,
          haspopup: triggerAriaProps.haspopup ?? haspopup,
          expanded: isExpanded,
        };
        this.observeTriggerRender(triggerElement);
        return;
      }
      // Other components render their own semantics, where host ARIA attributes would be ignored
      if (triggerElement.tagName.includes('-'))
        return;
      if (haspopup && !triggerElement.hasAttribute('aria-haspopup')) {
        triggerElement.setAttribute('aria-haspopup', haspopup);
      }
      triggerElement.setAttribute('aria-expanded', String(isExpanded));
      const currentRole = triggerElement.getAttribute('role');
      // aria-expanded is only allowed on widget roles
      if (!triggerElement.matches(NATIVE_INTERACTIVE_SELECTOR) && (!currentRole || currentRole === 'presentation')) {
        triggerElement.setAttribute('role', 'button');
      }
    };
    // A property assignment is invisible to a MutationObserver, but the re-render it causes is not
    this.observeTriggerRender = (triggerElement) => {
      const triggerRoot = triggerElement.shadowRoot;
      if (!triggerRoot || triggerRoot === this.observedTriggerRoot)
        return;
      this.triggerRenderObserver ?? (this.triggerRenderObserver = new MutationObserver(this.restoreTriggerExpandedState));
      this.triggerRenderObserver.disconnect();
      this.triggerRenderObserver.observe(triggerRoot, {
        subtree: true,
        attributes: true,
        attributeFilter: ['aria-expanded'],
      });
      this.observedTriggerRoot = triggerRoot;
    };
    // Re-applying renders `aria-expanded` again, which is a no-op here once `ariaProps` holds the state
    this.restoreTriggerExpandedState = () => {
      const triggerElement = this.getTriggerElement();
      if (!triggerElement || !this.hasAriaPropsProperty(triggerElement))
        return;
      if (triggerElement.ariaProps?.expanded === this.isTriggerExpanded)
        return;
      this.updateTriggerExpandedState(this.isTriggerExpanded);
    };
    this.focusDropdown = (withFocusRing = true) => {
      if (this.searchInputEl) {
        void this.searchInputEl.setFocus(withFocusRing);
      }
      else {
        this.contentEl?.focus();
      }
    };
    this.isFocusWithinPopper = (instance) => {
      const activeElement = document.activeElement;
      return Boolean(activeElement && instance.popper?.contains(activeElement));
    };
    // Shift+Tab out of the dropdown: the trigger precedes the content in the logical focus order
    this.handleStartSentinelFocus = () => {
      this.focusTriggerElement();
    };
    // Tab out of the dropdown: close it, so it doesn't stay open over the content focus moves on to
    this.handleEndSentinelFocus = () => {
      this.focusTriggerElement();
      this.tippyInstance?.hide();
    };
    // While open, the dropdown follows the trigger in the logical focus order, although it's portaled elsewhere
    this.handleTriggerKeyDown = (event) => {
      if (!this.tippyInstance?.state.isVisible)
        return;
      // The slotted trigger is the only focusable element of the anchor
      if (event.target !== this.getTriggerElement())
        return;
      if (this.isEscapeKey(event)) {
        this.closeOnEscape(event);
        return;
      }
      if (event.key !== 'Tab')
        return;
      // Focus leaves both the trigger and the dropdown, the browser moves it to the previous element
      if (event.shiftKey) {
        this.tippyInstance.hide();
        return;
      }
      event.preventDefault();
      this.focusDropdown();
    };
    this.handlePopperPointerDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handlePopperKeyDown = (event) => {
      this.focusType = FOCUS_TYPE.TAB;
      if (!this.tippyInstance?.state.isShown || !this.isEscapeKey(event))
        return;
      this.closeOnEscape(event);
    };
    // Enter or Space on a button also fires a `click`, but one without any pointer clicks, so its `detail` is 0
    this.isPointerEvent = (event) => event.type === 'click' ? event.detail > 0 : !event.type.startsWith('focus');
    this.isEscapeKey = (event) => event.key === 'Escape' || event.key === 'Esc';
    // Escape is consumed here, so containers listening on the document (e.g. wpp-modal) don't close as well
    this.closeOnEscape = (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.tippyInstance.hide();
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasFooterActions = !emptyStates.actions || Boolean(this.footerActionsEl?.querySelector('[slot="actions"]'));
    };
    this.handleTriggerSlotChange = () => {
      this.updateSlotData();
      if (this.tippyInstance) {
        this.updateTriggerExpandedState(this.tippyInstance.state.isShown);
      }
      if (this.mutationObserver) {
        this.startObserving();
      }
    };
    this.hostCssClasses = () => ({
      'wpp-popover': true,
    });
    this.contentCssClasses = () => ({
      'wpp-popover-content': true,
      'wpp-hidden': this.hidden,
      [`${this.externalClass}`]: true,
      'wpp-with-search': this.withSearch,
      'wpp-with-footer': this.showClearButton || this.hasFooterActions,
    });
    this.exportParts = () => this.showClearButton || this.hasFooterActions
      ? 'anchor, trigger-element, footer, footer-actions'
      : 'anchor, trigger-element';
    this.hidden = true;
    this.hasFooterActions = false;
    this.config = {};
    this.shouldCloseOnOutsideClick = () => true;
    this.closable = false;
    this.withSearch = false;
    this.searchValue = '';
    this.searchName = '';
    this.persistantSearch = false;
    this.externalClass = '';
    this.dropdownWidth = 'auto';
    this.ariaProps = {
      role: 'dialog',
      label: 'Popover',
    };
    this.locales = {};
    this.showClearButton = false;
  }
  /**
   * Method for closing the popover programatically
   */
  async closePopover() {
    this.tippyInstance.hide();
  }
  /**
   * Method for opening the popover programatically
   */
  async openPopover() {
    setTimeout(() => {
      this.tippyInstance.show();
    }, 0);
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual_1(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps({
        ...newConfig,
        ...this.getTippyLifecycleCallbacks(),
      });
    }
  }
  componentWillLoad() {
    this.internalSearchName = this.searchName || 'wpp-popover-search';
    this.updateSlotData();
  }
  componentDidLoad() {
    this.themeSubscription.start();
    setTimeout(() => {
      this.createTippyInstance();
      this.hidden = false;
    }, 0);
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.startObserving();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.tippyInstance?.destroy();
    this.mutationObserver?.disconnect();
    this.triggerRenderObserver?.disconnect();
    this.observedTriggerRoot = undefined;
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
  }
  startObserving() {
    const triggerEl = this.host?.querySelector('[slot="trigger-element"]');
    this.mutationObserver?.disconnect();
    if (!triggerEl)
      return;
    this.mutationObserver.observe(triggerEl, { attributes: true });
  }
  get mergedLocales() {
    return mergeLocales(DEFAULT_POPOVER_LOCALES, this.locales);
  }
  render() {
    const locales = this.mergedLocales;
    return (h(Host, { class: this.hostCssClasses(), exportparts: this.exportParts() }, h("div", { class: "anchor", part: "anchor", ref: ref => (this.anchorRef = ref), onKeyDown: this.handleTriggerKeyDown, role: "presentation" }, h("slot", { name: "trigger-element", part: "trigger-element", onSlotchange: this.handleTriggerSlotChange })), h("div", { class: "wpp-popover-focus-scope", ref: focusScopeEl => (this.focusScopeEl = focusScopeEl) }, h("div", { tabindex: "0", class: "wpp-popover-focus-sentinel", onFocus: this.handleStartSentinelFocus }), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl), onKeyDown: this.handlePopperKeyDown, onPointerDown: this.handlePopperPointerDown, role: this.ariaProps.role || 'dialog', "aria-describedby": this.ariaProps.describedby, "aria-labelledby": this.ariaProps.labelledby, "aria-label": this.ariaProps.labelledby ? undefined : this.ariaProps.label, tabindex: "-1" }, this.withSearch && (h("wpp-input-v4-6-0", { ref: inputEl => (this.searchInputEl = inputEl), class: "wpp-search-input", value: this.searchValue, onWppChange: this.handleSearchChange, name: this.internalSearchName, placeholder: locales.searchInputPlaceholder, type: "search", size: "m", ariaProps: { label: locales.searchInputPlaceholder } })), !this.withSearch && this.closable && (h("wpp-action-button-v4-6-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary", ariaProps: { label: locales.closeText } }, h("wpp-icon-cross-v4-6-0", { slot: "icon-end", "aria-hidden": "true" }))), h("slot", null), (this.showClearButton || this.hasFooterActions) && (h("div", { class: "wpp-popover-footer", part: "footer", ref: footerEl => (this.footerEl = footerEl), role: "group", "aria-label": locales.actionsText }, h("div", { class: "wpp-popover-clear-action" }, this.showClearButton && (h("wpp-action-button-v4-6-0", { variant: "secondary", onClick: this.handleClearButtonClick }, locales.clearText))), h("div", { class: "wpp-popover-footer-actions", part: "footer-actions", ref: footerActionsEl => (this.footerActionsEl = footerActionsEl) }, h("slot", { name: "actions", onSlotchange: this.updateSlotData }))))), h("div", { tabindex: "0", class: "wpp-popover-focus-sentinel", onFocus: this.handleEndSentinelFocus }))));
  }
  static get registryIs() { return "wpp-popover-v4-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "config": ["updateConfig"]
  }; }
  static get style() { return wppPopoverCss; }
}, [1, "wpp-popover", "wpp-popover-v4-6-0", {
    "config": [1040],
    "shouldCloseOnOutsideClick": [16],
    "closable": [4],
    "withSearch": [4, "with-search"],
    "searchValue": [1, "search-value"],
    "searchName": [1, "search-name"],
    "persistantSearch": [4, "persistant-search"],
    "externalClass": [1, "external-class"],
    "dropdownWidth": [513, "dropdown-width"],
    "ariaProps": [16],
    "locales": [16],
    "showClearButton": [4, "show-clear-button"],
    "hidden": [32],
    "hasFooterActions": [32],
    "closePopover": [64],
    "openPopover": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-popover-v4-6-0", "wpp-action-button-v4-6-0", "wpp-icon-cross-v4-6-0", "wpp-icon-error-v4-6-0", "wpp-icon-info-message-v4-6-0", "wpp-icon-search-v4-6-0", "wpp-icon-success-v4-6-0", "wpp-icon-warning-v4-6-0", "wpp-inline-message-v4-6-0", "wpp-input-v4-6-0", "wpp-internal-label-v4-6-0", "wpp-internal-tooltip-v4-6-0", "wpp-label-v4-6-0", "wpp-spinner-v4-6-0", "wpp-tooltip-v4-6-0", "wpp-typography-v4-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-popover-v4-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPopover);
      }
      break;
    case "wpp-action-button-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-error-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-info-message-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-search-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-input-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPopover as W, defineCustomElement as d };

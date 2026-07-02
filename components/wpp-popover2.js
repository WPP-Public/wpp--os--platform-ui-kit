import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, c as isEqual_1 } from './menuListConfig.js';
import { Z as Z_INDEX } from './consts.js';
import { g as getSlotEmptyStates, y as mergeLocales, w as getHighestContainerInDOM, b as isEventTargetContained, c as hasParentWithId } from './utils.js';
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
};

const wppPopoverCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:-ms-inline-flexbox;display:inline-flex}:host .wpp-popover-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .wpp-popover-content.wpp-hidden{position:absolute;z-index:-1;opacity:0}:host .wpp-popover-content.inline-edit-popover{display:-ms-inline-flexbox;display:inline-flex;width:100%;height:100%;-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-800);border-radius:var(--wpp-border-radius-s);scrollbar-width:thin;position:relative;overflow:hidden}:host .wpp-popover-content.wpp-with-footer{overflow:hidden}:host .wpp-popover-content .wpp-popover-footer{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:8px;width:100%;padding:8px;-webkit-box-sizing:border-box;box-sizing:border-box;border-top:1px solid var(--wpp-grey-color-300)}:host .wpp-popover-content .wpp-popover-clear-action,:host .wpp-popover-content .wpp-popover-footer-actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}:host .wpp-popover-content .wpp-popover-footer-actions{-ms-flex-pack:end;justify-content:flex-end;margin-left:auto}:host slot{display:block}";

const WppPopover = /*@__PURE__*/ proxyCustomElement(class WppPopover extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSearchChange = createEvent(this, "wppSearchChange", 1);
    this.wppClear = createEvent(this, "wppClear", 1);
    this.themeSubscription = themeSubscriptionController(() => this.contentEl);
    this.isTriggerEnabled = () => {
      // Checks if the trigger element is enabled or disabled.
      const triggerEl = this.host?.querySelector('[slot="trigger-element"]');
      if (!triggerEl)
        return false;
      if ((triggerEl?.hasAttribute('disabled') && triggerEl?.getAttribute('disabled') !== 'false') ||
        triggerEl?.classList.contains('disabled')) {
        return false;
      }
      return true;
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
      if (this.contentEl && this.anchorRef) {
        this.tippyInstance = menuListConfig({
          anchor: this.anchorRef,
          content: this.contentEl,
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
          onClickOutside: (instance, event) => {
            if (isEventTargetContained(this.host, event) ||
              (event.target && hasParentWithId(event.target, 'tippy-')))
              return;
            if (this.shouldCloseOnOutsideClick(event)) {
              this.tippyInstance.hide();
            }
            if (this.config?.onClickOutside) {
              this.config.onClickOutside(instance, event);
            }
          },
          onShow: (instance) => {
            if (!this.isTriggerEnabled())
              return false;
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
            }
            if (this.config?.onShow) {
              return this.config.onShow(instance);
            }
          },
          onShown: (instance) => {
            if (this.searchInputEl) {
              this.searchInputEl.setFocus();
            }
            if (this.config?.onShown) {
              this.config.onShown(instance);
            }
          },
          onHidden: (instance) => {
            if (!this.persistantSearch && this.withSearch) {
              this.wppSearchChange.emit({ name: this.internalSearchName, value: '' });
            }
            if (this.config?.onHidden) {
              this.config.onHidden(instance);
            }
          },
        });
      }
    };
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
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasFooterActions = !emptyStates.actions || Boolean(this.footerActionsEl?.querySelector('[slot="actions"]'));
    };
    this.handleTriggerSlotChange = () => {
      this.updateSlotData();
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
      this.tippyInstance?.setProps(newConfig);
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: this.exportParts() }, h("div", { class: "anchor", part: "anchor", ref: ref => (this.anchorRef = ref) }, h("slot", { name: "trigger-element", part: "trigger-element", onSlotchange: this.handleTriggerSlotChange })), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl), role: this.ariaProps.role || 'dialog', "aria-describedby": this.ariaProps.describedby, "aria-label": this.ariaProps.label, "aria-modal": "true" }, this.withSearch && (h("wpp-input-v4-2-0", { ref: inputEl => (this.searchInputEl = inputEl), class: "wpp-search-input", value: this.searchValue, onWppChange: this.handleSearchChange, name: this.internalSearchName, placeholder: locales.searchInputPlaceholder, type: "search", size: "m" })), !this.withSearch && this.closable && (h("wpp-action-button-v4-2-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary" }, h("wpp-icon-cross-v4-2-0", { slot: "icon-end" }))), h("slot", null), (this.showClearButton || this.hasFooterActions) && (h("div", { class: "wpp-popover-footer", part: "footer", ref: footerEl => (this.footerEl = footerEl) }, h("div", { class: "wpp-popover-clear-action" }, this.showClearButton && (h("wpp-action-button-v4-2-0", { variant: "secondary", onClick: this.handleClearButtonClick }, locales.clearText))), h("div", { class: "wpp-popover-footer-actions", part: "footer-actions", ref: footerActionsEl => (this.footerActionsEl = footerActionsEl) }, h("slot", { name: "actions", onSlotchange: this.updateSlotData })))))));
  }
  static get registryIs() { return "wpp-popover-v4-2-0"; }
  get host() { return this; }
  static get watchers() { return {
    "config": ["updateConfig"]
  }; }
  static get style() { return wppPopoverCss; }
}, [1, "wpp-popover", "wpp-popover-v4-2-0", {
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
  const components = ["wpp-popover-v4-2-0", "wpp-action-button-v4-2-0", "wpp-icon-cross-v4-2-0", "wpp-icon-error-v4-2-0", "wpp-icon-info-message-v4-2-0", "wpp-icon-search-v4-2-0", "wpp-icon-success-v4-2-0", "wpp-icon-warning-v4-2-0", "wpp-inline-message-v4-2-0", "wpp-input-v4-2-0", "wpp-internal-label-v4-2-0", "wpp-internal-tooltip-v4-2-0", "wpp-label-v4-2-0", "wpp-spinner-v4-2-0", "wpp-tooltip-v4-2-0", "wpp-typography-v4-2-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-popover-v4-2-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPopover);
      }
      break;
    case "wpp-action-button-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-error-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-info-message-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-search-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-input-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-2-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPopover as W, defineCustomElement as d };

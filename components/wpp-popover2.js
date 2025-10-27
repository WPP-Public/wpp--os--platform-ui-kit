import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, i as isEqual_1 } from './menuListConfig.js';
import { Z as Z_INDEX } from './consts.js';
import { w as getHighestContainerInDOM, b as isEventTargetContained, c as hasParentWithId } from './utils.js';
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
};

const wppPopoverCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:-ms-inline-flexbox;display:inline-flex}:host .wpp-popover-content.wpp-hidden{position:absolute;z-index:-1;opacity:0}:host .wpp-popover-content.inline-edit-popover{display:-ms-inline-flexbox;display:inline-flex;width:100%;height:100%;-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-800);border-radius:var(--wpp-border-radius-s);scrollbar-width:thin;position:relative;overflow:hidden}:host slot{display:block}";

const WppPopover = /*@__PURE__*/ proxyCustomElement(class WppPopover extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSearchChange = createEvent(this, "wppSearchChange", 1);
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
      const slotContent = this.host.children[1];
      if (slotContent) {
        this.contentEl?.append(slotContent);
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
    this.handleSearchChange = (e) => {
      const { value } = e.detail;
      this.wppSearchChange.emit({ name: this.internalSearchName, value });
    };
    this.hostCssClasses = () => ({
      'wpp-popover': true,
    });
    this.contentCssClasses = () => ({
      'wpp-popover-content': true,
      'wpp-hidden': this.hidden,
      [`${this.externalClass}`]: true,
      'wpp-with-search': this.withSearch,
    });
    this.hidden = true;
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
    this.locales = DEFAULT_POPOVER_LOCALES;
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
  }
  componentDidLoad() {
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
    this.tippyInstance?.destroy();
    this.mutationObserver?.disconnect();
  }
  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
  }
  startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "anchor, trigger-element" }, h("div", { class: "anchor", part: "anchor", ref: ref => (this.anchorRef = ref) }, h("slot", { name: "trigger-element", part: "trigger-element" })), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl), role: this.ariaProps.role || 'dialog', "aria-describedby": this.ariaProps.describedby, "aria-label": this.ariaProps.label, "aria-modal": "true" }, this.withSearch && (h("wpp-input-v3-3-0", { ref: inputEl => (this.searchInputEl = inputEl), class: "wpp-search-input", value: this.searchValue, onWppChange: this.handleSearchChange, name: this.internalSearchName, placeholder: this.locales.searchInputPlaceholder || DEFAULT_POPOVER_LOCALES.searchInputPlaceholder, type: "search", size: "m" })), !this.withSearch && this.closable && (h("wpp-action-button-v3-3-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary" }, h("wpp-icon-cross-v3-3-0", { slot: "icon-end" }))), h("slot", null))));
  }
  static get registryIs() { return "wpp-popover-v3-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "config": ["updateConfig"]
  }; }
  static get style() { return wppPopoverCss; }
}, [1, "wpp-popover", "wpp-popover-v3-3-0", {
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
    "hidden": [32],
    "closePopover": [64],
    "openPopover": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-popover-v3-3-0", "wpp-action-button-v3-3-0", "wpp-icon-cross-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-info-message-v3-3-0", "wpp-icon-search-v3-3-0", "wpp-icon-success-v3-3-0", "wpp-icon-warning-v3-3-0", "wpp-inline-message-v3-3-0", "wpp-input-v3-3-0", "wpp-internal-label-v3-3-0", "wpp-internal-tooltip-v3-3-0", "wpp-label-v3-3-0", "wpp-spinner-v3-3-0", "wpp-tooltip-v3-3-0", "wpp-typography-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-popover-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPopover);
      }
      break;
    case "wpp-action-button-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-info-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-search-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-inline-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-input-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPopover as W, defineCustomElement as d };

import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { e as truncate, u as uuidv4 } from './utils.js';
import { d as defineCustomElement$l } from './wpp-action-button2.js';
import { d as defineCustomElement$k } from './wpp-checkbox2.js';
import { d as defineCustomElement$j } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$i } from './wpp-icon-cross2.js';
import { d as defineCustomElement$h } from './wpp-icon-dash2.js';
import { d as defineCustomElement$g } from './wpp-icon-error2.js';
import { d as defineCustomElement$f } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$e } from './wpp-icon-more2.js';
import { d as defineCustomElement$d } from './wpp-icon-success2.js';
import { d as defineCustomElement$c } from './wpp-icon-tick2.js';
import { d as defineCustomElement$b } from './wpp-icon-warning2.js';
import { d as defineCustomElement$a } from './wpp-inline-message2.js';
import { d as defineCustomElement$9 } from './wpp-internal-label2.js';
import { d as defineCustomElement$8 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$7 } from './wpp-label2.js';
import { d as defineCustomElement$6 } from './wpp-list-item2.js';
import { d as defineCustomElement$5 } from './wpp-menu-context2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppBreadcrumbCss = ":host{--breadcrumb-color:var(--wpp-breadcrumb-color, var(--wpp-grey-color-500));--breadcrumb-slash-margin:var(--wpp-breadcrumb-slash-margin, 0 12px);--breadcrumb-item-text-color:var(--wpp-breadcrumb-item-text-color, var(--wpp-grey-color-800));--breadcrumb-item-text-hover-color:var(--wpp-breadcrumb-item-text-color-hover, var(--wpp-grey-color-900));--breadcrumb-item-text-active-color:var(--wpp-breadcrumb-item-text-color-active, var(--wpp-grey-color-1000));--breadcrumb-item-icon-hover-color:var(--wpp-breadcrumb-item-icon-color-hover, var(--wpp-grey-color-800));--breadcrumb-item-icon-active-color:var(--wpp-breadcrumb-item-icon-color-active, var(--wpp-grey-color-900));--breadcrumb-menu-trigger-color:var(--wpp-breadcrumb-menu-trigger-color, var(--wpp-icon-color));--breadcrumb-menu-trigger-hover-color:var(--wpp-breadcrumb-menu-trigger-color-hover, var(--wpp-icon-color-hover));--breadcrumb-menu-trigger-active-color:var(--wpp-breadcrumb-menu-trigger-color-active, var(--wpp-icon-color-active));--breadcrumb-item-first-border-color-focus:var(\n    --wpp-breadcrumb-item-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--breadcrumb-item-second-border-color-focus:var(\n    --wpp-breadcrumb-item-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--breadcrumb-item-border-radius-focus:var(--wpp-breadcrumb-item-border-radius-focus, 2px);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;color:var(--breadcrumb-color);white-space:nowrap}:host .menu{--mc-wrapper-width:20px;height:20px;vertical-align:text-top}:host .menu .wpp-list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.item{color:var(--breadcrumb-item-text-color);text-decoration:none}.item:not(.active){cursor:pointer}.item:not(.active):hover{color:var(--breadcrumb-item-text-hover-color);text-decoration:underline}.item:not(.active):active{color:var(--breadcrumb-item-text-active-color);text-decoration:underline}.item.active{color:var(--breadcrumb-item-text-active-color);cursor:default}.menu-trigger{color:var(--breadcrumb-menu-trigger-color);cursor:pointer}.menu-trigger[aria-expanded=true]{color:var(--breadcrumb-item-text-color)}.menu-trigger:hover{color:var(--breadcrumb-menu-trigger-hover-color)}.menu-trigger:active{color:var(--breadcrumb-menu-trigger-active-color)}.link{text-decoration:none}.unclickable{text-decoration:none}.unclickable:not(.active){cursor:default}.unclickable:not(.active):hover{text-decoration:none}.item:focus-visible,.menu:focus-visible{border-radius:var(--breadcrumb-item-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 3px var(--breadcrumb-item-second-border-color-focus);box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 3px var(--breadcrumb-item-second-border-color-focus)}.item:focus-visible{color:var(--breadcrumb-item-text-hover-color);text-decoration:underline}.menu:focus-visible .menu-trigger{color:var(--breadcrumb-menu-trigger-hover-color)}.slash{margin:var(--breadcrumb-slash-margin)}.back{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;color:var(--breadcrumb-item-text-color);text-decoration:none;background:none;border:none;padding:0;font:inherit}.back:hover{color:var(--breadcrumb-item-text-hover-color);text-decoration:underline}.back:hover .back-icon-chevron{color:var(--breadcrumb-item-icon-hover-color)}.back:active{color:var(--breadcrumb-item-text-active-color);text-decoration:underline}.back:active .back-icon-chevron{color:var(--breadcrumb-item-icon-active-color)}.back .back-label{margin-left:4px}.back:focus-visible{border-radius:var(--breadcrumb-item-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 3px var(--breadcrumb-item-second-border-color-focus);box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 3px var(--breadcrumb-item-second-border-color-focus)}";

const WppBreadcrumb$1 = /*@__PURE__*/ proxyCustomElement(class WppBreadcrumb extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.maxItems = 5;
    this.handleBackClick = (event) => {
      event.preventDefault();
      this.wppChange.emit({ path: 'back', label: this.backBtnLabel });
    };
    this.handleBackKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleBackClick(event);
      }
    };
    this.hostCssClasses = () => ({
      'wpp-breadcrumb': true,
    });
    this.items = [];
    this.maxLabelLength = 30;
    this.middleTruncation = false;
    this.nativeLink = false;
    this.dropdownConfig = {};
    this.backBtnLabel = undefined;
  }
  get rootItem() {
    return this.items[0] ?? null;
  }
  get hiddenItems() {
    if (this.items.length > this.maxItems) {
      return this.items.slice(1, this.items.length - this.maxItems + 2);
    }
    return [];
  }
  get visibleItems() {
    return this.items.slice(this.hiddenItems.length + 1);
  }
  // Required for `wpp-menu-context` re-initialization
  get hiddenItemsSnapshot() {
    return this.hiddenItems.map(({ path }) => path).join('|');
  }
  createRouteChangeTrigger(item) {
    this.host.blur();
    return (event) => {
      if (this.nativeLink)
        return;
      event.preventDefault();
      this.wppChange.emit({ path: item.path, label: item.label });
    };
  }
  createItemElement(item, isActive = false) {
    const truncatedLabel = truncate(item.label, this.maxLabelLength, this.middleTruncation);
    if (isActive) {
      return (h("wpp-tooltip-v3-4-0", { text: item.label, part: "item-tooltip", config: {
          onShow: () => {
            if (item.label.length < this.maxLabelLength)
              return false;
          },
        } }, h("span", { class: "active item", tabIndex: -1, part: "item-text" }, truncatedLabel)));
    }
    else if (item.label.length > this.maxLabelLength && !this.nativeLink) {
      return (h("wpp-tooltip-v3-4-0", { text: item.label, part: "item-tooltip" }, h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncatedLabel)));
    }
    else if (item.label.length > this.maxLabelLength) {
      return (h("wpp-tooltip-v3-4-0", { text: item.label, part: "item-tooltip" }, h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncatedLabel)));
    }
    else if (!this.nativeLink) {
      return (h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, item.label));
    }
    else {
      return (h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), part: "item-text" }, item.label));
    }
  }
  createMenuElement(item) {
    if (this.nativeLink) {
      return (h("wpp-list-item-v3-4-0", { key: uuidv4(), class: "link", linkConfig: { href: item.path }, part: "menu-item" }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
    else {
      return (h("wpp-list-item-v3-4-0", { key: uuidv4(), class: "link", part: "menu-item", onClick: this.createRouteChangeTrigger(item) }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
  }
  render() {
    if (this.backBtnLabel) {
      return (h(Host, { class: this.hostCssClasses(), exportparts: "icon" }, h("button", { class: "back", onClick: this.handleBackClick, onKeyDown: this.handleBackKeyDown, type: "button", tabIndex: 0 }, h("wpp-icon-chevron-v3-4-0", { class: "back-icon-chevron", part: "icon", direction: "left", size: "s" }), h("span", { class: "back-label" }, this.backBtnLabel))));
    }
    if (!this.rootItem) {
      return;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "item-tooltip, item-text, menu-item, menu-item-label, slash, menu, icon-more, slash" }, this.createItemElement(this.rootItem), this.hiddenItems.length > 0 && (h(Fragment, null, h("div", { class: "slash", part: "slash" }, "/"), h("wpp-menu-context-v3-4-0", { key: this.hiddenItemsSnapshot, class: "menu", dropdownConfig: { triggerElementWidth: false, ...this.dropdownConfig }, tabIndex: 0, part: "menu" }, h("wpp-icon-more-v3-4-0", { class: "menu-trigger", direction: "horizontal", slot: "trigger-element", part: "icon-more" }), h("div", { key: this.hiddenItemsSnapshot }, this.hiddenItems.map(item => this.createMenuElement(item)))))), this.visibleItems.map((item, index, items) => (h(Fragment, null, h("div", { class: "slash", tabIndex: -1, part: "slash" }, "/"), this.createItemElement(item, index === items.length - 1))))));
  }
  static get registryIs() { return "wpp-breadcrumb-v3-4-0"; }
  get host() { return this; }
  static get style() { return wppBreadcrumbCss; }
}, [1, "wpp-breadcrumb", "wpp-breadcrumb-v3-4-0", {
    "items": [16],
    "maxLabelLength": [2, "max-label-length"],
    "middleTruncation": [4, "middle-truncation"],
    "nativeLink": [4, "native-link"],
    "dropdownConfig": [1040],
    "backBtnLabel": [1, "back-btn-label"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-breadcrumb-v3-4-0", "wpp-action-button-v3-4-0", "wpp-checkbox-v3-4-0", "wpp-icon-chevron-v3-4-0", "wpp-icon-cross-v3-4-0", "wpp-icon-dash-v3-4-0", "wpp-icon-error-v3-4-0", "wpp-icon-info-message-v3-4-0", "wpp-icon-more-v3-4-0", "wpp-icon-success-v3-4-0", "wpp-icon-tick-v3-4-0", "wpp-icon-warning-v3-4-0", "wpp-inline-message-v3-4-0", "wpp-internal-label-v3-4-0", "wpp-internal-tooltip-v3-4-0", "wpp-label-v3-4-0", "wpp-list-item-v3-4-0", "wpp-menu-context-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tooltip-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-breadcrumb-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppBreadcrumb$1);
      }
      break;
    case "wpp-action-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-checkbox-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-chevron-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-cross-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-dash-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-error-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-info-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-more-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-success-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-tick-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-internal-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-list-item-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-menu-context-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppBreadcrumb = WppBreadcrumb$1;
const defineCustomElement = defineCustomElement$1;

export { WppBreadcrumb, defineCustomElement };

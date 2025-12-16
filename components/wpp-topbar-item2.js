import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { e as truncate } from './utils.js';
import { C as CONTEXT_ITEM_TAG } from './constants.js';
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
import { d as defineCustomElement$4 } from './wpp-navigation-item2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppTopbarItemCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .wpp-menu-context .trigger-wrapper[aria-expanded=true] .wpp-navigation-item::part(chevron-icon){-webkit-transform:rotate(180deg);transform:rotate(180deg)}";

const listItemNavStyle = {
  '--mc-item-margin': '4px 0',
  '--li-padding': '8px 12px',
  '--li-bg-color-selected': 'var(--wpp-grey-color-300)',
  '--li-left-icon-color-selected': 'var(--wpp-grey-color-600)',
  '--li-label-text-color-selected': 'var(--wpp-text-color)',
  '--li-label-text-font-weight-selected': '400',
};
const WppTopbarItem = /*@__PURE__*/ proxyCustomElement(class WppTopbarItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppActiveTopbarItemChange = createEvent(this, "wppActiveTopbarItemChange", 1);
    // @TODO: add property dropdownConfig
    this.getEmittedNavigationData = ({ value, path, label }) => ({
      value,
      path,
      label,
    });
    this.topbarItemClick = () => {
      this.wppActiveTopbarItemChange.emit(this.getEmittedNavigationData(this.navigation));
    };
    this.menuItemClick = (e) => {
      this.wppActiveTopbarItemChange.emit(e);
    };
    this.getMenuLevelData = (navigationData, firstLevel) => {
      const truncatedLabel = truncate(navigationData.label, 30);
      if (navigationData.children?.length) {
        return (h("wpp-menu-context-v3-4-0", { listWidth: "224px", externalClass: "topbar", appendToListWrapper: !firstLevel, dropdownConfig: {
            aria: {
              content: 'labelledby',
            },
            onHide: () => {
              this.isMenuExpanded = false;
            },
            onShow: () => {
              this.isMenuExpanded = true;
            },
          } }, firstLevel ? (h("wpp-navigation-item-v3-4-0", { value: navigationData.value, label: truncatedLabel, slot: "trigger-element", extended: true, nativeLink: this.nativeLink, menu: this.menu, menuExpanded: this.isMenuExpanded, chevronOnly: navigationData.chevronOnly, active: this.menu ? this.active : this.activeItems.includes(navigationData.value) })) : (h("wpp-list-item-v3-4-0", { value: navigationData.value, slot: "trigger-element", isExtended: true, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label))), h("div", null, navigationData.children?.map(navigationItem => navigationItem.children ? (this.getMenuLevelData(navigationItem, false)) : (h("wpp-navigation-item-v3-4-0", { value: navigationItem.value, path: navigationItem.path, label: navigationItem.label, nativeLink: this.nativeLink, nestedItem: true, active: this.activeItems.includes(navigationItem.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: () => this.menuItemClick(this.getEmittedNavigationData(navigationItem)) }))))));
      }
      return firstLevel ? (h("wpp-navigation-item-v3-4-0", { value: navigationData.value, path: navigationData.path, label: truncatedLabel, nativeLink: this.nativeLink, active: this.activeItems.includes(navigationData.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: this.topbarItemClick })) : (h("wpp-list-item-v3-4-0", { value: navigationData.value, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label)));
    };
    this.hostCssClasses = () => ({
      'wpp-topbar-item': true,
    });
    this.isMenuExpanded = false;
    this.navigation = undefined;
    this.firstLevel = false;
    this.menu = false;
    this.active = undefined;
    this.activeItems = undefined;
    this.nativeLink = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: CONTEXT_ITEM_TAG }, this.getMenuLevelData(this.navigation, true)));
  }
  static get registryIs() { return "wpp-topbar-item-v3-4-0"; }
  static get style() { return wppTopbarItemCss; }
}, [1, "wpp-topbar-item", "wpp-topbar-item-v3-4-0", {
    "navigation": [16],
    "firstLevel": [516, "first-level"],
    "menu": [516],
    "active": [516],
    "activeItems": [1040],
    "nativeLink": [4, "native-link"],
    "isMenuExpanded": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-topbar-item-v3-4-0", "wpp-action-button-v3-4-0", "wpp-checkbox-v3-4-0", "wpp-icon-chevron-v3-4-0", "wpp-icon-cross-v3-4-0", "wpp-icon-dash-v3-4-0", "wpp-icon-error-v3-4-0", "wpp-icon-info-message-v3-4-0", "wpp-icon-more-v3-4-0", "wpp-icon-success-v3-4-0", "wpp-icon-tick-v3-4-0", "wpp-icon-warning-v3-4-0", "wpp-inline-message-v3-4-0", "wpp-internal-label-v3-4-0", "wpp-internal-tooltip-v3-4-0", "wpp-label-v3-4-0", "wpp-list-item-v3-4-0", "wpp-menu-context-v3-4-0", "wpp-navigation-item-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tooltip-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-topbar-item-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTopbarItem);
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
    case "wpp-navigation-item-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTopbarItem as W, defineCustomElement as d };

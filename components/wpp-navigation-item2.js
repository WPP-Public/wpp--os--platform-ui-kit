import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { M as MENU_BAR_ROLE, C as CONTEXT_ITEM_TAG } from './constants.js';
import { d as defineCustomElement$3 } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$2 } from './wpp-icon-more2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppNavigationItemCss = ":host{--navigation-item-padding:var(--wpp-navigation-item-padding, 5px 12px);--navigation-item-menu-padding:var(--wpp-navigation-item-menu-padding, 6px);--navigation-item-chevron-only-padding:var(--wpp-navigation-item-chevron-only-padding, 6px);--navigation-item-extended-padding:var(--wpp-navigation-item-extended-padding, 5px 10px 5px 12px);--navigation-item-border-radius:var(--wpp-navigation-item-border-radius, var(--wpp-border-radius-s));--navigation-item-link-margin:var(--wpp-navigation-item-link-margin, 0 0 4px 0);--navigation-item-bg-color:var(--wpp-navigation-item-bg-color, transparent);--navigation-item-bg-color-hover:var(--wpp-navigation-item-bg-color-hover, var(--wpp-grey-color-200));--navigation-item-bg-color-active:var(--wpp-navigation-item-bg-color-active, var(--wpp-grey-color-300));--navigation-item-bg-color-selected:var(--wpp-navigation-item-bg-color-selected, var(--wpp-grey-color-300));--navigation-item-bg-color-selected-hover:var(--wpp-navigation-item-bg-color-selected-hover, var(--wpp-grey-color-300));--navigation-item-bg-color-selected-active:var(--wpp-navigation-item-bg-color-selected-active, var(--wpp-grey-color-300));--navigation-item-expanded-bg-color:var(--wpp-navigation-item-expanded-bg-color, var(--wpp-grey-color-200));--navigation-item-expanded-bg-color-active:var(--wpp-navigation-item-expanded-bg-color-active, var(--wpp-grey-color-300));--navigation-item-menu-bg-color:var(--wpp-navigation-item-menu-bg-color, transparent);--navigation-item-menu-bg-color-hover:var(--wpp-navigation-item-menu-bg-color-hover, var(--wpp-grey-color-200));--navigation-item-menu-bg-color-active:var(--wpp-navigation-item-menu-bg-color-active, var(--wpp-grey-color-300));--navigation-item-menu-bg-color-selected:var(--wpp-navigation-item-menu-bg-color-selected, var(--wpp-grey-color-300));--navigation-item-menu-bg-color-selected-hover:var(--wpp-navigation-item-menu-bg-color-selected-hover, var(--wpp-grey-color-200));--navigation-item-menu-bg-color-selected-active:var(--wpp-navigation-item-menu-bg-color-selected-active, var(--wpp-grey-color-300));--navigation-item-expanded-menu-bg-color:var(--wpp-navigation-item-expanded-menu-bg-color, var(--wpp-grey-color-200));--navigation-item-expanded-menu-bg-color-selected:var(--wpp-navigation-item-expanded-menu-bg-color-selected, var(--wpp-grey-color-300));--navigation-item-text-color:var(--wpp-navigation-item-text-color, var(--wpp-text-color-info));--navigation-item-text-color-hover:var(--wpp-navigation-item-text-color-hover, var(--wpp-text-color));--navigation-item-text-color-active:var(--wpp-navigation-item-text-color-active, var(--wpp-text-color));--navigation-item-text-color-selected:var(--wpp-navigation-item-text-color-selected, var(--wpp-text-color));--navigation-item-text-color-selected-hover:var(--wpp-navigation-item-text-color-selected-hover, var(--wpp-text-color));--navigation-item-text-color-selected-active:var(--wpp-navigation-item-text-color-selected-active, var(--wpp-text-color));--navigation-item-expanded-text-color:var(--wpp-navigation-item-expanded-text-color, var(--wpp-text-color-info));--navigation-item-expanded-text-color-selected:var(--wpp-navigation-item-expanded-text-color-selected, var(--wpp-text-color));--navigation-item-nested-text-color:var(--wpp-navigation-item-nested-text-color, var(--wpp-text-color));--navigation-item-extended-icon-color:var(--wpp-navigation-item-extended-icon-color, var(--wpp-icon-color));--navigation-item-extended-icon-color-hover:var(--wpp-navigation-item-extended-icon-color-hover, var(--wpp-icon-color-hover));--navigation-item-extended-icon-color-active:var(--wpp-navigation-item-extended-icon-color-active, var(--wpp-icon-color-active));--navigation-item-extended-icon-color-selected:var(--wpp-navigation-item-extended-icon-color-selected, var(--wpp-icon-color));--navigation-item-extended-icon-color-selected-hover:var(--wpp-navigation-item-extended-icon-color-selected-hover, var(--wpp-icon-color-hover));--navigation-item-extended-icon-color-selected-active:var(--wpp-navigation-item-extended-icon-color-selected-active, var(--wpp-icon-color-active));--navigation-item-expanded-extended-icon-color:var(--wpp-navigation-item-expanded-extended-icon-color, var(--wpp-icon-color));--navigation-item-expanded-extended-icon-color-selected:var(--wpp-navigation-item-expanded-extended-icon-color-selected, var(--wpp-icon-color));--navigation-item-extended-icon-margin:var(--wpp-navigation-item-extended-icon-margin, 0 0 0 4px);--navigation-item-menu-icon-color:var(--wpp-navigation-item-menu-icon-color, var(--wpp-icon-color));--navigation-item-menu-icon-color-hover:var(--wpp-navigation-item-menu-icon-color-hover, var(--wpp-icon-color-hover));--navigation-item-menu-icon-color-active:var(--wpp-navigation-item-menu-icon-color-active, var(--wpp-icon-color-active));--navigation-item-menu-icon-color-selected:var(--wpp-navigation-item-menu-icon-color-selected, var(--wpp-grey-color-1000));--navigation-item-menu-icon-color-selected-hover:var(--wpp-navigation-item-menu-icon-color-selected-hover, var(--wpp-icon-color-hover));--navigation-item-menu-icon-color-selected-active:var(-wpp--navigation-item-menu-icon-color-selected-active, var(--wpp-grey-color-1000));--navigation-item-expanded-menu-icon-color:var(--wpp-navigation-item-expanded-menu-icon-color, var(--wpp-icon-color));--navigation-item-expanded-menu-icon-color-selected:var(--wpp-navigation-item-expanded-menu-icon-color-selected, var(--wpp-grey-color-1000));--topbar-menu-item-first-border-color-focus:var(--wpp-topbar-menu-item-first-border-color-focus, var(--wpp-grey-color-000));--topbar-menu-item-second-border-color-focus:var(--wpp-topbar-menu-item-second-border-color-focus, var(--wpp-brand-color))}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu){background-color:var(--navigation-item-expanded-bg-color)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu) .label-text{color:var(--navigation-item-expanded-text-color)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu) .chevron-icon{color:var(--navigation-item-expanded-extended-icon-color)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu) .chevron-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu).active{background-color:var(--navigation-item-expanded-bg-color-active)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu).active .label-text{color:var(--navigation-item-expanded-text-color-selected)}:host([aria-expanded=true]) .navigation-item-wrapper:not(.menu).active .chevron-icon{color:var(--navigation-item-expanded-extended-icon-color-selected)}:host([aria-expanded=true]) .navigation-item-wrapper.menu{background-color:var(--navigation-item-expanded-menu-bg-color)}:host([aria-expanded=true]) .navigation-item-wrapper.menu .menu-icon{color:var(--navigation-item-expanded-menu-icon-color)}:host([aria-expanded=true]) .navigation-item-wrapper.menu.active{background-color:var(--navigation-item-expanded-menu-bg-color-selected)}:host([aria-expanded=true]) .navigation-item-wrapper.menu.active .menu-icon{color:var(--navigation-item-expanded-menu-icon-color-selected)}:host{display:-ms-inline-flexbox;display:inline-flex;outline:none}:host .navigation-item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--navigation-item-padding);border-radius:var(--navigation-item-border-radius);cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .navigation-item-wrapper .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}:host .navigation-item-wrapper .label-text{width:100%;white-space:nowrap;color:var(--navigation-item-text-color)}:host .navigation-item-wrapper .nested-text{color:var(--navigation-item-nested-text-color)}:host .navigation-item-wrapper .chevron-icon{margin:var(--navigation-item-extended-icon-margin);color:var(--navigation-item-extended-icon-color)}:host .navigation-item-wrapper.extended{padding:var(--navigation-item-extended-padding)}:host .navigation-item-wrapper.extended.chevron-only{padding:var(--navigation-item-chevron-only-padding)}:host .navigation-item-wrapper.extended.chevron-only .chevron-icon{margin:0}:host .navigation-item-wrapper.menu{padding:var(--navigation-item-menu-padding)}:host .navigation-item-wrapper.with-menu-expanded .chevron-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper{background-color:var(--navigation-item-bg-color)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):hover{background-color:var(--navigation-item-bg-color-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):hover .label-text{color:var(--navigation-item-text-color-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):hover .chevron-icon{color:var(--navigation-item-extended-icon-color-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):active{background-color:var(--navigation-item-bg-color-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):active .label-text{color:var(--navigation-item-text-color-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper:not(.menu):active .chevron-icon{color:var(--navigation-item-extended-icon-color-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu{background-color:var(--navigation-item-menu-bg-color)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu .menu-icon{color:var(--navigation-item-menu-icon-color)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu:hover{background-color:var(--navigation-item-menu-bg-color-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu:hover .menu-icon{color:var(--navigation-item-menu-icon-color-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu:active{background-color:var(--navigation-item-menu-bg-color-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.menu:active .menu-icon{color:var(--navigation-item-menu-icon-color-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu){background-color:var(--navigation-item-bg-color-selected)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu) .label-text{color:var(--navigation-item-text-color-selected)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu) .chevron-icon{color:var(--navigation-item-extended-icon-color-selected)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):hover{background-color:var(--navigation-item-bg-color-selected-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):hover .label-text{color:var(--navigation-item-text-color-selected-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):hover .chevron-icon{color:var(--navigation-item-extended-icon-color-selected-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):active{background-color:var(--navigation-item-bg-color-selected-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):active .label-text{color:var(--navigation-item-text-color-selected-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active:not(.menu):active .chevron-icon{color:var(--navigation-item-extended-icon-color-selected-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu{background-color:var(--navigation-item-menu-bg-color-selected)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu .menu-icon{color:var(--navigation-item-menu-icon-color-selected)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu:hover{background-color:var(--navigation-item-menu-bg-color-selected-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu:hover .menu-icon{color:var(--navigation-item-menu-icon-color-selected-hover)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu:active{background-color:var(--navigation-item-menu-bg-color-selected-active)}:host:host(:not([aria-expanded=true])) .navigation-item-wrapper.active.menu:active .menu-icon{color:var(--navigation-item-menu-icon-color-selected-active)}:host:host(:not([aria-expanded=true])):host(:focus-visible:not(.wpp-list-item-wrapper)) .navigation-item-wrapper{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--topbar-menu-item-first-border-color-focus), 0 0 0 2px var(--topbar-menu-item-second-border-color-focus);box-shadow:0 0 0 1px var(--topbar-menu-item-first-border-color-focus), 0 0 0 2px var(--topbar-menu-item-second-border-color-focus);background-color:var(--navigation-item-bg-color-hover)}:host:host(:not([aria-expanded=true])):host(:focus-visible:not(.wpp-list-item-wrapper)) .navigation-item-wrapper .label-text{color:var(--navigation-item-text-color-hover)}:host:host(:not([aria-expanded=true])):host(:focus-visible:not(.wpp-list-item-wrapper)) .navigation-item-wrapper .chevron-icon{color:var(--navigation-item-extended-icon-color-hover)}:host:host(:not([aria-expanded=true])):host(:focus-visible:not(.wpp-list-item-wrapper)) .navigation-item-wrapper.menu{background-color:var(--navigation-item-menu-bg-color-hover)}:host:host(:not([aria-expanded=true])):host(:focus-visible:not(.wpp-list-item-wrapper)) .navigation-item-wrapper.menu .menu-icon{color:var(--navigation-item-menu-icon-color-hover)}:host(.wpp-list-item-wrapper){display:block;width:100%}:host(.wpp-list-item-wrapper):host(:focus-visible) .navigation-item-wrapper{background-color:var(--navigation-item-bg-color-active)}:host(.wpp-list-item-wrapper):host(:focus-visible) .navigation-item-wrapper .label-text{color:var(--navigation-item-text-color-active)}:host(.wpp-list-item-wrapper):host(:focus-visible) .navigation-item-wrapper .chevron-icon{color:var(--navigation-item-extended-icon-color-active)}.link{text-decoration:none}.list-item{margin:var(--navigation-item-link-margin)}";

const WppNavigationItem = /*@__PURE__*/ proxyCustomElement(class WppNavigationItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppActiveNavItemChanged = createEvent(this, "wppActiveNavItemChanged", 1);
    this.onClick = (event) => {
      if (this.nativeLink)
        return;
      event.preventDefault();
      this.wppActiveNavItemChanged.emit({ path: this.path, value: this.value, label: this.label });
    };
    this.navItemCssClasses = () => ({
      'navigation-item-wrapper': true,
      extended: this.extended,
      active: this.active,
      menu: this.menu,
      'with-menu-expanded': this.menuExpanded,
      'chevron-only': this.chevronOnly,
    });
    this.hostCssClasses = () => ({
      'wpp-navigation-item': true,
      'wpp-list-item-wrapper': this.nestedItem,
    });
    this.linkItem = () => (h("a", { href: this.path, class: "link", onClick: this.onClick, tabIndex: -1 }, h("div", { class: this.navItemCssClasses() }, h("wpp-typography-v2-22-0", { type: this.nestedItem ? 's-body' : 's-midi', class: { 'label-text': true, 'nested-text': this.nestedItem } }, this.label))));
    this.listItem = () => (h("li", { class: "list-item", part: "list-item" }, this.linkItem()));
    this.menuItem = () => (h("div", { class: this.navItemCssClasses() }, h("wpp-icon-more-v2-22-0", { direction: "horizontal", class: "menu-icon" })));
    this.extendedItem = () => (h("div", { class: this.navItemCssClasses() }, !this.chevronOnly && (h("wpp-typography-v2-22-0", { type: "s-midi", class: "label-text" }, this.label)), h("wpp-icon-chevron-v2-22-0", { direction: "down", color: "var(--wpp-grey-color-600)", class: "chevron-icon", part: "chevron-icon" })));
    this.renderItem = () => {
      if (this.menu) {
        return this.menuItem();
      }
      if (this.extended) {
        return this.extendedItem();
      }
      if (this.nestedItem) {
        return this.listItem();
      }
      return this.linkItem();
    };
    this.menuExpanded = false;
    this.label = undefined;
    this.value = undefined;
    this.path = undefined;
    this.nestedItem = false;
    this.active = false;
    this.menu = false;
    this.extended = false;
    this.chevronOnly = false;
    this.nativeLink = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: this.extended ? MENU_BAR_ROLE : CONTEXT_ITEM_TAG, tabIndex: 0, exportparts: "list-item, chevron-icon" }, this.renderItem()));
  }
  static get registryIs() { return "wpp-navigation-item-v2-22-0"; }
  static get style() { return wppNavigationItemCss; }
}, [1, "wpp-navigation-item", "wpp-navigation-item-v2-22-0", {
    "menuExpanded": [516, "menu-expanded"],
    "label": [1],
    "value": [1],
    "path": [1],
    "nestedItem": [4, "nested-item"],
    "active": [516],
    "menu": [516],
    "extended": [1540],
    "chevronOnly": [516, "chevron-only"],
    "nativeLink": [4, "native-link"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-navigation-item-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-icon-more-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-navigation-item-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppNavigationItem);
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-icon-more-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppNavigationItem as W, defineCustomElement as d };

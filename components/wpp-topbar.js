import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getSlotEmptyStates } from './utils.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$p } from './wpp-action-button2.js';
import { d as defineCustomElement$o } from './wpp-checkbox2.js';
import { d as defineCustomElement$n } from './wpp-divider2.js';
import { d as defineCustomElement$m } from './wpp-grid2.js';
import { d as defineCustomElement$l } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$k } from './wpp-icon-cross2.js';
import { d as defineCustomElement$j } from './wpp-icon-dash2.js';
import { d as defineCustomElement$i } from './wpp-icon-error2.js';
import { d as defineCustomElement$h } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$g } from './wpp-icon-more2.js';
import { d as defineCustomElement$f } from './wpp-icon-success2.js';
import { d as defineCustomElement$e } from './wpp-icon-tick2.js';
import { d as defineCustomElement$d } from './wpp-icon-warning2.js';
import { d as defineCustomElement$c } from './wpp-inline-message2.js';
import { d as defineCustomElement$b } from './wpp-internal-label2.js';
import { d as defineCustomElement$a } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$9 } from './wpp-label2.js';
import { d as defineCustomElement$8 } from './wpp-list-item2.js';
import { d as defineCustomElement$7 } from './wpp-menu-context2.js';
import { d as defineCustomElement$6 } from './wpp-navigation-item2.js';
import { d as defineCustomElement$5 } from './wpp-spinner2.js';
import { d as defineCustomElement$4 } from './wpp-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-topbar-item2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppTopbarCss = ":host{--topbar-padding:var(--wpp-topbar-padding, 12px 0);--topbar-with-app-padding:var(--wpp-topbar-with-app-padding, 8px 0);--topbar-item-margin:var(--wpp-topbar-item-margin, 8px);--topbar-max-width:var(--wpp-topbar-max-width, 1812px);--topbar-offset-top:var(--wpp-topbar-offset-top, 64px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;position:-webkit-sticky;position:sticky;top:var(--topbar-offset-top);background-color:var(--wpp-grey-color-000)}:host .wrapper{max-width:var(--topbar-max-width);width:95%;margin:0 auto;padding:0 2.5%}:host .wrapper .container{margin-left:0}:host .header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--topbar-padding)}:host .header .navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;opacity:1}:host .header .navigation.hidden{height:32px;overflow-y:hidden;opacity:0}:host .header .navigation .wpp-topbar-item{white-space:nowrap}:host .header .navigation .wpp-topbar-item:not(:last-child){margin-right:var(--topbar-item-margin)}:host .header.without-application .application{display:none}:host .header.with-app{padding:var(--topbar-with-app-padding)}.app.slot-hidden,right.slot-hidden{display:none}";

const WppTopbar$1 = /*@__PURE__*/ proxyCustomElement(class WppTopbar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.getItemsWidth = () => {
      const navigationItemsElement = this.host.shadowRoot.querySelector('.navigation');
      const topbarItems = navigationItemsElement?.querySelectorAll('.wpp-topbar-item:not([is-menu])');
      if (!topbarItems)
        return;
      this.topbarItemsWidth = Array.from(topbarItems).map(item => Math.ceil(Number(getComputedStyle(item).width?.replace('px', '')) + parseInt(getComputedStyle(item)?.marginRight)));
    };
    this.getDisplayData = () => {
      const menuWidth = 32;
      const appWrapperWidth = this.host.shadowRoot.querySelector('[part="app-wrapper"]')
        ?.clientWidth;
      let width = appWrapperWidth + menuWidth;
      let amount = 0;
      const headerWidth = this.host.shadowRoot.querySelector('.header')?.clientWidth;
      while (amount < this.navigation.length && width + this.topbarItemsWidth[amount] < headerWidth) {
        width += this.topbarItemsWidth[amount];
        amount++;
      }
      this.truncated = amount < this.navigation.length;
      this.itemsToShow = amount;
    };
    this.topbarItemClick = (e) => {
      this.wppChange.emit(e.detail);
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        app: '[slot="app"]',
        right: '[slot="right"]',
      });
      this.hasAppSlot = !emptyStates.app;
      this.hasRightSlot = !emptyStates.right;
    };
    this.wrapperCssClasses = () => ({
      wrapper: true,
    });
    this.headerCssClasses = () => ({
      header: true,
      'with-app': this.hasAppSlot,
      'without-application': !this.hasAppSlot,
    });
    this.navigationCssClasses = () => ({
      navigation: true,
      hidden: this.topbarItemsWidth.length === 0,
    });
    this.hostCssClasses = () => ({
      'wpp-topbar': true,
    });
    this.truncated = false;
    this.itemsToShow = undefined;
    this.hasAppSlot = false;
    this.hasRightSlot = false;
    this.activeItems = [];
    this.topbarItemsWidth = [];
    this.navigation = undefined;
    this.value = undefined;
    this.nativeLink = false;
    this.zIndex = Z_INDEX.TOPBAR;
  }
  // @TODO: add property dropdownConfig
  navigationChanged(newNavigation) {
    this.itemsToShow = newNavigation.length;
    setTimeout(() => {
      this.getItemsWidth();
      this.getDisplayData();
    }, 40); // 40 ms have been added to display the topbar correctly in safari, firefox.
  }
  valueChanged(newValue) {
    const tree = {
      children: this.navigation,
    };
    requestAnimationFrame(() => {
      const data = this.findInTree(newValue, tree);
      if (data.path) {
        this.activeItems = data.path ? data.path.filter(item => item) : [];
      }
      else {
        this.activeItems = [];
      }
    });
  }
  findInTree(value, tree) {
    if (tree.value === value) {
      const path = [tree.value];
      return { result: tree, path };
    }
    else {
      const treeChildren = tree.children || [];
      for (const child of treeChildren) {
        const tmp = this.findInTree(value, child);
        if (Object.keys(tmp).length !== 0 && tmp.path) {
          tmp.path.unshift(tree.value);
          return tmp;
        }
      }
      return {};
    }
  }
  componentWillLoad() {
    this.itemsToShow = this.navigation.length;
    this.updateSlotData();
    this.valueChanged(this.value);
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.getItemsWidth();
      this.getDisplayData();
      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host);
      }
    });
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.getItemsWidth();
        this.getDisplayData();
      });
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const hiddenNavigation = {
      children: this.navigation.slice(this.itemsToShow),
    };
    const isMenuActive = !!hiddenNavigation.children?.find(item => this.activeItems.includes(item.value));
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "wrapper, body, navigation, topbar-item, divider, app, right, app-wrapper, right-wrapper" }, h("div", { class: this.wrapperCssClasses(), part: "wrapper" }, h("wpp-grid-v3-3-0", { container: true }, h("wpp-grid-v3-3-0", { item: true, all: 24 }, h("div", { class: this.headerCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasAppSlot }, name: "app", onSlotchange: this.updateSlotData }), h("nav", { class: this.navigationCssClasses(), key: this.itemsToShow, part: "navigation" }, this.navigation.slice(0, this.itemsToShow).map(navigation => (h("wpp-topbar-item-v3-3-0", { navigation: navigation, firstLevel: true, active: navigation.active, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), this.truncated && (h("wpp-topbar-item-v3-3-0", { key: this.value, navigation: hiddenNavigation, firstLevel: true, menu: true, active: isMenuActive, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasRightSlot }, name: "right", onSlotchange: this.updateSlotData }))))), h("wpp-divider-v3-3-0", { part: "divider" })));
  }
  static get registryIs() { return "wpp-topbar-v3-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "navigation": ["navigationChanged"],
    "value": ["valueChanged"]
  }; }
  static get style() { return wppTopbarCss; }
}, [1, "wpp-topbar", "wpp-topbar-v3-3-0", {
    "navigation": [16],
    "value": [1],
    "nativeLink": [4, "native-link"],
    "zIndex": [2, "z-index"],
    "truncated": [32],
    "itemsToShow": [32],
    "hasAppSlot": [32],
    "hasRightSlot": [32],
    "activeItems": [32],
    "topbarItemsWidth": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-topbar-v3-3-0", "wpp-action-button-v3-3-0", "wpp-checkbox-v3-3-0", "wpp-divider-v3-3-0", "wpp-grid-v3-3-0", "wpp-icon-chevron-v3-3-0", "wpp-icon-cross-v3-3-0", "wpp-icon-dash-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-info-message-v3-3-0", "wpp-icon-more-v3-3-0", "wpp-icon-success-v3-3-0", "wpp-icon-tick-v3-3-0", "wpp-icon-warning-v3-3-0", "wpp-inline-message-v3-3-0", "wpp-internal-label-v3-3-0", "wpp-internal-tooltip-v3-3-0", "wpp-label-v3-3-0", "wpp-list-item-v3-3-0", "wpp-menu-context-v3-3-0", "wpp-navigation-item-v3-3-0", "wpp-spinner-v3-3-0", "wpp-tooltip-v3-3-0", "wpp-topbar-item-v3-3-0", "wpp-typography-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-topbar-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTopbar$1);
      }
      break;
    case "wpp-action-button-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-checkbox-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-divider-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-grid-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-chevron-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-cross-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-dash-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-info-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-more-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-success-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-tick-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-inline-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-internal-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-list-item-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-menu-context-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-navigation-item-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-spinner-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-topbar-item-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppTopbar = WppTopbar$1;
const defineCustomElement = defineCustomElement$1;

export { WppTopbar, defineCustomElement };

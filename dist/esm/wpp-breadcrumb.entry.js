import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-9177bb6d.js';
import { c as truncate, u as uuidv4 } from './utils-f3870f15.js';
import './consts-4b0f734e.js';

const wppBreadcrumbCss = ":host{--breadcrumb-color:var(--wpp-breadcrumb-color, var(--wpp-grey-color-500));--breadcrumb-slash-margin:var(--wpp-breadcrumb-slash-margin, 0 12px);--breadcrumb-item-text-color:var(--wpp-breadcrumb-item-text-color, var(--wpp-grey-color-800));--breadcrumb-item-text-hover-color:var(--wpp-breadcrumb-item-text-color-hover, var(--wpp-grey-color-900));--breadcrumb-item-text-active-color:var(--wpp-breadcrumb-item-text-color-active, var(--wpp-grey-color-1000));--breadcrumb-menu-trigger-color:var(--wpp-breadcrumb-menu-trigger-color, var(--wpp-icon-color));--breadcrumb-menu-trigger-hover-color:var(--wpp-breadcrumb-menu-trigger-color-hover, var(--wpp-icon-color-hover));--breadcrumb-menu-trigger-active-color:var(--wpp-breadcrumb-menu-trigger-color-active, var(--wpp-icon-color-active));--breadcrumb-item-first-border-color-focus:var(--wpp-breadcrumb-item-first-border-color-focus, var(--wpp-grey-color-000));--breadcrumb-item-second-border-color-focus:var(--wpp-breadcrumb-item-second-border-color-focus, var(--wpp-brand-color));--breadcrumb-item-border-radius-focus:var(--wpp-breadcrumb-item-border-radius-focus, 2px);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;color:var(--breadcrumb-color);white-space:nowrap}:host .menu{--mc-wrapper-width:20px;height:20px;vertical-align:text-top}:host .menu .wpp-list{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.item{color:var(--breadcrumb-item-text-color);text-decoration:none}.item:not(.active){cursor:pointer}.item:not(.active):hover{color:var(--breadcrumb-item-text-hover-color);text-decoration:underline}.item:not(.active):active{color:var(--breadcrumb-item-text-active-color);text-decoration:underline}.item.active{color:var(--breadcrumb-item-text-active-color);cursor:default}.menu-trigger{color:var(--breadcrumb-menu-trigger-color);cursor:pointer}.menu-trigger[aria-expanded=true]{color:var(--breadcrumb-item-text-color)}.menu-trigger:hover{color:var(--breadcrumb-menu-trigger-hover-color)}.menu-trigger:active{color:var(--breadcrumb-menu-trigger-active-color)}.link{text-decoration:none}.unclickable{text-decoration:none}.unclickable:not(.active){cursor:default}.unclickable:not(.active):hover{text-decoration:none}.item:focus-visible,.menu:focus-visible{border-radius:var(--breadcrumb-item-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 2px var(--breadcrumb-item-second-border-color-focus);box-shadow:0 0 0 1px var(--breadcrumb-item-first-border-color-focus), 0 0 0 2px var(--breadcrumb-item-second-border-color-focus)}.item:focus-visible{color:var(--breadcrumb-item-text-hover-color);text-decoration:underline}.menu:focus-visible .menu-trigger{color:var(--breadcrumb-menu-trigger-hover-color)}.slash{margin:var(--breadcrumb-slash-margin)}";

const WppBreadcrumb = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.maxItems = 5;
    this.hostCssClasses = () => ({
      'wpp-breadcrumb': true,
    });
    this.items = [];
    this.maxLabelLength = 30;
    this.middleTruncation = false;
    this.nativeLink = false;
    this.dropdownConfig = {};
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
    if (isActive) {
      return (h("span", { class: "active item", tabIndex: -1, part: "item-text" }, item.label));
    }
    else if (item.label.length > this.maxLabelLength && !this.nativeLink) {
      return (h("wpp-tooltip-v2-22-0", { text: item.label, part: "item-tooltip" }, h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncate(item.label, this.maxLabelLength, this.middleTruncation))));
    }
    else if (item.label.length > this.maxLabelLength) {
      return (h("wpp-tooltip-v2-22-0", { text: item.label, part: "item-tooltip" }, h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncate(item.label, this.maxLabelLength, this.middleTruncation))));
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
      return (h("wpp-list-item-v2-22-0", { key: uuidv4(), class: "link", linkConfig: { href: item.path }, part: "menu-item" }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
    else {
      return (h("wpp-list-item-v2-22-0", { key: uuidv4(), class: "link", part: "menu-item", onClick: this.createRouteChangeTrigger(item) }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
  }
  render() {
    if (!this.rootItem) {
      return;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "item-tooltip, item-text, menu-item, menu-item-label, slash, menu, icon-more, slash" }, this.createItemElement(this.rootItem), this.hiddenItems.length > 0 && (h(Fragment, null, h("div", { class: "slash", part: "slash" }, "/"), h("wpp-menu-context-v2-22-0", { key: this.hiddenItemsSnapshot, class: "menu", dropdownConfig: { triggerElementWidth: false, ...this.dropdownConfig }, tabIndex: 0, part: "menu" }, h("wpp-icon-more-v2-22-0", { class: "menu-trigger", direction: "horizontal", slot: "trigger-element", part: "icon-more" }), h("div", { key: this.hiddenItemsSnapshot }, this.hiddenItems.map(item => this.createMenuElement(item)))))), this.visibleItems.map((item, index, items) => (h(Fragment, null, h("div", { class: "slash", tabIndex: -1, part: "slash" }, "/"), this.createItemElement(item, index === items.length - 1))))));
  }
  static get registryIs() { return "wpp-breadcrumb-v2-22-0"; }
  get host() { return getElement(this); }
};
WppBreadcrumb.style = wppBreadcrumbCss;

export { WppBreadcrumb as wpp_breadcrumb };

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-15defa44.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const consts = require('./consts-dba6e6dd.js');

const wppNavSidebarCss = ":host{display:inline-block;--ns-top-position:var(--wpp-nav-sidebar-top-position, 0);--ns-width:var(--wpp-nav-sidebar-width, 240px);--ns-title-margin:var(--wpp-nav-sidebar-title-margin, 16px);--ns-padding:var(--wpp-nav-sidebar-padding, 24px 16px);--ns-bg-color:var(--wpp-nav-sidebar-background-color, var(--wpp-grey-color-000));--ns-open-padding:var(--wpp-nav-sidebar-open-padding, 0 30px);--ns-close-padding:var(--wpp-nav-sidebar-close-padding, 0 26px);--ns-close-label-margin:var(--wpp-nav-sidebar-close-label-margin, 0 0 0 8px);--ns-close-wrapper-height:var(--wpp-nav-sidebar-close-wrapper-height, 50px);--ns-border-color:var(--wpp-nav-sidebar-border-color, var(--wpp-grey-color-300));--ns-border-width:var(--wpp-nav-sidebar-border-width, 1px);--ns-border-style:var(--wpp-nav-sidebar-border-style, solid)}.nav-sidebar{position:fixed;top:var(--ns-top-position);bottom:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--wpp-nav-sidebar-min-width);min-width:var(--wpp-nav-sidebar-min-width);height:calc(100% - var(--ns-top-position));padding:var(--ns-padding);background-color:var(--ns-bg-color);-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out;border-right:var(--ns-border-width) var(--ns-border-style) var(--ns-border-color);overflow-y:auto}.nav-sidebar.open{width:var(--ns-width)}.nav-sidebar.open .title{opacity:1}.nav-wrapper{width:100%;height:100%}.nav-wrapper .title-wrapper{margin-bottom:var(--ns-title-margin)}.nav-wrapper .items-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.nav-wrapper .close-wrapper{position:fixed;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--sidebar-navigation-sidebar-min-width);height:var(--ns-close-wrapper-height);padding:var(--ns-close-padding);cursor:pointer;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out}.nav-wrapper .close-wrapper .wpp-icon-double-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out}.nav-wrapper .close-wrapper:hover .slot-icon-chevron-fallback{color:var(--wpp-grey-color-700)}.nav-wrapper .close-wrapper:hover .close-label{color:var(--wpp-grey-color-800)}.nav-wrapper .close-wrapper:active .slot-icon-chevron-fallback{color:var(--wpp-grey-color-800)}.nav-wrapper .close-wrapper:active .close-label{color:var(--wpp-grey-color-1000)}.nav-wrapper .close-wrapper.show{width:var(--ns-width);padding:var(--ns-open-padding)}.nav-wrapper .close-wrapper.show .wpp-icon-double-chevron{-webkit-transform:rotate(0deg);transform:rotate(0deg)}.nav-wrapper .close-wrapper .close-label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);width:0;margin:0;color:var(--wpp-grey-color-800);opacity:0;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out;pointer-events:none}.nav-wrapper .close-wrapper .close-label.show{width:auto;margin:var(--ns-close-label-margin);opacity:1;pointer-events:initial}";

const WppNavSidebar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.calculateOsBarHeight = () => {
      const headerElement = document.querySelector('.wpp > header');
      if (!headerElement)
        return;
      const headerHeight = `${headerElement?.getBoundingClientRect().height ?? 0}px`;
      this.host.style.setProperty('--wpp-nav-sidebar-top-position', headerHeight);
    };
    this.closeExpandedItemOnItemClick = () => {
      const expandedList = this.host.querySelectorAll(`${utils.transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]:not([expanded=false])`);
      expandedList.forEach(item => {
        if (item && !item.active) {
          item.removeAttribute('expanded');
        }
      });
    };
    this.closeInactiveExpandedItem = (label) => {
      const expandedList = this.host.querySelectorAll(`${utils.transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]`);
      expandedList.forEach(item => {
        if (item.extended && item.label !== label) {
          item.removeAttribute('expanded');
        }
      });
    };
    this.setActiveItem = (path) => {
      let lastExtendedItem = null;
      this.host
        .querySelectorAll(utils.transformToVersionedTag('wpp-nav-sidebar-item'))
        .forEach(item => {
        item.setAttribute('native-link', `${this.nativeLink}`);
        if (item.extended)
          lastExtendedItem = item;
        if (path && item.path === path) {
          item.setAttribute('active', `${true}`);
          if (item.nestedItem) {
            lastExtendedItem?.setAttribute('active', `${true}`);
            lastExtendedItem?.setAttribute('expanded', `${true}`);
          }
        }
        else {
          item.removeAttribute('active');
          item.removeAttribute('expanded');
        }
      });
      lastExtendedItem = null;
    };
    this.asideCssClasses = () => ({
      'nav-sidebar': true,
      open: true,
    });
    this.hostCssClasses = () => ({
      'wpp-nav-sidebar': true,
    });
    this.activePath = undefined;
    this.nativeLink = false;
    this.zIndex = consts.Z_INDEX.NAV_SIDEBAR;
  }
  handleActivePathChange(newValue) {
    this.setActiveItem(newValue);
  }
  handleItemClick(event) {
    event.stopPropagation();
    this.setActiveItem(event.detail.path);
    this.closeExpandedItemOnItemClick();
    this.wppChange.emit(event.detail);
  }
  handleExpandedClick(event) {
    event.stopPropagation();
    this.closeInactiveExpandedItem(event.detail.label);
  }
  componentWillLoad() {
    this.setActiveItem(this.activePath);
    this.calculateOsBarHeight();
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "nav-sidebar, body, header-wrapper, header, ws-wrapper, ws-inner" }, index.h("aside", { class: this.asideCssClasses(), part: "nav-sidebar" }, index.h("div", { class: "nav-wrapper", part: "body" }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: "title-wrapper", name: "header" }), index.h(WrappedSlot.WrappedSlot, { wrapperClass: "items-wrapper" })))));
  }
  static get registryIs() { return "wpp-nav-sidebar-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "activePath": ["handleActivePathChange"]
  }; }
};
WppNavSidebar.style = wppNavSidebarCss;

exports.wpp_nav_sidebar = WppNavSidebar;

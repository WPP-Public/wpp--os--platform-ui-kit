'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-06b46408.js');
const constants = require('./constants-6680c2a7.js');
require('./consts-d8f5ef98.js');

const wppLegacyTopbarItemCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .wpp-menu-context .trigger-wrapper[aria-expanded=true] .wpp-navigation-item::part(chevron-icon){-webkit-transform:rotate(180deg);transform:rotate(180deg)}";

const listItemNavStyle = {
  '--mc-item-margin': '4px 0',
  '--li-padding': '8px 12px',
  '--li-bg-color-selected': 'var(--wpp-grey-color-300)',
  '--li-left-icon-color-selected': 'var(--wpp-grey-color-600)',
  '--li-label-text-color-selected': 'var(--wpp-text-color)',
  '--li-label-text-font-weight-selected': '400',
};
const WppLegacyTopbarItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppActiveTopbarItemChange = index.createEvent(this, "wppActiveTopbarItemChange", 1);
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
      const truncatedLabel = utils.truncate(navigationData.label, 30);
      if (navigationData.children?.length) {
        return (index.h("wpp-menu-context-v4-2-0", { listWidth: "224px", externalClass: "topbar", appendToListWrapper: true, dropdownConfig: {
            popperOptions: {
              strategy: 'fixed',
            },
            aria: {
              content: 'labelledby',
            },
            onHide: () => {
              this.isMenuExpanded = false;
            },
            onShow: () => {
              this.isMenuExpanded = true;
            },
          } }, firstLevel ? (index.h("wpp-navigation-item-v4-2-0", { value: navigationData.value, label: truncatedLabel, slot: "trigger-element", extended: true, nativeLink: this.nativeLink, menu: this.menu, menuExpanded: this.isMenuExpanded, chevronOnly: navigationData.chevronOnly, active: this.menu ? this.active : this.activeItems.includes(navigationData.value) })) : (index.h("wpp-list-item-v4-2-0", { value: navigationData.value, slot: "trigger-element", isExtended: true, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, index.h("p", { slot: "label" }, navigationData.label))), index.h("div", null, navigationData.children?.map(navigationItem => navigationItem.children ? (this.getMenuLevelData(navigationItem, false)) : (index.h("wpp-navigation-item-v4-2-0", { value: navigationItem.value, path: navigationItem.path, label: navigationItem.label, nativeLink: this.nativeLink, nestedItem: true, active: this.activeItems.includes(navigationItem.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: () => this.menuItemClick(this.getEmittedNavigationData(navigationItem)) }))))));
      }
      return firstLevel ? (index.h("wpp-navigation-item-v4-2-0", { value: navigationData.value, path: navigationData.path, label: truncatedLabel, nativeLink: this.nativeLink, active: this.activeItems.includes(navigationData.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: this.topbarItemClick })) : (index.h("wpp-list-item-v4-2-0", { value: navigationData.value, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, index.h("p", { slot: "label" }, navigationData.label)));
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
    return (index.h(index.Host, { class: this.hostCssClasses(), role: constants.CONTEXT_ITEM_TAG }, this.getMenuLevelData(this.navigation, true)));
  }
  static get registryIs() { return "wpp-legacy-topbar-item-v4-2-0"; }
};
WppLegacyTopbarItem.style = wppLegacyTopbarItemCss;

exports.wpp_legacy_topbar_item = WppLegacyTopbarItem;

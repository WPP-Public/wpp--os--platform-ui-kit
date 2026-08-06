import { r as registerInstance, c as createEvent, h, H as Host } from './index-93f63aaa.js';
import { e as truncate } from './utils-452958a4.js';
import { Z as Z_INDEX } from './consts-744c144f.js';

const wppTopbarItemCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .menu-items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .wpp-menu-context .trigger-wrapper[aria-expanded=true] .wpp-navigation-item::part(chevron-icon){-webkit-transform:rotate(180deg);transform:rotate(180deg)}";

const listItemNavStyle = {
  '--mc-item-margin': '4px 0',
  '--li-padding': '8px 12px',
  '--li-bg-color-selected': 'var(--wpp-grey-color-300)',
  '--li-left-icon-color-selected': 'var(--wpp-grey-color-600)',
  '--li-label-text-color-selected': 'var(--wpp-text-color)',
  '--li-label-text-font-weight-selected': '400',
};
const WppTopbarItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppActiveTopbarItemChange = createEvent(this, "wppActiveTopbarItemChange", 1);
    this.wppTopbarItemMenuToggle = createEvent(this, "wppTopbarItemMenuToggle", 1);
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
    this.topbarMenuShow = () => {
      this.isMenuExpanded = true;
      this.wppTopbarItemMenuToggle.emit(true);
    };
    this.topbarMenuHide = () => {
      this.isMenuExpanded = false;
      this.wppTopbarItemMenuToggle.emit(false);
    };
    this.getMenuLevelData = (navigationData, firstLevel) => {
      const truncatedLabel = truncate(navigationData.label, 30);
      if (navigationData.children?.length) {
        return (h("wpp-menu-context-v4-3-0", { listWidth: "224px", externalClass: "topbar", appendToListWrapper: true, dropdownConfig: {
            zIndex: this.zIndex,
            popperOptions: {
              strategy: 'fixed',
            },
            aria: {
              content: 'labelledby',
            },
            onHide: () => {
              if (firstLevel)
                this.topbarMenuHide();
            },
            onShow: () => {
              if (firstLevel)
                this.topbarMenuShow();
            },
          } }, firstLevel ? (h("wpp-navigation-item-v4-3-0", { value: navigationData.value, label: truncatedLabel, slot: "trigger-element", extended: true, nativeLink: this.nativeLink, menu: this.menu, menuExpanded: this.isMenuExpanded, chevronOnly: navigationData.chevronOnly, active: this.menu ? this.active : this.activeItems.includes(navigationData.value) })) : (h("wpp-list-item-v4-3-0", { value: navigationData.value, slot: "trigger-element", isExtended: true, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label))), h("div", { class: "menu-items" }, navigationData.children?.map(navigationItem => navigationItem.children ? (this.getMenuLevelData(navigationItem, false)) : (h("wpp-navigation-item-v4-3-0", { value: navigationItem.value, path: navigationItem.path, label: navigationItem.label, nativeLink: this.nativeLink, nestedItem: true, active: this.activeItems.includes(navigationItem.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: () => this.menuItemClick(this.getEmittedNavigationData(navigationItem)) }))))));
      }
      return firstLevel ? (h("wpp-navigation-item-v4-3-0", { value: navigationData.value, path: navigationData.path, label: truncatedLabel, nativeLink: this.nativeLink, active: this.activeItems.includes(navigationData.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: this.topbarItemClick })) : (h("wpp-list-item-v4-3-0", { value: navigationData.value, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label)));
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
    this.zIndex = Z_INDEX.TOPBAR_MENU;
  }
  render() {
    return h(Host, { class: this.hostCssClasses() }, this.getMenuLevelData(this.navigation, true));
  }
  static get registryIs() { return "wpp-topbar-item-v4-3-0"; }
};
WppTopbarItem.style = wppTopbarItemCss;

export { WppTopbarItem as wpp_topbar_item };

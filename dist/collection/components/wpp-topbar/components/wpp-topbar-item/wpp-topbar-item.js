import { h, Host } from '@stencil/core';
import { truncate } from '../../../../utils/utils';
import { CONTEXT_ITEM_TAG } from '../../../wpp-menu-context/constants';
const listItemNavStyle = {
  '--mc-item-margin': '4px 0',
  '--li-padding': '8px 12px',
  '--li-bg-color-selected': 'var(--wpp-grey-color-300)',
  '--li-left-icon-color-selected': 'var(--wpp-grey-color-600)',
  '--li-label-text-color-selected': 'var(--wpp-text-color)',
  '--li-label-text-font-weight-selected': '400',
};
export class WppTopbarItem {
  constructor() {
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
        return (h("wpp-menu-context-v3-6-0", { listWidth: "224px", externalClass: "topbar", appendToListWrapper: true, dropdownConfig: {
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
          } }, firstLevel ? (h("wpp-navigation-item-v3-6-0", { value: navigationData.value, label: truncatedLabel, slot: "trigger-element", extended: true, nativeLink: this.nativeLink, menu: this.menu, menuExpanded: this.isMenuExpanded, chevronOnly: navigationData.chevronOnly, active: this.menu ? this.active : this.activeItems.includes(navigationData.value) })) : (h("wpp-list-item-v3-6-0", { value: navigationData.value, slot: "trigger-element", isExtended: true, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label))), h("div", null, navigationData.children?.map(navigationItem => navigationItem.children ? (this.getMenuLevelData(navigationItem, false)) : (h("wpp-navigation-item-v3-6-0", { value: navigationItem.value, path: navigationItem.path, label: navigationItem.label, nativeLink: this.nativeLink, nestedItem: true, active: this.activeItems.includes(navigationItem.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: () => this.menuItemClick(this.getEmittedNavigationData(navigationItem)) }))))));
      }
      return firstLevel ? (h("wpp-navigation-item-v3-6-0", { value: navigationData.value, path: navigationData.path, label: truncatedLabel, nativeLink: this.nativeLink, active: this.activeItems.includes(navigationData.value), chevronOnly: navigationData.chevronOnly, onWppActiveNavItemChanged: this.topbarItemClick })) : (h("wpp-list-item-v3-6-0", { value: navigationData.value, checked: this.activeItems.includes(navigationData.value), style: listItemNavStyle }, h("p", { slot: "label" }, navigationData.label)));
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
  static get is() { return "wpp-topbar-item"; }
  static get registryIs() { return "wpp-topbar-item-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-topbar-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-topbar-item.css"]
    };
  }
  static get properties() {
    return {
      "navigation": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "NavigationState",
          "resolved": "NavigationState",
          "references": {
            "NavigationState": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-topbar/types.ts::NavigationState"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates navigation items"
        }
      },
      "firstLevel": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component placed on the first level of topbar"
        },
        "attribute": "first-level",
        "reflect": true,
        "defaultValue": "false"
      },
      "menu": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component has menu icon"
        },
        "attribute": "menu",
        "reflect": true,
        "defaultValue": "false"
      },
      "active": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component is active"
        },
        "attribute": "active",
        "reflect": true
      },
      "activeItems": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates list of values of the items that are active, where each value represents particular navigation item"
        }
      },
      "nativeLink": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the navigation link will be have native behaviour `a` tag.\nIf app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop\nThis is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page"
        },
        "attribute": "native-link",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isMenuExpanded": {}
    };
  }
  static get events() {
    return [{
        "method": "wppActiveTopbarItemChange",
        "name": "wppActiveTopbarItemChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when topbar item was changed"
        },
        "complexType": {
          "original": "NavigationItemEventDetail",
          "resolved": "NavigationItemEventDetail",
          "references": {
            "NavigationItemEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-topbar/types.ts::NavigationItemEventDetail"
            }
          }
        }
      }];
  }
}

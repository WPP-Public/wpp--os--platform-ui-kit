import { Host, h } from '@stencil/core';
import { CONTEXT_ITEM_TAG, MENU_BAR_ROLE } from '../../../wpp-menu-context/constants';
export class WppNavigationItem {
  constructor() {
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
    this.linkItem = () => (h("a", { href: this.path, class: "link", onClick: this.onClick, tabIndex: -1 }, h("div", { class: this.navItemCssClasses() }, h("wpp-typography-v3-3-1", { type: this.nestedItem ? 's-body' : 's-midi', class: { 'label-text': true, 'nested-text': this.nestedItem } }, this.label))));
    this.listItem = () => (h("li", { class: "list-item", part: "list-item" }, this.linkItem()));
    this.menuItem = () => (h("div", { class: this.navItemCssClasses() }, h("wpp-icon-more-v3-3-1", { direction: "horizontal", class: "menu-icon" })));
    this.extendedItem = () => (h("div", { class: this.navItemCssClasses() }, !this.chevronOnly && (h("wpp-typography-v3-3-1", { type: "s-midi", class: "label-text" }, this.label)), h("wpp-icon-chevron-v3-3-1", { direction: "down", color: "var(--wpp-grey-color-600)", class: "chevron-icon", part: "chevron-icon" })));
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
  static get is() { return "wpp-navigation-item"; }
  static get registryIs() { return "wpp-navigation-item-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-navigation-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-navigation-item.css"]
    };
  }
  static get properties() {
    return {
      "menuExpanded": {
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
          "text": "Indicates navigation item label"
        },
        "attribute": "menu-expanded",
        "reflect": true,
        "defaultValue": "false"
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates navigation item label"
        },
        "attribute": "label",
        "reflect": false
      },
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates navigation item value"
        },
        "attribute": "value",
        "reflect": false
      },
      "path": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates navigation item path"
        },
        "attribute": "path",
        "reflect": false
      },
      "nestedItem": {
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
          "text": "If `true`, the navigation item is nested item in list context, don't need to pass this prop, it pass automatically from Topbar component"
        },
        "attribute": "nested-item",
        "reflect": false,
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
          "text": "If `true`, the component has only icon menu with nested items"
        },
        "attribute": "menu",
        "reflect": true,
        "defaultValue": "false"
      },
      "extended": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the component has nested items"
        },
        "attribute": "extended",
        "reflect": true,
        "defaultValue": "false"
      },
      "chevronOnly": {
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
          "text": "If `true`, the component will render only a chevron icon without label."
        },
        "attribute": "chevron-only",
        "reflect": true,
        "defaultValue": "false"
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
  static get events() {
    return [{
        "method": "wppActiveNavItemChanged",
        "name": "wppActiveNavItemChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when navigation item was clicked"
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

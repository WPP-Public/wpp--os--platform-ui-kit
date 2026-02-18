import { Fragment, h, Host } from '@stencil/core';
import { truncate, uuidv4 } from '../../utils/utils';
/**
 * @part item-text - item text element
 * @part item-tooltip - item tooltip element
 * @part menu - menu context element
 * @part menu-item - menu item element
 * @part menu-item-label - menu item label text element
 * @part icon-more - icon more element
 * @part slash - slash element
 */
export class WppBreadcrumb {
  constructor() {
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
      return (h("wpp-tooltip-v3-5-0", { text: item.label, part: "item-tooltip", config: {
          onShow: () => {
            if (item.label.length < this.maxLabelLength)
              return false;
          },
        } }, h("span", { class: "active item", tabIndex: -1, part: "item-text" }, truncatedLabel)));
    }
    else if (item.label.length > this.maxLabelLength && !this.nativeLink) {
      return (h("wpp-tooltip-v3-5-0", { text: item.label, part: "item-tooltip" }, h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncatedLabel)));
    }
    else if (item.label.length > this.maxLabelLength) {
      return (h("wpp-tooltip-v3-5-0", { text: item.label, part: "item-tooltip" }, h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), tabIndex: 0, part: "item-text" }, truncatedLabel)));
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
      return (h("wpp-list-item-v3-5-0", { key: uuidv4(), class: "link", linkConfig: { href: item.path }, part: "menu-item" }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
    else {
      return (h("wpp-list-item-v3-5-0", { key: uuidv4(), class: "link", part: "menu-item", onClick: this.createRouteChangeTrigger(item) }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
  }
  render() {
    if (this.backBtnLabel) {
      return (h(Host, { class: this.hostCssClasses(), exportparts: "icon" }, h("button", { class: "back", onClick: this.handleBackClick, onKeyDown: this.handleBackKeyDown, type: "button", tabIndex: 0 }, h("wpp-icon-chevron-v3-5-0", { class: "back-icon-chevron", part: "icon", direction: "left", size: "s" }), h("span", { class: "back-label" }, this.backBtnLabel))));
    }
    if (!this.rootItem) {
      return;
    }
    return (h(Host, { class: this.hostCssClasses(), exportparts: "item-tooltip, item-text, menu-item, menu-item-label, slash, menu, icon-more, slash" }, this.createItemElement(this.rootItem), this.hiddenItems.length > 0 && (h(Fragment, null, h("div", { class: "slash", part: "slash" }, "/"), h("wpp-menu-context-v3-5-0", { key: this.hiddenItemsSnapshot, class: "menu", dropdownConfig: { triggerElementWidth: false, ...this.dropdownConfig }, tabIndex: 0, part: "menu" }, h("wpp-icon-more-v3-5-0", { class: "menu-trigger", direction: "horizontal", slot: "trigger-element", part: "icon-more" }), h("div", { key: this.hiddenItemsSnapshot }, this.hiddenItems.map(item => this.createMenuElement(item)))))), this.visibleItems.map((item, index, items) => (h(Fragment, null, h("div", { class: "slash", tabIndex: -1, part: "slash" }, "/"), this.createItemElement(item, index === items.length - 1))))));
  }
  static get is() { return "wpp-breadcrumb"; }
  static get registryIs() { return "wpp-breadcrumb-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-breadcrumb.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-breadcrumb.css"]
    };
  }
  static get properties() {
    return {
      "items": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "BreadcrumbItemState[]",
          "resolved": "BreadcrumbItemState[]",
          "references": {
            "BreadcrumbItemState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-breadcrumb/types.ts::BreadcrumbItemState"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines an array of breadcrumb items."
        },
        "defaultValue": "[]"
      },
      "maxLabelLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the maximum label length (in characters) of a single item."
        },
        "attribute": "max-label-length",
        "reflect": false,
        "defaultValue": "30"
      },
      "middleTruncation": {
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
          "text": "If the alternative truncation mode is enabled (items are truncated evenly with an ellipsis in the middle of the title)."
        },
        "attribute": "middle-truncation",
        "reflect": false,
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
          "text": "If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected."
        },
        "attribute": "native-link",
        "reflect": false,
        "defaultValue": "false"
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "backBtnLabel": {
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
          "text": "If provided, renders a back button with the specified label instead of the breadcrumb.\nIf undefined, renders the default breadcrumb."
        },
        "attribute": "back-btn-label",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when route changes, return object like { path: '/home', label: 'Home' }\nFor back variant, emits { path: 'back', label: backBtnLabel }"
        },
        "complexType": {
          "original": "BreadcrumbItemEventDetails",
          "resolved": "BreadcrumbItemEventDetails",
          "references": {
            "BreadcrumbItemEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-breadcrumb/types.ts::BreadcrumbItemEventDetails"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
}

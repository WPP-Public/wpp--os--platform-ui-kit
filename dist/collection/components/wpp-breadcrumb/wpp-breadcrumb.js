import { Fragment, h, Host } from '@stencil/core';
import { mergeLocales, truncate, uuidv4 } from '../../utils/utils';
import { DEFAULT_ICON_COLOR } from './consts';
import { LOCALES_DEFAULTS } from './const';
/**
 * @part item-text - item text element
 * @part item-tooltip - item tooltip element
 * @part menu - menu context element
 * @part menu-item - menu item element
 * @part menu-item-label - menu item label text element
 * @part icon-more - icon more element
 * @part separator - separator element
 */
export class WppBreadcrumb {
  constructor() {
    this.maxItems = 5;
    // Interactive items are reachable with Tab but carry no native activation behaviour of their own
    // (the non-native variant renders a `span`), so Enter/Space are wired up here to keep every
    // variant operable by keyboard (WCAG 2.1.1). An `a` already activates itself on Enter, so that
    // one case is left to the browser — synthesising a click there would navigate twice.
    this.handleItemKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      const target = event.currentTarget;
      if (target.tagName === 'A' && event.key === 'Enter')
        return;
      event.preventDefault();
      target.click();
    };
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
    this.ariaProps = undefined;
    this.locales = {};
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
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
      return (h("wpp-tooltip-v4-3-0", { text: item.label, part: "item-tooltip", config: {
          onShow: () => {
            if (item.label.length < this.maxLabelLength)
              return false;
          },
        } }, this.nativeLink ? (h("a", { href: item.path, class: "active item", tabIndex: -1, part: "item-text", "aria-current": "page" }, truncatedLabel)) : (h("span", { class: "active item", tabIndex: -1, part: "item-text" }, truncatedLabel))));
    }
    else if (item.label.length > this.maxLabelLength && !this.nativeLink) {
      return (h("wpp-tooltip-v4-3-0", { text: item.label, part: "item-tooltip" }, h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), onKeyDown: this.handleItemKeyDown, tabIndex: 0, role: "link", part: "item-text" }, truncatedLabel)));
    }
    else if (item.label.length > this.maxLabelLength) {
      return (h("wpp-tooltip-v4-3-0", { text: item.label, part: "item-tooltip" }, h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), onKeyDown: this.handleItemKeyDown, tabIndex: 0, part: "item-text" }, truncatedLabel)));
    }
    else if (!this.nativeLink) {
      return (h("span", { class: "item", onClick: this.createRouteChangeTrigger(item), onKeyDown: this.handleItemKeyDown, tabIndex: 0, role: "link", part: "item-text" }, item.label));
    }
    else {
      return (h("a", { href: item.path, class: "item", onClick: this.createRouteChangeTrigger(item), onKeyDown: this.handleItemKeyDown, part: "item-text" }, item.label));
    }
  }
  createMenuElement(item) {
    if (this.nativeLink) {
      return (h("wpp-list-item-v4-3-0", { key: uuidv4(), class: "link", linkConfig: { href: item.path }, part: "menu-item" }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
    else {
      // wpp-list-item emits wppChangeListItem for both a mouse click and a keyboard
      // (Enter/Space) selection, so binding the route change here — rather than to
      // onClick — makes the collapsed-items menu operable by keyboard too (WCAG 2.1.1),
      // through a single handler that behaves identically for mouse and keyboard.
      return (h("wpp-list-item-v4-3-0", { key: uuidv4(), class: "link", part: "menu-item", onWppChangeListItem: this.createRouteChangeTrigger(item) }, h("span", { slot: "label", part: "menu-item-label" }, item.label)));
    }
  }
  render() {
    if (this.backBtnLabel) {
      return (h(Host, { class: this.hostCssClasses(), exportparts: "icon" }, h("button", { class: "back", onClick: this.handleBackClick, onKeyDown: this.handleBackKeyDown, type: "button", tabIndex: 0 }, h("wpp-icon-chevron-v4-3-0", { class: "back-icon-chevron", part: "icon", direction: "left", size: "s" }), h("span", { class: "back-label" }, this.backBtnLabel))));
    }
    if (!this.rootItem) {
      return;
    }
    const navLabel = this.ariaProps?.navigation?.label ??
      (this.ariaProps?.navigation?.labelledby ? undefined : this._locales.navigationLabel);
    const navLabelledBy = this.ariaProps?.navigation?.labelledby;
    return (h(Host, { class: this.hostCssClasses(), role: "navigation", "aria-label": navLabel, "aria-labelledby": navLabelledBy, exportparts: "item-tooltip, item-text, menu-item, menu-item-label, separator, menu, icon-more" }, this.createItemElement(this.rootItem), this.hiddenItems.length > 0 && (h(Fragment, null, h("div", { class: "separator", part: "separator" }, h("wpp-icon-chevron-v4-3-0", { size: "s", color: DEFAULT_ICON_COLOR })), h("wpp-menu-context-v4-3-0", { key: this.hiddenItemsSnapshot, class: "menu", dropdownConfig: { triggerElementWidth: false, ...this.dropdownConfig }, part: "menu", ariaProps: { label: this._locales.showMoreLabel } }, h("wpp-icon-more-v4-3-0", { class: "menu-trigger", direction: "horizontal", slot: "trigger-element", part: "icon-more", tabIndex: 0, "aria-label": "Show more breadcrumb items" }), h("div", { key: this.hiddenItemsSnapshot }, this.hiddenItems.map(item => this.createMenuElement(item)))))), this.visibleItems.map((item, index, items) => (h(Fragment, null, h("div", { class: "separator", tabIndex: -1, part: "separator" }, h("wpp-icon-chevron-v4-3-0", { size: "s", color: DEFAULT_ICON_COLOR })), this.createItemElement(item, index === items.length - 1))))));
  }
  static get is() { return "wpp-breadcrumb"; }
  static get registryIs() { return "wpp-breadcrumb-v4-3-0"; }
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
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WppBreadcrumbAriaProps",
          "resolved": "undefined | { navigation?: Pick<AriaProps, \"label\" | \"labelledby\"> | undefined; }",
          "references": {
            "WppBreadcrumbAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-breadcrumb/types.ts::WppBreadcrumbAriaProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Grouped ARIA props for the breadcrumb navigation landmark: { label?, labelledby? }\nPrecedence: ariaProps > locales > defaults"
        }
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<BreadcrumbLocaleInterface>",
          "resolved": "undefined | { navigationLabel?: string | undefined; showMoreLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "BreadcrumbLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-breadcrumb/types.ts::BreadcrumbLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Locales for accessible strings (navigation landmark label and the collapsed-items menu label)."
        },
        "defaultValue": "{}"
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

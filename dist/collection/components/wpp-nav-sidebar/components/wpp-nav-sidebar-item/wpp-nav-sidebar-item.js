import { h, Host, Fragment } from '@stencil/core';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { getSlotEmptyStates, transformToVersionedTag, truncate } from '../../../../utils/utils';
import { tooltipConfig } from '../../config';
/**
 * @slot icon-start - May contain an icon that will be placed before the main content, e.g. a plus icon
 * @slot icon-end - May contain an icon that will be placed after the main content, e.g. a plus icon
 * @slot - Should contain `wpp-navigation-sidebar-item` if first level item need to have sub items. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part icon-chevron - icon chevron element
 * @part extended-item - extended item element
 * @part link-item - link item element
 * @part tooltip - tooltip wrapper content
 * @part title - title text element
 * @part divider - divider element
 */
export class WppNavSidebarItem {
  constructor() {
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        iconStart: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.iconStart;
    };
    this.handleClickLinkItem = (event) => {
      if (this.nativeLink)
        return;
      event.preventDefault();
      this.wppClickSidebarItem.emit({ label: this.label, path: this.path });
    };
    this.handleClickExpandedItem = () => {
      if (!this.extended)
        return;
      this.wppClickExpandedItem.emit({ label: this.label, path: this.path });
      this.expanded = !this.expanded;
    };
    this.navigationWrapperCssClasses = () => ({
      item: true,
      expanded: this.expanded,
      active: this.active,
      nested: this.nestedItem,
      'without-icon-start': !this.hasIconStartSlot,
    });
    this.labelCssClasses = () => ({
      label: true,
      open: true,
      'nested-label': this.nestedItem,
      'open-nested-label': this.nestedItem,
    });
    this.iconEndCssClasses = () => ({ 'icon-end-wrapper': true, 'icon-wrapper': true });
    this.subItemWrapperCssClasses = () => ({
      'sub-items-wrapper': true,
      expanded: this.expanded,
    });
    this.hostCssClasses = () => ({
      'wpp-nav-sidebar-item': true,
    });
    this.item = () => {
      const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems;
      const isNeedTruncate = this.label.length > currentMaxLengthLabel;
      return (h(Fragment, null, h(WrappedSlot, { name: "icon-start", wrapperClass: "icon-wrapper", class: "slot-icon-start-fallback", onSlotchange: this.updateSlotData }), h("p", { class: this.labelCssClasses(), part: "label" }, isNeedTruncate
        ? truncate(this.label, this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems)
        : this.label), h(WrappedSlot, { name: "icon-end", wrapperClass: this.iconEndCssClasses(), class: "slot-icon-end-fallback" }, this.extended && h("wpp-icon-chevron-v3-4-0", { class: "extended-icon", size: "m", part: "icon-chevron" }))));
    };
    this.extendedItem = () => (h("div", { class: this.navigationWrapperCssClasses(), onClick: this.handleClickExpandedItem, part: "extended-item" }, this.item()));
    this.linkItem = () => (h("a", { class: this.navigationWrapperCssClasses(), href: this.path, onClick: this.handleClickLinkItem, target: this.target, tabIndex: -1, part: "link-item" }, this.item()));
    this.renderSubItemsWrapper = () => h(WrappedSlot, { wrapperClass: this.subItemWrapperCssClasses() });
    this.renderItemWithTooltip = () => (h("wpp-tooltip-v3-4-0", { text: this.label, config: tooltipConfig, part: "tooltip" }, this.extended ? this.extendedItem() : this.linkItem()));
    this.renderItem = () => {
      const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems;
      const isNeedToTruncate = this.label.length > currentMaxLengthLabel;
      const isRenderItemWithTruncateTextWithTooltip = isNeedToTruncate;
      if (isRenderItemWithTruncateTextWithTooltip) {
        return (h(Fragment, null, this.renderItemWithTooltip(), this.renderSubItemsWrapper()));
      }
      return (h(Fragment, null, this.extended ? this.extendedItem() : this.linkItem(), this.renderSubItemsWrapper()));
    };
    this.hasIconStartSlot = false;
    this.expanded = false;
    this.extended = false;
    this.maxTitleLengthWithSubItems = 15;
    this.maxTitleLengthWithoutSubItems = 21;
    this.label = undefined;
    this.path = undefined;
    this.groupTitle = undefined;
    this.nestedItem = false;
    this.divide = false;
    this.active = false;
    this.nativeLink = undefined;
    this.target = undefined;
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  componentDidLoad() {
    this.host.querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('nested-item', `${true}`);
      item.setAttribute('tabIndex', String(this.expanded ? 0 : -1));
    });
  }
  handleExpandedChange(newValue) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('tabIndex', String(newValue ? 0 : -1));
    });
  }
  render() {
    let hostProps = {};
    if (!this.nestedItem) {
      hostProps = { ...hostProps, tabIndex: 0 };
    }
    return (h(Host, { class: this.hostCssClasses(), ...hostProps, exportparts: "label, icon-chevron, extended-item, link-item, tooltip, title, divider, icon-start, icon-end, ws-inner, icon-start, icon-end, ws-wrapper" }, this.groupTitle && (h("p", { class: "group-title", part: "title" }, this.groupTitle)), this.renderItem(), this.divide && h("wpp-divider-v3-4-0", { class: "slot-divider-fallback", part: "divider" })));
  }
  static get is() { return "wpp-nav-sidebar-item"; }
  static get registryIs() { return "wpp-nav-sidebar-item-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-nav-sidebar-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-nav-sidebar-item.css"]
    };
  }
  static get properties() {
    return {
      "expanded": {
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
          "text": "If `true`, navigation item expanded"
        },
        "attribute": "expanded",
        "reflect": true,
        "defaultValue": "false"
      },
      "extended": {
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
          "text": "If `true`, navigation item should have sub items"
        },
        "attribute": "extended",
        "reflect": true,
        "defaultValue": "false"
      },
      "maxTitleLengthWithSubItems": {
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
          "text": "Indicates max title length for item with sub items"
        },
        "attribute": "max-title-length-with-sub-items",
        "reflect": false,
        "defaultValue": "15"
      },
      "maxTitleLengthWithoutSubItems": {
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
          "text": "Indicates max title length for item without sub items"
        },
        "attribute": "max-title-length-without-sub-items",
        "reflect": false,
        "defaultValue": "21"
      },
      "label": {
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
          "text": "Indicates navigation item label"
        },
        "attribute": "label",
        "reflect": true
      },
      "path": {
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
          "text": "Indicates navigation item path"
        },
        "attribute": "path",
        "reflect": true
      },
      "groupTitle": {
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
          "text": "Indicates navigation item group title"
        },
        "attribute": "group-title",
        "reflect": true
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
          "text": "Indicates navigation item is sub items, this prop don't need to pass in item, it pass automaticly from Navigation sidebar component"
        },
        "attribute": "nested-item",
        "reflect": true,
        "defaultValue": "false"
      },
      "divide": {
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
          "text": "If `true`, show divide line in item"
        },
        "attribute": "divide",
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
          "text": "If `true`, item active"
        },
        "attribute": "active",
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
        "reflect": false
      },
      "target": {
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
          "text": "Specifies where to open the linked document.\nAllows all valid values for the native \"target\" attribute: _self, _blank, _parent, _top, etc.\n\n_self: The current browsing context. (Default)\n_blank: Usually a new tab, but users can configure browsers to open a new window instead.\n_parent: The parent browsing context of the current one. If no parent, behaves as _self.\n_top: The topmost browsing context. To be specific, this means the \"highest\" context that's an ancestor of the current one. If no ancestors, behaves as _self."
        },
        "attribute": "target",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClickSidebarItem",
        "name": "wppClickSidebarItem",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the item path changes, return object like { path: '/home', label: 'Home' }"
        },
        "complexType": {
          "original": "NavSidebarItemEventDetail",
          "resolved": "NavSidebarItemEventDetail",
          "references": {
            "NavSidebarItemEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-nav-sidebar/types.ts::NavSidebarItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppClickExpandedItem",
        "name": "wppClickExpandedItem",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": ""
        },
        "complexType": {
          "original": "NavSidebarItemEventDetail",
          "resolved": "NavSidebarItemEventDetail",
          "references": {
            "NavSidebarItemEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-nav-sidebar/types.ts::NavSidebarItemEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "handleExpandedChange"
      }];
  }
}

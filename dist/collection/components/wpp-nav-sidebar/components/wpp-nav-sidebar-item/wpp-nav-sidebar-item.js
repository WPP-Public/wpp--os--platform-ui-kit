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
      // Expanding or collapsing moves everything below this item, so a tooltip left open ends up
      // floating over content it does not describe. tippy's own `hideOnClick` cannot do this: the
      // toggle is a `role="button"` div, so Enter and Space never produce a click, and the `focus`
      // trigger keeps the tooltip up afterwards regardless. Dismissing on activation is an explicit
      // user action, so the tooltip stays WCAG 1.4.13-dismissable rather than being torn away.
      this.tooltipInstance?.hide();
      this.wppClickExpandedItem.emit({ label: this.label, path: this.path });
      this.expanded = !this.expanded;
    };
    // The group toggle is a `role="button"` control, so it must activate on both Enter and Space
    // (W3C ARIA APG disclosure pattern).
    this.handleExpandedItemKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClickExpandedItem();
      }
    };
    this.navigationWrapperCssClasses = () => ({
      item: true,
      expanded: this.expanded,
      // `active` is intentionally not emitted as a class: it would be captured at first render and
      // never cleared for externally-driven changes. The active highlight is driven entirely by the
      // reflected `[active]` host attribute in CSS instead.
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
    this.accessibleNameProps = () => (this.isLabelTruncated ? { 'aria-label': this.label } : {});
    this.item = () => (h(Fragment, null, h(WrappedSlot, { name: "icon-start", wrapperClass: "icon-wrapper", class: "slot-icon-start-fallback", onSlotchange: this.updateSlotData }), h("p", { class: this.labelCssClasses(), part: "label" }, this.isLabelTruncated ? truncate(this.label, this.maxLabelLength) : this.label), h(WrappedSlot, { name: "icon-end", wrapperClass: this.iconEndCssClasses(), class: "slot-icon-end-fallback" }, this.extended && h("wpp-icon-chevron-v4-4-0", { class: "extended-icon", size: "m", part: "icon-chevron", "aria-hidden": "true" }))));
    // The disclosure toggle for a group of sub-items (W3C ARIA APG): a keyboard-operable button
    // exposing its open state. DOM focus sits here rather than on the host, so assistive tech
    // announces a real control instead of a nameless custom element.
    this.extendedItem = () => (h("div", { class: this.navigationWrapperCssClasses(), role: "button", tabIndex: 0, "aria-expanded": this.expanded ? 'true' : 'false', ...this.accessibleNameProps(), onClick: this.handleClickExpandedItem, onKeyDown: this.handleExpandedItemKeyDown, part: "extended-item" }, this.item()));
    // The link itself is the tab stop: a focused native anchor activates on Enter and is announced
    // with its link semantics — the previous host-focus model left Enter dead (WCAG 2.1.1) and
    // nested a link inside a nameless focusable element. The active item is exposed on the link
    // via aria-current="page".
    this.linkItem = () => (h("a", { ref: el => (this.linkRef = el), class: this.navigationWrapperCssClasses(), href: this.path, onClick: this.handleClickLinkItem, target: this.target, "aria-current": this.active ? 'page' : undefined, ...this.accessibleNameProps(), part: "link-item" }, this.item()));
    // Collapsed sub-items are only visually hidden (max-height 0), so without `inert` their links
    // would stay in the tab order and the accessibility tree.
    this.renderSubItemsWrapper = () => (h("div", { class: this.subItemWrapperCssClasses(), part: "ws-wrapper", ...(!this.expanded ? { inert: true, 'aria-hidden': 'true' } : {}) }, h("slot", { part: "ws-inner" })));
    // `wpp-tooltip` spreads this straight into its tippy options, so `onCreate` hands us the
    // instance to dismiss on activation — the same way wpp-radio reaches its own tooltip.
    this.itemTooltipConfig = {
      ...tooltipConfig,
      onCreate: (instance) => {
        this.tooltipInstance = instance;
      },
    };
    this.renderItemWithTooltip = () => (h("wpp-tooltip-v4-4-0", { text: this.label, config: this.itemTooltipConfig, part: "tooltip" }, this.extended ? this.extendedItem() : this.linkItem()));
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
  handleActiveChange(isActive) {
    // Fires on the parent's runtime `active` updates regardless of the render cycle, so the
    // current-page indicator on the link tracks the selection.
    if (!this.linkRef)
      return;
    if (isActive) {
      this.linkRef.setAttribute('aria-current', 'page');
    }
    else {
      this.linkRef.removeAttribute('aria-current');
    }
  }
  componentDidLoad() {
    // Nested items no longer need host tabindex juggling: the tab stops are the real links and
    // toggle buttons inside each item, and a collapsed sub-items wrapper is `inert`, which takes
    // its content out of both the tab order and the accessibility tree.
    this.host.querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('nested-item', `${true}`);
    });
  }
  // The visible label is shortened to fit the rail. The full text still has to reach assistive
  // tech, so anything truncated gets an explicit name — otherwise the control is announced as the
  // clipped string, ellipsis and all (WCAG 4.1.2).
  get maxLabelLength() {
    return this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems;
  }
  get isLabelTruncated() {
    return this.label.length > this.maxLabelLength;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, icon-chevron, extended-item, link-item, tooltip, title, divider, icon-start, icon-end, ws-inner, icon-start, icon-end, ws-wrapper" }, this.groupTitle && (h("p", { class: "group-title", part: "title" }, this.groupTitle)), this.renderItem(), this.divide && h("wpp-divider-v4-4-0", { class: "slot-divider-fallback", part: "divider" })));
  }
  static get is() { return "wpp-nav-sidebar-item"; }
  static get registryIs() { return "wpp-nav-sidebar-item-v4-4-0"; }
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
        "propName": "active",
        "methodName": "handleActiveChange"
      }];
  }
}

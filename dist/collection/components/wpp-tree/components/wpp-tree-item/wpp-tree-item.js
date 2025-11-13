import { Host, h } from '@stencil/core';
import highlightWords from 'highlight-words';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { getSlotEmptyStates, transformToVersionedTag } from '../../../../utils/utils';
import { clickOnElementsWithHandlers, clickOnSwitcher } from './utils';
import { areAnyChildrenDisabled } from '../../utils';
export class WppTreeItem {
  constructor() {
    this.shouldRecalculateItemHeight = false;
    this.defaultItemHeight = '32px';
    this.itemHeight = null;
    this.getItemHeight = () => this.itemHeight || this.defaultItemHeight;
    this.addHeightToHost = (el) => {
      function traverse(node) {
        if (node.hidden === true)
          return 0;
        if (!node.open)
          return 1;
        let count = node.hidden === false || node.open ? 1 : 0;
        if (node.children) {
          for (const child of node.children) {
            count += traverse(child);
          }
        }
        return count;
      }
      const visibleItems = traverse(el);
      this.host.style.height = `${visibleItems * parseInt(this.getItemHeight())}px`;
    };
    this.updateParentHeight = (el) => {
      if (el.tagName !== transformToVersionedTag('wpp-tree-item').toUpperCase() && el.slot !== 'content') {
        return;
      }
      if (el.style.height.includes('px')) {
        el.style.height = 'auto';
        return;
      }
      if (el.parentElement) {
        this.updateParentHeight(el.parentElement);
      }
      return;
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
        end: '[slot="icon-end"]',
      });
      const hasMenuContext = !!this.host.querySelector('.wpp-menu-context');
      this.hasIconStartSlot = !emptyStates.start;
      this.hasIconEndSlot = !emptyStates.end;
      this.hasIconEndContextMenu = hasMenuContext;
    };
    this.handleMouseDown = () => {
      if (this.item.disabled)
        return;
      this.isMouseOnIconEnd = true;
    };
    this.handleMouseLeave = () => {
      this.isMouseOnIconEnd = false;
    };
    this.handleCheckboxClick = () => {
      if (this.item.children?.length) {
        const haveDisabledChildren = areAnyChildrenDisabled(this.item.children);
        if (this.item.indeterminate && haveDisabledChildren) {
          const nextState = { selected: false, indeterminate: false };
          return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
        }
        if (!this.item.selected && haveDisabledChildren) {
          const nextState = { selected: false, indeterminate: true };
          return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
        }
      }
      const nextState = this.item.indeterminate
        ? { selected: true, indeterminate: false }
        : { selected: !this.item.selected, indeterminate: false };
      this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
    };
    this.handleSwitcherClick = () => {
      if (this.item.disabled)
        return;
      if (!this.disableOpenCloseAnimation) {
        if (!this.itemHeight) {
          this.itemHeight = this.host.shadowRoot?.querySelector('.tree-item')?.clientHeight + 'px';
        }
        // We need to set proper height value in px before animation start
        if (!this.host.style.height || this.host.style.height === 'auto') {
          this.host.style.height = this.item.open ? `${this.host.scrollHeight}px` : this.getItemHeight();
        }
      }
      this.wppTreeItemOpenChange.emit({ ...this.item, open: !this.item.open });
    };
    this.handleItemClick = (e) => {
      if (this.item.disabled)
        return;
      if (clickOnElementsWithHandlers(e)) {
        return;
      }
      if (!clickOnSwitcher(e)) {
        if (this.item.children?.length)
          this.handleSwitcherClick();
      }
      if (!this.multiple && !this.item.isNotSelectable) {
        this.wppTreeItemSelectChange.emit({
          ...this.item,
          selected: !this.item.selected,
          ...(this.item.children?.length && { open: !this.item.open }),
        });
      }
    };
    this.handleTransitionEnd = () => {
      this.host.style.height = 'auto';
      this.isCollapseTransitionEnd = true;
    };
    this.calculateItemOffset = (level, isParent) => {
      const levelDifference = 20;
      const switcherOffset = 16;
      if (level === 1) {
        return isParent ? '0px' : `${levelDifference + switcherOffset}px`;
      }
      return isParent
        ? `${this.level * levelDifference - levelDifference}px`
        : `${this.level * levelDifference + switcherOffset}px`;
    };
    this.hostCssClasses = () => ({
      'wpp-tree-item': true,
      'wpp-hidden': !!this.item.hidden,
    });
    this.treeItemClasses = () => ({
      'tree-item': true,
      open: !!this.item.open,
      multiple: this.multiple,
      selected: !!this.item.selected,
      disabled: !!this.item.disabled,
      parent: !!this.item?.children?.length,
      'with-truncation': this.withItemsTruncation,
      'with-text-wrap': this.isTextWrappable,
    });
    this.titleClasses = () => ({
      title: true,
      disabled: !!this.item.disabled,
      'with-icon-end': this.hasIconEndContextMenu || this.hasIconEndSlot,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.iconEndCssClasses = () => ({
      'icon-end': true,
      'slot-hidden': !this.hasIconEndSlot,
      margin: this.hasIconEndContextMenu,
      disabled: !!this.item.disabled,
    });
    this.endContentCssClasses = (className) => ({
      'end-content': true,
      ...(className ? { [className]: true } : {}),
      disabled: !!this.item.disabled,
    });
    this.renderTitle = () => {
      const chunks = highlightWords({
        text: this.item.title,
        query: this.transformSearchQuery ? this.transformSearchQuery(this.search) : this.search,
        ...this.highlightOptions,
      });
      return (h("span", { "aria-label": this.item.title, class: this.titleClasses(), part: "tree-item-title-wrapper" }, this.disableSearchHighlight ? (h("span", { "aria-hidden": "true", part: "tree-item-title" }, this.item.title)) : (chunks.map(({ text, match, key }) => match ? (h("span", { "aria-hidden": "true", class: "highlight", key: key, part: "tree-item-title-highlighted" }, text)) : (h("span", { "aria-hidden": "true", key: key, part: "tree-item-title" }, text))))));
    };
    this.renderEndContent = () => {
      if (!this.endContent)
        return null;
      const { contentType, props } = this.endContent;
      const { className } = props;
      switch (contentType) {
        case 'text':
          return (h("wpp-typography-v3-3-1", { type: "s-body", tag: "span", ...props, class: this.endContentCssClasses(className), part: "tree-item-end-text" }, props?.text));
        case 'tag': {
          const { icon } = props;
          return (h("wpp-tag-v3-3-1", { ...props, class: this.endContentCssClasses(className), disabled: this.item.disabled, part: "tree-item-end-tag" }, icon &&
            h(transformToVersionedTag(icon), {
              slot: 'icon-start',
              part: 'icon-start',
            })));
        }
        case 'avatar':
          return (h("wpp-avatar-v3-3-1", { ...props, class: this.endContentCssClasses(className), size: "xs", part: "tree-item-end-avatar" }));
        case 'avatarGroup':
          return (h("wpp-avatar-group-v3-3-1", { ...props, class: this.endContentCssClasses(className), part: "tree-item-end-avatar-group" }));
        default:
          return null;
      }
    };
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.hasIconEndContextMenu = false;
    this.isMouseOnIconEnd = false;
    this.isCollapseTransitionEnd = true;
    this.isTextWrappable = false;
    this.text = undefined;
    this.multiple = false;
    this.search = undefined;
    this.item = undefined;
    this.level = 1;
    this.highlightOptions = undefined;
    this.transformSearchQuery = undefined;
    this.disableSearchHighlight = false;
    this.disableOpenCloseAnimation = false;
    this.withItemsTruncation = false;
    this.endContent = undefined;
  }
  onItemChange(next, prev) {
    if (prev.open !== next.open) {
      this.shouldRecalculateItemHeight = true;
    }
    if (prev.hidden !== next.hidden && next.hidden) {
      // When item is hidden, we need to update height of parent element
      this.updateParentHeight(this.host);
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      const title = this.host.shadowRoot.querySelector('.title');
      if (title) {
        this.isTextWrappable = title.scrollWidth > title.clientWidth;
      }
    }, 0);
  }
  componentDidUpdate() {
    if (this.shouldRecalculateItemHeight && !this.disableOpenCloseAnimation) {
      if (!this.item.open) {
        this.isCollapseTransitionEnd = false;
        this.host.style.height = this.getItemHeight();
      }
      else {
        // TODO: fix that approach. Currently 50 ms delay makes it possible to see animation open/close on filtering by search.
        // delay in 0 ms makes it work without animation. Possible solution: may be recalculated based on number of
        // open children in tree, but that will cost us some performance
        setTimeout(() => {
          this.addHeightToHost(this.item);
        }, 50);
      }
      this.shouldRecalculateItemHeight = false;
    }
  }
  render() {
    const isParent = !!this.item?.children?.length;
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-item,tree-item-switcher,tree-item-checkbox,tree-item-title-wrapper,tree-item-title,tree-item-title-highlighted,tree-item-action-button", role: "treeItem", ...(!this.disableOpenCloseAnimation && { onTransitionEnd: this.handleTransitionEnd }) }, h("div", { class: this.treeItemClasses(), style: { paddingLeft: this.calculateItemOffset(this.level, isParent) }, onClick: this.handleItemClick, part: "tree-item" }, isParent && (h("div", { class: "switcher", onClick: this.handleSwitcherClick, part: "tree-item-switcher" }, h("wpp-icon-triangle-fill-v3-3-1", { "data-open": this.item.open ? 'true' : 'false' }))), this.multiple && !this.item.isNotSelectable && (h("wpp-checkbox-v3-3-1", { class: "checkbox", indeterminate: this.item.indeterminate, checked: this.item.selected, controlled: true, onWppChange: this.handleCheckboxClick, disabled: this.item.disabled, part: "tree-item-checkbox" })), h(WrappedSlot, { name: "icon-start", onSlotchange: this.updateSlotData, wrapperClass: this.iconStartCssClasses() }), this.isTextWrappable && this.withItemsTruncation ? (h("wpp-tooltip-v3-3-1", { text: this.item.title, config: { placement: 'right' }, class: "tooltip" }, this.renderTitle())) : (this.renderTitle()), h("wpp-action-button-v3-3-1", { variant: "secondary", disabled: this.item.disabled, onMouseEnter: this.handleMouseDown, onMouseLeave: this.handleMouseLeave, class: this.iconEndCssClasses(), loading: this.item.loadingActions, part: "tree-item-action-button" }, h("slot", { name: "icon-end", onSlotchange: this.updateSlotData })), this.renderEndContent()), ((this.item.children && this.item.open) || !this.isCollapseTransitionEnd) && (h(WrappedSlot, { name: "content", onSlotchange: this.updateSlotData }))));
  }
  static get is() { return "wpp-tree-item"; }
  static get registryIs() { return "wpp-tree-item-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tree-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tree-item.css"]
    };
  }
  static get properties() {
    return {
      "text": {
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
          "text": "Indicates current item title"
        },
        "attribute": "text",
        "reflect": true
      },
      "multiple": {
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
          "text": "If 'true', it will be possible to have multiple selection"
        },
        "attribute": "multiple",
        "reflect": true,
        "defaultValue": "false"
      },
      "search": {
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
          "text": "Indicates search param"
        },
        "attribute": "search",
        "reflect": false
      },
      "item": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeType",
          "resolved": "TreeType",
          "references": {
            "TreeType": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TreeType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates current item props"
        }
      },
      "level": {
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
          "text": "Indicates deep level of tree"
        },
        "attribute": "level",
        "reflect": true,
        "defaultValue": "1"
      },
      "highlightOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeItemHighlightOptions",
          "resolved": "TreeItemHighlightOptions",
          "references": {
            "TreeItemHighlightOptions": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TreeItemHighlightOptions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates highlightOptions for text highlight after search"
        }
      },
      "transformSearchQuery": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TransformSearchQuery",
          "resolved": "((search: string) => string) | undefined",
          "references": {
            "TransformSearchQuery": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TransformSearchQuery"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Helper that transforms a search query to a custom string, which is then passed to the \"highlightWords\" library\nin order to match it to the provided tree item text. For example, \"cars!\" would be transformed to \"cars\""
        }
      },
      "disableSearchHighlight": {
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
          "text": "Defines words highlight in tree-item's title after search."
        },
        "attribute": "disable-search-highlight",
        "reflect": false,
        "defaultValue": "false"
      },
      "disableOpenCloseAnimation": {
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
          "text": "Defines animation for open/close wpp-tree-item."
        },
        "attribute": "disable-open-close-animation",
        "reflect": false,
        "defaultValue": "false"
      },
      "withItemsTruncation": {
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
          "text": "Defines truncation for wpp-tree-item"
        },
        "attribute": "with-items-truncation",
        "reflect": false,
        "defaultValue": "false"
      },
      "endContent": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeItemEndContentProps",
          "resolved": "TreeItemEndContentProps | undefined",
          "references": {
            "TreeItemEndContentProps": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TreeItemEndContentProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies the content to be displayed on the right side of the tree item.\nThe content can be one of the following types: `avatar`, `avatarGroup`, `tag`, or `text`.\nEach type supports its own set of properties, which are passed through the `TreeItemEndContentProps` interface.\n\nExample usage:\n- `avatar`: Display a single avatar, typically representing a user.\n- `avatarGroup`: Show multiple avatars grouped together.\n- `tag`: Render a status tag with customizable label and color.\n- `text`: Show a text label with optional tooltip."
        }
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {},
      "hasIconEndSlot": {},
      "hasIconEndContextMenu": {},
      "isMouseOnIconEnd": {},
      "isCollapseTransitionEnd": {},
      "isTextWrappable": {}
    };
  }
  static get events() {
    return [{
        "method": "wppTreeItemOpenChange",
        "name": "wppTreeItemOpenChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted updated item details"
        },
        "complexType": {
          "original": "TreeType",
          "resolved": "TreeType",
          "references": {
            "TreeType": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TreeType"
            }
          }
        }
      }, {
        "method": "wppTreeItemSelectChange",
        "name": "wppTreeItemSelectChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when updated item selectable state"
        },
        "complexType": {
          "original": "TreeType",
          "resolved": "TreeType",
          "references": {
            "TreeType": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tree/types.ts::TreeType"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "item",
        "methodName": "onItemChange"
      }];
  }
}

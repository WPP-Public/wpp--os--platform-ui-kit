import { Host, h } from '@stencil/core';
import highlightWords from 'highlight-words';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { getSlotEmptyStates, transformToVersionedTag } from '../../../../utils/utils';
import { clickOnElementsWithHandlers } from './utils';
import { areAnyChildrenDisabled } from '../../utils';
import { themeSubscriptionController } from '../../../../utils/subscribe-to-theme';
export class WppTreeItem {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.shouldRecalculateItemHeight = false;
    this.defaultItemHeight = '32px';
    this.itemHeight = null;
    this.lastSwitcherClickTs = 0;
    this.SWITCHER_CLICK_GUARD_MS = 80;
    this.getItemHeight = () => this.itemHeight || this.defaultItemHeight;
    // Measure actual content height to avoid clipping (rows/skeleton may vary)
    this.addHeightToHost = () => {
      const targetPx = `${this.host.scrollHeight}px`;
      this.host.style.height = targetPx;
    };
    // Release heights on ancestor wpp-tree-item hosts to avoid clipping
    this.releaseAncestorHeights = () => {
      let el = this.host.parentElement;
      const TAG = transformToVersionedTag('wpp-tree-item').toUpperCase();
      while (el) {
        if (el.tagName === TAG) {
          if (el.style.height && el.style.height.includes('px')) {
            el.style.height = 'auto';
          }
        }
        el = el.parentElement;
      }
    };
    // Stop bubbling so row click doesn’t also fire and toggle selection
    this.onSwitcherClick = (e) => {
      e.stopPropagation();
      this.lastSwitcherClickTs = typeof performance !== 'undefined' ? performance.now() : Date.now();
      this.handleSwitcherClick();
    };
    // was this click inside the switcher chevron area?
    this.isSwitcherTarget = (e) => {
      const path = (e.composedPath && e.composedPath()) || [];
      for (const el of path) {
        if (!el || !el.classList)
          continue;
        if (el.classList.contains('switcher'))
          return true;
      }
      return false;
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
      // If the chevron area was clicked, don’t toggle selection
      if (this.isSwitcherTarget(e)) {
        return;
      }
      if (!this.isSwitcherTarget(e)) {
        if (this.item.hasChildren || this.item.children?.length)
          this.handleSwitcherClick();
      }
      if (!this.multiple && !this.item.isNotSelectable) {
        this.wppTreeItemSelectChange.emit({
          ...this.item,
          selected: !this.item.selected,
          ...((this.item.hasChildren || this.item.children?.length) && { open: !this.item.open }),
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
      parent: !!this.item?.hasChildren || !!this.item?.children?.length,
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
          return (h("wpp-typography-v4-1-0", { type: "s-body", tag: "span", ...props, class: this.endContentCssClasses(className), part: "tree-item-end-text" }, props?.text));
        case 'tag': {
          const { icon } = props;
          return (h("wpp-tag-v4-1-0", { ...props, class: this.endContentCssClasses(className), disabled: this.item.disabled, part: "tree-item-end-tag" }, icon &&
            h(transformToVersionedTag(icon), {
              slot: 'icon-start',
              part: 'icon-start',
            })));
        }
        case 'avatar':
          return (h("wpp-avatar-v4-1-0", { ...props, class: this.endContentCssClasses(className), size: "xs", part: "tree-item-end-avatar",
            // Remove from tab order - tree uses arrow keys per ARIA APG
            index: -1 }));
        case 'avatarGroup':
          return (h("wpp-avatar-group-v4-1-0", { ...props, class: this.endContentCssClasses(className), part: "tree-item-end-avatar-group",
            // Remove avatars from tab order - tree uses arrow keys per ARIA APG
            avatarsIndex: -1 }));
        default:
          return null;
      }
    };
    /**
     * Get the appropriate selection attribute based on the mode
     * Per W3C APG: use aria-selected for single-select, aria-checked for multi-select
     */
    this.getSelectionAttribute = () => {
      if (this.item.isNotSelectable) {
        return {};
      }
      if (this.multiple) {
        // For multi-select trees with checkboxes, use aria-checked
        if (this.item.indeterminate) {
          return { 'aria-checked': 'mixed' };
        }
        return { 'aria-checked': this.item.selected ? 'true' : 'false' };
      }
      // For single-select trees, use aria-selected
      return { 'aria-selected': this.item.selected ? 'true' : 'false' };
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
    this.setSize = undefined;
    this.posInSet = undefined;
    this.isFocused = false;
    this.highlightOptions = undefined;
    this.transformSearchQuery = undefined;
    this.disableSearchHighlight = false;
    this.disableOpenCloseAnimation = false;
    this.withItemsTruncation = false;
    this.endContent = undefined;
  }
  onItemChange(next, prev) {
    const openChanged = prev.open !== next.open;
    const loadingChanged = prev.loadingChildren !== next.loadingChildren;
    const childrenChanged = (prev.children?.length || 0) !== (next.children?.length || 0);
    if (openChanged || loadingChanged || childrenChanged) {
      this.shouldRecalculateItemHeight = true;
      if (!this.disableOpenCloseAnimation) {
        // Release ancestor heights so parent containers can grow with this subtree change
        this.releaseAncestorHeights();
        if (next.open) {
          // While loading children, let the host grow with the skeleton/content
          if (next.loadingChildren) {
            this.host.style.height = 'auto';
          }
          else {
            // Expanding: set starting height, then animate to full height
            // This ensures animation works even when multiple items expand at once
            if (!this.host.style.height || this.host.style.height === 'auto') {
              this.host.style.height = this.getItemHeight();
            }
            // Use double rAF to ensure children are rendered before measuring
            requestAnimationFrame(() => {
              requestAnimationFrame(() => this.addHeightToHost());
            });
          }
        }
        else {
          // Collapsing: first set current expanded height, then animate to collapsed
          this.isCollapseTransitionEnd = false;
          // Capture current height as starting point for animation
          if (!this.host.style.height || this.host.style.height === 'auto') {
            this.host.style.height = `${this.host.scrollHeight}px`;
          }
          // Next frame: set target collapsed height to trigger CSS transition
          requestAnimationFrame(() => {
            this.host.style.height = this.getItemHeight();
          });
        }
      }
    }
    if (prev.hidden !== next.hidden && next.hidden) {
      // When item is hidden, we need to update height of parent element
      this.updateParentHeight(this.host);
    }
  }
  componentDidLoad() {
    this.titleMeasureTimeout = window.setTimeout(() => {
      if (!this.host?.isConnected)
        return;
      const title = this.host.shadowRoot?.querySelector('.title');
      if (title) {
        this.isTextWrappable = title.scrollWidth > title.clientWidth;
      }
    }, 0);
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.titleMeasureTimeout != null) {
      clearTimeout(this.titleMeasureTimeout);
      this.titleMeasureTimeout = undefined;
    }
  }
  componentDidUpdate() {
    if (this.shouldRecalculateItemHeight && !this.disableOpenCloseAnimation) {
      // Ensure ancestors are not constraining height after this update
      this.releaseAncestorHeights();
      if (this.item.open && this.item.loadingChildren) {
        this.host.style.height = 'auto';
      }
      else if (!this.item.open) {
        // Collapsing: capture current height, then animate to collapsed
        this.isCollapseTransitionEnd = false;
        if (!this.host.style.height || this.host.style.height === 'auto') {
          this.host.style.height = `${this.host.scrollHeight}px`;
        }
        requestAnimationFrame(() => {
          this.host.style.height = this.getItemHeight();
        });
      }
      else {
        // Expanding: set starting height, then animate to full
        if (!this.host.style.height || this.host.style.height === 'auto') {
          this.host.style.height = this.getItemHeight();
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.addHeightToHost());
        });
      }
      this.shouldRecalculateItemHeight = false;
    }
  }
  render() {
    const isParent = !!this.item?.hasChildren || !!this.item?.children?.length;
    const selectionAttr = this.getSelectionAttribute();
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-item,tree-item-switcher,tree-item-checkbox,tree-item-title-wrapper,tree-item-title,tree-item-title-highlighted,tree-item-action-button", role: "treeitem", "aria-label": this.item.title, "aria-level": this.level, "aria-setsize": this.setSize, "aria-posinset": this.posInSet, "aria-expanded": isParent ? (this.item.open ? 'true' : 'false') : undefined, "aria-disabled": this.item.disabled ? 'true' : undefined, "aria-busy": this.item.loadingChildren ? 'true' : undefined, ...selectionAttr, ...(!this.disableOpenCloseAnimation && { onTransitionEnd: this.handleTransitionEnd }) }, h("div", { class: this.treeItemClasses(), style: { paddingLeft: this.calculateItemOffset(this.level, isParent) }, onClick: this.handleItemClick, part: "tree-item" }, isParent && (h("div", { class: "switcher", onClick: this.onSwitcherClick, part: "tree-item-switcher", "data-switcher": "true", "aria-hidden": "true" }, h("wpp-icon-triangle-fill-v4-1-0", { "data-open": this.item.open ? 'true' : 'false' }))), this.multiple && !this.item.isNotSelectable && (h("wpp-checkbox-v4-1-0", { class: "checkbox", indeterminate: this.item.indeterminate, checked: this.item.selected, controlled: true, onWppChange: this.handleCheckboxClick, disabled: this.item.disabled, part: "tree-item-checkbox", "aria-hidden": "true", index: -1 })), h(WrappedSlot, { name: "icon-start", onSlotchange: this.updateSlotData, wrapperClass: this.iconStartCssClasses() }), this.isTextWrappable && this.withItemsTruncation ? (h("wpp-tooltip-v4-1-0", { text: this.item.title, config: { placement: 'right' }, class: "tooltip", anchorTabIndex: -1 }, this.renderTitle())) : (this.renderTitle()), h("wpp-action-button-v4-1-0", { variant: "secondary", disabled: this.item.disabled || this.item.loadingChildren, onMouseEnter: this.handleMouseDown, onMouseLeave: this.handleMouseLeave, class: this.iconEndCssClasses(), loading: this.item.loadingActions, part: "tree-item-action-button", ariaProps: {
        label: this.hasIconEndSlot ? `Actions for ${this.item.title}` : undefined,
        // tabIndex=-1 removes from sequential Tab order; tree handles Tab navigation
        // per W3C ARIA APG Treeview: Tab from tree container moves focus here programmatically
        tabIndex: -1,
      }, "aria-hidden": !this.hasIconEndSlot ? 'true' : undefined }, h("slot", { name: "icon-end", onSlotchange: this.updateSlotData })), this.renderEndContent()), ((this.item.open &&
      (this.item.loadingChildren || (Array.isArray(this.item.children) && this.item.children.length > 0))) ||
      !this.isCollapseTransitionEnd) && h(WrappedSlot, { name: "content", onSlotchange: this.updateSlotData })));
  }
  static get is() { return "wpp-tree-item"; }
  static get registryIs() { return "wpp-tree-item-v4-1-0"; }
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
      "setSize": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Total number of siblings at this level (for aria-setsize)"
        },
        "attribute": "set-size",
        "reflect": true
      },
      "posInSet": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Position within the set of siblings (for aria-posinset)"
        },
        "attribute": "pos-in-set",
        "reflect": true
      },
      "isFocused": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Whether this item is currently focused"
        },
        "attribute": "is-focused",
        "reflect": true,
        "defaultValue": "false"
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

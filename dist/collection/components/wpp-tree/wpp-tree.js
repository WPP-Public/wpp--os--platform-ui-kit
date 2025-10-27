import { h, Host } from '@stencil/core';
import { debounce, transformToVersionedTag, uuidv4 } from '../../utils/utils';
import { findSelectedItems, isHaveFoundChildren, markChildrenAs, recalculateIndeterminateTreeState, convertToOriginalItems, updateTreeById, updateTreeByIds, extractExtraProps, } from './utils';
import { LOCALES_DEFAULTS } from './const';
export class WppTree {
  constructor() {
    this.resizeInProgress = false;
    this._locales = LOCALES_DEFAULTS;
    this.toggleItemSelection = (toggleFunction, reason) => {
      // Get the IDs of all first-level items in the tree.
      const allItemsIDs = this.currentTreeData.map(item => item.id);
      const finalTree = recalculateIndeterminateTreeState(updateTreeByIds(this.currentTreeData, allItemsIDs, toggleFunction));
      this.wppChange.emit({
        treeState: finalTree,
        selectedItems: findSelectedItems(finalTree),
        selectedOriginalItems: convertToOriginalItems(findSelectedItems(finalTree)),
        reason,
      });
    };
    this.isSearchResultFound = true;
    this.isMatchSearch = (item, search) => {
      if (this.searchConfig?.isMatchingSearch)
        return this.searchConfig?.isMatchingSearch(item, search);
      if (this.searchConfig?.isMatchSearch)
        return this.searchConfig.isMatchSearch(item.title, search);
      const titleTerm = item.title.toLowerCase().split(' ').filter(Boolean);
      const searchTerm = search.toLowerCase().split(' ').filter(Boolean);
      return titleTerm.some(substr => searchTerm.some(search => substr.includes(search)));
    };
    this.multipleSelectionUpdate = (tree, item) => {
      const { id, selected, children, indeterminate } = item;
      let updatedTree;
      if (children?.length && (selected || indeterminate)) {
        updatedTree = updateTreeById(tree, id, {
          children: markChildrenAs(children, ({ disabled }) => ({ ...(!disabled && { selected: true }) })),
        });
      }
      if (children?.length && !selected && !indeterminate) {
        updatedTree = updateTreeById(tree, id, {
          children: markChildrenAs(children, () => ({ selected: false })),
        });
      }
      const treeState = recalculateIndeterminateTreeState(updatedTree || tree);
      const selectedItems = findSelectedItems(treeState);
      this.wppChange.emit({
        treeState,
        currentItem: item,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'select',
      });
    };
    this.singleSelectionUpdate = (tree, item) => {
      const { id, selected } = item;
      let treeWithUnselectedPreviousItem;
      const updatedTree = updateTreeById(tree, id, {
        selected,
      });
      if (selected) {
        treeWithUnselectedPreviousItem = updateTreeById(updatedTree, this.selectedIds[0], {
          selected: false,
        });
        this.selectedIds = [id];
      }
      else {
        this.selectedIds = [];
      }
      const treeState = treeWithUnselectedPreviousItem || updatedTree;
      const selectedItems = findSelectedItems(treeState);
      this.wppChange.emit({
        treeState,
        currentItem: item,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'select',
      });
    };
    this.updateTreeWithSearch = (tree, search) => tree.map((item) => {
      const isMatch = this.isMatchSearch(item, search);
      if (!this.isSearchResultFound && isMatch)
        this.isSearchResultFound = true;
      if (item.children?.length) {
        // If found parent item has match, we don't need to recursive call this.updateTreeWithSearch function anymore.
        // Instead we should mark all of his children as visible( hidden: false)
        // and if some children items has match - mark their parents as open.
        if (isMatch) {
          const haveMatchedChildrenHost = isHaveFoundChildren(item.children, search, this.isMatchSearch);
          const children = markChildrenAs(item.children, item => {
            if (item.children?.length) {
              const haveMatchedChildren = isHaveFoundChildren(item.children, search, this.isMatchSearch);
              return { hidden: false, open: haveMatchedChildren };
            }
            return { hidden: false };
          });
          return { ...item, children, open: haveMatchedChildrenHost, hidden: false };
        }
        const haveMatchedChildren = isHaveFoundChildren(item.children, search, this.isMatchSearch);
        const children = this.updateTreeWithSearch(item.children, search);
        return {
          ...item,
          children,
          open: haveMatchedChildren,
          hidden: !haveMatchedChildren && !isMatch,
        };
      }
      else {
        return { ...item, hidden: !isMatch };
      }
    });
    this.checkData = (treeData) => {
      if (!this.multiple) {
        if (findSelectedItems(treeData).length > 1) {
          throw new Error('Several selected items found in provided data. There is could be only one selected item in single mode, otherwise, use multiple mode.');
        }
        if (this.defaultSelectedIds.length > 1) {
          throw new Error('Several items found in provided defaultSelectedIds prop. There is could be only one selected item in single mode, otherwise, use multiple mode. ');
        }
      }
      return treeData;
    };
    this.hostCssClasses = () => ({
      'wpp-tree': true,
    });
    this.renderIconsList = (item, icons, place = 'end') => (h("div", { slot: `icon-${place}`, key: uuidv4() }, h("wpp-menu-context-v3-3-0", { dropdownConfig: {
        trigger: 'click',
        interactiveDebounce: 15,
        interactiveBorder: 25,
        offset: [0, 0],
      } }, h("wpp-icon-more-v3-3-0", { class: {
        'menu-trigger': true,
        disabled: !!item.disabled,
      }, style: { padding: '4px', color: 'var(--wpp-grey-color-800)' }, direction: "horizontal", slot: "trigger-element" }), h("div", null, icons.map(({ icon, name }) => (h("wpp-list-item-v3-3-0", { key: name, value: name, onClick: this.handleActionClick({ item, name, place }) }, h(transformToVersionedTag(icon), { slot: 'left' }), h("span", { slot: "label" }, name))))))));
    this.renderTree = (treeData, level = 1) => treeData.map(item => {
      const extraProps = extractExtraProps(item);
      if (item.children) {
        return (h("wpp-tree-item-v3-3-0", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
          h(transformToVersionedTag(item.iconStart.icon), {
            slot: 'icon-start',
            part: 'icon-start',
            onclick: this.handleActionClick({ item, name: item.iconStart.name, place: 'start' }),
          }), item.iconsStart && this.renderIconsList(item, item.iconsStart, 'start'), item.iconsEnd && this.renderIconsList(item, item.iconsEnd), !item.iconsEnd &&
          item.iconEnd?.icon &&
          h(transformToVersionedTag(item.iconEnd.icon), {
            slot: 'icon-end',
            part: 'icon-end',
            onclick: this.handleActionClick({ item, name: item.iconEnd.name, place: 'end' }),
          }), h("div", { slot: "content", class: "content-container", part: "content" }, item.open && this.renderTree(item.children, level + 1))));
      }
      return (h("wpp-tree-item-v3-3-0", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
        h(transformToVersionedTag(item.iconStart.icon), {
          slot: 'icon-start',
          part: 'icon-start',
          onclick: this.handleActionClick({ item, name: item.iconStart.name, place: 'start' }),
        }), item.iconsStart && this.renderIconsList(item, item.iconsStart, 'start'), item.iconsEnd && this.renderIconsList(item, item.iconsEnd), !item.iconsEnd &&
        item.iconEnd?.icon &&
        h(transformToVersionedTag(item.iconEnd.icon), {
          slot: 'icon-end',
          part: 'icon-end',
          onclick: this.handleActionClick({ item, name: item.iconEnd.name, place: 'end' }),
        })));
    });
    this.renderSkeletonLoading = () => [...Array(this.skeletonNumberItems)].map(_ => (h("div", { class: "skeleton-item" }, h("wpp-skeleton-v3-3-0", { variant: "rectangle", width: "100%", animation: true }))));
    this.currentTreeData = undefined;
    this.selectedIds = [];
    this.data = undefined;
    this.search = '';
    this.multiple = false;
    this.defaultSelectedIds = [];
    this.locales = {};
    this.searchConfig = {
      isMatchSearch: undefined,
      highlightOptions: {},
      transformSearchQuery: undefined,
      isMatchingSearch: undefined,
    };
    this.disableSearchHighlight = false;
    this.disableOpenCloseAnimation = false;
    this.withItemsTruncation = false;
    this.loading = false;
    this.skeletonNumberItems = 5;
  }
  onInputChange(searchText) {
    if (!searchText.trim()) {
      const treeState = this.currentTreeData.map(item => ({
        ...item,
        hidden: false,
        open: false,
        ...(item.children?.length && {
          children: markChildrenAs(item.children, item => ({
            hidden: false,
            ...(item.children?.length && { open: false }),
          })),
        }),
      }));
      this.isSearchResultFound = true;
      const selectedItems = findSelectedItems(treeState);
      this.wppChange.emit({
        treeState,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'search',
      });
      return;
    }
    this.isSearchResultFound = false;
    const treeState = this.updateTreeWithSearch(this.currentTreeData, searchText);
    const selectedItems = findSelectedItems(treeState);
    this.wppChange.emit({
      treeState,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'search',
    });
  }
  updateDate(newData) {
    this.currentTreeData = newData;
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  handleOpenItem(event) {
    event.stopPropagation();
    const item = event.detail;
    const treeState = updateTreeById(this.currentTreeData, item.id, item);
    const selectedItems = findSelectedItems(treeState);
    this.wppChange.emit({
      treeState,
      currentItem: item,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'open',
    });
  }
  handleSelectedItem(event) {
    event.stopPropagation();
    const newItemState = event.detail;
    const updatedTreeWithCurrentItem = updateTreeById(this.currentTreeData, newItemState.id, newItemState);
    if (this.multiple) {
      this.multipleSelectionUpdate(updatedTreeWithCurrentItem, newItemState);
    }
    else {
      this.singleSelectionUpdate(updatedTreeWithCurrentItem, newItemState);
    }
  }
  async recalculateTreeWidth() {
    if (this.host) {
      const contentRect = this.host.getBoundingClientRect();
      this.host.style.setProperty('--wpp-tree-item-width', `${contentRect.width - 8}px`);
    }
  }
  async selectAll() {
    if (!this.multiple)
      return;
    this.toggleItemSelection(({ isNotSelectable, disabled }) => ({
      ...(!isNotSelectable && !disabled && { selected: true }),
    }), 'select');
  }
  async clearAll() {
    if (!this.multiple)
      return;
    this.toggleItemSelection(() => ({
      selected: false,
      indeterminate: false,
    }), 'clear');
  }
  componentDidLoad() {
    // NOTE: defaultSelectedIds should be provided only when default selection logic is applied. Recalculating tree state
    // here may break your custom selection logic
    if (this.defaultSelectedIds.length > 0) {
      this.currentTreeData = recalculateIndeterminateTreeState(updateTreeByIds(this.currentTreeData, this.defaultSelectedIds, ({ isNotSelectable, disabled }) => ({
        ...(!isNotSelectable && !disabled && { selected: true }),
      })));
    }
    if (this.disableOpenCloseAnimation) {
      this.host.style.setProperty('--wpp-tree-item-switcher-transition-duration', '50ms');
    }
    this.resizeObserver = new ResizeObserver(debounce(entries => {
      if (this.resizeInProgress)
        return;
      try {
        this.resizeInProgress = true;
        for (const entry of entries) {
          if (entry.target === this.host.parentElement) {
            this.host.style.setProperty('--wpp-tree-item-width', `${entry.contentRect.width - 8}px`);
          }
        }
      }
      catch (error) {
        console.error('Error in ResizeObserver callback:', error);
      }
      finally {
        this.resizeInProgress = false;
      }
    }, 50));
    if (this.host.parentElement && this.resizeObserver) {
      this.resizeObserver.observe(this.host.parentElement);
    }
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  handleActionClick({ item, name, place, }) {
    return (event) => {
      event.stopPropagation();
      if (!item.loadingActions) {
        this.wppActionClick.emit({
          id: item.id,
          item,
          name,
          place,
        });
      }
    };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.currentTreeData = this.checkData(this.data);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-container, tree-empty-text" }, !this.loading && (h("div", { class: "container", part: "tree-container" }, this.currentTreeData && this.isSearchResultFound ? (this.renderTree(this.currentTreeData)) : (h("p", { class: "empty-tree-text", part: "tree-empty-text" }, this._locales.nothingFound)))), this.loading && h("div", { class: "skeleton-wrapper" }, this.renderSkeletonLoading())));
  }
  static get is() { return "wpp-tree"; }
  static get registryIs() { return "wpp-tree-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tree.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tree.css"]
    };
  }
  static get properties() {
    return {
      "data": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeType[]",
          "resolved": "TreeType[]",
          "references": {
            "TreeType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeType"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the tree data."
        }
      },
      "search": {
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
          "text": "Indicates search value"
        },
        "attribute": "search",
        "reflect": false,
        "defaultValue": "''"
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
          "text": "If several items could be selected."
        },
        "attribute": "multiple",
        "reflect": true,
        "defaultValue": "false"
      },
      "defaultSelectedIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "(string | number)[]",
          "resolved": "(string | number)[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Default selected ids list"
        },
        "defaultValue": "[]"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<TreeLocaleType>",
          "resolved": "{ nothingFound?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "TreeLocaleType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeLocaleType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      },
      "searchConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeItemSearchConfig",
          "resolved": "TreeItemSearchConfig",
          "references": {
            "TreeItemSearchConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeItemSearchConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types.\nNote: \"isMatchSearch\" is deprecated, use \"isMatchingSearch\" instead, which uses\nthe tree-item object."
        },
        "defaultValue": "{\n    isMatchSearch: undefined,\n    highlightOptions: {},\n    transformSearchQuery: undefined,\n    isMatchingSearch: undefined,\n  }"
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
      "loading": {
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
          "text": "Defines loading state"
        },
        "attribute": "loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "skeletonNumberItems": {
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
          "text": "Defines number of loading skeleton items"
        },
        "attribute": "skeleton-number-items",
        "reflect": false,
        "defaultValue": "5"
      }
    };
  }
  static get states() {
    return {
      "currentTreeData": {},
      "selectedIds": {}
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
          "text": "Emitted when tree have changed it's state"
        },
        "complexType": {
          "original": "TreeChangeEventDetail",
          "resolved": "{ treeState: TreeType[]; currentItem?: TreeType | undefined; selectedItems?: (TreeType | null)[] | undefined; selectedOriginalItems?: Partial<TreeType>[] | undefined; reason: \"clear\" | \"search\" | \"select\" | \"open\"; }",
          "references": {
            "TreeChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppActionClick",
        "name": "wppActionClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when click on item actions(icons) was occurred"
        },
        "complexType": {
          "original": "TreeActionClickEventDetail",
          "resolved": "{ id: string | number; name: string; item: TreeType; place: \"start\" | \"end\"; }",
          "references": {
            "TreeActionClickEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeActionClickEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "recalculateTreeWidth": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "selectAll": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "clearAll": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "search",
        "methodName": "onInputChange"
      }, {
        "propName": "data",
        "methodName": "updateDate"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppTreeItemOpenChange",
        "method": "handleOpenItem",
        "target": undefined,
        "capture": true,
        "passive": false
      }, {
        "name": "wppTreeItemSelectChange",
        "method": "handleSelectedItem",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}

import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag, u as uuidv4, d as debounce } from './utils-b49ad9c8.js';
import { L as LOCALES_DEFAULTS, r as recalculateIndeterminateTreeState, u as updateTreeByIds, f as findSelectedItems, c as convertToOriginalItems, a as updateTreeById, m as markChildrenAs, i as isHaveFoundChildren, e as extractExtraProps } from './utils-f066e4cf.js';
import './consts-5bf9c29f.js';

const wppTreeCss = ":host{--tree-item-padding:var(--wpp-tree-item-padding, 6px 4px 0 4px);--tree-container-width:var(--wpp-tree-container-width, 100%);--tree-container-height:var(--wpp-tree-container-height, 100%);--tree-container-bg-color:var(--wpp-tree-container-bg-color, var(--wpp-grey-color-000));--tree-input-trigger-area:var(--wpp-tree-trigger-area, 32px);--tree-item-icon-end-color:var(--wpp-tree-icon-end-color, var(--wpp-grey-color-800));--tree-skeleton-height:var(--wpp-tree-skeleton-height, 22px);--tree-skeleton-padding:var(--wpp-tree-skeleton-padding, 3px 0 3px 36px);--tree-skeleton-width:var(--wpp-tree-skeleton-width, 100%);display:-ms-flexbox;display:flex;padding:var(--tree-item-padding)}.container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;overflow:hidden}.content-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;-webkit-transition:height 500ms ease;transition:height 500ms ease}.skeleton-wrapper{width:var(--tree-skeleton-width)}.skeleton-wrapper .skeleton-item{padding:var(--tree-skeleton-padding)}.skeleton-wrapper .wpp-skeleton{--skeleton-height:var(--tree-skeleton-height)}.empty-tree-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);margin:0;text-align:center}";

const WppTree = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppActionClick = createEvent(this, "wppActionClick", 1);
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
    this.renderIconsList = (item, icons, place = 'end') => (h("div", { slot: `icon-${place}`, key: uuidv4() }, h("wpp-menu-context-v3-3-1", { dropdownConfig: {
        trigger: 'click',
        interactiveDebounce: 15,
        interactiveBorder: 25,
        offset: [0, 0],
      } }, h("wpp-icon-more-v3-3-1", { class: {
        'menu-trigger': true,
        disabled: !!item.disabled,
      }, style: { padding: '4px', color: 'var(--wpp-grey-color-800)' }, direction: "horizontal", slot: "trigger-element" }), h("div", null, icons.map(({ icon, name }) => (h("wpp-list-item-v3-3-1", { key: name, value: name, onClick: this.handleActionClick({ item, name, place }) }, h(transformToVersionedTag(icon), { slot: 'left' }), h("span", { slot: "label" }, name))))))));
    this.renderTree = (treeData, level = 1) => treeData.map(item => {
      const extraProps = extractExtraProps(item);
      if (item.children) {
        return (h("wpp-tree-item-v3-3-1", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
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
      return (h("wpp-tree-item-v3-3-1", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
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
    this.renderSkeletonLoading = () => [...Array(this.skeletonNumberItems)].map(_ => (h("div", { class: "skeleton-item" }, h("wpp-skeleton-v3-3-1", { variant: "rectangle", width: "100%", animation: true }))));
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
  static get registryIs() { return "wpp-tree-v3-3-1"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "search": ["onInputChange"],
    "data": ["updateDate"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppTree.style = wppTreeCss;

export { WppTree as wpp_tree };

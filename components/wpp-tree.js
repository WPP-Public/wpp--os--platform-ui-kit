import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { u as uuidv4, k as transformToVersionedTag, d as debounce } from './utils.js';
import { L as LOCALES_DEFAULTS, r as recalculateIndeterminateTreeState, u as updateTreeByIds, f as findSelectedItems, c as convertToOriginalItems, a as updateTreeById, m as markChildrenAs, i as isHaveFoundChildren, e as extractExtraProps, d as defineCustomElement$3 } from './wpp-tree-item2.js';
import { d as defineCustomElement$r } from './wpp-action-button2.js';
import { d as defineCustomElement$q } from './wpp-avatar2.js';
import { d as defineCustomElement$p } from './wpp-avatar-group2.js';
import { d as defineCustomElement$o } from './wpp-checkbox2.js';
import { d as defineCustomElement$n } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$m } from './wpp-icon-cross2.js';
import { d as defineCustomElement$l } from './wpp-icon-dash2.js';
import { d as defineCustomElement$k } from './wpp-icon-error2.js';
import { d as defineCustomElement$j } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$i } from './wpp-icon-more2.js';
import { d as defineCustomElement$h } from './wpp-icon-success2.js';
import { d as defineCustomElement$g } from './wpp-icon-tick2.js';
import { d as defineCustomElement$f } from './wpp-icon-triangle-fill2.js';
import { d as defineCustomElement$e } from './wpp-icon-warning2.js';
import { d as defineCustomElement$d } from './wpp-inline-message2.js';
import { d as defineCustomElement$c } from './wpp-internal-label2.js';
import { d as defineCustomElement$b } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$a } from './wpp-label2.js';
import { d as defineCustomElement$9 } from './wpp-list-item2.js';
import { d as defineCustomElement$8 } from './wpp-menu-context2.js';
import { d as defineCustomElement$7 } from './wpp-skeleton2.js';
import { d as defineCustomElement$6 } from './wpp-spinner2.js';
import { d as defineCustomElement$5 } from './wpp-tag2.js';
import { d as defineCustomElement$4 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppTreeCss = ":host{--tree-item-padding:var(--wpp-tree-item-padding, 6px 4px 0 4px);--tree-container-width:var(--wpp-tree-container-width, 100%);--tree-container-height:var(--wpp-tree-container-height, 100%);--tree-container-bg-color:var(--wpp-tree-container-bg-color, var(--wpp-grey-color-000));--tree-input-trigger-area:var(--wpp-tree-trigger-area, 32px);--tree-item-icon-end-color:var(--wpp-tree-icon-end-color, var(--wpp-grey-color-800));--tree-skeleton-height:var(--wpp-tree-skeleton-height, 22px);--tree-skeleton-padding:var(--wpp-tree-skeleton-padding, 3px 0 3px 36px);--tree-skeleton-width:var(--wpp-tree-skeleton-width, 100%);display:-ms-flexbox;display:flex;padding:var(--tree-item-padding)}.container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;overflow:hidden}.content-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;-webkit-transition:height 500ms ease;transition:height 500ms ease}.skeleton-wrapper{width:var(--tree-skeleton-width)}.skeleton-wrapper .skeleton-item{padding:var(--tree-skeleton-padding)}.skeleton-wrapper .wpp-skeleton{--skeleton-height:var(--tree-skeleton-height)}.empty-tree-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);margin:0;text-align:center}";

const WppTree$1 = /*@__PURE__*/ proxyCustomElement(class WppTree extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppActionClick = createEvent(this, "wppActionClick", 1);
    this.resizeInProgress = false;
    this._locales = LOCALES_DEFAULTS;
    this.pendingLoads = new Set();
    this.isSearchResultFound = true;
    this.toggleItemSelection = (toggleFunction, reason) => {
      const allItemsIDs = this.currentTreeData.map(item => item.id);
      const finalTree = recalculateIndeterminateTreeState(updateTreeByIds(this.currentTreeData, allItemsIDs, toggleFunction));
      this.wppChange.emit({
        treeState: finalTree,
        selectedItems: findSelectedItems(finalTree),
        selectedOriginalItems: convertToOriginalItems(findSelectedItems(finalTree)),
        reason,
      });
    };
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
      this.currentTreeData = treeState;
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
      let nextTree;
      if (selected) {
        const cleared = this.clearSelectionExcept(tree, id);
        nextTree = updateTreeById(cleared, id, { selected: true });
        this.selectedIds = [id];
      }
      else {
        nextTree = this.clearSelectionExcept(tree);
        this.selectedIds = [];
      }
      let finalTree = recalculateIndeterminateTreeState(nextTree);
      finalTree = updateTreeById(finalTree, id, { selected, indeterminate: false });
      const selectedItems = findSelectedItems(finalTree);
      this.currentTreeData = finalTree;
      this.wppChange.emit({
        treeState: finalTree,
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
      return { ...item, hidden: !isMatch };
    });
    this.checkData = (treeData) => {
      if (!this.multiple) {
        if (findSelectedItems(treeData).length > 1) {
          throw new Error('Several selected items found in provided data. There is could be only one selected item in single mode, otherwise, use multiple mode.');
        }
        if (this.defaultSelectedIds.length > 1) {
          throw new Error('Several items found in provided defaultSelectedIds prop. There is could be only one selected item in single mode, otherwise, use multiple mode.');
        }
      }
      return treeData;
    };
    this.hostCssClasses = () => ({
      'wpp-tree': true,
    });
    this.renderIconsList = (item, icons, place = 'end') => (h("div", { slot: `icon-${place}`, key: uuidv4() }, h("wpp-menu-context-v3-4-0", { dropdownConfig: {
        trigger: 'click',
        interactiveDebounce: 15,
        interactiveBorder: 25,
        offset: [0, 0],
      } }, h("wpp-icon-more-v3-4-0", { class: {
        'menu-trigger': true,
        disabled: !!item.disabled,
      }, style: { padding: '4px', color: 'var(--wpp-grey-color-800)' }, direction: "horizontal", slot: "trigger-element" }), h("div", null, icons.map(({ icon, name }) => (h("wpp-list-item-v3-4-0", { key: name, value: name, onClick: this.handleActionClick({ item, name, place }) }, h(transformToVersionedTag(icon), { slot: 'left' }), h("span", { slot: "label" }, name))))))));
    this.renderTree = (treeData, level = 1) => treeData.map(item => {
      const extraProps = extractExtraProps(item);
      const isParent = !!item.hasChildren || !!(item.children && item.children.length);
      if (isParent) {
        return (h("wpp-tree-item-v3-4-0", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
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
          }), h("div", { slot: "content", class: "content-container", part: "content" }, item.open &&
          (item.loadingChildren
            ? this.renderSkeletonRows(this.lazyConfig?.skeleton?.count || 1)
            : Array.isArray(item.children) && item.children.length > 0
              ? this.renderTree(item.children, level + 1)
              : null))));
      }
      return (h("wpp-tree-item-v3-4-0", { text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, ...extraProps }, item.iconStart?.icon &&
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
    this.lazyConfig = undefined;
  }
  renderSkeletonRows(count = 1, paddingLeft) {
    const { height = 32 } = this.lazyConfig?.skeleton || {};
    return Array.from({ length: count }, (_, idx) => (h("div", { class: "skeleton-item", key: `skeleton-${idx}`, ...(paddingLeft && { style: { paddingLeft } }) }, h("wpp-skeleton-v3-4-0", { variant: "rectangle", width: "100%", height: height, animation: true }))));
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
  async handleOpenItem(event) {
    event.stopPropagation();
    const item = event.detail;
    const loader = this.lazyConfig?.loadChildren;
    const needsLoad = !!loader && !!item.open && item.hasChildren === true && (!item.children || item.children.length === 0);
    if (!needsLoad) {
      const baseState = updateTreeById(this.currentTreeData, item.id, item);
      const selectedItems = findSelectedItems(baseState);
      this.wppChange.emit({
        treeState: baseState,
        currentItem: item,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'open',
      });
      return;
    }
    if (this.pendingLoads.has(item.id))
      return;
    this.pendingLoads.add(item.id);
    const loadingState = updateTreeById(this.currentTreeData, item.id, { loadingChildren: true, open: true });
    this.currentTreeData = loadingState;
    try {
      const response = await loader(item);
      const children = Array.isArray(response.items) ? response.items : [];
      const empty = children.length === 0;
      const nextState = empty
        ? { children: undefined, loadingChildren: false, open: false, hasChildren: false }
        : { children, loadingChildren: false, open: true, hasChildren: true };
      const merged = updateTreeById(this.currentTreeData, item.id, nextState);
      // Recalculate indeterminate/parent states
      let finalTree = recalculateIndeterminateTreeState(merged);
      // Preserve explicit user selection in single mode
      if (!this.multiple) {
        const keepId = this.selectedIds?.[0];
        if (keepId != null) {
          finalTree = updateTreeById(finalTree, keepId, { selected: true, indeterminate: false });
        }
      }
      this.currentTreeData = finalTree;
      const selectedItems = findSelectedItems(finalTree);
      this.wppChange.emit({
        treeState: finalTree,
        currentItem: { ...item, open: !empty },
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'open',
      });
    }
    catch {
      const reverted = updateTreeById(this.currentTreeData, item.id, {
        loadingChildren: false,
        open: false,
        hasChildren: true,
        children: undefined,
      });
      this.currentTreeData = reverted;
      const selectedItems = findSelectedItems(reverted);
      this.wppChange.emit({
        treeState: reverted,
        currentItem: { ...item, open: false },
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'open',
      });
    }
    finally {
      this.pendingLoads.delete(item.id);
    }
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
  clearSelectionExcept(tree, keepId) {
    const walk = (nodes) => nodes.map(n => {
      const isTarget = keepId != null && n.id === keepId;
      const children = n.children ? walk(n.children) : undefined;
      return { ...n, selected: !!isTarget && !!n.selected, indeterminate: false, ...(children ? { children } : {}) };
    });
    return walk(tree);
  }
  componentDidLoad() {
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-container, tree-empty-text" }, !this.loading && (h("div", { class: "container", part: "tree-container" }, this.currentTreeData && this.isSearchResultFound ? (this.renderTree(this.currentTreeData)) : (h("p", { class: "empty-tree-text", part: "tree-empty-text" }, this._locales.nothingFound)))), this.loading && h("div", { class: "skeleton-wrapper" }, this.renderSkeletonRows(this.skeletonNumberItems))));
  }
  static get registryIs() { return "wpp-tree-v3-4-0"; }
  get host() { return this; }
  static get watchers() { return {
    "search": ["onInputChange"],
    "data": ["updateDate"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppTreeCss; }
}, [1, "wpp-tree", "wpp-tree-v3-4-0", {
    "data": [16],
    "search": [1],
    "multiple": [516],
    "defaultSelectedIds": [16],
    "locales": [16],
    "searchConfig": [16],
    "disableSearchHighlight": [4, "disable-search-highlight"],
    "disableOpenCloseAnimation": [4, "disable-open-close-animation"],
    "withItemsTruncation": [4, "with-items-truncation"],
    "loading": [4],
    "skeletonNumberItems": [2, "skeleton-number-items"],
    "lazyConfig": [16],
    "currentTreeData": [32],
    "selectedIds": [32],
    "recalculateTreeWidth": [64],
    "selectAll": [64],
    "clearAll": [64]
  }, [[2, "wppTreeItemOpenChange", "handleOpenItem"], [2, "wppTreeItemSelectChange", "handleSelectedItem"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tree-v3-4-0", "wpp-action-button-v3-4-0", "wpp-avatar-v3-4-0", "wpp-avatar-group-v3-4-0", "wpp-checkbox-v3-4-0", "wpp-icon-chevron-v3-4-0", "wpp-icon-cross-v3-4-0", "wpp-icon-dash-v3-4-0", "wpp-icon-error-v3-4-0", "wpp-icon-info-message-v3-4-0", "wpp-icon-more-v3-4-0", "wpp-icon-success-v3-4-0", "wpp-icon-tick-v3-4-0", "wpp-icon-triangle-fill-v3-4-0", "wpp-icon-warning-v3-4-0", "wpp-inline-message-v3-4-0", "wpp-internal-label-v3-4-0", "wpp-internal-tooltip-v3-4-0", "wpp-label-v3-4-0", "wpp-list-item-v3-4-0", "wpp-menu-context-v3-4-0", "wpp-skeleton-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tag-v3-4-0", "wpp-tooltip-v3-4-0", "wpp-tree-item-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tree-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTree$1);
      }
      break;
    case "wpp-action-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "wpp-avatar-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-avatar-group-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-checkbox-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-chevron-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-cross-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-dash-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-error-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-info-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-more-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-success-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-tick-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-triangle-fill-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-warning-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-inline-message-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-internal-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-internal-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-label-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-list-item-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-menu-context-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-skeleton-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-spinner-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-tag-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-tooltip-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tree-item-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppTree = WppTree$1;
const defineCustomElement = defineCustomElement$1;

export { WppTree, defineCustomElement };

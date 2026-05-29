import { h, Host } from '@stencil/core';
import { debounce, transformToVersionedTag, uuidv4 } from '../../utils/utils';
import { findSelectedItems, findTreeItemById, isHaveFoundChildren, markChildrenAs, recalculateIndeterminateTreeState, convertToOriginalItems, updateTreeById, updateTreeByIds, extractExtraProps, getAllVisibleItems, findParentOfItem, getSiblings, } from './utils';
import { LOCALES_DEFAULTS } from './const';
export class WppTree {
  constructor() {
    this.resizeInProgress = false;
    this._locales = LOCALES_DEFAULTS;
    this.pendingLoads = new Map();
    this.isSearchResultFound = true;
    this.isMouseInteraction = false;
    this.focusTreeItem = (itemId) => {
      // Use attribute-only selector — tag names are versioned at runtime (e.g. wpp-tree-item-v3-4-0)
      const treeItemEl = this.host.shadowRoot?.querySelector(`[data-item-id="${itemId}"]`);
      if (treeItemEl && typeof treeItemEl.scrollIntoView === 'function') {
        treeItemEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      // If was in action mode, return focus to the tree container
      if (this.isFocusOnAction) {
        this.exitActionMode(this.host.shadowRoot?.querySelector('.container'));
      }
    };
    // --- Action Mode ---
    // Per W3C ARIA APG: trees are composite widgets where Tab always exits.
    // To interact with actionable content (buttons, menus) inside a tree item,
    // the user presses Enter or F2 to enter "action mode", then Escape to return.
    /**
     * Enters action mode for the given tree item.
     * Focuses the first actionable element (button, menu trigger, etc.) within the item.
     * Uses `setFocus()` on wpp-action-button to ensure the visible focus ring (tab-focus class).
     */
    this.enterActionMode = (itemId) => {
      const actions = this.getActionElementsInItem(itemId);
      if (actions.length === 0) {
        return;
      }
      const actionButtonTag = transformToVersionedTag('wpp-action-button').toUpperCase();
      const firstAction = actions[0];
      // Skip the first action if it's a disabled or loading action button
      // — its inner <button> is disabled and cannot receive focus.
      const isDisabledOrLoading = firstAction.tagName === actionButtonTag &&
        (firstAction.hasAttribute('disabled') || firstAction.classList.contains('wpp-loading'));
      if (isDisabledOrLoading) {
        // Try the next action instead (e.g. endContent avatar/avatar-group)
        const remaining = actions.slice(1);
        if (remaining.length > 0) {
          this.focusFirstAvailable(remaining);
        }
        return;
      }
      this.focusFirstAvailable(actions);
    };
    /**
     * Focuses the first available action element, using the appropriate focus method.
     * Resolves action components to their focusable DOM elements via getFocusableElements,
     * then delegates to focusActionElement for the correct focus strategy.
     */
    this.focusFirstAvailable = (actions) => {
      const focusableEls = this.getFocusableElements(actions);
      if (focusableEls.length > 0) {
        this.focusActionElement(focusableEls[0]);
        this.isFocusOnAction = true;
      }
    };
    /**
     * Exits action mode and returns focus to the tree container.
     */
    this.exitActionMode = (treeContainer) => {
      this.isFocusOnAction = false;
      treeContainer?.focus();
    };
    /**
     * Activates the current action element in action mode (Enter/Space).
     * Dispatches a click on the correct trigger element:
     * - For iconsEnd (wpp-menu-context): clicks the trigger-element slot to open the dropdown.
     * - For simple iconEnd: clicks the icon element to fire wppActionClick.
     */
    this.activateCurrentAction = () => {
      const treeItemEl = this.host.shadowRoot?.querySelector(`[data-item-id="${this.focusedItemId}"]`);
      if (!treeItemEl)
        return;
      const menuContextTag = transformToVersionedTag('wpp-menu-context');
      // iconsEnd case: the icon-end slot contains a wpp-menu-context with a trigger element
      const trigger = treeItemEl.querySelector(`[slot="icon-end"] ${menuContextTag} [slot="trigger-element"]`);
      if (trigger) {
        trigger.click();
        return;
      }
      // Simple iconEnd case: the icon-end slot is the icon itself with an onclick handler
      const iconEnd = treeItemEl.querySelector('[slot="icon-end"]');
      if (iconEnd) {
        iconEnd.click();
      }
    };
    /**
     * Focuses a resolved focusable element using the correct strategy:
     * - If the element is the inner <button> of a wpp-action-button (detected via
     *   getRootNode()), calls setFocus() on the action-button host for proper focus ring.
     * - Otherwise, calls .focus() + synthetic keyup Tab to trigger the component's
     *   built-in tab-focus CSS class (wpp-avatar, menu triggers, etc.).
     */
    this.focusActionElement = (focusableEl) => {
      const actionButtonTag = transformToVersionedTag('wpp-action-button').toUpperCase();
      // Check if this element lives inside a wpp-action-button's shadow DOM
      const rootNode = focusableEl.getRootNode();
      if (rootNode instanceof ShadowRoot && rootNode.host?.tagName === actionButtonTag) {
        const actionButton = rootNode.host;
        if (typeof actionButton.setFocus === 'function') {
          actionButton.setFocus();
          return;
        }
      }
      // For avatars, menu triggers, and other elements
      focusableEl.focus();
      focusableEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    };
    /**
     * Collects actionable elements within a tree item.
     *
     * Uses `transformToVersionedTag` for tag selectors because component names
     * include version suffixes at runtime (e.g. `wpp-action-button-v3-4-0`).
     *
     * Returns:
     * - The `wpp-action-button` (wraps icon-end / iconsEnd content) if visible
     * - Any `wpp-menu-context` elements from the icon-start slot (separate from action-button)
     */
    this.getActionElementsInItem = (itemId) => {
      const treeItemEl = this.host.shadowRoot?.querySelector(`[data-item-id="${itemId}"]`);
      if (!treeItemEl) {
        return [];
      }
      const actions = [];
      const shadowRoot = treeItemEl.shadowRoot;
      const actionButtonTag = transformToVersionedTag('wpp-action-button');
      // 1. The wpp-action-button wraps all icon-end / iconsEnd content.
      //    When visible (not aria-hidden), it is the primary focusable action.
      if (shadowRoot) {
        const actionButton = shadowRoot.querySelector(`${actionButtonTag}:not([aria-hidden="true"])`);
        if (actionButton)
          actions.push(actionButton);
      }
      // 2. icon-start menu-contexts live outside the action-button (in the slot wrapper).
      //    These are separate interactive elements that Tab should also reach.
      const menuContextTag = transformToVersionedTag('wpp-menu-context');
      const startSlotMenus = Array.from(treeItemEl.querySelectorAll(`[slot="icon-start"] ${menuContextTag}`));
      actions.push(...startSlotMenus);
      // 3. endContent elements: avatar and avatar-group are interactive and focusable.
      //    These are rendered inside the tree-item's shadow DOM.
      if (shadowRoot) {
        const avatarTag = transformToVersionedTag('wpp-avatar');
        const avatarGroupTag = transformToVersionedTag('wpp-avatar-group');
        const endContentAvatar = shadowRoot.querySelector(`${avatarTag}[part="tree-item-end-avatar"]`);
        const endContentAvatarGroup = shadowRoot.querySelector(`${avatarGroupTag}[part="tree-item-end-avatar-group"]`);
        if (endContentAvatar)
          actions.push(endContentAvatar);
        if (endContentAvatarGroup)
          actions.push(endContentAvatarGroup);
      }
      return actions;
    };
    /**
     * Resolves each action component to the actual focusable DOM element.
     *
     * - wpp-action-button: returns the inner <button> (tabindex=-1, programmatically focusable).
     * - wpp-menu-context (scoped, no shadow DOM): returns the trigger element's inner button.
     */
    this.getFocusableElements = (actions) => {
      const actionButtonTag = transformToVersionedTag('wpp-action-button').toUpperCase();
      const menuContextTag = transformToVersionedTag('wpp-menu-context').toUpperCase();
      const avatarTag = transformToVersionedTag('wpp-avatar').toUpperCase();
      const avatarGroupTag = transformToVersionedTag('wpp-avatar-group').toUpperCase();
      const elements = [];
      for (const action of actions) {
        const tag = action.tagName;
        if (tag === actionButtonTag) {
          const btn = action.shadowRoot?.querySelector('button');
          if (btn) {
            elements.push(btn);
          }
        }
        else if (tag === menuContextTag) {
          // wpp-menu-context uses scoped CSS (no shadow DOM) — query light DOM for trigger.
          const trigger = action.querySelector('[slot="trigger-element"]');
          if (trigger) {
            const inner = (trigger.shadowRoot?.querySelector('button') ?? trigger);
            if (typeof inner.focus === 'function') {
              elements.push(inner);
            }
          }
        }
        else if (tag === avatarTag) {
          // wpp-avatar is focusable via its Host element.
          // It tracks focus type and applies tab-focus CSS class on keyup Tab.
          elements.push(action);
        }
        else if (tag === avatarGroupTag) {
          // wpp-avatar-group has no focus handling of its own — resolve to
          // ALL wpp-avatar children inside its shadow DOM so Tab can cycle through them.
          const innerAvatarTag = transformToVersionedTag('wpp-avatar');
          const allAvatars = Array.from(action.shadowRoot?.querySelectorAll(innerAvatarTag) ?? []);
          elements.push(...allAvatars);
        }
        else if (typeof action.focus === 'function') {
          elements.push(action);
        }
      }
      return elements;
    };
    /**
     * Checks whether all selectable (non-disabled, non-isNotSelectable) leaf descendants
     * are already selected. Used to determine the correct toggle direction when a parent
     * is in indeterminate state due to disabled children that can't be toggled.
     */
    this.areAllSelectableChildrenSelected = (children) => children.every(child => {
      // Disabled items can't be toggled — skip them (treat as "satisfied")
      if (child.disabled)
        return true;
      if (child.children?.length) {
        // isNotSelectable parents delegate selection to their children
        if (child.isNotSelectable) {
          return this.areAllSelectableChildrenSelected(child.children);
        }
        // Selectable parent: check own state AND children
        return child.selected && this.areAllSelectableChildrenSelected(child.children);
      }
      // Leaf node
      return !!child.selected;
    });
    /**
     * Checks whether the given element is currently focused (or its host is the active element).
     * Accounts for shadow DOM boundaries where activeElement is the host, not the inner element.
     */
    this.isElementFocused = (element, composedTarget) => {
      if (element === composedTarget)
        return true;
      // The composedTarget may be inside element's shadow DOM
      let current = composedTarget;
      while (current) {
        if (current === element)
          return true;
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
          current = current.host;
        }
        else {
          current = current.parentNode;
        }
      }
      return false;
    };
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
    /**
     * Handle document-level mousedown to clear focus ring when clicking outside the tree
     */
    this.handleDocumentMouseDown = (event) => {
      const target = event.target;
      const isInsideHost = this.host.contains(target);
      const isInsideShadow = this.host.shadowRoot?.contains(target);
      if (!isInsideHost && !isInsideShadow) {
        // Click is outside the tree - clear focus ring
        if (this.isKeyboardNavigating) {
          this.isKeyboardNavigating = false;
        }
      }
    };
    this.isMatchSearch = (item, search) => {
      if (this.searchConfig?.isMatchingSearch)
        return this.searchConfig?.isMatchingSearch(item, search);
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
    this.renderIconsList = (item, icons, place = 'end') => (h("div", { slot: `icon-${place}`, key: uuidv4() }, h("wpp-menu-context-v4-1-0", { dropdownConfig: {
        trigger: 'click',
        interactiveDebounce: 15,
        interactiveBorder: 25,
        offset: [0, 0],
      } }, h("wpp-icon-more-v4-1-0", { class: {
        'menu-trigger': true,
        disabled: !!item.disabled,
      }, style: { padding: '4px', color: 'var(--wpp-grey-color-800)' }, direction: "horizontal", slot: "trigger-element" }), h("div", null, icons.map(({ icon, name }) => (h("wpp-list-item-v4-1-0", { key: name, value: name, onClick: this.handleActionClick({ item, name, place }) }, h(transformToVersionedTag(icon), { slot: 'left' }), h("span", { slot: "label" }, name))))))));
    this.renderTree = (treeData, level = 1) => {
      const visibleItems = treeData.filter(item => !item.hidden);
      const setSize = visibleItems.length;
      return visibleItems.map((item, index) => {
        const extraProps = extractExtraProps(item);
        const isParent = !!item.hasChildren || !!(item.children && item.children.length);
        const posInSet = index + 1;
        // Only show focus ring during keyboard navigation (suppress when action mode is active)
        const isFocused = this.isKeyboardNavigating && this.focusedItemId === item.id && !this.isFocusOnAction;
        if (isParent) {
          return (h("wpp-tree-item-v4-1-0", { id: `tree-item-${item.id}`, text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, setSize: setSize, posInSet: posInSet, isFocused: isFocused, "data-item-id": item.id, ...extraProps }, item.iconStart?.icon &&
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
            }), h("div", { slot: "content", class: "content-container", role: "group", part: "content" }, item.open &&
            (item.loadingChildren
              ? this.renderSkeletonRows(this.lazyConfig?.skeleton?.count || 1)
              : Array.isArray(item.children) && item.children.length > 0
                ? this.renderTree(item.children, level + 1)
                : null))));
        }
        return (h("wpp-tree-item-v4-1-0", { id: `tree-item-${item.id}`, text: item.title, item: item, level: level, multiple: this.multiple, search: this.search, highlightOptions: this.searchConfig.highlightOptions, transformSearchQuery: this.searchConfig.transformSearchQuery, disableSearchHighlight: this.disableSearchHighlight, disableOpenCloseAnimation: this.disableOpenCloseAnimation, withItemsTruncation: this.withItemsTruncation, endContent: item.endContent, setSize: setSize, posInSet: posInSet, isFocused: isFocused, "data-item-id": item.id, ...extraProps }, item.iconStart?.icon &&
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
    };
    this.handleContainerFocus = (event) => {
      const relatedTarget = event.relatedTarget;
      // Check if focus is coming from OUTSIDE the tree (true entry) vs. internal focus movement
      const comingFromHost = relatedTarget ? this.host.contains(relatedTarget) : false;
      const comingFromShadow = relatedTarget ? this.host.shadowRoot?.contains(relatedTarget) : false;
      const isTrueEntry = !relatedTarget || (!comingFromHost && !comingFromShadow);
      // Only update state if focus is truly entering from outside the tree
      if (isTrueEntry) {
        // Only show focus ring for keyboard navigation (not mouse clicks)
        if (!this.isMouseInteraction) {
          this.isKeyboardNavigating = true;
        }
        // Reset mouse flag after focus handling
        this.isMouseInteraction = false;
        // Initialize focused item when tree receives focus
        if (this.currentTreeData?.length > 0) {
          const visibleItems = getAllVisibleItems(this.currentTreeData);
          // Find first non-disabled item, preferring selected items
          const selectedItem = visibleItems.find(item => item.selected && !item.disabled);
          const firstNonDisabledItem = visibleItems.find(item => !item.disabled);
          this.focusedItemId = selectedItem?.id ?? firstNonDisabledItem?.id ?? null;
        }
      }
    };
    this.handleContainerBlur = (event) => {
      const relatedTarget = event.relatedTarget;
      const hostContains = relatedTarget ? this.host.contains(relatedTarget) : false;
      const shadowRootContains = relatedTarget ? this.host.shadowRoot?.contains(relatedTarget) : false;
      const isWithinNestedShadow = relatedTarget ? this.isDescendantOfHost(relatedTarget) : false;
      const isMovingOutside = !relatedTarget || (!hostContains && !shadowRootContains && !isWithinNestedShadow);
      if (isMovingOutside) {
        this.isKeyboardNavigating = false;
        this.isFocusOnAction = false;
      }
    };
    /**
     * Traverses upward through shadow DOM boundaries to determine
     * whether an element lives within this component's host.
     */
    this.isDescendantOfHost = (element) => {
      let current = element;
      while (current) {
        if (current === this.host)
          return true;
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
          current = current.host;
        }
        else {
          current = current.parentNode || current.assignedSlot?.parentNode || null;
        }
      }
      return false;
    };
    this.getActiveDescendantId = () => {
      if (this.focusedItemId === null)
        return undefined;
      return `tree-item-${this.focusedItemId}`;
    };
    this.currentTreeData = undefined;
    this.selectedIds = [];
    this.focusedItemId = null;
    this.isKeyboardNavigating = false;
    this.isFocusOnAction = false;
    this.data = undefined;
    this.search = '';
    this.multiple = false;
    this.defaultSelectedIds = [];
    this.locales = {};
    this.searchConfig = {
      highlightOptions: {},
      transformSearchQuery: undefined,
      isMatchingSearch: undefined,
    };
    this.disableSearchHighlight = false;
    this.disableOpenCloseAnimation = false;
    this.withItemsTruncation = true;
    this.loading = false;
    this.label = undefined;
    this.skeletonNumberItems = 5;
    this.lazyConfig = undefined;
  }
  renderSkeletonRows(count = 1, paddingLeft) {
    const { height = 32 } = this.lazyConfig?.skeleton || {};
    return Array.from({ length: count }, (_, idx) => (h("div", { class: "skeleton-item", key: `skeleton-${idx}`, ...(paddingLeft && { style: { paddingLeft } }) }, h("wpp-skeleton-v4-1-0", { variant: "rectangle", width: "100%", height: height }))));
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
    this.preloadInitialOpenChildren();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  async handleOpenItem(event) {
    event.stopPropagation();
    const item = event.detail;
    // Update focus to the item that was expanded/collapsed (for click events)
    this.focusedItemId = item.id;
    const loader = this.lazyConfig?.loadChildren;
    const needsLoad = !!loader && !!item.open && item.hasChildren === true && (!item.children || item.children.length === 0);
    if (!needsLoad) {
      const baseState = updateTreeById(this.currentTreeData, item.id, item);
      this.currentTreeData = baseState;
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
    // Prevent duplicate loads per item
    if (this.pendingLoads.has(item.id)) {
      return;
    }
    // Show per-item skeleton while loading (no wppChange emit during loading)
    const loadingState = updateTreeById(this.currentTreeData, item.id, { loadingChildren: true, open: true });
    this.currentTreeData = loadingState;
    this.pendingLoads.set(item.id, Promise.resolve(loader(item))
      .then((response) => {
      const normalized = response?.items ?? [];
      const empty = normalized.length === 0;
      // Success:
      // - empty: collapse and mark hasChildren=false
      // - non-empty: merge children and keep open
      const nextState = empty
        ? { children: undefined, loadingChildren: false, open: false, hasChildren: false }
        : { children: normalized, loadingChildren: false, open: true, hasChildren: true };
      const merged = updateTreeById(this.currentTreeData, item.id, nextState);
      // Recalculate indeterminate/parent states
      let finalTree = recalculateIndeterminateTreeState(merged);
      // Preserve explicit user selection in single mode:
      // 1) Try to re-apply the currently tracked selected id (source of truth)
      if (!this.multiple) {
        const keepId = this.selectedIds?.[0];
        if (keepId != null) {
          finalTree = updateTreeById(finalTree, keepId, { selected: true, indeterminate: false });
        }
        // 2) Fallback: if the current item was selected before merge, keep it selected
        const prev = findTreeItemById(this.currentTreeData, String(item.id));
        const prevSelected = prev?.selected;
        if (prevSelected === true) {
          finalTree = updateTreeById(finalTree, item.id, { selected: true, indeterminate: false });
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
    })
      .catch(() => {
      // Error: revert to initial behavior (collapse, keep hasChildren=true, children undefined)
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
    })
      .finally(() => {
      this.pendingLoads.delete(item.id);
    }));
  }
  handleKeyDown(event) {
    if (this.loading)
      return;
    // Get the actual event target (use composedPath for shadow DOM)
    const composedPath = event.composedPath();
    const treeContainer = this.host.shadowRoot?.querySelector('.container');
    // --- Action Mode Handling ---
    // When isFocusOnAction is true, the user is interacting with actions
    // inside a tree item (buttons, menus, etc.). Per W3C ARIA APG, Escape
    // exits action mode and returns focus to the tree container.
    if (this.isFocusOnAction) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.exitActionMode(treeContainer);
        return;
      }
      // Tab/Shift+Tab in action mode: cycle through actions within the item,
      // then exit the tree naturally when no more actions remain
      if (event.key === 'Tab') {
        const actions = this.getActionElementsInItem(this.focusedItemId);
        const focusableEls = this.getFocusableElements(actions);
        if (focusableEls.length > 1) {
          const currentIdx = focusableEls.findIndex(el => this.isElementFocused(el, composedPath[0]));
          const nextIdx = event.shiftKey ? currentIdx - 1 : currentIdx + 1;
          if (nextIdx >= 0 && nextIdx < focusableEls.length) {
            event.preventDefault();
            this.focusActionElement(focusableEls[nextIdx]);
            return;
          }
        }
        // No more actions in this direction — exit action mode, return focus to tree container.
        // preventDefault so the browser doesn't move focus out of the tree entirely.
        event.preventDefault();
        this.exitActionMode(treeContainer);
        return;
      }
      // Let all other keys pass through to the focused action element (e.g. Enter on a button)
      // Enter/Space in action mode: activate the current action (open menu, trigger click).
      // wpp-action-button dispatches its synthetic click on its own host, which doesn't
      // reach the nested wpp-menu-context trigger. We dispatch directly on the trigger.
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.activateCurrentAction();
        return;
      }
      return;
    }
    // --- Standard Tree Navigation (Tab always exits) ---
    if (event.key === 'Tab')
      return;
    // Mark that we're using keyboard navigation
    this.isKeyboardNavigating = true;
    const visibleItems = getAllVisibleItems(this.currentTreeData);
    if (visibleItems.length === 0)
      return;
    // Initialize focused item if not set
    if (this.focusedItemId === null) {
      const selectedItem = visibleItems.find(item => item.selected);
      this.focusedItemId = selectedItem?.id ?? visibleItems[0]?.id ?? null;
    }
    const currentIndex = visibleItems.findIndex(item => item.id === this.focusedItemId);
    const currentItem = currentIndex >= 0 ? visibleItems[currentIndex] : null;
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        // Find next non-disabled item
        let nextIndex = currentIndex + 1;
        while (nextIndex < visibleItems.length && visibleItems[nextIndex].disabled) {
          nextIndex++;
        }
        if (nextIndex < visibleItems.length) {
          this.focusedItemId = visibleItems[nextIndex].id;
          this.focusTreeItem(this.focusedItemId);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        // Find previous non-disabled item
        let prevIndex = currentIndex - 1;
        while (prevIndex >= 0 && visibleItems[prevIndex].disabled) {
          prevIndex--;
        }
        if (prevIndex >= 0) {
          this.focusedItemId = visibleItems[prevIndex].id;
          this.focusTreeItem(this.focusedItemId);
        }
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (currentItem) {
          const isParent = !!currentItem.hasChildren || !!(currentItem.children && currentItem.children.length);
          if (isParent && !currentItem.open && !currentItem.disabled) {
            // Open the closed node
            this.handleOpenItem(new CustomEvent('wppTreeItemOpenChange', { detail: { ...currentItem, open: true } }));
          }
          else if (isParent && currentItem.open && currentItem.children?.length) {
            // Move to first non-disabled, non-hidden child
            const firstChild = currentItem.children.find(c => !c.hidden && !c.disabled);
            if (firstChild) {
              this.focusedItemId = firstChild.id;
              this.focusTreeItem(this.focusedItemId);
            }
          }
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        if (currentItem) {
          const isParent = !!currentItem.hasChildren || !!(currentItem.children && currentItem.children.length);
          if (isParent && currentItem.open && !currentItem.disabled) {
            // Close the open node
            this.handleOpenItem(new CustomEvent('wppTreeItemOpenChange', { detail: { ...currentItem, open: false } }));
          }
          else {
            // Move to parent
            const parent = findParentOfItem(this.currentTreeData, currentItem.id);
            if (parent) {
              this.focusedItemId = parent.id;
              this.focusTreeItem(this.focusedItemId);
            }
          }
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        // Find first non-disabled item
        const firstNonDisabled = visibleItems.find(item => !item.disabled);
        if (firstNonDisabled) {
          this.focusedItemId = firstNonDisabled.id;
          this.focusTreeItem(this.focusedItemId);
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        // Find last non-disabled item
        const lastNonDisabled = [...visibleItems].reverse().find(item => !item.disabled);
        if (lastNonDisabled) {
          this.focusedItemId = lastNonDisabled.id;
          this.focusTreeItem(this.focusedItemId);
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (currentItem && !currentItem.disabled) {
          if (this.multiple && !currentItem.isNotSelectable) {
            // Toggle selection in multiple mode.
            // When indeterminate: if all selectable (non-disabled, non-isNotSelectable) children
            // are already selected, deselect all; otherwise select all. This prevents the toggle
            // from getting stuck when disabled children prevent a fully-selected state.
            let nextSelected;
            if (currentItem.indeterminate && currentItem.children?.length) {
              nextSelected = !this.areAllSelectableChildrenSelected(currentItem.children);
            }
            else {
              nextSelected = !currentItem.selected;
            }
            this.handleSelectedItem(new CustomEvent('wppTreeItemSelectChange', {
              detail: { ...currentItem, selected: nextSelected, indeterminate: false },
            }));
          }
          else if (!this.multiple) {
            // Toggle selection and optionally expand/collapse in single mode
            const isParent = !!currentItem.hasChildren || !!(currentItem.children && currentItem.children.length);
            if (!currentItem.isNotSelectable) {
              this.handleSelectedItem(new CustomEvent('wppTreeItemSelectChange', {
                detail: {
                  ...currentItem,
                  selected: !currentItem.selected,
                  ...(isParent && { open: !currentItem.open }),
                },
              }));
            }
            else if (isParent) {
              // If not selectable, just toggle open state
              this.handleOpenItem(new CustomEvent('wppTreeItemOpenChange', {
                detail: { ...currentItem, open: !currentItem.open },
              }));
            }
          }
        }
        break;
      }
      case '*': {
        // Expand all siblings at the same level
        event.preventDefault();
        if (currentItem) {
          const siblings = getSiblings(this.currentTreeData, currentItem.id);
          siblings.forEach(sibling => {
            const isParent = !!sibling.hasChildren || !!(sibling.children && sibling.children.length);
            if (isParent && !sibling.open && !sibling.disabled) {
              this.handleOpenItem(new CustomEvent('wppTreeItemOpenChange', { detail: { ...sibling, open: true } }));
            }
          });
        }
        break;
      }
      case 'F2': {
        // Enter action mode: focus first actionable element within the tree item
        // Per W3C ARIA APG Grid pattern "Editing and Navigating Inside a Cell"
        event.preventDefault();
        if (currentItem && !currentItem.disabled) {
          this.enterActionMode(currentItem.id);
        }
        break;
      }
      default:
        // Type-ahead: focus item starting with typed character (skip disabled)
        if (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key)) {
          const char = event.key.toLowerCase();
          const startIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          const itemsToSearch = [...visibleItems.slice(startIndex), ...visibleItems.slice(0, startIndex)];
          const match = itemsToSearch.find(item => !item.disabled && item.title.toLowerCase().startsWith(char));
          if (match) {
            this.focusedItemId = match.id;
            this.focusTreeItem(this.focusedItemId);
          }
        }
        break;
    }
  }
  handleMouseDown() {
    // Track that this is a mouse interaction to prevent focus ring
    this.isMouseInteraction = true;
    this.isKeyboardNavigating = false;
  }
  handleSelectedItem(event) {
    event.stopPropagation();
    const newItemState = event.detail;
    // Update focus to the clicked/selected item
    this.focusedItemId = newItemState.id;
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
  markAllOpen(nodes) {
    const walk = (arr) => arr.map(n => {
      // Skip disabled nodes entirely (do not toggle them or their descendants)
      if (n.disabled === true) {
        return n;
      }
      // Non-disabled: set open=true and recurse
      return {
        ...n,
        open: true,
        children: Array.isArray(n.children) ? walk(n.children) : n.children,
      };
    });
    return walk(nodes);
  }
  markAllClosed(nodes) {
    const walk = (arr) => arr.map(n => {
      // Skip disabled nodes entirely (do not toggle them or their descendants)
      if (n.disabled === true) {
        return n;
      }
      // Non-disabled: set open=false, clear loadingChildren, recurse
      return {
        ...n,
        open: false,
        loadingChildren: false,
        children: Array.isArray(n.children) ? walk(n.children) : n.children,
      };
    });
    return walk(nodes);
  }
  /**
   * Expands all tree nodes.
   * Disabled nodes and their descendants are skipped and remain unchanged.
   * If lazy loading is configured, children for open nodes with `hasChildren: true` will be preloaded.
   * Emits a `wppChange` event with the updated tree state.
   */
  async expandAll() {
    const next = this.markAllOpen(this.currentTreeData);
    this.currentTreeData = next;
    this.wppChange.emit({
      treeState: next,
      selectedItems: findSelectedItems(next),
      selectedOriginalItems: convertToOriginalItems(findSelectedItems(next)),
      reason: 'open',
    });
    await this.preloadInitialOpenChildren();
  }
  /**
   * Collapses all tree nodes.
   * Disabled nodes and their descendants are skipped and remain unchanged.
   * Emits a `wppChange` event with the updated tree state.
   */
  async collapseAll() {
    const next = this.markAllClosed(this.currentTreeData);
    this.currentTreeData = next;
    this.wppChange.emit({
      treeState: next,
      selectedItems: findSelectedItems(next),
      selectedOriginalItems: convertToOriginalItems(findSelectedItems(next)),
      reason: 'open',
    });
  }
  /**
   * Preloads children for all open nodes that require lazy loading.
   * Called on initial load, data updates, and after expandAll().
   * Only operates if `lazyConfig.loadChildren` is configured.
   * Emits `wppChange` events as children are loaded.
   */
  async preloadInitialOpenChildren() {
    const loader = this.lazyConfig?.loadChildren;
    if (!loader)
      return;
    const queue = [];
    const walk = (nodes) => {
      if (!Array.isArray(nodes))
        return;
      for (const n of nodes) {
        const needsLoad = n.open === true &&
          n.hasChildren === true &&
          (!n.children || n.children.length === 0) &&
          !n.loadingChildren &&
          !this.pendingLoads.has(n.id);
        if (needsLoad)
          queue.push({ id: n.id, snapshot: n });
        if (Array.isArray(n.children) && n.children.length > 0)
          walk(n.children);
      }
    };
    walk(this.currentTreeData);
    if (queue.length === 0)
      return;
    for (const { id, snapshot } of queue) {
      const withSkeleton = updateTreeById(this.currentTreeData, id, { loadingChildren: true, open: true });
      this.currentTreeData = withSkeleton;
      {
        const selectedItems = findSelectedItems(withSkeleton);
        this.wppChange.emit({
          treeState: withSkeleton,
          currentItem: { ...snapshot, open: true, loadingChildren: true },
          selectedItems,
          selectedOriginalItems: convertToOriginalItems(selectedItems),
          reason: 'open',
        });
      }
      this.pendingLoads.set(id, Promise.resolve(loader(snapshot))
        .then((response) => {
        const normalized = response?.items ?? [];
        const empty = normalized.length === 0;
        const nextState = empty
          ? { children: undefined, loadingChildren: false, open: false, hasChildren: false }
          : { children: normalized, loadingChildren: false, open: true, hasChildren: true };
        const merged = updateTreeById(this.currentTreeData, id, nextState);
        let finalTree = recalculateIndeterminateTreeState(merged);
        if (!this.multiple) {
          const keepId = this.selectedIds?.[0];
          if (keepId != null) {
            finalTree = updateTreeById(finalTree, keepId, { selected: true, indeterminate: false });
          }
          const prev = findTreeItemById(this.currentTreeData, String(id));
          if (prev?.selected === true) {
            finalTree = updateTreeById(finalTree, id, { selected: true, indeterminate: false });
          }
        }
        this.currentTreeData = finalTree;
        const selectedItems = findSelectedItems(finalTree);
        this.wppChange.emit({
          treeState: finalTree,
          currentItem: { ...snapshot, open: !empty },
          selectedItems,
          selectedOriginalItems: convertToOriginalItems(selectedItems),
          reason: 'open',
        });
      })
        .catch(() => {
        const reverted = updateTreeById(this.currentTreeData, id, {
          loadingChildren: false,
          open: false,
          hasChildren: true,
          children: undefined,
        });
        this.currentTreeData = reverted;
        const selectedItems = findSelectedItems(reverted);
        this.wppChange.emit({
          treeState: reverted,
          currentItem: { ...snapshot, open: false },
          selectedItems,
          selectedOriginalItems: convertToOriginalItems(selectedItems),
          reason: 'open',
        });
      })
        .finally(() => {
        this.pendingLoads.delete(id);
      }));
    }
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
      const updated = recalculateIndeterminateTreeState(updateTreeByIds(this.currentTreeData, this.defaultSelectedIds, ({ isNotSelectable, disabled }) => ({
        ...(!isNotSelectable && !disabled && { selected: true }),
      })));
      this.currentTreeData = updated;
      const selectedItems = findSelectedItems(updated);
      this.wppChange.emit({
        treeState: updated,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'select',
      });
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
    // Add document click listener to clear focus ring when clicking outside
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    // Remove document click listener
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
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
    this.preloadInitialOpenChildren();
  }
  render() {
    const hasVisibleContent = this.currentTreeData && this.isSearchResultFound;
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-container, tree-empty-text" }, !this.loading && (h("div", { class: "container", part: "tree-container", role: "tree", "aria-label": this.label, "aria-multiselectable": this.multiple ? 'true' : undefined, "aria-activedescendant": this.getActiveDescendantId(), tabindex: hasVisibleContent ? '0' : undefined, onFocus: this.handleContainerFocus, onBlur: this.handleContainerBlur }, hasVisibleContent ? (this.renderTree(this.currentTreeData)) : (h("p", { class: "empty-tree-text", part: "tree-empty-text", role: "status" }, this._locales.nothingFound)))), this.loading && (h("div", { class: "skeleton-wrapper", role: "status", "aria-label": this._locales.loadingTree }, this.renderSkeletonRows(this.skeletonNumberItems)))));
  }
  static get is() { return "wpp-tree"; }
  static get registryIs() { return "wpp-tree-v4-1-0"; }
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
          "resolved": "{ nothingFound?: string | undefined; loadingTree?: string | undefined; }",
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
          "text": "Defines the component locale types."
        },
        "defaultValue": "{\n    highlightOptions: {},\n    transformSearchQuery: undefined,\n    isMatchingSearch: undefined,\n  }"
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
        "defaultValue": "true"
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
          "text": "Accessible label for the tree component.\nProvides a name for the tree that assistive technologies can announce."
        },
        "attribute": "label",
        "reflect": false
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
      },
      "lazyConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TreeLazyConfig",
          "resolved": "TreeLazyConfig | undefined",
          "references": {
            "TreeLazyConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tree/types.ts::TreeLazyConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Lazy loading configuration for dynamically loading children.\nWhen a node with `hasChildren: true` is expanded, skeleton loaders\nare shown while children are fetched, then all children render at once."
        }
      }
    };
  }
  static get states() {
    return {
      "currentTreeData": {},
      "selectedIds": {},
      "focusedItemId": {},
      "isKeyboardNavigating": {},
      "isFocusOnAction": {}
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
      },
      "expandAll": {
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
          "text": "Expands all tree nodes.\nDisabled nodes and their descendants are skipped and remain unchanged.\nIf lazy loading is configured, children for open nodes with `hasChildren: true` will be preloaded.\nEmits a `wppChange` event with the updated tree state.",
          "tags": []
        }
      },
      "collapseAll": {
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
          "text": "Collapses all tree nodes.\nDisabled nodes and their descendants are skipped and remain unchanged.\nEmits a `wppChange` event with the updated tree state.",
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
        "name": "keydown",
        "method": "handleKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mousedown",
        "method": "handleMouseDown",
        "target": undefined,
        "capture": false,
        "passive": true
      }, {
        "name": "wppTreeItemSelectChange",
        "method": "handleSelectedItem",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}

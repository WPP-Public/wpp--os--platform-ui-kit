import { KNOWN_KEYS_OF_TREE_TYPE } from './const';
export const areAllChildrenSelected = (treeData) => treeData.every(item => {
  if (item.children) {
    return areAllChildrenSelected(item.children);
  }
  else {
    return !!item.selected;
  }
});
export const areAnyChildrenSelected = (treeData) => treeData.some(item => {
  if (item.children) {
    return areAnyChildrenSelected(item.children);
  }
  else {
    return !!item.selected || !!item.indeterminate;
  }
});
export const areAnyChildrenDisabled = (treeData) => treeData.some(item => {
  if (item.children && !item.disabled) {
    return areAnyChildrenDisabled(item.children);
  }
  else {
    return !!item.disabled;
  }
});
export const findTreeItemById = (treeData, id) => {
  for (const item of treeData) {
    if (String(item.id) === String(id)) {
      return item;
    }
    if (item.children?.length) {
      const found = findTreeItemById(item.children, id);
      if (found)
        return found;
    }
  }
  return undefined;
};
export const updateTreeById = (tree, id, newItem) => tree.map(item => {
  if (item.id !== id) {
    if (item.children?.length) {
      return { ...item, children: updateTreeById(item.children, id, newItem) };
    }
    return item;
  }
  return { ...item, ...newItem };
});
export const updateTreeByIds = (tree, idsList, newItemParamsCb, passedCheckOnParent = false) => tree.map(item => {
  if (item.children?.length) {
    return {
      ...item,
      children: updateTreeByIds(item.children, idsList, newItemParamsCb, idsList.includes(item.id) || passedCheckOnParent),
      ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)),
    };
  }
  return { ...item, ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)) };
});
export const findSelectedItems = (tree) => tree
  .map(item => {
  if (!item.selected) {
    if (item.children?.length) {
      return findSelectedItems(item.children);
    }
    else {
      return null;
    }
  }
  else {
    if (item.children?.length) {
      return [item].concat([findSelectedItems(item.children)]);
    }
    return item;
  }
})
  .flat()
  .filter(Boolean)
  .flatMap(elem => elem);
export const convertToOriginalItems = (treeArr) => treeArr.map(({ search, children, selected, loadingActions, isNotSelectable, disabled, checked, indeterminate, iconStart, iconEnd, iconsStart, iconsEnd, hidden, open, ...itemWithoutConfig }) => itemWithoutConfig);
export const markChildrenAs = (tree, treeItemCb) => tree.map(item => {
  if (item.children) {
    return { ...item, ...treeItemCb(item), children: markChildrenAs(item.children, treeItemCb) };
  }
  return { ...item, ...treeItemCb(item) };
});
export const isHaveFoundChildren = (tree, search, matcherFn) => tree.some(item => {
  const isMatch = matcherFn(item, search);
  if (!isMatch && item.children) {
    return isHaveFoundChildren(item.children, search, matcherFn);
  }
  return isMatch;
});
export const recalculateIndeterminateTreeState = (treeData) => treeData.reduce((acc, item) => {
  if (item.children) {
    const selected = !item.isNotSelectable && areAllChildrenSelected(item.children);
    const indeterminate = areAnyChildrenSelected(item.children);
    const children = recalculateIndeterminateTreeState(item.children);
    return [...acc, { ...item, selected, children, indeterminate: selected ? false : indeterminate }];
  }
  return [...acc, item];
}, []);
export const extractExtraProps = (tree) => {
  const extras = {};
  for (const key in tree) {
    if (!KNOWN_KEYS_OF_TREE_TYPE[key] && key.startsWith('data-')) {
      extras[key] = tree[key];
    }
  }
  return extras;
};
/**
 * Get all visible (not hidden, and parent is open) items in a flat list for keyboard navigation
 */
export const getAllVisibleItems = (tree) => {
  const result = [];
  const traverse = (items) => {
    for (const item of items) {
      if (item.hidden)
        continue;
      result.push(item);
      if (item.open && item.children?.length) {
        traverse(item.children);
      }
    }
  };
  traverse(tree);
  return result;
};
/**
 * Find an item by ID in the tree
 */
export const findItemById = (tree, id) => {
  for (const item of tree) {
    if (item.id === id)
      return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found)
        return found;
    }
  }
  return undefined;
};
/**
 * Find the parent of an item by its ID
 */
export const findParentOfItem = (tree, targetId, parent = null) => {
  for (const item of tree) {
    if (item.id === targetId)
      return parent;
    if (item.children) {
      const found = findParentOfItem(item.children, targetId, item);
      if (found !== null)
        return found;
    }
  }
  return null;
};
/**
 * Get siblings of an item
 */
export const getSiblings = (tree, targetId) => {
  for (const item of tree) {
    if (item.id === targetId)
      return tree;
    if (item.children) {
      const result = getSiblings(item.children, targetId);
      if (result.length > 0 && result.some(i => i.id === targetId))
        return result;
    }
  }
  return [];
};
/**
 * Calculate aria-setsize and aria-posinset for an item
 */
export const getPositionInfo = (tree, targetId) => {
  const siblings = getSiblings(tree, targetId);
  const visibleSiblings = siblings.filter(s => !s.hidden);
  const index = visibleSiblings.findIndex(s => s.id === targetId);
  if (index === -1)
    return null;
  return {
    setSize: visibleSiblings.length,
    posInSet: index + 1,
  };
};

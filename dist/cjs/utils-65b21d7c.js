'use strict';

const LOCALES_DEFAULTS = {
  nothingFound: 'No result',
};
const KNOWN_KEYS_OF_TREE_TYPE = {
  search: true,
  id: true,
  selected: true,
  isNotSelectable: true,
  loadingActions: true,
  loadingChildren: true,
  disabled: true,
  checked: true,
  indeterminate: true,
  hidden: true,
  open: true,
  hasChildren: true,
  title: true,
  children: true,
  iconStart: true,
  iconEnd: true,
  iconsStart: true,
  iconsEnd: true,
  endContent: true,
};

const areAllChildrenSelected = (treeData) => treeData.every(item => {
  if (item.children) {
    return areAllChildrenSelected(item.children);
  }
  else {
    return !!item.selected;
  }
});
const areAnyChildrenSelected = (treeData) => treeData.some(item => {
  if (item.children) {
    return areAnyChildrenSelected(item.children);
  }
  else {
    return !!item.selected || !!item.indeterminate;
  }
});
const areAnyChildrenDisabled = (treeData) => treeData.some(item => {
  if (item.children && !item.disabled) {
    return areAnyChildrenDisabled(item.children);
  }
  else {
    return !!item.disabled;
  }
});
const findTreeItemById = (treeData, id) => {
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
const updateTreeById = (tree, id, newItem) => tree.map(item => {
  if (item.id !== id) {
    if (item.children?.length) {
      return { ...item, children: updateTreeById(item.children, id, newItem) };
    }
    return item;
  }
  return { ...item, ...newItem };
});
const updateTreeByIds = (tree, idsList, newItemParamsCb, passedCheckOnParent = false) => tree.map(item => {
  if (item.children?.length) {
    return {
      ...item,
      children: updateTreeByIds(item.children, idsList, newItemParamsCb, idsList.includes(item.id) || passedCheckOnParent),
      ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)),
    };
  }
  return { ...item, ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)) };
});
const findSelectedItems = (tree) => tree
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
const convertToOriginalItems = (treeArr) => treeArr.map(({ search, children, selected, loadingActions, isNotSelectable, disabled, checked, indeterminate, iconStart, iconEnd, iconsStart, iconsEnd, hidden, open, ...itemWithoutConfig }) => itemWithoutConfig);
const markChildrenAs = (tree, treeItemCb) => tree.map(item => {
  if (item.children) {
    return { ...item, ...treeItemCb(item), children: markChildrenAs(item.children, treeItemCb) };
  }
  return { ...item, ...treeItemCb(item) };
});
const isHaveFoundChildren = (tree, search, matcherFn) => tree.some(item => {
  const isMatch = matcherFn(item, search);
  if (!isMatch && item.children) {
    return isHaveFoundChildren(item.children, search, matcherFn);
  }
  return isMatch;
});
const recalculateIndeterminateTreeState = (treeData) => treeData.reduce((acc, item) => {
  if (item.children) {
    const selected = !item.isNotSelectable && areAllChildrenSelected(item.children);
    const indeterminate = areAnyChildrenSelected(item.children);
    const children = recalculateIndeterminateTreeState(item.children);
    return [...acc, { ...item, selected, children, indeterminate: selected ? false : indeterminate }];
  }
  return [...acc, item];
}, []);
const extractExtraProps = (tree) => {
  const extras = {};
  for (const key in tree) {
    if (!KNOWN_KEYS_OF_TREE_TYPE[key] && key.startsWith('data-')) {
      extras[key] = tree[key];
    }
  }
  return extras;
};

exports.LOCALES_DEFAULTS = LOCALES_DEFAULTS;
exports.areAnyChildrenDisabled = areAnyChildrenDisabled;
exports.convertToOriginalItems = convertToOriginalItems;
exports.extractExtraProps = extractExtraProps;
exports.findSelectedItems = findSelectedItems;
exports.findTreeItemById = findTreeItemById;
exports.isHaveFoundChildren = isHaveFoundChildren;
exports.markChildrenAs = markChildrenAs;
exports.recalculateIndeterminateTreeState = recalculateIndeterminateTreeState;
exports.updateTreeById = updateTreeById;
exports.updateTreeByIds = updateTreeByIds;

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
export const findTreeItemById = (treeData, id) => treeData.find(item => {
  if (item.id !== id && item.children?.length) {
    return findTreeItemById(item.children, id);
  }
  return item;
});
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

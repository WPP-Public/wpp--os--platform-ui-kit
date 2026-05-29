'use strict';

const index = require('./index-ecf423ba.js');
const utils = require('./utils-2231f97a.js');
const lodash = require('./lodash-6b012aab.js');
const _const = require('./const-09fdf30a.js');

const renderSlotsInListItem = (slots, isLabelExists) => slots
  .map(slotElement => {
  if (!slotElement)
    return null;
  const { type, props, slot, children } = slotElement;
  if (props.slot === 'label' && isLabelExists)
    return null;
  if (!type.startsWith(_const.LIB_COMPONENTS_PREFIX)) {
    const { children: text, ...restProps } = props;
    const Tag = type;
    return (index.h(Tag, { ...restProps }, text));
  }
  if (!children)
    return index.h(utils.transformToVersionedTag(type), { slot, ...props });
  const slotNode = index.h(utils.transformToVersionedTag(type), { slot, ...props });
  slotNode.$children$ = Array.isArray(children)
    ? renderSlotsInListItem(Array.from(children), isLabelExists)
    : renderSlotsInListItem([children], isLabelExists);
  return slotNode;
})
  .filter(item => item !== null);
const isSelected = (value, item, getItemKey) => {
  if (!value?.length)
    return false;
  const itemValue = item.value ?? item;
  const itemKey = typeof itemValue === 'object' ? getItemKey?.(itemValue) : itemValue;
  return value.some(selected => {
    const selectedValue = selected.value ?? selected;
    const selectedKey = typeof selectedValue === 'object' ? getItemKey?.(selectedValue) : selectedValue;
    if (itemKey !== undefined && selectedKey !== undefined) {
      return itemKey === selectedKey;
    }
    return lodash.lodash.isEqual(itemValue, selectedValue);
  });
};
// Select in order
const selectedOptionsByOrder = (internalList, value, getItemKey) => {
  const mapByKey = new Map();
  for (const it of internalList ?? []) {
    const itValue = it.value ?? it;
    const k = typeof itValue === 'object' ? getItemKey?.(itValue) : itValue;
    if (k !== undefined)
      mapByKey.set(k, it);
  }
  const selectedInOrder = [];
  for (const v of value ?? []) {
    const vValue = v.value ?? v;
    const k = typeof vValue === 'object' ? getItemKey?.(vValue) : vValue;
    let match;
    if (k !== undefined && mapByKey.has(k)) {
      match = mapByKey.get(k);
    }
    else {
      match = (internalList ?? []).find(it => lodash.lodash.isEqual(it.value ?? it, vValue));
    }
    if (match)
      selectedInOrder.push(match);
  }
  return selectedInOrder;
};

exports.isSelected = isSelected;
exports.renderSlotsInListItem = renderSlotsInListItem;
exports.selectedOptionsByOrder = selectedOptionsByOrder;

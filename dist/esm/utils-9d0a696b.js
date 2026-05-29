import { h } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-3463d13f.js';
import { l as lodash } from './lodash-cc2b04b5.js';
import { L as LIB_COMPONENTS_PREFIX } from './const-ee6c5d3f.js';

const renderSlotsInListItem = (slots, isLabelExists) => slots
  .map(slotElement => {
  if (!slotElement)
    return null;
  const { type, props, slot, children } = slotElement;
  if (props.slot === 'label' && isLabelExists)
    return null;
  if (!type.startsWith(LIB_COMPONENTS_PREFIX)) {
    const { children: text, ...restProps } = props;
    const Tag = type;
    return (h(Tag, { ...restProps }, text));
  }
  if (!children)
    return h(transformToVersionedTag(type), { slot, ...props });
  const slotNode = h(transformToVersionedTag(type), { slot, ...props });
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
    return lodash.isEqual(itemValue, selectedValue);
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
      match = (internalList ?? []).find(it => lodash.isEqual(it.value ?? it, vValue));
    }
    if (match)
      selectedInOrder.push(match);
  }
  return selectedInOrder;
};

export { isSelected as i, renderSlotsInListItem as r, selectedOptionsByOrder as s };

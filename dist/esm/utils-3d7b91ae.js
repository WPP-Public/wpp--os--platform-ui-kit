import { h } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-f415b66e.js';
import './lodash-cc2b04b5.js';
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
const getTempNodeWidthBasedOnLabel = (textStyles, label) => {
  const tmp = document.createElement('span');
  const textNode = document.createTextNode('');
  tmp.appendChild(textNode);
  document.body.appendChild(tmp);
  tmp.style.cssText = textStyles;
  tmp.style.opacity = '0';
  tmp.style.position = 'absolute';
  tmp.style.width = 'auto';
  tmp.style.overflow = 'scroll';
  tmp.style.whiteSpace = 'no-wrap';
  tmp.innerText = label;
  const nodeWidth = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return nodeWidth;
};

export { getTempNodeWidthBasedOnLabel as g, renderSlotsInListItem as r };

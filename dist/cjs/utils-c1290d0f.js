'use strict';

const index = require('./index-ecf423ba.js');
const utils = require('./utils-e1f17a8c.js');
require('./lodash-6b012aab.js');
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

exports.getTempNodeWidthBasedOnLabel = getTempNodeWidthBasedOnLabel;
exports.renderSlotsInListItem = renderSlotsInListItem;

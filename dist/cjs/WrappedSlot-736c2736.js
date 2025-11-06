'use strict';

const index = require('./index-ecf423ba.js');

/**
 * Helper component that unifies slot wrapping across the project
 */
const WrappedSlot = ({ wrapperClass, ...slotProps }, children) => (index.h("div", { class: wrapperClass, part: `${slotProps.name || 'ws'}-wrapper` },
  index.h("slot", { part: slotProps.name || 'ws-inner', ...slotProps }, children)));

exports.WrappedSlot = WrappedSlot;

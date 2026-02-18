'use strict';

const index = require('./index-ecf423ba.js');

/**
 * Helper component that unifies slot wrapping across the project
 */
const WrappedSlot = ({ wrapperClass, id, role, tabIndex, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, title, ...slotProps }, children) => (index.h("div", { id: id, class: wrapperClass, part: `${slotProps.name || 'ws'}-wrapper`, role: role, tabIndex: tabIndex, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, title: title },
  index.h("slot", { part: slotProps.name || 'ws-inner', ...slotProps }, children)));

exports.WrappedSlot = WrappedSlot;

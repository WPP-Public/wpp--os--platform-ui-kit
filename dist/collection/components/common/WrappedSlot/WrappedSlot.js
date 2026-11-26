import { h } from '@stencil/core';
/**
 * Helper component that unifies slot wrapping across the project
 */
export const WrappedSlot = ({ wrapperClass, id, role, tabIndex, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-description': ariaDescription, title, ...slotProps }, children) => (h("div", { id: id, class: wrapperClass, part: `${slotProps.name || 'ws'}-wrapper`, role: role, tabIndex: tabIndex, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, "aria-description": ariaDescription, title: title }, h("slot", { part: slotProps.name || 'ws-inner', ...slotProps }, children)));

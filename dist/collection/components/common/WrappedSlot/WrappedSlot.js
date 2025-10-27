import { h } from '@stencil/core';
/**
 * Helper component that unifies slot wrapping across the project
 */
export const WrappedSlot = ({ wrapperClass, role, tabIndex, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, title, ...slotProps }, children) => (h("div", { class: wrapperClass, part: `${slotProps.name || 'ws'}-wrapper`, role: role, tabIndex: tabIndex, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, title: title }, h("slot", { part: slotProps.name || 'ws-inner', ...slotProps }, children)));

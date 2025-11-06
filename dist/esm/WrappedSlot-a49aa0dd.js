import { h } from './index-9177bb6d.js';

/**
 * Helper component that unifies slot wrapping across the project
 */
const WrappedSlot = ({ wrapperClass, ...slotProps }, children) => (h("div", { class: wrapperClass, part: `${slotProps.name || 'ws'}-wrapper` },
  h("slot", { part: slotProps.name || 'ws-inner', ...slotProps }, children)));

export { WrappedSlot as W };

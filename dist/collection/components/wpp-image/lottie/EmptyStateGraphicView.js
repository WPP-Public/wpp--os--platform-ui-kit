import { h, Host } from '@stencil/core';
import { EMPTY_STATE_CONTAINER_CLASS, EMPTY_STATE_DEFAULT_SIZE, SHADOW_TINT_FILTER_ID } from './const';
/**
 * Markup shared by all 12 wpp-empty-* components.
 *
 * The animation container is always rendered at the final size, and the
 * skeleton sits on top of it while loading - so the swap cannot shift layout.
 */
export const EmptyStateGraphicView = ({ graphic, name, width, height, }) => {
  // Same arithmetic the static graphics used: width falls back to the default,
  // height falls back to width.
  const boxWidth = width || EMPTY_STATE_DEFAULT_SIZE;
  const boxHeight = height || boxWidth;
  const size = { width: `${boxWidth}px`, height: `${boxHeight}px` };
  return (h(Host, { class: { 'wpp-image': true, [name]: true }, style: graphic.hostStyle }, h("div", { key: "empty-state-animation", class: EMPTY_STATE_CONTAINER_CLASS, style: size, "aria-hidden": "true", ref: graphic.setContainer }), graphic.status === 'loading' && (h("wpp-skeleton-v4-4-0", { class: "wpp-empty-state-skeleton", variant: "rectangle", width: boxWidth, height: boxHeight })), graphic.shadowColorToken && (h("svg", { class: "wpp-empty-state-defs", "aria-hidden": "true", focusable: "false" }, h("filter", { id: SHADOW_TINT_FILTER_ID, "color-interpolation-filters": "sRGB" }, h("feFlood", { class: "wpp-empty-state-tint", result: "tint" }), h("feComposite", { in: "tint", in2: "SourceAlpha", operator: "in" }))))));
};

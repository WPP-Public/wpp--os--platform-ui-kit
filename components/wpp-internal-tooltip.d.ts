import type { Components, JSX } from "../dist/types/components";

interface WppInternalTooltip extends Components.WppInternalTooltip, HTMLElement {}
export const WppInternalTooltip: {
  prototype: WppInternalTooltip;
  new (): WppInternalTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppTooltip extends Components.WppTooltip, HTMLElement {}
export const WppTooltip: {
  prototype: WppTooltip;
  new (): WppTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

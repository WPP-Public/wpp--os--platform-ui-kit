import type { Components, JSX } from "../dist/types/components";

interface WppPill extends Components.WppPill, HTMLElement {}
export const WppPill: {
  prototype: WppPill;
  new (): WppPill;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconMerge extends Components.WppIconMerge, HTMLElement {}
export const WppIconMerge: {
  prototype: WppIconMerge;
  new (): WppIconMerge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

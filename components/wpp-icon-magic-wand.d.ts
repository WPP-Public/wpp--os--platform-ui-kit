import type { Components, JSX } from "../dist/types/components";

interface WppIconMagicWand extends Components.WppIconMagicWand, HTMLElement {}
export const WppIconMagicWand: {
  prototype: WppIconMagicWand;
  new (): WppIconMagicWand;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

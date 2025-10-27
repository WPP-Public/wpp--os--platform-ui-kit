import type { Components, JSX } from "../dist/types/components";

interface WppIconFont extends Components.WppIconFont, HTMLElement {}
export const WppIconFont: {
  prototype: WppIconFont;
  new (): WppIconFont;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconLike extends Components.WppIconLike, HTMLElement {}
export const WppIconLike: {
  prototype: WppIconLike;
  new (): WppIconLike;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

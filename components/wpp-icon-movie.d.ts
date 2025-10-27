import type { Components, JSX } from "../dist/types/components";

interface WppIconMovie extends Components.WppIconMovie, HTMLElement {}
export const WppIconMovie: {
  prototype: WppIconMovie;
  new (): WppIconMovie;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

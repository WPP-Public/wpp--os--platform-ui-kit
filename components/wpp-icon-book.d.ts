import type { Components, JSX } from "../dist/types/components";

interface WppIconBook extends Components.WppIconBook, HTMLElement {}
export const WppIconBook: {
  prototype: WppIconBook;
  new (): WppIconBook;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

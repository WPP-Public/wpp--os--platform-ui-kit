import type { Components, JSX } from "../dist/types/components";

interface WppIconCollection extends Components.WppIconCollection, HTMLElement {}
export const WppIconCollection: {
  prototype: WppIconCollection;
  new (): WppIconCollection;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

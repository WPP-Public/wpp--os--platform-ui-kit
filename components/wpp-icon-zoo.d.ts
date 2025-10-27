import type { Components, JSX } from "../dist/types/components";

interface WppIconZoo extends Components.WppIconZoo, HTMLElement {}
export const WppIconZoo: {
  prototype: WppIconZoo;
  new (): WppIconZoo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

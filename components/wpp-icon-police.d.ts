import type { Components, JSX } from "../dist/types/components";

interface WppIconPolice extends Components.WppIconPolice, HTMLElement {}
export const WppIconPolice: {
  prototype: WppIconPolice;
  new (): WppIconPolice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

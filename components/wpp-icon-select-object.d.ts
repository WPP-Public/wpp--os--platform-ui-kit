import type { Components, JSX } from "../dist/types/components";

interface WppIconSelectObject extends Components.WppIconSelectObject, HTMLElement {}
export const WppIconSelectObject: {
  prototype: WppIconSelectObject;
  new (): WppIconSelectObject;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconShapes extends Components.WppIconShapes, HTMLElement {}
export const WppIconShapes: {
  prototype: WppIconShapes;
  new (): WppIconShapes;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

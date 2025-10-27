import type { Components, JSX } from "../dist/types/components";

interface WppIconOrientation extends Components.WppIconOrientation, HTMLElement {}
export const WppIconOrientation: {
  prototype: WppIconOrientation;
  new (): WppIconOrientation;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

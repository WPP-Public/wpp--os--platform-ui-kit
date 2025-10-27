import type { Components, JSX } from "../dist/types/components";

interface WppIconCube extends Components.WppIconCube, HTMLElement {}
export const WppIconCube: {
  prototype: WppIconCube;
  new (): WppIconCube;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconLocation extends Components.WppIconLocation, HTMLElement {}
export const WppIconLocation: {
  prototype: WppIconLocation;
  new (): WppIconLocation;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

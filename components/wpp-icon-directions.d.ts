import type { Components, JSX } from "../dist/types/components";

interface WppIconDirections extends Components.WppIconDirections, HTMLElement {}
export const WppIconDirections: {
  prototype: WppIconDirections;
  new (): WppIconDirections;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

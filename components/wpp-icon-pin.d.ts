import type { Components, JSX } from "../dist/types/components";

interface WppIconPin extends Components.WppIconPin, HTMLElement {}
export const WppIconPin: {
  prototype: WppIconPin;
  new (): WppIconPin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

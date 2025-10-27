import type { Components, JSX } from "../dist/types/components";

interface WppIconSwatch extends Components.WppIconSwatch, HTMLElement {}
export const WppIconSwatch: {
  prototype: WppIconSwatch;
  new (): WppIconSwatch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

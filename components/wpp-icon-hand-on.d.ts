import type { Components, JSX } from "../dist/types/components";

interface WppIconHandOn extends Components.WppIconHandOn, HTMLElement {}
export const WppIconHandOn: {
  prototype: WppIconHandOn;
  new (): WppIconHandOn;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

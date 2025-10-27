import type { Components, JSX } from "../dist/types/components";

interface WppIconBank extends Components.WppIconBank, HTMLElement {}
export const WppIconBank: {
  prototype: WppIconBank;
  new (): WppIconBank;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

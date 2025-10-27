import type { Components, JSX } from "../dist/types/components";

interface WppIconSymbols extends Components.WppIconSymbols, HTMLElement {}
export const WppIconSymbols: {
  prototype: WppIconSymbols;
  new (): WppIconSymbols;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

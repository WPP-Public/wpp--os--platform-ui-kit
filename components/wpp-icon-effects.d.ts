import type { Components, JSX } from "../dist/types/components";

interface WppIconEffects extends Components.WppIconEffects, HTMLElement {}
export const WppIconEffects: {
  prototype: WppIconEffects;
  new (): WppIconEffects;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppStep extends Components.WppStep, HTMLElement {}
export const WppStep: {
  prototype: WppStep;
  new (): WppStep;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

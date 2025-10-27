import type { Components, JSX } from "../dist/types/components";

interface WppStepper extends Components.WppStepper, HTMLElement {}
export const WppStepper: {
  prototype: WppStepper;
  new (): WppStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

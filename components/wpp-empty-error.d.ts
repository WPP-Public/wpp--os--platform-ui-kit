import type { Components, JSX } from "../dist/types/components";

interface WppEmptyError extends Components.WppEmptyError, HTMLElement {}
export const WppEmptyError: {
  prototype: WppEmptyError;
  new (): WppEmptyError;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

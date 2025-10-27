import type { Components, JSX } from "../dist/types/components";

interface WppTextareaInput extends Components.WppTextareaInput, HTMLElement {}
export const WppTextareaInput: {
  prototype: WppTextareaInput;
  new (): WppTextareaInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

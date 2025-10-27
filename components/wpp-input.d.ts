import type { Components, JSX } from "../dist/types/components";

interface WppInput extends Components.WppInput, HTMLElement {}
export const WppInput: {
  prototype: WppInput;
  new (): WppInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

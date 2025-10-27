import type { Components, JSX } from "../dist/types/components";

interface WppIconEditText extends Components.WppIconEditText, HTMLElement {}
export const WppIconEditText: {
  prototype: WppIconEditText;
  new (): WppIconEditText;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

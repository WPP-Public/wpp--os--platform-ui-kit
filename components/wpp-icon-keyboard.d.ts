import type { Components, JSX } from "../dist/types/components";

interface WppIconKeyboard extends Components.WppIconKeyboard, HTMLElement {}
export const WppIconKeyboard: {
  prototype: WppIconKeyboard;
  new (): WppIconKeyboard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconAdmin extends Components.WppIconAdmin, HTMLElement {}
export const WppIconAdmin: {
  prototype: WppIconAdmin;
  new (): WppIconAdmin;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

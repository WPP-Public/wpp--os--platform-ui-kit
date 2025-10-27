import type { Components, JSX } from "../dist/types/components";

interface WppIconHub extends Components.WppIconHub, HTMLElement {}
export const WppIconHub: {
  prototype: WppIconHub;
  new (): WppIconHub;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

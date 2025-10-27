import type { Components, JSX } from "../dist/types/components";

interface WppIconCompose extends Components.WppIconCompose, HTMLElement {}
export const WppIconCompose: {
  prototype: WppIconCompose;
  new (): WppIconCompose;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

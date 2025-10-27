import type { Components, JSX } from "../dist/types/components";

interface WppIconSubscribe extends Components.WppIconSubscribe, HTMLElement {}
export const WppIconSubscribe: {
  prototype: WppIconSubscribe;
  new (): WppIconSubscribe;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconPending extends Components.WppIconPending, HTMLElement {}
export const WppIconPending: {
  prototype: WppIconPending;
  new (): WppIconPending;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconOwner extends Components.WppIconOwner, HTMLElement {}
export const WppIconOwner: {
  prototype: WppIconOwner;
  new (): WppIconOwner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

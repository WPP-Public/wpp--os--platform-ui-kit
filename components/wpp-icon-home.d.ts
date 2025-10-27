import type { Components, JSX } from "../dist/types/components";

interface WppIconHome extends Components.WppIconHome, HTMLElement {}
export const WppIconHome: {
  prototype: WppIconHome;
  new (): WppIconHome;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

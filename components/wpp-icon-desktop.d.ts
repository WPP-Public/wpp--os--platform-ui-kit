import type { Components, JSX } from "../dist/types/components";

interface WppIconDesktop extends Components.WppIconDesktop, HTMLElement {}
export const WppIconDesktop: {
  prototype: WppIconDesktop;
  new (): WppIconDesktop;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

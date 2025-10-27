import type { Components, JSX } from "../dist/types/components";

interface WppIconAtm extends Components.WppIconAtm, HTMLElement {}
export const WppIconAtm: {
  prototype: WppIconAtm;
  new (): WppIconAtm;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

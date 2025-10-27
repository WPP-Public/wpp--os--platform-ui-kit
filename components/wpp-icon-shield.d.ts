import type { Components, JSX } from "../dist/types/components";

interface WppIconShield extends Components.WppIconShield, HTMLElement {}
export const WppIconShield: {
  prototype: WppIconShield;
  new (): WppIconShield;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

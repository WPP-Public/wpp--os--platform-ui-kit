import type { Components, JSX } from "../dist/types/components";

interface WppIconShip extends Components.WppIconShip, HTMLElement {}
export const WppIconShip: {
  prototype: WppIconShip;
  new (): WppIconShip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

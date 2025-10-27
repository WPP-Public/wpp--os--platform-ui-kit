import type { Components, JSX } from "../dist/types/components";

interface WppIconTick extends Components.WppIconTick, HTMLElement {}
export const WppIconTick: {
  prototype: WppIconTick;
  new (): WppIconTick;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

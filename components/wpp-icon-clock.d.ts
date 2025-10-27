import type { Components, JSX } from "../dist/types/components";

interface WppIconClock extends Components.WppIconClock, HTMLElement {}
export const WppIconClock: {
  prototype: WppIconClock;
  new (): WppIconClock;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

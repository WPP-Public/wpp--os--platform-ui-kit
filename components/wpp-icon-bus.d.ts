import type { Components, JSX } from "../dist/types/components";

interface WppIconBus extends Components.WppIconBus, HTMLElement {}
export const WppIconBus: {
  prototype: WppIconBus;
  new (): WppIconBus;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

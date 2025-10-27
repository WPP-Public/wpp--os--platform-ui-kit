import type { Components, JSX } from "../dist/types/components";

interface WppIconEvent extends Components.WppIconEvent, HTMLElement {}
export const WppIconEvent: {
  prototype: WppIconEvent;
  new (): WppIconEvent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

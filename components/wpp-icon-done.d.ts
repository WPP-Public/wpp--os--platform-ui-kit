import type { Components, JSX } from "../dist/types/components";

interface WppIconDone extends Components.WppIconDone, HTMLElement {}
export const WppIconDone: {
  prototype: WppIconDone;
  new (): WppIconDone;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

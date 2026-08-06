import type { Components, JSX } from "../dist/types/components";

interface WppIconFrame extends Components.WppIconFrame, HTMLElement {}
export const WppIconFrame: {
  prototype: WppIconFrame;
  new (): WppIconFrame;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

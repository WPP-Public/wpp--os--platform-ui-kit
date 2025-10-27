import type { Components, JSX } from "../dist/types/components";

interface WppIconReject extends Components.WppIconReject, HTMLElement {}
export const WppIconReject: {
  prototype: WppIconReject;
  new (): WppIconReject;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

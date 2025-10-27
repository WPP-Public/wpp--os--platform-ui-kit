import type { Components, JSX } from "../dist/types/components";

interface WppIconTarget extends Components.WppIconTarget, HTMLElement {}
export const WppIconTarget: {
  prototype: WppIconTarget;
  new (): WppIconTarget;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

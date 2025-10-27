import type { Components, JSX } from "../dist/types/components";

interface WppIconAction extends Components.WppIconAction, HTMLElement {}
export const WppIconAction: {
  prototype: WppIconAction;
  new (): WppIconAction;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

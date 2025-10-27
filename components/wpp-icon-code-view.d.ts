import type { Components, JSX } from "../dist/types/components";

interface WppIconCodeView extends Components.WppIconCodeView, HTMLElement {}
export const WppIconCodeView: {
  prototype: WppIconCodeView;
  new (): WppIconCodeView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

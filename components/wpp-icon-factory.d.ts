import type { Components, JSX } from "../dist/types/components";

interface WppIconFactory extends Components.WppIconFactory, HTMLElement {}
export const WppIconFactory: {
  prototype: WppIconFactory;
  new (): WppIconFactory;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

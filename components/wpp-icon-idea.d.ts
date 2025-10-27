import type { Components, JSX } from "../dist/types/components";

interface WppIconIdea extends Components.WppIconIdea, HTMLElement {}
export const WppIconIdea: {
  prototype: WppIconIdea;
  new (): WppIconIdea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconColour extends Components.WppIconColour, HTMLElement {}
export const WppIconColour: {
  prototype: WppIconColour;
  new (): WppIconColour;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconAccordion extends Components.WppIconAccordion, HTMLElement {}
export const WppIconAccordion: {
  prototype: WppIconAccordion;
  new (): WppIconAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppAccordion extends Components.WppAccordion, HTMLElement {}
export const WppAccordion: {
  prototype: WppAccordion;
  new (): WppAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

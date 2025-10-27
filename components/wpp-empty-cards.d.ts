import type { Components, JSX } from "../dist/types/components";

interface WppEmptyCards extends Components.WppEmptyCards, HTMLElement {}
export const WppEmptyCards: {
  prototype: WppEmptyCards;
  new (): WppEmptyCards;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

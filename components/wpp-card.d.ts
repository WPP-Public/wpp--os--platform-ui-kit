import type { Components, JSX } from "../dist/types/components";

interface WppCard extends Components.WppCard, HTMLElement {}
export const WppCard: {
  prototype: WppCard;
  new (): WppCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

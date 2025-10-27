import type { Components, JSX } from "../dist/types/components";

interface WppExpandableCard extends Components.WppExpandableCard, HTMLElement {}
export const WppExpandableCard: {
  prototype: WppExpandableCard;
  new (): WppExpandableCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

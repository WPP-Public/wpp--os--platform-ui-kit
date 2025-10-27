import type { Components, JSX } from "../dist/types/components";

interface WppIconMention extends Components.WppIconMention, HTMLElement {}
export const WppIconMention: {
  prototype: WppIconMention;
  new (): WppIconMention;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

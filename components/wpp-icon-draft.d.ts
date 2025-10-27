import type { Components, JSX } from "../dist/types/components";

interface WppIconDraft extends Components.WppIconDraft, HTMLElement {}
export const WppIconDraft: {
  prototype: WppIconDraft;
  new (): WppIconDraft;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

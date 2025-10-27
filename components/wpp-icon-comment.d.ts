import type { Components, JSX } from "../dist/types/components";

interface WppIconComment extends Components.WppIconComment, HTMLElement {}
export const WppIconComment: {
  prototype: WppIconComment;
  new (): WppIconComment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

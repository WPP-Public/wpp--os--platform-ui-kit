import type { Components, JSX } from "../dist/types/components";

interface WppIconPost extends Components.WppIconPost, HTMLElement {}
export const WppIconPost: {
  prototype: WppIconPost;
  new (): WppIconPost;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

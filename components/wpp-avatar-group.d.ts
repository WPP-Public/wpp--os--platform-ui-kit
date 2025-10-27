import type { Components, JSX } from "../dist/types/components";

interface WppAvatarGroup extends Components.WppAvatarGroup, HTMLElement {}
export const WppAvatarGroup: {
  prototype: WppAvatarGroup;
  new (): WppAvatarGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

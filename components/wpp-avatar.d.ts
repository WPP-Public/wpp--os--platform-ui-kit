import type { Components, JSX } from "../dist/types/components";

interface WppAvatar extends Components.WppAvatar, HTMLElement {}
export const WppAvatar: {
  prototype: WppAvatar;
  new (): WppAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

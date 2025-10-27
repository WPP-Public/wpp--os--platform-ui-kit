import type { Components, JSX } from "../dist/types/components";

interface WppIconUser extends Components.WppIconUser, HTMLElement {}
export const WppIconUser: {
  prototype: WppIconUser;
  new (): WppIconUser;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

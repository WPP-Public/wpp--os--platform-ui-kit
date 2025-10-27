import type { Components, JSX } from "../dist/types/components";

interface WppIconMail extends Components.WppIconMail, HTMLElement {}
export const WppIconMail: {
  prototype: WppIconMail;
  new (): WppIconMail;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

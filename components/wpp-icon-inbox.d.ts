import type { Components, JSX } from "../dist/types/components";

interface WppIconInbox extends Components.WppIconInbox, HTMLElement {}
export const WppIconInbox: {
  prototype: WppIconInbox;
  new (): WppIconInbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

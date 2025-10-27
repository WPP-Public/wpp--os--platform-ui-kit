import type { Components, JSX } from "../dist/types/components";

interface WppIconNotification extends Components.WppIconNotification, HTMLElement {}
export const WppIconNotification: {
  prototype: WppIconNotification;
  new (): WppIconNotification;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

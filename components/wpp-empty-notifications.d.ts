import type { Components, JSX } from "../dist/types/components";

interface WppEmptyNotifications extends Components.WppEmptyNotifications, HTMLElement {}
export const WppEmptyNotifications: {
  prototype: WppEmptyNotifications;
  new (): WppEmptyNotifications;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

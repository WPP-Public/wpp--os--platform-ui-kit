import type { Components, JSX } from "../dist/types/components";

interface WppEmptyNoAccess extends Components.WppEmptyNoAccess, HTMLElement {}
export const WppEmptyNoAccess: {
  prototype: WppEmptyNoAccess;
  new (): WppEmptyNoAccess;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

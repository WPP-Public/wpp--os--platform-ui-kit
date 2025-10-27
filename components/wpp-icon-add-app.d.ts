import type { Components, JSX } from "../dist/types/components";

interface WppIconAddApp extends Components.WppIconAddApp, HTMLElement {}
export const WppIconAddApp: {
  prototype: WppIconAddApp;
  new (): WppIconAddApp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

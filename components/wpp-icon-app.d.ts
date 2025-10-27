import type { Components, JSX } from "../dist/types/components";

interface WppIconApp extends Components.WppIconApp, HTMLElement {}
export const WppIconApp: {
  prototype: WppIconApp;
  new (): WppIconApp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

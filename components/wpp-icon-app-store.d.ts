import type { Components, JSX } from "../dist/types/components";

interface WppIconAppStore extends Components.WppIconAppStore, HTMLElement {}
export const WppIconAppStore: {
  prototype: WppIconAppStore;
  new (): WppIconAppStore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

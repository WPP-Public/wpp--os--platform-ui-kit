import type { Components, JSX } from "../dist/types/components";

interface WppIconSync extends Components.WppIconSync, HTMLElement {}
export const WppIconSync: {
  prototype: WppIconSync;
  new (): WppIconSync;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

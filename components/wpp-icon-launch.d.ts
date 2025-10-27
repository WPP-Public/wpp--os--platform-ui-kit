import type { Components, JSX } from "../dist/types/components";

interface WppIconLaunch extends Components.WppIconLaunch, HTMLElement {}
export const WppIconLaunch: {
  prototype: WppIconLaunch;
  new (): WppIconLaunch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

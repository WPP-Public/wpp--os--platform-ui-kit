import type { Components, JSX } from "../dist/types/components";

interface WppIconLive extends Components.WppIconLive, HTMLElement {}
export const WppIconLive: {
  prototype: WppIconLive;
  new (): WppIconLive;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

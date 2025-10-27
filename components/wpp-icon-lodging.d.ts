import type { Components, JSX } from "../dist/types/components";

interface WppIconLodging extends Components.WppIconLodging, HTMLElement {}
export const WppIconLodging: {
  prototype: WppIconLodging;
  new (): WppIconLodging;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

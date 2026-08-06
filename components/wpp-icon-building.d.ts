import type { Components, JSX } from "../dist/types/components";

interface WppIconBuilding extends Components.WppIconBuilding, HTMLElement {}
export const WppIconBuilding: {
  prototype: WppIconBuilding;
  new (): WppIconBuilding;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

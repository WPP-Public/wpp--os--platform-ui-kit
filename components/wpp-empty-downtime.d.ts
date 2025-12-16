import type { Components, JSX } from "../dist/types/components";

interface WppEmptyDowntime extends Components.WppEmptyDowntime, HTMLElement {}
export const WppEmptyDowntime: {
  prototype: WppEmptyDowntime;
  new (): WppEmptyDowntime;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

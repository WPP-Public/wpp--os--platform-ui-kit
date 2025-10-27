import type { Components, JSX } from "../dist/types/components";

interface WppIconFilter extends Components.WppIconFilter, HTMLElement {}
export const WppIconFilter: {
  prototype: WppIconFilter;
  new (): WppIconFilter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

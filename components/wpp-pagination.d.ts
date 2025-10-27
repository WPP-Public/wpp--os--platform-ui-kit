import type { Components, JSX } from "../dist/types/components";

interface WppPagination extends Components.WppPagination, HTMLElement {}
export const WppPagination: {
  prototype: WppPagination;
  new (): WppPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

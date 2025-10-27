import type { Components, JSX } from "../dist/types/components";

interface WppPaginationSelect extends Components.WppPaginationSelect, HTMLElement {}
export const WppPaginationSelect: {
  prototype: WppPaginationSelect;
  new (): WppPaginationSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

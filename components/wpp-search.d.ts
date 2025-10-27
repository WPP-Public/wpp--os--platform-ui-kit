import type { Components, JSX } from "../dist/types/components";

interface WppSearch extends Components.WppSearch, HTMLElement {}
export const WppSearch: {
  prototype: WppSearch;
  new (): WppSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

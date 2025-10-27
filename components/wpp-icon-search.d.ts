import type { Components, JSX } from "../dist/types/components";

interface WppIconSearch extends Components.WppIconSearch, HTMLElement {}
export const WppIconSearch: {
  prototype: WppIconSearch;
  new (): WppIconSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

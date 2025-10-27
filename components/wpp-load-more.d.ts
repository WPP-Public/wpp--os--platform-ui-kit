import type { Components, JSX } from "../dist/types/components";

interface WppLoadMore extends Components.WppLoadMore, HTMLElement {}
export const WppLoadMore: {
  prototype: WppLoadMore;
  new (): WppLoadMore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

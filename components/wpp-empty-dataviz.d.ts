import type { Components, JSX } from "../dist/types/components";

interface WppEmptyDataviz extends Components.WppEmptyDataviz, HTMLElement {}
export const WppEmptyDataviz: {
  prototype: WppEmptyDataviz;
  new (): WppEmptyDataviz;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

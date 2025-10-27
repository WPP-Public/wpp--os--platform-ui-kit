import type { Components, JSX } from "../dist/types/components";

interface WppIconHistory extends Components.WppIconHistory, HTMLElement {}
export const WppIconHistory: {
  prototype: WppIconHistory;
  new (): WppIconHistory;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

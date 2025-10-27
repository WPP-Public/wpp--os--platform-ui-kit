import type { Components, JSX } from "../dist/types/components";

interface WppIconRanking extends Components.WppIconRanking, HTMLElement {}
export const WppIconRanking: {
  prototype: WppIconRanking;
  new (): WppIconRanking;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

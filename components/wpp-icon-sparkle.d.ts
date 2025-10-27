import type { Components, JSX } from "../dist/types/components";

interface WppIconSparkle extends Components.WppIconSparkle, HTMLElement {}
export const WppIconSparkle: {
  prototype: WppIconSparkle;
  new (): WppIconSparkle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

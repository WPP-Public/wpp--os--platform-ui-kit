import type { Components, JSX } from "../dist/types/components";

interface WppIconStyleguide extends Components.WppIconStyleguide, HTMLElement {}
export const WppIconStyleguide: {
  prototype: WppIconStyleguide;
  new (): WppIconStyleguide;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

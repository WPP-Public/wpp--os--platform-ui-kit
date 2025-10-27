import type { Components, JSX } from "../dist/types/components";

interface WppIconAi extends Components.WppIconAi, HTMLElement {}
export const WppIconAi: {
  prototype: WppIconAi;
  new (): WppIconAi;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

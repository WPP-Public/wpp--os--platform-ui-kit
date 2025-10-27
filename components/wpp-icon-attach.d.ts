import type { Components, JSX } from "../dist/types/components";

interface WppIconAttach extends Components.WppIconAttach, HTMLElement {}
export const WppIconAttach: {
  prototype: WppIconAttach;
  new (): WppIconAttach;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

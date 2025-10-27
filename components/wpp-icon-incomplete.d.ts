import type { Components, JSX } from "../dist/types/components";

interface WppIconIncomplete extends Components.WppIconIncomplete, HTMLElement {}
export const WppIconIncomplete: {
  prototype: WppIconIncomplete;
  new (): WppIconIncomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

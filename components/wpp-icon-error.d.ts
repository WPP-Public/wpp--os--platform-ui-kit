import type { Components, JSX } from "../dist/types/components";

interface WppIconError extends Components.WppIconError, HTMLElement {}
export const WppIconError: {
  prototype: WppIconError;
  new (): WppIconError;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

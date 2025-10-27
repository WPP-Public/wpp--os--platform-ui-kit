import type { Components, JSX } from "../dist/types/components";

interface WppIconCase extends Components.WppIconCase, HTMLElement {}
export const WppIconCase: {
  prototype: WppIconCase;
  new (): WppIconCase;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

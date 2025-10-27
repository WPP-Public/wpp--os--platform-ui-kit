import type { Components, JSX } from "../dist/types/components";

interface WppIconHelp extends Components.WppIconHelp, HTMLElement {}
export const WppIconHelp: {
  prototype: WppIconHelp;
  new (): WppIconHelp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

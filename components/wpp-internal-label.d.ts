import type { Components, JSX } from "../dist/types/components";

interface WppInternalLabel extends Components.WppInternalLabel, HTMLElement {}
export const WppInternalLabel: {
  prototype: WppInternalLabel;
  new (): WppInternalLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

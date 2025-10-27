import type { Components, JSX } from "../dist/types/components";

interface WppPopover extends Components.WppPopover, HTMLElement {}
export const WppPopover: {
  prototype: WppPopover;
  new (): WppPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

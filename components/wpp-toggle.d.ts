import type { Components, JSX } from "../dist/types/components";

interface WppToggle extends Components.WppToggle, HTMLElement {}
export const WppToggle: {
  prototype: WppToggle;
  new (): WppToggle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

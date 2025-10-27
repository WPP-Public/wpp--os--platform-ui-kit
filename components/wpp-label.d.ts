import type { Components, JSX } from "../dist/types/components";

interface WppLabel extends Components.WppLabel, HTMLElement {}
export const WppLabel: {
  prototype: WppLabel;
  new (): WppLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

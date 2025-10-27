import type { Components, JSX } from "../dist/types/components";

interface WppSegmentedControl extends Components.WppSegmentedControl, HTMLElement {}
export const WppSegmentedControl: {
  prototype: WppSegmentedControl;
  new (): WppSegmentedControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

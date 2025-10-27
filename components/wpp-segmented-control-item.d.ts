import type { Components, JSX } from "../dist/types/components";

interface WppSegmentedControlItem extends Components.WppSegmentedControlItem, HTMLElement {}
export const WppSegmentedControlItem: {
  prototype: WppSegmentedControlItem;
  new (): WppSegmentedControlItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppPillGroup extends Components.WppPillGroup, HTMLElement {}
export const WppPillGroup: {
  prototype: WppPillGroup;
  new (): WppPillGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

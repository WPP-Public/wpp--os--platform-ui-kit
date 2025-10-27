import type { Components, JSX } from "../dist/types/components";

interface WppCardGroup extends Components.WppCardGroup, HTMLElement {}
export const WppCardGroup: {
  prototype: WppCardGroup;
  new (): WppCardGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

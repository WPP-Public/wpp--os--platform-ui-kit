import type { Components, JSX } from "../dist/types/components";

interface WppTab extends Components.WppTab, HTMLElement {}
export const WppTab: {
  prototype: WppTab;
  new (): WppTab;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

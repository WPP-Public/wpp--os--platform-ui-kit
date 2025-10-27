import type { Components, JSX } from "../dist/types/components";

interface WppIconBranch extends Components.WppIconBranch, HTMLElement {}
export const WppIconBranch: {
  prototype: WppIconBranch;
  new (): WppIconBranch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

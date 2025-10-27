import type { Components, JSX } from "../dist/types/components";

interface WppSkeleton extends Components.WppSkeleton, HTMLElement {}
export const WppSkeleton: {
  prototype: WppSkeleton;
  new (): WppSkeleton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

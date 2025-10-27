import type { Components, JSX } from "../dist/types/components";

interface WppBreadcrumb extends Components.WppBreadcrumb, HTMLElement {}
export const WppBreadcrumb: {
  prototype: WppBreadcrumb;
  new (): WppBreadcrumb;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

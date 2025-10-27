import type { Components, JSX } from "../dist/types/components";

interface WppIconExport extends Components.WppIconExport, HTMLElement {}
export const WppIconExport: {
  prototype: WppIconExport;
  new (): WppIconExport;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

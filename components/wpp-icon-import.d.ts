import type { Components, JSX } from "../dist/types/components";

interface WppIconImport extends Components.WppIconImport, HTMLElement {}
export const WppIconImport: {
  prototype: WppIconImport;
  new (): WppIconImport;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

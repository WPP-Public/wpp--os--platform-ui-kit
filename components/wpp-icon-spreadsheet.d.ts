import type { Components, JSX } from "../dist/types/components";

interface WppIconSpreadsheet extends Components.WppIconSpreadsheet, HTMLElement {}
export const WppIconSpreadsheet: {
  prototype: WppIconSpreadsheet;
  new (): WppIconSpreadsheet;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

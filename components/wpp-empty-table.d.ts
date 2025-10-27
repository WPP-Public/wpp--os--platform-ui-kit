import type { Components, JSX } from "../dist/types/components";

interface WppEmptyTable extends Components.WppEmptyTable, HTMLElement {}
export const WppEmptyTable: {
  prototype: WppEmptyTable;
  new (): WppEmptyTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

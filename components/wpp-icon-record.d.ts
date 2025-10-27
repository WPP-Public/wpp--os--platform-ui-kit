import type { Components, JSX } from "../dist/types/components";

interface WppIconRecord extends Components.WppIconRecord, HTMLElement {}
export const WppIconRecord: {
  prototype: WppIconRecord;
  new (): WppIconRecord;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

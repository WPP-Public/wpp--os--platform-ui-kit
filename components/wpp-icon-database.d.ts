import type { Components, JSX } from "../dist/types/components";

interface WppIconDatabase extends Components.WppIconDatabase, HTMLElement {}
export const WppIconDatabase: {
  prototype: WppIconDatabase;
  new (): WppIconDatabase;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

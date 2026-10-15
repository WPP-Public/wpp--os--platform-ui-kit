import type { Components, JSX } from "../dist/types/components";

interface WppIconJson extends Components.WppIconJson, HTMLElement {}
export const WppIconJson: {
  prototype: WppIconJson;
  new (): WppIconJson;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

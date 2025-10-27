import type { Components, JSX } from "../dist/types/components";

interface WppEmptyContent extends Components.WppEmptyContent, HTMLElement {}
export const WppEmptyContent: {
  prototype: WppEmptyContent;
  new (): WppEmptyContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

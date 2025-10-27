import type { Components, JSX } from "../dist/types/components";

interface WppQuillStyles extends Components.WppQuillStyles, HTMLElement {}
export const WppQuillStyles: {
  prototype: WppQuillStyles;
  new (): WppQuillStyles;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

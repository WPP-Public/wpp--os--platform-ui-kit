import type { Components, JSX } from "../dist/types/components";

interface WppRichtextCommonStyles extends Components.WppRichtextCommonStyles, HTMLElement {}
export const WppRichtextCommonStyles: {
  prototype: WppRichtextCommonStyles;
  new (): WppRichtextCommonStyles;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

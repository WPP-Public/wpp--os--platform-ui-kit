import type { Components, JSX } from "../dist/types/components";

interface WppRichtextHtml extends Components.WppRichtextHtml, HTMLElement {}
export const WppRichtextHtml: {
  prototype: WppRichtextHtml;
  new (): WppRichtextHtml;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

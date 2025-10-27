import type { Components, JSX } from "../dist/types/components";

interface WppIconDocument extends Components.WppIconDocument, HTMLElement {}
export const WppIconDocument: {
  prototype: WppIconDocument;
  new (): WppIconDocument;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

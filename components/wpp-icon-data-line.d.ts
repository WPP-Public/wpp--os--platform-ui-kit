import type { Components, JSX } from "../dist/types/components";

interface WppIconDataLine extends Components.WppIconDataLine, HTMLElement {}
export const WppIconDataLine: {
  prototype: WppIconDataLine;
  new (): WppIconDataLine;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

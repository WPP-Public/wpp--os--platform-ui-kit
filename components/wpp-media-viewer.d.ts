import type { Components, JSX } from "../dist/types/components";

interface WppMediaViewer extends Components.WppMediaViewer, HTMLElement {}
export const WppMediaViewer: {
  prototype: WppMediaViewer;
  new (): WppMediaViewer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

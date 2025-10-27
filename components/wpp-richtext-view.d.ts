import type { Components, JSX } from "../dist/types/components";

interface WppRichtextView extends Components.WppRichtextView, HTMLElement {}
export const WppRichtextView: {
  prototype: WppRichtextView;
  new (): WppRichtextView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconSticker extends Components.WppIconSticker, HTMLElement {}
export const WppIconSticker: {
  prototype: WppIconSticker;
  new (): WppIconSticker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconMap extends Components.WppIconMap, HTMLElement {}
export const WppIconMap: {
  prototype: WppIconMap;
  new (): WppIconMap;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

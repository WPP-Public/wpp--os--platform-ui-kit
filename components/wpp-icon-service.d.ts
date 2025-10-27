import type { Components, JSX } from "../dist/types/components";

interface WppIconService extends Components.WppIconService, HTMLElement {}
export const WppIconService: {
  prototype: WppIconService;
  new (): WppIconService;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

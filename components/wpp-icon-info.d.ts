import type { Components, JSX } from "../dist/types/components";

interface WppIconInfo extends Components.WppIconInfo, HTMLElement {}
export const WppIconInfo: {
  prototype: WppIconInfo;
  new (): WppIconInfo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

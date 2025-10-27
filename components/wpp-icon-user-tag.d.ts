import type { Components, JSX } from "../dist/types/components";

interface WppIconUserTag extends Components.WppIconUserTag, HTMLElement {}
export const WppIconUserTag: {
  prototype: WppIconUserTag;
  new (): WppIconUserTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

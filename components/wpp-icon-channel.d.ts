import type { Components, JSX } from "../dist/types/components";

interface WppIconChannel extends Components.WppIconChannel, HTMLElement {}
export const WppIconChannel: {
  prototype: WppIconChannel;
  new (): WppIconChannel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppIconReply extends Components.WppIconReply, HTMLElement {}
export const WppIconReply: {
  prototype: WppIconReply;
  new (): WppIconReply;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

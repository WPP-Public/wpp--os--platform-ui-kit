import type { Components, JSX } from "../dist/types/components";

interface WppInlineMessage extends Components.WppInlineMessage, HTMLElement {}
export const WppInlineMessage: {
  prototype: WppInlineMessage;
  new (): WppInlineMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

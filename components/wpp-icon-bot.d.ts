import type { Components, JSX } from "../dist/types/components";

interface WppIconBot extends Components.WppIconBot, HTMLElement {}
export const WppIconBot: {
  prototype: WppIconBot;
  new (): WppIconBot;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

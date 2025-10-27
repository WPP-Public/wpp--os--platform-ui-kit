import type { Components, JSX } from "../dist/types/components";

interface WppIconAssistant extends Components.WppIconAssistant, HTMLElement {}
export const WppIconAssistant: {
  prototype: WppIconAssistant;
  new (): WppIconAssistant;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

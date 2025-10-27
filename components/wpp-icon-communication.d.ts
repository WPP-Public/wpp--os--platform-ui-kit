import type { Components, JSX } from "../dist/types/components";

interface WppIconCommunication extends Components.WppIconCommunication, HTMLElement {}
export const WppIconCommunication: {
  prototype: WppIconCommunication;
  new (): WppIconCommunication;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

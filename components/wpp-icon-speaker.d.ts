import type { Components, JSX } from "../dist/types/components";

interface WppIconSpeaker extends Components.WppIconSpeaker, HTMLElement {}
export const WppIconSpeaker: {
  prototype: WppIconSpeaker;
  new (): WppIconSpeaker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

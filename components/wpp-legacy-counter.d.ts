import type { Components, JSX } from "../dist/types/components";

interface WppLegacyCounter extends Components.WppLegacyCounter, HTMLElement {}
export const WppLegacyCounter: {
  prototype: WppLegacyCounter;
  new (): WppLegacyCounter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

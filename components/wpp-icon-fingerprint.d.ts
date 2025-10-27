import type { Components, JSX } from "../dist/types/components";

interface WppIconFingerprint extends Components.WppIconFingerprint, HTMLElement {}
export const WppIconFingerprint: {
  prototype: WppIconFingerprint;
  new (): WppIconFingerprint;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

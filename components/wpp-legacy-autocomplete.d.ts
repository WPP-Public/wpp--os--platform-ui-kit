import type { Components, JSX } from "../dist/types/components";

interface WppLegacyAutocomplete extends Components.WppLegacyAutocomplete, HTMLElement {}
export const WppLegacyAutocomplete: {
  prototype: WppLegacyAutocomplete;
  new (): WppLegacyAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

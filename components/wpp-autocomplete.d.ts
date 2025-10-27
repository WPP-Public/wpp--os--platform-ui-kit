import type { Components, JSX } from "../dist/types/components";

interface WppAutocomplete extends Components.WppAutocomplete, HTMLElement {}
export const WppAutocomplete: {
  prototype: WppAutocomplete;
  new (): WppAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

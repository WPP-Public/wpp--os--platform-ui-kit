import type { Components, JSX } from "../dist/types/components";

interface WppIconBookInformation extends Components.WppIconBookInformation, HTMLElement {}
export const WppIconBookInformation: {
  prototype: WppIconBookInformation;
  new (): WppIconBookInformation;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

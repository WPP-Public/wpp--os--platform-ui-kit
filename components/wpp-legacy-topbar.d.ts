import type { Components, JSX } from "../dist/types/components";

interface WppLegacyTopbar extends Components.WppLegacyTopbar, HTMLElement {}
export const WppLegacyTopbar: {
  prototype: WppLegacyTopbar;
  new (): WppLegacyTopbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

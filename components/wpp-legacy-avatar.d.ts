import type { Components, JSX } from "../dist/types/components";

interface WppLegacyAvatar extends Components.WppLegacyAvatar, HTMLElement {}
export const WppLegacyAvatar: {
  prototype: WppLegacyAvatar;
  new (): WppLegacyAvatar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

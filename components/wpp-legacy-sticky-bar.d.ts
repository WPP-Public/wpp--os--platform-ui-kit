import type { Components, JSX } from "../dist/types/components";

interface WppLegacyStickyBar extends Components.WppLegacyStickyBar, HTMLElement {}
export const WppLegacyStickyBar: {
  prototype: WppLegacyStickyBar;
  new (): WppLegacyStickyBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

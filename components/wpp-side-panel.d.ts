import type { Components, JSX } from "../dist/types/components";

interface WppSidePanel extends Components.WppSidePanel, HTMLElement {}
export const WppSidePanel: {
  prototype: WppSidePanel;
  new (): WppSidePanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

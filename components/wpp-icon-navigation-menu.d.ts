import type { Components, JSX } from "../dist/types/components";

interface WppIconNavigationMenu extends Components.WppIconNavigationMenu, HTMLElement {}
export const WppIconNavigationMenu: {
  prototype: WppIconNavigationMenu;
  new (): WppIconNavigationMenu;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

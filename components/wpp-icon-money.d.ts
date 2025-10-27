import type { Components, JSX } from "../dist/types/components";

interface WppIconMoney extends Components.WppIconMoney, HTMLElement {}
export const WppIconMoney: {
  prototype: WppIconMoney;
  new (): WppIconMoney;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppEmptyNoConnection extends Components.WppEmptyNoConnection, HTMLElement {}
export const WppEmptyNoConnection: {
  prototype: WppEmptyNoConnection;
  new (): WppEmptyNoConnection;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

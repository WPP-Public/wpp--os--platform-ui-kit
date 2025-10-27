import type { Components, JSX } from "../dist/types/components";

interface WppIconBoard extends Components.WppIconBoard, HTMLElement {}
export const WppIconBoard: {
  prototype: WppIconBoard;
  new (): WppIconBoard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

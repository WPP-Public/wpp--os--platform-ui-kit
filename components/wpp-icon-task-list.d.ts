import type { Components, JSX } from "../dist/types/components";

interface WppIconTaskList extends Components.WppIconTaskList, HTMLElement {}
export const WppIconTaskList: {
  prototype: WppIconTaskList;
  new (): WppIconTaskList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

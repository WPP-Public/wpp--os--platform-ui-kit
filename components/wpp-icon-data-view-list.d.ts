import type { Components, JSX } from "../dist/types/components";

interface WppIconDataViewList extends Components.WppIconDataViewList, HTMLElement {}
export const WppIconDataViewList: {
  prototype: WppIconDataViewList;
  new (): WppIconDataViewList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

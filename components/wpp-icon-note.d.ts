import type { Components, JSX } from "../dist/types/components";

interface WppIconNote extends Components.WppIconNote, HTMLElement {}
export const WppIconNote: {
  prototype: WppIconNote;
  new (): WppIconNote;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

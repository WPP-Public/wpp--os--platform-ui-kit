import type { Components, JSX } from "../dist/types/components";

interface WppFocusArtefact extends Components.WppFocusArtefact, HTMLElement {}
export const WppFocusArtefact: {
  prototype: WppFocusArtefact;
  new (): WppFocusArtefact;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

import type { Components, JSX } from "../dist/types/components";

interface WppArtefact extends Components.WppArtefact, HTMLElement {}
export const WppArtefact: {
  prototype: WppArtefact;
  new (): WppArtefact;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

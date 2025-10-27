import type { Components, JSX } from "../dist/types/components";

interface WppRichtextMarkdown extends Components.WppRichtextMarkdown, HTMLElement {}
export const WppRichtextMarkdown: {
  prototype: WppRichtextMarkdown;
  new (): WppRichtextMarkdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

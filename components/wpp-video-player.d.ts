import type { Components, JSX } from "../dist/types/components";

interface WppVideoPlayer extends Components.WppVideoPlayer, HTMLElement {}
export const WppVideoPlayer: {
  prototype: WppVideoPlayer;
  new (): WppVideoPlayer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

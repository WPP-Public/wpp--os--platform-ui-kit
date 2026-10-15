import type { Components, JSX } from "../dist/types/components";

interface WppAudioPlayer extends Components.WppAudioPlayer, HTMLElement {}
export const WppAudioPlayer: {
  prototype: WppAudioPlayer;
  new (): WppAudioPlayer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

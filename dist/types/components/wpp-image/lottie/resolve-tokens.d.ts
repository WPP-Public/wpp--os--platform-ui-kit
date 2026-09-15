import { AnimationData } from './types';
/** Colour as lottie wants it: r, g, b in 0..1 plus alpha. */
export type LottieColor = [number, number, number, number];
export type TokenResolver = (token: string) => LottieColor;
export interface TokenResolverHandle {
  resolve: TokenResolver;
  /** Removes the probe element the resolver created, if any. */
  dispose: () => void;
}
/**
 * Resolves theme tokens against a host element.
 *
 * Colours are read through a throwaway probe element rather than parsed by
 * hand: the browser then does the work, so hex, `rgb()`, named colours and
 * chained `var()` references all resolve without us reimplementing CSS. The
 * probe lives inside the shadow root because that is where the host's custom
 * properties are in scope.
 *
 * Tokens are looked up on the host, not on `:root` - the themes are not
 * necessarily declared on `document.documentElement` (in Storybook they are
 * not), and reading from the wrong element silently yields nothing.
 */
export declare const createTokenResolver: (host: HTMLElement) => TokenResolverHandle;
/**
 * Deep-copies the animation, swapping each token name for its resolved colour.
 *
 * A copy rather than an in-place edit: the imported module is a singleton, so
 * mutating it would strip the token names and leave the next load - or the next
 * theme change - with nothing to resolve.
 */
export declare const resolveAnimationColors: (data: AnimationData, resolve: TokenResolver) => AnimationData;
/**
 * Compact signature of what a set of tokens currently resolves to, so a theme
 * change that does not actually repaint this artwork costs nothing.
 */
export declare const fingerprintTokens: (tokens: string[], resolve: TokenResolver) => string;

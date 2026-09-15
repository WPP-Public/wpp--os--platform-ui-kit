import { UNPAINTED_COLOR_MARKER } from './const';
/** Opaque black - only ever reaches shapes that are not painted. */
const UNPAINTED = [0, 0, 0, 1];
const parseComputedColor = (value) => {
  const match = value.match(/^rgba?\(([^)]+)\)$/);
  if (!match)
    return null;
  const parts = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  if (parts.length < 3 || parts.slice(0, 3).some(Number.isNaN))
    return null;
  const alpha = parts.length > 3 && !Number.isNaN(parts[3]) ? parts[3] : 1;
  return [parts[0] / 255, parts[1] / 255, parts[2] / 255, alpha];
};
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
export const createTokenResolver = (host) => {
  const cache = new Map();
  const root = host.shadowRoot ?? host;
  let probe = null;
  const getProbe = () => {
    if (!probe) {
      probe = document.createElement('span');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.display = 'none';
      root.appendChild(probe);
    }
    return probe;
  };
  const resolve = token => {
    if (token === UNPAINTED_COLOR_MARKER)
      return UNPAINTED;
    const cached = cache.get(token);
    if (cached)
      return cached;
    // An undeclared custom property makes `color: var(--x)` invalid at
    // computed-value time, which silently falls back to the inherited colour.
    // Checking the declaration first turns that into a miss we can see.
    const declared = getComputedStyle(host).getPropertyValue(token).trim();
    let color = UNPAINTED;
    if (declared) {
      const element = getProbe();
      element.style.color = `var(${token})`;
      color = parseComputedColor(getComputedStyle(element).color) ?? UNPAINTED;
    }
    cache.set(token, color);
    return color;
  };
  return {
    resolve,
    dispose: () => {
      probe?.remove();
      probe = null;
      cache.clear();
    },
  };
};
/**
 * Deep-copies the animation, swapping each token name for its resolved colour.
 *
 * A copy rather than an in-place edit: the imported module is a singleton, so
 * mutating it would strip the token names and leave the next load - or the next
 * theme change - with nothing to resolve.
 */
export const resolveAnimationColors = (data, resolve) => {
  const copy = (node) => {
    if (Array.isArray(node))
      return node.map(copy);
    if (!node || typeof node !== 'object')
      return node;
    const source = node;
    const out = {};
    for (const key of Object.keys(source))
      out[key] = copy(source[key]);
    if (out.ty === 'fl' || out.ty === 'st') {
      const colour = out.c;
      if (colour && typeof colour.k === 'string')
        colour.k = resolve(colour.k);
    }
    return out;
  };
  return copy(data);
};
/**
 * Compact signature of what a set of tokens currently resolves to, so a theme
 * change that does not actually repaint this artwork costs nothing.
 */
export const fingerprintTokens = (tokens, resolve) => tokens.map(token => `${token}:${resolve(token).join()}`).join('|');

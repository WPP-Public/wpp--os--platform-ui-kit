/** Border radius applied to circular avatars (large enough to always render a full circle). */
export const AVATAR_CIRCLE_BORDER_RADIUS = '120px';
/** Rendered icon size (px) for each avatar size. */
export const AVATAR_ICON_SIZE = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
};
/**
 * Maps each avatar size to the design-token size used for the square (rounded rectangle) radius.
 * Several avatar sizes intentionally share the same radius token.
 */
export const AVATAR_SQUARE_RADIUS_TOKEN = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
  xl: 'm',
  '2xl': 'l',
  '3xl': 'l',
  '4xl': 'l',
};

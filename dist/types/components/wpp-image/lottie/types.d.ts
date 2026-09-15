/** Name of a theme custom property, e.g. `--wpp-primary-color-300`. */
export type ThemeColorToken = `--wpp-${string}`;
/**
 * Bodymovin animation data.
 *
 * Deliberately loose: we only ever hand it to lottie-web, and the one field we
 * touch ourselves is the colour of a fill/stroke, which our build pipeline
 * stores as a token name rather than the numeric array bodymovin exports.
 */
export interface AnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  assets?: unknown[];
  layers?: unknown[];
  [key: string]: unknown;
}
export interface EmptyStateAnimation {
  /**
   * Token that re-colours the blurred shadow raster, for the four graphics that
   * have one. The raster ships as an alpha-only mask, so its colour comes from
   * here rather than from the image itself.
   */
  shadowColorToken: ThemeColorToken | null;
  /**
   * Distinct tokens this artwork paints with. Lets a theme change be checked
   * without walking the whole animation.
   */
  tokens: ThemeColorToken[];
  data: AnimationData;
}

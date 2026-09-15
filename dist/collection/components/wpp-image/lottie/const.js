/** Rendered size when neither `width` nor `height` is given. */
export const EMPTY_STATE_DEFAULT_SIZE = 160;
/**
 * Colour stand-in the build pipeline writes for shapes the renderer never
 * paints - track-matte stencils and fills held at zero opacity. They have no
 * theme colour to point at, and keeping numeric colour arrays out of the data
 * is what lets us guarantee no hex or rgb literal ships.
 */
export const UNPAINTED_COLOR_MARKER = '@stencil';
/**
 * Custom property the four graphics with a blurred shadow use to colour it.
 * Their raster ships as an alpha-only mask, so the colour arrives here and is
 * applied by an SVG filter in wpp-image.scss.
 */
export const SHADOW_COLOR_PROPERTY = '--wpp-empty-state-shadow-color';
/**
 * Class on the element lottie renders into. Shared with the view so the graphic
 * can find its own container again after the element is re-attached, where
 * Stencil has no reason to re-run the ref that first handed it over.
 */
export const EMPTY_STATE_CONTAINER_CLASS = 'wpp-empty-state-animation';
/** Id of that filter. Shadow roots scope ids, so all 12 can share one name. */
export const SHADOW_TINT_FILTER_ID = 'wpp-empty-state-shadow-tint';
/**
 * Frame each graphic plays up to and then holds, for good.
 *
 * Design settled on playing an empty state once rather than looping it - it is
 * information you present once, not an idle animation (WPPOPENDS-1581). That
 * makes the frame we stop on permanent, and these files cannot simply run to
 * their end: they are authored as seamless loops, so every timeline builds the
 * artwork up and then winds it back down to a near-empty start. Stopping at
 * `op` would leave a blank circle for Data-Viz and a ghosted 404.
 *
 * Each frame here is where that graphic's motion comes to rest, so it completes
 * a whole gesture before it stops - Notifications swings left, right and back;
 * No Access travels centre, right, left and returns to centre; Nothing Found
 * turns a full rotation; Folder runs its colour through to white. Stopping at
 * the most-formed frame instead is what gets this wrong: a gesture that swings
 * out and returns resembles its own start, so "most different from frame 0"
 * lands mid-swing, which is exactly how the first cut of this table stopped
 * five graphics halfway through their motion.
 *
 * Derived by rendering every frame and measuring per-frame movement to find
 * where each settles (`motion-profile.mjs`), then confirmed against design's
 * description of each gesture. Re-derive with the scripts in
 * `.worklog/harness/WPPOPENDS-1581/scripts/` if design ships new artwork; the
 * unplayed tail is also dead payload worth asking design to trim.
 *
 * This is the frame reduced motion holds too, so the artwork is shown settled
 * rather than mid-gesture.
 */
export const EMPTY_STATE_REST_FRAMES = {
  'wpp-empty-404': 96,
  'wpp-empty-cards': 121,
  'wpp-empty-content': 96,
  'wpp-empty-dataviz': 112,
  'wpp-empty-downtime': 91,
  'wpp-empty-error': 133,
  'wpp-empty-folder': 319,
  'wpp-empty-no-access': 174,
  'wpp-empty-no-connection': 134,
  'wpp-empty-nothing-found': 121,
  'wpp-empty-notifications': 135,
  'wpp-empty-table': 147,
};

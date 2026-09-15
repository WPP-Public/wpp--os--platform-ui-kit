import { forceUpdate, h, Host } from '@stencil/core/internal/client';
import { t as themeObserver } from './theme-observer.js';

const emptyStateAnimations = {
  'wpp-empty-404': () => import('./wpp-empty-4042.js'),
  'wpp-empty-cards': () => import('./wpp-empty-cards2.js'),
  'wpp-empty-content': () => import('./wpp-empty-content2.js'),
  'wpp-empty-dataviz': () => import('./wpp-empty-dataviz2.js'),
  'wpp-empty-downtime': () => import('./wpp-empty-downtime2.js'),
  'wpp-empty-folder': () => import('./wpp-empty-folder2.js'),
  'wpp-empty-no-access': () => import('./wpp-empty-no-access2.js'),
  'wpp-empty-no-connection': () => import('./wpp-empty-no-connection2.js'),
  'wpp-empty-nothing-found': () => import('./wpp-empty-nothing-found2.js'),
  'wpp-empty-notifications': () => import('./wpp-empty-notifications2.js'),
  'wpp-empty-table': () => import('./wpp-empty-table2.js'),
  'wpp-empty-error': () => import('./wpp-empty-error2.js'),
};

/** Rendered size when neither `width` nor `height` is given. */
const EMPTY_STATE_DEFAULT_SIZE = 160;
/**
 * Colour stand-in the build pipeline writes for shapes the renderer never
 * paints - track-matte stencils and fills held at zero opacity. They have no
 * theme colour to point at, and keeping numeric colour arrays out of the data
 * is what lets us guarantee no hex or rgb literal ships.
 */
const UNPAINTED_COLOR_MARKER = '@stencil';
/**
 * Custom property the four graphics with a blurred shadow use to colour it.
 * Their raster ships as an alpha-only mask, so the colour arrives here and is
 * applied by an SVG filter in wpp-image.scss.
 */
const SHADOW_COLOR_PROPERTY = '--wpp-empty-state-shadow-color';
/**
 * Class on the element lottie renders into. Shared with the view so the graphic
 * can find its own container again after the element is re-attached, where
 * Stencil has no reason to re-run the ref that first handed it over.
 */
const EMPTY_STATE_CONTAINER_CLASS = 'wpp-empty-state-animation';
/** Id of that filter. Shadow roots scope ids, so all 12 can share one name. */
const SHADOW_TINT_FILTER_ID = 'wpp-empty-state-shadow-tint';
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
const EMPTY_STATE_REST_FRAMES = {
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
const createTokenResolver = (host) => {
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
const resolveAnimationColors = (data, resolve) => {
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
const fingerprintTokens = (tokens, resolve) => tokens.map(token => `${token}:${resolve(token).join()}`).join('|');

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
/** How far outside the viewport a graphic may sit and still be worth playing. */
const VIEWPORT_MARGIN_PX = 100;
/**
 * Drives one empty-state Lottie animation on behalf of a wpp-empty-* component.
 *
 * The 12 components are identical apart from which artwork they load, so all of
 * the behaviour lives here: lazy-loading the renderer, resolving theme colours,
 * playing the artwork in once, reduced motion, and teardown.
 *
 * An empty state animates in a single time and then stays put. It is
 * information presented once - not an idle animation to sit and watch
 * (WPPOPENDS-1581).
 */
class EmptyStateGraphic {
  constructor(name) {
    this.name = name;
    this.host = null;
    this.container = null;
    this.animation = null;
    this.definition = null;
    this.lottie = null;
    this.resolver = null;
    this.observer = null;
    this.motionQuery = null;
    this.unsubscribeTheme = null;
    this.colorFingerprint = '';
    this.isInViewport = true;
    /** Set once the artwork has reached its resting pose, so it plays in once. */
    this.hasPlayed = false;
    /** Guards against a slow load resolving after the component went away. */
    this.generation = 0;
    this.status = 'loading';
    /** Called from the component's render, once Stencil has the container. */
    this.setContainer = (element) => {
      if (!element || element === this.container)
        return;
      this.container = element;
      this.build();
    };
    /**
     * Stops the artwork on its resting pose.
     *
     * The files are authored as seamless loops, so playing one to its end would
     * wind the artwork back down to the near-empty frame it started on. Watching
     * the frame counter is what keeps that from becoming the permanent state.
     */
    this.handleEnterFrame = () => {
      if (!this.animation || this.animation.currentFrame < this.restFrame)
        return;
      const frame = this.restFrame;
      this.animation.removeEventListener('enterFrame', this.handleEnterFrame);
      this.animation.goToAndStop(frame, true);
      this.hasPlayed = true;
      // Nothing left to react to: it has played, and it holds this frame for good.
      this.observer?.disconnect();
      this.observer = null;
    };
    this.handleMotionPreferenceChange = () => {
      if (!this.animation)
        return;
      if (this.prefersReducedMotion) {
        this.animation.removeEventListener('enterFrame', this.handleEnterFrame);
        this.animation.goToAndStop(this.restFrame, true);
        this.hasPlayed = true;
        return;
      }
      if (this.hasPlayed)
        return;
      this.animation.addEventListener('enterFrame', this.handleEnterFrame);
      if (this.isInViewport)
        this.animation.play();
    };
    /**
     * lottie bakes a static colour into the SVG when it builds an element, so a
     * repaint means rebuilding. Gated on the resolved values actually changing:
     * most theme switches leave this artwork's tokens alone.
     */
    this.handleThemeChange = () => {
      if (!this.animation || !this.definition || !this.resolver)
        return;
      this.resolver.dispose();
      this.resolver = createTokenResolver(this.host);
      const next = fingerprintTokens(this.definition.tokens, this.resolver.resolve);
      if (next === this.colorFingerprint)
        return;
      this.build();
    };
  }
  connect(host) {
    this.host = host;
    this.generation += 1;
    // Stencil keeps the same instance across a remove/re-attach, so playback
    // state from the previous mount must not leak into this one. A remount is
    // the one way to see the animation again, which is what the examples' and
    // Storybook's replay controls rely on.
    this.isInViewport = true;
    this.hasPlayed = false;
    this.status = 'loading';
    this.motionQuery = window.matchMedia?.(REDUCED_MOTION_QUERY) ?? null;
    this.motionQuery?.addEventListener('change', this.handleMotionPreferenceChange);
    this.unsubscribeTheme = themeObserver.subscribe(this.handleThemeChange);
    this.observeViewport();
    void this.load();
  }
  disconnect() {
    this.generation += 1;
    this.motionQuery?.removeEventListener('change', this.handleMotionPreferenceChange);
    this.motionQuery = null;
    this.unsubscribeTheme?.();
    this.unsubscribeTheme = null;
    this.observer?.disconnect();
    this.observer = null;
    this.destroyAnimation();
    this.resolver?.dispose();
    this.resolver = null;
    this.definition = null;
    this.lottie = null;
    this.container = null;
    this.host = null;
    this.status = 'loading';
  }
  get shadowColorToken() {
    return this.definition?.shadowColorToken ?? null;
  }
  /** Inline style for the host: the shadow tint, when this artwork has one. */
  get hostStyle() {
    const token = this.shadowColorToken;
    return token ? { [SHADOW_COLOR_PROPERTY]: `var(${token})` } : {};
  }
  get prefersReducedMotion() {
    return this.motionQuery?.matches ?? false;
  }
  /**
   * Frame the artwork plays up to and then holds. Clamped, so artwork shorter
   * than its recorded rest frame still stops on a frame it actually has.
   */
  get restFrame() {
    const last = Math.max(0, (this.animation?.totalFrames ?? 1) - 1);
    return Math.min(EMPTY_STATE_REST_FRAMES[this.name] ?? last, last);
  }
  async load() {
    const generation = this.generation;
    try {
      const [lottie, definition] = await Promise.all([
        // Kept as a dynamic import so the renderer lands in its own chunk and is
        // only fetched by pages that actually show an empty state. The `light`
        // build drops the canvas/HTML renderers we never use.
        import('./lottie_light.js').then(function (n) { return n.l; }).then(module => module.default),
        emptyStateAnimations[this.name]().then(module => module.default),
      ]);
      if (generation !== this.generation)
        return;
      this.lottie = lottie;
      this.definition = definition;
      this.status = 'ready';
      this.requestRender();
      this.build();
    }
    catch (error) {
      if (generation !== this.generation)
        return;
      // Leaving the skeleton up forever would be worse than the static graphic
      // this replaced, so the loading state is cleared either way.
      this.status = 'failed';
      this.requestRender();
      console.error(`[${this.name}] could not load its animation`, error);
    }
  }
  /**
   * Builds the animation. Also reached from the render ref, where nothing above
   * would catch a throw, so it handles its own failures: a renderer that blows
   * up must leave a sized empty box, not a permanent skeleton or a render error.
   */
  build() {
    // Re-resolved rather than trusted: the element survives being detached, so
    // Stencil has no reason to re-run the ref on re-attach, and a container
    // dropped at disconnect would otherwise never come back.
    this.container ?? (this.container = this.host?.shadowRoot?.querySelector(`.${EMPTY_STATE_CONTAINER_CLASS}`) ?? null);
    if (!this.lottie || !this.definition || !this.container || !this.host)
      return;
    this.destroyAnimation();
    try {
      this.resolver ?? (this.resolver = createTokenResolver(this.host));
      const { resolve } = this.resolver;
      this.colorFingerprint = fingerprintTokens(this.definition.tokens, resolve);
      const animationData = resolveAnimationColors(this.definition.data, resolve);
      this.animation = this.lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        // Playback is ours to start and to stop, at the resting pose.
        loop: false,
        autoplay: false,
        animationData,
        // No `title`/`description`: they are what makes lottie label the SVG, and
        // the artwork is decorative - its meaning comes from the surrounding copy.
        // The container carries aria-hidden instead.
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        },
      });
      // The observer's first callback is asynchronous. A graphic below the fold
      // gets one play and must not spend it unseen, so once the host has been
      // laid out the opening decision is taken synchronously instead.
      if (this.host.offsetHeight > 0)
        this.isInViewport = this.isVisibleNow();
      // A theme change rebuilds the animation to repaint it. Artwork that has
      // already played in must come back at rest, not animate a second time.
      if (this.prefersReducedMotion || this.hasPlayed) {
        this.animation.goToAndStop(this.restFrame, true);
        return;
      }
      this.animation.addEventListener('enterFrame', this.handleEnterFrame);
      if (this.isInViewport)
        this.animation.play();
    }
    catch (error) {
      this.animation = null;
      this.status = 'failed';
      this.requestRender();
      console.error(`[${this.name}] could not render its animation`, error);
    }
  }
  destroyAnimation() {
    if (!this.animation)
      return;
    this.animation.removeEventListener('enterFrame', this.handleEnterFrame);
    this.animation.destroy();
    this.animation = null;
  }
  isVisibleNow() {
    if (!this.host)
      return true;
    const { top, bottom } = this.host.getBoundingClientRect();
    return bottom > -VIEWPORT_MARGIN_PX && top < window.innerHeight + VIEWPORT_MARGIN_PX;
  }
  /**
   * A page can show all 12 graphics at once. Each gets a single play, so one
   * scrolled out of view waits rather than animating where nobody can see it.
   */
  observeViewport() {
    if (!this.host || typeof IntersectionObserver === 'undefined')
      return;
    this.observer = new IntersectionObserver(entries => {
      const isVisible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (isVisible === this.isInViewport)
        return;
      this.isInViewport = isVisible;
      if (this.prefersReducedMotion || this.hasPlayed || !this.animation)
        return;
      isVisible ? this.animation.play() : this.animation.pause();
    }, { rootMargin: `${VIEWPORT_MARGIN_PX}px` });
    this.observer.observe(this.host);
  }
  requestRender() {
    if (this.host)
      forceUpdate(this.host);
  }
}

/**
 * Markup shared by all 12 wpp-empty-* components.
 *
 * The animation container is always rendered at the final size, and the
 * skeleton sits on top of it while loading - so the swap cannot shift layout.
 */
const EmptyStateGraphicView = ({ graphic, name, width, height, }) => {
  // Same arithmetic the static graphics used: width falls back to the default,
  // height falls back to width.
  const boxWidth = width || EMPTY_STATE_DEFAULT_SIZE;
  const boxHeight = height || boxWidth;
  const size = { width: `${boxWidth}px`, height: `${boxHeight}px` };
  return (h(Host, { class: { 'wpp-image': true, [name]: true }, style: graphic.hostStyle },
    h("div", { key: "empty-state-animation", class: EMPTY_STATE_CONTAINER_CLASS, style: size, "aria-hidden": "true", ref: graphic.setContainer }),
    graphic.status === 'loading' && (h("wpp-skeleton-v4-4-0", { class: "wpp-empty-state-skeleton", variant: "rectangle", width: boxWidth, height: boxHeight })),
    graphic.shadowColorToken && (h("svg", { class: "wpp-empty-state-defs", "aria-hidden": "true", focusable: "false" },
      h("filter", { id: SHADOW_TINT_FILTER_ID, "color-interpolation-filters": "sRGB" },
        h("feFlood", { class: "wpp-empty-state-tint", result: "tint" }),
        h("feComposite", { in: "tint", in2: "SourceAlpha", operator: "in" }))))));
};

export { EmptyStateGraphic as E, EmptyStateGraphicView as a };

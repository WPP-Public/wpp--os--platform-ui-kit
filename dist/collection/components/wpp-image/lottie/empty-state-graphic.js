import { forceUpdate } from '@stencil/core';
import { themeObserver } from '../../../utils/theme-observer';
import { emptyStateAnimations } from '../animations';
import { EMPTY_STATE_CONTAINER_CLASS, EMPTY_STATE_REST_FRAMES, SHADOW_COLOR_PROPERTY } from './const';
import { createTokenResolver, fingerprintTokens, resolveAnimationColors } from './resolve-tokens';
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
export class EmptyStateGraphic {
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
        import('lottie-web/build/player/lottie_light').then(module => module.default),
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

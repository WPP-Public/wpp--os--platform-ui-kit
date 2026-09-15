import { EmptyStateName } from '../animations';
export type EmptyStateStatus = 'loading' | 'ready' | 'failed';
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
export declare class EmptyStateGraphic {
  private readonly name;
  private host;
  private container;
  private animation;
  private definition;
  private lottie;
  private resolver;
  private observer;
  private motionQuery;
  private unsubscribeTheme;
  private colorFingerprint;
  private isInViewport;
  /** Set once the artwork has reached its resting pose, so it plays in once. */
  private hasPlayed;
  /** Guards against a slow load resolving after the component went away. */
  private generation;
  status: EmptyStateStatus;
  constructor(name: EmptyStateName);
  connect(host: HTMLElement): void;
  disconnect(): void;
  /** Called from the component's render, once Stencil has the container. */
  setContainer: (element: HTMLElement | undefined) => void;
  get shadowColorToken(): `--wpp-${string}` | null;
  /** Inline style for the host: the shadow tint, when this artwork has one. */
  get hostStyle(): Record<string, string>;
  private get prefersReducedMotion();
  /**
   * Frame the artwork plays up to and then holds. Clamped, so artwork shorter
   * than its recorded rest frame still stops on a frame it actually has.
   */
  private get restFrame();
  private load;
  /**
   * Builds the animation. Also reached from the render ref, where nothing above
   * would catch a throw, so it handles its own failures: a renderer that blows
   * up must leave a sized empty box, not a permanent skeleton or a render error.
   */
  private build;
  private destroyAnimation;
  /**
   * Stops the artwork on its resting pose.
   *
   * The files are authored as seamless loops, so playing one to its end would
   * wind the artwork back down to the near-empty frame it started on. Watching
   * the frame counter is what keeps that from becoming the permanent state.
   */
  private handleEnterFrame;
  private isVisibleNow;
  /**
   * A page can show all 12 graphics at once. Each gets a single play, so one
   * scrolled out of view waits rather than animating where nobody can see it.
   */
  private observeViewport;
  private handleMotionPreferenceChange;
  /**
   * lottie bakes a static colour into the SVG when it builds an element, so a
   * repaint means rebuilding. Gated on the resolved values actually changing:
   * most theme switches leave this artwork's tokens alone.
   */
  private handleThemeChange;
  private requestRender;
}

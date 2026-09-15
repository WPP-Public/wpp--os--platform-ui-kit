import { newSpecPage } from '@stencil/core/testing';
import { WppEmpty404 } from '../components/empty-states/wpp-empty-404/wpp-empty-404';
import { WppEmptyFolder } from '../components/empty-states/wpp-empty-folder/wpp-empty-folder';
import { EMPTY_STATE_REST_FRAMES } from '../lottie/const';
import { resolveAnimationColors } from '../lottie/resolve-tokens';
/**
 * A stand-in for a lottie AnimationItem, so we can watch what the component
 * asks the renderer to do.
 */
const createAnimationMock = () => {
  const listeners = {};
  const mock = {
    // longer than the longest rest frame (folder, 319) so the clamp in
    // restFrame cannot quietly stand in for the value under test
    totalFrames: 400,
    currentFrame: 0,
    addEventListener: jest.fn((event, cb) => {
      listeners[event] = [...(listeners[event] ?? []), cb];
    }),
    removeEventListener: jest.fn((event, cb) => {
      listeners[event] = (listeners[event] ?? []).filter(existing => existing !== cb);
    }),
    goToAndPlay: jest.fn(),
    goToAndStop: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    destroy: jest.fn(),
    /** Moves the playhead and fires the frame callback the component listens on. */
    emitFrame: (frame) => {
      mock.currentFrame = frame;
      (listeners.enterFrame ?? []).forEach(cb => cb());
    },
  };
  return mock;
};
let animationMock;
let loadAnimation;
jest.mock('lottie-web/build/player/lottie_light', () => ({
  __esModule: true,
  get default() {
    return { loadAnimation };
  },
}));
/**
 * Lets the component's dynamic imports settle.
 *
 * Note on what this file can and cannot cover: Stencil's jest transform does not
 * run babel-plugin-jest-hoist, so `jest.mock` executes AFTER static imports are
 * already bound. The lottie renderer is reachable because the component imports
 * it dynamically; the animation module is not, because that import is static.
 * The consequence is that the in-flight loading window cannot be held open here
 * - the real animation module resolves on a microtask. That window is covered in
 * the browser instead, by intercepting the chunk request and delaying it (see
 * WPPOPENDS-1581), which exercises the real network path rather than a mock.
 */
const flush = () => new Promise(resolve => setTimeout(resolve, 0));
const setReducedMotion = (matches) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
};
/** Renders a graphic and lets its animation arrive. */
const renderLoaded = async (component, html) => {
  const page = await newSpecPage({ components: [component], html });
  await flush();
  await page.waitForChanges();
  return page;
};
beforeEach(() => {
  animationMock = createAnimationMock();
  loadAnimation = jest.fn(() => animationMock);
  setReducedMotion(false);
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  // A test that fails mid-way must not leave fake timers installed, or every
  // later test hangs waiting for a clock that never advances.
  jest.useRealTimers();
  jest.restoreAllMocks();
});
describe('wpp-empty-* (empty state graphics)', () => {
  it('should render and default to 160x160', async () => {
    const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
    const container = page.root.shadowRoot.querySelector('.wpp-empty-state-animation');
    expect(container).not.toBeNull();
    expect(container.style.width).toBe('160px');
    expect(container.style.height).toBe('160px');
  });
  it('should keep the host classes the graphics have always exposed', async () => {
    const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
    expect(page.root.classList.contains('wpp-image')).toBe(true);
    expect(page.root.classList.contains('wpp-empty-404')).toBe(true);
  });
  describe('sizing', () => {
    it('should make width and height equal when only width is given', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404 width="250"></wpp-empty-404>');
      const container = page.root.shadowRoot.querySelector('.wpp-empty-state-animation');
      expect(container.style.width).toBe('250px');
      expect(container.style.height).toBe('250px');
    });
    it('should leave width at its default when only height is given', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404 height="100"></wpp-empty-404>');
      const container = page.root.shadowRoot.querySelector('.wpp-empty-state-animation');
      expect(container.style.width).toBe('160px');
      expect(container.style.height).toBe('100px');
    });
  });
  describe('loading state', () => {
    it('should render the animation once it is ready, with no skeleton left behind', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      expect(page.root.shadowRoot.querySelector('wpp-skeleton')).toBeNull();
      expect(page.root.shadowRoot.querySelector('.wpp-empty-state-animation')).not.toBeNull();
      expect(loadAnimation).toHaveBeenCalledTimes(1);
    });
    it('should clear the loading state when the animation fails, rather than shimmer forever', async () => {
      loadAnimation = jest.fn(() => {
        throw new Error('renderer blew up');
      });
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      // a permanently shimmering box would be worse than no graphic at all
      expect(page.root.shadowRoot.querySelector('wpp-skeleton')).toBeNull();
      expect(page.root.shadowRoot.querySelector('.wpp-empty-state-animation')).not.toBeNull();
    });
    it('should keep the box at its full size after a failed load', async () => {
      loadAnimation = jest.fn(() => {
        throw new Error('renderer blew up');
      });
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404 width="250"></wpp-empty-404>');
      const container = page.root.shadowRoot.querySelector('.wpp-empty-state-animation');
      expect(container.style.width).toBe('250px');
      expect(container.style.height).toBe('250px');
    });
  });
  describe('playing once', () => {
    const REST_404 = EMPTY_STATE_REST_FRAMES['wpp-empty-404'];
    it('should start playback itself rather than letting lottie loop or autoplay', async () => {
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      expect(loadAnimation).toHaveBeenCalledWith(expect.objectContaining({ loop: false, autoplay: false }));
      expect(animationMock.play).toHaveBeenCalled();
    });
    it('should keep playing until the resting pose is reached', async () => {
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      animationMock.emitFrame(REST_404 - 1);
      expect(animationMock.goToAndStop).not.toHaveBeenCalled();
    });
    it('should stop on the resting pose instead of running the timeline out', async () => {
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      // past this frame the artwork winds back down to the near-empty pose it
      // started on, which is what would otherwise be left on screen for good
      animationMock.emitFrame(REST_404);
      expect(animationMock.goToAndStop).toHaveBeenCalledWith(REST_404, true);
    });
    it('should use each graphic own resting pose', async () => {
      await renderLoaded(WppEmptyFolder, '<wpp-empty-folder></wpp-empty-folder>');
      animationMock.emitFrame(EMPTY_STATE_REST_FRAMES['wpp-empty-folder']);
      expect(animationMock.goToAndStop).toHaveBeenCalledWith(EMPTY_STATE_REST_FRAMES['wpp-empty-folder'], true);
    });
    it('should stop watching frames once it has come to rest', async () => {
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      animationMock.emitFrame(REST_404);
      animationMock.goToAndStop.mockClear();
      animationMock.emitFrame(REST_404 + 5);
      expect(animationMock.removeEventListener).toHaveBeenCalledWith('enterFrame', expect.any(Function));
      expect(animationMock.goToAndStop).not.toHaveBeenCalled();
    });
  });
  describe('reduced motion', () => {
    it('should not animate at all', async () => {
      setReducedMotion(true);
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      expect(loadAnimation).toHaveBeenCalledWith(expect.objectContaining({ autoplay: false }));
      expect(animationMock.play).not.toHaveBeenCalled();
    });
    it('should hold the resting pose as a still frame', async () => {
      setReducedMotion(true);
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      expect(animationMock.goToAndStop).toHaveBeenCalledWith(EMPTY_STATE_REST_FRAMES['wpp-empty-404'], true);
    });
    it('should use each graphic own resting pose', async () => {
      setReducedMotion(true);
      await renderLoaded(WppEmptyFolder, '<wpp-empty-folder></wpp-empty-folder>');
      expect(animationMock.goToAndStop).toHaveBeenCalledWith(EMPTY_STATE_REST_FRAMES['wpp-empty-folder'], true);
    });
    it('should not watch for frames it is never going to play', async () => {
      setReducedMotion(true);
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      expect(animationMock.addEventListener).not.toHaveBeenCalledWith('enterFrame', expect.any(Function));
    });
  });
  describe('Testing lifecycle methods', () => {
    it('should destroy the animation on disconnect', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      page.root.remove();
      await page.waitForChanges();
      expect(animationMock.destroy).toHaveBeenCalled();
      expect(animationMock.removeEventListener).toHaveBeenCalledWith('enterFrame', expect.any(Function));
    });
    it('should play again when the same element is re-attached', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      const element = page.root;
      const parent = element.parentNode;
      animationMock.emitFrame(EMPTY_STATE_REST_FRAMES['wpp-empty-404']);
      element.remove();
      await page.waitForChanges();
      // Stencil reuses the instance across a remove/re-attach, so playback state
      // has to be reset on connect - a remount is the only way to replay, which
      // is what the examples' and Storybook's replay controls rely on
      animationMock = createAnimationMock();
      loadAnimation = jest.fn(() => animationMock);
      parent.appendChild(element);
      await flush();
      await page.waitForChanges();
      expect(animationMock.play).toHaveBeenCalled();
    });
  });
  describe('Testing accessibility', () => {
    it('should hide the decorative graphic from assistive technology', async () => {
      const page = await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      const container = page.root.shadowRoot.querySelector('.wpp-empty-state-animation');
      expect(container.getAttribute('aria-hidden')).toBe('true');
    });
    it('should not give lottie a title or description, which is what would label the svg', async () => {
      await renderLoaded(WppEmpty404, '<wpp-empty-404></wpp-empty-404>');
      const config = loadAnimation.mock.calls[0][0];
      expect(config.title).toBeUndefined();
      expect(config.description).toBeUndefined();
    });
  });
});
describe('resolveAnimationColors', () => {
  const resolve = jest.fn((token) => token === '@stencil'
    ? [0, 0, 0, 1]
    : [0.5, 0.25, 0.75, 1]);
  const source = {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 90,
    w: 167,
    h: 164,
    layers: [
      { ty: 4, shapes: [{ ty: 'fl', c: { a: 0, k: '--wpp-primary-color-300' }, o: { k: 100 } }] },
      { ty: 4, shapes: [{ ty: 'st', c: { a: 0, k: '--wpp-primary-color-300' }, w: { k: 2 } }] },
      { ty: 4, shapes: [{ ty: 'fl', c: { a: 0, k: '@stencil' }, o: { k: 100 } }] },
    ],
  };
  it('should replace fill and stroke token names with resolved colours', () => {
    const result = resolveAnimationColors(source, resolve);
    expect(result.layers[0].shapes[0].c.k).toEqual([0.5, 0.25, 0.75, 1]);
    expect(result.layers[1].shapes[0].c.k).toEqual([0.5, 0.25, 0.75, 1]);
  });
  it('should resolve the unpainted marker to opaque black', () => {
    const result = resolveAnimationColors(source, resolve);
    expect(result.layers[2].shapes[0].c.k).toEqual([0, 0, 0, 1]);
  });
  it('should leave non-colour data alone', () => {
    const result = resolveAnimationColors(source, resolve);
    expect(result.layers[1].shapes[0].w.k).toBe(2);
  });
  it('should not mutate the imported module, so the next load still has token names', () => {
    const before = JSON.stringify(source);
    resolveAnimationColors(source, resolve);
    expect(JSON.stringify(source)).toBe(before);
  });
});

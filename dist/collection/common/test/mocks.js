/**
 * Mocks shared by component specs. `jest.config.js` keeps `/test/mocks.ts` out of `testPathIgnorePatterns`'s
 * reach, so this file is never collected as a suite.
 */
/**
 * A ResizeObserver that records its instances and lets a spec report a size, which the mock DOM never does
 * on its own. `.jest/setupMocks.js` installs a global ResizeObserver that only swallows calls, so a spec
 * that needs to drive the callback assigns this one instead:
 *
 * ```ts
 * Object.assign(global, { ResizeObserver: ResizeObserverMock })
 * // ...render, then:
 * ResizeObserverMock.last?.triggerResize({ width: 800, height: 600 })
 * ```
 */
export class ResizeObserverMock {
  /** The observer created most recently, which is the one a freshly rendered component owns. */
  static get last() {
    return ResizeObserverMock.instances[ResizeObserverMock.instances.length - 1];
  }
  static reset() {
    ResizeObserverMock.instances = [];
  }
  constructor(callback) {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
    this.callback = callback;
    ResizeObserverMock.instances.push(this);
  }
  /** Reports a new size the way the browser would. Components that measure the element themselves ignore it. */
  triggerResize({ width = 0, height = 0 } = {}) {
    const entry = { contentRect: { width, height } };
    this.callback([entry], this);
  }
}
ResizeObserverMock.instances = [];

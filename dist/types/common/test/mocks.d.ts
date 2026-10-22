/**
 * Mocks shared by component specs. `jest.config.js` keeps `/test/mocks.ts` out of `testPathIgnorePatterns`'s
 * reach, so this file is never collected as a suite.
 */
/// <reference types="jest" />
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
export declare class ResizeObserverMock {
  static instances: ResizeObserverMock[];
  /** The observer created most recently, which is the one a freshly rendered component owns. */
  static get last(): ResizeObserverMock | undefined;
  static reset(): void;
  callback: ResizeObserverCallback;
  observe: jest.Mock<any, any>;
  unobserve: jest.Mock<any, any>;
  disconnect: jest.Mock<any, any>;
  constructor(callback: ResizeObserverCallback);
  /** Reports a new size the way the browser would. Components that measure the element themselves ignore it. */
  triggerResize({ width, height }?: {
    width?: number;
    height?: number;
  }): void;
}

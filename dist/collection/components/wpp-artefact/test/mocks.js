export class ResizeObserverMock {
  constructor(callback) {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
    this.callback = callback;
  }
  // Helper to manually trigger the callback in tests
  triggerResize(height) {
    this.callback([{ contentRect: { height } }], this);
  }
}
global.ResizeObserver = ResizeObserverMock;

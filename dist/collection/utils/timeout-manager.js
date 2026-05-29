/**
 * Centralized timeout management utility for components that use setTimeout.
 * Tracks pending timeout IDs and self-cleans after execution.
 * Call `clearAll()` in `disconnectedCallback` to prevent stale callbacks
 * from accessing destroyed component instances.
 */
export class TimeoutManager {
  constructor() {
    this.pending = new Set();
  }
  schedule(fn, delay = 0) {
    let id;
    /* eslint-disable prefer-const -- `let` required: test mocks run setTimeout synchronously, causing TDZ with `const` */
    id = setTimeout(() => {
      this.pending.delete(id);
      fn();
    }, delay);
    /* eslint-enable prefer-const */
    this.pending.add(id);
  }
  clearAll() {
    this.pending.forEach(id => clearTimeout(id));
    this.pending.clear();
  }
}

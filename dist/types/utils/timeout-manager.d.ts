/**
 * Centralized timeout management utility for components that use setTimeout.
 * Tracks pending timeout IDs and self-cleans after execution.
 * Call `clearAll()` in `disconnectedCallback` to prevent stale callbacks
 * from accessing destroyed component instances.
 */
export declare class TimeoutManager {
  private pending;
  schedule(fn: () => void, delay?: number): void;
  clearAll(): void;
}

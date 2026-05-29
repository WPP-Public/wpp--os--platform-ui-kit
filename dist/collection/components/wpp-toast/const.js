export const ANIMATION_DURATION = 500;
/**
 * Default minimum delay (ms) between two successive toasts becoming visible.
 * Prevents "batched" enter/exit waves when toasts are queued in rapid succession.
 *
 * Kept shorter than `ANIMATION_DURATION` so that consecutive show animations
 * overlap slightly, producing a smooth cascade effect while still filling the
 * visible slots quickly.
 */
export const DEFAULT_STAGGER_INTERVAL = 200;

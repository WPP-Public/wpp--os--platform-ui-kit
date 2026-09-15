export declare const TOAST_DURATION = 5000;
export type DebouncedFn<T extends (...args: any[]) => void> = {
  call: (...args: Parameters<T>) => void;
  cancel: () => void;
  flush: (...args: Parameters<T>) => void;
};
export declare const debounceWithControl: <T extends (...args: any[]) => void>(callback: T, timeout: number) => DebouncedFn<T>;
/**
 * Registers the angle driving the `is-loading` conic-gradient border.
 *
 * Custom property registrations are document-scoped, so an `@property` rule inside this
 * component's shadow stylesheet is ignored. Without a registration the angle interpolates
 * discretely and the gradient is invalid for half of every cycle.
 */
export declare const registerLoadingAngle: () => void;

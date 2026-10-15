export declare const TOAST_DURATION = 5000;
export type DebouncedFn<T extends (...args: any[]) => void> = {
  call: (...args: Parameters<T>) => void;
  cancel: () => void;
  flush: (...args: Parameters<T>) => void;
};
export declare const debounceWithControl: <T extends (...args: any[]) => void>(callback: T, timeout: number) => DebouncedFn<T>;

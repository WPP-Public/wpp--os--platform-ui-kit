import { themeObserver } from './theme-observer';
export const themeSubscriptionController = (getElement, additionalCB) => {
  let stopWatchingThemeCB = null;
  let subscribedElement = null;
  const subscribeToThemeChanges = (el) => themeObserver.subscribe((themeValue) => {
    el.setAttribute('data-wpp-theme', themeValue);
    additionalCB?.(themeValue);
  });
  const stop = () => {
    stopWatchingThemeCB?.();
    stopWatchingThemeCB = null;
    subscribedElement = null;
  };
  const start = () => {
    const element = getElement() ?? null;
    if (!element) {
      stop();
      return;
    }
    if (stopWatchingThemeCB && subscribedElement === element) {
      return;
    }
    stop();
    subscribedElement = element;
    stopWatchingThemeCB = subscribeToThemeChanges(element);
  };
  return {
    start,
    stop,
  };
};

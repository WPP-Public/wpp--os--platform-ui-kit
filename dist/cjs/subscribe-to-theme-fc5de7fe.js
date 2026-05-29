'use strict';

class ThemeObserverService {
  constructor() {
    // There will be only 1 observer per application.
    this.observer = null;
    // All the components that will subscribe to this observer
    this.subscribers = new Set();
    // Default attribute value that we are looking for on the `html` tag, but can be configured
    this.attribute = 'data-canvas-theme';
    this.configure = (attribute) => {
      // In case applications are using different attribute on the `html` tag, we let them configure it
      this.attribute = attribute;
      // We need to restart observer to observe the new attribute
      this.restartObserver();
      // Notify all subscribers in order to not have stale values
      this.notifySubscribers();
    };
    this.getThemeAttribute = () => document.documentElement.getAttribute(this.attribute) ?? 'light';
    this.subscribe = (cb) => {
      this.subscribers.add(cb);
      if (this.subscribers.size === 1) {
        this.startObserving();
      }
      cb(this.getThemeAttribute());
      return () => {
        this.subscribers.delete(cb);
        if (this.subscribers.size === 0) {
          this.stopObserving();
        }
      };
    };
    this.notifySubscribers = () => {
      const theme = this.getThemeAttribute();
      this.subscribers.forEach((cb) => cb(theme));
    };
    this.restartObserver = () => {
      if (this.observer) {
        this.stopObserving();
        this.startObserving();
      }
    };
    this.startObserving = () => {
      this.observer = new MutationObserver(this.notifySubscribers);
      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [this.attribute],
      });
    };
    this.stopObserving = () => {
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = null;
    };
  }
}
const themeObserver = new ThemeObserverService();

const themeSubscriptionController = (getElement, additionalCB) => {
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

exports.themeObserver = themeObserver;
exports.themeSubscriptionController = themeSubscriptionController;

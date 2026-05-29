import { themeSubscriptionController } from './subscribe-to-theme';
import { themeObserver } from './theme-observer';
describe('themeSubscriptionController', () => {
  let mockUnsubscribe;
  let capturedSubscriberCB;
  beforeEach(() => {
    mockUnsubscribe = jest.fn();
    // spy directly on the instance instead of mocking the whole module
    jest.spyOn(themeObserver, 'subscribe').mockImplementation((cb) => {
      capturedSubscriberCB = cb;
      return mockUnsubscribe;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('return value', () => {
    it('should return an object with start and stop methods', () => {
      const controller = themeSubscriptionController(() => null);
      expect(typeof controller.start).toBe('function');
      expect(typeof controller.stop).toBe('function');
    });
    it('should satisfy ThemeSubscriptionController interface', () => {
      const controller = themeSubscriptionController(() => null);
      expect(controller).toHaveProperty('start');
      expect(controller).toHaveProperty('stop');
    });
  });
  describe('start', () => {
    it('should subscribe to theme changes when element exists', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      expect(themeObserver.subscribe).toHaveBeenCalledTimes(1);
    });
    it('should not subscribe when getElement returns null', () => {
      const controller = themeSubscriptionController(() => null);
      controller.start();
      expect(themeObserver.subscribe).not.toHaveBeenCalled();
    });
    it('should not subscribe when getElement returns undefined', () => {
      const controller = themeSubscriptionController(() => undefined);
      controller.start();
      expect(themeObserver.subscribe).not.toHaveBeenCalled();
    });
    it('should not re-subscribe when called again with the same element', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      controller.start();
      expect(themeObserver.subscribe).toHaveBeenCalledTimes(1);
    });
    it('should re-subscribe when the element changes', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      let currentElement = element1;
      const controller = themeSubscriptionController(() => currentElement);
      controller.start();
      currentElement = element2;
      controller.start();
      expect(themeObserver.subscribe).toHaveBeenCalledTimes(2);
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
    it('should stop existing subscription when element becomes null', () => {
      let currentElement = document.createElement('div');
      const controller = themeSubscriptionController(() => currentElement);
      controller.start();
      currentElement = null;
      controller.start();
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
    it('should allow re-subscribing after stop', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      controller.stop();
      controller.start();
      expect(themeObserver.subscribe).toHaveBeenCalledTimes(2);
    });
  });
  describe('stop', () => {
    it('should call unsubscribe callback when subscribed', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      controller.stop();
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
    it('should not throw when called without prior subscription', () => {
      const controller = themeSubscriptionController(() => null);
      expect(() => controller.stop()).not.toThrow();
    });
    it('should not call unsubscribe twice when stop is called multiple times', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      controller.stop();
      controller.stop();
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
  describe('theme change callback', () => {
    it('should update data-wpp-theme attribute when theme changes', () => {
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element);
      controller.start();
      capturedSubscriberCB('dark');
      capturedSubscriberCB('light');
      expect(element.getAttribute('data-wpp-theme')).toBe('light');
    });
    it('should call additionalCB on every theme change', () => {
      const additionalCB = jest.fn();
      const element = document.createElement('div');
      const controller = themeSubscriptionController(() => element, additionalCB);
      controller.start();
      capturedSubscriberCB('dark');
      capturedSubscriberCB('light');
      expect(additionalCB).toHaveBeenCalledTimes(2);
    });
  });
});

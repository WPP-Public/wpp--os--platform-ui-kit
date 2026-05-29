import { ThemeObserverService } from './theme-observer';
describe('ThemeObserverService', () => {
  let service;
  let mockObserve;
  let mockDisconnect;
  let triggerObserverCallback;
  beforeEach(() => {
    mockObserve = jest.fn();
    mockDisconnect = jest.fn();
    // mock MutationObserver and store the callback so we can trigger it manually
    global.MutationObserver = jest.fn().mockImplementation(cb => {
      triggerObserverCallback = () => cb([], {});
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      };
    });
    service = new ThemeObserverService();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('getThemeAttribute', () => {
    it('should return the current theme from html attribute', () => {
      jest.spyOn(document.documentElement, 'getAttribute').mockReturnValue('dark');
      expect(service.getThemeAttribute()).toBe('dark');
    });
    it('should return "light" as default when attribute is not set', () => {
      jest.spyOn(document.documentElement, 'getAttribute').mockReturnValue(null);
      expect(service.getThemeAttribute()).toBe('light');
    });
  });
  describe('configure', () => {
    it('should not restart observer when not yet observing', () => {
      service.configure('custom-theme');
      expect(mockObserve).not.toHaveBeenCalled();
      expect(mockDisconnect).not.toHaveBeenCalled();
    });
    it('should restart observer with new attribute when already observing', () => {
      service.subscribe(jest.fn());
      expect(mockObserve).toHaveBeenCalledTimes(1);
      service.configure('custom-theme');
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenCalledTimes(2);
    });
    it('should observe with new attribute after configure', () => {
      service.subscribe(jest.fn());
      service.configure('custom-theme');
      expect(mockObserve).toHaveBeenLastCalledWith(document.documentElement, {
        attributes: true,
        attributeFilter: ['custom-theme'],
      });
    });
  });
  describe('subscribe', () => {
    it('should call callback immediately with current theme', () => {
      jest.spyOn(document.documentElement, 'getAttribute').mockReturnValue('dark');
      const cb = jest.fn();
      service.subscribe(cb);
      expect(cb).toHaveBeenCalledWith('dark');
    });
    it('should start observing on first subscriber', () => {
      service.subscribe(jest.fn());
      expect(mockObserve).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenCalledWith(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-canvas-theme'],
      });
    });
    it('should not start a new observer when there are already subscribers', () => {
      service.subscribe(jest.fn());
      service.subscribe(jest.fn());
      expect(global.MutationObserver).toHaveBeenCalledTimes(1);
    });
    it('should return an unsubscribe function', () => {
      const unsubscribe = service.subscribe(jest.fn());
      expect(typeof unsubscribe).toBe('function');
    });
  });
  describe('unsubscribe', () => {
    it('should stop notifying callback after unsubscribe', () => {
      const cb = jest.fn();
      const unsubscribe = service.subscribe(cb);
      cb.mockClear();
      unsubscribe();
      triggerObserverCallback();
      expect(cb).not.toHaveBeenCalled();
    });
    it('should stop observing when last subscriber unsubscribes', () => {
      const unsubscribe = service.subscribe(jest.fn());
      unsubscribe();
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });
    it('should not stop observing when there are still other subscribers', () => {
      const unsubscribe1 = service.subscribe(jest.fn());
      service.subscribe(jest.fn());
      unsubscribe1();
      expect(mockDisconnect).not.toHaveBeenCalled();
    });
    it('should restart observing when new subscriber added after all unsubscribed', () => {
      const unsubscribe = service.subscribe(jest.fn());
      unsubscribe();
      expect(mockObserve).toHaveBeenCalledTimes(1);
      service.subscribe(jest.fn());
      expect(mockObserve).toHaveBeenCalledTimes(2);
    });
  });
  describe('when html attribute changes', () => {
    it('should notify all subscribers with new theme', () => {
      jest.spyOn(document.documentElement, 'getAttribute').mockReturnValue('dark');
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      service.subscribe(cb1);
      service.subscribe(cb2);
      cb1.mockClear();
      cb2.mockClear();
      triggerObserverCallback();
      expect(cb1).toHaveBeenCalledWith('dark');
      expect(cb2).toHaveBeenCalledWith('dark');
    });
    it('should not notify unsubscribed callbacks', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      const unsubscribe1 = service.subscribe(cb1);
      service.subscribe(cb2);
      cb1.mockClear();
      cb2.mockClear();
      unsubscribe1();
      triggerObserverCallback();
      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalled();
    });
  });
});

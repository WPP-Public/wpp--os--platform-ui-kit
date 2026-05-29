import { newSpecPage } from '@stencil/core/testing';
import { WppToast } from '../wpp-toast';
describe('wpp-toast', () => {
  it('renders component', async () => {
    jest.setTimeout(10000);
    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast />`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => { });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    await new Promise(resolve => setTimeout(resolve, 7000));
    await page.waitForChanges();
    const emitSpy = jest.spyOn(instance.wppToastComplete, 'emit');
    instance.onComplete();
    await page.waitForChanges();
    expect(emitSpy).toHaveBeenCalledWith({ currentIndex: '' });
  });
  it('clears all timers when handleCloseClick is called', async () => {
    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast message="Test" duration="5000" />`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => { });
    // Timer should have been started in componentDidLoad
    expect(instance.timer).toBeDefined();
    instance.handleCloseClick();
    // Timer should be cleared
    expect(instance.timer).toBeUndefined();
    expect(instance.isHide).toBe(true);
    // hideTimeout should be set for the animation delay
    expect(instance.hideTimeout).toBeDefined();
  });
  it('emits wppToastComplete only once on idempotent manual close', async () => {
    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast message="Test" duration="50000" />`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => { });
    const emitSpy = jest.spyOn(instance.wppToastComplete, 'emit');
    const timeoutCallbacks = [];
    const setTimeoutSpy = jest
      .spyOn(global, 'setTimeout')
      .mockImplementation((callback) => {
      if (typeof callback === 'function')
        timeoutCallbacks.push(() => callback());
      return timeoutCallbacks.length;
    });
    try {
      instance.handleCloseClick();
      expect(instance.isHide).toBe(true);
      expect(instance.timer).toBeUndefined();
      // Call again — should be safe (idempotent)
      instance.handleCloseClick();
      expect(instance.isHide).toBe(true);
      timeoutCallbacks[timeoutCallbacks.length - 1]?.();
      // Only the second handleCloseClick's hideTimeout should have fired
      // (first was cleared by clearAllTimers in the second call)
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith({ currentIndex: '' });
    }
    finally {
      setTimeoutSpy.mockRestore();
    }
  });
  it('guards startTimer against double-start', async () => {
    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast message="Test" duration="5000" />`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => { });
    const firstTimer = instance.timer;
    expect(firstTimer).toBeDefined();
    // Calling startTimer again should clear the first timer
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    instance.startTimer();
    expect(clearIntervalSpy).toHaveBeenCalled();
    // New timer should be different from the old one
    expect(instance.timer).toBeDefined();
    // Clean up running timers
    instance.disconnectedCallback();
  });
  it('clears all timers on disconnectedCallback', async () => {
    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast message="Test" duration="5000" />`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => { });
    expect(instance.timer).toBeDefined();
    instance.disconnectedCallback();
    expect(instance.timer).toBeUndefined();
    expect(instance.hideTimeout).toBeFalsy();
  });
});

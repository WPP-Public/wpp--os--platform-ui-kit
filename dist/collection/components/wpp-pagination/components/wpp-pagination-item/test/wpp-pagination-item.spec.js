import { newSpecPage } from '@stencil/core/testing';
import { WppPaginationItem } from '../wpp-pagination-item';
import { FOCUS_TYPE } from '../../../../../types/common';
import * as themeUtils from '../../../../../utils/subscribe-to-theme';
describe('wpp-pagination-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number={1}></wpp-pagination-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with selected class and number 2', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number={2} selected></wpp-pagination-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders page number', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number="3"></wpp-pagination-item>`,
    });
    expect(page.root).toBeTruthy();
    expect(page?.root?.shadowRoot.textContent).toContain('3');
  });
  it('emits wppPageChange on click', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number="5"></wpp-pagination-item>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('wppPageChange', spy);
    page.root.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { page: 5 },
    }));
  });
  describe('Testing keyboard accessibility', () => {
    it.each([
      ['Enter', false],
      ['Enter', true],
      [' ', false],
      [' ', true],
    ])('activates page 3 with %s (shift=%s) using the click path', async (key, shiftKey) => {
      const page = await newSpecPage({
        components: [WppPaginationItem],
        html: '<wpp-pagination-item number="3"></wpp-pagination-item>',
      });
      const change = jest.fn();
      const click = jest.fn();
      page.root.addEventListener('wppPageChange', change);
      page.root.addEventListener('click', click);
      const event = new KeyboardEvent('keydown', { key, shiftKey, cancelable: true });
      page.root.dispatchEvent(event);
      page.root.dispatchEvent(new KeyboardEvent('keyup', { key, shiftKey }));
      await page.waitForChanges();
      expect(change).toHaveBeenCalledTimes(1);
      expect(change).toHaveBeenCalledWith(expect.objectContaining({ detail: { page: 3 } }));
      expect(click).toHaveBeenCalledTimes(1);
      expect(event.defaultPrevented).toBe(true);
      expect(page.root.tabIndex).toBe(0);
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.TAB);
    });
    it.each(['Enter', ' '])('ignores held-key repeats for %s', async (key) => {
      const page = await newSpecPage({
        components: [WppPaginationItem],
        html: '<wpp-pagination-item number="2"></wpp-pagination-item>',
      });
      const change = jest.fn();
      const click = jest.fn();
      page.root.addEventListener('wppPageChange', change);
      page.root.addEventListener('click', click);
      page.root.dispatchEvent(new KeyboardEvent('keydown', { key }));
      const repeat = new KeyboardEvent('keydown', { key, repeat: true, cancelable: true });
      page.root.dispatchEvent(repeat);
      await page.waitForChanges();
      expect(change).toHaveBeenCalledTimes(1);
      expect(click).toHaveBeenCalledTimes(1);
      expect(repeat.defaultPrevented).toBe(true);
      page.root.dispatchEvent(new KeyboardEvent('keyup', { key }));
      page.root.dispatchEvent(new KeyboardEvent('keydown', { key }));
      await page.waitForChanges();
      expect(change).toHaveBeenCalledTimes(2);
      expect(click).toHaveBeenCalledTimes(2);
    });
    it.each(['Tab', 'ArrowRight', 'Escape'])('does not activate or prevent %s', async (key) => {
      const page = await newSpecPage({
        components: [WppPaginationItem],
        html: '<wpp-pagination-item number="2"></wpp-pagination-item>',
      });
      const change = jest.fn();
      page.root.addEventListener('wppPageChange', change);
      const event = new KeyboardEvent('keydown', { key, cancelable: true });
      page.root.dispatchEvent(event);
      await page.waitForChanges();
      expect(change).not.toHaveBeenCalled();
      expect(event.defaultPrevented).toBe(false);
    });
    it('exposes button semantics and marks only the selected page as current', async () => {
      const page = await newSpecPage({
        components: [WppPaginationItem],
        html: '<wpp-pagination-item number="3" selected></wpp-pagination-item>',
      });
      expect(page.root.getAttribute('role')).toBe('button');
      expect(page.root.getAttribute('aria-current')).toBe('page');
      page.root.selected = false;
      await page.waitForChanges();
      expect(page.root.hasAttribute('aria-current')).toBe(false);
    });
  });
  it('handles mouse, tab and blur focus states', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number="1"></wpp-pagination-item>`,
    });
    const instance = page.rootInstance;
    page.root.dispatchEvent(new MouseEvent('mousedown'));
    await page.waitForChanges();
    expect(instance.focusType).toBe(FOCUS_TYPE.MOUSE);
    page.root.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    await page.waitForChanges();
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
    page.root.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(instance.focusType).toBe(FOCUS_TYPE.NONE);
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppPaginationItem],
        html: `<wpp-pagination-item number="1"></wpp-pagination-item>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppPaginationItem],
        html: `<wpp-pagination-item number="1"></wpp-pagination-item>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

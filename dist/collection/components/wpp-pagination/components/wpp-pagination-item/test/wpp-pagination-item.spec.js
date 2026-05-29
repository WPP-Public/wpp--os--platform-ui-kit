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

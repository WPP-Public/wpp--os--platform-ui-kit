import { newSpecPage } from '@stencil/core/testing';
import { WppInlineMessage } from '../wpp-inline-message';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-inline-message', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with warning message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='warning message' message-type='warning' />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with error message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='error message' message-type='error' />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with info message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='information message' message-type='information' />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with success message', async () => {
    const page = await newSpecPage({
      components: [WppInlineMessage],
      html: `<wpp-inline-message message='success message' message-type='success' />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  // A clipped message is only reachable by keyboard through its tooltip, so the truncation check
  // has to re-run when the message changes — otherwise the field renders visibly cut-off text with
  // no tab stop and no way to read the rest without a mouse.
  describe('truncated message keyboard access', () => {
    // The mock DOM has no layout, so the widths that decide truncation are stubbed directly.
    const clipMessageEl = (page) => {
      const span = page.root?.shadowRoot?.querySelector('.message');
      Object.defineProperty(span, 'clientWidth', { value: 100, configurable: true });
      Object.defineProperty(span, 'scrollWidth', { value: 400, configurable: true });
    };
    const settle = async (page) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
    };
    it('leaves a message that fits out of the tab order', async () => {
      const page = await newSpecPage({
        components: [WppInlineMessage],
        html: `<wpp-inline-message message='short' />`,
      });
      await settle(page);
      const block = page.root?.shadowRoot?.querySelector('[part="message-block"]');
      expect(block?.getAttribute('tabindex')).toBeNull();
    });
    it('makes a clipped message focusable and wraps it in a tooltip', async () => {
      const page = await newSpecPage({
        components: [WppInlineMessage],
        html: `<wpp-inline-message message='short' />`,
      });
      await settle(page);
      clipMessageEl(page);
      page.root.message = 'a considerably longer message that does not fit inside its box';
      await settle(page);
      const block = page.root?.shadowRoot?.querySelector('[part="message-block"]');
      expect(block?.getAttribute('tabindex')).toBe('0');
      expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).not.toBeNull();
    });
  });
  // The compact message is clamped to two wrapped lines, so it overflows vertically
  // rather than horizontally and truncation has to be measured on the height.
  describe('compact layout', () => {
    const stubMessageSize = (page, size) => {
      const span = page.root?.shadowRoot?.querySelector('.message');
      Object.entries(size).forEach(([key, value]) => Object.defineProperty(span, key, { value, configurable: true }));
    };
    const settle = async (page) => {
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.waitForChanges();
    };
    const renderCompact = async (attributes = '') => {
      const page = await newSpecPage({
        components: [WppInlineMessage],
        html: `<wpp-inline-message size='l' type='error' message='short' ${attributes}></wpp-inline-message>`,
      });
      page.root.isCompact = true;
      await settle(page);
      return page;
    };
    it('should apply the compact class on the host only when isCompact is true', async () => {
      const page = await newSpecPage({
        components: [WppInlineMessage],
        html: `<wpp-inline-message size='l' type='error' message='error message'></wpp-inline-message>`,
      });
      expect(page.rootInstance.isCompact).toBe(false);
      expect(page.root?.classList.contains('wpp-compact')).toBe(false);
      page.root.isCompact = true;
      await page.waitForChanges();
      expect(page.root?.classList.contains('wpp-compact')).toBe(true);
    });
    it('should match the snapshot of the host classes when isCompact is true', async () => {
      const page = await renderCompact();
      expect(page.rootInstance.hostCssClasses()).toMatchSnapshot();
    });
    it('should show a focusable tooltip with the full message when the message overflows the two lines', async () => {
      const page = await renderCompact();
      const longMessage = 'a considerably longer message that wraps onto more than two lines inside its box';
      stubMessageSize(page, { clientHeight: 40, scrollHeight: 100 });
      page.root.message = longMessage;
      await settle(page);
      // wpp-tooltip is not registered in this spec, so its props are reflected as attributes.
      const tooltip = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltip?.getAttribute('text')).toBe(longMessage);
      expect(page.root?.shadowRoot?.querySelector('.message')?.getAttribute('tabindex')).toBe('0');
    });
    it('should not truncate when the message fits in two lines, even if it is wider than its box', async () => {
      const page = await renderCompact();
      const span = page.root?.shadowRoot?.querySelector('.message');
      stubMessageSize(page, { clientHeight: 40, scrollHeight: 40 });
      Object.defineProperty(span, 'clientWidth', { value: 100, configurable: true });
      Object.defineProperty(span, 'scrollWidth', { value: 400, configurable: true });
      page.root.message = 'a message that fits';
      await settle(page);
      expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
    });
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
        components: [WppInlineMessage],
        html: `<wpp-inline-message message='success message' message-type='success' />`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppInlineMessage],
        html: `<wpp-inline-message message='success message' message-type='success' />`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

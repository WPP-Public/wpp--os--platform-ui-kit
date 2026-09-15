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

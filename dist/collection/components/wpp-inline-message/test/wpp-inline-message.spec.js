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

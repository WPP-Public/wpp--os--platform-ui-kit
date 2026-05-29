import { newSpecPage } from '@stencil/core/testing';
import { WppCard } from '../wpp-card';
import * as themeUtils from '../../../../../utils/subscribe-to-theme';
describe('wpp-card', () => {
  it('should render card with context inside', async () => {
    const page = await newSpecPage({
      components: [WppCard],
      html: `<wpp-card><span>test context</span></wpp-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render card with variant secondary', async () => {
    const page = await newSpecPage({
      components: [WppCard],
      html: `<wpp-card variant="secondary"><span>test context</span></wpp-card>`,
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
        components: [WppCard],
        html: `<wpp-card><span>test context</span></wpp-card>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppCard],
        html: `<wpp-card><span>test context</span></wpp-card>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

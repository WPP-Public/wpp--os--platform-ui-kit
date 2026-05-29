import { newSpecPage } from '@stencil/core/testing';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { WppColorPicker } from '../wpp-color-picker';
describe('wpp-color-picker', () => {
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
        components: [WppColorPicker],
        html: `<wpp-color-picker></wpp-color-picker>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppColorPicker],
        html: `<wpp-color-picker></wpp-color-picker>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

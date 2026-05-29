import { newSpecPage } from '@stencil/core/testing';
import { WppPopover } from '../wpp-popover';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-popover', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppPopover],
      html: `<wpp-popover>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div>
                 <wpp-typography>Some content inside popover</wpp-typography>
                 <wpp-action-button>Content Button</wpp-action-button>
               </div>
             </wpp-popover>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
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
        components: [WppPopover],
        html: `<wpp-popover>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div>
                 <wpp-typography>Some content inside popover</wpp-typography>
                 <wpp-action-button>Content Button</wpp-action-button>
               </div>
             </wpp-popover>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppPopover],
        html: `<wpp-popover>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div>
                 <wpp-typography>Some content inside popover</wpp-typography>
                 <wpp-action-button>Content Button</wpp-action-button>
               </div>
             </wpp-popover>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

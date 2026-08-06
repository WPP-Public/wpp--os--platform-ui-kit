import { newSpecPage } from '@stencil/core/testing';
import { WppExpandableCard } from '../wpp-expandable-card';
import { WppAccordion } from '../../wpp-accordion/wpp-accordion';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import * as utils from '../../../utils/utils';
describe('wpp-expandable-card', () => {
  it('should render card with context inside', async () => {
    const page = await newSpecPage({
      components: [WppExpandableCard],
      html: `<wpp-expandable-card><span>test context</span></wpp-expandable-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render expandable section with size xl', async () => {
    const page = await newSpecPage({
      components: [WppExpandableCard],
      html: `<wpp-expandable-card expanded size="xl">
               <wpp-typography type="xl-heading" slot='header'>Section name</wpp-typography>
               <wpp-typography type="s-body">
                  Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
                  imperative for ensuring sustainable success.
               </wpp-typography>
             </wpp-expandable-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('delegates accessible disclosure behavior to its accordion', async () => {
    const slotStateSpy = jest.spyOn(utils, 'getSlotEmptyStates').mockReturnValue({
      actions: true,
      header: true,
      tags: true,
    });
    const page = await newSpecPage({
      components: [WppExpandableCard, WppAccordion],
      html: `<wpp-expandable-card>
               <span slot="header">Section name</span>
               <span>Section content</span>
             </wpp-expandable-card>`,
    });
    const accordion = page.root?.shadowRoot?.querySelector('wpp-accordion');
    const button = accordion?.shadowRoot?.querySelector('button');
    const panel = accordion?.shadowRoot?.querySelector('[part="content"]');
    expect(button?.tagName).toBe('BUTTON');
    expect(button?.getAttribute('aria-controls')).toBe(panel?.id);
    expect(panel?.getAttribute('role')).toBe('region');
    expect(panel?.getAttribute('aria-labelledby')).toBe(button?.id);
    slotStateSpy.mockRestore();
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
        components: [WppExpandableCard],
        html: `<wpp-expandable-card><span>test context</span></wpp-expandable-card>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppExpandableCard],
        html: `<wpp-expandable-card><span>test context</span></wpp-expandable-card>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

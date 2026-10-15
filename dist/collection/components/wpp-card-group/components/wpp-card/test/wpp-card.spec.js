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
  describe('Testing the size prop', () => {
    const getCard = (page) => page.root?.shadowRoot?.querySelector('.card');
    it('should apply the matching size class by default', async () => {
      const page = await newSpecPage({
        components: [WppCard],
        html: `<wpp-card><span>test context</span></wpp-card>`,
      });
      expect(getCard(page)).toHaveClass('size-m');
    });
    it('should apply "size-none" class when size="none", so that no padding is applied', async () => {
      const page = await newSpecPage({
        components: [WppCard],
        html: `<wpp-card size="none"><span>test context</span></wpp-card>`,
      });
      const card = getCard(page);
      expect(card).toHaveClass('size-none');
      expect(card.className.split(' ').some(className => className.startsWith('size-'))).toBe(true);
    });
  });
  describe('Testing radio/checkbox visibility', () => {
    const render = async (html) => {
      const page = await newSpecPage({ components: [WppCard], html });
      return page.root?.shadowRoot;
    };
    it('should show a radio for a standalone single card', async () => {
      const root = await render(`<wpp-card type="single"></wpp-card>`);
      expect(root.querySelector('wpp-radio')).not.toBeNull();
    });
    it('should show a checkbox for a standalone multiple card', async () => {
      const root = await render(`<wpp-card type="multiple"></wpp-card>`);
      expect(root.querySelector('wpp-checkbox')).not.toBeNull();
    });
    it('should not show a control for a card without type', async () => {
      const root = await render(`<wpp-card></wpp-card>`);
      expect(root.querySelector('wpp-radio, wpp-checkbox')).toBeNull();
    });
    it('should hide the control when withRadioOrCheckbox is explicitly false', async () => {
      const page = await newSpecPage({ components: [WppCard], html: `<wpp-card type="single"></wpp-card>` });
      page.root.withRadioOrCheckbox = false;
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('wpp-radio')).toBeNull();
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

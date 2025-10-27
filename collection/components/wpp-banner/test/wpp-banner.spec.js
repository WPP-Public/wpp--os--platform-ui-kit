import { newSpecPage } from '@stencil/core/testing';
import { WppBanner } from '../wpp-banner';
describe('wpp-banner', () => {
  describe('Testing initialisation', () => {
    it('Test default init', async () => {
      const myBtn = new WppBanner();
      expect(myBtn).toBeTruthy();
    });
    it('Test default properties on component', () => {
      const myBtn = new WppBanner();
      expect(myBtn.show).toBeFalsy();
      expect(myBtn.closable).toBeFalsy();
      expect(myBtn.type).toBeFalsy();
      expect(myBtn.wppClose).toBeDefined();
    });
  });
  describe('Testing componentWillLoad', () => {
    it('Should render banner with no action slot', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner>Default Banner</wpp-banner>`,
      });
      const bannerWrapper = page.root?.shadowRoot?.querySelector('.banner-wrapper');
      if (bannerWrapper) {
        // This is needed because jest runs tests in JS DOM env., which is not identical
        // to a real browser environment and may lack certain layout calculations.
        Object.defineProperty(bannerWrapper, 'clientHeight', { value: 48 });
      }
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      // Testing call to this.updateSlotData()
      expect(page.rootInstance.hasActionsSlot).toBeFalsy();
      // Testing call to this.updateMessageText()
      expect(page.rootInstance.messageText).toBe('Default Banner');
      // Testing logic inside setTimeout
      expect(page.rootInstance.heightBanner).toBe(48);
    });
    it('Should render banner with action slot', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `
        <wpp-banner>
          <p>Default Banner<p>
          <div slot="actions">
            <WppActionButton variant="inverted">Close</WppActionButton>
          </div>
        </wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      // Testing second case for this.updateSlotData()
      expect(page.rootInstance.hasActionsSlot).toBeTruthy();
      // Testing second case for this.updateMessageText()
      expect(page.rootInstance.messageText).toBe('Default Banner');
    });
    it('Should render banner with tag but no text', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner show><span></span></wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(page.rootInstance.hasActionsSlot).toBeFalsy();
      expect(page.rootInstance.messageText).toBe('');
    });
  });
  describe('Testing componentDidLoad', () => {
    let page;
    let mockResizeObserver;
    let mockObserve;
    beforeEach(async () => {
      // Mocking ResizeObserver creation
      mockResizeObserver = jest.fn();
      // Mocking observe function of ResizeObserver
      mockObserve = jest.fn();
      // Mocking return value of ResizeObserver
      global.ResizeObserver = mockResizeObserver.mockReturnValue({ observe: mockObserve });
      page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner>Default Banner</wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    afterEach(() => {
      // Clearing mocks for ResizeObserver
      jest.clearAllMocks();
    });
    it('Testing creation of ResizeObserver', () => {
      const contentWrapper = page.root?.shadowRoot?.querySelector('.content-wrapper');
      // Test that contentWrapper element is queried successfully
      expect(contentWrapper).toBeTruthy();
      // Test that ResizeObserver is created and initialised
      expect(mockResizeObserver).toHaveBeenCalledTimes(1);
      // Test that the ResizeObserver starts observing the queried element.
      expect(mockObserve).toHaveBeenCalledWith(contentWrapper);
    });
    it('Testing that ResizeObserver is called onResize', () => {
      // Create spy for updateOverflowState function, which is the callback passed to ResizeObserver
      const updateOverflowStateSpy = jest.spyOn(page.rootInstance, 'updateOverflowState');
      // Simulate resize callback
      mockResizeObserver.mock.calls[0][0]();
      // Test that ResizeObserver's callback has been caled
      expect(updateOverflowStateSpy).toHaveBeenCalled();
    });
  });
  describe('Testing disconnectedCallback', () => {
    it('Testing disconnect call', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner>Default Banner</wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      // Mock disconnect function of resizeObserver
      page.rootInstance.resizeObserver = {
        disconnect: jest.fn(),
      };
      // Simulate removing the component so disconnectCallback is called
      if (page.root) {
        page.root.remove();
      }
      await page.waitForChanges();
      // Test `disconnect` has been called
      expect(page.rootInstance.resizeObserver.disconnect).toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });
  describe('Testing updateOverflowState', () => {
    it('Should set this.isOverflowing to true', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner>Default Banner</wpp-banner>`,
      });
      const messageEl = page.rootInstance.host.shadowRoot.querySelector('.message');
      // Test that the message element exists
      expect(messageEl).toBeTruthy();
      // Prepare scenario
      Object.defineProperty(messageEl, 'scrollWidth', { value: 200 });
      Object.defineProperty(messageEl, 'clientWidth', { value: 100 });
      jest.spyOn(page.rootInstance.host.shadowRoot, 'querySelector').mockReturnValue(messageEl);
      page.rootInstance.updateOverflowState();
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.rootInstance.isOverflowing).toBe(true);
    });
    it('Should set this.isOverflowing to false', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner>Default Banner</wpp-banner>`,
      });
      const messageEl = page.rootInstance.host.shadowRoot.querySelector('.message');
      // Test that the message element exists
      expect(messageEl).toBeTruthy();
      // Prepare scenario
      Object.defineProperty(messageEl, 'scrollWidth', { value: 100 });
      Object.defineProperty(messageEl, 'clientWidth', { value: 100 });
      jest.spyOn(page.rootInstance.host.shadowRoot, 'querySelector').mockReturnValue(messageEl);
      page.rootInstance.updateOverflowState();
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.rootInstance.isOverflowing).toBe(false);
    });
  });
  describe('Testing interactions', () => {
    it('Testing handleCloseIconClick', async () => {
      // Banner needs to have `closable` property in order to have the close icon
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner closable show>Default Banner</wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      // Actual component
      const component = page.rootInstance;
      // Test that wppClose event is defined on component so it can be used
      expect(component.wppClose).toBeDefined();
      // Setup spy for wppClose event.
      const wppCloseSpy = jest.spyOn(component.wppClose, 'emit');
      // Query for close btn element.
      const btnEl = page.root?.shadowRoot?.querySelector('.close-button');
      expect(btnEl).toBeTruthy();
      expect(component.show).toBe(true);
      if (btnEl) {
        // Click close button to hide the banner.
        btnEl.click();
      }
      await page.waitForChanges();
      expect(component.show).toBe(false);
      expect(wppCloseSpy).toHaveBeenCalledWith({ show: false });
    });
  });
  describe('Snapshots - Testing classes and states', () => {
    it('Default banner', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner />`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Closable banner', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner closable show>
          Closable banner
        </wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Warning banner - closable', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner type='warning' closable show>
          Warning banner
        </wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Information banner - closable', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner type='information' closable show>
                  Some information-testing message
               </wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Information banner - closable with actions', async () => {
      const page = await newSpecPage({
        components: [WppBanner],
        html: `<wpp-banner type='information' closable show>
                  Some information-testing message
                  <div slot="actions">
                      <wpp-action-button variant="inverted">Close</wpp-action-button>
                  </div>
               </wpp-banner>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

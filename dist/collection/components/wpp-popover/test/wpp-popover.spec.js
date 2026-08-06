import { h } from '@stencil/core';
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
  it('should render optional left clear action and emit wppClear when clicked', async () => {
    const page = await newSpecPage({
      components: [WppPopover],
      html: `<wpp-popover show-clear-button>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div>
                 <wpp-typography>Some content inside popover</wpp-typography>
               </div>
               <wpp-action-button slot='actions'>Apply</wpp-action-button>
             </wpp-popover>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const clearSpy = jest.fn();
    page.root?.addEventListener('wppClear', clearSpy);
    const footer = page.root?.shadowRoot?.querySelector('.wpp-popover-footer');
    const clearButton = footer?.querySelector('.wpp-popover-clear-action wpp-action-button');
    const actionsSlot = footer?.querySelector('slot[name="actions"]');
    expect(footer).toBeTruthy();
    expect(clearButton?.textContent?.trim()).toBe('Clear');
    expect(actionsSlot).toBeTruthy();
    clearButton.click();
    await page.waitForChanges();
    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(clearSpy.mock.calls[0][0].detail).toEqual({ clear: true });
  });
  it('should move default content before footer and named actions into footer actions', async () => {
    const page = await newSpecPage({
      components: [WppPopover],
      html: `<wpp-popover show-clear-button>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div data-testid='popover-content'>Content</div>
               <wpp-action-button slot='actions'>Apply</wpp-action-button>
             </wpp-popover>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
    const defaultContent = contentEl?.querySelector('[data-testid="popover-content"]');
    const footer = contentEl?.querySelector('.wpp-popover-footer');
    const footerActions = footer?.querySelector('.wpp-popover-footer-actions');
    expect(defaultContent).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(Array.from(contentEl?.children || []).indexOf(defaultContent)).toBeLessThan(Array.from(contentEl?.children || []).indexOf(footer));
    expect(Array.from(footerActions?.querySelectorAll('[slot="actions"]') || []).map(action => action.textContent)).toEqual(['Apply']);
  });
  it('should observe the trigger-element node even when light DOM children are reordered', async () => {
    const originalMutationObserver = global.MutationObserver;
    const observeSpy = jest.fn();
    const disconnectSpy = jest.fn();
    class MutationObserverMock {
      constructor(callback) {
        this.disconnect = disconnectSpy;
        this.observe = observeSpy;
        this.takeRecords = () => [];
        void callback;
      }
    }
    global.MutationObserver = MutationObserverMock;
    try {
      const page = await newSpecPage({
        components: [WppPopover],
        html: `<wpp-popover show-clear-button>
                 <wpp-action-button slot='actions'>Apply</wpp-action-button>
                 <div data-testid='popover-content'>Content</div>
                 <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               </wpp-popover>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const triggerElement = page.root?.querySelector('[slot="trigger-element"]');
      expect(observeSpy).toHaveBeenCalledWith(triggerElement, { attributes: true });
    }
    finally {
      global.MutationObserver = originalMutationObserver;
    }
  });
  it('should render custom clear text from locales', async () => {
    const page = await newSpecPage({
      components: [WppPopover],
      template: () => (h("wpp-popover-v4-3-0", { showClearButton: true, locales: { clearText: 'Reset' } }, h("wpp-button-v4-3-0", { slot: "trigger-element" }, "Trigger Button"), h("div", null, "Content"))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const clearButton = page.root?.shadowRoot?.querySelector('.wpp-popover-clear-action wpp-action-button');
    expect(clearButton?.textContent?.trim()).toBe('Reset');
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

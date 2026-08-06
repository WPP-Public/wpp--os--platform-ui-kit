import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSideModal } from '../wpp-side-modal';
import * as utils from '../../../utils/utils';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-side-modal', () => {
  it('Should render defaut side modal', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      html: `<wpp-side-modal></wpp-side-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should render open side modal', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      html: `<wpp-side-modal open>
      <div slot="header">Title</div>
      <div slot="actions" style="display:flex; justify-content: end;">
        <wpp-action-button variant="secondary" size="s">Close</wpp-action-button>
        <wpp-button variant="primary" size="s">Action</wpp-button>
      </div>
      </wpp-side-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // `is-open` is not a real attribute, so this used to snapshot a closed modal.
    expect(page.root?.shadowRoot?.querySelector('.side-modal')).toHaveClass('visible');
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-side-modal accessible name', () => {
  it('derives the dialog name from the header slot and emits no dangling IDREF', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      html: `<wpp-side-modal open><div slot="header">Reports</div></wpp-side-modal>`,
    });
    expect(page.root).toEqualAttribute('aria-label', 'Reports');
    expect(page.root?.hasAttribute('aria-labelledby')).toBe(false);
  });
  it('honours a consumer supplied ariaProps.labelledby instead of deriving a name', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => (h("wpp-side-modal-v4-3-0", { open: true, ariaProps: { role: 'dialog', labelledby: 'their-title' } }, h("div", { slot: "header" }, "Reports"))),
    });
    expect(page.root).toEqualAttribute('aria-labelledby', 'their-title');
    expect(page.root?.hasAttribute('aria-label')).toBe(false);
  });
});
describe('wpp-side-modal headerActionsConfig accessibility', () => {
  it('gives every config-driven header action button an accessible name', async () => {
    const config = [
      { icon: 'wpp-icon-info', ariaLabel: 'Info', onClick: () => { } },
      { icon: 'wpp-icon-plus', ariaLabel: 'Add', onClick: () => { } },
    ];
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => (h("wpp-side-modal-v4-3-0", { open: true, headerActionsConfig: config }, h("div", { slot: "header" }, "Title"))),
    });
    const buttons = Array.from(page.root?.shadowRoot?.querySelectorAll('.header-action-buttons-container wpp-action-button') ?? []);
    expect(buttons).toHaveLength(2);
    expect(buttons.map(button => button.ariaProps)).toEqual([{ label: 'Info' }, { label: 'Add' }]);
  });
});
describe('wpp-side-modal osBarCompatible', () => {
  it('sets topOffset to 0 when osBarCompatible is false', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      html: `<wpp-side-modal></wpp-side-modal>`,
    });
    expect(page.root?.style.getPropertyValue('--wpp-side-modal-top-offset')).toBe('0px');
  });
  it('calls getOsBarOffsetHeight when osBarCompatible is true', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(72);
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => h("wpp-side-modal-v4-3-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-side-modal-top-offset')).toBe('72px');
    spy.mockRestore();
  });
  it('applies wpp-os-bar-compatible CSS class when osBarCompatible is true', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => h("wpp-side-modal-v4-3-0", { osBarCompatible: true }),
    });
    expect(page.root).toHaveClass('wpp-os-bar-compatible');
  });
  it('sets --wpp-side-modal-top-offset style based on getOsBarOffsetHeight', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(64);
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => h("wpp-side-modal-v4-3-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-side-modal-top-offset')).toBe('64px');
    spy.mockRestore();
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
        components: [WppSideModal],
        html: `<wpp-side-modal></wpp-side-modal>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppSideModal],
        html: `<wpp-side-modal></wpp-side-modal>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

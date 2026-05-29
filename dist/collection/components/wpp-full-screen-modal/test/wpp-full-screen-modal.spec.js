import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFullScreenModal } from '../wpp-full-screen-modal';
import * as utils from '../../../utils/utils';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-full-screen-modal', () => {
  it('Should render default modal', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should render open full-screen modal', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal is-open=${true}></wpp-full-screen-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-full-screen-modal osBarCompatible', () => {
  it('sets topOffset to 0 when osBarCompatible is false', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
    });
    expect(page.root?.style.getPropertyValue('--wpp-full-screen-modal-top-offset')).toBe('0px');
  });
  it('calls getOsBarOffsetHeight when osBarCompatible is true', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(72);
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      template: () => h("wpp-full-screen-modal-v4-1-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-full-screen-modal-top-offset')).toBe('72px');
    spy.mockRestore();
  });
  it('applies wpp-os-bar-compatible CSS class when osBarCompatible is true', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      template: () => h("wpp-full-screen-modal-v4-1-0", { osBarCompatible: true }),
    });
    expect(page.root).toHaveClass('wpp-os-bar-compatible');
  });
  it('does not apply wpp-os-bar-compatible CSS class when osBarCompatible is false', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
    });
    expect(page.root).not.toHaveClass('wpp-os-bar-compatible');
  });
  it('sets --wpp-full-screen-modal-top-offset style based on getOsBarOffsetHeight', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(64);
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      template: () => h("wpp-full-screen-modal-v4-1-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-full-screen-modal-top-offset')).toBe('64px');
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
        components: [WppFullScreenModal],
        html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppFullScreenModal],
        html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSideModal } from '../wpp-side-modal';
import * as utils from '../../../utils/utils';
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
      html: `<wpp-side-modal is-open=${true}>
      <div slot="header">Title</div>
      <div slot="actions" style="display:flex; justify-content: end;">
        <wpp-action-button variant="secondary" size="s">Close</wpp-action-button>
        <wpp-button variant="primary" size="s">Action</wpp-button>
      </div>
      </wpp-side-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
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
      template: () => h("wpp-side-modal-v3-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-side-modal-top-offset')).toBe('72px');
    spy.mockRestore();
  });
  it('applies wpp-os-bar-compatible CSS class when osBarCompatible is true', async () => {
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => h("wpp-side-modal-v3-6-0", { osBarCompatible: true }),
    });
    expect(page.root).toHaveClass('wpp-os-bar-compatible');
  });
  it('sets --wpp-side-modal-top-offset style based on getOsBarOffsetHeight', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(64);
    const page = await newSpecPage({
      components: [WppSideModal],
      template: () => h("wpp-side-modal-v3-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-side-modal-top-offset')).toBe('64px');
    spy.mockRestore();
  });
});

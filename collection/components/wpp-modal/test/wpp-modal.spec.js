import { newSpecPage } from '@stencil/core/testing';
import { WppModal } from '../wpp-modal';
describe('wpp-modal', () => {
  it('Should render defaut modal', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should render open modal', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal is-open=${true}></wpp-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

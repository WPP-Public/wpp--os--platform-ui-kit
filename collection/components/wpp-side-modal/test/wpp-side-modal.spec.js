import { newSpecPage } from '@stencil/core/testing';
import { WppSideModal } from '../wpp-side-modal';
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

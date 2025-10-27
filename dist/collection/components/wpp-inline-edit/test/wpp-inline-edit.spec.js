import { newSpecPage } from '@stencil/core/testing';
import { WppInlineEdit } from '../wpp-inline-edit';
describe('wpp-inline-edit', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppInlineEdit],
      html: `<wpp-inline-edit>Text</wpp-inline-edit>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

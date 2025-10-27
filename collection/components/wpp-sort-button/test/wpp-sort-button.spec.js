import { newSpecPage } from '@stencil/core/testing';
import { WppSortButton } from '../wpp-sort-button';
describe('wpp-sort-button', () => {
  it('should render sort button', async () => {
    const page = await newSpecPage({
      components: [WppSortButton],
      html: `<wpp-sort-button />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled sort button', async () => {
    const page = await newSpecPage({
      components: [WppSortButton],
      html: `<wpp-sort-button .disabled=${true} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

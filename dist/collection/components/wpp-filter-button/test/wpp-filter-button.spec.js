import { newSpecPage } from '@stencil/core/testing';
import { WppFilterButton } from '../wpp-filter-button';
describe('wpp-filter-button', () => {
  it('should render filter button', async () => {
    const page = await newSpecPage({
      components: [WppFilterButton],
      html: `<wpp-filter-button />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled filter button', async () => {
    const page = await newSpecPage({
      components: [WppFilterButton],
      html: `<wpp-filter-button .disabled=${true} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render filter button with counter', async () => {
    const page = await newSpecPage({
      components: [WppFilterButton],
      html: `<wpp-filter-button .loading=${true} counter='3'>Filter</wpp-filter-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

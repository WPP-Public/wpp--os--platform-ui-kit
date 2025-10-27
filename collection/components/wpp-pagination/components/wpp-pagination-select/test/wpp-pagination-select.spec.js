import { newSpecPage } from '@stencil/core/testing';
import { WppPaginationSelect } from '../wpp-pagination-select';
describe('wpp-pagination-select', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 10 pages', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count={10}></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 8 pages and active page 2', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count={8} activePageNumber={2}></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

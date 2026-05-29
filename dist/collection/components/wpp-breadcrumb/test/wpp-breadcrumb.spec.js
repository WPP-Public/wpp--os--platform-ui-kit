import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBreadcrumb } from '../wpp-breadcrumb';
describe('wpp-breadcrumb', () => {
  it('renders correctly with no items', async () => {
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-1-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders correctly with items', async () => {
    const items = [
      {
        label: 'Home',
        path: '/',
      },
      {
        label: 'Alfa',
        path: '/alfa',
      },
      {
        label: 'Bravo (International Radiotelephony Spelling Alphabet)',
        path: '/bravo',
      },
      {
        label: 'Charlie',
        path: '/charlie',
      },
      {
        label: 'Delta (International Radiotelephony Spelling Alphabet)',
        path: '/delta',
      },
      {
        label: 'Echo',
        path: '/echo',
      },
      {
        label: 'Foxtrot',
        path: '/foxtrot',
      },
    ];
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-1-0", { items: items }),
    });
    expect(page.root).toMatchSnapshot();
  });
});

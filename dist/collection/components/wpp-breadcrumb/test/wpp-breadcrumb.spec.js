import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBreadcrumb } from '../wpp-breadcrumb';
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
describe('wpp-breadcrumb', () => {
  it('Testing values of default props when initialized', async () => {
    const breadcrumb = new WppBreadcrumb();
    expect(breadcrumb.items.length).toBe(0);
    expect(breadcrumb.maxLabelLength).toBe(30);
    expect(breadcrumb.middleTruncation).toBe(false);
    expect(breadcrumb.nativeLink).toBe(false);
    expect(breadcrumb.dropdownConfig).toEqual({});
    expect(breadcrumb.backBtnLabel).toBe(undefined);
  });
  it('renders correctly with no items', async () => {
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-2-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders correctly with items', async () => {
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-2-0", { items: items }),
    });
    expect(page.root).toMatchSnapshot();
  });
});

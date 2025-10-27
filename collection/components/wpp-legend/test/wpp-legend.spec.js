import { newSpecPage } from '@stencil/core/testing';
import { WppLegend } from '../wpp-legend';
describe('wpp-legend', () => {
  it('renders component with out label', async () => {
    const page = await newSpecPage({
      components: [WppLegend],
      html: `<wpp-legend></wpp-legend>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label', async () => {
    const page = await newSpecPage({
      components: [WppLegend],
      html: `<wpp-legend label="test"></wpp-legend>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label and custom color', async () => {
    const page = await newSpecPage({
      components: [WppLegend],
      html: `<wpp-legend label="test" color="var(--wpp-dataviz-color-cat-neutral-4)"></wpp-legend>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

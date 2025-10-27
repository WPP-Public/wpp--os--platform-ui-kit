import { newSpecPage } from '@stencil/core/testing';
import { WppGrid } from '../wpp-grid';
describe('wpp-grid', () => {
  it('should render wpp-grid component', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid container component with all default styles', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid container="true" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid item component with all default styles', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid item="true"></wpp-grid>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid component with item inside', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid container="true"><wpp-grid item="true"></wpp-grid></wpp-grid>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid item without adding container classes', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid item="true" direction='column' alignItems='center'></wpp-grid>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid content with row spacing', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid container=${true} row-spacing=${12} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-grid content with inner spacing', async () => {
    const page = await newSpecPage({
      components: [WppGrid],
      html: `<wpp-grid container=${true} fullWidth=${true} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

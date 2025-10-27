import { newSpecPage } from '@stencil/core/testing';
import { WppProgressIndicator } from '../wpp-progress-indicator';
describe('wpp-progress-indicator', () => {
  it('Should render default progress indicator', async () => {
    const page = await newSpecPage({
      components: [WppProgressIndicator],
      html: `<wpp-progress-indicator />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('Should render circle progress indicator', async () => {
    const page = await newSpecPage({
      components: [WppProgressIndicator],
      html: `<wpp-progress-indicator variant="circle" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('Should render circle progress indicator with custom width and text', async () => {
    const page = await newSpecPage({
      components: [WppProgressIndicator],
      html: `<wpp-progress-indicator variant="circle" width=${100} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('Should render linear progress indicator with text', async () => {
    const page = await newSpecPage({
      components: [WppProgressIndicator],
      html: `<wpp-progress-indicator width=${600} label="Loading..." />`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WppSpinner } from '../wpp-spinner';
describe('wpp-spinner', () => {
  it('should render loading spinner', async () => {
    const page = await newSpecPage({
      components: [WppSpinner],
      html: `<wpp-spinner/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render loading spinner with prop color and size m', async () => {
    const page = await newSpecPage({
      components: [WppSpinner],
      html: `<wpp-spinner color="var(--wpp-danger-color-300)" size="m"/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WppCard } from '../wpp-card';
describe('wpp-card', () => {
  it('should render card with context inside', async () => {
    const page = await newSpecPage({
      components: [WppCard],
      html: `<wpp-card><span>test context</span></wpp-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render card with variant secondary', async () => {
    const page = await newSpecPage({
      components: [WppCard],
      html: `<wpp-card variant="secondary"><span>test context</span></wpp-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

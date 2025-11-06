import { newSpecPage } from '@stencil/core/testing';
import { WppMenuList } from '../wpp-menu-list';
describe('wpp-menu-list', () => {
  it('Should renders wpp-menu-list', async () => {
    const page = await newSpecPage({
      components: [WppMenuList],
      html: `
      <wpp-menu-list>
        <wpp-button
          .size="m"
          .disabled=${false}
          .loading=${false}
          variant="destructive"
          slot="trigger-element"
        >Button</wpp-button
        >
        <wpp-list-item>Item</wpp-list-item>
        <wpp-list-item>Item</wpp-list-item>
      </wpp-menu-list>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

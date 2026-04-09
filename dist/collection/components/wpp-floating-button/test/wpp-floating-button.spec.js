import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFloatingButton } from '../wpp-floating-button';
describe('wpp-floating-button', () => {
  it('should render primary floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-0-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-0-0", { disabled: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render loading floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-0-0", { loading: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
});

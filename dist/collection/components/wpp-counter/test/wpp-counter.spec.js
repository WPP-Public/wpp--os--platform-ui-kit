import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppCounter } from '../wpp-counter';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-counter', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppCounter],
      html: `<wpp-counter />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with warning message', async () => {
    const page = await newSpecPage({
      components: [WppCounter],
      html: `<wpp-counter message-type='warning'/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with value 50', async () => {
    const page = await newSpecPage({
      components: [WppCounter],
      html: `<wpp-counter value=${50} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppCounter, WppLabel, WppInternalLabel],
      template: () => h("wpp-counter-v2-22-0", { labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
});

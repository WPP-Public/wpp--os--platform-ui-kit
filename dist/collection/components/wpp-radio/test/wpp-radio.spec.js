import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppRadio } from '../wpp-radio';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-radio', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label text', async () => {
    const page = await newSpecPage({
      components: [WppRadio, WppLabel, WppInternalLabel],
      template: () => h("wpp-radio-v2-22-0", { name: "contact", value: "email", labelConfig: { text: 'Email' } }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppRadio, WppLabel, WppInternalLabel],
      template: () => h("wpp-radio-v2-22-0", { name: "contact", value: "email", labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with disabled state', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio label='LabelRadioButton' disabled />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with checked state', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio checked />`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

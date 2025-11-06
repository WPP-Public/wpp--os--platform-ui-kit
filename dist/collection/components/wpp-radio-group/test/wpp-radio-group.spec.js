import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppRadioGroup } from '../wpp-radio-group';
import { WppRadio } from '../../wpp-radio/wpp-radio';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-radio-group', () => {
  it('renders component with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup, WppRadio, WppLabel, WppInternalLabel],
      template: () => (h("wpp-radio-group-v2-22-0", null, h("wpp-radio-v2-22-0", { name: "contact", value: "email", labelConfig: { text: 'Email' } }), h("wpp-radio-v2-22-0", { name: "contact", value: "mail", labelConfig: { text: 'Mail' } }), h("wpp-radio-v2-22-0", { name: "contact", value: "phone", labelConfig: { text: 'Phone' } }))),
    });
    expect(page.root).toMatchSnapshot();
  });
});

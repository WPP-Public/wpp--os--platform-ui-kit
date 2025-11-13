import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppCheckboxGroup } from '../wpp-checkbox-group';
import { WppCheckbox } from '../../wpp-checkbox/wpp-checkbox';
describe('wpp-checkbox-group', () => {
  it('should render checkbox-group with 4 items', async () => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup, WppCheckbox],
      template: () => (h("wpp-checkbox-group-v3-3-1", null, h("wpp-checkbox-v3-3-1", { required: true, name: "email", value: "email", labelConfig: { text: 'Email' } }), h("wpp-checkbox-v3-3-1", { required: true, name: "mail", value: "mail", labelConfig: { text: 'Mail' } }), h("wpp-checkbox-v3-3-1", { required: true, name: "phone", value: "phone", labelConfig: { text: 'Phone' } }), h("wpp-checkbox-v3-3-1", { required: true, name: "fax", value: "fax", labelConfig: { text: 'Fax' } }))),
    });
    expect(page.root).toMatchSnapshot();
  });
});

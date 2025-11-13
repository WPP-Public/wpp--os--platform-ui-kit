import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-select', () => {
  it('should render wpp-select with combined type with options list', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      html: `
        <wpp-select placeholder='placeholder' type='combined'>
          <wpp-list-item value="car" data-id="1"><span slot="label">Car</span></wpp-list-item>
          <wpp-list-item value="house" data-id="2" disabled><span slot="label">House</span></wpp-list-item>
          <wpp-list-item value="apartment" data-id="3"><span slot="label">Apartment</span></wpp-list-item>
        </wpp-select>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-select with combined type with options list and with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppSelect, WppListItem, WppLabel, WppInternalLabel],
      template: () => (h("wpp-select-v3-3-1", { placeholder: "Placeholder", type: "combined", labelConfig: labelConfig }, h("wpp-list-item-v3-3-1", { value: "car", "data-id": "1" }, h("span", { slot: "label" }, "Car")), h("wpp-list-item-v3-3-1", { value: "house", "data-id": "2", disabled: true }, h("span", { slot: "label" }, "House")), h("wpp-list-item-v3-3-1", { value: "apartment", "data-id": "3" }, h("span", { slot: "label" }, "Apartment")))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSearch } from '../wpp-search';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-search', () => {
  it('should render empty', async () => {
    const page = await newSpecPage({
      components: [WppSearch],
      html: `<wpp-search></wpp-search>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render empty with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppSearch, WppLabel, WppInternalLabel],
      template: () => h("wpp-search-v3-3-1", { labelConfig: labelConfig }),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render with options and form elements', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v3-3-1", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message" }, h("wpp-list-item-v3-3-1", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v3-3-1", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v3-3-1", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v3-3-1", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render with selected values', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v3-3-1", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message", value: [
          { id: 1, label: 'Item 1' },
          { id: 2, label: 'Item 2' },
        ] }, h("wpp-list-item-v3-3-1", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v3-3-1", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v3-3-1", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v3-3-1", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render opened in loading state', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v3-3-1", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message", value: [
          { id: 1, label: 'Item 1' },
          { id: 2, label: 'Item 2' },
        ], loading: true }, h("wpp-list-item-v3-3-1", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v3-3-1", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v3-3-1", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v3-3-1", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    page.root?.querySelector('wpp-search')?.click();
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

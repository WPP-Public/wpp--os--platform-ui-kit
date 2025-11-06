import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppCheckbox } from '../wpp-checkbox';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-checkbox', () => {
  it('should render checkbox', async () => {
    const page = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled checkbox', async () => {
    const { root } = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox disabled />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render checked checkbox', async () => {
    const { root } = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox checked />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render checked disabled checkbox', async () => {
    const { root } = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox checked disabled  />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render indeterminate checkbox', async () => {
    const { root } = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox indeterminate />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render indeterminate disabled checkbox', async () => {
    const { root } = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox indeterminate disabled />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render checked disabled checkbox with label', async () => {
    const labelConfig = {
      text: 'Label',
    };
    const { root } = await newSpecPage({
      components: [WppCheckbox, WppLabel, WppInternalLabel],
      template: () => h("wpp-checkbox-v2-22-0", { checked: true, disabled: true, labelConfig: labelConfig }),
    });
    expect(root).toMatchSnapshot();
  });
  it('should render indeterminate checkbox with label', async () => {
    const labelConfig = {
      text: 'Label',
    };
    const { root } = await newSpecPage({
      components: [WppCheckbox, WppLabel, WppInternalLabel],
      template: () => h("wpp-checkbox-v2-22-0", { indeterminate: true, labelConfig: labelConfig }),
    });
    expect(root).toMatchSnapshot();
  });
  it('should render indeterminate disabled checkbox with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const { root } = await newSpecPage({
      components: [WppCheckbox, WppLabel, WppInternalLabel],
      template: () => h("wpp-checkbox-v2-22-0", { indeterminate: true, disabled: true, name: "checkbox", labelConfig: labelConfig }),
    });
    expect(root).toMatchSnapshot();
  });
});

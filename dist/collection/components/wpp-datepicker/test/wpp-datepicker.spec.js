import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppDatepicker } from '../wpp-datepicker';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe.skip('wpp-datepicker', () => {
  it('should render single select datepicker', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render single select datepicker with s size', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker size="s" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range datepicker', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker range />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range datepicker with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppDatepicker, WppLabel, WppInternalLabel],
      template: () => h("wpp-datepicker-v3-4-0", { range: true, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render datepicker with button trigger variant', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v3-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should have wpp-button-trigger class when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v3-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toHaveClass('wpp-button-trigger');
  });
  it('should render trigger-wrapper part when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v3-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const triggerWrapper = page.root?.shadowRoot?.querySelector('[part="trigger-wrapper"]');
    expect(triggerWrapper).not.toBeNull();
  });
  it('should not render input when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v3-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const input = page.root?.shadowRoot?.querySelector('input#datepicker');
    expect(input).toBeNull();
  });
});

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
      template: () => h("wpp-datepicker-v2-22-0", { range: true, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
});

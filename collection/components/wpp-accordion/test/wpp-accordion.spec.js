import { newSpecPage } from '@stencil/core/testing';
import { WppAccordion } from '../wpp-accordion';
describe('wpp-accordion', () => {
  it('should render expandable section', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion>
               <wpp-typography type='m-strong' slot='header'>Section name</wpp-typography>
             </wpp-accordion>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render expanded expandable section with size s', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion expanded size="s">
               <wpp-typography type='s-strong' slot='header'>Section name</wpp-typography>
               <wpp-checkbox></wpp-checkbox>
               <wpp-checkbox></wpp-checkbox>
               <wpp-checkbox></wpp-checkbox>
             </wpp-accordion>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

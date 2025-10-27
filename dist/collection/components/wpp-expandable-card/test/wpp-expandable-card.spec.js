import { newSpecPage } from '@stencil/core/testing';
import { WppExpandableCard } from '../wpp-expandable-card';
describe('wpp-expandable-card', () => {
  it('should render card with context inside', async () => {
    const page = await newSpecPage({
      components: [WppExpandableCard],
      html: `<wpp-expandable-card><span>test context</span></wpp-expandable-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render expandable section with size xl', async () => {
    const page = await newSpecPage({
      components: [WppExpandableCard],
      html: `<wpp-expandable-card expanded size="xl">
               <wpp-typography type="xl-heading" slot='header'>Section name</wpp-typography>
               <wpp-typography type="s-body">
                  Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
                  imperative for ensuring sustainable success.
               </wpp-typography>
             </wpp-expandable-card>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});

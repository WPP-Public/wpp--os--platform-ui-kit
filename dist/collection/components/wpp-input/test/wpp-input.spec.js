import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppInput } from '../wpp-input';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-input', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="text" name="text-input" value="test" size="m" placeholder="Text"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with warning message', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="text" name="text-input" value="test" size="s" placeholder="Text" message-type="warning" message="Warning message"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
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
      components: [WppInput, WppLabel, WppInternalLabel],
      template: () => h("wpp-input-v2-22-0", { labelConfig: labelConfig }),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with search type', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="search" name="search-input" value="test" size="s" placeholder="Text" message-type="warning" message="Warning message"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

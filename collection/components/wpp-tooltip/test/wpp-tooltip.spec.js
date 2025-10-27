import { newSpecPage } from '@stencil/core/testing';
import { WppTooltip } from '../wpp-tooltip';
describe('wpp-tooltip', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with text and value', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' value='100'></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with error state', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' error></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with right placement', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' error placement='right'></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

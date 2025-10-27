import { newE2EPage } from '@stencil/core/testing';
describe('wpp-textarea-input', () => {
  it('renders component', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-textarea-input></wpp-textarea-input>');
    const element = await page.find('wpp-textarea-input');
    expect(element).toHaveClass('hydrated');
  });
  it('shows characters-limit message with warning state and error state', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-textarea-input characters-limit="10" warning-threshold="5">');
    const element = await page.find('wpp-textarea-input >>> textarea');
    const charLimitMessage = await page.find('wpp-textarea-input >>> .characters-limit');
    const charLimitNumber = await page.find('wpp-textarea-input >>> .entered-characters');
    await element.type('qwerty');
    expect(charLimitMessage).toHaveClass('warning');
    expect(charLimitNumber).toEqualText('6/10');
    await element.type('12345');
    expect(charLimitMessage).not.toHaveClass('warning');
    expect(charLimitMessage).toHaveClass('error');
    expect(charLimitNumber).toEqualText('11/10');
  });
});

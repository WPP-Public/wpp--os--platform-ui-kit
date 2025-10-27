import { newE2EPage } from '@stencil/core/testing';
describe('wpp-input', () => {
  it('renders component with hydrated class', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-input/>');
    const element = await page.find('wpp-input');
    expect(element).toHaveClass('hydrated');
  });
  it('triggers onChange event when something is types', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-input />');
    const textInput = await page.find('wpp-input');
    const inputChange = await textInput.spyOnEvent('wppChange');
    const element = await page.find('wpp-input >>> input');
    await element.press('a');
    expect(inputChange).toHaveReceivedEventDetail({ value: 'a' });
    await element.press('b');
    expect(inputChange).toHaveReceivedEventDetail({ value: 'ab' });
  });
  it('clears input field when cross icon was clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-input type="search" />');
    const input = await page.find('wpp-input >>> input');
    await input.press('a');
    const inputValueBeforeClick = await input.getProperty('value');
    const crossIconAfterInputChange = await page.find('wpp-input >>> wpp-icon-cross');
    expect(inputValueBeforeClick).toEqual('a');
    expect(crossIconAfterInputChange).not.toEqual(null);
    await crossIconAfterInputChange.click();
    const inputValueAfterClick = await input.getProperty('value');
    expect(inputValueAfterClick).toEqual('');
    const crossIconAfterClearInput = await page.find('wpp-input >>> wpp-icon-cross');
    expect(crossIconAfterClearInput).toEqual(null);
  });
});

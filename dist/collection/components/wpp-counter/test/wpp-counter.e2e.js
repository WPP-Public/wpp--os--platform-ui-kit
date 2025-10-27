import { newE2EPage } from '@stencil/core/testing';
describe('wpp-counter', () => {
  it('renders component with hydrated class', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-counter/>');
    const element = await page.find('wpp-counter');
    expect(element).toHaveClass('hydrated');
  });
  it('changes value when clicked on increase/decrease block', async () => {
    const page = await newE2EPage();
    await page.setContent('<wpp-counter value="5"/>');
    const counterInputElement = await page.find('wpp-counter >>> .counter-input');
    const decreaseElement = await page.find('wpp-counter >>> .decrease-wrapper');
    const increaseElement = await page.find('wpp-counter >>> .increase-wrapper');
    const initiallyCounterValue = await counterInputElement.getProperty('value');
    expect(initiallyCounterValue).toEqual('5');
    await increaseElement.click();
    const valueAfterIncreasing = await counterInputElement.getProperty('value');
    expect(valueAfterIncreasing).toEqual('6');
    await decreaseElement.click();
    const valueAfterDecreasing = await counterInputElement.getProperty('value');
    expect(valueAfterDecreasing).toEqual('5');
  });
});

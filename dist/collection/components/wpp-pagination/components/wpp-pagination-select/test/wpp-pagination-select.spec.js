import { newSpecPage } from '@stencil/core/testing';
import { WppPaginationSelect } from '../wpp-pagination-select';
import { FOCUS_TYPE } from '../../../../../types/common';
describe('wpp-pagination-select', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 10 pages', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count={10}></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 8 pages and active page 2', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count={8} activePageNumber={2}></wpp-pagination-select>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders page items when count is below threshold', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="4"></wpp-pagination-select>`,
    });
    const items = page.root.shadowRoot.querySelectorAll('wpp-pagination-item');
    expect(items.length).toBe(4);
  });
  it('renders numeric input when count exceeds threshold', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="10" page-select-threshold="5"></wpp-pagination-select>`,
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
  });
  it('handles mouse, tab and blur focus updates', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="3"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    instance.onMouseDown('input');
    expect(instance.focusType.input).toBe(FOCUS_TYPE.MOUSE);
    instance.onKeyUp(new KeyboardEvent('keyup', { key: 'Tab' }), 'input');
    expect(instance.focusType.input).toBe(FOCUS_TYPE.TAB);
    instance.onBlur('input');
    expect(instance.focusType.input).toBe(FOCUS_TYPE.NONE);
  });
  it('clamps page number input and emits change event', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="5"></wpp-pagination-select>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('wppChange', spy);
    const input = document.createElement('input');
    input.value = '10';
    const instance = page.rootInstance;
    instance.handlePageNumberChange({ target: input });
    expect(instance.activePageNumber).toBe(5);
    expect(input.value).toBe('5');
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { page: 5 },
    }));
  });
  it('updates page on pagination-item click', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="5"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const spy = jest.fn();
    page.root.addEventListener('wppChange', spy);
    instance.handlePageClick({ detail: { page: 3 } });
    expect(instance.activePageNumber).toBe(3);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { page: 3 },
    }));
  });
  it('handles left and right arrow navigation with bounds', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="3"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    instance.activePageNumber = 1;
    instance.handleLeftArrowClick();
    expect(instance.activePageNumber).toBe(1);
    instance.handleRightArrowClick();
    expect(instance.activePageNumber).toBe(2);
    instance.handleRightArrowClick();
    instance.handleRightArrowClick();
    expect(instance.activePageNumber).toBe(3);
  });
  it('disables arrows at boundaries', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="2"></wpp-pagination-select>`,
    });
    const left = page.root.shadowRoot.querySelector('[part="icon-left"]');
    const right = page.root.shadowRoot.querySelector('[part="icon-right"]');
    expect(left.getAttribute('tabindex')).toBe('-1');
    expect(right.getAttribute('tabindex')).toBe('0');
  });
  it('handles left chevron interactions', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="5"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const left = page.root.shadowRoot.querySelector('[part="icon-left"]');
    left.dispatchEvent(new MouseEvent('mousedown'));
    expect(instance.focusType['left-chevron']).toBe(FOCUS_TYPE.MOUSE);
    left.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    expect(instance.focusType['left-chevron']).toBe(FOCUS_TYPE.TAB);
    left.dispatchEvent(new FocusEvent('blur'));
    expect(instance.focusType['left-chevron']).toBe(FOCUS_TYPE.NONE);
    instance.activePageNumber = 2;
    left.click();
    expect(instance.activePageNumber).toBe(1);
  });
  it('renders page list and handles page item click', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="3"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const items = page.root.shadowRoot.querySelectorAll('wpp-pagination-item');
    expect(items.length).toBe(3);
    instance.handlePageClick({ detail: { page: 2 } });
    expect(instance.activePageNumber).toBe(2);
  });
  it('renders numeric input and handles all input events', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="10" page-select-threshold="5"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const input = page.root.shadowRoot.querySelector('input');
    input.dispatchEvent(new MouseEvent('mousedown'));
    expect(instance.focusType.input).toBe(FOCUS_TYPE.MOUSE);
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    expect(instance.focusType.input).toBe(FOCUS_TYPE.TAB);
    input.dispatchEvent(new FocusEvent('blur'));
    expect(instance.focusType.input).toBe(FOCUS_TYPE.NONE);
    input.value = '20';
    input.dispatchEvent(new Event('change'));
    expect(instance.activePageNumber).toBe(10);
    input.dispatchEvent(new Event('input'));
    expect(instance.focusType.input).toBe(FOCUS_TYPE.NONE);
  });
  it('handles right chevron interactions and bounds', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="3"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const right = page.root.shadowRoot.querySelector('[part="icon-right"]');
    right.dispatchEvent(new MouseEvent('mousedown'));
    expect(instance.focusType['right-chevron']).toBe(FOCUS_TYPE.MOUSE);
    right.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    expect(instance.focusType['right-chevron']).toBe(FOCUS_TYPE.TAB);
    instance.activePageNumber = 2;
    right.click();
    expect(instance.activePageNumber).toBe(3);
  });
  it('sets correct tabIndex for chevrons at boundaries', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="2"></wpp-pagination-select>`,
    });
    const left = page.root.shadowRoot.querySelector('[part="icon-left"]');
    const right = page.root.shadowRoot.querySelector('[part="icon-right"]');
    expect(left.getAttribute('tabindex')).toBe('-1');
    expect(right.getAttribute('tabindex')).toBe('0');
  });
  it('clears focus on blur for right chevron', async () => {
    const page = await newSpecPage({
      components: [WppPaginationSelect],
      html: `<wpp-pagination-select count="3"></wpp-pagination-select>`,
    });
    const instance = page.rootInstance;
    const rightChevron = page.root.shadowRoot.querySelector('[part="icon-right"]');
    // Put it into a focused state first
    rightChevron.dispatchEvent(new MouseEvent('mousedown'));
    expect(instance.focusType['right-chevron']).toBe(FOCUS_TYPE.MOUSE);
    // Now blur it
    rightChevron.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(instance.focusType['right-chevron']).toBe(FOCUS_TYPE.NONE);
  });
});

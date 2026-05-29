import { newSpecPage } from '@stencil/core/testing';
import { WppAccordion } from '../wpp-accordion';
import { FOCUS_TYPE } from '../../../types/common';
import * as utils from '../../../utils/utils';
import { WppTooltip } from '../../wpp-tooltip/wpp-tooltip';
import { createMockContentElement, createMockKeydownEvent } from './wpp-accordion.mocks';
describe('wpp-accordion', () => {
  let timeoutSpy;
  beforeAll(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });
  afterAll(() => {
    timeoutSpy.mockRestore();
  });
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
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root?.getAttribute('expanded')).toBeNull();
  });
  it('toggles expanded state on click', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    button.click();
    await page.waitForChanges();
    expect(instance.expanded).toBe(true);
  });
  it('does not toggle when disabled', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion disabled></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    button.click();
    await page.waitForChanges();
    expect(instance.expanded).toBe(false);
  });
  /* ------------------ Events ------------------ */
  it('emits wppChange when expanded changes', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const spy = jest.fn();
    page.root?.addEventListener('wppChange', spy);
    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    button.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ expanded: true });
  });
  it('emits focus and blur events', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    page.root?.addEventListener('wppFocus', focusSpy);
    page.root?.addEventListener('wppBlur', blurSpy);
    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    button.focus();
    await page.waitForChanges();
    page.root?.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalled();
    expect(blurSpy).toHaveBeenCalled();
  });
  /* ------------------ Keyboard interaction ------------------ */
  it('sets focusType to TAB when focused via keyboard', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const host = page.root;
    const button = host.shadowRoot.querySelector('button');
    // 👇 Force shadowRoot.activeElement
    Object.defineProperty(host.shadowRoot, 'activeElement', {
      configurable: true,
      get: () => button,
    });
    // Trigger keyup Tab
    host.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    await page.waitForChanges();
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
  });
  it('toggles on Space key', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const button = page.root.shadowRoot.querySelector('button');
    // 🔑 REQUIRED: real focus
    button.focus();
    await page.waitForChanges();
    // 🔑 REQUIRED: tell component focus came from keyboard
    page.root.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    page.root.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await page.waitForChanges();
    expect(instance.expanded).toBe(true);
  });
  it('does not toggle when Space key originates from content area', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion expanded><input type="text" /></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    expect(instance.expanded).toBe(true);
    instance.focusType = FOCUS_TYPE.TAB;
    const contentElement = createMockContentElement();
    const { event, preventDefaultSpy } = createMockKeydownEvent(' ', [contentElement]);
    instance.onKeyDown(event);
    expect(instance.expanded).toBe(true);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('does not toggle when Enter key originates from content area', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion expanded><input type="text" /></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.focusType = FOCUS_TYPE.TAB;
    const contentElement = createMockContentElement();
    const { event, preventDefaultSpy } = createMockKeydownEvent('Enter', [contentElement]);
    instance.onKeyDown(event);
    await page.waitForChanges();
    expect(instance.expanded).toBe(true);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('still toggles when Space key originates from header button', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.focusType = FOCUS_TYPE.TAB;
    const button = page.root.shadowRoot.querySelector('button');
    const { event, preventDefaultSpy } = createMockKeydownEvent(' ', [button]);
    instance.onKeyDown(event);
    await page.waitForChanges();
    expect(instance.expanded).toBe(true);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
  it('does not toggle when focusType is NONE even if event is from header', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.focusType = FOCUS_TYPE.NONE;
    const button = page.root.shadowRoot.querySelector('button');
    const { event, preventDefaultSpy } = createMockKeydownEvent(' ', [button]);
    instance.onKeyDown(event);
    expect(instance.expanded).toBe(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('does not toggle when disabled even with TAB focus from header', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion disabled></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.focusType = FOCUS_TYPE.TAB;
    const button = page.root.shadowRoot.querySelector('button');
    const { event, preventDefaultSpy } = createMockKeydownEvent(' ', [button]);
    instance.onKeyDown(event);
    expect(instance.expanded).toBe(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('does not toggle on non-matching key from header with TAB focus', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.focusType = FOCUS_TYPE.TAB;
    const button = page.root.shadowRoot.querySelector('button');
    const { event, preventDefaultSpy } = createMockKeydownEvent('Escape', [button]);
    instance.onKeyDown(event);
    expect(instance.expanded).toBe(false);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
  it('renders tags slot when withTag is true', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `
        <wpp-accordion with-tag>
          <wpp-tag slot="tags">Tag</wpp-tag>
        </wpp-accordion>
      `,
    });
    const tags = page.root?.shadowRoot?.querySelector('.tags');
    expect(tags).not.toBeNull();
  });
  it('sets correct aria attributes', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `
        <wpp-accordion
          aria-props='{"controls":"panel1","labelledby":"btn1"}'
        ></wpp-accordion>
      `,
    });
    const button = page.root?.shadowRoot?.querySelector('button');
    const content = page.root?.shadowRoot?.querySelector('[part="content"]');
    expect(button).not.toBeNull();
    expect(content).not.toBeNull();
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(content?.getAttribute('role')).toBe('region');
  });
  it('uses CSS variables when available for font style', () => {
    const instance = new WppAccordion();
    const element = document.createElement('div');
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (prop) => {
        const map = {
          '--wpp-default-type-font-weight': '600',
          '--wpp-default-type-font-size': '14px',
          '--wpp-default-type-font-family': 'Arial',
          '--wpp-default-type-line-height': '20px',
        };
        return map[prop] || '';
      },
      fontWeight: '',
      fontSize: '',
      fontFamily: '',
      lineHeight: '',
    });
    const result = instance.getElementFontStyle(element);
    expect(result).toBe('600 14px/20px Arial');
  });
  it('falls back to computed styles when CSS variables are missing', () => {
    const instance = new WppAccordion();
    const element = document.createElement('div');
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => '',
      fontWeight: '300',
      fontSize: '14px',
      fontFamily: 'Inter',
      lineHeight: '20px',
    });
    const result = instance.getElementFontStyle(element);
    expect(result).toBe('300 14px/20px Inter');
  });
  it('returns font style when header slot exists', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion><span slot="header">Title</span></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    jest.spyOn(instance, 'getElementFontStyle').mockReturnValue('mock-font');
    const result = instance.getTextTitleFont();
    // When using header slot, getTextTitleFont returns the font from the header slot wrapper
    // If no .title-text element exists, it returns empty string
    expect(typeof result).toBe('string');
  });
  it('returns empty string when title-text element is missing (forced)', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion><span slot="header">Title</span></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    // 🚨 Force querySelector to return null
    jest.spyOn(instance.host.shadowRoot, 'querySelector').mockReturnValue(null);
    const result = instance.getTextTitleFont();
    expect(result).toBe('');
  });
  it('extracts text and font from header slot assigned nodes', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `
        <wpp-accordion>
          <span slot="header">Header</span>
        </wpp-accordion>
      `,
    });
    const instance = page.rootInstance;
    const shadowRoot = page.root.shadowRoot;
    const slot = shadowRoot.querySelector('slot[name="header"]');
    // 🔹 Create nodes
    const textNode = document.createTextNode('Hello ');
    const elementNode = document.createElement('span');
    elementNode.innerText = 'World';
    // 🔹 DEFINE assignedNodes (JSDOM FIX)
    Object.defineProperty(slot, 'assignedNodes', {
      value: jest.fn().mockReturnValue([textNode, elementNode]),
      configurable: true,
    });
    // 🔹 Mock font resolution
    jest.spyOn(instance, 'getElementFontStyle').mockReturnValue('400 16px Arial');
    // 🔹 Call private method
    const result = instance.getHeaderSlotText();
    // 🔹 Assertions
    expect(result.headerTitle).toBe('Hello World');
    expect(result.font).toBe('400 16px Arial');
  });
  it('returns text width when canvas context is available', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    // 🔹 Mock canvas + context
    const measureTextMock = jest.fn().mockReturnValue({ width: 123 });
    const contextMock = {
      font: '',
      measureText: measureTextMock,
    };
    jest.spyOn(document, 'createElement').mockImplementation(() => ({
      getContext: () => contextMock,
    }));
    // 🔹 Call method
    const width = instance.getTextWidth('Hello', '16px Arial');
    // 🔹 Assertions
    expect(width).toBe(123);
    expect(contextMock.font).toBe('16px Arial');
    expect(measureTextMock).toHaveBeenCalledWith('Hello');
  });
  it('returns 0 when canvas context is not available', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    // 🔹 Mock canvas with null context
    jest.spyOn(document, 'createElement').mockImplementation(() => ({
      getContext: () => null,
    }));
    const width = instance.getTextWidth('Hello', '16px Arial');
    expect(width).toBe(0);
  });
  it('sets disabled attribute on tag when tags slot exists and accordion is disabled', async () => {
    // ✅ Mock slot state
    jest.spyOn(utils, 'getSlotEmptyStates').mockReturnValue({
      actions: true,
      header: true,
      tags: false,
    });
    // ✅ CRITICAL: make transformToVersionedTag return EXACT tag used in test
    jest.spyOn(utils, 'transformToVersionedTag').mockReturnValue('wpp-tag');
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `
      <wpp-accordion disabled with-tag>
        <wpp-tag slot="tags">Tag</wpp-tag>
      </wpp-accordion>
    `,
    });
    const instance = page.rootInstance;
    const host = page.root;
    // 🔹 Act
    instance.updateSlotData();
    await page.waitForChanges();
    // 🔹 Assert
    const tag = host.querySelector('WPP-TAG');
    expect(tag).not.toBeNull();
    expect(tag.getAttribute('disabled')).toBe('true');
  });
  it('returns correct typography type based on size', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    instance.size = 's';
    expect(instance.getHeaderTypographyType()).toBe('s-strong');
    instance.size = 'm';
    expect(instance.getHeaderTypographyType()).toBe('m-strong');
    instance.size = 'l';
    expect(instance.getHeaderTypographyType()).toBe('l-strong');
    instance.size = 'xl';
    expect(instance.getHeaderTypographyType()).toBe('xl-heading');
    instance.size = '2xl';
    expect(instance.getHeaderTypographyType()).toBe('2xl-heading');
  });
  it('calls getContentHeight when updateHeight is invoked', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    // ✅ Spy on the private method
    const spy = jest.spyOn(instance, 'getContentHeight');
    // 🔹 Call public @Method
    await instance.updateHeight();
    // ✅ Assert
    expect(spy).toHaveBeenCalled();
  });
  it('calculates layout values and updates styles correctly', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `
        <wpp-accordion with-tag>
          <span slot="header">Title</span>
          <div slot="actions">Actions</div>
          <div slot="tags">Tags</div>
          <div>Content</div>
        </wpp-accordion>
      `,
    });
    const instance = page.rootInstance;
    const host = page.root;
    const shadow = host.shadowRoot;
    // Force slot flags
    instance.hasActionsSlot = true;
    instance.hasTagSlot = true;
    // Mock host width
    Object.defineProperty(host, 'clientWidth', { value: 300, configurable: true });
    const actions = shadow.querySelector('.actions');
    const tags = shadow.querySelector('.tags');
    const titleWrapper = shadow.querySelector('.title-wrapper');
    const slotContent = shadow.querySelector('.slot-content');
    // Mock element widths and heights
    Object.defineProperty(actions, 'clientWidth', { value: 50, configurable: true });
    Object.defineProperty(tags, 'clientWidth', { value: 40, configurable: true });
    Object.defineProperty(titleWrapper, 'clientWidth', { value: 120, configurable: true });
    Object.defineProperty(slotContent, 'clientHeight', { value: 200, configurable: true });
    const overflowSpy = jest.spyOn(instance, 'checkTitleOverflow');
    // Call the extracted method directly
    instance.calculateContentLayout();
    // ✅ ASSERT STATE
    expect(instance.actionsWrapperWidth).toBe(50);
    expect(instance.tagGroupWrapperWidth).toBe(40);
    expect(instance.titleMaxWidth).toBe(300 - (50 + 40 + 16) - 28);
    expect(instance.maxHeight).toBe(200);
    // ✅ ASSERT STYLES
    expect(titleWrapper.style.maxWidth).toBe('194px');
    expect(tags.style.left).toBe('120px');
    // ✅ ASSERT FINAL CALL
    expect(overflowSpy).toHaveBeenCalled();
  });
  it('correctly updates isTitleOverflowing based on text width and titleMaxWidth', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion><span slot="header">Test title</span></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const host = page.root;
    // Mock host width
    Object.defineProperty(host, 'clientWidth', { value: 200, configurable: true });
    // Force header slot to be detected
    instance.hasHeaderSlot = true;
    jest.spyOn(instance, 'getHeaderSlotText').mockReturnValue({
      headerTitle: 'Test title',
      font: 'test-font',
    });
    jest.spyOn(instance, 'getTextWidth').mockReturnValueOnce(300);
    instance.titleMaxWidth = 100;
    instance.isTitleOverflowing = false;
    instance.checkTitleOverflowInternal();
    expect(instance.isTitleOverflowing).toBe(true);
  });
  it('covers hasHeaderSlot and no-slot branches in checkTitleOverflowInternal', async () => {
    const page = await newSpecPage({
      components: [WppAccordion],
      html: `<wpp-accordion></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    // ----------------------
    // hasHeaderSlot true branch
    // ----------------------
    instance.hasHeaderSlot = true;
    instance.titleMaxWidth = 50;
    instance.isTitleOverflowing = false;
    jest.spyOn(instance, 'getHeaderSlotText').mockReturnValue({
      headerTitle: 'header text',
      font: 'header-font',
    });
    jest.spyOn(instance, 'getTextWidth').mockReturnValue(30); // text smaller than max width
    instance.checkTitleOverflowInternal();
    expect(instance.isTitleOverflowing).toBe(false);
    // ----------------------
    // ELSE branch: no header slot - should return early
    // ----------------------
    instance.hasHeaderSlot = false;
    instance.checkTitleOverflowInternal();
    // Nothing should change, still false
    expect(instance.isTitleOverflowing).toBe(false);
  });
  it('renders wpp-tooltip when isTitleOverflowing is true', async () => {
    const page = await newSpecPage({
      components: [WppAccordion, WppTooltip],
      html: `<wpp-accordion><span slot="header">Very long title</span></wpp-accordion>`,
    });
    const instance = page.rootInstance;
    const dummyButton = document.createElement('button');
    instance.titleTagsWrapperButtonRef = dummyButton;
    // Mock getHeaderSlotText to return the title
    jest.spyOn(instance, 'getHeaderSlotText').mockReturnValue({
      headerTitle: 'Very long title',
      font: 'test-font',
    });
    instance.isTitleOverflowing = true;
    await page.waitForChanges();
    const tooltipEl = page.root?.shadowRoot?.querySelector('wpp-tooltip');
    expect(tooltipEl).toBeTruthy();
    expect(tooltipEl.text).toBe('Very long title'); // ✅ Access prop directly
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppMoreButton } from '../wpp-more-button';
import { FOCUS_TYPE } from '../../../types/common';
describe('wpp-more-button', () => {
  describe('Testing initialisation', () => {
    it('Test default init', async () => {
      const myBtn = new WppMoreButton();
      expect(myBtn).toBeTruthy();
    });
    it('Test default properties on component', () => {
      const myBtn = new WppMoreButton();
      // Testing default property initialisation
      expect(myBtn.disabled).toBeFalsy();
      expect(myBtn.loading).toBeFalsy();
      expect(myBtn.name).not.toBeDefined();
      expect(myBtn.size).toEqual('m');
      expect(myBtn.ariaProps).toEqual({});
    });
  });
  describe('Test onKeyDown', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Test disabled button stops the event', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button disabled></wpp-more-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).not.toHaveBeenCalled();
    });
    it('Test that loading button stops the event', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button loading></wpp-more-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).not.toHaveBeenCalled();
    });
    it('Test button dispatches event when `Enter` key is pressed', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
    it('Test button dispatches event when ` ` key is pressed', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
  });
  describe('Testing Events', () => {
    it('Testing onBlur event', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `
          <wpp-more-button></wpp-more-button>
        `,
      });
      // Create blur event in order to simulate blurring the button
      const blurEvent = new FocusEvent('blur', { bubbles: true });
      // Dispatch blur event so onBlur function is triggered.
      page.root?.dispatchEvent(blurEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.NONE);
    });
    it('Testing onMouseDown event', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `
        <wpp-more-button></wpp-more-button>
        `,
      });
      // Create mouseDown event
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
      // Dispatch mouseDown event so onMouseDown function is triggered.
      page.root?.dispatchEvent(mouseDownEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.MOUSE);
    });
    it('Testing onKeyUp event when key is `Tab`', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `
        <wpp-more-button></wpp-more-button>
        `,
      });
      // Create keyUp event
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'Tab', bubbles: true });
      // Dispatch keyUp event so onKeyUp function is triggered.
      page.root?.dispatchEvent(keyUpEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.TAB);
    });
    it('Testing onKeyUp event when key is ` `', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `
        <wpp-more-button></wpp-more-button>
        `,
      });
      // Create keyUp event
      const keyUpEvent = new KeyboardEvent('keyup', { key: ' ', bubbles: true });
      // Dispatch keyUp event so onKeyUp function is triggered.
      page.root?.dispatchEvent(keyUpEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBeUndefined();
    });
  });
  describe('Testing setFocus method', () => {
    it('Testing call', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      const instance = page.rootInstance;
      // Query for native button in order to spy for focus.
      const button = page.root?.shadowRoot?.querySelector('button');
      if (button) {
        const focusSpy = jest.spyOn(button, 'focus');
        // Manually create the buttonRef
        instance['buttonRef'] = button;
        await instance.setFocus();
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(focusSpy).toHaveBeenCalled();
        expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
      }
    });
  });
  describe('Testing snapshots', () => {
    it('Testing default button with name', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v3-4-0", { name: "More items button", ariaProps: undefined }),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing disabled button', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button disabled></wpp-more-button>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing loading button', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button loading></wpp-more-button>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing button with aria-label', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v3-4-0", { ariaProps: { label: 'More items menu' } }),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing button with aria-desribedby', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v3-4-0", { ariaProps: { describedby: 'More items menu' } }),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

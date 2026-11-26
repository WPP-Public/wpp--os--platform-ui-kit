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
      // The rendered button must be the one that receives focus - menu-context returns focus to its
      // trigger through setFocus(), so a no-op here strands keyboard users on the page body.
      const button = page.root?.shadowRoot?.querySelector('button');
      const focusSpy = jest.spyOn(button, 'focus');
      await instance.setFocus();
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(focusSpy).toHaveBeenCalled();
      expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
    });
  });
  describe('Testing accessibility', () => {
    const getButton = (page) => page.root?.shadowRoot?.querySelector('button');
    it('should name the icon-only button from the default locale', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v4-7-0", null),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('More options');
    });
    it('should keep the default name when ariaProps carries other aria- props', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v4-7-0", { ariaProps: { controls: 'actions-menu' } }),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('More options');
    });
    it('should name the button from locales when ariaProps has no label', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v4-7-0", { locales: { label: 'Localised' } }),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Localised');
    });
    it('should prefer ariaProps.label over locales', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => (h("wpp-more-button-v4-7-0", { ariaProps: { label: 'From ariaProps' }, locales: { label: 'Localised' } })),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('From ariaProps');
    });
    describe('with ariaProps.labelledby', () => {
      const renderWithLabel = async (ariaProps) => {
        const page = await newSpecPage({
          components: [WppMoreButton],
          html: `<span id="external-label">Scroll up</span><span id="section-label"> to the filters </span><wpp-more-button></wpp-more-button>`,
        });
        const host = page.body.querySelector('wpp-more-button');
        host.ariaProps = ariaProps;
        await page.waitForChanges();
        return host.shadowRoot?.querySelector('button');
      };
      it('should name the button from the text of the labelling elements in the page', async () => {
        const button = await renderWithLabel({ labelledby: 'external-label section-label' });
        expect(button.getAttribute('aria-label')).toBe('Scroll up to the filters');
        expect(button.hasAttribute('aria-labelledby')).toBe(false);
      });
      it('should prefer the labelling elements over ariaProps.label', async () => {
        const button = await renderWithLabel({ label: 'From ariaProps', labelledby: 'external-label' });
        expect(button.getAttribute('aria-label')).toBe('Scroll up');
      });
      it('should fall back to the default name when the ids name nothing', async () => {
        const button = await renderWithLabel({ labelledby: 'missing-label' });
        expect(button.getAttribute('aria-label')).toBe('More options');
        expect(button.hasAttribute('aria-labelledby')).toBe(false);
      });
    });
    it('should not expose the transient pressed visual as a toggle state', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('pressed')).toBe(true);
      expect(getButton(page).hasAttribute('aria-pressed')).toBe(false);
    });
    it('should paint the focus ring when focus is moved here by script after a key press', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      // The browser decides `:focus-visible`; the mock DOM cannot, so answer for it.
      getButton(page).matches = (selector) => selector === ':focus-visible';
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(true);
    });
    it('should not paint the focus ring when the browser would not show focus', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        html: `<wpp-more-button></wpp-more-button>`,
      });
      getButton(page).matches = () => false;
      page.root?.dispatchEvent(new MouseEvent('mousedown'));
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(false);
    });
  });
  describe('Testing snapshots', () => {
    it('Testing default button with name', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v4-7-0", { name: "More items button", ariaProps: undefined }),
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
        template: () => h("wpp-more-button-v4-7-0", { ariaProps: { label: 'More items menu' } }),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing button with aria-desribedby', async () => {
      const page = await newSpecPage({
        components: [WppMoreButton],
        template: () => h("wpp-more-button-v4-7-0", { ariaProps: { describedby: 'More items menu' } }),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

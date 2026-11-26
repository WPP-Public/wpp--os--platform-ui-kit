import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBackToTopButton } from '../wpp-back-to-top-button';
import { FOCUS_TYPE } from '../../../types/common';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-back-to-top-button', () => {
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppBackToTopButton();
      expect(component).toBeTruthy();
    });
    it('should have empty default aria props, with the name coming from locales', () => {
      const component = new WppBackToTopButton();
      expect(component.ariaProps).toEqual({});
    });
    it('should initialize with isPressed as false', () => {
      const component = new WppBackToTopButton();
      expect(component.isPressed).toBe(false);
    });
  });
  describe('Rendering', () => {
    it('should render component', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render button element with correct test id', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const button = page.root?.shadowRoot?.querySelector('[data-testid="wppBackToTopButton"]');
      expect(button).toBeTruthy();
    });
    it('should render arrow icon inside button', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const icon = page.root?.shadowRoot?.querySelector('wpp-icon-arrow');
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('direction')).toBe('up');
    });
    it('should apply aria-label from ariaProps', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const button = page.root?.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-label')).toBe('Back to top');
    });
  });
  describe('Focus management', () => {
    it('should set focusType to NONE on blur', () => {
      const component = new WppBackToTopButton();
      component['onBlur']();
      expect(component.focusType).toBe(FOCUS_TYPE.NONE);
    });
    it('should set isPressed to false on blur', () => {
      const component = new WppBackToTopButton();
      component.isPressed = true;
      component['onBlur']();
      expect(component.isPressed).toBe(false);
    });
    it('should set focusType to MOUSE on mouse down', () => {
      const component = new WppBackToTopButton();
      component['onMouseDown']();
      expect(component.focusType).toBe(FOCUS_TYPE.MOUSE);
    });
    it('should set focusType to TAB on Tab keyup', () => {
      const component = new WppBackToTopButton();
      const event = { key: 'Tab' };
      component['onKeyUp'](event);
      expect(component.focusType).toBe(FOCUS_TYPE.TAB);
    });
    it('should set isPressed to false on Enter keyup', () => {
      const component = new WppBackToTopButton();
      component.isPressed = true;
      component['onKeyUp']({ key: 'Enter' });
      expect(component.isPressed).toBe(false);
    });
    it('should set isPressed to false on Space keyup', () => {
      const component = new WppBackToTopButton();
      component.isPressed = true;
      component['onKeyUp']({ key: ' ' });
      expect(component.isPressed).toBe(false);
    });
  });
  describe('Keyboard interactions', () => {
    it('should set isPressed to true on Enter keydown', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      page.rootInstance['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
      expect(page.rootInstance.isPressed).toBe(true);
    });
    it('should set isPressed to true on Space keydown', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      page.rootInstance['onKeyDown']({ key: ' ', preventDefault: jest.fn() });
      expect(page.rootInstance.isPressed).toBe(true);
    });
    it('should not set isPressed when focusType is NONE', () => {
      const component = new WppBackToTopButton();
      component.focusType = FOCUS_TYPE.NONE;
      component['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
      expect(component.isPressed).toBe(false);
    });
    it('should prevent default on Enter/Space keydown', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const preventDefault = jest.fn();
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      page.rootInstance['onKeyDown']({ key: 'Enter', preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    });
    it('should dispatch click event on Enter keydown', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const clickHandler = jest.fn();
      page.root?.addEventListener('click', clickHandler);
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      page.rootInstance['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
      expect(clickHandler).toHaveBeenCalled();
      expect(clickHandler.mock.calls[0][0].bubbles).toBe(true);
      expect(clickHandler.mock.calls[0][0].composed).toBe(true);
    });
    it('should dispatch click event on Space keydown', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const clickHandler = jest.fn();
      page.root?.addEventListener('click', clickHandler);
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      page.rootInstance['onKeyDown']({ key: ' ', preventDefault: jest.fn() });
      expect(clickHandler).toHaveBeenCalled();
      expect(clickHandler.mock.calls[0][0].bubbles).toBe(true);
      expect(clickHandler.mock.calls[0][0].composed).toBe(true);
    });
  });
  describe('setFocus method', () => {
    it('should call setFocus method without error', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      await page.rootInstance.setFocus();
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.TAB);
    });
  });
  describe('ariaProps watch', () => {
    it('should update validAriaProps when ariaProps changes', () => {
      const component = new WppBackToTopButton();
      component.componentWillLoad();
      // The default name now comes from locales, so nothing is left in the default ariaProps.
      expect(component.validAriaProps).toEqual({});
    });
    it('should update validAriaProps when ariaProps changes at runtime', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.ariaProps = { label: 'Updated label' };
      await page.waitForChanges();
      expect(page.root?.shadowRoot?.querySelector('button')?.getAttribute('aria-label')).toBe('Updated label');
    });
  });
  describe('CSS classes', () => {
    it('should apply tab-focus class when focusType is TAB', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.focusType = FOCUS_TYPE.TAB;
      await page.waitForChanges();
      const button = page.root?.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('tab-focus')).toBe(true);
    });
    it('should apply pressed class when isPressed is true', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.isPressed = true;
      await page.waitForChanges();
      const button = page.root?.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('pressed')).toBe(true);
    });
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing accessibility', () => {
    const getButton = (page) => page.root?.shadowRoot?.querySelector('button');
    it('should name the icon-only button from the default locale', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        template: () => h("wpp-back-to-top-button-v4-7-0", null),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Back to top');
    });
    it('should keep the default name when ariaProps carries other aria- props', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        template: () => h("wpp-back-to-top-button-v4-7-0", { ariaProps: { controls: 'main-content' } }),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Back to top');
    });
    it('should name the button from locales when ariaProps has no label', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        template: () => h("wpp-back-to-top-button-v4-7-0", { locales: { label: 'Localised' } }),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Localised');
    });
    it('should prefer ariaProps.label over locales', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        template: () => (h("wpp-back-to-top-button-v4-7-0", { ariaProps: { label: 'From ariaProps' }, locales: { label: 'Localised' } })),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('From ariaProps');
    });
    describe('with ariaProps.labelledby', () => {
      const renderWithLabel = async (ariaProps) => {
        const page = await newSpecPage({
          components: [WppBackToTopButton],
          html: `<span id="external-label">Scroll up</span><span id="section-label"> to the filters </span><wpp-back-to-top-button></wpp-back-to-top-button>`,
        });
        const host = page.body.querySelector('wpp-back-to-top-button');
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
        expect(button.getAttribute('aria-label')).toBe('Back to top');
        expect(button.hasAttribute('aria-labelledby')).toBe(false);
      });
    });
    it('should not expose the transient pressed visual as a toggle state', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button></wpp-back-to-top-button>`,
      });
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('pressed')).toBe(true);
      expect(getButton(page).hasAttribute('aria-pressed')).toBe(false);
    });
    it('should paint the focus ring when focus is moved here by script after a key press', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button></wpp-back-to-top-button>`,
      });
      // The browser decides `:focus-visible`; the mock DOM cannot, so answer for it.
      getButton(page).matches = (selector) => selector === ':focus-visible';
      getButton(page).dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(true);
    });
    it('should not paint the focus ring when the browser would not show focus', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button></wpp-back-to-top-button>`,
      });
      getButton(page).matches = () => false;
      page.root?.dispatchEvent(new MouseEvent('mousedown'));
      getButton(page).dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(false);
    });
  });
});

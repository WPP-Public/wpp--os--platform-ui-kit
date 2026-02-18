import { newSpecPage } from '@stencil/core/testing';
import { WppBackToTopButton } from '../wpp-back-to-top-button';
import { FOCUS_TYPE } from '../../../types/common';
describe('wpp-back-to-top-button', () => {
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppBackToTopButton();
      expect(component).toBeTruthy();
    });
    it('should have default aria props with label', () => {
      const component = new WppBackToTopButton();
      expect(component.ariaProps).toBeDefined();
      expect(component.ariaProps.label).toBe('Back to top');
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
      expect(icon?.getAttribute('direction')).toBe('top');
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
      expect(component.validAriaProps).toBeDefined();
      // getAriaProps transforms 'label' to 'aria-label'
      expect(component.validAriaProps['aria-label']).toBe('Back to top');
    });
    it('should update validAriaProps when ariaProps changes at runtime', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.ariaProps = { label: 'Updated label' };
      await page.waitForChanges();
      expect(page.rootInstance.validAriaProps).toBeDefined();
      // getAriaProps transforms 'label' to 'aria-label'
      expect(page.rootInstance.validAriaProps['aria-label']).toBe('Updated label');
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
  describe('aria-pressed attribute', () => {
    it('should set aria-pressed to false by default', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      const button = page.root?.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-pressed')).toBe('false');
    });
    it('should set aria-pressed to true when isPressed is true', async () => {
      const page = await newSpecPage({
        components: [WppBackToTopButton],
        html: `<wpp-back-to-top-button />`,
      });
      page.rootInstance.isPressed = true;
      await page.waitForChanges();
      const button = page.root?.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-pressed')).toBe('true');
    });
  });
});

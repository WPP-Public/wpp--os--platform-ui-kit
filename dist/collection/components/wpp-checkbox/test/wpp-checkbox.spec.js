import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { FOCUS_TYPE } from '../../../types/common';
import { WppCheckbox } from '../wpp-checkbox';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-checkbox', () => {
  const setup = async (html = `<wpp-checkbox></wpp-checkbox>`) => {
    const page = await newSpecPage({
      components: [WppCheckbox],
      html,
    });
    const instance = page.rootInstance;
    const input = page.root?.shadowRoot?.querySelector('input');
    return { page, instance, input };
  };
  it('should render indeterminate checkbox with label', async () => {
    const labelConfig = {
      text: 'Label',
    };
    const { root } = await newSpecPage({
      components: [WppCheckbox, WppLabel, WppInternalLabel],
      template: () => h("wpp-checkbox-v4-7-0", { indeterminate: true, labelConfig: labelConfig }),
    });
    expect(root).toMatchSnapshot();
  });
  it('should render indeterminate disabled checkbox with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const { root } = await newSpecPage({
      components: [WppCheckbox, WppLabel, WppInternalLabel],
      template: () => h("wpp-checkbox-v4-7-0", { indeterminate: true, disabled: true, name: "checkbox", labelConfig: labelConfig }),
    });
    expect(root).toMatchSnapshot();
  });
  // -------------------------------------------------
  // setFocus
  // -------------------------------------------------
  it('setFocus focuses input and sets focusType', async () => {
    const { instance, input } = await setup();
    const focusSpy = jest.spyOn(input, 'focus');
    await instance.setFocus();
    expect(focusSpy).toHaveBeenCalled();
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
  });
  it('setFocus does nothing when inputRef is undefined', async () => {
    const { instance } = await setup();
    instance.inputRef = undefined;
    await instance.setFocus();
    expect(instance.focusType).toBeUndefined();
  });
  // -------------------------------------------------
  // onClick
  // -------------------------------------------------
  it('emits wppChange and wppClickCheckbox when uncontrolled', async () => {
    const { page, instance } = await setup();
    const changeSpy = jest.fn();
    const clickSpy = jest.fn();
    page.root?.addEventListener('wppChange', changeSpy);
    page.root?.addEventListener('wppClickCheckbox', clickSpy);
    instance.checked = false;
    instance.indeterminate = false;
    instance['onClick'](new Event('click'));
    expect(instance.checked).toBe(true);
    expect(changeSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });
  it('handles indeterminate state correctly', async () => {
    const { instance } = await setup();
    instance.indeterminate = true;
    instance.checked = false;
    instance['onClick'](new Event('click'));
    expect(instance.indeterminate).toBe(false);
    expect(instance.checked).toBe(true);
  });
  it('emits only wppChange when controlled', async () => {
    const { page, instance } = (await setup());
    instance.controlled = true;
    instance.checked = false;
    const changeSpy = jest.fn();
    const clickSpy = jest.fn();
    page.root?.addEventListener('wppChange', changeSpy);
    page.root?.addEventListener('wppClickCheckbox', clickSpy);
    instance['onClick'](new Event('click'));
    expect(changeSpy).toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
  });
  // -------------------------------------------------
  // onFocus / onBlur
  // -------------------------------------------------
  it('emits focus event', async () => {
    const { page, input } = await setup();
    const focusSpy = jest.fn();
    page.root?.addEventListener('wppFocus', focusSpy);
    input.dispatchEvent(new FocusEvent('focus'));
    expect(focusSpy).toHaveBeenCalled();
  });
  it('emits blur event and resets state', async () => {
    const { page, instance, input } = await setup();
    instance.isPressed = true;
    instance.focusType = FOCUS_TYPE.TAB;
    const blurSpy = jest.fn();
    page.root?.addEventListener('wppBlur', blurSpy);
    input.dispatchEvent(new FocusEvent('blur'));
    expect(instance.focusType).toBe(FOCUS_TYPE.NONE);
    expect(instance.isPressed).toBe(false);
    expect(blurSpy).toHaveBeenCalled();
  });
  // -------------------------------------------------
  // onKeyUp
  // -------------------------------------------------
  it('sets focusType on Tab key', async () => {
    const { instance, input } = await setup();
    Object.defineProperty(instance.host.shadowRoot, 'activeElement', {
      value: input,
      configurable: true,
    });
    instance['onKeyUp'](new KeyboardEvent('keyup', { key: 'Tab' }));
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
  });
  it('resets isPressed on Enter or Space keyup', async () => {
    const { instance } = await setup();
    instance.isPressed = true;
    instance['onKeyUp'](new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(instance.isPressed).toBe(false);
    instance.isPressed = true;
    instance['onKeyUp'](new KeyboardEvent('keyup', { key: ' ' }));
    expect(instance.isPressed).toBe(false);
  });
  // -------------------------------------------------
  // onKeyDown
  // -------------------------------------------------
  it('does nothing when disabled', async () => {
    const { instance } = (await setup());
    instance.disabled = true;
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(instance.isPressed).toBe(false);
  });
  it('handles Enter key correctly', async () => {
    const { instance, input } = await setup();
    Object.defineProperty(instance.host.shadowRoot, 'activeElement', {
      value: input,
      configurable: true,
    });
    const dispatchSpy = jest.spyOn(instance.host, 'dispatchEvent');
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(dispatchSpy).toHaveBeenCalled();
    expect(instance.isPressed).toBe(true);
  });
  it('handles Space key correctly', async () => {
    const { instance, input } = await setup();
    Object.defineProperty(instance.host.shadowRoot, 'activeElement', {
      value: input,
      configurable: true,
    });
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: ' ' }));
    expect(instance.isPressed).toBe(true);
  });
  it('renders decorative mode correctly', async () => {
    const page = await newSpecPage({
      components: [WppCheckbox],
      html: `<wpp-checkbox decorative></wpp-checkbox>`,
    });
    const host = page.root;
    // host attributes
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('role')).toBe('presentation');
    expect(host.getAttribute('tabindex')).toBe('-1');
    // ensure input is NOT rendered in decorative mode
    const input = host.shadowRoot?.querySelector('input');
    expect(input).toBeNull();
    // verify decorative structure exists
    expect(host.shadowRoot?.querySelector('wpp-icon-tick')).not.toBeNull();
    expect(host.shadowRoot?.querySelector('wpp-icon-dash')).not.toBeNull();
    expect(host.shadowRoot?.querySelector('.square')).not.toBeNull();
  });
  describe('Testing accessibility', () => {
    // The mock DOM never moves focus, so point the shadow root at the input as a real Tab would.
    const focusInput = (host, input) => Object.defineProperty(host.shadowRoot, 'activeElement', { value: input, configurable: true });
    const pressSpace = async (page) => {
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      await page.waitForChanges();
    };
    it('should emit wppChange when Space toggles the checkbox', async () => {
      const { page, input } = await setup(`<wpp-checkbox name="terms"></wpp-checkbox>`);
      const changes = [];
      page.root?.addEventListener('wppChange', (e) => changes.push(e.detail));
      focusInput(page.root, input);
      await pressSpace(page);
      expect(changes).toEqual([{ value: undefined, checked: true, name: 'terms' }]);
      expect(input.checked).toBe(true);
    });
    it('should clear the indeterminate state when Space checks a mixed checkbox', async () => {
      const { page, input } = await setup(`<wpp-checkbox name="all" indeterminate></wpp-checkbox>`);
      const changes = [];
      page.root?.addEventListener('wppChange', (e) => changes.push(e.detail));
      focusInput(page.root, input);
      await pressSpace(page);
      expect(changes).toEqual([{ value: undefined, checked: true, name: 'all' }]);
      expect(page.root?.hasAttribute('indeterminate')).toBe(false);
    });
    it('should only emit, not toggle, when a controlled checkbox gets Space', async () => {
      const { page, input } = await setup(`<wpp-checkbox name="ctl" controlled></wpp-checkbox>`);
      const changes = [];
      page.root?.addEventListener('wppChange', (e) => changes.push(e.detail));
      focusInput(page.root, input);
      await pressSpace(page);
      expect(changes).toEqual([{ value: undefined, name: 'ctl', checked: true }]);
      expect(input.checked).toBe(false);
    });
    it('should expose an indeterminate checkbox as mixed on the native input', async () => {
      const { input } = await setup(`<wpp-checkbox indeterminate></wpp-checkbox>`);
      // Stencil sets the `indeterminate` property in the browser; the mock input has no such property, so
      // the same binding lands as an attribute here.
      expect(input.hasAttribute('indeterminate')).toBe(true);
    });
    it.each([
      ['terms', 'terms'],
      [undefined, 'wpp-checkbox'],
    ])('should point the label at the input when the name is %s', async (name, inputId) => {
      const { page, input } = await setup(`<wpp-checkbox ${name ? `name="${name}"` : ''} label-config='{"text":"Accept terms"}'></wpp-checkbox>`);
      expect(input.id).toBe(inputId);
      expect(page.root?.shadowRoot?.querySelector('wpp-label')?.getAttribute('htmlfor')).toBe(inputId);
    });
    it('should keep a disabled checkbox visible to assistive tech', async () => {
      const { input } = await setup(`<wpp-checkbox disabled></wpp-checkbox>`);
      expect(input.disabled).toBe(true);
      expect(input.hasAttribute('aria-hidden')).toBe(false);
    });
    it('should describe the checkbox with its error message', async () => {
      const { page, input } = await setup(`<wpp-checkbox message="You must accept the terms" message-type="error"></wpp-checkbox>`);
      const message = page.root?.shadowRoot?.getElementById(input.getAttribute('aria-describedby') ?? '');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(message?.getAttribute('message')).toBe('You must accept the terms');
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
        components: [WppCheckbox],
        html: `<wpp-checkbox></wpp-checkbox>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppCheckbox],
        html: `<wpp-checkbox></wpp-checkbox>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
    it('Test that the component does not subcribe to theme changes when the isDarkTheme prop is passed explicitly from the parent component', async () => {
      await newSpecPage({
        components: [WppCheckbox],
        html: `<wpp-checkbox is-dark-theme="true"></wpp-checkbox>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(0);
    });
    it('Test that the component does not unsubcribe to theme changes when the isDarkTheme prop is passed explicitly from the parent component', async () => {
      const page = await newSpecPage({
        components: [WppCheckbox],
        html: `<wpp-checkbox is-dark-theme="true"></wpp-checkbox>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(0);
    });
    it('Test that the component unsubscribes from theme changes when `isDarkTheme` prop is undefined initially, but then gets set to a defined value', async () => {
      const page = await newSpecPage({
        components: [WppCheckbox],
        html: `<wpp-checkbox></wpp-checkbox>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(1);
      page.rootInstance.isDarkTheme = false;
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { FOCUS_TYPE } from '../../../types/common';
import { WppCheckbox } from '../wpp-checkbox';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
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
      template: () => h("wpp-checkbox-v3-5-0", { indeterminate: true, labelConfig: labelConfig }),
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
      template: () => h("wpp-checkbox-v3-5-0", { indeterminate: true, disabled: true, name: "checkbox", labelConfig: labelConfig }),
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
});

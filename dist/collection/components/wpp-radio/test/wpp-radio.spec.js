import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppRadio } from '../wpp-radio';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { FOCUS_TYPE } from '../../../types/common';
import { WppRadioGroup } from '../../../components/wpp-radio-group/wpp-radio-group';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-radio', () => {
  let component;
  let mockInputRef;
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
  beforeEach(() => {
    component = new WppRadio();
    mockInputRef = document.createElement('input');
    mockInputRef.focus = jest.fn();
    component['inputRef'] = mockInputRef;
    component.name = 'test-radio';
    component.value = 'test-value';
    component.checked = false;
    component.wppFocus = { emit: jest.fn() };
    component.wppBlur = { emit: jest.fn() };
    component.wppChange = { emit: jest.fn() };
    component.wppClickRadio = { emit: jest.fn() };
  });
  it('should emit focus event on onFocus', () => {
    const focusEvent = new FocusEvent('focus');
    component['onFocus'](focusEvent);
    expect(component.wppFocus.emit).toHaveBeenCalledWith(focusEvent);
  });
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label text', async () => {
    const page = await newSpecPage({
      components: [WppRadio, WppLabel, WppInternalLabel],
      template: () => h("wpp-radio-v4-1-0", { name: "contact", value: "email", labelConfig: { text: 'Email' } }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppRadio, WppLabel, WppInternalLabel],
      template: () => h("wpp-radio-v4-1-0", { name: "contact", value: "email", labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with disabled state', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio label='LabelRadioButton' disabled />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with checked state', async () => {
    const page = await newSpecPage({
      components: [WppRadio],
      html: `<wpp-radio checked />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should reset state and emit blur event on onBlur', () => {
    component['focusType'] = FOCUS_TYPE.TAB;
    component['isPressed'] = true;
    component['tippyInstance'] = { hide: jest.fn() };
    const blurEvent = new FocusEvent('blur');
    component['onBlur'](blurEvent);
    expect(component['focusType']).toBe(FOCUS_TYPE.NONE);
    expect(component['tippyInstance']?.hide).toHaveBeenCalled();
    expect(component.wppBlur.emit).toHaveBeenCalledWith(blurEvent);
    expect(component['isPressed']).toBe(false);
  });
  it('should not handle keydown when disabled', () => {
    ;
    component.disabled = true;
    const mockPreventDefault = jest.fn();
    const event = { key: 'Enter', preventDefault: mockPreventDefault };
    component['onKeyDown'](event);
    expect(mockPreventDefault).not.toHaveBeenCalled();
  });
  it('handles Enter key when shadowRoot activeElement is the input', () => {
    // Mock the host with shadowRoot
    const mockShadowRoot = { activeElement: mockInputRef };
    const mockHost = {
      shadowRoot: mockShadowRoot,
      dispatchEvent: jest.fn(),
    };
    // Use Object.defineProperty to override the readonly host getter
    Object.defineProperty(component, 'host', {
      get: () => mockHost,
      configurable: true,
    });
    const mockPreventDefault = jest.fn();
    const event = { key: 'Enter', preventDefault: mockPreventDefault };
    component['onKeyDown'](event);
    expect(mockPreventDefault).toHaveBeenCalled();
    expect(mockHost.dispatchEvent).toHaveBeenCalled();
    expect(component['isPressed']).toBe(true);
    expect(component.checked).toBe(true);
  });
  it('should set focus type on Tab keyup', () => {
    component['tippyInstance'] = { show: jest.fn() };
    const event = { key: 'Tab' };
    component['onKeyUp'](event);
    expect(component['focusType']).toBe(FOCUS_TYPE.TAB);
    expect(component['tippyInstance']?.show).toHaveBeenCalled();
  });
  it('should reset isPressed on Enter/Space keyup', () => {
    component['isPressed'] = true;
    const event = { key: 'Enter' };
    component['onKeyUp'](event);
    expect(component['isPressed']).toBe(false);
  });
  it('sets focusType to TAB and shows tooltip when setFocus is called from NONE state', async () => {
    const mockShow = jest.fn();
    component['tippyInstance'] = { show: mockShow };
    // Establish precondition explicitly
    component['focusType'] = FOCUS_TYPE.NONE;
    expect(component['focusType']).toBe(FOCUS_TYPE.NONE);
    await component.setFocus();
    expect(mockInputRef.focus).toHaveBeenCalledTimes(1);
    expect(component['focusType']).toBe(FOCUS_TYPE.TAB);
    expect(mockShow).toHaveBeenCalledTimes(1);
  });
  it('should not update state or emit events when disabled', () => {
    ;
    component.disabled = true;
    component['onClick']();
    expect(component.checked).toBe(false);
    expect(component.wppChange.emit).not.toHaveBeenCalled();
  });
  it('should set checked to true and emit both events', () => {
    ;
    component.disabled = false;
    component['onClick']();
    expect(component.checked).toBe(true);
    expect(component.wppChange.emit).toHaveBeenCalledWith({
      value: 'test-value',
      checked: true,
      name: 'test-radio',
    });
    expect(component.wppClickRadio.emit).toHaveBeenCalledWith({
      value: 'test-value',
      checked: true,
    });
  });
  it('should set checked based on radio group value match', () => {
    const mockRadioGroup = {
      value: 'test-value',
    };
    component.value = 'test-value';
    component.checked = false;
    jest.spyOn(component.host, 'closest').mockReturnValue(mockRadioGroup);
    component.componentWillLoad();
    expect(component.checked).toBe(true);
  });
  it('renders decorative markup when decorative is true', () => {
    ;
    component.decorative = true;
    component.name = 'test-name';
    component.disabled = false;
    component.checked = false;
    const result = component.render();
    expect(result).toMatchSnapshot();
  });
  it('remains unchecked when group value does not match radio value', async () => {
    const page = await newSpecPage({
      components: [WppRadio, WppRadioGroup],
      html: `
      <wpp-radio-group value="radio-2">
        <wpp-radio value="radio-1"></wpp-radio>
      </wpp-radio-group>
    `,
    });
    const radio = page.root.querySelector('wpp-radio');
    await page.waitForChanges();
    expect(radio.checked).toBe(false);
  });
  it('does not change state or emit events when disabled and already checked', () => {
    ;
    component.disabled = true;
    component.checked = true;
    const changeSpy = jest.spyOn(component.wppChange, 'emit');
    const clickSpy = jest.spyOn(component.wppClickRadio, 'emit');
    component['onClick']();
    expect(component.checked).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
    expect(clickSpy).not.toHaveBeenCalled();
  });
  it('emits correct payload when radio becomes checked', () => {
    ;
    component.value = 'radio-1';
    component.name = 'test-radio';
    component.checked = false;
    const changeSpy = jest.spyOn(component.wppChange, 'emit');
    component['onClick']();
    expect(changeSpy).toHaveBeenCalledWith({
      value: 'radio-1',
      checked: true,
      name: 'test-radio',
    });
  });
  it('emits correct payload when radio is unchecked programmatically', () => {
    ;
    component.value = 'radio-1';
    component.name = 'test-radio';
    component.checked = true;
    const changeSpy = jest.spyOn(component.wppChange, 'emit');
    component['onClick']();
    expect(changeSpy).toHaveBeenCalledWith({
      value: 'radio-1',
      checked: true,
      name: 'test-radio',
    });
  });
  describe('render snapshots', () => {
    const cases = [
      { name: 'default', props: {} },
      { name: 'checked', props: { checked: true } },
      { name: 'disabled', props: { disabled: true } },
      { name: 'checked + disabled', props: { checked: true, disabled: true } },
      { name: 'decorative', props: { decorative: true } },
    ];
    cases.forEach(({ name, props }) => {
      it(`matches snapshot: ${name}`, () => {
        Object.assign(component, props);
        component.value = 'radio-1';
        const result = component.render();
        expect(result).toMatchSnapshot();
      });
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
        components: [WppRadio],
        html: `<wpp-radio checked />`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppRadio],
        html: `<wpp-radio checked />`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

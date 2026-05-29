import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppToggle } from '../wpp-toggle';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { FOCUS_TYPE } from '../../../types/common';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-toggle', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppToggle],
      html: `<wpp-toggle name="toggle" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with disabled state', async () => {
    const page = await newSpecPage({
      components: [WppToggle],
      html: `<wpp-toggle name="toggle" disabled/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render label with all text and icon with tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppToggle, WppLabel, WppInternalLabel],
      template: () => h("wpp-toggle-v4-1-0", { labelConfig: labelConfig, required: true, name: "toggle" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  const setup = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppToggle],
      html: `<wpp-toggle></wpp-toggle>`,
    });
    Object.assign(page.rootInstance, props);
    await page.waitForChanges();
    return page;
  };
  it('toggles checked state and emits change when uncontrolled', async () => {
    const page = await setup({ value: 'on', name: 'toggle' });
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.wppChange.emit = spy;
    page?.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();
    expect(instance.checked).toBe(true);
    expect(spy).toHaveBeenCalledWith({
      value: 'on',
      checked: true,
      name: 'toggle',
    });
  });
  it('does not toggle or emit when disabled', async () => {
    const page = await setup({ disabled: true });
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.wppChange.emit = spy;
    page?.root?.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(instance.checked).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });
  it('does not change checked when controlled', async () => {
    const page = await setup({ controlled: true });
    const instance = page.rootInstance;
    page?.root?.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(instance.checked).toBe(false);
  });
  it('setFocus focuses input element', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const input = page?.root?.shadowRoot?.querySelector('input');
    const focusSpy = jest.spyOn(input, 'focus');
    await instance.setFocus();
    expect(focusSpy).toHaveBeenCalled();
  });
  it('emits wppFocus on focus', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.wppFocus.emit = spy;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new FocusEvent('focus'));
    expect(spy).toHaveBeenCalled();
  });
  it('resets focusType and emits wppBlur on blur', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.focusType = FOCUS_TYPE.TAB;
    instance.wppBlur.emit = spy;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new FocusEvent('blur'));
    expect(instance.focusType).toBe(FOCUS_TYPE.NONE);
    expect(spy).toHaveBeenCalled();
  });
  it('sets focusType to MOUSE on mouse down', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new MouseEvent('mousedown'));
    expect(instance.focusType).toBe(FOCUS_TYPE.MOUSE);
  });
  it('sets focusType to TAB on Tab key up', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
  });
  it('handles Enter key to toggle', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(instance.checked).toBe(true);
  });
  it('handles Space key to toggle', async () => {
    const page = await setup();
    const instance = page.rootInstance;
    const input = page?.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await page.waitForChanges();
    expect(instance.checked).toBe(true);
  });
  it('sets correct tabindex when disabled', async () => {
    const page = await setup({ disabled: true });
    const input = page?.root?.shadowRoot?.querySelector('input');
    expect(input.tabIndex).toBe(-1);
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
      await setup();
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await setup();
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

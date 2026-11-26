jest.mock('../../../common/menuListConfig', () => ({
  menuListConfig: jest.fn(),
}));
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { menuListConfig } from '../../../common/menuListConfig';
import { WppColorPicker } from '../wpp-color-picker';
import { WppTypography } from '../../wpp-typography/wpp-typography';
// A stand-in for tippy that runs the picker's own show/hide callbacks, so aria-expanded and the emitted value
// follow the same path as in the browser.
const mockTippy = () => {
  const tippy = { show: jest.fn(), hide: jest.fn() };
  menuListConfig.mockImplementation(config => {
    tippy.show.mockImplementation(() => {
      config.onShow(tippy);
      config.onShown?.();
    });
    tippy.hide.mockImplementation(() => {
      config.onHide(tippy);
      config.onHidden();
    });
    return tippy;
  });
  return tippy;
};
const renderPicker = async (attributes = '') => {
  const tippy = mockTippy();
  const page = await newSpecPage({
    components: [WppColorPicker],
    html: `<wpp-color-picker initial-color="#0014CC" ${attributes}></wpp-color-picker>`,
  });
  return {
    page,
    tippy,
    host: page.root,
    popup: page.root.shadowRoot.querySelector('[role="dialog"]'),
  };
};
const THEME_COLORS = {
  content: {
    light: { color: { primary: { 100: '#E6F6FF', 200: '#D0ECFF', 300: '#A3D8FF' }, grey: { 0: '#FFFFFF' } } },
  },
};
const SAVED_COLORS = ['#7AB6FF', 'rgba(0, 20, 204, 0.5)', '#FF7A91'];
const renderPickerWith = async (props) => {
  const tippy = mockTippy();
  const page = await newSpecPage({
    components: [WppColorPicker],
    template: () => h("wpp-color-picker-v4-7-0", { ...props }),
  });
  const host = page.body.querySelector('wpp-color-picker');
  return { page, tippy, host, popup: host.shadowRoot.querySelector('[role="dialog"]') };
};
const radiosOf = (popup, group) => Array.from(popup.querySelectorAll(`[role="radiogroup"][aria-label="${group}"] [role="radio"]`));
const pressKey = (target, key) => target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
describe('wpp-color-picker', () => {
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
        components: [WppColorPicker],
        html: `<wpp-color-picker></wpp-color-picker>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppColorPicker],
        html: `<wpp-color-picker></wpp-color-picker>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing accessibility', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('exposes the host as a button named by its value that opens a dialog', async () => {
      const { host, popup } = await renderPicker();
      expect(host.getAttribute('role')).toBe('button');
      expect(host.getAttribute('aria-label')).toBe('Color, #0014CC, 100%');
      expect(host.getAttribute('aria-haspopup')).toBe('dialog');
      expect(host.getAttribute('aria-expanded')).toBe('false');
      expect(host.getAttribute('tabindex')).toBe('0');
      expect(popup.getAttribute('aria-label')).toBe('Choose a color');
    });
    it.each(['Enter', ' ', 'ArrowDown'])('opens the picker with "%s"', async (key) => {
      const { page, tippy, host } = await renderPicker();
      pressKey(host, key);
      await page.waitForChanges();
      expect(tippy.show).toHaveBeenCalledTimes(1);
      expect(host.getAttribute('aria-expanded')).toBe('true');
    });
    it('does not open when disabled', async () => {
      const { page, tippy, host } = await renderPicker('disabled');
      pressKey(host, 'Enter');
      await page.waitForChanges();
      expect(tippy.show).not.toHaveBeenCalled();
      expect(host.getAttribute('tabindex')).toBe('-1');
    });
    it('closes with Escape from inside the popup, commits the value and returns focus to the trigger', async () => {
      const { page, tippy, host, popup } = await renderPicker();
      const changeSpy = jest.fn();
      const focusSpy = jest.spyOn(host, 'focus');
      host.addEventListener('wppChange', changeSpy);
      pressKey(host, 'Enter');
      await page.waitForChanges();
      pressKey(popup, 'Escape');
      await page.waitForChanges();
      expect(tippy.hide).toHaveBeenCalledTimes(1);
      expect(host.getAttribute('aria-expanded')).toBe('false');
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ hexValue: '#0014CC', opacity: '100%' });
      expect(focusSpy).toHaveBeenCalled();
    });
    it.each(['first', 'last'])('closes and returns focus to the trigger when Tab reaches the %s sentinel', async (edge) => {
      const { page, tippy, host, popup } = await renderPicker();
      const focusSpy = jest.spyOn(host, 'focus');
      const sentinels = popup.querySelectorAll('.focus-sentinel');
      expect(sentinels).toHaveLength(2);
      pressKey(host, 'Enter');
      await page.waitForChanges();
      sentinels[edge === 'first' ? 0 : 1].dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(tippy.hide).toHaveBeenCalledTimes(1);
      expect(host.getAttribute('aria-expanded')).toBe('false');
      expect(focusSpy).toHaveBeenCalled();
    });
    it('takes its accessible names from locales', async () => {
      const { page, host, popup } = await renderPicker();
      host.locales = {
        pickerLabel: value => `Fill colour ${value}`,
        dialogLabel: 'Fill colour picker',
      };
      await page.waitForChanges();
      expect(host.getAttribute('aria-label')).toBe('Fill colour #0014CC, 100%');
      expect(popup.getAttribute('aria-label')).toBe('Fill colour picker');
    });
  });
  describe('Testing theme colors', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('renders each theme section as a radio group of named swatches with one tab stop', async () => {
      const { popup } = await renderPickerWith({ themeColors: THEME_COLORS, initialColor: '#D0ECFF' });
      const primary = radiosOf(popup, 'Brand Primary');
      const grey = radiosOf(popup, 'Grey');
      expect(primary.map(radio => radio.getAttribute('aria-label'))).toEqual(['#E6F6FF', '#D0ECFF', '#A3D8FF']);
      expect(primary.map(radio => radio.getAttribute('aria-checked'))).toEqual(['false', 'true', 'false']);
      expect(primary.map(radio => radio.getAttribute('tabindex'))).toEqual(['-1', '0', '-1']);
      // A group without the selected color is entered on its first swatch
      expect(grey.map(radio => radio.getAttribute('tabindex'))).toEqual(['0']);
    });
    it('moves focus into the popup on the selected swatch when opened with the keyboard', async () => {
      const { page, host, popup } = await renderPickerWith({ themeColors: THEME_COLORS, initialColor: '#D0ECFF' });
      const focusSpy = jest.spyOn(radiosOf(popup, 'Brand Primary')[1], 'focus');
      pressKey(host, 'Enter');
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalled();
    });
    it.each([
      ['ArrowRight', 2],
      ['ArrowDown', 2],
      ['ArrowLeft', 0],
      ['ArrowUp', 0],
    ])('selects and focuses the adjacent swatch with %s', async (key, expectedIndex) => {
      const { page, popup } = await renderPickerWith({ themeColors: THEME_COLORS, initialColor: '#D0ECFF' });
      const radios = radiosOf(popup, 'Brand Primary');
      const focusSpy = jest.spyOn(radios[expectedIndex], 'focus');
      pressKey(radios[1], key);
      await page.waitForChanges();
      expect(radios.map(radio => radio.getAttribute('aria-checked'))[expectedIndex]).toBe('true');
      expect(radios[expectedIndex].getAttribute('tabindex')).toBe('0');
      expect(radios[1].getAttribute('aria-checked')).toBe('false');
      expect(focusSpy).toHaveBeenCalled();
    });
    it('wraps from the last swatch to the first', async () => {
      const { page, popup } = await renderPickerWith({ themeColors: THEME_COLORS, initialColor: '#A3D8FF' });
      const radios = radiosOf(popup, 'Brand Primary');
      pressKey(radios[2], 'ArrowRight');
      await page.waitForChanges();
      expect(radios[0].getAttribute('aria-checked')).toBe('true');
    });
    it('selects the focused swatch with Space and commits it when the popup closes', async () => {
      const { page, host, popup } = await renderPickerWith({ themeColors: THEME_COLORS, initialColor: '#D0ECFF' });
      const changeSpy = jest.fn();
      host.addEventListener('wppChange', changeSpy);
      pressKey(host, 'Enter');
      await page.waitForChanges();
      pressKey(radiosOf(popup, 'Grey')[0], ' ');
      await page.waitForChanges();
      pressKey(popup, 'Escape');
      await page.waitForChanges();
      expect(radiosOf(popup, 'Grey')[0].getAttribute('aria-checked')).toBe('true');
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ hexValue: '#FFFFFF', opacity: '100%' });
    });
  });
  describe('Testing saved colors', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    const renderCustomPicker = async () => {
      const result = await renderPickerWith({ mode: 'custom', initialColor: '#0014CC', savedColors: SAVED_COLORS });
      pressKey(result.host, 'Enter');
      await result.page.waitForChanges();
      return result;
    };
    it('renders saved colors and the save button as named, focusable buttons', async () => {
      const { popup } = await renderCustomPicker();
      const savedColors = Array.from(popup.querySelectorAll('.saved-color'));
      const saveButton = popup.querySelector('.save-color');
      expect(savedColors.map(color => color.getAttribute('aria-label'))).toEqual([
        '#7AB6FF',
        '#0014CC, 50% opacity',
        '#FF7A91',
      ]);
      expect(savedColors.every(color => color.getAttribute('tabindex') === '0')).toBe(true);
      expect(saveButton.getAttribute('role')).toBe('button');
      expect(saveButton.getAttribute('aria-label')).toBe('Save color');
      expect(saveButton.getAttribute('tabindex')).toBe('0');
    });
    it.each(['Enter', ' '])('applies a saved color with "%s"', async (key) => {
      const { page, host, popup } = await renderCustomPicker();
      const changeSpy = jest.fn();
      host.addEventListener('wppChange', changeSpy);
      pressKey(popup.querySelectorAll('.saved-color')[1], key);
      await page.waitForChanges();
      pressKey(popup, 'Escape');
      await page.waitForChanges();
      expect(changeSpy.mock.calls[0][0].detail).toEqual({ hexValue: '#0014CC', opacity: '50%' });
    });
    it('removes a saved color with Delete and moves focus to the next one once it is gone', async () => {
      const { page, host, popup } = await renderCustomPicker();
      const removeSpy = jest.fn();
      host.addEventListener('wppRemoveSavedColor', removeSpy);
      pressKey(popup.querySelectorAll('.saved-color')[1], 'Delete');
      await page.waitForChanges();
      expect(removeSpy.mock.calls[0][0].detail).toBe('rgba(0, 20, 204, 0.5)');
      const focusSpy = jest.spyOn(Object.getPrototypeOf(popup), 'focus');
      host.savedColors = SAVED_COLORS.filter(color => color !== removeSpy.mock.calls[0][0].detail);
      await page.waitForChanges();
      expect(focusSpy.mock.instances[0].getAttribute('aria-label')).toBe('#FF7A91');
    });
    it('moves focus to the save button when the last saved color is removed', async () => {
      const { page, host, popup } = await renderPickerWith({
        mode: 'custom',
        initialColor: '#0014CC',
        savedColors: ['#7AB6FF'],
      });
      pressKey(host, 'Enter');
      await page.waitForChanges();
      pressKey(popup.querySelector('.saved-color'), 'Backspace');
      const focusSpy = jest.spyOn(Object.getPrototypeOf(popup), 'focus');
      host.savedColors = [];
      await page.waitForChanges();
      expect(focusSpy.mock.instances[0].classList.contains('save-color')).toBe(true);
    });
    it.each(['Enter', ' '])('saves the current color with "%s" on the save button', async (key) => {
      const { page, host, popup } = await renderCustomPicker();
      const saveSpy = jest.fn();
      host.addEventListener('wppSaveColor', saveSpy);
      pressKey(popup.querySelector('.save-color'), key);
      await page.waitForChanges();
      expect(saveSpy.mock.calls[0][0].detail).toBe('rgba(0, 20, 204, 1)');
    });
  });
  describe('Testing custom color fields', () => {
    it('labels the format select and the value fields', async () => {
      const { page, host, popup } = await renderPickerWith({ mode: 'custom', type: 'rgba' });
      pressKey(host, 'Enter');
      await page.waitForChanges();
      const labelOf = (selector) => popup.querySelector(selector).ariaProps.label;
      expect(labelOf('wpp-select')).toBe('Color format');
      expect(labelOf('.red-input')).toBe('Red');
      expect(labelOf('.green-input')).toBe('Green');
      expect(labelOf('.blue-input')).toBe('Blue');
      expect(labelOf('.opacity-input')).toBe('Opacity');
    });
    it('labels the hex field', async () => {
      const { page, host, popup } = await renderPickerWith({ mode: 'custom', type: 'hex' });
      pressKey(host, 'Enter');
      await page.waitForChanges();
      expect(popup.querySelector('.hex-input').ariaProps.label).toBe('Hex value');
    });
    it('shows every opacity the slider steps to in the opacity field', async () => {
      const { page, tippy, host, popup } = await renderPickerWith({ mode: 'custom', type: 'hex' });
      pressKey(host, 'Enter');
      await page.waitForChanges();
      // Tippy portals the popup to the document, and the picker only accepts slider events from inside it.
      page.body.appendChild(popup);
      Object.assign(tippy, { popper: popup });
      // The child components are not registered in the spec, so their props render as attributes.
      const slider = popup.querySelector('wpp-opacity-slider');
      const field = popup.querySelector('.opacity-input');
      const shown = [];
      for (let percent = 0; percent <= 100; percent++) {
        slider.dispatchEvent(new CustomEvent('opacityChanged', { detail: percent / 100, bubbles: true }));
        await page.waitForChanges();
        shown.push(field.getAttribute('value'));
      }
      expect(shown).toEqual(Array.from({ length: 101 }, (_, percent) => `${percent}%`));
      expect(slider.getAttribute('opacity')).toBe('1');
    });
    it('renders the tab texts from locales', async () => {
      const { popup } = await renderPickerWith({
        mode: 'theme and custom',
        locales: { themeTab: 'Thema', customTab: 'Eigene' },
      });
      const segmentTexts = Array.from(popup.querySelectorAll('wpp-segmented-control-item')).map(item => item.textContent?.trim());
      expect(segmentTexts).toEqual(['Thema', 'Eigene']);
    });
  });
});
describe('wpp-color-picker: hex opacity colour', () => {
  const renderHexPicker = async (disabled = false) => {
    const page = await newSpecPage({
      components: [WppColorPicker, WppTypography],
      html: `<wpp-color-picker type="hex"${disabled ? ' disabled' : ''}></wpp-color-picker>`,
    });
    await page.waitForChanges();
    return page.root?.shadowRoot?.querySelector('.hex-opacity');
  };
  it('renders the opacity value in grey-800', async () => {
    const hexOpacity = await renderHexPicker();
    expect(hexOpacity).toBeTruthy();
    expect(hexOpacity.style.getPropertyValue('--typography-color')).toBe('var(--wpp-grey-color-800)');
  });
  it('renders the opacity value in the disabled text colour when disabled', async () => {
    const hexOpacity = await renderHexPicker(true);
    expect(hexOpacity.style.getPropertyValue('--typography-color')).toBe('var(--wpp-text-color-disabled)');
  });
});

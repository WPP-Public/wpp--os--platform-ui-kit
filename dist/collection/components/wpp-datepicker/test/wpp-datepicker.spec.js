import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppDatepicker } from '../wpp-datepicker';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { sampleDates } from './mocks';
import * as themeUtils from '../../../utils/subscribe-to-theme';
// Those tests are skipped because the initial snapshots contain the date when the they were created first time
// so they will fail every following month.
describe.skip('wpp-datepicker', () => {
  it('should render single select datepicker', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render single select datepicker with s size', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker size="s" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range datepicker', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker range />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range datepicker with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppDatepicker, WppLabel, WppInternalLabel],
      template: () => h("wpp-datepicker-v4-4-0", { range: true, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render datepicker with button trigger variant', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should have wpp-button-trigger class when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toHaveClass('wpp-button-trigger');
  });
  it('should render trigger-wrapper part when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const triggerWrapper = page.root?.shadowRoot?.querySelector('[part="trigger-wrapper"]');
    expect(triggerWrapper).not.toBeNull();
  });
  it('should not render input when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-4-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const input = page.root?.shadowRoot?.querySelector('input[part="datepicker-input"]');
    expect(input).toBeNull();
  });
});
describe('wpp-datepicker monthRangeNormalization', () => {
  const setup = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-4-0", { range: props.range ?? true, view: props.view ?? 'months', monthRangeNormalization: props.monthRangeNormalization ?? { enabled: true } })),
    });
    return { page, instance: page.rootInstance };
  };
  describe('shouldNormalizeMonthRange', () => {
    it('returns true when range=true, view=months, and normalization is enabled', async () => {
      const { instance } = await setup();
      expect(instance['shouldNormalizeMonthRange']()).toBe(true);
    });
    it('returns false when range is not enabled', async () => {
      const { instance } = await setup({ range: false });
      expect(instance['shouldNormalizeMonthRange']()).toBe(false);
    });
    it('returns false when view is not months', async () => {
      const { instance } = await setup({ view: 'days' });
      expect(instance['shouldNormalizeMonthRange']()).toBe(false);
    });
    it('returns false when normalization is disabled', async () => {
      const { instance } = await setup({ monthRangeNormalization: { enabled: false } });
      expect(instance['shouldNormalizeMonthRange']()).toBe(false);
    });
  });
  describe('isNormalizingMonthRange flag', () => {
    it('defaults to false', async () => {
      const { instance } = await setup();
      expect(instance['isNormalizingMonthRange']).toBe(false);
    });
  });
  describe('component behavior', () => {
    it('renders with monthRangeNormalization prop', async () => {
      const { page } = await setup();
      expect(page.root).toBeTruthy();
      expect(page.rootInstance.monthRangeNormalization).toEqual({ enabled: true });
    });
    it('accepts custom monthRangeNormalization config', async () => {
      const config = { enabled: true, startDay: 5, endDay: 25 };
      const { page } = await setup({ monthRangeNormalization: config });
      expect(page.rootInstance.monthRangeNormalization).toEqual(config);
    });
    it('defaults monthRangeNormalization to enabled', async () => {
      const page = await newSpecPage({
        components: [WppDatepicker],
        html: `<wpp-datepicker range view="months" />`,
      });
      expect(page.rootInstance.monthRangeNormalization).toEqual({ enabled: true });
    });
  });
});
describe('wpp-datepicker view watcher', () => {
  it('destroys and recreates the datepicker instance when the view prop changes', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { view: "months" }),
    });
    const instance = page.rootInstance;
    const destroySpy = jest.fn();
    const createSpy = jest
      .spyOn(instance, 'createDateInstance')
      .mockImplementation(() => undefined);
    const setInitialDateSpy = jest
      .spyOn(instance, 'setInitialDate')
      .mockImplementation(() => undefined);
    const setMinMaxDateSpy = jest
      .spyOn(instance, 'setMinMaxDate')
      .mockImplementation(() => undefined);
    instance.datePickerInstance = { destroy: destroySpy };
    instance.isDatePickerInitialized = true;
    instance.updateView();
    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(instance.isDatePickerInitialized).toBe(false);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(setInitialDateSpy).toHaveBeenCalledTimes(1);
    expect(setMinMaxDateSpy).toHaveBeenCalledTimes(1);
  });
  it('uses optional chaining when datePickerInstance is undefined', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { view: "years" }),
    });
    const instance = page.rootInstance;
    jest
      .spyOn(instance, 'createDateInstance')
      .mockImplementation(() => undefined);
    jest
      .spyOn(instance, 'setInitialDate')
      .mockImplementation(() => undefined);
    jest
      .spyOn(instance, 'setMinMaxDate')
      .mockImplementation(() => undefined);
    instance.datePickerInstance = undefined;
    expect(() => {
      ;
      instance.updateView();
    }).not.toThrow();
  });
  it('destroys and recreates the datepicker instance when the range prop changes', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      html: `<wpp-datepicker />`,
    });
    const instance = page.rootInstance;
    const destroySpy = jest.fn();
    const createSpy = jest
      .spyOn(instance, 'createDateInstance')
      .mockImplementation(() => undefined);
    const setInitialDateSpy = jest
      .spyOn(instance, 'setInitialDate')
      .mockImplementation(() => undefined);
    const setMinMaxDateSpy = jest
      .spyOn(instance, 'setMinMaxDate')
      .mockImplementation(() => undefined);
    instance.datePickerInstance = { destroy: destroySpy };
    instance.isDatePickerInitialized = true;
    instance.updateRange();
    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(instance.isDatePickerInitialized).toBe(false);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(setInitialDateSpy).toHaveBeenCalledTimes(1);
    expect(setMinMaxDateSpy).toHaveBeenCalledTimes(1);
  });
});
describe('wpp-datepicker manual input', () => {
  const setupSingle = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { ...props }),
    });
    return { page, instance: page.rootInstance };
  };
  const setupRange = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { range: true, ...props }),
    });
    return { page, instance: page.rootInstance };
  };
  describe('input is editable', () => {
    it('input does not have readOnly attribute for default date format', async () => {
      const { page } = await setupSingle();
      const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
      expect(input).not.toBeNull();
      expect(input.readOnly).toBe(false);
    });
    it('input does not have readOnly attribute for non-default date format', async () => {
      const { page } = await setupSingle({ locales: { dateFormat: 'MMMM yyyy' } });
      const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
      expect(input).not.toBeNull();
      expect(input.readOnly).toBe(false);
    });
  });
  describe('validateManualInput', () => {
    it('returns true for empty input', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('')).toBe(true);
    });
    it('returns true for valid single date', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput'](sampleDates.validSingle)).toBe(true);
    });
    it('returns false for invalid single date and sets error state', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput'](sampleDates.invalidSingle)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
    });
    it('returns false for non-date string and sets error state', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput'](sampleDates.invalidFormat)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
    });
    it('returns true for valid range dates', async () => {
      const { instance } = await setupRange();
      const rangeInput = `${sampleDates.validRangeStart} – ${sampleDates.validRangeEnd}`;
      expect(instance['validateManualInput'](rangeInput)).toBe(true);
    });
    it('returns false for invalid range date and sets error state', async () => {
      const { instance } = await setupRange();
      const rangeInput = `${sampleDates.invalidSingle} – ${sampleDates.validRangeEnd}`;
      expect(instance['validateManualInput'](rangeInput)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('uses custom invalidDateMessage from locales', async () => {
      const { instance } = await setupSingle({
        locales: { dateFormat: 'dd/MM/yyyy', invalidDateMessage: 'Fecha inválida' },
      });
      expect(instance['validateManualInput'](sampleDates.invalidSingle)).toBe(false);
      expect(instance['internalMessage']).toBe('Fecha inválida');
    });
    it('uses default message when invalidDateMessage is not set', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput'](sampleDates.invalidSingle)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
  });
  describe('clearInternalValidation', () => {
    it('clears internal error message and type', async () => {
      const { instance } = await setupSingle();
      // Trigger an error first
      instance['validateManualInput'](sampleDates.invalidSingle);
      expect(instance['internalMessage']).toBe('Invalid date format');
      // Clear it
      instance['clearInternalValidation']();
      expect(instance['internalMessage']).toBe('');
      expect(instance['internalMessageType']).toBeUndefined();
    });
  });
  describe('error message rendering', () => {
    it('renders inline message when internal validation fails', async () => {
      const { page, instance } = await setupSingle();
      instance['internalMessage'] = 'Invalid date format';
      instance['internalMessageType'] = 'error';
      await page.waitForChanges();
      const inlineMessage = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(inlineMessage).not.toBeNull();
      expect(inlineMessage?.getAttribute('message')).toBe('Invalid date format');
      expect(inlineMessage?.getAttribute('type')).toBe('error');
    });
    it('does not render inline message when no error', async () => {
      const { page } = await setupSingle();
      const inlineMessage = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(inlineMessage).toBeNull();
    });
    it('consumer-provided message takes precedence over internal validation', async () => {
      const { page, instance } = await setupSingle({
        message: 'Custom error',
        messageType: 'warning',
      });
      instance['internalMessage'] = 'Invalid date format';
      instance['internalMessageType'] = 'error';
      await page.waitForChanges();
      const inlineMessage = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(inlineMessage).not.toBeNull();
      expect(inlineMessage?.getAttribute('message')).toBe('Custom error');
      expect(inlineMessage?.getAttribute('type')).toBe('warning');
    });
  });
  describe('onKeyDown for non-default formats', () => {
    it('blocks letter keys for non-default date formats', async () => {
      const { instance } = await setupSingle({ locales: { dateFormat: 'MMMM yyyy' } });
      const mockEvent = {
        key: 'a',
        metaKey: false,
        ctrlKey: false,
        preventDefault: jest.fn(),
      };
      instance['onKeyDown'](mockEvent);
      // Should prevent default for non-default formats (read-only behavior)
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('allows Tab and Escape for non-default date formats', async () => {
      const { instance } = await setupSingle({ locales: { dateFormat: 'MMMM yyyy' } });
      for (const key of ['Tab', 'Escape']) {
        const mockEvent = {
          key,
          metaKey: false,
          ctrlKey: false,
          preventDefault: jest.fn(),
        };
        instance['onKeyDown'](mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      }
    });
    it('allows meta/ctrl key combos for non-default date formats', async () => {
      const { instance } = await setupSingle({ locales: { dateFormat: 'MMMM yyyy' } });
      const mockEvent = {
        key: 'c',
        metaKey: true,
        ctrlKey: false,
        preventDefault: jest.fn(),
      };
      instance['onKeyDown'](mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
    it('blocks letter keys for default date formats', async () => {
      const { instance } = await setupSingle();
      const mockEvent = {
        key: 'a',
        metaKey: false,
        ctrlKey: false,
        preventDefault: jest.fn(),
      };
      instance['onKeyDown'](mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('allows number keys for default date formats', async () => {
      const { instance } = await setupSingle();
      const mockEvent = {
        key: '5',
        metaKey: false,
        ctrlKey: false,
        preventDefault: jest.fn(),
      };
      instance['onKeyDown'](mockEvent);
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
    it('allows separator and control keys for default date formats', async () => {
      const { instance } = await setupSingle();
      for (const key of ['/', 'Backspace', 'Tab', 'Escape']) {
        const mockEvent = {
          key,
          metaKey: false,
          ctrlKey: false,
          preventDefault: jest.fn(),
        };
        instance['onKeyDown'](mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      }
    });
  });
  describe('click outside saves selection (range)', () => {
    it('onHideGetLastAppliedValue saves when 2 dates are selected', async () => {
      const { instance } = await setupRange();
      // Mock datePickerInstance
      const mockDates = [new Date(2026, 2, 1), new Date(2026, 2, 15)];
      instance['datePickerInstance'] = {
        selectedDates: mockDates,
        formatDate: (date, _format) => {
          const d = date.getDate().toString().padStart(2, '0');
          const m = (date.getMonth() + 1).toString().padStart(2, '0');
          const y = date.getFullYear();
          return `${d}/${m}/${y}`;
        },
      };
      instance['inputRef'] = {
        value: '',
        setSelectionRange: jest.fn(),
      };
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      instance['onHideGetLastAppliedValue']();
      expect(instance['lastAppliedDate']).toEqual(['01/03/2026', '15/03/2026']);
      expect(instance['lastValidDate']).toEqual(['01/03/2026', '15/03/2026']);
      expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({
        date: mockDates,
        formattedDate: ['01/03/2026', '15/03/2026'],
      }));
    });
  });
  describe('auto-adjust prevention (isManuallyTyping)', () => {
    it('isManuallyTyping defaults to false', async () => {
      const { instance } = await setupSingle();
      expect(instance['isManuallyTyping']).toBe(false);
    });
    it('onSelect skips side-effects when isManuallyTyping is true', async () => {
      const { instance } = await setupSingle();
      instance['isManuallyTyping'] = true;
      instance['justSelectedFromCalendar'] = false;
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      // Invoke the onSelect callback directly via datePickerInstance config
      const onSelectCallback = instance['datePickerInstance'].opts.onSelect;
      onSelectCallback({ date: new Date(2026, 2, 15), formattedDate: '15/03/2026' });
      // Should not emit wppChange or set justSelectedFromCalendar when isManuallyTyping
      expect(instance['justSelectedFromCalendar']).toBe(false);
      expect(emitSpy).not.toHaveBeenCalled();
      instance['isManuallyTyping'] = false;
    });
    it('isStringDateValid rejects auto-adjusted dates like 99/99/9999', async () => {
      const { instance } = await setupSingle();
      // 99/99/9999 would be auto-adjusted by JS Date, but isStringDateValid rejects it
      expect(instance['isStringDateValid']('99/99/9999')).toBe(false);
      expect(instance['isStringDateValid']('32/13/2026')).toBe(false);
      expect(instance['isStringDateValid']('00/00/0000')).toBe(false);
    });
    it('isStringDateValid accepts valid dates', async () => {
      const { instance } = await setupSingle();
      expect(instance['isStringDateValid']('15/03/2026')).toBe(true);
      expect(instance['isStringDateValid']('01/01/2025')).toBe(true);
      expect(instance['isStringDateValid']('28/02/2026')).toBe(true);
    });
    it('isStringDateValid rejects 29/02 on non-leap years', async () => {
      const { instance } = await setupSingle();
      expect(instance['isStringDateValid']('29/02/2026')).toBe(false); // 2026 is not a leap year
      expect(instance['isStringDateValid']('29/02/2024')).toBe(true); // 2024 is a leap year
    });
  });
  describe('edge case validation (dd/MM/yyyy format)', () => {
    it('accepts valid date 18/03/2026', async () => {
      const { instance } = await setupSingle();
      expect(instance['isStringDateValid']('18/03/2026')).toBe(true);
      expect(instance['validateManualInput']('18/03/2026')).toBe(true);
      expect(instance['internalMessage']).toBe('');
    });
    it('rejects 31/02/2026 — Feb has no 31st', async () => {
      const { instance } = await setupSingle();
      expect(instance['isStringDateValid']('31/02/2026')).toBe(false);
      expect(instance['validateManualInput']('31/02/2026')).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('rejects 29/02/2025 — not a leap year', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('29/02/2025')).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('accepts 29/02/2024 — leap year', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('29/02/2024')).toBe(true);
      expect(instance['internalMessage']).toBe('');
    });
    it('rejects 99/99/9999 — retains input value', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('99/99/9999')).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
    });
    it('rejects day 0 — 00/15/2026', async () => {
      const { instance } = await setupSingle();
      // In dd/MM/yyyy format, 00/15/2026 means day=00, month=15 — both invalid
      expect(instance['validateManualInput']('00/15/2026')).toBe(false);
    });
    it('rejects month 13 — 01/13/2026', async () => {
      const { instance } = await setupSingle();
      // dd/MM/yyyy: day=01, month=13 — month invalid
      expect(instance['validateManualInput']('01/13/2026')).toBe(false);
    });
    it('returns true for empty input — no error', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('')).toBe(true);
      expect(instance['internalMessage']).toBe('');
    });
    it('returns true for whitespace-only input', async () => {
      const { instance } = await setupSingle();
      expect(instance['validateManualInput']('   ')).toBe(true);
    });
    it('rejects incomplete date (partial typing)', async () => {
      const { instance } = await setupSingle();
      // Partial dates don't pass round-trip validation
      expect(instance['validateManualInput']('15/03')).toBe(false);
    });
  });
  describe('range mode edge cases', () => {
    it('rejects range where first date is valid but second is invalid', async () => {
      const { instance } = await setupRange();
      const rangeInput = '01/03/2026 – 31/02/2026';
      expect(instance['validateManualInput'](rangeInput)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('rejects range where first date is invalid but second is valid', async () => {
      const { instance } = await setupRange();
      const rangeInput = '99/99/9999 – 15/03/2026';
      expect(instance['validateManualInput'](rangeInput)).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('accepts range where both dates are valid', async () => {
      const { instance } = await setupRange();
      const rangeInput = '01/03/2026 – 15/03/2026';
      expect(instance['validateManualInput'](rangeInput)).toBe(true);
      expect(instance['internalMessage']).toBe('');
    });
    it('rejects range where both dates are invalid', async () => {
      const { instance } = await setupRange();
      const rangeInput = '31/02/2026 – 99/99/9999';
      expect(instance['validateManualInput'](rangeInput)).toBe(false);
    });
  });
  describe('validation state lifecycle', () => {
    it('clearInternalValidation clears error after invalid input', async () => {
      const { instance } = await setupSingle();
      instance['validateManualInput']('99/99/9999');
      expect(instance['internalMessage']).toBe('Invalid date format');
      instance['clearInternalValidation']();
      expect(instance['internalMessage']).toBe('');
      expect(instance['internalMessageType']).toBeUndefined();
    });
    it('onFocus clears internal validation', async () => {
      const { instance } = await setupSingle();
      instance['validateManualInput']('31/02/2026');
      expect(instance['internalMessage']).toBe('Invalid date format');
      jest.spyOn(instance['wppFocus'], 'emit').mockImplementation(() => undefined);
      instance['tippyInstance'] = { state: { isShown: true }, show: jest.fn() };
      instance['onFocus'](new FocusEvent('focus'));
      expect(instance['internalMessage']).toBe('');
    });
    it('onFocus resets justSelectedFromCalendar so next blur validates', async () => {
      const { instance } = await setupSingle();
      // Simulate initial load setting justSelectedFromCalendar via onSelect
      instance['justSelectedFromCalendar'] = true;
      jest.spyOn(instance['wppFocus'], 'emit').mockImplementation(() => undefined);
      instance['tippyInstance'] = { state: { isShown: true }, show: jest.fn() };
      instance['onFocus'](new FocusEvent('focus'));
      expect(instance['justSelectedFromCalendar']).toBe(false);
      // Simulate click-outside: isInComponent set to false (by tippy onHidden), onBlur runs
      instance['isInComponent'] = false;
      jest.spyOn(instance['wppBlur'], 'emit').mockImplementation(() => undefined);
      instance['inputRef'] = { value: '99/07/2024' };
      instance['onBlur']();
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('valid input after invalid clears the error', async () => {
      const { instance } = await setupSingle();
      instance['validateManualInput']('99/99/9999');
      expect(instance['internalMessage']).toBe('Invalid date format');
      instance['validateManualInput']('15/03/2026');
      expect(instance['internalMessage']).toBe('');
    });
    it('onBlur with valid manual input updates lastValidDate and emits wppChange', async () => {
      const { instance } = await setupSingle();
      instance['isInComponent'] = false;
      instance['justSelectedFromCalendar'] = false;
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      jest.spyOn(instance['wppBlur'], 'emit').mockImplementation(() => undefined);
      instance['inputRef'] = { value: sampleDates.validSingle };
      instance['onBlur']();
      expect(instance['lastValidDate']).toBe(sampleDates.validSingle);
      expect(instance['isValueExists']).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({
        formattedDate: sampleDates.validSingle,
      }));
    });
    it('onBlur with invalid manual input does not update lastValidDate', async () => {
      const { instance } = await setupSingle();
      instance['isInComponent'] = false;
      instance['justSelectedFromCalendar'] = false;
      instance['lastValidDate'] = '';
      jest.spyOn(instance['wppBlur'], 'emit').mockImplementation(() => undefined);
      instance['inputRef'] = { value: sampleDates.invalidSingle };
      instance['onBlur']();
      expect(instance['lastValidDate']).toBe('');
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
  });
  describe('range close with invalid manual input (WPPOPENDS-1266)', () => {
    it('rejects a single valid date in range mode as incomplete', async () => {
      const { instance } = await setupRange();
      // A single valid date without separator is incomplete for a range
      expect(instance['validateManualInput']('20/12/3000')).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
    });
    it('rejects a single valid date followed by separator as incomplete range', async () => {
      const { instance } = await setupRange();
      expect(instance['validateManualInput']('01/03/2026 – ')).toBe(false);
      expect(instance['internalMessage']).toBe('Invalid date format');
    });
    it('onHideGetLastAppliedValue preserves error state and does not overwrite input', async () => {
      const { instance } = await setupRange();
      // Simulate: user typed non-existent date, onBlur set error
      instance['internalMessage'] = 'Invalid date format';
      instance['internalMessageType'] = 'error';
      // Mock datePickerInstance with valid calendar selection
      const mockDates = [new Date(2026, 2, 1), new Date(2026, 2, 15)];
      instance['datePickerInstance'] = {
        selectedDates: mockDates,
        formatDate: (date, _format) => {
          const d = date.getDate().toString().padStart(2, '0');
          const m = (date.getMonth() + 1).toString().padStart(2, '0');
          const y = date.getFullYear();
          return `${d}/${m}/${y}`;
        },
      };
      instance['inputRef'] = {
        value: '30/02/2026 – 15/03/2026',
        setSelectionRange: jest.fn(),
      };
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      instance['onHideGetLastAppliedValue']();
      // Error state should be preserved — not overwritten by calendar dates
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
      // Input should NOT have been overwritten
      expect(instance['inputRef'].value).toBe('30/02/2026 – 15/03/2026');
      // Should NOT have emitted wppChange with the calendar's valid dates
      expect(emitSpy).not.toHaveBeenCalled();
      // lastAppliedDate should remain unchanged
      expect(instance['lastAppliedDate']).toEqual([]);
    });
    it('onHideGetLastAppliedValue still saves when no validation error', async () => {
      const { instance } = await setupRange();
      // No validation error
      instance['internalMessage'] = '';
      const mockDates = [new Date(2026, 2, 1), new Date(2026, 2, 15)];
      instance['datePickerInstance'] = {
        selectedDates: mockDates,
        formatDate: (date, _format) => {
          const d = date.getDate().toString().padStart(2, '0');
          const m = (date.getMonth() + 1).toString().padStart(2, '0');
          const y = date.getFullYear();
          return `${d}/${m}/${y}`;
        },
      };
      instance['inputRef'] = {
        value: '',
        setSelectionRange: jest.fn(),
      };
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      instance['onHideGetLastAppliedValue']();
      // Should save normally
      expect(instance['lastAppliedDate']).toEqual(['01/03/2026', '15/03/2026']);
      expect(emitSpy).toHaveBeenCalled();
    });
    it('non-existent date in range shows error after close', async () => {
      const { instance } = await setupRange();
      // Full range with non-existent start date (Feb 30)
      const rangeInput = '30/02/2026 – 15/03/2026';
      instance['isInComponent'] = false;
      instance['justSelectedFromCalendar'] = false;
      jest.spyOn(instance['wppBlur'], 'emit').mockImplementation(() => undefined);
      instance['inputRef'] = { value: rangeInput };
      instance['onBlur']();
      expect(instance['internalMessage']).toBe('Invalid date format');
      expect(instance['internalMessageType']).toBe('error');
    });
  });
  describe('preset after partial selection (range)', () => {
    it('handlePreviewPreset clears partial selection before applying preset dates', async () => {
      const { instance } = await setupRange();
      const clearSpy = jest.fn();
      const selectDateSpy = jest.fn();
      const updateSpy = jest.fn();
      instance['datePickerInstance'] = {
        selectedDates: [new Date(2026, 2, 31)],
        clear: clearSpy,
        selectDate: selectDateSpy,
        update: updateSpy,
        formatDate: jest.fn(),
      };
      instance['handlePreviewPreset'](['01/03/2026', '31/03/2026']);
      // Should clear existing partial selection before applying preset
      expect(clearSpy).toHaveBeenCalledWith({ silent: true });
      expect(selectDateSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalled();
    });
    it('handleClickPreset sets value to full preset range', async () => {
      const { instance } = await setupRange();
      const mockPreset = { label: 'This month', value: ['01/03/2026', '31/03/2026'] };
      instance['datePickerInstance'] = {
        selectedDates: [new Date(2026, 2, 1), new Date(2026, 2, 31)],
        formatDate: (date, _format) => {
          const d = date.getDate().toString().padStart(2, '0');
          const m = (date.getMonth() + 1).toString().padStart(2, '0');
          const y = date.getFullYear();
          return `${d}/${m}/${y}`;
        },
      };
      const emitSpy = jest.fn();
      instance['wppChange'] = { emit: emitSpy };
      instance['tippyInstance'] = { hide: jest.fn() };
      instance['handleClickPreset'](mockPreset);
      expect(instance['lastValidDate']).toEqual(['01/03/2026', '31/03/2026']);
      expect(instance['lastAppliedDate']).toEqual(['01/03/2026', '31/03/2026']);
      expect(emitSpy).toHaveBeenCalled();
    });
  });
  describe('unselect end date reverts to full range', () => {
    it('onHideGetLastAppliedValue reverts input to full range when end date is unselected', async () => {
      const { instance } = await setupRange();
      // Simulate: had a full range applied
      instance['lastAppliedDate'] = ['01/03/2026', '31/03/2026'];
      instance['lastValidDate'] = ['01/03/2026', '31/03/2026'];
      const clearSpy = jest.fn();
      const selectDateSpy = jest.fn();
      // Simulate: user unselected end date, only 1 date left in calendar
      instance['datePickerInstance'] = {
        selectedDates: [new Date(2026, 2, 1)],
        clear: clearSpy,
        selectDate: selectDateSpy,
        formatDate: jest.fn(),
      };
      instance['inputRef'] = {
        value: '01/03/2026',
        setSelectionRange: jest.fn(),
      };
      instance['onHideGetLastAppliedValue']();
      // Should revert value to the array (not a joined string)
      expect(instance['value']).toEqual(['01/03/2026', '31/03/2026']);
      // Should update the input DOM to show the full range
      expect(instance['inputRef'].value).toBe('01/03/2026 – 31/03/2026');
      // Should clear before re-selecting to avoid append behavior
      expect(clearSpy).toHaveBeenCalledWith({ silent: true });
      expect(selectDateSpy).toHaveBeenCalled();
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
        components: [WppDatepicker],
        template: () => h("wpp-datepicker-v4-4-0", null),
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppDatepicker],
        template: () => h("wpp-datepicker-v4-4-0", null),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
describe('wpp-datepicker accessibility', () => {
  const setup = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { ...props }),
    });
    const instance = page.rootInstance;
    // The clear control only renders once a value is committed.
    instance['lastValidDate'] = sampleDates.validSingle;
    await page.waitForChanges();
    const clear = page.root?.shadowRoot?.querySelector('[part="icon-cross"]');
    return { page, instance, clear };
  };
  it('exposes the clear control as a keyboard-operable button with an accessible name', async () => {
    const { clear } = await setup();
    expect(clear).toBeTruthy();
    // wpp-icon-cross is a bare presentational icon; without role="button" the aria-label is
    // a prohibited ARIA attribute (axe serious) and the control is not keyboard reachable.
    expect(clear.getAttribute('role')).toBe('button');
    expect(clear.getAttribute('tabindex')).toBe('0');
    expect(clear.getAttribute('aria-label')).toBe('Erase date');
    expect(clear.getAttribute('aria-disabled')).toBe('false');
  });
  it('marks the clear control aria-disabled when the datepicker is disabled', async () => {
    const { clear } = await setup({ disabled: true });
    expect(clear.getAttribute('aria-disabled')).toBe('true');
  });
  it('uses the eraseDateLabel from locales for the clear control accessible name', async () => {
    const { clear } = await setup({ locales: { eraseDateLabel: 'Borrar fecha' } });
    expect(clear.getAttribute('aria-label')).toBe('Borrar fecha');
  });
  it('clears the value when the clear control is activated via keyboard', async () => {
    const { page, instance, clear } = await setup();
    clear.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(instance.value).toBe('');
    expect(instance['isValueExists']).toBe(false);
  });
  it('removes the clear control from the tab order when disabled (WPPOPENDS-1484 item 6)', async () => {
    const { clear } = await setup({ disabled: true });
    // aria-disabled alone is not enough — an unconditional tabindex=0 still lets a keyboard
    // user Tab onto the disabled clear icon. It must leave the tab order entirely.
    expect(clear.getAttribute('tabindex')).toBe('-1');
    expect(clear.getAttribute('aria-disabled')).toBe('true');
  });
  it('drops the active look once focus leaves a datepicker whose calendar never opened', async () => {
    const { page } = await setup();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    input.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    expect(page.root?.className).toContain('wpp-active');
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    // The active state used to be cleared only by the popup's onHidden, which never runs if the
    // calendar was never opened — so a field you had merely tabbed through kept the filled look
    // for good (WPPOPENDS-1484 item 14).
    expect(page.root?.className).not.toContain('wpp-active');
  });
  it('emits wppBlur when focus leaves a datepicker whose calendar never opened', async () => {
    const { page } = await setup();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    const onBlur = jest.fn();
    page.root?.addEventListener('wppBlur', onBlur);
    input.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    // Same root cause as above: the stuck flag short-circuited the whole leave path, so the event
    // never fired and manual input was never re-validated.
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  it('keeps the keyboard focus ring when the popup closes but focus stays on the field', async () => {
    const { page } = await setup();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    await page.waitForChanges();
    expect(input.className).toContain('tab-focus');
    // The popup closing routes through the same leave checks as a blur, but Escape and Apply hand
    // focus back to the field first — so the ring has to survive it (WPPOPENDS-1484: "focus
    // remains but box-shadow is not displayed").
    const datepicker = page.root;
    datepicker.isInComponent = true;
    await page.waitForChanges();
    datepicker.isInComponent = false;
    await page.waitForChanges();
    expect(input.className).toContain('tab-focus');
  });
  it('drops the keyboard focus ring when the field really blurs', async () => {
    const { page } = await setup();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    await page.waitForChanges();
    expect(input.className).toContain('tab-focus');
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(input.className).not.toContain('tab-focus');
  });
  it('paints the keyboard focus state on an autofocused field', async () => {
    const { page } = await setup({ autoFocus: true });
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    // The ring is drawn from the stateful `.tab-focus` class, not `:focus-visible`, and focusing
    // in code fires neither mousedown nor a Tab keyup — so the field held focus with nothing
    // drawn on it (WCAG 2.4.7).
    expect(input.className).toContain('tab-focus');
  });
  it('wires the textbox and calendar button to the portaled dialog without a cross-root IDREF', async () => {
    const { page } = await setup();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    const button = page.root?.shadowRoot?.querySelector('[part="icon-calendar"]');
    const popup = page.root?.shadowRoot?.querySelector('.wpp-datepicker-portal');
    expect(input.getAttribute('role')).toBeNull();
    expect(input.hasAttribute('aria-controls')).toBe(false);
    expect(button.getAttribute('role')).toBe('button');
    // Pointer-only trigger (WPPOPENDS-1484 item 4): QA asked for the calendar icon to leave the
    // tab order. It keeps its button semantics for assistive tech, and the keyboard route into
    // the calendar is ArrowDown/ArrowUp on the field, so the dialog is still reachable.
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(button.getAttribute('aria-label')).toBe('Choose date');
    expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(popup.getAttribute('role')).toBe('dialog');
    expect(popup.getAttribute('aria-modal')).toBe('false');
    expect(popup.getAttribute('aria-label')).toBeTruthy();
  });
  it('removes the calendar button from the tab order when disabled', async () => {
    const { page } = await setup({ disabled: true });
    const button = page.root?.shadowRoot?.querySelector('[part="icon-calendar"]');
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });
  it('names the textbox from the label, falling back to the calendar label when unlabelled', async () => {
    const labelled = await setup({ labelConfig: { text: 'Start date' } });
    const labelledInput = labelled.page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    expect(labelledInput.getAttribute('aria-label')).toBe('Start date');
    const unlabelled = await setup();
    const unlabelledInput = unlabelled.page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    expect(unlabelledInput.getAttribute('aria-label')).toBe('Choose date');
  });
  it('associates the rendered label with the shadow-local datepicker input', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker, WppLabel, WppInternalLabel],
      template: () => h("wpp-datepicker-v4-4-0", { name: "scenario-labelled", labelConfig: { text: 'Start date' } }),
    });
    await page.waitForChanges();
    const shadowRoot = page.root?.shadowRoot;
    const input = shadowRoot?.querySelector('[part="datepicker-input"]');
    const label = shadowRoot?.querySelector('wpp-label');
    expect(label.htmlFor).toBe('datepicker');
    expect(shadowRoot?.getElementById(label.htmlFor)).toBe(input);
    expect(input.getAttribute('aria-label')).toBe('Start date');
  });
  it('gives each portaled datepicker dialog a unique id', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("div", null, h("wpp-datepicker-v4-4-0", null), h("wpp-datepicker-v4-4-0", null))),
    });
    await page.waitForChanges();
    // The popup is re-parented into the light DOM by tippy, so its id must be unique per
    // instance. The input/message ids stay static because they are scoped to each shadow root.
    const dps = Array.from(page.body.querySelectorAll('wpp-datepicker'));
    const popupIds = dps.map(dp => dp.shadowRoot?.querySelector('.wpp-datepicker-portal')?.id);
    const inputIds = dps.map(dp => dp.shadowRoot?.querySelector('[part="datepicker-input"]')?.id);
    expect(popupIds[0]).toBeTruthy();
    expect(popupIds[1]).toBeTruthy();
    expect(popupIds[0]).not.toBe(popupIds[1]);
    // Static shadow-scoped input id keeps the #datepicker stylesheet block applied.
    expect(inputIds[0]).toBe('datepicker');
    expect(inputIds[1]).toBe('datepicker');
  });
  it('announces a consumer error via a live region and associates it with the input (item 9)', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { message: "This field is required", messageType: "error" }),
    });
    await page.waitForChanges();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    const region = page.root?.shadowRoot?.querySelector('.inline-message-live-region');
    expect(region).toBeTruthy();
    expect(region.getAttribute('role')).toBe('alert');
    expect(region.id).toBeTruthy();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(region.id);
  });
  it('clears the keyboard focus ring the moment the input blurs (WPPOPENDS-1484 item 1)', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", null),
    });
    await page.waitForChanges();
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    // Keyboard focus (Tab keyup) applies the stateful `.tab-focus` ring class.
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab', bubbles: true }));
    await page.waitForChanges();
    expect(input.classList.contains('tab-focus')).toBe(true);
    // Blurring must drop the ring immediately — otherwise it sticks on a datepicker you
    // have tabbed away from (the reported item-1 bug).
    input.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(input.classList.contains('tab-focus')).toBe(false);
  });
  it('renders the range-mode Clear and Apply buttons as focusable (WPPOPENDS-1484 item 4)', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { range: true }),
    });
    await page.waitForChanges();
    // air-datepicker renders the footer from our buttons config; tabindex='0' there puts
    // both buttons in the popup's Tab order (previously '-1', which made them unreachable).
    const clear = page.root?.shadowRoot?.querySelector('.air-datepicker-button.button-clear');
    const apply = page.root?.shadowRoot?.querySelector('.air-datepicker-button.button-apply');
    expect(clear).toBeTruthy();
    expect(apply).toBeTruthy();
    expect(clear.getAttribute('tabindex')).toBe('0');
    expect(apply.getAttribute('tabindex')).toBe('0');
  });
  it('exposes the calendar as an ARIA grid with selectable, labelled cells (item 8)', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", { value: "15/03/2026" }),
    });
    // air-datepicker's async select callback closes the popup via tippy, which does not
    // mount in the mock DOM — stub the collaborator before that timer fires.
    const instance = page.rootInstance;
    instance.tippyInstance = { state: {}, hide: jest.fn() };
    await page.waitForChanges();
    // Selecting the initial value navigates the view, which schedules the a11y augmentation
    // (onChangeViewDate -> setTimeout); flush that tick before asserting.
    await new Promise(resolve => setTimeout(resolve, 10));
    await page.waitForChanges();
    const shadow = page.root?.shadowRoot;
    const grid = shadow?.querySelector('.air-datepicker-body:not(.-hidden-)');
    expect(grid.getAttribute('role')).toBe('grid');
    const columnHeaders = shadow?.querySelectorAll('.air-datepicker-body--day-name[role="columnheader"]');
    const cells = shadow?.querySelectorAll('.air-datepicker-cell[role="gridcell"]');
    const rovingCells = shadow?.querySelectorAll('.air-datepicker-cell[tabindex="0"]');
    const selected = shadow?.querySelector('.air-datepicker-cell[aria-selected="true"]');
    expect(columnHeaders?.length).toBe(7);
    expect(cells?.length).toBeGreaterThan(27);
    // Roving tabindex: exactly one cell is the tab stop.
    expect(rovingCells?.length).toBe(1);
    // The selected date carries aria-selected and a full-date accessible name.
    expect(selected).toBeTruthy();
    expect(selected.getAttribute('aria-label')).toBe('15 March 2026');
  });
  it('closes the calendar on Escape without letting the event reach the page (item 10)', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-4-0", null),
    });
    await page.waitForChanges();
    const instance = page.rootInstance;
    const input = page.root?.shadowRoot?.querySelector('[part="datepicker-input"]');
    // tippy does not mount in the mock DOM, so stub the collaborator in the open state
    // (same seam the view-watcher test uses for datePickerInstance).
    const hide = jest.fn();
    instance.tippyInstance = { state: { isShown: true }, hide };
    // A document-level listener stands in for wpp-side-modal's ESC-close handler.
    const documentEsc = jest.fn();
    page.doc.addEventListener('keydown', documentEsc);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    // The calendar was told to close, and stopPropagation kept ESC from reaching the
    // document (a containing wpp-side-modal would have closed on it).
    expect(hide).toHaveBeenCalled();
    expect(documentEsc).not.toHaveBeenCalled();
    page.doc.removeEventListener('keydown', documentEsc);
  });
});

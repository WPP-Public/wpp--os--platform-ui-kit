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
      template: () => h("wpp-datepicker-v4-1-0", { range: true, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render datepicker with button trigger variant', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-1-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should have wpp-button-trigger class when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-1-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    expect(page.root).toHaveClass('wpp-button-trigger');
  });
  it('should render trigger-wrapper part when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-1-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const triggerWrapper = page.root?.shadowRoot?.querySelector('[part="trigger-wrapper"]');
    expect(triggerWrapper).not.toBeNull();
  });
  it('should not render input when trigger slot is used', async () => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-1-0", null, h("button", { slot: "trigger" }, "Select Date"))),
    });
    const input = page.root?.shadowRoot?.querySelector('input#datepicker');
    expect(input).toBeNull();
  });
});
describe('wpp-datepicker monthRangeNormalization', () => {
  const setup = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => (h("wpp-datepicker-v4-1-0", { range: props.range ?? true, view: props.view ?? 'months', monthRangeNormalization: props.monthRangeNormalization ?? { enabled: true } })),
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
      template: () => h("wpp-datepicker-v4-1-0", { view: "months" }),
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
      template: () => h("wpp-datepicker-v4-1-0", { view: "years" }),
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
      template: () => h("wpp-datepicker-v4-1-0", { ...props }),
    });
    return { page, instance: page.rootInstance };
  };
  const setupRange = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppDatepicker],
      template: () => h("wpp-datepicker-v4-1-0", { range: true, ...props }),
    });
    return { page, instance: page.rootInstance };
  };
  describe('input is editable', () => {
    it('input does not have readOnly attribute for default date format', async () => {
      const { page } = await setupSingle();
      const input = page.root?.shadowRoot?.querySelector('#datepicker');
      expect(input).not.toBeNull();
      expect(input.readOnly).toBe(false);
    });
    it('input does not have readOnly attribute for non-default date format', async () => {
      const { page } = await setupSingle({ locales: { dateFormat: 'MMMM yyyy' } });
      const input = page.root?.shadowRoot?.querySelector('#datepicker');
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
        template: () => h("wpp-datepicker-v4-1-0", null),
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppDatepicker],
        template: () => h("wpp-datepicker-v4-1-0", null),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

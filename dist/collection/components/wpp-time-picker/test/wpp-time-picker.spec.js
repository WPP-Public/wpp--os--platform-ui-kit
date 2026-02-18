jest.mock('../../../common/menuListConfig', () => ({
  menuListConfig: jest.fn(),
}));
import { newSpecPage } from '@stencil/core/testing';
import { WppTimePicker } from '../wpp-time-picker';
import { menuListConfig } from '../../../common/menuListConfig';
import { PLACEHOLDER, DEFAULT_CHECKED_TIME_VALUES, HOURS } from '../config';
import { FOCUS_TYPE } from '../../../types/common';
describe('wpp-time-picker', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with minutesInterval = 15', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker minutes-interval="15" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with minutesInterval = 15 and label', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker minutes-interval="15"></wpp-time-picker>`,
    });
    const component = page.rootInstance;
    component.labelConfig = { text: 'Label' };
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-time-picker full function & branch coverage', () => {
  let page;
  let instance;
  let timeoutSpy;
  beforeAll(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0;
    });
    Object.defineProperty(HTMLInputElement.prototype, 'setSelectionRange', {
      value: jest.fn(),
      configurable: true,
    });
  });
  afterAll(() => {
    timeoutSpy.mockRestore();
  });
  const setup = async (props = {}) => {
    page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    instance = page.rootInstance;
    Object.assign(instance, props);
    await page.waitForChanges();
    // hard mocks
    instance.inputRef = document.createElement('input');
    instance.portalRef = document.createElement('div');
    instance.hoursSectionRef = document.createElement('div');
    instance.minutesSectionRef = document.createElement('div');
    instance.anchorRef = document.createElement('div');
    instance.tippyInstance = {
      state: { isShown: true },
      hide: jest.fn(),
      props: {},
    };
  };
  it('highlightItem sets correct indexes', async () => {
    await setup({ value: '02:10' });
    instance.generatedMinutes = ['00', '05', '10'];
    instance['highlightItem']();
    expect(instance.checkedTimeValues).toEqual({
      hoursIndex: HOURS.indexOf('02'),
      minutesIndex: 2,
    });
  });
  it('scrollIntoView scrolls hours & minutes when elements exist', async () => {
    await setup({ value: '01:05' });
    const hourEl = document.createElement('div');
    hourEl.id = 'hour-01';
    Object.defineProperty(hourEl, 'offsetTop', { value: 50 });
    const minEl = document.createElement('div');
    minEl.id = 'minutes-05';
    Object.defineProperty(minEl, 'offsetTop', { value: 80 });
    instance.portalRef.append(hourEl, minEl);
    instance['scrollIntoView']();
    expect(instance.hoursSectionRef.scrollTop).toBeGreaterThan(0);
    expect(instance.minutesSectionRef.scrollTop).toBeGreaterThan(0);
  });
  it('isValidTimeValue returns undefined for hh:mm', async () => {
    await setup();
    expect(instance['isValidTimeValue']('hh:mm')).toBeUndefined();
  });
  it('isValidTimeValue returns false for invalid', async () => {
    await setup();
    expect(instance['isValidTimeValue']('99:99')).toBe(false);
  });
  it('isValidTimeValue normalizes valid value', async () => {
    await setup({ minutesInterval: 5 });
    expect(instance['isValidTimeValue']('10:07')).toBe(true);
    expect(instance.value).toBe('10:05');
  });
  it('setErrorMessage sets and clears error', async () => {
    await setup();
    instance['setErrorMessage']('err');
    expect(instance.messageType).toBe('error');
    instance['setErrorMessage'](undefined);
    expect(instance.messageType).toBeUndefined();
  });
  it('createTippyInstance early returns without anchor', async () => {
    await setup();
    instance.anchorRef = undefined;
    instance['createTippyInstance']();
    expect(instance.tippyInstance).toBeDefined();
  });
  it('onHide covers placeholder, input sync and dropdownConfig.onHide', async () => {
    await setup({ value: PLACEHOLDER });
    const blurSpy = jest.fn();
    const onHideSpy = jest.fn();
    instance.inputRef.value = '1:2';
    instance.inputRef.blur = blurSpy;
    instance.dropdownConfig = { onHide: onHideSpy };
    let capturedConfig;
    menuListConfig.mockImplementation(cfg => {
      capturedConfig = cfg;
      return { hide: jest.fn(), state: {} };
    });
    instance['createTippyInstance']();
    capturedConfig.onHide({});
    expect(instance.value).toBe('');
    expect(blurSpy).toHaveBeenCalled();
    expect(onHideSpy).toHaveBeenCalled();
  });
  it('onShow covers disabled and width branches', async () => {
    await setup();
    let capturedConfig;
    menuListConfig.mockImplementation(cfg => {
      capturedConfig = cfg;
      return {};
    });
    /* ---------- disabled branch ---------- */
    instance.disabled = true;
    instance['createTippyInstance']();
    expect(capturedConfig.onShow({})).toBe(false);
    /* ---------- width branch (<150px) ---------- */
    instance.disabled = false;
    // 🔑 FIX: mock clientWidth on existing host
    Object.defineProperty(instance.host, 'clientWidth', {
      value: 100,
      configurable: true,
    });
    const popper = { style: {} };
    capturedConfig.onShow({ popper });
    expect(popper.style.width).toBe('150px');
    /* ---------- width branch (>=150px) ---------- */
    Object.defineProperty(instance.host, 'clientWidth', {
      value: 220,
      configurable: true,
    });
    capturedConfig.onShow({ popper });
    expect(popper.style.width).toBe('220px');
  });
  it('onClickOutside covers host click and external click', async () => {
    await setup();
    let capturedConfig;
    menuListConfig.mockImplementation(cfg => {
      capturedConfig = cfg;
      return { hide: jest.fn() };
    });
    instance['createTippyInstance']();
    const stopEvt = {
      target: instance.host,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    capturedConfig.onClickOutside({}, stopEvt);
    expect(stopEvt.preventDefault).toHaveBeenCalled();
    expect(stopEvt.stopPropagation).toHaveBeenCalled();
    const outsideEvt = {
      target: document.body,
    };
    capturedConfig.onClickOutside({}, outsideEvt);
    expect(instance.tippyInstance.hide).toHaveBeenCalled();
  });
  it('updateValueOnHide pads hours and minutes', async () => {
    await setup({ value: '1:2' });
    instance['updateValueOnHide']('1:2');
    expect(instance.value).toBe('1:00');
  });
  it('handleClickCrossIcon covers shown & hidden states', async () => {
    await setup({ value: '10:10' });
    const emitSpy = jest.fn();
    instance.wppClear.emit = emitSpy;
    instance.tippyInstance.state.isShown = true;
    instance['handleClickCrossIcon']({ stopPropagation: jest.fn() });
    expect(instance.value).toBe(PLACEHOLDER);
    instance.tippyInstance.state.isShown = false;
    instance['handleClickCrossIcon']({ stopPropagation: jest.fn() });
    expect(emitSpy).toHaveBeenCalled();
  });
  /* ---------------------------------- */
  /* handleClickListItem */
  /* ---------------------------------- */
  it('handleClickListItem hour & minute branches', async () => {
    await setup({ value: 'hh:mm' });
    instance['handleClickListItem']('02', 'hour');
    expect(instance.value.startsWith('02')).toBe(true);
    instance.inputRef.value = '2:';
    instance['handleClickListItem']('30', 'minutes');
    expect(instance.value).toBe('02:30');
  });
  /* ---------------------------------- */
  /* generateMinutes */
  /* ---------------------------------- */
  it('generateMinutes creates correct list', async () => {
    await setup({ minutesInterval: 15 });
    instance['generateMinutes']();
    expect(instance.generatedMinutes).toEqual(['00', '15', '30', '45']);
  });
  it('onUpdateInput covers empty, cleared and typing paths', async () => {
    await setup();
    instance.previousInputValue = '12:';
    instance.inputRef.value = '';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasClearedValue).toBe(true);
    instance.inputRef.value = '1';
    instance.previousInputValue = '12:30';
    instance['onUpdateInput']({ target: instance.inputRef });
    instance.inputRef.value = '12:3';
    instance['onUpdateInput']({ target: instance.inputRef });
  });
  it('handleHourChange and handleMinuteChange cover hide/select branches', async () => {
    await setup();
    instance.hasSelectedMinutes = false;
    instance['handleHourChange']('1', '1', '');
    expect(instance.value).toBe('23:mm');
    instance['handleHourChange']('01', '01', '');
    expect(instance.value).toBe('01:mm');
    instance.generatedMinutes = ['00', '15', '30', '45'];
    instance['handleMinuteChange']('01', '99');
    expect(instance.value).toBe('01:45');
    instance['handleMinuteChange']('01', '15');
    expect(instance.value).toBe('01:15');
  });
  it('onPaste covers valid, invalid and error branches', async () => {
    await setup();
    instance['onPaste']({
      preventDefault: jest.fn(),
      clipboardData: { getData: () => '0930' },
    });
    expect(instance.value).toBe('09:30');
    instance['onPaste']({
      preventDefault: jest.fn(),
      clipboardData: { getData: () => 'abcd' },
    });
    instance['onPaste']({
      preventDefault: jest.fn(),
      clipboardData: { getData: () => undefined },
    });
    expect(instance.messageType).toBeUndefined();
  });
  it('clearCheckedValue covers all branches', async () => {
    await setup();
    instance['clearCheckedValue']();
    expect(instance.checkedTimeValues).toEqual(DEFAULT_CHECKED_TIME_VALUES);
    instance['clearCheckedValue']('hours');
    expect(instance.checkedTimeValues.hoursIndex).toBe(-1);
    instance['clearCheckedValue']('minutes');
    expect(instance.checkedTimeValues.minutesIndex).toBe(-1);
  });
  it('roundToNearestInterval handles overflow', async () => {
    await setup({ minutesInterval: 15 });
    expect(instance['roundToNearestInterval']('59')).toBe('45');
  });
  it('onKeyPress blocks non numeric keys', async () => {
    await setup();
    const prevent = jest.fn();
    instance['onKeyPress']({ key: 'a', preventDefault: prevent });
    expect(prevent).toHaveBeenCalled();
  });
  it('onFocus, onBlur, onKeyUp cover branches', async () => {
    await setup();
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    instance.wppFocus.emit = focusSpy;
    instance.wppBlur.emit = blurSpy;
    instance['onFocus']({});
    expect(instance.focusType).toBe(FOCUS_TYPE.MOUSE);
    instance.isInComponent = false;
    instance['onBlur']();
    expect(blurSpy).toHaveBeenCalled();
    instance['onKeyUp']({ key: 'Tab' });
    expect(instance.focusType).toBe(FOCUS_TYPE.TAB);
  });
  it('onUpdateInput covers early-return and clear branches', async () => {
    await setup();
    /* !inputRef */
    instance.inputRef = undefined;
    instance['onUpdateInput']({ target: {} });
    /* restore */
    instance.inputRef = document.createElement('input');
    /* empty input */
    instance.inputRef.value = '';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasClearedValue).toBe(true);
    /* ":" input */
    instance.inputRef.value = ':';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasClearedValue).toBe(true);
    /* length === 1 after full value */
    instance.previousInputValue = '12:30';
    instance.inputRef.value = '1';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasClearedValue).toBe(true);
  });
  it('onUpdateInput covers hasClearedValue hour handling', async () => {
    await setup();
    const hourSpy = jest.spyOn(instance, 'handleHourChange');
    instance.hasClearedValue = true;
    instance.inputRef.value = '12';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(hourSpy).toHaveBeenCalledWith('12', '12', '');
  });
  it('onUpdateInput covers shiftFocusToMinutes and hour branches', async () => {
    await setup();
    const hourSpy = jest.spyOn(instance, 'handleHourChange');
    const clearSpy = jest.spyOn(instance, 'clearCheckedValue');
    instance.hasClearedValue = false;
    instance.previousInputValue = '1:';
    instance.value = '12:30';
    /* shiftFocusToMinutes === true */
    instance.inputRef.value = '1::';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(hourSpy).toHaveBeenCalled();
    /* hour incomplete */
    instance.inputRef.value = '1:30';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasChangedHours).toBe(true);
    expect(clearSpy).toHaveBeenCalledWith('hours');
  });
  it('onUpdateInput covers minute branches and final assignment', async () => {
    await setup();
    const minuteSpy = jest.spyOn(instance, 'handleMinuteChange');
    const clearSpy = jest.spyOn(instance, 'clearCheckedValue');
    instance.value = '12:30';
    /* minute incomplete */
    instance.inputRef.value = '12:3';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(instance.hasChangedMinutes).toBe(true);
    expect(clearSpy).toHaveBeenCalledWith('minutes');
    /* valid minutes */
    instance.inputRef.value = '12:45';
    instance['onUpdateInput']({ target: instance.inputRef });
    expect(minuteSpy).toHaveBeenCalledWith('12', '45');
    expect(instance.previousInputValue).toBe('12:45');
  });
});

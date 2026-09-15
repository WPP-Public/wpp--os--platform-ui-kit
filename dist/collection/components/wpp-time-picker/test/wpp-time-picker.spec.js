jest.mock('../../../common/menuListConfig', () => ({
  menuListConfig: jest.fn(),
}));
// uniquePortalId is intentionally non-deterministic (crypto.randomUUID) in production so
// portaled popup ids never collide across instances/CL versions. Under test, replace it with
// a deterministic per-instance counter so popup-id/aria-controls stay stable across runs
// (matching the snapshots) while still being unique between instances.
jest.mock('../../../utils/utils', () => {
  let seq = 0;
  return {
    ...jest.requireActual('../../../utils/utils'),
    uniquePortalId: (prefix) => `${prefix}-${seq++}`,
  };
});
import { newSpecPage } from '@stencil/core/testing';
import { WppTimePicker } from '../wpp-time-picker';
import { menuListConfig } from '../../../common/menuListConfig';
import { PLACEHOLDER, DEFAULT_CHECKED_TIME_VALUES, HOURS } from '../config';
import { FOCUS_TYPE } from '../../../types/common';
import * as themeUtils from '../../../utils/subscribe-to-theme';
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
    instance.isDropdownOpen = true;
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
    expect(onHideSpy).toHaveBeenCalled();
    // Closing must not blur the field itself: that threw away the keyboard modality (so the
    // focus ring came back as the pointer border) and fired a spurious wppBlur/wppFocus pair at
    // consumers on every close. `onHidden` drops the pointer border instead.
    expect(blurSpy).not.toHaveBeenCalled();
  });
  it('keeps the field focused when the pointer lands on the dropdown chrome rather than an option', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    page.root?.shadowRoot?.querySelectorAll('.section wpp-list-item').forEach(i => i.classList.add('wpp-list-item'));
    const section = page.root?.shadowRoot?.querySelector('.hours.section');
    const option = page.root?.shadowRoot?.querySelector('#hour-05');
    // The scroll container itself is the scrollbar / padding gutter. Letting focus move there
    // blurs the input with a null relatedTarget, which read as "focus left" and closed the
    // dropdown mid scroll-drag.
    const onChrome = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    section.dispatchEvent(onChrome);
    expect(onChrome.defaultPrevented).toBe(true);
    // Options are excluded: a click still hands them focus so the roving highlight follows.
    const onOption = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    option.dispatchEvent(onOption);
    expect(onOption.defaultPrevented).toBe(false);
  });
  it('hands focus back to the input when the closing dropdown would take it along', async () => {
    await setup();
    const focusSpy = jest.fn();
    // `onHide` blurs the input as it closes - the restore has to land after that, which is why
    // it runs in `onHidden` rather than `onHide`.
    instance.inputRef = { focus: focusSpy, blur: jest.fn(), value: '09:30' };
    instance.portalRef = document.createElement('div');
    const option = document.createElement('div');
    instance.portalRef.appendChild(option);
    let capturedConfig;
    menuListConfig.mockImplementation(cfg => {
      capturedConfig = cfg;
      return { hide: jest.fn(), state: {} };
    });
    instance['createTippyInstance']();
    const original = Object.getOwnPropertyDescriptor(document, 'activeElement');
    const stubActiveElement = (el) => Object.defineProperty(document, 'activeElement', { configurable: true, get: () => el });
    // Focus sitting inside the popup: it is about to be unmounted, so hand focus back.
    stubActiveElement(option);
    capturedConfig.onHide({});
    capturedConfig.onHidden();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    // Closing *because* focus left the component: the new target is already outside the popup,
    // so the picker must not drag focus back.
    stubActiveElement(document.body);
    capturedConfig.onHide({});
    capturedConfig.onHidden();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    if (original) {
      Object.defineProperty(document, 'activeElement', original);
    }
    else {
      delete document.activeElement;
    }
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
    instance.isDropdownOpen = true;
    instance['handleClickCrossIcon']({ stopPropagation: jest.fn() });
    expect(instance.value).toBe(PLACEHOLDER);
    instance.tippyInstance.state.isShown = false;
    instance.isDropdownOpen = false;
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
  it('re-engages an idle field on the first keypress so the hidden caret comes back', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="01:15"></wpp-time-picker>`,
    });
    const tpInstance = page.rootInstance;
    const anchorClasses = () => (page.root?.shadowRoot?.querySelector('#anchor')?.getAttribute('class') ?? '').split(' ');
    // Idle is where the field lands after a time is picked with the pointer. The caret is hidden
    // in that state, so a key arriving there has to bring the field - and the caret - back.
    tpInstance.focusType = FOCUS_TYPE.NONE;
    await page.waitForChanges();
    expect(anchorClasses()).toContain('idle');
    page.root?.shadowRoot
      ?.querySelector('input')
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: '0', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(anchorClasses()).toContain('focus');
    expect(anchorClasses()).not.toContain('idle');
  });
  it('only shows the anchor tab-focus ring while the input itself holds keyboard focus', async () => {
    await setup();
    // Tab into the field: input focused + TAB focus type => ring shown.
    instance['onFocus']({});
    instance['onKeyUp']({ key: 'Tab' });
    expect(instance.isInputFocused).toBe(true);
    expect(instance['getAnchorCssClasses']()['tab-focus']).toBe(true);
    // Focus leaves the input (dropdown item or clear icon) => ring dropped.
    instance['onBlur']();
    expect(instance.isInputFocused).toBe(false);
    expect(instance['getAnchorCssClasses']()['tab-focus']).toBeFalsy();
  });
  it('opens the dropdown when the input receives focus', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    instance['onFocus']({});
    // Keyboard users reach the field by tabbing to it, so focus — not just a mouse click —
    // has to open the dropdown.
    expect(instance.tippyInstance.show).toHaveBeenCalled();
  });
  it('does not open the dropdown on focus when disabled', async () => {
    await setup({ disabled: true });
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    instance['onFocus']({});
    expect(instance.tippyInstance.show).not.toHaveBeenCalled();
  });
  it('toggles the dropdown with Enter', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    instance['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
    expect(instance.tippyInstance.show).toHaveBeenCalled();
    instance.tippyInstance.state.isShown = true;
    instance.isDropdownOpen = true;
    instance['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
    expect(instance.tippyInstance.hide).toHaveBeenCalled();
  });
  it('toggles the dropdown with Space', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    const openEvent = { key: ' ', preventDefault: jest.fn() };
    instance['onKeyDown'](openEvent);
    expect(instance.tippyInstance.show).toHaveBeenCalled();
    // Space would otherwise scroll the page; the field only accepts digits and ':' so there is
    // no character to type either way.
    expect(openEvent.preventDefault).toHaveBeenCalled();
    instance.isDropdownOpen = true;
    instance['onKeyDown']({ key: ' ', preventDefault: jest.fn() });
    expect(instance.tippyInstance.hide).toHaveBeenCalled();
  });
  it('closes on Escape from the input while the dropdown is open', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.inputRef = { focus: jest.fn() };
    // `state.isShown` stays false for a popup that is up - it only flips once the show
    // transition finishes - so guarding Escape on it made this path unreachable.
    instance.isDropdownOpen = true;
    instance['onKeyDown']({ key: 'Escape', preventDefault: jest.fn() });
    expect(instance.tippyInstance.hide).toHaveBeenCalled();
    expect(instance.inputRef.focus).toHaveBeenCalled();
  });
  it('clears the active state and restores the placeholder when focus leaves the component', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    instance['onFocus']({});
    instance['onKeyUp']({ key: 'Tab' });
    expect(instance.value).toBe(PLACEHOLDER);
    // Focus moves on to a different time picker.
    instance['onBlur']({ relatedTarget: document.createElement('wpp-time-picker') });
    // The field used to stay lit up — active icon and "--:--" still showing — because blur
    // never ran its reset once the component had been focused.
    expect(instance.value).toBe('');
    expect(instance.focusType).toBe(FOCUS_TYPE.NONE);
    expect(instance.isInComponent).toBe(false);
    expect(instance['getAnchorCssClasses']().focus).toBe(false);
    expect(instance['getAnchorCssClasses']()['tab-focus']).toBeFalsy();
  });
  it('stays active while focus moves into the portaled dropdown', async () => {
    await setup();
    instance.tippyInstance = { state: { isShown: true }, show: jest.fn(), hide: jest.fn(), props: {} };
    instance.isDropdownOpen = true;
    instance['onFocus']({});
    const listItem = document.createElement('div');
    instance.portalRef.appendChild(listItem);
    instance['onBlur']({ relatedTarget: listItem });
    // Picking an hour moves focus out of the input but not out of the component.
    expect(instance.isInComponent).toBe(true);
    expect(instance.value).toBe(PLACEHOLDER);
    expect(instance.tippyInstance.hide).not.toHaveBeenCalled();
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
        components: [WppTimePicker],
        html: `<wpp-time-picker></wpp-time-picker>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppTimePicker],
        html: `<wpp-time-picker></wpp-time-picker>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
describe('wpp-time-picker accessibility', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLInputElement.prototype, 'setSelectionRange', {
      value: jest.fn(),
      configurable: true,
    });
  });
  it('renders the input as a labelled editable combobox controlling a non-modal dialog', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const anchor = page.root?.shadowRoot?.querySelector('#anchor');
    const popup = page.root?.shadowRoot?.querySelector('.wpp-time-picker-portal');
    expect(input?.getAttribute('role')).toBe('combobox');
    expect(input?.getAttribute('aria-haspopup')).toBe('dialog');
    expect(input?.getAttribute('aria-expanded')).toBe('false');
    // Required attribute of role="combobox"; references the (portaled) popup by id.
    expect(input?.getAttribute('aria-controls')).toBe(popup?.id);
    expect(input?.getAttribute('aria-label')).toBe('Choose time');
    expect(input?.getAttribute('autocomplete')).toBe('off');
    expect(anchor?.hasAttribute('role')).toBe(false);
    expect(popup?.getAttribute('role')).toBe('dialog');
    expect(popup?.getAttribute('aria-modal')).toBe('false');
    expect(popup?.getAttribute('aria-label')).toBe('Choose time');
  });
  it('uses the visible label text for the input accessible name', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    page.root.labelConfig = { text: 'Start time' };
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('input')?.getAttribute('aria-label')).toBe('Start time');
  });
  it('uses developer-overridden accessible labels from locales', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    page.root.locales = {
      timePickerLabel: 'Choose appointment time',
      hoursLabel: 'Appointment hours',
      minutesLabel: 'Appointment minutes',
      eraseTimeLabel: 'Clear appointment time',
    };
    await page.waitForChanges();
    const shadowRoot = page.root?.shadowRoot;
    expect(shadowRoot?.querySelector('input')?.getAttribute('aria-label')).toBe('Choose appointment time');
    expect(shadowRoot?.querySelector('.wpp-time-picker-portal')?.getAttribute('aria-label')).toBe('Choose appointment time');
    expect(shadowRoot?.querySelector('.hours')?.getAttribute('aria-label')).toBe('Appointment hours');
    expect(shadowRoot?.querySelector('.minutes')?.getAttribute('aria-label')).toBe('Appointment minutes');
    expect(shadowRoot?.querySelector('.cross-icon')?.getAttribute('aria-label')).toBe('Clear appointment time');
  });
  it('associates the rendered label with the input it labels', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker name="start"></wpp-time-picker>`,
    });
    page.root.labelConfig = { text: 'Start time' };
    await page.waitForChanges();
    const input = page.root?.shadowRoot?.querySelector('input');
    const label = page.root?.shadowRoot?.querySelector('wpp-label');
    // The label used to point `for` at `name`, which the input's id never matched, leaving the
    // label associated with nothing (axe: "Form label must be associated with a content").
    expect(input?.id).toBeTruthy();
    expect(label?.getAttribute('htmlFor')).toBe(input?.id);
    // `name` belongs on the control itself, not standing in for its id.
    expect(input?.getAttribute('name')).toBe('start');
  });
  it('uses unique input ids for each time-picker instance', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<div><wpp-time-picker></wpp-time-picker><wpp-time-picker></wpp-time-picker></div>`,
    });
    const inputIds = Array.from(page.body.querySelectorAll('wpp-time-picker')).map(timePicker => timePicker.shadowRoot?.querySelector('input')?.id);
    // Several pickers on one page must not all claim the same id.
    expect(inputIds[0]).toBeTruthy();
    expect(inputIds[0]).not.toBe(inputIds[1]);
  });
  it('uses unique popup ids for each time-picker instance', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<div><wpp-time-picker></wpp-time-picker><wpp-time-picker></wpp-time-picker></div>`,
    });
    const timePickers = Array.from(page.body.querySelectorAll('wpp-time-picker'));
    const popupIds = timePickers.map(timePicker => timePicker.shadowRoot?.querySelector('.wpp-time-picker-portal')?.id);
    const controlledIds = timePickers.map(timePicker => timePicker.shadowRoot?.querySelector('input')?.getAttribute('aria-controls'));
    // Unique per instance so the portaled (light-DOM) popups never collide (duplicate-id),
    // and each input's aria-controls points at its own popup.
    expect(popupIds[0]).toBeTruthy();
    expect(popupIds[1]).toBeTruthy();
    expect(popupIds[0]).not.toBe(popupIds[1]);
    expect(controlledIds).toEqual(popupIds);
  });
  it('renders labelled listboxes with option selection and roving tab stops', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    const timeoutSpy = runTimeoutsSync();
    const tippyConfig = menuListConfig.mock.calls[menuListConfig.mock.calls.length - 1][0];
    tippyConfig.onShow({ popper: document.createElement('div') });
    await page.waitForChanges();
    const shadowRoot = page.root?.shadowRoot;
    const hoursListbox = shadowRoot?.querySelector('.hours');
    const minutesListbox = shadowRoot?.querySelector('.minutes');
    const hourOptions = Array.from(hoursListbox?.querySelectorAll('wpp-list-item') || []);
    const minuteOptions = Array.from(minutesListbox?.querySelectorAll('wpp-list-item') || []);
    expect(hoursListbox?.getAttribute('role')).toBe('listbox');
    expect(hoursListbox?.getAttribute('aria-label')).toBe('Hours');
    expect(minutesListbox?.getAttribute('role')).toBe('listbox');
    expect(minutesListbox?.getAttribute('aria-label')).toBe('Minutes');
    expect([...hourOptions, ...minuteOptions].every(option => option.getAttribute('role') === 'option')).toBe(true);
    expect([...hourOptions, ...minuteOptions].every(option => option.hasAttribute('aria-selected'))).toBe(true);
    expect(shadowRoot?.querySelector('#hour-10')?.getAttribute('aria-selected')).toBe('true');
    expect(shadowRoot?.querySelector('#minutes-30')?.getAttribute('aria-selected')).toBe('true');
    expect(hourOptions.filter(option => option.getAttribute('tabindex') === '0')).toHaveLength(1);
    expect(minuteOptions.filter(option => option.getAttribute('tabindex') === '0')).toHaveLength(1);
    timeoutSpy.mockRestore();
  });
  it('reflects popup lifecycle state through aria-expanded', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    const tippyConfig = menuListConfig.mock.calls[menuListConfig.mock.calls.length - 1][0];
    tippyConfig.onShow({ popper: document.createElement('div') });
    await page.waitForChanges();
    expect(input?.getAttribute('aria-expanded')).toBe('true');
    tippyConfig.onHidden();
    await page.waitForChanges();
    expect(input?.getAttribute('aria-expanded')).toBe('false');
  });
  const renderCrossIcon = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    const instance = page.rootInstance;
    Object.assign(instance, props);
    await page.waitForChanges();
    const crossIcon = page.root?.shadowRoot?.querySelector('.cross-icon');
    return { page, instance, crossIcon };
  };
  it('exposes the clear control as an accessible button', async () => {
    const { crossIcon } = await renderCrossIcon();
    expect(crossIcon).not.toBeNull();
    expect(crossIcon?.getAttribute('role')).toBe('button');
    expect(crossIcon?.getAttribute('aria-label')).toBe('Erase time');
    expect(crossIcon?.getAttribute('tabindex')).toBe('0');
    expect(crossIcon?.getAttribute('aria-disabled')).toBe('false');
  });
  it('marks the clear control as disabled and removes it from the tab order when disabled', async () => {
    const { crossIcon } = await renderCrossIcon({ disabled: true });
    expect(crossIcon?.getAttribute('aria-disabled')).toBe('true');
    expect(crossIcon?.getAttribute('tabindex')).toBe('-1');
  });
  it('clears the value when the clear control is activated by keyboard', async () => {
    const { page, instance, crossIcon } = await renderCrossIcon();
    instance.inputRef = document.createElement('input');
    instance.tippyInstance = { state: { isShown: false }, hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    const clearSpy = jest.fn();
    page.root?.addEventListener('wppClear', clearSpy);
    crossIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await page.waitForChanges();
    expect(instance.value).toBe('');
    expect(clearSpy).toHaveBeenCalled();
  });
  it('does not clear the value on keyboard activation when disabled', async () => {
    const { page, instance, crossIcon } = await renderCrossIcon({ disabled: true });
    instance.inputRef = document.createElement('input');
    instance.tippyInstance = { state: { isShown: false }, hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    const clearSpy = jest.fn();
    page.root?.addEventListener('wppClear', clearSpy);
    crossIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await page.waitForChanges();
    expect(instance.value).toBe('10:30');
    expect(clearSpy).not.toHaveBeenCalled();
  });
  it('ignores non-activation keys on the clear control', async () => {
    const { page, instance, crossIcon } = await renderCrossIcon();
    instance.inputRef = document.createElement('input');
    instance.tippyInstance = { state: { isShown: false }, hide: jest.fn(), props: {} };
    instance.isDropdownOpen = false;
    const clearSpy = jest.fn();
    page.root?.addEventListener('wppClear', clearSpy);
    crossIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    await page.waitForChanges();
    expect(instance.value).toBe('10:30');
    expect(clearSpy).not.toHaveBeenCalled();
  });
  it('closes the dropdown and returns focus to input on Escape', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    const inputFocusSpy = jest.fn();
    instance.inputRef = { focus: inputFocusSpy };
    instance.tippyInstance = { state: { isShown: true }, hide: hideSpy };
    instance.isDropdownOpen = true;
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(hideSpy).toHaveBeenCalled();
    expect(inputFocusSpy).toHaveBeenCalled();
  });
  it('does not intercept Tab from the input', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    instance.tippyInstance = { state: { isShown: true }, hide: hideSpy };
    instance.isDropdownOpen = true;
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(hideSpy).not.toHaveBeenCalled();
  });
  it('does not close the dropdown on Escape when already closed', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    instance.tippyInstance = { state: { isShown: false }, hide: hideSpy };
    instance.isDropdownOpen = false;
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(hideSpy).not.toHaveBeenCalled();
  });
  // The time picker renders <wpp-list-item> elements without registering the
  // WppListItem component (it hangs newSpecPage via rAF/observers). The keyboard
  // helpers locate items via the `wpp-list-item` class that the real component
  // adds on its host, so tag the rendered placeholders with it here.
  const tagListItems = (page) => {
    page.root?.shadowRoot
      ?.querySelectorAll('.section wpp-list-item')
      .forEach(item => item.classList.add('wpp-list-item'));
  };
  // Runs setTimeout callbacks synchronously so the focus that the component
  // schedules can be asserted without fake timers (which deadlock newSpecPage).
  const runTimeoutsSync = () => jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
    cb();
    return 0;
  });
  it('does not throw when the tippy state object is unavailable', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="10:30"></wpp-time-picker>`,
    });
    tagListItems(page);
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    instance.tippyInstance = { state: undefined, show: jest.fn(), hide: jest.fn() };
    const input = page.root?.shadowRoot?.querySelector('input');
    const crossIcon = page.root?.shadowRoot?.querySelector('.cross-icon');
    const hourItem = page.root?.shadowRoot?.querySelector('#hour-09');
    expect(() => input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))).not.toThrow();
    expect(() => input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))).not.toThrow();
    expect(() => crossIcon?.dispatchEvent(new MouseEvent('click', { bubbles: true }))).not.toThrow();
    expect(() => hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))).not.toThrow();
    timeoutSpy.mockRestore();
  });
  it('opens the dropdown and moves focus into the hours column on ArrowDown from the input', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    const showSpy = jest.fn();
    const focusSpy = jest.spyOn(instance, 'focusColumnItem').mockImplementation(() => { });
    instance.tippyInstance = { state: { isShown: false }, show: showSpy, hide: jest.fn() };
    instance.isDropdownOpen = false;
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    expect(showSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalledWith('hours', 0);
    timeoutSpy.mockRestore();
  });
  it('does not throw when a scheduled focus timer fires after the component is torn down', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="09:30"></wpp-time-picker>`,
    });
    tagListItems(page);
    const instance = page.rootInstance;
    instance.tippyInstance = { state: { isShown: false }, show: jest.fn(), hide: jest.fn() };
    instance.isDropdownOpen = false;
    // Capture (rather than run) the timer the open path schedules.
    let scheduled;
    const timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      scheduled = cb;
      return 0;
    });
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    timeoutSpy.mockRestore();
    expect(typeof scheduled).toBe('function');
    // Tear the component down, then fire the captured callback: the isDestroyed guard must
    // make it a no-op instead of touching a torn-down instance.
    page.root?.remove();
    await page.waitForChanges();
    expect(() => scheduled?.()).not.toThrow();
  });
  it('takes the value from the chosen option for a non-default minutesInterval', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker minutes-interval="15" value="09:mm"></wpp-time-picker>`,
    });
    tagListItems(page);
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    instance.inputRef = { focus: jest.fn(), value: '09:mm' };
    instance.tippyInstance = { state: { isShown: true }, show: jest.fn(), hide: jest.fn() };
    instance.isDropdownOpen = true;
    // With minutesInterval=15 the options are ['00','15','30','45']. Selection is driven by the
    // list item's own `wppChangeListItem`, so the value travels with the option that emitted it.
    const minuteItem = page.root?.shadowRoot?.querySelector('#minutes-30');
    minuteItem?.dispatchEvent(new CustomEvent('wppChangeListItem', { bubbles: true }));
    await page.waitForChanges();
    expect(page.root?.value).toBe('09:30');
    timeoutSpy.mockRestore();
  });
  it('moves focus into the previously selected hour on ArrowUp', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="03:15"></wpp-time-picker>`,
    });
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    const focusSpy = jest.spyOn(instance, 'focusColumnItem').mockImplementation(() => { });
    instance.checkedTimeValues = { hoursIndex: 3, minutesIndex: 1 };
    instance.tippyInstance = { state: { isShown: true }, show: jest.fn(), hide: jest.fn() };
    instance.isDropdownOpen = true;
    const input = page.root?.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenCalledWith('hours', 3);
    timeoutSpy.mockRestore();
  });
  it('navigates within and across the hour/minute columns with the arrow keys', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    tagListItems(page);
    const instance = page.rootInstance;
    const focusSpy = jest.spyOn(instance, 'focusColumnItem').mockImplementation(() => { });
    const hourItem = page.root?.shadowRoot?.querySelector('#hour-05');
    const minuteItem = page.root?.shadowRoot?.querySelector('#minutes-30');
    hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenLastCalledWith('hours', 6);
    hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenLastCalledWith('hours', 4);
    // Crossing columns lands on the target column's own selected item. It used to carry the
    // source column's index over, so ArrowRight from hour 05 landed on the 6th minute.
    instance.checkedTimeValues = { hoursIndex: 7, minutesIndex: 2 };
    hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenLastCalledWith('minutes', 2);
    minuteItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenLastCalledWith('hours', 7);
    // With nothing selected yet it falls back to the roving index rather than the other column's.
    instance.checkedTimeValues = { hoursIndex: -1, minutesIndex: -1 };
    instance.rovingTimeValues = { hoursIndex: 0, minutesIndex: 0 };
    hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    expect(focusSpy).toHaveBeenLastCalledWith('minutes', 0);
  });
  it('keeps the dropdown open and hands the highlight to the minutes column when an hour is chosen by keyboard', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      // minutesInterval=15 gives ['00','15','30','45'], so the selected '30' is index 2.
      html: `<wpp-time-picker value="07:30" minutes-interval="15"></wpp-time-picker>`,
    });
    tagListItems(page);
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    instance.inputRef = { focus: jest.fn(), value: '07:30' };
    instance.tippyInstance = { state: { isShown: true }, show: jest.fn(), hide: hideSpy };
    instance.isDropdownOpen = true;
    // A previous minute pick is what used to make the *next* hour pick close the dropdown.
    instance.hasSelectedMinutes = true;
    const focusSpy = jest.spyOn(instance, 'focusColumnItem').mockImplementation(() => { });
    // Arrowing marks the keyboard as owning the highlight, which is what tells the picker to
    // advance rather than take the pointer path.
    const hourItem = page.root?.shadowRoot?.querySelector('#hour-09');
    instance.selectionFromKeyboard = true;
    hourItem?.dispatchEvent(new CustomEvent('wppChangeListItem', { bubbles: true }));
    await page.waitForChanges();
    expect(page.root?.value).toBe('09:30');
    expect(hideSpy).not.toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalledWith('minutes', 2);
    timeoutSpy.mockRestore();
  });
  it('closes and returns focus to the input when a minute is chosen by keyboard', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker value="09:15"></wpp-time-picker>`,
    });
    tagListItems(page);
    const timeoutSpy = runTimeoutsSync();
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    const inputFocusSpy = jest.fn();
    instance.inputRef = { focus: inputFocusSpy, value: '09:15' };
    instance.tippyInstance = { state: { isShown: true }, show: jest.fn(), hide: hideSpy };
    instance.isDropdownOpen = true;
    instance.selectionFromKeyboard = true;
    const minuteItem = page.root?.shadowRoot?.querySelector('#minutes-30');
    minuteItem?.dispatchEvent(new CustomEvent('wppChangeListItem', { bubbles: true }));
    await page.waitForChanges();
    expect(page.root?.value).toBe('09:30');
    expect(hideSpy).toHaveBeenCalled();
    expect(inputFocusSpy).toHaveBeenCalled();
    timeoutSpy.mockRestore();
  });
  it('closes the dropdown and refocuses the input on Escape from a dropdown item', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    tagListItems(page);
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    const inputFocusSpy = jest.fn();
    instance.inputRef = { focus: inputFocusSpy };
    instance.tippyInstance = { state: { isShown: true }, hide: hideSpy, show: jest.fn() };
    instance.isDropdownOpen = true;
    const hourItem = page.root?.shadowRoot?.querySelector('#hour-00');
    hourItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    expect(hideSpy).toHaveBeenCalled();
    expect(inputFocusSpy).toHaveBeenCalled();
  });
  it('closes the dropdown and refocuses the input on Tab from a dropdown item', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    tagListItems(page);
    const instance = page.rootInstance;
    const hideSpy = jest.fn();
    const inputFocusSpy = jest.fn();
    instance.inputRef = { focus: inputFocusSpy };
    instance.tippyInstance = { state: { isShown: true }, hide: hideSpy, show: jest.fn() };
    instance.isDropdownOpen = true;
    const minuteItem = page.root?.shadowRoot?.querySelector('#minutes-00');
    minuteItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(hideSpy).toHaveBeenCalled();
    expect(inputFocusSpy).toHaveBeenCalled();
  });
  it('applies the tab-focus ring class to the focused item and clears it from siblings', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    });
    tagListItems(page);
    const instance = page.rootInstance;
    const firstHour = page.root?.shadowRoot?.querySelector('#hour-00');
    const secondHour = page.root?.shadowRoot?.querySelector('#hour-01');
    instance.focusColumnItem('hours', 0);
    await page.waitForChanges();
    expect(firstHour.classList.contains('tab-focus')).toBe(true);
    instance.focusColumnItem('hours', 1);
    await page.waitForChanges();
    expect(firstHour.classList.contains('tab-focus')).toBe(false);
    expect(secondHour.classList.contains('tab-focus')).toBe(true);
    // Closing the dropdown clears the highlight (declarative: focusedColumn -> null).
    instance.focusedColumn = null;
    await page.waitForChanges();
    expect(secondHour.classList.contains('tab-focus')).toBe(false);
  });
});

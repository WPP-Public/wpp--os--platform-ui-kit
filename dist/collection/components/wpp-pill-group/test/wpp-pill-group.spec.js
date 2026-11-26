import { newSpecPage } from '@stencil/core/testing';
import { WppPillGroup } from '../wpp-pill-group';
import { WppPill } from '../../wpp-pill/wpp-pill';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { h } from '@stencil/core';
import * as utils from '../../../utils/utils';
const PILL_GROUP_TYPES = [
  { type: 'single' },
  { type: 'multiple' },
  { type: 'display' },
  { type: 'draggable' },
];
const DISPLAY_DRAGGABLE_TYPES = [{ type: 'display' }, { type: 'draggable' }];
const buildPageBasedOnType = (type, value, isDisabled, ariaProps, labelConfig) => newSpecPage({
  components: [WppPillGroup, WppPill],
  template: () => (h("wpp-pill-group-v4-7-0", { type: type, value: value, ariaProps: ariaProps, labelConfig: labelConfig }, h("wpp-pill-v4-7-0", { name: "contact", disabled: isDisabled, value: "email", label: "Email" }), h("wpp-pill-v4-7-0", { name: "contact", value: "mail", label: "Mail" }), h("wpp-pill-v4-7-0", { name: "contact", value: "phone", label: "Phone" }))),
});
// Removable pills; `disabledValues` lists the pills that are disabled.
const buildRemovablePillsPage = (type = 'display', disabledValues = []) => newSpecPage({
  components: [WppPillGroup, WppPill],
  template: () => (h("wpp-pill-group-v4-7-0", { type: type }, ['email', 'mail', 'phone', 'fax'].map(value => (h("wpp-pill-v4-7-0", { value: value, label: value, removable: true, disabled: disabledValues.includes(value) }))))),
});
const getCloseEvent = (pill, detail) => {
  const event = new CustomEvent('wppClose', { detail });
  Object.defineProperty(event, 'target', { value: pill });
  return event;
};
describe('wpp-pill-group', () => {
  let transformToVersionedTagSpy;
  beforeEach(() => {
    transformToVersionedTagSpy = jest.spyOn(utils, 'transformToVersionedTag').mockImplementation((tag) => tag);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testing default values of the component', async () => {
    const pillGroup = new WppPillGroup();
    expect(pillGroup.name).toBeUndefined();
    expect(pillGroup.size).toBe('m');
    expect(pillGroup.value).toBeUndefined();
    expect(pillGroup.type).toBe('single');
    expect(pillGroup.required).toBe(false);
    expect(pillGroup.labelConfig).toBeUndefined();
    expect(JSON.stringify(pillGroup.labelTooltipConfig)).toBe(JSON.stringify({
      popperOptions: { strategy: 'fixed' },
    }));
    expect(pillGroup.ariaProps).toEqual({});
  });
  describe('Testing lifecycle methods', () => {
    describe('Testing componentWillLoad', () => {
      it('Testing that elements are queried correctly', async () => {
        const page = await buildPageBasedOnType('single');
        expect(transformToVersionedTagSpy).toHaveBeenCalledTimes(1);
        expect(transformToVersionedTagSpy).toHaveBeenCalledWith('wpp-pill');
        expect(page.rootInstance.pillItems).toHaveLength(3);
      });
    });
    describe('Testing componentDidLoad', () => {
      it.each(PILL_GROUP_TYPES)('`$type` - check that `setActivePill` is called and that listener is created only for `draggable` type', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const setActivePillSpy = jest.spyOn(page.rootInstance, 'setActivePill');
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        // We need to call this function again the `setActivePillSpy` spy above is created after `componentDidLoad` ran initially.
        page.rootInstance.componentDidLoad();
        expect(setActivePillSpy).toHaveBeenCalledTimes(1);
        if (type === 'draggable') {
          expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', page.rootInstance.handleMouseDown);
        }
        else {
          expect(addEventListenerSpy).toHaveBeenCalledTimes(0);
        }
      });
    });
    describe('Testing disconnectedCallback', () => {
      it.each(PILL_GROUP_TYPES)('`$type` - check that the event listener is removed only for `draggable` type', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
        page.rootInstance.disconnectedCallback();
        if (type === 'draggable') {
          expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', page.rootInstance.handleMouseDown);
        }
        else {
          expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);
        }
      });
    });
  });
  describe('Testing watchers', () => {
    describe('Testing `onValueChange`', () => {
      it('`setActivePill` is called when value changes', async () => {
        const page = await buildPageBasedOnType('single', 'phone');
        const setActivePillSpy = jest.spyOn(page.rootInstance, 'setActivePill');
        page.rootInstance.value = 'mail';
        expect(setActivePillSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Testing listeners', () => {
    const getMockEvent = ({ checked, value }) => ({
      detail: { value: value ?? 'email', checked },
    });
    describe('Testing `handleClick`', () => {
      it.each(DISPLAY_DRAGGABLE_TYPES)('`$type` type, the function returns', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        page.rootInstance.handleClick(getMockEvent({ checked: true }));
        expect(wppChangeSpy).toHaveBeenCalledTimes(0);
      });
      it('`single` type, the function sets the value and emits the event correctly', async () => {
        const page = await buildPageBasedOnType('single', 'phone');
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        expect(page.rootInstance.value).toEqual('phone');
        page.rootInstance.handleClick(getMockEvent({ checked: true }));
        expect(page.rootInstance.value).toEqual('email');
        expect(wppChangeSpy).toHaveBeenCalledTimes(1);
        expect(wppChangeSpy).toHaveBeenCalledWith({ value: 'email', name: undefined });
      });
      it('`multiple` type, the function adds the value correctly', async () => {
        const page = await buildPageBasedOnType('multiple', ['phone']);
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        expect(page.rootInstance.value).toEqual(['phone']);
        page.rootInstance.handleClick(getMockEvent({ checked: true }));
        expect(wppChangeSpy).toHaveBeenCalledWith({ value: ['phone', 'email'], name: undefined });
        expect(wppChangeSpy).toHaveBeenCalledTimes(1);
      });
      it('`multiple` type, the function removes the value correctly', async () => {
        const page = await buildPageBasedOnType('multiple', ['phone']);
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        expect(page.rootInstance.value).toEqual(['phone']);
        page.rootInstance.handleClick(getMockEvent({ checked: false, value: 'phone' }));
        expect(wppChangeSpy).toHaveBeenCalledWith({ value: [], name: undefined });
        expect(wppChangeSpy).toHaveBeenCalledTimes(1);
      });
      it('`multiple` type with undefined initial value, the function adds the value correctly', async () => {
        const page = await buildPageBasedOnType('multiple', undefined);
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        expect(page.rootInstance.value).toEqual(undefined);
        page.rootInstance.handleClick(getMockEvent({ checked: true }));
        expect(wppChangeSpy).toHaveBeenCalledWith({ value: ['email'], name: undefined });
        expect(wppChangeSpy).toHaveBeenCalledTimes(1);
      });
    });
    describe('Testing `handleClose`', () => {
      it('remembers the pill and its index when it is removed through the keyboard', async () => {
        const page = await buildRemovablePillsPage();
        const pill = page.root.querySelectorAll('wpp-pill')[1];
        page.rootInstance.handleClose(getCloseEvent(pill, new KeyboardEvent('keydown', { key: 'Enter' })));
        expect(page.rootInstance.pillToFocusAfterRemoval).toEqual({ pill, index: 1 });
      });
      it('ignores a removal with the mouse', async () => {
        const page = await buildRemovablePillsPage();
        const pill = page.root.querySelectorAll('wpp-pill')[1];
        page.rootInstance.handleClose(getCloseEvent(pill, new MouseEvent('click')));
        expect(page.rootInstance.pillToFocusAfterRemoval).toBeUndefined();
      });
    });
  });
  describe('Testing functionality', () => {
    describe('Testing `setActivePill`', () => {
      it.each(DISPLAY_DRAGGABLE_TYPES)('$type, the function returns and `updatePill` is not called', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        page.rootInstance.setActivePill();
        expect(updatePillSpy).toHaveBeenCalledTimes(0);
        expect(page.rootInstance.value).toBe(undefined);
      });
      it('`single` type, the function calls `updatePill` for each element and `getNextIndex` is called (no disabled items)', async () => {
        const page = await buildPageBasedOnType('single');
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        const getNextIndexSpy = jest.spyOn(page.rootInstance, 'getNextIndex');
        const pillElements = page.root?.querySelectorAll('wpp-pill') || [];
        page.rootInstance.setActivePill();
        expect(pillElements?.length).toBe(3);
        expect(getNextIndexSpy).toHaveBeenCalledWith(0, 1);
        expect(updatePillSpy).toHaveBeenNthCalledWith(1, pillElements[0], 0, 0);
        expect(updatePillSpy).toHaveBeenNthCalledWith(2, pillElements[1], 1, 0);
        expect(updatePillSpy).toHaveBeenNthCalledWith(3, pillElements[2], 2, 0);
      });
      it('`single` type and first element disabled, the function calls `updatePill` with the index of the checked pill', async () => {
        const page = await buildPageBasedOnType('single', 'phone', true);
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        const getNextIndexSpy = jest.spyOn(page.rootInstance, 'getNextIndex');
        const pillElements = page.root?.querySelectorAll('wpp-pill') || [];
        page.rootInstance.setActivePill();
        expect(pillElements?.length).toBe(3);
        expect(getNextIndexSpy).not.toHaveBeenCalled();
        expect(updatePillSpy).toHaveBeenNthCalledWith(1, pillElements[0], 0, 2);
      });
      it.each([
        { scenario: 'is `null`', value: null, isDisabled: false, expected: ['0', '-1', '-1'] },
        { scenario: 'matches no pill', value: 'fax', isDisabled: false, expected: ['0', '-1', '-1'] },
        { scenario: 'matches a disabled pill', value: 'email', isDisabled: true, expected: ['-1', '0', '-1'] },
      ])('`single` type - the first non-disabled pill is the tab stop when `value` $scenario', async ({ value, isDisabled, expected }) => {
        const page = await buildPageBasedOnType('single', value, isDisabled);
        const pillElements = Array.from(page.root?.querySelectorAll('wpp-pill') || []);
        expect(pillElements.map(pill => pill.getAttribute('tabindex'))).toEqual(expected);
      });
      it('`multiple` type, `updatePill` is called correctly for all elements', async () => {
        const page = await buildPageBasedOnType('multiple');
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        const getNextIndexSpy = jest.spyOn(page.rootInstance, 'getNextIndex');
        const pillElements = page.root?.querySelectorAll('wpp-pill') || [];
        page.rootInstance.setActivePill();
        expect(pillElements?.length).toBe(3);
        expect(getNextIndexSpy).toHaveBeenCalledTimes(0);
        expect(updatePillSpy).toHaveBeenNthCalledWith(1, pillElements[0], 0, undefined);
        expect(updatePillSpy).toHaveBeenNthCalledWith(2, pillElements[1], 1, undefined);
        expect(updatePillSpy).toHaveBeenNthCalledWith(3, pillElements[2], 2, undefined);
      });
    });
    describe('Testing `updatePill`', () => {
      const mockPill = { value: 'mail', checked: false, disabled: false };
      it('`single` type, when value is falsey', async () => {
        const page = await buildPageBasedOnType('single');
        const updateAriaPropsOfPillSpy = jest.spyOn(page.rootInstance, 'updateAriaPropsOfPill');
        page.rootInstance.updatePill(mockPill, 1, 0);
        expect(mockPill.checked).toBe(false);
        expect(updateAriaPropsOfPillSpy).toHaveBeenCalledWith(mockPill, 'tabIndex', -1);
      });
      it('`single` type, when value is truthy and value of pill group is that of the passed pill', async () => {
        const page = await buildPageBasedOnType('single', 'mail');
        const updateAriaPropsOfPillSpy = jest.spyOn(page.rootInstance, 'updateAriaPropsOfPill');
        page.rootInstance.updatePill(mockPill, 1, 1);
        expect(mockPill.checked).toBe(true);
        expect(updateAriaPropsOfPillSpy).toHaveBeenCalledWith(mockPill, 'tabIndex', 0);
      });
      it('`multiple` type, when value is `undefined`', async () => {
        const page = await buildPageBasedOnType('multiple');
        page.rootInstance.updatePill(mockPill, 1, 0);
        expect(mockPill.checked).toBe(false);
      });
      it.each([{ included: 'not included' }, { included: 'included' }])('`multiple` type, when value is truthy and value of pill is $included in value of pill group', async ({ included }) => {
        const page = await buildPageBasedOnType('multiple', included === 'included' ? ['mail'] : []);
        page.rootInstance.updatePill(mockPill, 1, 0);
        if (included === 'included') {
          expect(mockPill.checked).toBe(true);
        }
        else {
          expect(mockPill.checked).toBe(false);
        }
      });
    });
    describe('Testing `handleSlotChange`', () => {
      const setFocusDragIconSpy = jest.fn();
      const mockPills = [
        { value: 'pill 1', type: '', setFocusDragIcon: setFocusDragIconSpy },
        { value: 'pill 2', type: '', setFocusDragIcon: setFocusDragIconSpy },
      ];
      it.each(DISPLAY_DRAGGABLE_TYPES)('`$type` type - testing that type of pill is set correctly and `updatePill` is called', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        Object.defineProperty(page.rootInstance, 'host', {
          writable: true,
          configurable: true,
          value: {
            querySelectorAll: jest.fn().mockReturnValue(mockPills),
          },
        });
        const updateAriaPropsOfPillSpy = jest.spyOn(page.rootInstance, 'updateAriaPropsOfPill');
        page.rootInstance.handleSlotChange();
        expect(page.rootInstance.pillItems.length).toBe(2);
        expect(page.rootInstance.pillItems[0]).toEqual(mockPills[0]);
        expect(page.rootInstance.pillItems[1]).toEqual(mockPills[1]);
        mockPills.forEach(pill => {
          expect(pill.type).toBe(type);
          expect(updateAriaPropsOfPillSpy).toHaveBeenCalledWith(pill, 'role', 'listitem');
        });
        expect(mockPills[0]).toEqual({
          value: 'pill 1',
          type,
          setFocusDragIcon: setFocusDragIconSpy,
          ariaProps: { role: 'listitem' },
        });
        expect(mockPills[1]).toEqual({
          value: 'pill 2',
          type,
          setFocusDragIcon: setFocusDragIconSpy,
          ariaProps: { role: 'listitem' },
        });
        expect(updatePillSpy).toHaveBeenCalledTimes(0);
      });
      it('`draggable` type - testing that `setFocusDragIcon` is called on pill when it is grabbed', async () => {
        const page = await buildPageBasedOnType('draggable');
        Object.defineProperty(page.rootInstance, 'host', {
          writable: true,
          configurable: true,
          value: {
            querySelectorAll: jest.fn().mockReturnValue(mockPills),
          },
        });
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        const updateAriaPropsOfPillSpy = jest.spyOn(page.rootInstance, 'updateAriaPropsOfPill');
        const setPillGrabbedSpy = jest.spyOn(page.rootInstance, 'setPillGrabbed').mockImplementation(() => undefined);
        page.rootInstance.grabbedPillValue = 'pill 1';
        page.rootInstance.handleSlotChange();
        expect(updateAriaPropsOfPillSpy).toHaveBeenCalledTimes(2);
        expect(setPillGrabbedSpy).toHaveBeenCalledTimes(1);
        expect(setPillGrabbedSpy).toHaveBeenCalledWith(mockPills[0], true);
        expect(mockPills[0]).toEqual({
          value: 'pill 1',
          type: 'draggable',
          setFocusDragIcon: setFocusDragIconSpy,
          ariaProps: { role: 'listitem' },
        });
        expect(mockPills[1]).toEqual({
          value: 'pill 2',
          type: 'draggable',
          setFocusDragIcon: setFocusDragIconSpy,
          ariaProps: { role: 'listitem' },
        });
        expect(setFocusDragIconSpy).toHaveBeenCalledTimes(1);
        expect(updatePillSpy).toHaveBeenCalledTimes(0);
      });
      it('`draggable` type - pills without a value yet are set up, and not treated as grabbed or waiting for focus', async () => {
        const page = await buildPageBasedOnType('draggable');
        // e.g. pills that are not upgraded yet when the slot changes
        const pillsWithoutValue = [
          { value: undefined, type: '', ariaProps: {}, setFocusDragIcon: jest.fn() },
          { value: undefined, type: '', ariaProps: {}, setFocusDragIcon: jest.fn() },
        ];
        Object.defineProperty(page.rootInstance, 'host', {
          writable: true,
          configurable: true,
          value: {
            querySelectorAll: jest.fn().mockReturnValue(pillsWithoutValue),
          },
        });
        const setPillGrabbedSpy = jest.spyOn(page.rootInstance, 'setPillGrabbed');
        expect(() => page.rootInstance.handleSlotChange()).not.toThrow();
        pillsWithoutValue.forEach(pill => {
          expect(pill.type).toBe('draggable');
          expect(pill.ariaProps).toEqual({ role: 'listitem' });
          expect(pill.setFocusDragIcon).not.toHaveBeenCalled();
        });
        expect(setPillGrabbedSpy).not.toHaveBeenCalled();
      });
      it('`single` type - testing that type is set correctly and that `udpatePill` is called', async () => {
        const page = await buildPageBasedOnType('single');
        Object.defineProperty(page.rootInstance, 'host', {
          writable: true,
          configurable: true,
          value: {
            querySelectorAll: jest.fn().mockReturnValue(mockPills),
          },
        });
        const updatePillSpy = jest.spyOn(page.rootInstance, 'updatePill');
        const getNextIndexSpy = jest.spyOn(page.rootInstance, 'getNextIndex');
        page.rootInstance.handleSlotChange();
        expect(getNextIndexSpy).toHaveBeenCalledWith(0, 1);
        expect(mockPills[0].type).toBe('single');
        expect(mockPills[1].type).toBe('single');
        expect(updatePillSpy).toHaveBeenNthCalledWith(1, mockPills[0], 0, 0);
        expect(updatePillSpy).toHaveBeenNthCalledWith(2, mockPills[1], 1, 0);
      });
    });
    describe('Testing `getCurrentIndex`', () => {
      it('Testing that it returns the index of the first pill when value is falsey and no pill disabled', async () => {
        const page = await buildPageBasedOnType('single');
        expect(page.rootInstance.getCurrentIndex()).toEqual(0);
      });
      it('Testing that it returns the index of the pill that is checked', async () => {
        const page = await buildPageBasedOnType('single', 'phone');
        expect(page.rootInstance.getCurrentIndex()).toEqual(2);
      });
      it.each([
        { scenario: 'is `null`', value: null, isDisabled: false, expected: 0 },
        { scenario: 'matches no pill', value: 'fax', isDisabled: false, expected: 0 },
        { scenario: 'matches a disabled pill', value: 'email', isDisabled: true, expected: 1 },
      ])('Testing that it returns the index of the first non-disabled pill when `value` $scenario', async ({ value, isDisabled, expected }) => {
        const page = await buildPageBasedOnType('single', value, isDisabled);
        expect(page.rootInstance.getCurrentIndex()).toEqual(expected);
      });
    });
    describe('Testing `focusAndCheckNextPill`', () => {
      it('Testing that it moves from the tab stop pill to the next one when `value` matches no pill', async () => {
        const page = await buildPageBasedOnType('single', null);
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        // `setFocus` focuses on a timeout, which would fire after the page is torn down.
        page.rootInstance.pillItems.forEach((pill) => Object.defineProperty(pill, 'setFocus', { value: jest.fn(), configurable: true }));
        page.rootInstance.focusAndCheckNextPill('right');
        expect(page.rootInstance.pillItems[1].setFocus).toHaveBeenCalledTimes(1);
        expect(page.rootInstance.value).toBe('mail');
        expect(wppChangeSpy).toHaveBeenCalledWith({ value: 'mail', name: undefined });
      });
      it('Testing that it does nothing when every pill is disabled', async () => {
        const page = await buildPageBasedOnType('single');
        page.rootInstance.pillItems.forEach((pill) => Object.assign(pill, { disabled: true }));
        const wppChangeSpy = jest.spyOn(page.rootInstance.wppChange, 'emit');
        page.rootInstance.focusAndCheckNextPill('right');
        expect(page.rootInstance.value).toBeUndefined();
        expect(wppChangeSpy).not.toHaveBeenCalled();
      });
    });
    describe('Testing `focusPillAfterRemoval`', () => {
      // `setFocusDragIcon` focuses on a timeout, which would fire after the page is torn down, so the methods are mocked.
      const getMockedPills = (page) => {
        const pills = Array.from(page.root.querySelectorAll('wpp-pill'));
        pills.forEach(pill => {
          Object.defineProperty(pill, 'setRemoveIconFocus', { value: jest.fn(), configurable: true });
          Object.defineProperty(pill, 'setFocusDragIcon', { value: jest.fn(), configurable: true });
        });
        return pills;
      };
      const removeWithKeyboard = (page, pill) => {
        page.rootInstance.handleClose(getCloseEvent(pill, new KeyboardEvent('keydown', { key: 'Enter' })));
        pill.remove();
        page.rootInstance.handleSlotChange();
      };
      const getFocusedPills = (pills) => pills.filter(pill => pill.setRemoveIconFocus.mock.calls.length).map(pill => pill.value);
      it('moves focus to the remove icon of the pill that takes the place of the removed one', async () => {
        const page = await buildRemovablePillsPage();
        const pills = getMockedPills(page);
        removeWithKeyboard(page, pills[1]);
        expect(getFocusedPills(pills)).toEqual(['phone']);
        expect(page.rootInstance.pillToFocusAfterRemoval).toBeUndefined();
      });
      it('skips the disabled pills that come after the removed one', async () => {
        const page = await buildRemovablePillsPage('display', ['phone']);
        const pills = getMockedPills(page);
        removeWithKeyboard(page, pills[1]);
        expect(getFocusedPills(pills)).toEqual(['fax']);
      });
      it('goes back to the closest enabled pill before the removed one when all the next ones are disabled', async () => {
        const page = await buildRemovablePillsPage('display', ['phone', 'fax']);
        const pills = getMockedPills(page);
        removeWithKeyboard(page, pills[1]);
        expect(getFocusedPills(pills)).toEqual(['email']);
      });
      it('moves focus to the drag icon of a `draggable` pill that is not removable', async () => {
        const page = await buildRemovablePillsPage('draggable');
        const pills = getMockedPills(page);
        Object.defineProperty(pills[2], 'removable', { value: false, configurable: true });
        removeWithKeyboard(page, pills[1]);
        expect(pills[2].setFocusDragIcon).toHaveBeenCalledTimes(1);
        expect(getFocusedPills(pills)).toEqual([]);
      });
      it('moves focus to the group when every remaining pill is disabled', async () => {
        const page = await buildRemovablePillsPage('display', ['email', 'phone', 'fax']);
        const pills = getMockedPills(page);
        const pillsWrapper = page.root.shadowRoot.querySelector('.pills-wrapper');
        const wrapperFocusSpy = jest.spyOn(pillsWrapper, 'focus');
        removeWithKeyboard(page, pills[1]);
        expect(getFocusedPills(pills)).toEqual([]);
        expect(wrapperFocusSpy).toHaveBeenCalledTimes(1);
      });
    });
    it('Testing `getToIndex` returns correct value in all cases', async () => {
      const page = await buildPageBasedOnType('draggable');
      const pills = page.root?.querySelectorAll('wpp-pill');
      if (!pills) {
        throw new Error('No pills found');
      }
      expect(pills.length).toBe(3);
      expect(page.rootInstance.getToIndex(pills.length - 1, 'right')).toBe(0);
      expect(page.rootInstance.getToIndex(1, 'right')).toBe(2);
      expect(page.rootInstance.getToIndex(0, 'left')).toBe(pills.length - 1);
      expect(page.rootInstance.getToIndex(1, 'left')).toBe(0);
    });
  });
  describe('Testing accessibility', () => {
    const getKeyboardEvent = (key) => new KeyboardEvent('keydown', { key });
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
    describe('Testing the accessible name of the group', () => {
      const getGroup = (page) => page.root?.shadowRoot?.querySelector('.pills-wrapper');
      it('is the visible label: `aria-labelledby` points to the label rendered in the same shadow root', async () => {
        // `wpp-label` is registered here so the element carrying the id is actually rendered.
        const page = await newSpecPage({
          components: [WppPillGroup, WppPill, WppLabel, WppInternalLabel],
          template: () => (h("wpp-pill-group-v4-7-0", { type: "single", labelConfig: { text: 'Contact' } }, h("wpp-pill-v4-7-0", { value: "email", label: "Email" }))),
        });
        const labelledBy = getGroup(page)?.getAttribute('aria-labelledby');
        expect(labelledBy).toBe('pill-group-label');
        // The id resolves only because the label is rendered in the same shadow root as the group.
        expect(page.root?.shadowRoot?.querySelector(`#${labelledBy}`)).not.toBeNull();
        expect(getGroup(page)?.hasAttribute('aria-label')).toBe(false);
      });
      it('is `ariaProps.label` when the group has no visible label', async () => {
        const page = await buildPageBasedOnType('single', undefined, false, { label: 'Contact' });
        expect(getGroup(page)?.getAttribute('aria-label')).toBe('Contact');
        expect(getGroup(page)?.hasAttribute('aria-labelledby')).toBe(false);
      });
      it('prefers the visible label over `ariaProps.label`', async () => {
        const page = await buildPageBasedOnType('single', undefined, false, { label: 'Hidden name' }, { text: 'Contact' });
        expect(getGroup(page)?.getAttribute('aria-labelledby')).toBe('pill-group-label');
        expect(getGroup(page)?.hasAttribute('aria-label')).toBe(false);
      });
    });
    describe('`single` type', () => {
      it.each([{ required: true }, { required: false }])('Testing that `aria-required=$required` is set on the `radiogroup` element and not on the host', async ({ required }) => {
        const page = await buildPageBasedOnType('single');
        page.root.required = required;
        await page.waitForChanges();
        expect(page.root?.hasAttribute('aria-required')).toBe(false);
        expect(page.root?.shadowRoot?.querySelector('[role="radiogroup"]')?.getAttribute('aria-required')).toBe(`${required}`);
      });
      it.each([{ type: 'multiple' }, { type: 'display' }, { type: 'draggable' }])('`$type` type - testing that `aria-required` is not rendered (unsupported on `group` / `list`)', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        page.root.required = true;
        await page.waitForChanges();
        expect(page.root?.hasAttribute('aria-required')).toBe(false);
        expect(page.root?.shadowRoot?.querySelector('.pills-wrapper')?.hasAttribute('aria-required')).toBe(false);
      });
      it.each([{ key: 'ArrowRight' }, { key: 'ArrowDown' }])('Testing that `$key` key call `focusAndCheckNextPill` with the correct parameter', async ({ key }) => {
        const page = await buildPageBasedOnType('single');
        const mockEvent = getKeyboardEvent(key);
        const focusAndCheckNextPillSpy = jest.spyOn(page.rootInstance, 'focusAndCheckNextPill');
        const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
        page.rootInstance.handleKeyDown(mockEvent);
        expect(focusAndCheckNextPillSpy).toHaveBeenCalledWith('right');
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      });
      it.each([{ key: 'ArrowLeft' }, { key: 'ArrowUp' }])('Testing that `$key` key call `focusAndCheckNextPill` with the correct parameter', async ({ key }) => {
        const page = await buildPageBasedOnType('single');
        const mockEvent = getKeyboardEvent(key);
        const focusAndCheckNextPillSpy = jest.spyOn(page.rootInstance, 'focusAndCheckNextPill');
        const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
        page.rootInstance.handleKeyDown(mockEvent);
        expect(focusAndCheckNextPillSpy).toHaveBeenCalledWith('left');
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      });
    });
    describe('`draggable` type', () => {
      const getPill = (page, index) => {
        const pill = page.root?.querySelectorAll('wpp-pill')[index];
        if (!pill)
          throw Error('Pill not found');
        return pill;
      };
      const getKeyboardEventOnPill = (key, pill) => {
        const mockEvent = getKeyboardEvent(key);
        Object.defineProperty(mockEvent, 'target', { value: pill });
        return mockEvent;
      };
      it.each([{ key: 'Enter' }, { key: ' ' }])('Testing that `$key` key grabs the focused pill, sets `data-grabbed` and announces it', async ({ key }) => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 1);
        const mockEvent = getKeyboardEventOnPill(key, pill);
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
        page.rootInstance.handleKeyDown(mockEvent);
        expect(togglePillGrabSpy).toHaveBeenCalledWith(mockEvent, true);
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
        expect(page.rootInstance.grabbedPillValue).toBe('mail');
        expect(page.rootInstance.grabbedPillOriginalIndex).toBe(1);
        expect(pill.hasAttribute('data-grabbed')).toBe(true);
        expect(page.rootInstance.liveAnnouncement).toBe('Mail grabbed, position 2 of 3. Use the arrow keys to move it, Enter or Space to drop it, Escape to cancel.');
      });
      it.each([{ key: 'Enter' }, { key: ' ' }, { key: 'Tab' }])('Testing that `$key` key drops the grabbed pill at its current position and announces it', async ({ key }) => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 1);
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Enter', pill));
        const mockEvent = getKeyboardEventOnPill(key, pill);
        page.rootInstance.handleKeyDown(mockEvent);
        expect(togglePillGrabSpy).toHaveBeenLastCalledWith(mockEvent, false);
        expect(page.rootInstance.grabbedPillValue).toBeUndefined();
        expect(page.rootInstance.grabbedPillOriginalIndex).toBeNull();
        expect(pill.hasAttribute('data-grabbed')).toBe(false);
        expect(page.rootInstance.liveAnnouncement).toBe('Mail dropped at position 2 of 3.');
      });
      it('Testing that `Tab` and `Escape` keys do nothing when no pill is grabbed', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 1);
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Tab', pill));
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Escape', pill));
        expect(togglePillGrabSpy).not.toHaveBeenCalled();
        expect(page.rootInstance.liveAnnouncement).toBe('');
      });
      it('Testing that `Escape` keeps propagating when no pill is grabbed, so e.g. a surrounding modal still closes', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const mockEvent = getKeyboardEventOnPill('Escape', getPill(page, 1));
        const stopPropagationSpy = jest.spyOn(mockEvent, 'stopPropagation');
        page.rootInstance.handleKeyDown(mockEvent);
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      });
      it('Testing that `Escape` releases the grabbed pill without emitting `wppReorderList` when it was not moved', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 1);
        const reorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Enter', pill));
        const mockEvent = getKeyboardEventOnPill('Escape', pill);
        const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
        const stopPropagationSpy = jest.spyOn(mockEvent, 'stopPropagation');
        page.rootInstance.handleKeyDown(mockEvent);
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
        // Escape only cancels the move: it must not also close e.g. a surrounding `wpp-modal`.
        expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
        expect(reorderListSpy).not.toHaveBeenCalled();
        expect(page.rootInstance.grabbedPillValue).toBeUndefined();
        expect(pill.hasAttribute('data-grabbed')).toBe(false);
        expect(page.rootInstance.liveAnnouncement).toBe('Move cancelled. Mail returned to position 2 of 3.');
      });
      it('Testing that `Escape` moves a grabbed pill back to its original position and restores focus after re-render', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 0);
        const reorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        const setFocusDragIconSpy = jest.fn();
        Object.defineProperty(pill, 'setFocusDragIcon', { value: setFocusDragIconSpy, configurable: true });
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Enter', pill));
        // Simulate the consumer having moved the pill two positions to the right.
        page.rootInstance.pillItems = [getPill(page, 1), getPill(page, 2), pill];
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Escape', pill));
        expect(reorderListSpy).toHaveBeenCalledWith({ draggedIndex: 2, toIndex: 0 });
        expect(page.rootInstance.grabbedPillValue).toBeUndefined();
        expect(page.rootInstance.pillToFocusAfterReorder).toEqual({ value: 'email', withFocusRing: true });
        expect(page.rootInstance.liveAnnouncement).toBe('Move cancelled. Email returned to position 1 of 3.');
        page.rootInstance.handleSlotChange();
        expect(setFocusDragIconSpy).toHaveBeenCalledTimes(1);
        expect(setFocusDragIconSpy).toHaveBeenCalledWith(true);
        expect(page.rootInstance.pillToFocusAfterReorder).toBeUndefined();
      });
      it('Testing that moving a grabbed pill with the arrow keys announces the new position', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 1);
        const reorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('Enter', pill));
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill('ArrowRight', pill));
        expect(reorderListSpy).toHaveBeenCalledWith({ draggedIndex: 1, toIndex: 2 });
        expect(page.rootInstance.liveAnnouncement).toBe('Mail moved to position 3 of 3.');
      });
      it('Testing that custom `locales` are used for the announcements', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.root.locales = {
          pillGrabbed: (label, position, total) => `${label} ${position}/${total}`,
        };
        await page.waitForChanges();
        page.rootInstance.handleSlotChange();
        const pill = getPill(page, 2);
        page.rootInstance.handleKeyDown(getKeyboardEventOnPill(' ', pill));
        expect(page.rootInstance.liveAnnouncement).toBe('Phone 3/3');
        expect(page.rootInstance._locales.sortableList).toBe('Sortable list');
      });
      it('Testing that the live region renders the announcement for the `draggable` type only', async () => {
        const draggablePage = await buildPageBasedOnType('draggable');
        draggablePage.rootInstance.liveAnnouncement = 'Announcement';
        await draggablePage.waitForChanges();
        const liveRegion = draggablePage.root?.shadowRoot?.querySelector('[aria-live="polite"]');
        expect(liveRegion?.textContent).toBe('Announcement');
        expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
        const singlePage = await buildPageBasedOnType('single');
        expect(singlePage.root?.shadowRoot?.querySelector('[aria-live="polite"]')).toBeNull();
      });
      it.each([
        { key: 'ArrowRight', direction: 'right' },
        { key: 'ArrowDown', direction: 'right' },
        { key: 'ArrowLeft', direction: 'left' },
        { key: 'ArrowUp', direction: 'left' },
      ])('Testing that `reorderPills` is called when pill is grabbed and $key is pressed', async ({ key, direction }) => {
        const page = await buildPageBasedOnType('draggable');
        const mockEvent = getKeyboardEvent(key);
        Object.defineProperty(mockEvent, 'target', { value: page.root?.querySelectorAll('wpp-pill')[0] });
        const reorderPillsSpy = jest.spyOn(page.rootInstance, 'reorderPills');
        const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
        page.rootInstance.grabbedPillValue = 'email';
        page.rootInstance.handleKeyDown(mockEvent);
        expect(reorderPillsSpy).toHaveBeenCalledWith(mockEvent.target, direction);
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      });
      it.each([{ value: 0 }, { value: '' }])('Testing that a grabbed pill with the falsy value `$value` can be moved with the arrow keys', async ({ value }) => {
        const page = await newSpecPage({
          components: [WppPillGroup, WppPill],
          template: () => (h("wpp-pill-group-v4-7-0", { type: "draggable" }, h("wpp-pill-v4-7-0", { value: value, label: "First" }), h("wpp-pill-v4-7-0", { value: "second", label: "Second" }))),
        });
        const pill = page.root.querySelectorAll('wpp-pill')[0];
        const getEventOnPill = (key) => {
          const event = getKeyboardEvent(key);
          Object.defineProperty(event, 'target', { value: pill });
          return event;
        };
        const reorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        page.rootInstance.handleKeyDown(getEventOnPill('Enter'));
        page.rootInstance.handleKeyDown(getEventOnPill('ArrowRight'));
        expect(page.rootInstance.grabbedPillValue).toBe(value);
        expect(reorderListSpy).toHaveBeenCalledWith({ draggedIndex: 0, toIndex: 1 });
        expect(page.rootInstance.liveAnnouncement).toBe('First moved to position 2 of 2.');
      });
    });
  });
  describe('Testing events', () => {
    it.each([{ hasFocus: true }, { hasFocus: false }])('Testing `handleFocusin` when component focused=$hasFocus', async ({ hasFocus }) => {
      const page = await buildPageBasedOnType('single');
      const wppFocusSpy = jest.spyOn(page.rootInstance.wppFocus, 'emit');
      const mockEvent = new FocusEvent('focusin');
      page.rootInstance.hasFocus = hasFocus;
      page.rootInstance.handleFocusin(mockEvent);
      if (!hasFocus) {
        expect(wppFocusSpy).toHaveBeenCalledWith(mockEvent);
      }
      else {
        expect(wppFocusSpy).toHaveBeenCalledTimes(0);
      }
      expect(page.rootInstance.hasFocus).toBe(true);
    });
    describe('Testing `handleFocusout', () => {
      it.each([{ currentAction: 'isDragging' }, { currentAction: 'grabbedPillValue' }])('Testing that function returns and blur event is not emitted when $currentAction=true', async ({ currentAction }) => {
        const page = await buildPageBasedOnType('draggable');
        const wppBlurSpy = jest.spyOn(page.rootInstance.wppBlur, 'emit');
        const mockEvent = new FocusEvent('focusout');
        page.rootInstance[currentAction] = true;
        page.rootInstance.handleFocusout(mockEvent);
        expect(wppBlurSpy).toHaveBeenCalledTimes(0);
      });
      it.each([{ value: 0 }, { value: '' }])('Testing that a pill grabbed with the falsy value `$value` is kept grabbed and blur is not emitted', async ({ value }) => {
        const page = await buildPageBasedOnType('draggable');
        const wppBlurSpy = jest.spyOn(page.rootInstance.wppBlur, 'emit');
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        const mockEvent = new FocusEvent('focusout');
        Object.defineProperty(mockEvent, 'target', { value: page.root?.querySelectorAll('wpp-pill')[0] });
        page.rootInstance.grabbedPillValue = value;
        page.rootInstance.handleFocusout(mockEvent);
        expect(togglePillGrabSpy).not.toHaveBeenCalled();
        expect(wppBlurSpy).not.toHaveBeenCalled();
      });
      it('Testing that function returns and blur event is not emitted when `relatedTarget` of event is part of the group', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppBlurSpy = jest.spyOn(page.rootInstance.wppBlur, 'emit');
        const mockEvent = new FocusEvent('focusout');
        const secondPill = page.root?.querySelectorAll('wpp-pill')[1];
        if (!secondPill) {
          throw Error('Pill not found');
        }
        Object.defineProperty(mockEvent, 'relatedTarget', {
          value: secondPill,
        });
        page.rootInstance.handleFocusout(mockEvent);
        expect(wppBlurSpy).toHaveBeenCalledTimes(0);
      });
      it('Testing that `blur` event is emitted, `togglePillGrab` is called correctly when type=`draggable` and target is a pill', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppBlurSpy = jest.spyOn(page.rootInstance.wppBlur, 'emit');
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        const mockEvent = new FocusEvent('focusout');
        const thirdPill = page.root?.querySelectorAll('wpp-pill')[2];
        page.rootInstance.hasFocus = true;
        Object.defineProperty(mockEvent, 'target', {
          value: thirdPill,
        });
        page.rootInstance.handleFocusout(mockEvent);
        expect(togglePillGrabSpy).toHaveBeenCalledWith(mockEvent, false);
        expect(wppBlurSpy).toHaveBeenCalledWith(mockEvent);
        expect(page.rootInstance.hasFocus).toBe(false);
      });
      it.each(PILL_GROUP_TYPES.slice(0, 3))('`$type` type - testing that blur is emitted and `togglePillGrab` is not called', async ({ type }) => {
        const page = await buildPageBasedOnType(type);
        const wppBlurSpy = jest.spyOn(page.rootInstance.wppBlur, 'emit');
        const togglePillGrabSpy = jest.spyOn(page.rootInstance, 'togglePillGrab');
        const mockEvent = new FocusEvent('focusout');
        page.rootInstance.handleFocusout(mockEvent);
        expect(togglePillGrabSpy).toHaveBeenCalledTimes(0);
        expect(wppBlurSpy).toHaveBeenCalledWith(mockEvent);
        expect(page.rootInstance.hasFocus).toBe(false);
      });
    });
    it('Testing `handleMouseDown` resets `grabbedPillValue` and `grabbedPillOriginalIndex`', async () => {
      const page = await buildPageBasedOnType('draggable');
      page.rootInstance.grabbedPillValue = 'pill 1';
      page.rootInstance.grabbedPillOriginalIndex = 0;
      page.rootInstance.handleMouseDown();
      expect(page.rootInstance.grabbedPillValue).toBeUndefined();
      expect(page.rootInstance.grabbedPillOriginalIndex).toBeNull();
    });
    it('Testing `handleMouseDown` clears `data-grabbed` from the pill grabbed through the keyboard', async () => {
      const page = await buildPageBasedOnType('draggable');
      page.rootInstance.handleSlotChange();
      const pill = page.root?.querySelectorAll('wpp-pill')[1];
      const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(mockEvent, 'target', { value: pill });
      page.rootInstance.handleKeyDown(mockEvent);
      expect(pill.hasAttribute('data-grabbed')).toBe(true);
      page.rootInstance.handleMouseDown();
      expect(pill.hasAttribute('data-grabbed')).toBe(false);
      expect(page.rootInstance.grabbedPillValue).toBeUndefined();
    });
    it('Testing `setPillGrabbed` toggles `data-grabbed` and never sets the deprecated `aria-grabbed`', async () => {
      const page = await buildPageBasedOnType('draggable');
      const pill = page.root?.querySelectorAll('wpp-pill')[0];
      page.rootInstance.setPillGrabbed(pill, true);
      await page.waitForChanges();
      expect(pill.hasAttribute('data-grabbed')).toBe(true);
      expect(pill.hasAttribute('aria-grabbed')).toBe(false);
      page.rootInstance.setPillGrabbed(pill, false);
      await page.waitForChanges();
      expect(pill.hasAttribute('data-grabbed')).toBe(false);
    });
    describe('Testing handleDragStart', () => {
      it('Testing that `currentDraggedIndex` and `isDragging` are set correctly and a pill is grabbed', async () => {
        const page = await buildPageBasedOnType('draggable');
        const mockEvent = new CustomEvent('dragstart', {
          bubbles: true,
          cancelable: true,
        });
        const firstPill = page.root?.querySelectorAll('wpp-pill')[0];
        Object.defineProperty(mockEvent, 'target', {
          value: firstPill,
        });
        if (!firstPill) {
          throw Error('No pill found');
        }
        page.rootInstance.handleDragStart(mockEvent);
        expect(page.rootInstance.isDragging).toBeTruthy();
        expect(page.rootInstance.currentDraggedIndex).toBe(0);
      });
      it('Testing that `currentDraggedIndex` and `isDragging` are not set when target of event is not a pill', async () => {
        const page = await buildPageBasedOnType('draggable');
        const mockEvent = new CustomEvent('dragstart', {
          bubbles: true,
          cancelable: true,
        });
        const divElement = document.createElement('div');
        Object.defineProperty(mockEvent, 'target', {
          value: divElement,
        });
        page.rootInstance.handleDragStart(mockEvent);
        expect(page.rootInstance.isDragging).toBeFalsy();
        expect(page.rootInstance.currentDraggedIndex).toBe(null);
      });
    });
    it('Test that `handleDragEnd` resets `currentDraggedIndex` and `isDragging`', async () => {
      const page = await buildPageBasedOnType('draggable');
      page.rootInstance.isDragging = true;
      page.rootInstance.currentDraggedIndex = 0;
      page.rootInstance.handleDragEnd();
      page.rootInstance.isDragging = false;
      page.rootInstance.currentDraggedIndex = null;
    });
    describe('Testing `handleDragOver`', () => {
      const getDragOverEvent = (target) => {
        const mockEvent = new CustomEvent('dragover', {
          bubbles: true,
          cancelable: true,
        });
        Object.defineProperty(mockEvent, 'target', {
          value: target,
        });
        return mockEvent;
      };
      it('Testing that `wppReorderList` is not called when target is not a pill', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppReorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        const divEl = document.createElement('div');
        page.rootInstance.handleDragOver(getDragOverEvent(divEl));
        expect(wppReorderListSpy).toHaveBeenCalledTimes(0);
      });
      it('Testing that `wppReorderList` is not called when target is a pill, but `currentDraggedIndex` is null', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppReorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        const firstPill = page.root?.querySelector('wpp-pill');
        if (!firstPill) {
          throw new Error('No pill found');
        }
        page.rootInstance.handleDragOver(getDragOverEvent(firstPill));
        expect(wppReorderListSpy).toHaveBeenCalledTimes(0);
      });
      it('Testing that `wppReorderList` is not called when `toIndex` is the same as `currentDraggedIndex`', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppReorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        const firstPill = page.root?.querySelector('wpp-pill');
        if (!firstPill) {
          throw new Error('No pill found');
        }
        page.rootInstance.currentDraggedIndex = 0;
        page.rootInstance.handleDragOver(getDragOverEvent(firstPill));
        expect(wppReorderListSpy).toHaveBeenCalledTimes(0);
      });
      it('Testing that `wppReorderList` is called and `currentDraggedIndex` is update to `toIndex`', async () => {
        const page = await buildPageBasedOnType('draggable');
        const wppReorderListSpy = jest.spyOn(page.rootInstance.wppReorderList, 'emit');
        const firstPill = page.root?.querySelector('wpp-pill');
        if (!firstPill) {
          throw new Error('No pill found');
        }
        page.rootInstance.currentDraggedIndex = 1;
        page.rootInstance.handleDragOver(getDragOverEvent(firstPill));
        expect(wppReorderListSpy).toHaveBeenCalledWith({ draggedIndex: 1, toIndex: 0 });
        expect(page.rootInstance.currentDraggedIndex).toBe(0);
      });
      it('Testing that the dragged pill gets focus back (without focus ring) after the list re-renders', async () => {
        const page = await buildPageBasedOnType('draggable');
        page.rootInstance.handleSlotChange();
        const pills = page.root?.querySelectorAll('wpp-pill');
        const setFocusDragIconSpy = jest.fn();
        Object.defineProperty(pills[1], 'setFocusDragIcon', { value: setFocusDragIconSpy, configurable: true });
        page.rootInstance.currentDraggedIndex = 1;
        page.rootInstance.handleDragOver(getDragOverEvent(pills[0]));
        expect(page.rootInstance.pillToFocusAfterReorder).toEqual({ value: 'mail', withFocusRing: false });
        page.rootInstance.handleSlotChange();
        expect(setFocusDragIconSpy).toHaveBeenCalledWith(false);
        expect(page.rootInstance.pillToFocusAfterReorder).toBeUndefined();
      });
    });
  });
  describe('Snapshots', () => {
    it.each(PILL_GROUP_TYPES)('renders $type type pill with value', async ({ type }) => {
      const page = await buildPageBasedOnType(type, type === 'multiple' ? ['phone'] : 'phone');
      page.rootInstance.handleSlotChange();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('renders `draggable` group with ariaProps and a label', async () => {
      const page = await buildPageBasedOnType('draggable', 'phone', false, {
        label: 'Contact options',
        roleDescription: 'Sortable pills',
      }, { text: 'This is a label' });
      page.rootInstance.handleSlotChange();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppAutocomplete } from '../wpp-autocomplete';
import { WppInput } from '../../wpp-input/wpp-input';
import { isSelected, selectedOptionsByOrder } from '../utils';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { FOCUS_TYPE } from '../../../types/common';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-autocomplete', () => {
  describe('snapshots', () => {
    it('should render autocomplete component', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('label hover state', () => {
    const renderAutocompleteWithLabel = async (disabled = false) => {
      const page = await newSpecPage({
        components: [WppAutocomplete, WppLabel, WppInternalLabel],
        template: () => h("wpp-autocomplete-v4-5-0", { disabled: disabled, labelConfig: { text: 'Autocomplete label' } }),
      });
      await page.waitForChanges();
      return {
        label: page.root?.shadowRoot?.querySelector('wpp-label'),
        trigger: page.root?.shadowRoot?.querySelector('.trigger'),
        page,
      };
    };
    it('applies the trigger hover state while its label is hovered', async () => {
      const { label, trigger, page } = await renderAutocompleteWithLabel();
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(trigger).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(trigger).not.toHaveClass('label-hovered');
    });
    it('does not apply the trigger hover state from a disabled label', async () => {
      const { label, trigger, page } = await renderAutocompleteWithLabel(true);
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(trigger).not.toHaveClass('label-hovered');
    });
  });
  describe('unit tests', () => {
    describe('utils:isSelected', () => {
      const mkItem = (value, label = String(value)) => ({ value, label });
      it('returns false when no selected values', () => {
        expect(isSelected([], mkItem('a'), undefined)).toBe(false);
        expect(isSelected(undefined, mkItem('a'), undefined)).toBe(false);
      });
      it('matches primitive values', () => {
        const item = mkItem('b');
        expect(isSelected(['a', 'b', 'c'], item, undefined)).toBe(true);
        expect(isSelected(['a', 'c'], item, undefined)).toBe(false);
      });
      it('matches object values by deep equality when no getItemKey provided', () => {
        const item = mkItem({ id: 2, x: { y: 1 } });
        const selected = [{ id: 1 }, { id: 2, x: { y: 1 } }];
        expect(isSelected(selected, item, undefined)).toBe(true);
        expect(isSelected([{ id: 3 }], item, undefined)).toBe(false);
      });
      it('matches object values using getItemKey when provided', () => {
        const getItemKey = (v) => v?.id;
        const item = mkItem({ id: 42, extra: 'x' });
        // Selected as primitives via key
        expect(isSelected([1, 2, 42], item, getItemKey)).toBe(true);
        // Selected as objects with .value shape
        expect(isSelected([{ value: { id: 5 } }, { value: { id: 42, extra: 'different' } }], item, getItemKey)).toBe(true);
        expect(isSelected([{ value: { id: 7 } }], item, getItemKey)).toBe(false);
      });
    });
  });
  describe('utils:selectedOptionsByOrder', () => {
    const mk = (id, label = `#${id}`) => ({ value: { id }, label });
    it('returns empty when inputs empty', () => {
      expect(selectedOptionsByOrder([], [], undefined)).toEqual([]);
      expect(selectedOptionsByOrder(undefined, undefined, undefined)).toEqual([]);
    });
    it('preserves order from value (primitive)', () => {
      const list = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
      ];
      const out = selectedOptionsByOrder(list, ['c', 'a'], undefined);
      expect(out.map(i => i.label)).toEqual(['C', 'A']);
    });
    it('uses getItemKey for object values', () => {
      const list = [mk(1), mk(2), mk(3)];
      const getItemKey = (v) => v?.id;
      const out = selectedOptionsByOrder(list, [{ id: 3 }, { id: 1 }], getItemKey);
      expect(out.map(i => i.value)).toEqual([{ id: 3 }, { id: 1 }]);
    });
    it('falls back to deep equality when key missing in list map', () => {
      const list = [
        { value: { id: 1, ver: 1 }, label: 'v1' },
        { value: { id: 1, ver: 2 }, label: 'v2' },
      ];
      // getItemKey maps only by id, not version → map hit may be wrong, deep match fixes
      const getItemKey = (v) => v?.id;
      const out = selectedOptionsByOrder(list, [{ id: 1, ver: 2 }], getItemKey);
      expect(out[0].label).toBe('v2');
    });
    it('ignores items with falsy value in internal list', () => {
      const list = [
        { value: null, label: 'x' },
        { value: 'ok', label: 'OK' },
      ];
      const out = selectedOptionsByOrder(list, ['ok'], undefined);
      expect(out.map(i => i.label)).toEqual(['OK']);
    });
  });
  // Minimal stub to emulate style.setProperty capture
  const mkStyle = () => {
    const calls = [];
    return {
      obj: { setProperty: (k, v) => calls.push([k, v]) },
      calls,
    };
  };
  // Fake element with dynamic clientWidth based on textContent
  const mkMeasureNode = (scale = 8) => {
    let _text = '';
    return Object.defineProperties({}, {
      textContent: {
        get: () => _text,
        set: (v) => {
          _text = v;
        },
      },
      clientWidth: {
        get: () => Math.max(0, _text.length * scale),
      },
    });
  };
  const mkFixedWidthNode = (w) => ({ clientWidth: w });
  const mkList = (arr) => arr.map(({ v, label, hidden, disabled }) => ({ value: v, label: label ?? String(v), hidden, disabled }));
  describe('WppAutocomplete1: validators, helpers, placeholder methods', () => {
    it('checkVisibleOptionsLength counts only non-hidden', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.searchText = 'test';
      inst.checkVisibleOptionsLength(mkList([{ v: 'a' }, { v: 'b', hidden: true }, { v: 'c' }]));
      expect(inst.visibleOptionsLength).toBe(2);
    });
    it('isSelectedItemsLimitReached', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.limitSelectedItems = 0;
      expect(inst.isSelectedItemsLimitReached([])).toBe(false);
      inst.limitSelectedItems = 2;
      expect(inst.isSelectedItemsLimitReached([1])).toBe(false);
      expect(inst.isSelectedItemsLimitReached([1, 2])).toBe(true);
      expect(inst.isSelectedItemsLimitReached([1, 2, 3])).toBe(true);
    });
    it('canLoadMore', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.infinite = true;
      inst.infiniteLastPage = false;
      inst.isInfiniteLoading = false;
      inst.loadMore = () => Promise.resolve();
      expect(inst.canLoadMore()).toBe(true);
      inst.isInfiniteLoading = true;
      expect(inst.canLoadMore()).toBe(false);
      inst.isInfiniteLoading = false;
      inst.infiniteLastPage = true;
      expect(inst.canLoadMore()).toBe(false);
    });
    it('getVisibleSource respects loading/search/suggestions', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.loading = true;
      expect(inst.getVisibleSource()).toBeUndefined();
      inst.loading = false;
      inst.searchText = '';
      inst.componentSuggestions = mkList([{ v: 's1' }]);
      expect(inst.getVisibleSource()).toBe('suggestions');
      inst.componentSuggestions = [];
      expect(inst.getVisibleSource()).toBe('list');
      inst.searchText = ' x ';
      expect(inst.getVisibleSource()).toBe('list');
    });
    it('clampListNdx', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.internalList = mkList([{ v: 1 }, { v: 2 }]);
      expect(inst.clampListNdx(null)).toBeNull();
      expect(inst.clampListNdx(-1)).toBeNull();
      expect(inst.clampListNdx(0)).toBe(0);
      expect(inst.clampListNdx(5)).toBe(1);
    });
    it('findNextActiveNdx skips hidden/disabled in both directions and sources', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.internalList = mkList([{ v: 1, hidden: true }, { v: 2, disabled: true }, { v: 3 }]);
      expect(inst.findNextActiveNdx(null, 1, 'list')).toBe(2);
      expect(inst.findNextActiveNdx(2, -1, 'list')).toBe(2); // stays when no previous visible
      inst.componentSuggestions = mkList([{ v: 'a', hidden: true }, { v: 'b' }]);
      expect(inst.findNextActiveNdx(null, 1, 'suggestions')).toBe(1);
    });
    it('updatePlaceholderText: none, regular, extended', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      inst.value = [];
      inst.updatePlaceholderText();
      expect(inst.placeholderText).toBeUndefined();
      inst.value = [1, 2];
      inst.type = 'regular';
      inst.selectedOptions = mkList([
        { v: 1, label: 'One' },
        { v: 2, label: 'Two' },
      ]);
      inst.updatePlaceholderText();
      expect(inst.placeholderText).toBe('One, Two');
      inst.type = 'extended';
      inst.locales = { selected: (n) => `sel(${n})` };
      inst.updatePlaceholderText();
      expect(inst.placeholderText).toBe('sel(2)');
    });
    it('getHiddenCountElWidth uses hiddenInputPlaceholderRef and formats text', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      const inst = page.rootInstance;
      // For some reason this is not returning 0
      // hiddenInputPlaceholderRef is not set
      // expect(inst.getHiddenCountElWidth(3)).toBe(0)
      inst.hiddenInputPlaceholderRef = mkMeasureNode(5);
      const w = inst.getHiddenCountElWidth(3);
      expect(inst.hiddenInputPlaceholderRef.textContent).toBe(', +3');
      expect(w).toBeGreaterThan(0);
    });
    describe('countHiddenElements scenarios', () => {
      it('all items fit: hidden count = 0 and width reset', async () => {
        const page = await newSpecPage({
          components: [WppAutocomplete],
          html: `<wpp-autocomplete></wpp-autocomplete>`,
        });
        const inst = page.rootInstance;
        inst.multiple = true;
        inst.value = [1, 2];
        inst.selectedOptions = mkList([
          { v: 1, label: 'A' },
          { v: 2, label: 'B' },
        ]);
        const style = mkStyle();
        inst.triggerRef = { style: style.obj };
        inst.inputPlaceholderRef = mkFixedWidthNode(300);
        inst.hiddenInputPlaceholderRef = mkMeasureNode(6);
        inst.countHiddenElements();
        expect(inst.hiddenSelectedOptionsNumber).toBe(0);
        expect(style.calls.find(([k]) => k === '--hidden-count-width')?.[1]).toBe('0px');
      });
      it('some items hidden: computes count and sets width var', async () => {
        const page = await newSpecPage({
          components: [WppAutocomplete],
          html: `<wpp-autocomplete></wpp-autocomplete>`,
        });
        const inst = page.rootInstance;
        inst.multiple = true;
        inst.value = [1, 2, 3, 4];
        inst.selectedOptions = mkList([
          { v: 1, label: 'Alpha' },
          { v: 2, label: 'Beta' },
          { v: 3, label: 'Gamma' },
          { v: 4, label: 'Delta' },
        ]);
        const style = mkStyle();
        inst.triggerRef = { style: style.obj };
        inst.inputPlaceholderRef = mkFixedWidthNode(80); // very narrow
        inst.hiddenInputPlaceholderRef = mkMeasureNode(8);
        inst.countHiddenElements();
        expect(inst.hiddenSelectedOptionsNumber).toBeGreaterThan(0);
        const varSet = style.calls.filter(([k]) => k === '--hidden-count-width').pop()?.[1];
        expect(varSet).toMatch(/px$/);
      });
      it('early returns: disabled when not multiple or missing refs/value', async () => {
        const page = await newSpecPage({
          components: [WppAutocomplete],
          html: `<wpp-autocomplete></wpp-autocomplete>`,
        });
        const inst = page.rootInstance;
        inst.multiple = false;
        inst.countHiddenElements(); // no throw
        inst.multiple = true;
        inst.value = [];
        inst.countHiddenElements(); // no throw
      });
    });
    it('checkListAgainstValue: marks checked, merges by key, orders, updates placeholders and extended selections', async () => {
      const getItemKey = (v) => v?.id;
      const page = await newSpecPage({
        components: [WppAutocomplete],
        template: () => h("wpp-autocomplete-v4-5-0", { type: "extended", multiple: true, getItemKey: getItemKey }),
      });
      const inst = page.rootInstance;
      const spyUpdate = (inst.updatePlaceholderText = jest.fn());
      inst.internalList = mkList([
        { v: { id: 1 }, label: 'L1' },
        { v: { id: 2 }, label: 'L2' },
      ]);
      inst.componentSuggestions = mkList([
        { v: { id: 2 }, label: 'S2' },
        { v: { id: 3 }, label: 'S3' },
      ]);
      inst.value = [{ id: 3 }, { id: 1 }]; // order must be S3 (id3 from suggestions) then L1 (id1 from list)
      inst.checkListAgainstValue();
      // list items checked
      expect(inst.internalList.find((i) => i.value.id === 1).checked).toBe(true);
      expect(inst.internalList.find((i) => i.value.id === 2).checked).toBe(false);
      // merged order preserved by value
      expect(inst.selectedOptions.map((i) => i.value.id)).toEqual([3, 1]);
      // extended mirrors selected options
      expect(inst.extendedSelectedValues.map((i) => i.value.id)).toEqual([3, 1]);
      // placeholder was updated
      expect(spyUpdate).toHaveBeenCalledTimes(2);
    });
  });
  describe('accessibility (WPPOPENDS-1496)', () => {
    // Renders the autocomplete together with the real wpp-input so assertions run against the
    // native input inside its shadow DOM — where the combobox semantics must actually land.
    const mkPage = (html) => newSpecPage({
      components: [WppAutocomplete, WppInput],
      html,
    });
    const getNativeInput = (page) => page.root?.shadowRoot?.querySelector('wpp-input')?.shadowRoot?.querySelector('input');
    describe('combobox pattern on the native input', () => {
      it('places role="combobox" and popup wiring on the native input, not the wpp-input host', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const input = getNativeInput(page);
        expect(input?.getAttribute('role')).toBe('combobox');
        expect(input?.getAttribute('aria-haspopup')).toBe('listbox');
        expect(input?.getAttribute('aria-autocomplete')).toBe('list');
        expect(input?.getAttribute('aria-expanded')).toBe('false');
        expect(page.root?.shadowRoot?.querySelector('wpp-input')?.getAttribute('role')).toBeNull();
      });
      it('does not render an invalid aria-activedescendant reference', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        expect(getNativeInput(page)?.hasAttribute('aria-activedescendant')).toBe(false);
      });
      it('omits aria-controls while the listbox is not in the DOM', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        expect(getNativeInput(page)?.hasAttribute('aria-controls')).toBe(false);
      });
      it('wires aria-controls and aria-expanded to the open listbox', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
        const input = getNativeInput(page);
        expect(listbox?.id).toMatch(/^wpp-autocomplete-listbox-\d+$/);
        expect(input?.getAttribute('aria-controls')).toBe(listbox?.id);
        expect(input?.getAttribute('aria-expanded')).toBe('true');
      });
      it('gives the listbox a default accessible name', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('[role="listbox"]')?.getAttribute('aria-label')).toBe('Search results');
      });
    });
    describe('accessible name for the input (WCAG 4.1.2)', () => {
      it('falls back to the searchLabel locale when no label or placeholder is provided', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        expect(getNativeInput(page)?.getAttribute('aria-label')).toBe('Search');
      });
      it('uses the placeholder as the accessible name when provided', async () => {
        const page = await mkPage('<wpp-autocomplete placeholder="Find a fruit"></wpp-autocomplete>');
        expect(getNativeInput(page)?.getAttribute('aria-label')).toBe('Find a fruit');
      });
      it('keeps the accessible name when the visible placeholder is suppressed by a value', async () => {
        const page = await mkPage('<wpp-autocomplete placeholder="Find a fruit"></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.value = ['apple'];
        await page.waitForChanges();
        const input = getNativeInput(page);
        expect(input?.getAttribute('placeholder')).toBeNull();
        expect(input?.getAttribute('aria-label')).toBe('Find a fruit');
      });
    });
    describe('keyboard behavior (W3C ARIA APG)', () => {
      it('Escape closes the dropdown without blurring the component', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        const hide = jest.fn();
        inst.tippyInstance = { state: { isShown: true, isDestroyed: false }, hide, destroy: jest.fn() };
        inst.isFocused = true;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const wppInput = page.root?.shadowRoot?.querySelector('wpp-input');
        wppInput?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await page.waitForChanges();
        expect(hide).toHaveBeenCalled();
        expect(inst.isDropdownShown).toBe(false);
        expect(inst.isFocused).toBe(true);
      });
      it('announces the highlighted option through the live region', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.internalList = mkList([
          { v: 'a', label: 'Apple' },
          { v: 'b', label: 'Banana', hidden: true },
          { v: 'c', label: 'Cherry' },
        ]);
        inst.setActiveClass('list', null, 2);
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent).toBe('Cherry, 2 of 2');
      });
      it('announces nothing-found when an open dropdown has no matches', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.isDropdownShown = true;
        inst.searchText = 'zzz';
        inst.visibleOptionsLength = 0;
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent).toBe('Nothing found');
      });
      describe('popup focus boundaries', () => {
        // Simulates the popup's interactive content (pill remove buttons, Show More, ...) with
        // plain focusable elements appended to the popup container the keydown listener sits on.
        const mkPopup = async () => {
          const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
          const inst = page.rootInstance;
          const setFocus = jest.fn();
          inst.inputRef = { setFocus };
          const dropdown = inst.dropdownRef;
          const [first, middle, last] = ['first', 'middle', 'last'].map(id => {
            const el = page.doc.createElement('span');
            el.id = id;
            el.setAttribute('tabindex', '0');
            dropdown.appendChild(el);
            return el;
          });
          return { page, inst, setFocus, first, middle, last };
        };
        const pressTab = (el, shiftKey = false) => {
          const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
          el.dispatchEvent(event);
          return event;
        };
        it('Tab from the last interactive element returns focus to the input', async () => {
          const { setFocus, last } = await mkPopup();
          const event = pressTab(last);
          expect(event.defaultPrevented).toBe(true);
          expect(setFocus).toHaveBeenCalledTimes(1);
        });
        it('Shift+Tab from the first interactive element returns focus to the input', async () => {
          const { setFocus, first } = await mkPopup();
          const event = pressTab(first, true);
          expect(event.defaultPrevented).toBe(true);
          expect(setFocus).toHaveBeenCalledTimes(1);
        });
        it('Tab from the last interactive element reaches the clear button when there is a selection', async () => {
          const { page, inst, setFocus, last } = await mkPopup();
          inst.value = ['a'];
          await page.waitForChanges();
          const cross = page.root?.shadowRoot?.querySelector('wpp-icon-cross');
          const focus = jest.fn();
          cross.focus = focus;
          const event = pressTab(last);
          expect(event.defaultPrevented).toBe(true);
          expect(focus).toHaveBeenCalledTimes(1);
          // The clear button is the last stop inside the field, so focus must not bounce back in.
          expect(setFocus).not.toHaveBeenCalled();
        });
        it('Tab between middle elements keeps the native order', async () => {
          const { setFocus, middle } = await mkPopup();
          const forward = pressTab(middle);
          const backward = pressTab(middle, true);
          expect(forward.defaultPrevented).toBe(false);
          expect(backward.defaultPrevented).toBe(false);
          expect(setFocus).not.toHaveBeenCalled();
        });
      });
    });
    describe('clear icon focusability', () => {
      it('stays a tab stop while the field is focused and while the popup is open', async () => {
        const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.value = ['a'];
        await page.waitForChanges();
        const cross = page.root?.shadowRoot?.querySelector('wpp-icon-cross');
        expect(cross?.getAttribute('tabindex')).toBe('0');
        // Both states only hide the icon visually, and `handleCrossIconFocus` brings it back the
        // moment it takes focus. They are also the only states a keyboard user could reach it
        // from, so dropping it out of the tab order here left the control mouse-only.
        inst.isFocused = true;
        await page.waitForChanges();
        expect(cross?.getAttribute('tabindex')).toBe('0');
        inst.isDropdownShown = true;
        await page.waitForChanges();
        expect(cross?.getAttribute('tabindex')).toBe('0');
      });
      it('is not a tab stop when there is nothing to clear', async () => {
        const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('wpp-icon-cross')?.getAttribute('tabindex')).toBe('-1');
      });
      it('is removed from the tab order when the component is disabled', async () => {
        const page = await mkPage('<wpp-autocomplete multiple disabled></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.value = ['a'];
        await page.waitForChanges();
        const cross = page.root?.shadowRoot?.querySelector('wpp-icon-cross');
        expect(cross?.getAttribute('tabindex')).toBe('-1');
        expect(cross?.getAttribute('aria-disabled')).toBe('true');
      });
    });
    describe('clear icon focus ring', () => {
      it('carries the design-system ring only for keyboard focus', async () => {
        const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.value = ['a'];
        await page.waitForChanges();
        const cross = () => page.root?.shadowRoot?.querySelector('wpp-icon-cross');
        inst.isCrossIconFocused = true;
        inst.focusType = FOCUS_TYPE.MOUSE;
        await page.waitForChanges();
        expect(cross()?.className).not.toContain('tab-focus');
        inst.focusType = FOCUS_TYPE.TAB;
        await page.waitForChanges();
        expect(cross()?.className).toContain('tab-focus');
        // Focus moving off the icon takes the ring with it.
        inst.isCrossIconFocused = false;
        await page.waitForChanges();
        expect(cross()?.className).not.toContain('tab-focus');
      });
    });
    describe('active option highlight', () => {
      const mkHighlighted = async () => {
        const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        const option = page.doc.createElement('div');
        option.classList.add('wpp-list-item-active');
        inst.value = ['a'];
        inst.isDropdownShown = true;
        inst.isFocused = true;
        await page.waitForChanges();
        // Rendering rebuilds the option refs, so hand them over after the last render has run.
        inst.listItemsRefs = [option];
        inst.activeListNdx = 0;
        return { page, inst, option };
      };
      it('is dropped when Tab hands focus to the popup', async () => {
        const { page, inst, option } = await mkHighlighted();
        page.root?.shadowRoot
          ?.querySelector('wpp-input')
          ?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        // Two focus indicators at once otherwise: the highlight here, and the real focus ring
        // wherever Tab has just put focus.
        expect(option.className).not.toContain('wpp-list-item-active');
        expect(inst.activeListNdx).toBeNull();
      });
      it('is dropped when the clear icon takes focus', async () => {
        const { page, inst, option } = await mkHighlighted();
        page.root?.shadowRoot?.querySelector('wpp-icon-cross')?.dispatchEvent(new Event('focus'));
        expect(option.className).not.toContain('wpp-list-item-active');
        expect(inst.activeListNdx).toBeNull();
      });
    });
    describe('create-new row activation', () => {
      it("emits wppCreateNewOption from the list item's own activation event", async () => {
        const page = await mkPage('<wpp-autocomplete show-create-new-element display-btn-when-list-empty="false"></wpp-autocomplete>');
        const inst = page.rootInstance;
        const created = jest.fn();
        page.root?.addEventListener('wppCreateNewOption', created);
        inst.searchText = 'kiwi';
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const row = page.root?.shadowRoot?.querySelector('.wpp-dropdown-actions wpp-list-item');
        expect(row).toBeTruthy();
        // `wpp-list-item` emits this for a click and for Enter/Space alike; it never dispatches a
        // native click, so listening for one left the row unusable from the keyboard.
        row?.dispatchEvent(new CustomEvent('wppChangeListItem', { detail: { value: undefined } }));
        expect(created).toHaveBeenCalledTimes(1);
        expect(created.mock.calls[0][0].detail).toBe('kiwi');
      });
    });
    describe('focus leaving the combobox', () => {
      const mkTrigger = async (html) => {
        const page = await mkPage(html);
        const inst = page.rootInstance;
        inst.isFocused = true;
        await page.waitForChanges();
        const isFieldFocused = () => !!inst.triggerRef?.classList.contains('focused');
        expect(isFieldFocused()).toBe(true);
        return { page, inst, isFieldFocused };
      };
      // The mock document has no FocusEvent constructor that carries `relatedTarget`, so build the
      // event the handler actually reads.
      const focusOut = (from, relatedTarget) => {
        const event = new Event('focusout', { bubbles: true });
        Object.defineProperty(event, 'relatedTarget', { value: relatedTarget });
        return from.dispatchEvent(event);
      };
      it('closes the field when focus reaches the pills rendered outside it', async () => {
        const { page, inst, isFieldFocused } = await mkTrigger('<wpp-autocomplete type="extended" multiple></wpp-autocomplete>');
        inst.extendedSelectedValues = [{ label: 'A', value: 'a' }];
        await page.waitForChanges();
        const pill = page.root?.shadowRoot?.querySelector('.selected-values wpp-pill');
        expect(pill).toBeTruthy();
        focusOut(inst.triggerRef, pill);
        await page.waitForChanges();
        expect(isFieldFocused()).toBe(false);
      });
      it('keeps the field open while focus stays inside the trigger', async () => {
        const { page, inst, isFieldFocused } = await mkTrigger('<wpp-autocomplete multiple></wpp-autocomplete>');
        focusOut(inst.triggerRef, inst.triggerRef.querySelector('wpp-input'));
        await page.waitForChanges();
        expect(isFieldFocused()).toBe(true);
      });
    });
    describe('focus after removing a pill', () => {
      // Covers both places pills are rendered: under the field in `extended` mode, and inside the
      // popup in the default `regular` mode.
      const mkPills = async (mode) => {
        const extended = mode === 'extended';
        const page = await mkPage(extended
          ? '<wpp-autocomplete type="extended" multiple></wpp-autocomplete>'
          : '<wpp-autocomplete multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        if (extended) {
          inst.extendedSelectedValues = [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ];
        }
        else {
          inst.value = ['a', 'b'];
          inst.selectedOptions = [
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
          ];
          inst.isDropdownShown = true;
        }
        await page.waitForChanges();
        const pills = Array.from(page.root?.shadowRoot?.querySelectorAll(extended ? '.selected-values wpp-pill' : '.selected-pills-wrapper wpp-pill') ?? []);
        expect(pills.length).toBe(2);
        const setFocus = jest.spyOn(inst, 'setFocus').mockResolvedValue(undefined);
        return { pills, setFocus };
      };
      const close = (pill, detail) => pill.dispatchEvent(new CustomEvent('wppClose', { detail: detail }));
      it.each(['extended', 'dropdown'])('does not pull focus back to the input after a keyboard removal (%s pills)', async (mode) => {
        const { pills, setFocus } = await mkPills(mode);
        close(pills[0], new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(setFocus).not.toHaveBeenCalled();
      });
      it.each(['extended', 'dropdown'])('returns focus to the input after a pointer removal (%s pills)', async (mode) => {
        const { pills, setFocus } = await mkPills(mode);
        close(pills[0], new MouseEvent('click'));
        expect(setFocus).toHaveBeenCalledTimes(1);
      });
    });
    describe('show more toggle', () => {
      const mkWithPills = async () => {
        const page = await mkPage('<wpp-autocomplete multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.value = ['a', 'b'];
        inst.selectedOptions = [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ];
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const dropdown = inst.dropdownRef;
        const toggle = dropdown.querySelector('[data-testid="wpp-autocomplete-show-btn"]');
        const header = dropdown.querySelector('.header-wrapper');
        expect(toggle).toBeTruthy();
        expect(header).toBeTruthy();
        const setFocus = jest.spyOn(inst, 'setFocus').mockResolvedValue(undefined);
        return { page, inst, toggle, header, setFocus };
      };
      it('leaves focus on the toggle when it is activated', async () => {
        const { page, inst, toggle, setFocus } = await mkWithPills();
        const before = inst.isShowMore;
        toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        expect(inst.isShowMore).toBe(!before);
        // The toggle used to pull focus into the input — both from its own handler and through the
        // pills-area click it bubbles into — so the next activation went to the input instead.
        expect(setFocus).not.toHaveBeenCalled();
      });
      // Show more and Show less are two different buttons in two different containers. Pressing one
      // hides its own container, and the browser blurs an element that becomes visibility:hidden —
      // so without re-homing, focus lands on the body (WPPOPENDS-1496 QA). The press is classified
      // here and consumed by componentDidRender; read it before awaiting, or the render clears it.
      it.each([
        ['keyboard', 0],
        ['pointer', 1],
      ])('records a %s press from the click detail', async (expected, detail) => {
        const { inst, toggle } = await mkWithPills();
        toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, detail }));
        expect(inst.pendingTogglePress).toBe(expected);
      });
      it('clears the recorded press once the counterpart has rendered', async () => {
        const { page, inst, toggle } = await mkWithPills();
        toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));
        await page.waitForChanges();
        expect(inst.pendingTogglePress).toBeNull();
      });
      it('still focuses the field when the pills area itself is clicked', async () => {
        const { page, header, setFocus } = await mkWithPills();
        header.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        expect(setFocus).toHaveBeenCalledTimes(1);
      });
    });
    describe('focus after removing a pill (deferred)', () => {
      const mkThreePills = async () => {
        const page = await mkPage('<wpp-autocomplete type="extended" multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.extendedSelectedValues = [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
        ];
        await page.waitForChanges();
        const pills = Array.from(page.root?.shadowRoot?.querySelectorAll('.selected-values wpp-pill') ?? []);
        expect(pills.length).toBe(3);
        pills.forEach(pill => (pill.setRemoveIconFocus = jest.fn()));
        return { page, inst, pills };
      };
      it('waits for the removal to render before re-homing focus', async () => {
        const { page, inst, pills } = await mkThreePills();
        // Remove the second-to-last pill.
        pills[1].dispatchEvent(new CustomEvent('wppClose', { detail: new KeyboardEvent('keydown', { key: 'Enter' }) }));
        // Acting now would focus the pill that is still on its way out — which is what a frame
        // callback did, leaving focus on a node about to be destroyed.
        expect(pills.some(pill => pill.setRemoveIconFocus.mock.calls.length > 0)).toBe(false);
        inst.extendedSelectedValues = [
          { label: 'A', value: 'a' },
          { label: 'C', value: 'c' },
        ];
        await page.waitForChanges();
        // Index 1 is the surviving pill once the removal has rendered.
        expect(pills[1].setRemoveIconFocus).toHaveBeenCalledTimes(1);
        expect(pills[0].setRemoveIconFocus).not.toHaveBeenCalled();
      });
      it('hands focus back to the field outlined when the last pill goes', async () => {
        const page = await mkPage('<wpp-autocomplete type="extended" multiple></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.extendedSelectedValues = [{ label: 'A', value: 'a' }];
        await page.waitForChanges();
        const pill = page.root?.shadowRoot?.querySelector('.selected-values wpp-pill');
        const setFocus = jest.spyOn(inst, 'setFocus').mockResolvedValue(undefined);
        pill.dispatchEvent(new CustomEvent('wppClose', { detail: new KeyboardEvent('keydown', { key: 'Enter' }) }));
        inst.extendedSelectedValues = [];
        await page.waitForChanges();
        // Outlined, otherwise focus returns to the field with nothing on screen to say so — this
        // path only runs for keyboard removals.
        expect(setFocus).toHaveBeenCalledWith(true);
      });
    });
    describe('listbox children contract', () => {
      it('marks options with aria-selected reflecting the actual selection', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.internalList = mkList([
          { v: 'a', label: 'Apple' },
          { v: 'b', label: 'Banana' },
        ]);
        inst.internalList = inst.internalList.map((item, ndx) => ({ ...item, checked: ndx === 0 }));
        inst.searchText = 'a';
        inst.visibleOptionsLength = 2;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const options = page.root?.shadowRoot?.querySelectorAll('[role="option"]') ?? [];
        expect(options.length).toBe(2);
        expect(options[0].getAttribute('aria-selected')).toBe('true');
        expect(options[1].getAttribute('aria-selected')).toBe('false');
      });
      it('renders the loading row as a disabled option, not a status element inside the listbox', async () => {
        const page = await mkPage('<wpp-autocomplete loading></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
        const loadingRow = listbox?.querySelector('wpp-list-item');
        expect(loadingRow?.getAttribute('role')).toBe('option');
        expect(loadingRow?.getAttribute('aria-disabled')).toBe('true');
        expect(listbox?.querySelector('[role="status"]')).toBeNull();
      });
      // `role="option"`, `tabindex="-1"` and `aria-selected` are declared in JSX and honoured by
      // wpp-list-item (getHostRole/getHostTabIndex), so they no longer need re-asserting.
      it('renders options with the listbox semantics from JSX', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.internalList = mkList([{ v: 'a', label: 'Apple' }]);
        inst.searchText = 'a';
        inst.visibleOptionsLength = 1;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const option = page.root?.shadowRoot?.querySelector('[role="listbox"]')?.querySelector('wpp-list-item');
        expect(option?.getAttribute('role')).toBe('option');
        expect(option?.getAttribute('tabindex')).toBe('-1');
        expect(option?.getAttribute('aria-selected')).toBe('false');
      });
      // A `role="option"` must not contain focusable descendants (WCAG "nested-interactive").
      // Slotted content (e.g. wpp-avatar) can hydrate into a focusable state after render, so the
      // observer pass demotes any interactive descendant it finds.
      it('neutralizes focusable descendants that hydrate inside an option', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.internalList = mkList([{ v: 'a', label: 'Apple' }]);
        inst.searchText = 'a';
        inst.visibleOptionsLength = 1;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        const option = page.root?.shadowRoot?.querySelector('[role="listbox"]')?.querySelector('wpp-list-item');
        const button = document.createElement('button');
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('role', 'button');
        option?.appendChild(button);
        option?.appendChild(link);
        inst.applyOptionSemantics();
        expect(button.getAttribute('tabindex')).toBe('-1');
        expect(link.getAttribute('tabindex')).toBe('-1');
        expect(link.getAttribute('role')).toBe('presentation');
      });
    });
    describe('keyboard highlight visual state', () => {
      it('applies the hover-state class (wpp-list-item-active), not tab-focus, to the highlighted option', async () => {
        const page = await mkPage('<wpp-autocomplete></wpp-autocomplete>');
        const inst = page.rootInstance;
        inst.internalList = mkList([
          { v: 'a', label: 'Apple' },
          { v: 'b', label: 'Banana' },
        ]);
        inst.searchText = 'a';
        inst.visibleOptionsLength = 2;
        inst.isDropdownShown = true;
        await page.waitForChanges();
        inst.setActiveClass('list', null, 1);
        expect(inst.listItemsRefs[1].classList.contains('wpp-list-item-active')).toBe(true);
        expect(inst.listItemsRefs[1].classList.contains('tab-focus')).toBe(false);
        inst.setActiveClass('list', 1, 0);
        expect(inst.listItemsRefs[1].classList.contains('wpp-list-item-active')).toBe(false);
        expect(inst.listItemsRefs[0].classList.contains('wpp-list-item-active')).toBe(true);
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
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppAutocomplete],
        html: `<wpp-autocomplete></wpp-autocomplete>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

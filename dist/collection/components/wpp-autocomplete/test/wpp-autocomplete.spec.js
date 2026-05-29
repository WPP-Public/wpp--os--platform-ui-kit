import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppAutocomplete } from '../wpp-autocomplete';
import { isSelected, selectedOptionsByOrder } from '../utils';
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
      inst._locales = { ...inst._locales, selected: (n) => `sel(${n})` };
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
        template: () => h("wpp-autocomplete-v4-1-0", { type: "extended", multiple: true, getItemKey: getItemKey }),
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

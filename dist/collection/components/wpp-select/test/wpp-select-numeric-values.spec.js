import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { MOCK_NUMERIC_LIST } from './mocks';
describe('wpp-select: multiple mode with numeric values (WPPOPENDS-1317)', () => {
  const renderMultipleSelect = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => (h("wpp-select-v4-1-0", { type: "multiple", withFolder: true, list: props.list ?? MOCK_NUMERIC_LIST, value: props.value ?? [], placeholder: "Choose option", ...props })),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    return page;
  };
  describe('checked state with falsy value 0', () => {
    it('should mark item with value 0 as checked when 0 is in the value array', async () => {
      const page = await renderMultipleSelect({ value: [0] });
      const instance = page.rootInstance;
      const item = instance['internalList'].find(i => i.value === 0);
      expect(item?.checked).toBe(true);
    });
    it('should mark item with value 0 as unchecked when 0 is not in the value array', async () => {
      const page = await renderMultipleSelect({ value: [1, 2] });
      const instance = page.rootInstance;
      const item = instance['internalList'].find(i => i.value === 0);
      expect(item?.checked).toBe(false);
    });
    it('should correctly mark all numeric values including 0 as checked', async () => {
      const page = await renderMultipleSelect({ value: [0, 1, 2] });
      const instance = page.rootInstance;
      instance['internalList'].forEach(item => {
        expect(item.checked).toBe(true);
      });
    });
  });
  describe('toggle logic with falsy value 0', () => {
    it('should add value 0 when clicking an unselected item with value 0', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance['onClickListItemMultiple'](0);
      expect(instance['emittedValue']).toEqual([0]);
    });
    it('should remove value 0 when clicking a selected item with value 0', async () => {
      const page = await renderMultipleSelect({ value: [0, 1] });
      const instance = page.rootInstance;
      instance['onClickListItemMultiple'](0);
      expect(instance['emittedValue']).toEqual([1]);
    });
    it('should toggle value 0 correctly in sequence: add then remove', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      // Add 0
      instance['onClickListItemMultiple'](0);
      expect(instance['emittedValue']).toEqual([0]);
      // Simulate the value being updated
      page.root.value = [0];
      await page.waitForChanges();
      // Remove 0
      instance['onClickListItemMultiple'](0);
      expect(instance['emittedValue']).toEqual([]);
    });
  });
  describe('checkListAgainstValueMultiple with numeric values', () => {
    it('should update checked state correctly when value changes to include 0', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      // Simulate value change to include 0
      page.root.value = [0];
      await page.waitForChanges();
      instance['checkListAgainstValueMultiple']();
      const item = instance['internalList'].find(i => i.value === 0);
      expect(item?.checked).toBe(true);
    });
    it('should update checked state correctly when value changes to exclude 0', async () => {
      const page = await renderMultipleSelect({ value: [0, 1] });
      const instance = page.rootInstance;
      // Simulate value change to exclude 0
      page.root.value = [1];
      await page.waitForChanges();
      instance['checkListAgainstValueMultiple']();
      const item0 = instance['internalList'].find(i => i.value === 0);
      const item1 = instance['internalList'].find(i => i.value === 1);
      expect(item0?.checked).toBe(false);
      expect(item1?.checked).toBe(true);
    });
  });
  describe('mixed value types', () => {
    const MIXED_LIST = [
      { label: 'Zero', value: 0 },
      { label: 'String A', value: 'a' },
      { label: 'One', value: 1 },
      { label: 'String B', value: 'b' },
    ];
    it('should handle mixed numeric and string values correctly', async () => {
      const page = await renderMultipleSelect({ list: MIXED_LIST, value: [0, 'a'] });
      const instance = page.rootInstance;
      const item0 = instance['internalList'].find(i => i.value === 0);
      const itemA = instance['internalList'].find(i => i.value === 'a');
      const item1 = instance['internalList'].find(i => i.value === 1);
      const itemB = instance['internalList'].find(i => i.value === 'b');
      expect(item0?.checked).toBe(true);
      expect(itemA?.checked).toBe(true);
      expect(item1?.checked).toBe(false);
      expect(itemB?.checked).toBe(false);
    });
    it('should toggle numeric value 0 correctly in a mixed-type list', async () => {
      const page = await renderMultipleSelect({ list: MIXED_LIST, value: ['a'] });
      const instance = page.rootInstance;
      instance['onClickListItemMultiple'](0);
      expect(instance['emittedValue']).toEqual(['a', 0]);
    });
  });
  describe('other falsy values', () => {
    const FALSY_LIST = [
      { label: 'Empty String', value: '' },
      { label: 'Zero', value: 0 },
      { label: 'Normal', value: 'abc' },
    ];
    it('should handle empty string value as checked when selected', async () => {
      const page = await renderMultipleSelect({ list: FALSY_LIST, value: [''] });
      const instance = page.rootInstance;
      const itemEmpty = instance['internalList'].find(i => i.value === '');
      const item0 = instance['internalList'].find(i => i.value === 0);
      const itemNormal = instance['internalList'].find(i => i.value === 'abc');
      expect(itemEmpty?.checked).toBe(true);
      expect(item0?.checked).toBe(false);
      expect(itemNormal?.checked).toBe(false);
    });
    it('should toggle empty string value correctly', async () => {
      const page = await renderMultipleSelect({ list: FALSY_LIST, value: [] });
      const instance = page.rootInstance;
      instance['onClickListItemMultiple']('');
      expect(instance['emittedValue']).toEqual(['']);
    });
    it('should handle all falsy values selected simultaneously', async () => {
      const page = await renderMultipleSelect({ list: FALSY_LIST, value: ['', 0] });
      const instance = page.rootInstance;
      const itemEmpty = instance['internalList'].find(i => i.value === '');
      const item0 = instance['internalList'].find(i => i.value === 0);
      const itemNormal = instance['internalList'].find(i => i.value === 'abc');
      expect(itemEmpty?.checked).toBe(true);
      expect(item0?.checked).toBe(true);
      expect(itemNormal?.checked).toBe(false);
    });
  });
});

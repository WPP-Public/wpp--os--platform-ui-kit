import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { MOCK_MULTIPLE_LIST, MOCK_MULTIPLE_LIST_WITH_DISABLED, MOCK_LARGE_LIST } from './mocks';
describe('wpp-select: showSelectAllOption', () => {
  const renderMultipleSelect = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => (h("wpp-select-v3-6-0", { type: "multiple", withFolder: true, showSelectAllOption: true, list: props.list ?? MOCK_MULTIPLE_LIST, value: props.value ?? [], placeholder: "Choose option", ...props })),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    return page;
  };
  describe('visibleItems', () => {
    it('should return all items when no search is active', async () => {
      const page = await renderMultipleSelect();
      const instance = page.rootInstance;
      expect(instance['visibleItems'].length).toBe(MOCK_MULTIPLE_LIST.length);
    });
    it('should return only non-hidden items when search filters some', async () => {
      const page = await renderMultipleSelect();
      const instance = page.rootInstance;
      // Simulate a search that hides some items
      instance['internalList'].forEach(item => {
        item.hidden = !item.label.toLowerCase().includes('option a');
      });
      expect(instance['visibleItems'].length).toBe(1);
      expect(instance['visibleItems'][0].label).toBe('Option A');
    });
  });
  describe('isSelectAllChecked', () => {
    it('should return false when no items are selected', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllChecked']).toBe(false);
    });
    it('should return true when all selectable items are checked', async () => {
      const allValues = MOCK_MULTIPLE_LIST.map(item => item.value);
      const page = await renderMultipleSelect({ value: allValues });
      const instance = page.rootInstance;
      expect(instance['isSelectAllChecked']).toBe(true);
    });
    it('should return true when all non-disabled items are checked (disabled items excluded)', async () => {
      const selectableValues = MOCK_MULTIPLE_LIST_WITH_DISABLED.filter(item => !item.disabled).map(item => item.value);
      const page = await renderMultipleSelect({
        list: MOCK_MULTIPLE_LIST_WITH_DISABLED,
        value: selectableValues,
      });
      const instance = page.rootInstance;
      expect(instance['isSelectAllChecked']).toBe(true);
    });
    it('should return false when only some items are checked', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllChecked']).toBe(false);
    });
    it('should only consider visible items when search is active', async () => {
      const page = await renderMultipleSelect({ value: ['a'] });
      const instance = page.rootInstance;
      // Simulate search filtering to only show Option A
      instance['internalList'].forEach(item => {
        item.hidden = item.value !== 'a';
      });
      expect(instance['isSelectAllChecked']).toBe(true);
    });
  });
  describe('isSelectAllIndeterminate', () => {
    it('should return false when no items are selected', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(false);
    });
    it('should return false when all selectable items are selected', async () => {
      const allValues = MOCK_MULTIPLE_LIST.map(item => item.value);
      const page = await renderMultipleSelect({ value: allValues });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(false);
    });
    it('should return true when some but not all items are selected', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'c'] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(true);
    });
    it('should only consider visible items when search is active', async () => {
      // Select 'a' and 'b', then filter to show only 'a' and 'b'
      const page = await renderMultipleSelect({ value: ['a'] });
      const instance = page.rootInstance;
      // Simulate search filtering to only show Option A and Option B
      instance['internalList'].forEach(item => {
        item.hidden = item.value !== 'a' && item.value !== 'b';
      });
      // 1 of 2 visible items checked -> indeterminate
      expect(instance['isSelectAllIndeterminate']).toBe(true);
    });
  });
  describe('selectAllCount', () => {
    it('should return total count of visible items', async () => {
      const page = await renderMultipleSelect();
      const instance = page.rootInstance;
      expect(instance['selectAllCount']).toBe(MOCK_MULTIPLE_LIST.length);
    });
    it('should return 16 for a large list with no search', async () => {
      const page = await renderMultipleSelect({ list: MOCK_LARGE_LIST });
      const instance = page.rootInstance;
      expect(instance['selectAllCount']).toBe(16);
    });
    it('should return count of visible items when search is active', async () => {
      const page = await renderMultipleSelect();
      const instance = page.rootInstance;
      // Hide 3 items
      instance['internalList'].forEach((item, i) => {
        item.hidden = i >= 2;
      });
      expect(instance['selectAllCount']).toBe(2);
    });
  });
  describe('handleSelectAllToggle', () => {
    it('should select only visible items when none are selected', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      expect(instance['isSelectAllChecked']).toBe(true);
    });
    it('should clear only visible items when all are already selected', async () => {
      const allValues = MOCK_MULTIPLE_LIST.map(item => item.value);
      const page = await renderMultipleSelect({ value: allValues });
      const instance = page.rootInstance;
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      expect(instance['isSelectAllChecked']).toBe(false);
      expect(instance['isSelectAllIndeterminate']).toBe(false);
    });
    it('should select all visible when in indeterminate state (partial selection)', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'c'] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(true);
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      expect(instance['isSelectAllChecked']).toBe(true);
      expect(instance['isSelectAllIndeterminate']).toBe(false);
    });
    it('should not select disabled items when toggling select all', async () => {
      const page = await renderMultipleSelect({
        list: MOCK_MULTIPLE_LIST_WITH_DISABLED,
        value: [],
      });
      const instance = page.rootInstance;
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      // Disabled item 'b' should not be in the value
      const values = instance.value;
      expect(values).not.toContain('b');
      expect(values).toContain('a');
      expect(values).toContain('c');
      expect(values).toContain('d');
      expect(values).toContain('e');
    });
    it('should only toggle visible items when search is active', async () => {
      const page = await renderMultipleSelect({ value: ['c'] });
      const instance = page.rootInstance;
      // Simulate search filtering to show only Option A and Option B
      instance['internalList'].forEach(item => {
        item.hidden = item.value !== 'a' && item.value !== 'b';
      });
      // Select all visible (a, b). 'c' was already checked and hidden, should stay checked.
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      const values = instance.value;
      expect(values).toContain('a');
      expect(values).toContain('b');
      expect(values).toContain('c'); // hidden but previously checked — preserved
    });
    it('should preserve hidden checked items when clearing visible', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b', 'c', 'd', 'e'] });
      const instance = page.rootInstance;
      // Simulate search filtering to show only Option A and Option B
      instance['internalList'].forEach(item => {
        item.hidden = item.value !== 'a' && item.value !== 'b';
      });
      // All visible items are checked → toggle clears only visible
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      const values = instance.value;
      expect(values).not.toContain('a');
      expect(values).not.toContain('b');
      expect(values).toContain('c'); // hidden, stays checked
      expect(values).toContain('d'); // hidden, stays checked
      expect(values).toContain('e'); // hidden, stays checked
    });
  });
  describe('handleApply', () => {
    it('should emit wppApply event and hide the tippy instance', async () => {
      const page = await renderMultipleSelect({ value: ['a'] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      // Mock tippyInstance
      const hideSpy = jest.fn();
      instance.tippyInstance = { hide: hideSpy, state: { isVisible: true, isDestroyed: false } };
      // Listen for wppApply event
      const applySpy = jest.fn();
      page.root?.addEventListener('wppApply', applySpy);
      instance['handleApply']();
      expect(applySpy).toHaveBeenCalledTimes(1);
      expect(hideSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('button click events', () => {
    it('should emit wppApply when clicking Apply button', async () => {
      const page = await renderMultipleSelect({ value: ['a'] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const applySpy = jest.fn();
      page.root?.addEventListener('wppApply', applySpy);
      const buttons = page.root?.shadowRoot?.querySelectorAll('.multiple-select-folder-buttons wpp-action-button');
      const applyButton = buttons?.[1];
      applyButton?.click();
      await page.waitForChanges();
      expect(applySpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppChange when clicking Clear button', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      const buttons = page.root?.shadowRoot?.querySelectorAll('.multiple-select-folder-buttons wpp-action-button');
      const clearButton = buttons?.[0];
      clearButton?.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(instance.value.length).toBe(0);
    });
  });
  describe('rendering', () => {
    it('should render select-all-option inside the scrollable list', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const selectAllSection = page.root?.shadowRoot?.querySelector('.list-scrollable .select-all-section');
      expect(selectAllSection).toBeTruthy();
      const selectAllItem = selectAllSection?.querySelector('wpp-list-item.select-all-item');
      expect(selectAllItem).toBeTruthy();
    });
    it('should not render select-all-option when showSelectAllOption is false', async () => {
      const page = await newSpecPage({
        components: [WppSelect],
        template: () => (h("wpp-select-v3-6-0", { type: "multiple", withFolder: true, list: MOCK_MULTIPLE_LIST, value: [], placeholder: "Choose option" })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const selectAllOption = page.root?.shadowRoot?.querySelector('.select-all-option');
      expect(selectAllOption).toBeFalsy();
    });
    it('should render Clear and Apply buttons when showSelectAllOption is true', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const folderButtons = page.root?.shadowRoot?.querySelectorAll('.multiple-select-folder-buttons wpp-action-button');
      // When showSelectAllOption is true, should have Clear and Apply buttons
      expect(folderButtons?.length).toBe(2);
    });
    it('should render original Select All/Clear All buttons when showSelectAllOption is false', async () => {
      const page = await newSpecPage({
        components: [WppSelect],
        template: () => (h("wpp-select-v3-6-0", { type: "multiple", withFolder: true, list: MOCK_MULTIPLE_LIST, value: ['a', 'b'], placeholder: "Choose option" })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      const selectAllOption = page.root?.shadowRoot?.querySelector('.select-all-option');
      expect(selectAllOption).toBeFalsy();
    });
    it('should disable Clear button when no items are selected', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      // canClearAll should be false when no items checked
      expect(instance.canClearAll).toBe(false);
    });
    it('should enable Clear button when items are selected', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      expect(instance.canClearAll).toBe(true);
    });
  });
  describe('locale customization', () => {
    it('should use custom locale texts for Select All, Clear, and Apply', async () => {
      const page = await newSpecPage({
        components: [WppSelect],
        template: () => (h("wpp-select-v3-6-0", { type: "multiple", withFolder: true, showSelectAllOption: true, list: MOCK_MULTIPLE_LIST, value: [], placeholder: "Choose option", locales: {
            selectAllText: 'Alles auswählen',
            clearText: 'Löschen',
            applyText: 'Anwenden',
          } })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const instance = page.rootInstance;
      expect(instance['_locales'].selectAllText).toBe('Alles auswählen');
      expect(instance['_locales'].clearText).toBe('Löschen');
      expect(instance['_locales'].applyText).toBe('Anwenden');
    });
  });
  describe('pinnedItems', () => {
    const getPinnedFromList = (instance, values) => instance['internalList'].filter(item => values.includes(item.value));
    it('should return empty array when no items are selected', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      expect(instance['pinnedItems']).toEqual([]);
    });
    it('should return empty array when pinnedItems is not populated', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      // pinnedItems is only populated on dropdown open
      expect(instance['pinnedItems']).toEqual([]);
    });
    it('should resolve pinned items from internalList when pinnedItems is set', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      const pinned = instance['pinnedItems'];
      expect(pinned.length).toBe(2);
      expect(pinned[0].label).toBe('Option A');
      expect(pinned[1].label).toBe('Option B');
    });
    it('should capture checked items as pinnedItems on dropdown open', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'c'] });
      const instance = page.rootInstance;
      // Simulate dropdown open
      instance['onShowDropdown']({ popper: { style: {} }, setProps: () => { } });
      expect(instance['pinnedItems'].map(i => i.value)).toEqual(['a', 'c']);
    });
    it('should clear pinnedItems on dropdown close', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      // Simulate open
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      expect(instance['pinnedItems'].length).toBe(2);
      // Simulate close
      instance['onHiddenDropdown']({});
      expect(instance['pinnedItems']).toEqual([]);
    });
    it('should keep deselected items in pinnedItems until dropdown closes', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b', 'c'] });
      const instance = page.rootInstance;
      // Simulate open — captures a, b, c as pinned
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b', 'c']);
      // Simulate deselecting 'b' (value changes but pinnedItems stays)
      instance['internalList'].forEach(item => {
        if (item.value === 'b')
          item.checked = false;
      });
      // pinnedItems should still contain 'b' (same object references)
      expect(instance['pinnedItems'].length).toBe(3);
      // pinnedItems still has all 3, though 'b' is now unchecked (by-reference)
      expect(instance['pinnedItems'][1].label).toBe('Option B');
      expect(instance['pinnedItems'][1].checked).toBe(false);
    });
    it('should not pin items when showSelectAllOption is false', async () => {
      const page = await newSpecPage({
        components: [WppSelect],
        template: () => (h("wpp-select-v3-6-0", { type: "multiple", withFolder: true, list: MOCK_MULTIPLE_LIST, value: ['a', 'b'], placeholder: "Choose option" })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance['onShowDropdown']({ popper: { style: {} }, setProps: () => { } });
      expect(instance['pinnedItems']).toEqual([]);
    });
    it('should render pinned items and remaining items in unified scrollable list', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      // Set pinned items and open
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      instance.isOpen = true;
      await page.waitForChanges();
      const listEl = page.root?.shadowRoot?.querySelector('.list');
      const pinnedItemEls = listEl?.querySelectorAll('.select-all-section wpp-list-item.pinned-item');
      // Direct children of list-scrollable (not inside select-all-section) are remaining items
      const remainingItems = listEl?.querySelectorAll('.list-scrollable > wpp-list-item');
      expect(pinnedItemEls?.length).toBe(2);
      // Pinned items (a, b) are hidden from remaining list, leaving 3 items (c, d, e)
      expect(remainingItems?.length).toBe(3);
    });
    it('should render a single divider between pinned section and scrollable list', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      instance.isOpen = true;
      await page.waitForChanges();
      const section = page.root?.shadowRoot?.querySelector('.select-all-section');
      const dividers = section?.querySelectorAll('wpp-divider');
      // Single divider at the end of select-all-section
      expect(dividers?.length).toBe(1);
    });
    it('should render pinned items inside select-all-section within scrollable list', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b'] });
      const instance = page.rootInstance;
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      instance.isOpen = true;
      await page.waitForChanges();
      const section = page.root?.shadowRoot?.querySelector('.list-scrollable .select-all-section');
      const pinnedRows = section?.querySelectorAll('wpp-list-item.pinned-item');
      expect(pinnedRows?.length).toBe(2);
    });
    it('should render pinned items with correct checked state', async () => {
      const page = await renderMultipleSelect({ value: ['a'] });
      const instance = page.rootInstance;
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b']);
      instance.isOpen = true;
      await page.waitForChanges();
      const pinned = instance['pinnedItems'];
      // 'a' is in value so checked, 'b' is in pinnedItems but not in value
      expect(pinned[0].checked).toBe(true);
      expect(pinned[1].checked).toBe(false);
    });
    it('should NOT render empty state when all items are pinned', async () => {
      const page = await renderMultipleSelect({ value: ['a', 'b', 'c', 'd', 'e'] });
      const instance = page.rootInstance;
      instance['pinnedItems'] = getPinnedFromList(instance, ['a', 'b', 'c', 'd', 'e']);
      instance.isOpen = true;
      await page.waitForChanges();
      const nothingFound = page.root?.shadowRoot?.querySelector('.nothing-found');
      expect(nothingFound).toBeFalsy();
    });
  });
  describe('isSelectAllDisabled', () => {
    it('should return true when all visible items are disabled', async () => {
      const allDisabledList = [
        { label: 'A', value: 'a', disabled: true },
        { label: 'B', value: 'b', disabled: true },
      ];
      const page = await renderMultipleSelect({ list: allDisabledList, value: [] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllDisabled']).toBe(true);
    });
    it('should return false when some visible items are selectable', async () => {
      const page = await renderMultipleSelect({ list: MOCK_MULTIPLE_LIST_WITH_DISABLED, value: [] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllDisabled']).toBe(false);
    });
    it('should return true when search filters to only disabled items', async () => {
      const page = await renderMultipleSelect({ list: MOCK_MULTIPLE_LIST_WITH_DISABLED, value: [] });
      const instance = page.rootInstance;
      // Hide all except disabled item B
      instance['internalList'].forEach(item => {
        item.hidden = item.value !== 'b';
      });
      expect(instance['isSelectAllDisabled']).toBe(true);
    });
  });
  describe('isSelectAllIndeterminate with disabled items', () => {
    it('should return true when only disabled checked items exist and no selectable items are checked', async () => {
      const page = await renderMultipleSelect({ list: MOCK_MULTIPLE_LIST_WITH_DISABLED, value: ['b'] });
      const instance = page.rootInstance;
      // B is disabled and checked via value prop, all others unchecked
      expect(instance['isSelectAllIndeterminate']).toBe(true);
    });
    it('should return false when no items are checked at all', async () => {
      const page = await renderMultipleSelect({ list: MOCK_MULTIPLE_LIST_WITH_DISABLED, value: [] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(false);
    });
    it('should return true when only disabled items are visible and some are checked', async () => {
      const allDisabledList = [
        { label: 'A', value: 'a', disabled: true },
        { label: 'B', value: 'b', disabled: true },
      ];
      const page = await renderMultipleSelect({ list: allDisabledList, value: ['a'] });
      const instance = page.rootInstance;
      expect(instance['isSelectAllIndeterminate']).toBe(true);
    });
  });
  describe('selectAllCount with disabled items', () => {
    it('should exclude disabled items from count', async () => {
      const page = await renderMultipleSelect({ list: MOCK_MULTIPLE_LIST_WITH_DISABLED, value: [] });
      const instance = page.rootInstance;
      // MOCK_MULTIPLE_LIST_WITH_DISABLED has 5 items, 1 disabled → count = 4
      expect(instance['selectAllCount']).toBe(4);
    });
  });
  describe('handleSelectAllToggle with disabled Select All', () => {
    it('should do nothing when all visible items are disabled', async () => {
      const allDisabledList = [
        { label: 'A', value: 'a', disabled: true },
        { label: 'B', value: 'b', disabled: true },
      ];
      const page = await renderMultipleSelect({ list: allDisabledList, value: ['a'] });
      const instance = page.rootInstance;
      const checkedBefore = instance['internalList'].filter(i => i.checked).map(i => i.value);
      instance['handleSelectAllToggle']();
      await page.waitForChanges();
      // Checked state should not have changed
      const checkedAfter = instance['internalList'].filter(i => i.checked).map(i => i.value);
      expect(checkedAfter).toEqual(checkedBefore);
    });
  });
  describe('keyboard accessibility', () => {
    it('should toggle select all when Enter is pressed on the select-all list item', async () => {
      const page = await renderMultipleSelect({ value: [] });
      const instance = page.rootInstance;
      instance.isOpen = true;
      await page.waitForChanges();
      expect(instance['isSelectAllChecked']).toBe(false);
      // Simulate clicking the select-all item (wpp-list-item handles Enter/Space internally)
      const selectAllItem = page.root?.shadowRoot?.querySelector('wpp-list-item.select-all-item');
      expect(selectAllItem).toBeTruthy();
      // wpp-list-item emits wppChangeListItem on click/Enter — simulate that event
      const event = new CustomEvent('wppChangeListItem', { detail: { checked: true }, bubbles: true });
      selectAllItem?.dispatchEvent(event);
      await page.waitForChanges();
      expect(instance['isSelectAllChecked']).toBe(true);
    });
  });
});

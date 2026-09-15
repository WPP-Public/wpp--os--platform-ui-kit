import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSearch } from '../wpp-search';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-search', () => {
  it('should render empty', async () => {
    const page = await newSpecPage({
      components: [WppSearch],
      html: `<wpp-search></wpp-search>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render empty with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppSearch, WppLabel, WppInternalLabel],
      template: () => h("wpp-search-v4-4-0", { labelConfig: labelConfig }),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render with options and form elements', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v4-4-0", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message" }, h("wpp-list-item-v4-4-0", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v4-4-0", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v4-4-0", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v4-4-0", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render with selected values', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v4-4-0", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message", value: [
          { id: 1, label: 'Item 1' },
          { id: 2, label: 'Item 2' },
        ] }, h("wpp-list-item-v4-4-0", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v4-4-0", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v4-4-0", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v4-4-0", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render opened in loading state', async () => {
    const page = await newSpecPage({
      components: [WppSearch, WppListItem],
      template: () => (h("wpp-search-v4-4-0", { name: "test", placeholder: "Select Items", messageType: "warning", message: "Test message", value: [
          { id: 1, label: 'Item 1' },
          { id: 2, label: 'Item 2' },
        ], loading: true }, h("wpp-list-item-v4-4-0", { value: 1, label: 'Item 1' }, h("p", { slot: "label" }, "Item 1")), h("wpp-list-item-v4-4-0", { value: 2, label: 'Item 2' }, h("p", { slot: "label" }, "Item 2")), h("wpp-list-item-v4-4-0", { value: 3, label: 'Item 3' }, h("p", { slot: "label" }, "Item 3")), h("wpp-list-item-v4-4-0", { value: 5, label: 'Item 5' }, h("p", { slot: "label" }, "Item 1"), h("p", { slot: "caption" }, "Caption")))),
    });
    page.root?.querySelector('wpp-search')?.click();
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
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
        components: [WppSearch],
        html: `<wpp-search></wpp-search>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppSearch],
        html: `<wpp-search></wpp-search>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('accessibility', () => {
    const renderWithValue = async (props = {}) => {
      const page = await newSpecPage({
        components: [WppSearch],
        template: () => (h("wpp-search-v4-4-0", { name: "test", value: [{ id: 1, label: 'Item 1' }], ...props }, h("wpp-list-item-v4-4-0", { value: 1, label: 'Item 1' }))),
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();
      const clearIcon = page.root?.shadowRoot?.querySelector('.trigger-actions wpp-icon-cross');
      return { page, instance: page.rootInstance, clearIcon };
    };
    // Focusing the text input is what expands the field. Keying this off the input's own focus
    // handler (rather than probing `shadowRoot.activeElement` from the Host handler) is what keeps
    // the popup opening on click and keeps the clear control from lingering over the open popup.
    describe('expanding on input focus', () => {
      const focusInput = async (page) => {
        page.root?.shadowRoot?.querySelector('input')?.dispatchEvent(new FocusEvent('focus'));
        await page.waitForChanges();
      };
      it('opens the dropdown when the input is focused and a value is selected', async () => {
        const { page } = await renderWithValue();
        await focusInput(page);
        expect(page.root?.shadowRoot?.querySelector('input')?.getAttribute('aria-expanded')).toBe('true');
      });
      it('hides the clear control once the dropdown is open', async () => {
        const { page } = await renderWithValue();
        expect(page.root?.shadowRoot?.querySelector('.trigger-actions wpp-icon-cross')).not.toBeNull();
        await focusInput(page);
        expect(page.root?.shadowRoot?.querySelector('.trigger-actions wpp-icon-cross')).toBeNull();
      });
      it('does not expand when focus enters on the clear control instead of the input', async () => {
        const { page } = await renderWithValue();
        page.root?.dispatchEvent(new FocusEvent('focus'));
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('input')?.getAttribute('aria-expanded')).toBe('false');
        expect(page.root?.shadowRoot?.querySelector('.trigger-actions wpp-icon-cross')).not.toBeNull();
      });
    });
    it('exposes the clear control as an accessible button', async () => {
      const { clearIcon } = await renderWithValue();
      expect(clearIcon).not.toBeNull();
      expect(clearIcon?.getAttribute('role')).toBe('button');
      expect(clearIcon?.getAttribute('aria-label')).toBe('Clear search');
      expect(clearIcon?.getAttribute('tabindex')).toBe('0');
      expect(clearIcon?.getAttribute('aria-disabled')).toBe('false');
    });
    it('honours a custom clearButtonLabel locale', async () => {
      const { clearIcon } = await renderWithValue({ locales: { clearButtonLabel: 'Reset' } });
      expect(clearIcon?.getAttribute('aria-label')).toBe('Reset');
    });
    it('marks the clear control as disabled and removes it from the tab order when disabled', async () => {
      const { clearIcon } = await renderWithValue({ disabled: true });
      expect(clearIcon?.getAttribute('aria-disabled')).toBe('true');
      expect(clearIcon?.getAttribute('tabindex')).toBe('-1');
    });
    it('clears the value when the clear control is activated by keyboard', async () => {
      const { page, instance, clearIcon } = await renderWithValue();
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      clearIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(instance.value).toEqual([]);
      expect(changeSpy).toHaveBeenCalled();
    });
    it('returns focus to the input after the clear control is activated', async () => {
      const { page, instance, clearIcon } = await renderWithValue();
      const focusSpy = jest.spyOn(instance.inputEl, 'focus');
      clearIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalled();
    });
    it('does not clear the value on keyboard activation when disabled', async () => {
      const { page, instance, clearIcon } = await renderWithValue({ disabled: true });
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      clearIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await page.waitForChanges();
      expect(instance.value).toEqual([{ id: 1, label: 'Item 1' }]);
      expect(changeSpy).not.toHaveBeenCalled();
    });
    it('ignores non-activation keys on the clear control', async () => {
      const { page, instance, clearIcon } = await renderWithValue();
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      clearIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      await page.waitForChanges();
      expect(instance.value).toEqual([{ id: 1, label: 'Item 1' }]);
      expect(changeSpy).not.toHaveBeenCalled();
    });
    describe('combobox ARIA pattern', () => {
      const renderEmpty = async () => {
        const page = await newSpecPage({
          components: [WppSearch],
          html: `<wpp-search name="test"></wpp-search>`,
        });
        await page.waitForChanges();
        const input = page.root?.shadowRoot?.querySelector('input');
        const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
        return { page, instance: page.rootInstance, input, listbox };
      };
      // The listbox is only rendered while the popup is open, so tests that inspect it
      // open the dropdown first by focusing and entering a query.
      const renderOpen = async (html = `<wpp-search name="test"></wpp-search>`) => {
        const page = await newSpecPage({ components: [WppSearch], html });
        const instance = page.rootInstance;
        instance.isFocused = true;
        instance.searchValue = 'a';
        await page.waitForChanges();
        const input = page.root?.shadowRoot?.querySelector('input');
        const listbox = page.root?.shadowRoot?.querySelector('[role="listbox"]');
        return { page, instance, input, listbox };
      };
      it('sets role="combobox" on the input', async () => {
        const { input } = await renderEmpty();
        expect(input?.getAttribute('role')).toBe('combobox');
      });
      it('sets aria-haspopup="listbox" on the input', async () => {
        const { input } = await renderEmpty();
        expect(input?.getAttribute('aria-haspopup')).toBe('listbox');
      });
      it('sets aria-autocomplete="list" on the input', async () => {
        const { input } = await renderEmpty();
        expect(input?.getAttribute('aria-autocomplete')).toBe('list');
      });
      it('sets aria-expanded="false" when the dropdown is closed', async () => {
        const { input } = await renderEmpty();
        expect(input?.getAttribute('aria-expanded')).toBe('false');
      });
      it('sets aria-expanded="true" when the dropdown is open', async () => {
        const { page, instance, input } = await renderEmpty();
        instance.isDropdownShown = true;
        await page.waitForChanges();
        expect(input?.getAttribute('aria-expanded')).toBe('true');
      });
      it('wires aria-controls on the input to the listbox id', async () => {
        const { input, listbox } = await renderOpen();
        const controlsId = input?.getAttribute('aria-controls');
        expect(controlsId).toBeTruthy();
        expect(listbox?.getAttribute('id')).toBe(controlsId);
      });
      it('renders the options container with role="listbox"', async () => {
        const { listbox } = await renderOpen();
        expect(listbox).not.toBeNull();
      });
      // An explicit role replaces the input's native semantics, so `required` has to be restated
      // in ARIA. It used to sit on the host, where a roleless element made it inert, and as a bare
      // boolean it serialised to `aria-required=""` — an empty value axe rejects.
      it('states the required flag on the combobox rather than the host', async () => {
        const page = await newSpecPage({
          components: [WppSearch],
          html: `<wpp-search name="test" required></wpp-search>`,
        });
        await page.waitForChanges();
        const input = page.root?.shadowRoot?.querySelector('input');
        expect(input?.getAttribute('aria-required')).toBe('true');
        expect(page.root?.hasAttribute('aria-required')).toBe(false);
      });
      it('omits aria-required entirely when the field is optional', async () => {
        const { input } = await renderEmpty();
        expect(input?.hasAttribute('aria-required')).toBe(false);
      });
      it('gives the listbox an accessible name', async () => {
        const { listbox } = await renderOpen();
        expect(listbox?.getAttribute('aria-label')).toBe('Search results');
      });
      it('does not set aria-activedescendant before the user navigates', async () => {
        const { input } = await renderEmpty();
        expect(input?.hasAttribute('aria-activedescendant')).toBe(false);
      });
      it('marks the listbox busy while loading', async () => {
        const { listbox } = await renderOpen(`<wpp-search name="test" loading></wpp-search>`);
        expect(listbox?.getAttribute('aria-busy')).toBe('true');
      });
    });
    describe('scrollable results region', () => {
      const getList = (page) => page.root?.shadowRoot?.querySelector('.dropdown-list');
      it('is not in the tab order while the dropdown is closed', async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        await page.waitForChanges();
        expect(getList(page)?.getAttribute('tabindex')).toBe('-1');
      });
      it('stays out of the tab order while the results fit without scrolling', async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        instance.isDropdownShown = true;
        await page.waitForChanges();
        // Content that fits (scrollHeight === clientHeight) is not a scrollable region, so it must
        // not add a keyboard tab stop.
        expect(getList(page)?.getAttribute('tabindex')).toBe('-1');
      });
      it('becomes keyboard-focusable when the results overflow and can scroll', async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        instance.isDropdownShown = true;
        await page.waitForChanges();
        const list = getList(page);
        Object.defineProperty(list, 'scrollHeight', { configurable: true, value: 500 });
        Object.defineProperty(list, 'clientHeight', { configurable: true, value: 100 });
        // Re-render so componentDidRender re-measures the (now overflowing) region.
        instance.activeOptionAnnouncement = 'x';
        await page.waitForChanges();
        expect(getList(page)?.getAttribute('tabindex')).toBe('0');
      });
    });
    describe('keyboard selection', () => {
      // The Tippy-driven option pipeline does not run under newSpecPage, so a highlighted option
      // is set up directly to exercise the selection path in isolation.
      const renderWithActiveOption = async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        const option = {
          value: { id: 1, label: 'Aragorn' },
          checked: false,
          disabled: false,
          nonInteractive: false,
          selectable: true,
          setAttribute: jest.fn(),
          classList: { toggle: jest.fn(), remove: jest.fn() },
        };
        instance.shownOptionElements = [option];
        instance.optionElements = [option];
        instance.activeOptionIndex = 0;
        await page.waitForChanges();
        return { page, instance };
      };
      it('commits the highlighted option on Enter, like a pointer selection', async () => {
        const { page, instance } = await renderWithActiveOption();
        const selected = instance.selectActiveOption();
        await page.waitForChanges();
        expect(selected).toBe(true);
        expect(instance.value).toEqual([{ id: 1, label: 'Aragorn' }]);
      });
      it('collapses the field by blurring the input when the value changes', async () => {
        const { page, instance } = await renderWithActiveOption();
        const blurSpy = jest.spyOn(instance.inputEl, 'blur');
        instance.onNextValueChange();
        await page.waitForChanges();
        expect(blurSpy).toHaveBeenCalled();
      });
    });
    // Arrow-key traversal must skip entries Enter would refuse to select, otherwise a disabled
    // option becomes a dead stop that swallows a keypress and announces an unusable item.
    describe('keyboard navigation over disabled options', () => {
      // `getOptionElements` looks up the *versioned* tag (`wpp-list-item-v4-2-0`), which a spec
      // page never renders, so slotted markup can't reach the option set here. Real elements are
      // seeded instead — that keeps `classList` and the live region genuine, which is what the
      // assertions below read.
      const renderWithOptions = async (options) => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        const optionEls = options.map(({ label, disabled = false }, index) => {
          const el = page.doc.createElement('wpp-list-item');
          el.setAttribute('label', label);
          el.value = { id: index + 1, label };
          el.disabled = disabled;
          el.nonInteractive = false;
          el.selectable = true;
          el.scrollIntoView = jest.fn();
          page.root?.appendChild(el);
          return el;
        });
        instance.optionElements = optionEls;
        instance.shownOptionElements = optionEls;
        instance.isFocused = true;
        instance.isDropdownShown = true;
        await page.waitForChanges();
        const input = page.root?.shadowRoot?.querySelector('input');
        const arrow = async (key) => {
          input?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
          await page.waitForChanges();
        };
        // The live region names the highlighted option and its position, so it is the observable
        // proof of where the highlight landed. (The `wpp-list-item-active` class can't be asserted
        // here: the mock DOM's `classList.toggle` ignores its `force` argument and marks every
        // option instead.)
        const announcement = () => page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent;
        return { page, arrow, announcement };
      };
      const withDisabledMiddle = () => renderWithOptions([{ label: 'Item 1' }, { label: 'Item 2', disabled: true }, { label: 'Item 3' }]);
      it('steps over a disabled option when moving down', async () => {
        const { arrow, announcement } = await withDisabledMiddle();
        await arrow('ArrowDown');
        expect(announcement()).toBe('Item 1, 1 of 2');
        await arrow('ArrowDown');
        expect(announcement()).toBe('Item 3, 2 of 2');
      });
      it('steps over a disabled option when moving up', async () => {
        const { arrow, announcement } = await withDisabledMiddle();
        await arrow('ArrowUp');
        expect(announcement()).toBe('Item 3, 2 of 2');
        await arrow('ArrowUp');
        expect(announcement()).toBe('Item 1, 1 of 2');
      });
      it('wraps from the last navigable option back to the first', async () => {
        const { arrow, announcement } = await withDisabledMiddle();
        await arrow('ArrowDown');
        await arrow('ArrowDown');
        await arrow('ArrowDown');
        expect(announcement()).toBe('Item 1, 1 of 2');
      });
      it('leaves the highlight off when every option is disabled', async () => {
        const { arrow, announcement } = await renderWithOptions([
          { label: 'Item 1', disabled: true },
          { label: 'Item 2', disabled: true },
        ]);
        await arrow('ArrowDown');
        expect(announcement()).toBe('');
      });
    });
    describe('dropdown header', () => {
      const openWithHeader = async () => {
        const page = await newSpecPage({
          components: [WppSearch, WppListItem],
          template: () => h("wpp-search-v4-4-0", { locales: { dropdownHeader: 'Suggested results' } }),
        });
        const instance = page.rootInstance;
        instance.isFocused = true;
        instance.searchValue = 'd';
        await page.waitForChanges();
        return page;
      };
      it('keeps the dropdown header out of the tab order', async () => {
        const page = await openWithHeader();
        const header = page.root?.shadowRoot?.querySelector('[part="dropdown-header"]');
        expect(header).not.toBeNull();
        // The header is a label for the results, not one of them. wpp-list-item is a tab stop by
        // default, so without `nonInteractive` keyboard users land on a control that does nothing.
        expect(header?.getAttribute('tabindex')).toBe('-1');
      });
      it('marks the dropdown header non-interactive so it takes no hover or press state', async () => {
        const page = await openWithHeader();
        const header = page.root?.shadowRoot?.querySelector('[part="dropdown-header"]');
        expect(header?.hasAttribute('non-interactive')).toBe(true);
      });
    });
    describe('no results announcement', () => {
      it('announces the nothing-found message through the live region when a query matches nothing', async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        instance.isFocused = true;
        instance.searchValue = 'zzz';
        instance.isEmptyOptions = true;
        await page.waitForChanges();
        const liveRegion = page.root?.shadowRoot?.querySelector('[aria-live="polite"]');
        expect(liveRegion?.textContent).toBe('Nothing found');
      });
      it('does not announce nothing-found while the highlight announcement is active', async () => {
        const page = await newSpecPage({ components: [WppSearch], html: `<wpp-search name="test"></wpp-search>` });
        const instance = page.rootInstance;
        instance.isFocused = true;
        instance.searchValue = 'zzz';
        instance.isEmptyOptions = true;
        instance.activeOptionAnnouncement = 'Aragorn, 1 of 1';
        await page.waitForChanges();
        const liveRegion = page.root?.shadowRoot?.querySelector('[aria-live="polite"]');
        expect(liveRegion?.textContent).toBe('Aragorn, 1 of 1');
      });
    });
  });
});

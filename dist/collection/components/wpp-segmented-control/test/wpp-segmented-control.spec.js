import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSegmentedControl } from '../wpp-segmented-control';
import { WppSegmentedControlItem } from '../components/wpp-segmented-control-item/wpp-segmented-control-item';
import { TEXT_ITEMS_HTML, ICON_ITEMS_HTML, FIVE_ITEMS_WITH_DISABLED_HTML, createKeyboardEvent } from './mocks';
import * as utils from '../../../utils/utils';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-segmented-control', () => {
  // --- Snapshot tests (verify rendered structure with new ARIA roles) ---
  it('should render bar with items text and size m', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="m">
               <wpp-segmented-control-item
                  active
                  value="item-1"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  value="item-2"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  value="item-3"
                >Text</wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render bar with items text and size s and hug content off', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="s" hug-content-off>
               <wpp-segmented-control-item
                  active
                  hug-content-off
                  value="item-1"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  hug-content-off
                  value="item-2"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  hug-content-off
                  value="item-3"
                >Text</wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render item with text', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled item with text and size s', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item disabled size="s" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render checked item with text and size m', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item active size="m" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render item with text and counter', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item counter="2" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render bar with icons and size s', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="s">
               <wpp-segmented-control-item
                  active
                  variant="icon"
                  value="item-1"
                ><wpp-icon-grid-dots></wpp-icon-grid-dots></wpp-segmented-control-item>
                <wpp-segmented-control-item
                  variant="icon"
                  value="item-2"
                ><wpp-icon-list></wpp-icon-list></wpp-segmented-control-item>
                <wpp-segmented-control-item
                  variant="icon"
                  value="item-3"
                ><wpp-icon-addd-document></wpp-icon-addd-document></wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
// --- Accessibility behavioral tests ---
describe('wpp-segmented-control accessibility', () => {
  let page;
  /**
   * Mock transformToVersionedTag to return the tag unchanged.
   * In test env the versioned suffix (e.g. '-v4-0-0') causes querySelectorAll
   * to miss non-versioned DOM elements. Pattern from wpp-floating-toolbar tests.
   */
  let versionTagSpy;
  beforeEach(() => {
    versionTagSpy = jest.spyOn(utils, 'transformToVersionedTag').mockImplementation((tag) => tag);
  });
  afterEach(() => {
    versionTagSpy.mockRestore();
  });
  describe('ARIA roles and attributes', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: TEXT_ITEMS_HTML,
      });
    });
    it('should render tablist role on the wrapper', () => {
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper).not.toBeNull();
    });
    it('should set aria-orientation="horizontal" on the tablist', () => {
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper?.getAttribute('aria-orientation')).toBe('horizontal');
    });
    it('should set default aria-label on the tablist', () => {
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper?.getAttribute('aria-label')).toBe('Segmented Control');
    });
    it('should render role="tab" on each item', () => {
      const items = page.root?.querySelectorAll('wpp-segmented-control-item');
      items?.forEach(item => {
        expect(item.getAttribute('role')).toBe('tab');
      });
    });
    it('should set aria-selected="true" on the active item', () => {
      const activeItem = page.root?.querySelector('wpp-segmented-control-item[value="item-1"]');
      expect(activeItem?.getAttribute('aria-selected')).toBe('true');
    });
    it('should set aria-selected="false" on inactive items', () => {
      const inactiveItem = page.root?.querySelector('wpp-segmented-control-item[value="item-2"]');
      expect(inactiveItem?.getAttribute('aria-selected')).toBe('false');
    });
    it('should set aria-disabled="true" on disabled items', () => {
      const disabledItem = page.root?.querySelector('wpp-segmented-control-item[value="item-3"]');
      expect(disabledItem?.getAttribute('aria-disabled')).toBe('true');
    });
    it('should not set aria-disabled on enabled items', () => {
      const enabledItem = page.root?.querySelector('wpp-segmented-control-item[value="item-2"]');
      expect(enabledItem?.getAttribute('aria-disabled')).toBeNull();
    });
  });
  describe('roving tabindex', () => {
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: TEXT_ITEMS_HTML,
      });
    });
    it('should set tabIndex=0 on the active item', () => {
      const activeItem = page.root?.querySelector('wpp-segmented-control-item[value="item-1"]');
      expect(activeItem?.getAttribute('tabindex')).toBe('0');
    });
    it('should set tabIndex=-1 on inactive items', () => {
      const inactiveItem = page.root?.querySelector('wpp-segmented-control-item[value="item-2"]');
      expect(inactiveItem?.getAttribute('tabindex')).toBe('-1');
    });
    it('should set tabIndex=-1 on disabled items', () => {
      const disabledItem = page.root?.querySelector('wpp-segmented-control-item[value="item-3"]');
      expect(disabledItem?.getAttribute('tabindex')).toBe('-1');
    });
  });
  describe('keyboard navigation', () => {
    const getItemsFromPage = (p) => Array.from(p.root?.querySelectorAll('wpp-segmented-control-item') || []);
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: FIVE_ITEMS_WITH_DISABLED_HTML,
      });
    });
    it('should move focus to the next enabled item on ArrowRight', () => {
      const items = getItemsFromPage(page);
      const activeItem = items[0]; // item-1 (active)
      const focusSpy = jest.spyOn(items[2], 'focus'); // item-3 (next enabled, skipping disabled item-2)
      const event = createKeyboardEvent('ArrowRight');
      Object.defineProperty(event, 'target', { value: activeItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should move focus to the previous enabled item on ArrowLeft', () => {
      const items = getItemsFromPage(page);
      const thirdItem = items[2]; // item-3 (enabled)
      const focusSpy = jest.spyOn(items[0], 'focus'); // item-1 (previous enabled)
      const event = createKeyboardEvent('ArrowLeft');
      Object.defineProperty(event, 'target', { value: thirdItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should wrap focus from last to first enabled item on ArrowRight', () => {
      const items = getItemsFromPage(page);
      const lastEnabledItem = items[4]; // item-5 (last enabled)
      const focusSpy = jest.spyOn(items[0], 'focus'); // item-1 (first enabled)
      const event = createKeyboardEvent('ArrowRight');
      Object.defineProperty(event, 'target', { value: lastEnabledItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should wrap focus from first to last enabled item on ArrowLeft', () => {
      const items = getItemsFromPage(page);
      const firstItem = items[0]; // item-1 (first enabled)
      const focusSpy = jest.spyOn(items[4], 'focus'); // item-5 (last enabled)
      const event = createKeyboardEvent('ArrowLeft');
      Object.defineProperty(event, 'target', { value: firstItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should move focus to the first enabled item on Home', () => {
      const items = getItemsFromPage(page);
      const thirdItem = items[2]; // item-3
      const focusSpy = jest.spyOn(items[0], 'focus'); // item-1 (first enabled)
      const event = createKeyboardEvent('Home');
      Object.defineProperty(event, 'target', { value: thirdItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should move focus to the last enabled item on End', () => {
      const items = getItemsFromPage(page);
      const firstItem = items[0]; // item-1
      const focusSpy = jest.spyOn(items[4], 'focus'); // item-5 (last enabled)
      const event = createKeyboardEvent('End');
      Object.defineProperty(event, 'target', { value: firstItem });
      page.rootInstance.handleKeydown(event);
      expect(focusSpy).toHaveBeenCalled();
    });
    it('should activate the focused item on Enter (keyup)', async () => {
      const items = getItemsFromPage(page);
      const secondEnabledItem = items[2]; // item-3
      const event = createKeyboardEvent('Enter');
      Object.defineProperty(event, 'target', { value: secondEnabledItem });
      page.rootInstance.handleKeyup(event);
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('item-3');
    });
    it('should activate the focused item on Space (keyup)', async () => {
      const items = getItemsFromPage(page);
      const secondEnabledItem = items[2]; // item-3
      const event = createKeyboardEvent(' ');
      Object.defineProperty(event, 'target', { value: secondEnabledItem });
      page.rootInstance.handleKeyup(event);
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('item-3');
    });
    it('should emit wppChange event on keyboard activation', async () => {
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      const items = getItemsFromPage(page);
      const event = createKeyboardEvent('Enter');
      Object.defineProperty(event, 'target', { value: items[2] }); // item-3
      page.rootInstance.handleKeyup(event);
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.mock.calls[0][0].detail).toEqual(expect.objectContaining({ value: 'item-3' }));
    });
    it('should not activate on keydown for Enter/Space (only prevents default)', () => {
      const items = getItemsFromPage(page);
      const originalValue = page.rootInstance.value;
      const enterEvent = createKeyboardEvent('Enter');
      const preventSpy = jest.spyOn(enterEvent, 'preventDefault');
      Object.defineProperty(enterEvent, 'target', { value: items[2] });
      page.rootInstance.handleKeydown(enterEvent);
      expect(preventSpy).toHaveBeenCalled();
      expect(page.rootInstance.value).toBe(originalValue); // value unchanged on keydown
    });
    it('should prevent default on navigation keys', () => {
      const items = getItemsFromPage(page);
      for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End', 'Enter', ' ']) {
        const event = createKeyboardEvent(key);
        const preventSpy = jest.spyOn(event, 'preventDefault');
        Object.defineProperty(event, 'target', { value: items[0] });
        page.rootInstance.handleKeydown(event);
        expect(preventSpy).toHaveBeenCalled();
        preventSpy.mockRestore();
      }
    });
    it('should not respond to keydown from elements outside the component', () => {
      const externalElement = document.createElement('div');
      const event = createKeyboardEvent('ArrowRight');
      Object.defineProperty(event, 'target', { value: externalElement });
      // Should not throw or change focus
      expect(() => page.rootInstance.handleKeydown(event)).not.toThrow();
    });
  });
  describe('item click behavior', () => {
    it('should not emit change event when disabled item is clicked', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: TEXT_ITEMS_HTML,
      });
      const disabledItem = page.root?.querySelector('wpp-segmented-control-item[value="item-3"]');
      const changeSpy = jest.fn();
      page.root?.addEventListener('wppChange', changeSpy);
      expect(disabledItem).not.toBeNull();
      disabledItem.click();
      await page.waitForChanges();
      expect(changeSpy).not.toHaveBeenCalled();
    });
    it('should update value when enabled item emits change event', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: TEXT_ITEMS_HTML,
      });
      // Simulate what happens when an item emits wppChangeSegmentedControlItem
      // Use the parent's listener directly since event propagation in tests is limited
      const mockEvent = { detail: { value: 'item-2' } };
      page.rootInstance.handleChangeSegmentedControlItemClick(mockEvent);
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('item-2');
    });
  });
  describe('aria-label customization', () => {
    it('should use ariaProps.tablist.label when provided', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: `<wpp-segmented-control size="m" value="item-1">
                 <wpp-segmented-control-item value="item-1">Tab 1</wpp-segmented-control-item>
               </wpp-segmented-control>`,
      });
      const segmentedControl = page.root;
      expect(segmentedControl).not.toBeNull();
      if (!segmentedControl) {
        throw new Error('Expected segmented control root element');
      }
      segmentedControl.ariaProps = { tablist: { label: 'View switcher' } };
      await page.waitForChanges();
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper?.getAttribute('aria-label')).toBe('View switcher');
    });
    it('should use locales.tablistLabel as fallback', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: `<wpp-segmented-control size="m" value="item-1">
                 <wpp-segmented-control-item value="item-1">Tab 1</wpp-segmented-control-item>
               </wpp-segmented-control>`,
      });
      const segmentedControl = page.root;
      expect(segmentedControl).not.toBeNull();
      if (!segmentedControl) {
        throw new Error('Expected segmented control root element');
      }
      segmentedControl.locales = { tablistLabel: 'Custom label' };
      await page.waitForChanges();
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper?.getAttribute('aria-label')).toBe('Custom label');
    });
  });
  describe('icon variant accessibility', () => {
    it('should render correct ARIA roles for icon variant', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: ICON_ITEMS_HTML,
      });
      const wrapper = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(wrapper).not.toBeNull();
      const items = page.root?.querySelectorAll('wpp-segmented-control-item');
      items?.forEach(item => {
        expect(item.getAttribute('role')).toBe('tab');
      });
    });
  });
  describe('label association (label-empty fix)', () => {
    it('should render wpp-label with tag="span" to avoid empty label element', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        template: () => (h("wpp-segmented-control-v4-1-0", { size: "m", value: "item-1", labelConfig: { text: 'My Control' } }, h("wpp-segmented-control-item-v4-1-0", { value: "item-1" }, "Tab 1"))),
      });
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      expect(label).not.toBeNull();
      expect(label?.getAttribute('tag')).toBe('span');
    });
    it('should set aria-labelledby on tablist pointing to the label id when labelConfig is present', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        template: () => (h("wpp-segmented-control-v4-1-0", { size: "m", value: "item-1", labelConfig: { text: 'My Control' } }, h("wpp-segmented-control-item-v4-1-0", { value: "item-1" }, "Tab 1"))),
      });
      const tablist = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist?.getAttribute('aria-labelledby')).toBe('segmented-control-label');
      // aria-label should not be set when aria-labelledby is used
      expect(tablist?.getAttribute('aria-label')).toBeNull();
    });
    it('should use default aria-label when no labelConfig is present', async () => {
      page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        html: `<wpp-segmented-control size="m" value="item-1">
                 <wpp-segmented-control-item value="item-1">Tab 1</wpp-segmented-control-item>
               </wpp-segmented-control>`,
      });
      const tablist = page.root?.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist?.getAttribute('aria-label')).toBe('Segmented Control');
      expect(tablist?.getAttribute('aria-labelledby')).toBeNull();
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
        components: [WppSegmentedControl, WppSegmentedControlItem],
        template: () => (h("wpp-segmented-control-v4-1-0", { size: "m", value: "item-1", labelConfig: { text: 'My Control' } }, h("wpp-segmented-control-item-v4-1-0", { value: "item-1" }, "Tab 1"))),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppSegmentedControl, WppSegmentedControlItem],
        template: () => (h("wpp-segmented-control-v4-1-0", { size: "m", value: "item-1", labelConfig: { text: 'My Control' } }, h("wpp-segmented-control-item-v4-1-0", { value: "item-1" }, "Tab 1"))),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

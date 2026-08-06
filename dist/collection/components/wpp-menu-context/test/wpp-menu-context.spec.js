import { newSpecPage } from '@stencil/core/testing';
import { WppMenuContext } from '../wpp-menu-context';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { WppNavigationItem } from '../../wpp-topbar/components/wpp-navigation-item/wpp-navigation-item';
import { CONTEXT_ITEM_TAG, MENU_ITEM, MENU_ROLE, TAB_FOCUS_CLASS } from '../constants';
import { MENU_ITEM_ACTIVE_CLASS } from '../../wpp-list-item/const';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-menu-context', () => {
  it('should render empty context', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext],
      html: `<wpp-menu-context></wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing "handleClick" function', () => {
    let page = undefined;
    let hideMock;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppMenuContext, WppListItem],
        html: `<wpp-menu-context>
      <wpp-button
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
      });
      hideMock = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Test that "handleClick" returns when the dropdown of the menu-context is not visible.', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: false },
          hide: hideMock,
        },
      });
      const event = new CustomEvent('wppChangeListItem', {
        detail: { value: 'option-1' },
      });
      window.dispatchEvent(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
    });
    it('Test that "handleClick" returns when the dropdown is visible, but specific events are fired', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: true },
          hide: hideMock,
        },
      });
      // Defining different types of events we are going to test the function with.
      const selectBasedEvent = new CustomEvent('wppChangeListItem', {
        detail: { isSelectBasedEvent: true },
      });
      selectBasedEvent.composedPath = jest.fn();
      const autocompleteBasedEvent = new CustomEvent('wppChangeListItem', {
        detail: { isAutocompleteBasedEvent: true },
      });
      autocompleteBasedEvent.composedPath = jest.fn();
      window.dispatchEvent(selectBasedEvent);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
      expect(selectBasedEvent.composedPath).not.toHaveBeenCalled();
      window.dispatchEvent(autocompleteBasedEvent);
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
      expect(autocompleteBasedEvent.composedPath).not.toHaveBeenCalled();
    });
    it('Test that the tippy hides when a valid event is fired and the dropdown is visible.', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: true },
          hide: hideMock,
        },
      });
      const event = new CustomEvent('wppChangeListItem', {
        detail: { value: 'option-1' },
      });
      const listItemAttributes = {
        label: 'Option 1',
        tagName: CONTEXT_ITEM_TAG,
        disabled: false,
        role: 'list-item',
      };
      event.composedPath = jest.fn().mockReturnValue([
        {
          ...listItemAttributes,
          getAttribute: jest.fn((key) => key === 'disabled' ? String(listItemAttributes[key]) : listItemAttributes[key]),
        },
      ]);
      window.dispatchEvent(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(event.composedPath).toHaveBeenCalled();
      expect(hideMock).toHaveBeenCalled();
    });
  });
  it('should render context with button', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="parent"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render context item with custom svg and default right icon', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item is-extended="${true}">
        <wpp-icon-plus slot="icon-start"></wpp-icon-plus>
        Item
      </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('sets valid menuitem roles for slotted list items', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item disabled>Disabled item</wpp-list-item>
        <wpp-list-item>Enabled item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const triggerElement = page.root?.querySelector('[slot="trigger-element"]');
    const menu = page.root?.querySelector('ul');
    const items = page.root?.querySelectorAll('wpp-list-item');
    expect(triggerElement?.getAttribute('aria-haspopup')).toBe(MENU_ROLE);
    expect(triggerElement?.getAttribute('aria-expanded')).toBe('false');
    expect(page.root?.querySelector('.trigger-wrapper')?.hasAttribute('aria-expanded')).toBe(false);
    expect(menu?.getAttribute('role')).toBe(MENU_ROLE);
    expect(items?.[0].getAttribute('role')).toBe(MENU_ITEM);
    expect(items?.[0].getAttribute('aria-disabled')).toBe('true');
    expect(items?.[1].getAttribute('role')).toBe(MENU_ITEM);
    expect(items?.[1].hasAttribute('aria-disabled')).toBe(false);
  });
  it('sets submenu trigger ARIA on the nested list item', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-menu-context>
          <wpp-list-item slot="trigger-element">More actions</wpp-list-item>
          <wpp-list-item>Nested item</wpp-list-item>
        </wpp-menu-context>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const nestedMenuContext = page.root?.querySelector('wpp-menu-context');
    const nestedTrigger = nestedMenuContext?.querySelector('[slot="trigger-element"]');
    const nestedTriggerWrapper = nestedMenuContext?.querySelector('.trigger-wrapper');
    expect(nestedTriggerWrapper?.hasAttribute('aria-expanded')).toBe(false);
    expect(nestedTrigger?.getAttribute('role')).toBe(MENU_ITEM);
    expect(nestedTrigger?.getAttribute('aria-haspopup')).toBe(MENU_ROLE);
    expect(nestedTrigger?.getAttribute('aria-expanded')).toBe('false');
  });
  it('should render context be the same width as anchor', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context .is-list-have-trigger-element-width=${true}>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing "handleClickTrigger" function', () => {
    let page = undefined;
    let hideMock;
    let showMock;
    const event = new MouseEvent('click');
    const preventDefaultMock = jest.fn();
    const stopPropagationMock = jest.fn();
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppMenuContext, WppListItem],
        html: `<wpp-menu-context>
      <wpp-button
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
      });
      hideMock = jest.fn();
      showMock = jest.fn();
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isShown: false },
          hide: hideMock,
          show: showMock,
        },
      });
      Object.defineProperty(event, 'preventDefault', {
        value: preventDefaultMock,
      });
      Object.defineProperty(event, 'stopPropagation', {
        value: stopPropagationMock,
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testing that the function prevents default and stops propagation of the event when tippyInstance is hidden', async () => {
      if (!page)
        return;
      page.rootInstance.handleClickTrigger(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
      expect(showMock).toHaveBeenCalledTimes(1);
    });
    it('Test that niether `show` or `hide` are called when the trigger is clicked but is disabled', async () => {
      if (!page)
        return;
      page.rootInstance.triggerElement = document.createElement('button');
      page.rootInstance.triggerElement.setAttribute('disabled', 'true');
      page.rootInstance.handleClickTrigger(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
      expect(showMock).toHaveBeenCalledTimes(0);
      expect(hideMock).toHaveBeenCalledTimes(0);
    });
    it('Test that niether `show` or `hide` are called when the trigger is clicked but isNestedContext is true', async () => {
      if (!page)
        return;
      page.rootInstance.isNestedContext = true;
      page.rootInstance.handleClickTrigger(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(preventDefaultMock).toHaveBeenCalled();
      expect(stopPropagationMock).toHaveBeenCalled();
      expect(showMock).toHaveBeenCalledTimes(0);
      expect(hideMock).toHaveBeenCalledTimes(0);
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
        components: [WppMenuContext],
        html: `<wpp-menu-context></wpp-menu-context>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppMenuContext],
        html: `<wpp-menu-context></wpp-menu-context>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  it('opens from the trigger keyboard action and focuses the first enabled menu item', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item disabled>Disabled item</wpp-list-item>
        <wpp-list-item>First enabled item</wpp-list-item>
        <wpp-list-item>Second enabled item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const items = page.root?.querySelectorAll('wpp-list-item');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    expect(items?.[0].tabIndex).toBe(-1);
    expect(items?.[1].tabIndex).toBe(0);
    expect(items?.[1].classList.contains(TAB_FOCUS_CLASS)).toBe(true);
  });
  it('moves menu focus with arrow keys without focusing disabled items', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item disabled>Disabled item</wpp-list-item>
        <wpp-list-item>First enabled item</wpp-list-item>
        <wpp-list-item>Second enabled item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const items = page.root?.querySelectorAll('wpp-list-item');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    items?.[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(items?.[1].tabIndex).toBe(-1);
    expect(items?.[1].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    expect(items?.[2].tabIndex).toBe(0);
    expect(items?.[2].classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    items?.[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(items?.[1].tabIndex).toBe(0);
    expect(items?.[1].classList.contains(TAB_FOCUS_CLASS)).toBe(true);
  });
  it('keeps active state while Enter is held and activates the item on keyup', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item value="first-item">First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    const changeSpy = jest.fn();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const item = page.root?.querySelector('wpp-list-item');
    item?.addEventListener('wppChangeListItem', changeSpy);
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    expect(changeSpy).not.toHaveBeenCalled();
    item?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(item?.classList.contains(MENU_ITEM_ACTIVE_CLASS)).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(item?.classList.contains(MENU_ITEM_ACTIVE_CLASS)).toBe(false);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    item?.removeEventListener('wppChangeListItem', changeSpy);
  });
  it('keeps the menu open after opening from the trigger Space key release', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item value="first-item">First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    const changeSpy = jest.fn();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const item = page.root?.querySelector('wpp-list-item');
    item?.addEventListener('wppChangeListItem', changeSpy);
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    expect(item?.tabIndex).toBe(0);
    expect(item?.classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    expect(changeSpy).not.toHaveBeenCalled();
    item?.removeEventListener('wppChangeListItem', changeSpy);
  });
  it('closes with Escape and restores focus to the trigger', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item>First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const item = page.root?.querySelector('wpp-list-item');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    item?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(item?.classList.contains(TAB_FOCUS_CLASS)).toBe(false);
  });
  it('restores focus through the trigger component so its keyboard focus ring comes back', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <wpp-button slot="trigger-element">Open menu</wpp-button>
        <wpp-list-item>First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const setFocus = jest.fn().mockResolvedValue(undefined);
    const innerFocus = jest.fn();
    // A component trigger such as wpp-button holds the real control in its shadow
    // root and only paints its keyboard focus ring from setFocus, so focus has to
    // be restored on the host rather than on the inner control.
    Object.assign(trigger, { setFocus });
    const innerButton = page.doc.createElement('button');
    innerButton.focus = innerFocus;
    trigger?.attachShadow({ mode: 'open' }).appendChild(innerButton);
    Object.defineProperty(page.doc, 'activeElement', { value: innerButton, configurable: true });
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // The menu has recorded the focused control by now; reset the stub so it does not
    // leak into the following specs.
    Object.defineProperty(page.doc, 'activeElement', { value: undefined, configurable: true });
    const item = page.root?.querySelector('wpp-list-item');
    item?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(setFocus).toHaveBeenCalledTimes(1);
    expect(innerFocus).not.toHaveBeenCalled();
  });
  it('closes with Tab and Shift Tab when focus is inside the menu', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item>First item</wpp-list-item>
        <wpp-list-item>Second item</wpp-list-item>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const items = page.root?.querySelectorAll('wpp-list-item');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    items?.[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(items?.[0].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    items?.[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(items?.[0].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
  });
  it('opens a nested menu context with the keyboard and focuses the first nested item', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item>First item</wpp-list-item>
        <wpp-menu-context>
          <wpp-list-item slot="trigger-element">More actions</wpp-list-item>
          <wpp-list-item>Nested first item</wpp-list-item>
        </wpp-menu-context>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('button[slot="trigger-element"]');
    const firstItem = page.root?.querySelector('wpp-list-item:not([slot])');
    const nestedMenu = page.root?.querySelector('wpp-menu-context');
    const nestedTrigger = nestedMenu?.querySelector('[slot="trigger-element"]');
    const nestedItem = nestedMenu?.querySelector('wpp-list-item:not([slot])');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    firstItem?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    firstItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(nestedTrigger?.tabIndex).toBe(0);
    expect(nestedTrigger?.classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    const nestedLifecycle = nestedMenu;
    nestedLifecycle.disconnectedCallback?.();
    nestedLifecycle.connectedCallback?.();
    nestedTrigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(nestedTrigger?.getAttribute('aria-expanded')).toBe('true');
    expect(nestedItem?.tabIndex).toBe(0);
    expect(nestedItem?.classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    // The parent submenu trigger must drop its focus ring once focus enters the
    // submenu so only the currently focused item is highlighted.
    expect(nestedTrigger?.classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    nestedItem?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(nestedTrigger?.getAttribute('aria-expanded')).toBe('false');
    expect(nestedTrigger?.tabIndex).toBe(0);
    expect(nestedTrigger?.classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    // Closing the submenu restores focus, and the ring, to the parent trigger.
    expect(nestedItem?.classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    const rootMenuContext = page.root;
    rootMenuContext.updateMenuAccessibility?.();
    expect(nestedTrigger?.tabIndex).toBe(0);
  });
  it('activates topbar navigation items from the keyboard through their link', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppNavigationItem],
      html: `<wpp-menu-context>
        <wpp-navigation-item slot="trigger-element" extended label="Learning"></wpp-navigation-item>
        <div>
          <wpp-navigation-item nested-item label="Guided tour" value="guided-tour"></wpp-navigation-item>
        </div>
      </wpp-menu-context>`,
    });
    const navChangeSpy = jest.fn();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const item = page.root?.querySelector('wpp-navigation-item:not([slot])');
    item?.addEventListener('wppActiveNavItemChanged', navChangeSpy);
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    // Releasing the Enter that opened the menu must not activate the item.
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(navChangeSpy).not.toHaveBeenCalled();
    // Navigation items are selected through their inner link click handler,
    // not through wppChangeListItem, so keyboard activation must click the link.
    item?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(navChangeSpy).toHaveBeenCalledTimes(1);
    expect(navChangeSpy.mock.calls[0][0].detail).toEqual({
      path: undefined,
      value: 'guided-tour',
      label: 'Guided tour',
    });
    item?.removeEventListener('wppActiveNavItemChanged', navChangeSpy);
  });
  // WPPOPENDS-1482 follow-up: a native-link list item (linkConfig.href) navigates through its
  // own inner anchor. Keyboard activation must click that anchor — mirroring the mouse — rather
  // than dispatch wppChangeListItem itself, which would navigate nothing.
  it('activates a native-link list item from the keyboard through its inner anchor, once', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item value="first-item">First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    const item = page.root?.querySelector('wpp-list-item');
    item.linkConfig = { href: '/target' };
    await page.waitForChanges();
    const anchor = item.shadowRoot.querySelector('a.item');
    const anchorClickSpy = jest.fn((event) => event.preventDefault()); // suppress jsdom navigation
    anchor.addEventListener('click', anchorClickSpy);
    const changeSpy = jest.fn();
    item.addEventListener('wppChangeListItem', changeSpy);
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // Consume the guard keyup that follows opening with Enter.
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    item?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    item?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // The anchor is clicked exactly once; its click bubbles to the list item, which emits
    // wppChangeListItem exactly once — no double emit, identical to a mouse click.
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    anchor.removeEventListener('click', anchorClickSpy);
    item.removeEventListener('wppChangeListItem', changeSpy);
  });
  it('moves the keyboard highlight between navigation items without leaving stale classes', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppNavigationItem],
      html: `<wpp-menu-context>
        <wpp-navigation-item slot="trigger-element" extended label="Learning"></wpp-navigation-item>
        <div>
          <wpp-navigation-item nested-item label="Guided tour" value="guided-tour"></wpp-navigation-item>
          <wpp-navigation-item nested-item label="Case studies" value="case-studies"></wpp-navigation-item>
        </div>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const trigger = page.root?.querySelector('[slot="trigger-element"]');
    const items = page.root?.querySelectorAll('wpp-navigation-item:not([slot])');
    trigger?.focus();
    trigger?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(items?.[0].classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    // Release the Enter that opened the menu (swallowed by the menu).
    items?.[0].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    // The highlight follows the arrow keys; the previous item must lose it,
    // otherwise every visited item keeps a focus ring.
    items?.[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(items?.[0].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    expect(items?.[1].classList.contains(TAB_FOCUS_CLASS)).toBe(true);
    // Held Enter marks only the pressed item, released Enter clears it.
    items?.[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await page.waitForChanges();
    expect(items?.[1].classList.contains(MENU_ITEM_ACTIVE_CLASS)).toBe(true);
    items?.[1].dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(items?.[1].classList.contains(MENU_ITEM_ACTIVE_CLASS)).toBe(false);
    // Closing the menu clears the highlight from navigation items too.
    items?.[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(items?.[0].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
    expect(items?.[1].classList.contains(TAB_FOCUS_CLASS)).toBe(false);
  });
  it('keeps composed tippy handlers when dropdownConfig changes', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
        <button slot="trigger-element">Open menu</button>
        <wpp-list-item>First item</wpp-list-item>
      </wpp-menu-context>`,
    });
    const consumerOnHide = jest.fn();
    const setPropsMock = jest.fn();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const menu = page.root;
    const instance = page.rootInstance;
    Object.defineProperty(page.rootInstance, 'tippyInstance', {
      value: { state: { isVisible: false }, setProps: setPropsMock },
    });
    // A parent re-render (e.g. wpp-topbar-item toggling menuExpanded) passes a
    // fresh config object each render. The watcher must not hand the raw
    // consumer callbacks to Tippy — that would drop the menu's own ARIA and
    // focus lifecycle handling (trigger aria-expanded, focus restore).
    menu.dropdownConfig = { onHide: consumerOnHide };
    await page.waitForChanges();
    expect(setPropsMock).toHaveBeenCalledTimes(1);
    const appliedProps = setPropsMock.mock.calls[0][0];
    expect(appliedProps.onMount).toBe(instance.handleTippyMount);
    expect(appliedProps.onShow).toBe(instance.handleTippyShow);
    expect(appliedProps.onHide).toBe(instance.handleTippyHide);
    expect(appliedProps.onHidden).toBe(instance.handleTippyHidden);
    expect(appliedProps.aria).toEqual({ expanded: undefined });
    expect(appliedProps.role).toBe('');
    // The consumer callback is still honored through the composed handler.
    expect(instance.dropdownConfig.onHide).toBe(consumerOnHide);
    instance.handleTippyHide();
    expect(consumerOnHide).toHaveBeenCalled();
  });
});

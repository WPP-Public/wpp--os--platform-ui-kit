import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppPopover } from '../wpp-popover';
import { DEFAULT_POPOVER_LOCALES } from '../config';
import * as themeUtils from '../../../utils/subscribe-to-theme';
const DEFAULT_TRIGGER = `<button slot='trigger-element'>Trigger Button</button>`;
// The dropdown instance is created on the next tick after the component loads
const waitForDropdown = async (page) => {
  await new Promise(resolve => setTimeout(resolve, 0));
  await page.waitForChanges();
};
const createPage = async (html) => {
  const page = await newSpecPage({ components: [WppPopover], html });
  await waitForDropdown(page);
  return page;
};
// Renders a popover with a mocked, open dropdown instance
const setup = async (triggerHtml = DEFAULT_TRIGGER, attributes = '') => {
  const page = await createPage(`<wpp-popover ${attributes}>
                                   ${triggerHtml}
                                   <div>
                                     <button>Popover control</button>
                                   </div>
                                 </wpp-popover>`);
  const hide = jest.fn();
  const instance = page.rootInstance;
  instance.tippyInstance = { state: { isShown: true, isVisible: true }, hide };
  const trigger = page.root?.querySelector('[slot="trigger-element"]');
  const focusSpy = jest.spyOn(trigger, 'focus');
  const sentinels = Array.from(page.root?.shadowRoot?.querySelectorAll('.wpp-popover-focus-sentinel') || []);
  const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
  const popoverControl = contentEl.querySelector('button');
  const setActiveElement = (element) => Object.defineProperty(page.doc, 'activeElement', { value: element, configurable: true });
  return { page, instance, hide, trigger, focusSpy, sentinels, contentEl, popoverControl, setActiveElement };
};
const createKeyEvent = (key, target) => ({
  key,
  shiftKey: false,
  target,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});
// A real keydown reaching the anchor's listener. Stencil's mock DOM neither propagates events from a slotted node
// through its slot nor keeps their target, so the event is dispatched on the anchor with the focused element as target.
const pressKeyOnAnchor = (page, key, focusedElement, shiftKey = false) => {
  const anchor = page.root.shadowRoot.querySelector('.anchor');
  const event = new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, composed: true, cancelable: true });
  const preventDefault = jest.spyOn(event, 'preventDefault');
  const stopPropagation = jest.spyOn(event, 'stopPropagation');
  Object.defineProperty(event, 'shiftKey', { value: shiftKey });
  Object.defineProperty(event, 'target', { get: () => focusedElement, set: () => undefined });
  anchor.dispatchEvent(event);
  return { preventDefault, stopPropagation };
};
const pressTab = (page, focusedElement, shiftKey = false) => pressKeyOnAnchor(page, 'Tab', focusedElement, shiftKey).preventDefault;
// Mirrors tippy: `onHide` runs synchronously inside `hide()`, which is a no-op once the dropdown is hiding
const mockTippyHideLifecycle = (instance, popperElements) => {
  let isVisible = true;
  const tippyInstance = {
    popper: { contains: (node) => popperElements.includes(node) },
    state: {
      get isShown() {
        return isVisible;
      },
      get isVisible() {
        return isVisible;
      },
    },
    hide: () => {
      if (!isVisible)
        return;
      if (instance.getTippyLifecycleCallbacks().onHide(tippyInstance) === false)
        return;
      isVisible = false;
    },
  };
  instance.tippyInstance = tippyInstance;
  const outsideElement = document.createElement('div');
  const clickOutside = () => instance
    .getTippyLifecycleCallbacks()
    .onClickOutside(tippyInstance, { target: outsideElement, composedPath: () => [outsideElement] });
  const reopen = () => {
    isVisible = true;
  };
  return { clickOutside, reopen };
};
describe('wpp-popover', () => {
  describe('Testing component creation and default values', () => {
    it('should create the component', async () => {
      const { page } = await setup();
      expect(page.root).toBeTruthy();
      expect(page.rootInstance).toBeInstanceOf(WppPopover);
    });
    it('should have the default property values', async () => {
      const { instance } = await setup();
      expect(instance.config).toEqual({});
      expect(instance.shouldCloseOnOutsideClick(new Event('click'))).toBe(true);
      expect(instance.closable).toBe(false);
      expect(instance.withSearch).toBe(false);
      expect(instance.searchValue).toBe('');
      expect(instance.searchName).toBe('');
      expect(instance.persistantSearch).toBe(false);
      expect(instance.externalClass).toBe('');
      expect(instance.dropdownWidth).toBe('auto');
      expect(instance.ariaProps).toEqual({ role: 'dialog', label: 'Popover' });
      expect(instance.locales).toEqual({});
      expect(instance.showClearButton).toBe(false);
    });
    it('should use the default search name when none is provided', async () => {
      const { instance } = await setup();
      expect(instance.internalSearchName).toBe('wpp-popover-search');
    });
    it('should use the provided search name', async () => {
      const { instance } = await setup(DEFAULT_TRIGGER, `search-name='custom-search'`);
      expect(instance.internalSearchName).toBe('custom-search');
    });
  });
  describe('Testing Watchers', () => {
    it('should update the dropdown with the new config and keep the lifecycle callbacks', async () => {
      const { page, instance } = await setup();
      const setProps = jest.fn();
      const newConfig = { placement: 'top' };
      instance.tippyInstance = { setProps };
      page.root.config = newConfig;
      await page.waitForChanges();
      expect(instance.config).toEqual(newConfig);
      expect(setProps).toHaveBeenCalledTimes(1);
      const props = setProps.mock.calls[0][0];
      expect(props.placement).toBe('top');
      ['onClickOutside', 'onTrigger', 'onShow', 'onShown', 'onHide', 'onHidden'].forEach(callback => expect(typeof props[callback]).toBe('function'));
    });
    it('should not update the dropdown when the config did not change', async () => {
      const { instance } = await setup();
      const setProps = jest.fn();
      instance.tippyInstance = { setProps };
      instance.updateConfig({ placement: 'top' }, { placement: 'top' });
      expect(setProps).not.toHaveBeenCalled();
    });
    it('should retain onShown handling after config updates', async () => {
      const { instance } = await setup(`<wpp-button slot='trigger-element'>Trigger Button</wpp-button>`);
      const onShown = jest.fn();
      const focus = jest.fn();
      const setProps = jest.fn();
      instance.contentEl = { focus };
      instance.tippyInstance = { setProps };
      instance.updateConfig({ onShown }, {});
      const updatedOnShown = setProps.mock.calls[0][0].onShown;
      updatedOnShown({});
      updatedOnShown({});
      expect(focus).toHaveBeenCalledTimes(2);
      expect(onShown).toHaveBeenCalledTimes(2);
    });
  });
  describe('Testing lifecycle methods', () => {
    it('should show the content once the dropdown is created', async () => {
      const { contentEl } = await setup();
      expect(contentEl.classList.contains('wpp-hidden')).toBe(false);
    });
    it('should move default content before footer and named actions into footer actions', async () => {
      const page = await createPage(`<wpp-popover show-clear-button>
                                       <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                                       <div data-testid='popover-content'>Content</div>
                                       <wpp-action-button slot='actions'>Apply</wpp-action-button>
                                     </wpp-popover>`);
      const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
      const defaultContent = contentEl?.querySelector('[data-testid="popover-content"]');
      const footer = contentEl?.querySelector('.wpp-popover-footer');
      const footerActions = footer?.querySelector('.wpp-popover-footer-actions');
      expect(defaultContent).toBeTruthy();
      expect(footer).toBeTruthy();
      expect(Array.from(contentEl?.children || []).indexOf(defaultContent)).toBeLessThan(Array.from(contentEl?.children || []).indexOf(footer));
      expect(Array.from(footerActions?.querySelectorAll('[slot="actions"]') || []).map(action => action.textContent)).toEqual(['Apply']);
    });
    it('should observe the trigger-element node even when light DOM children are reordered', async () => {
      const originalMutationObserver = global.MutationObserver;
      const observeSpy = jest.fn();
      const disconnectSpy = jest.fn();
      class MutationObserverMock {
        constructor(callback) {
          this.disconnect = disconnectSpy;
          this.observe = observeSpy;
          this.takeRecords = () => [];
          void callback;
        }
      }
      global.MutationObserver = MutationObserverMock;
      try {
        const page = await createPage(`<wpp-popover show-clear-button>
                                         <wpp-action-button slot='actions'>Apply</wpp-action-button>
                                         <div data-testid='popover-content'>Content</div>
                                         <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                                       </wpp-popover>`);
        const triggerElement = page.root?.querySelector('[slot="trigger-element"]');
        expect(observeSpy).toHaveBeenCalledWith(triggerElement, { attributes: true });
      }
      finally {
        global.MutationObserver = originalMutationObserver;
      }
    });
    it('should destroy the dropdown and stop observing when disconnected', async () => {
      const { page, instance } = await setup();
      const destroy = jest.fn();
      const disconnect = jest.fn();
      instance.tippyInstance = { destroy, state: {} };
      instance.mutationObserver = { disconnect };
      page.root?.remove();
      expect(destroy).toHaveBeenCalledTimes(1);
      expect(disconnect).toHaveBeenCalled();
    });
    it('should recreate a destroyed dropdown when connected again', async () => {
      const { instance } = await setup();
      const createTippyInstance = jest.fn();
      instance.createTippyInstance = createTippyInstance;
      instance.tippyInstance = { state: { isDestroyed: true } };
      instance.connectedCallback();
      expect(createTippyInstance).toHaveBeenCalledTimes(1);
    });
    it('should not recreate a dropdown that is still alive when connected again', async () => {
      const { instance } = await setup();
      const createTippyInstance = jest.fn();
      instance.createTippyInstance = createTippyInstance;
      instance.tippyInstance = { state: { isDestroyed: false } };
      instance.connectedCallback();
      expect(createTippyInstance).not.toHaveBeenCalled();
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
      it('should subscribe to theme changes when it connects and loads', async () => {
        await newSpecPage({
          components: [WppPopover],
          html: `<wpp-popover>
                 <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                 <div>
                   <wpp-typography>Some content inside popover</wpp-typography>
                   <wpp-action-button>Content Button</wpp-action-button>
                 </div>
               </wpp-popover>`,
        });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mockStart).toHaveBeenCalledTimes(2);
      });
      it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
        const page = await newSpecPage({
          components: [WppPopover],
          html: `<wpp-popover>
                 <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                 <div>
                   <wpp-typography>Some content inside popover</wpp-typography>
                   <wpp-action-button>Content Button</wpp-action-button>
                 </div>
               </wpp-popover>`,
        });
        await new Promise(resolve => setTimeout(resolve, 0));
        page.root?.remove();
        expect(mockStop).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Testing public methods', () => {
    it('should hide the dropdown when closePopover is called', async () => {
      const { page, hide } = await setup();
      await page.root?.closePopover();
      expect(hide).toHaveBeenCalledTimes(1);
    });
    it('should show the dropdown on the next tick when openPopover is called', async () => {
      const { page, instance } = await setup();
      const show = jest.fn();
      instance.tippyInstance = { show };
      await page.root?.openPopover();
      expect(show).not.toHaveBeenCalled();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(show).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing dropdown lifecycle callbacks', () => {
    it('should not show the dropdown when the trigger has a disabled class', async () => {
      const { instance } = await setup(`<button slot='trigger-element' class='disabled'>Trigger Button</button>`);
      expect(instance.getTippyLifecycleCallbacks().onShow({})).toBe(false);
    });
    it('should show the dropdown when the trigger has disabled="false"', async () => {
      const { instance, trigger } = await setup(`<button slot='trigger-element' disabled='false'>Trigger</button>`);
      expect(instance.getTippyLifecycleCallbacks().onShow({})).toBeUndefined();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
    it('should not show the dropdown when there is no trigger', async () => {
      const page = await createPage(`<wpp-popover><div>Content</div></wpp-popover>`);
      expect(page.rootInstance.getTippyLifecycleCallbacks().onShow({})).toBe(false);
    });
    it('should apply a custom dropdown width when showing', async () => {
      const { instance } = await setup(DEFAULT_TRIGGER, `dropdown-width='240px'`);
      const popper = { style: {} };
      instance.getTippyLifecycleCallbacks().onShow({ popper });
      expect(popper.style.width).toBe('240px');
    });
    it('should call the consumer onShow, onShown and onHidden callbacks', async () => {
      const { instance } = await setup();
      const onShow = jest.fn();
      const onShown = jest.fn();
      const onHidden = jest.fn();
      const tippyInstance = { popper: { contains: () => false } };
      instance.config = { onShow, onShown, onHidden };
      const callbacks = instance.getTippyLifecycleCallbacks();
      callbacks.onShow(tippyInstance);
      callbacks.onShown(tippyInstance);
      callbacks.onHidden(tippyInstance);
      expect(onShow).toHaveBeenCalledWith(tippyInstance);
      expect(onShown).toHaveBeenCalledWith(tippyInstance);
      expect(onHidden).toHaveBeenCalledWith(tippyInstance);
    });
    it('should clear the search value once hidden', async () => {
      const { page, instance } = await setup(DEFAULT_TRIGGER, 'with-search');
      const searchChangeSpy = jest.fn();
      page.root?.addEventListener('wppSearchChange', searchChangeSpy);
      instance.getTippyLifecycleCallbacks().onHidden({});
      expect(searchChangeSpy).toHaveBeenCalledTimes(1);
      expect(searchChangeSpy.mock.calls[0][0].detail).toEqual({ name: 'wpp-popover-search', value: '' });
    });
    it('should keep the search value once hidden when the search is persistent', async () => {
      const { page, instance } = await setup(DEFAULT_TRIGGER, 'with-search persistant-search');
      const searchChangeSpy = jest.fn();
      page.root?.addEventListener('wppSearchChange', searchChangeSpy);
      instance.getTippyLifecycleCallbacks().onHidden({});
      expect(searchChangeSpy).not.toHaveBeenCalled();
    });
    describe('clicking outside', () => {
      const clickOn = (instance, target) => instance.getTippyLifecycleCallbacks().onClickOutside({}, { target, composedPath: () => [target] });
      it('should close the dropdown and call the consumer onClickOutside', async () => {
        const { instance, hide } = await setup();
        const onClickOutside = jest.fn();
        const target = document.createElement('div');
        instance.config = { onClickOutside };
        clickOn(instance, target);
        expect(hide).toHaveBeenCalledTimes(1);
        expect(onClickOutside).toHaveBeenCalledWith({}, expect.objectContaining({ target }));
      });
      it('should ignore clicks inside the popover', async () => {
        const { instance, hide, trigger } = await setup();
        const onClickOutside = jest.fn();
        instance.config = { onClickOutside };
        clickOn(instance, trigger);
        expect(hide).not.toHaveBeenCalled();
        expect(onClickOutside).not.toHaveBeenCalled();
      });
      it('should ignore clicks inside other dropdowns', async () => {
        const { instance, hide } = await setup();
        const otherDropdown = document.createElement('div');
        const target = document.createElement('button');
        otherDropdown.id = 'tippy-42';
        otherDropdown.appendChild(target);
        clickOn(instance, target);
        expect(hide).not.toHaveBeenCalled();
      });
      it('should keep the dropdown open when shouldCloseOnOutsideClick returns false', async () => {
        const { page, instance, hide } = await setup();
        const onClickOutside = jest.fn();
        page.root.shouldCloseOnOutsideClick = () => false;
        await page.waitForChanges();
        instance.config = { onClickOutside };
        clickOn(instance, document.createElement('div'));
        expect(hide).not.toHaveBeenCalled();
        expect(instance.hasClickedOutside).toBe(false);
        expect(onClickOutside).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Testing functionality', () => {
    it('should render optional left clear action and emit wppClear when clicked', async () => {
      const page = await createPage(`<wpp-popover show-clear-button>
                                       <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                                       <div>
                                         <wpp-typography>Some content inside popover</wpp-typography>
                                       </div>
                                       <wpp-action-button slot='actions'>Apply</wpp-action-button>
                                     </wpp-popover>`);
      const clearSpy = jest.fn();
      page.root?.addEventListener('wppClear', clearSpy);
      const footer = page.root?.shadowRoot?.querySelector('.wpp-popover-footer');
      const clearButton = footer?.querySelector('.wpp-popover-clear-action wpp-action-button');
      const actionsSlot = footer?.querySelector('slot[name="actions"]');
      expect(footer).toBeTruthy();
      expect(clearButton?.textContent?.trim()).toBe('Clear');
      expect(actionsSlot).toBeTruthy();
      clearButton.click();
      await page.waitForChanges();
      expect(clearSpy).toHaveBeenCalledTimes(1);
      expect(clearSpy.mock.calls[0][0].detail).toEqual({ clear: true });
    });
    it('should render custom clear text from locales', async () => {
      const page = await newSpecPage({
        components: [WppPopover],
        template: () => (h("wpp-popover-v4-6-0", { showClearButton: true, locales: { clearText: 'Reset' } }, h("wpp-button-v4-6-0", { slot: "trigger-element" }, "Trigger Button"), h("div", null, "Content"))),
      });
      await waitForDropdown(page);
      const clearButton = page.root?.shadowRoot?.querySelector('.wpp-popover-clear-action wpp-action-button');
      expect(clearButton?.textContent?.trim()).toBe('Reset');
    });
    it('should not render the footer without clear button or actions', async () => {
      const { contentEl } = await setup();
      expect(contentEl.querySelector('.wpp-popover-footer')).toBeNull();
    });
    it('should close the dropdown when the cross button is clicked', async () => {
      const { hide, contentEl } = await setup(DEFAULT_TRIGGER, 'closable');
      const crossButton = contentEl.querySelector('.cross-button');
      crossButton.click();
      expect(hide).toHaveBeenCalledTimes(1);
    });
    it('should not render the cross button together with the search', async () => {
      const { contentEl } = await setup(DEFAULT_TRIGGER, 'closable with-search');
      expect(contentEl.querySelector('.cross-button')).toBeNull();
      expect(contentEl.querySelector('.wpp-search-input')).toBeTruthy();
    });
    it('should emit wppSearchChange when the search value changes', async () => {
      const { page, contentEl } = await setup(DEFAULT_TRIGGER, `with-search search-name='users'`);
      const searchChangeSpy = jest.fn();
      const searchInput = contentEl.querySelector('.wpp-search-input');
      page.root?.addEventListener('wppSearchChange', searchChangeSpy);
      searchInput.dispatchEvent(new CustomEvent('wppChange', { detail: { value: 'john' } }));
      expect(searchChangeSpy).toHaveBeenCalledTimes(1);
      expect(searchChangeSpy.mock.calls[0][0].detail).toEqual({ name: 'users', value: 'john' });
    });
    it('should remove a disabled="false" attribute from the anchor', async () => {
      const { page, instance } = await setup();
      const anchor = page.root?.shadowRoot?.querySelector('.anchor');
      anchor.setAttribute('disabled', 'false');
      instance.removeDisabledTag();
      expect(anchor.hasAttribute('disabled')).toBe(false);
    });
  });
  describe('Testing accessibility', () => {
    describe('dropdown semantics', () => {
      it('should render the content as a focusable dialog by default', async () => {
        const { contentEl } = await setup();
        expect(contentEl.getAttribute('role')).toBe('dialog');
        expect(contentEl.getAttribute('tabindex')).toBe('-1');
      });
      it('should name the dropdown with the default ariaProps label', async () => {
        const { contentEl } = await setup();
        expect(contentEl.getAttribute('aria-label')).toBe('Popover');
        expect(contentEl.hasAttribute('aria-labelledby')).toBe(false);
      });
      it('should not name the dropdown when the provided ariaProps has no label', async () => {
        const page = await newSpecPage({
          components: [WppPopover],
          template: () => (h("wpp-popover-v4-6-0", { ariaProps: { describedby: 'filters-hint' } }, h("button", { slot: "trigger-element" }, "Trigger"), h("div", null, "Content"))),
        });
        await waitForDropdown(page);
        const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
        expect(contentEl.hasAttribute('aria-label')).toBe(false);
        expect(contentEl.getAttribute('role')).toBe('dialog');
      });
      it('should use ariaProps labelledby instead of an aria-label', async () => {
        const page = await newSpecPage({
          components: [WppPopover],
          template: () => (h("wpp-popover-v4-6-0", { ariaProps: { labelledby: 'filters-title', label: 'Ignored' } }, h("button", { slot: "trigger-element" }, "Trigger"), h("div", null, "Content"))),
        });
        await waitForDropdown(page);
        const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
        expect(contentEl.getAttribute('aria-labelledby')).toBe('filters-title');
        expect(contentEl.hasAttribute('aria-label')).toBe(false);
      });
      it('should apply the role, label and description from ariaProps', async () => {
        const page = await newSpecPage({
          components: [WppPopover],
          template: () => (h("wpp-popover-v4-6-0", { ariaProps: { role: 'menu', label: 'Filters', describedby: 'filters-hint' } }, h("button", { slot: "trigger-element" }, "Trigger"), h("div", null, "Content"))),
        });
        await waitForDropdown(page);
        const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
        expect(contentEl.getAttribute('role')).toBe('menu');
        expect(contentEl.getAttribute('aria-label')).toBe('Filters');
        expect(contentEl.getAttribute('aria-describedby')).toBe('filters-hint');
      });
      it('should label the cross button and hide its icon from assistive technologies', async () => {
        const { contentEl } = await setup(DEFAULT_TRIGGER, 'closable');
        const crossButton = contentEl.querySelector('.cross-button');
        expect(crossButton.ariaProps).toEqual({ label: DEFAULT_POPOVER_LOCALES.closeText });
        expect(crossButton.querySelector('wpp-icon-cross')?.getAttribute('aria-hidden')).toBe('true');
      });
      it('should label the search input', async () => {
        const { contentEl } = await setup(DEFAULT_TRIGGER, 'with-search');
        const searchInput = contentEl.querySelector('.wpp-search-input');
        expect(searchInput.ariaProps).toEqual({ label: DEFAULT_POPOVER_LOCALES.searchInputPlaceholder });
      });
      it('should use the locales for the accessible names', async () => {
        const page = await newSpecPage({
          components: [WppPopover],
          template: () => (h("wpp-popover-v4-6-0", { closable: true, showClearButton: true, locales: { closeText: 'Fermer', actionsText: 'Actions du filtre' } }, h("button", { slot: "trigger-element" }, "Trigger"), h("div", null, "Content"))),
        });
        await waitForDropdown(page);
        const contentEl = page.root?.shadowRoot?.querySelector('.wpp-popover-content');
        const crossButton = contentEl.querySelector('.cross-button');
        expect(crossButton.ariaProps).toEqual({ label: 'Fermer' });
        expect(contentEl.querySelector('.wpp-popover-footer')?.getAttribute('aria-label')).toBe('Actions du filtre');
      });
      it('should expose the footer as a labelled group', async () => {
        const { contentEl } = await setup(DEFAULT_TRIGGER, 'show-clear-button');
        const footer = contentEl.querySelector('.wpp-popover-footer');
        expect(footer.getAttribute('role')).toBe('group');
        expect(footer.getAttribute('aria-label')).toBe(DEFAULT_POPOVER_LOCALES.actionsText);
        expect(footer.querySelector('.wpp-popover-footer-actions')?.hasAttribute('role')).toBe(false);
      });
      it('should name the clear button by its visible text only', async () => {
        const { contentEl } = await setup(DEFAULT_TRIGGER, 'show-clear-button');
        const clearButton = contentEl.querySelector('.wpp-popover-clear-action wpp-action-button');
        expect(clearButton.textContent?.trim()).toBe(DEFAULT_POPOVER_LOCALES.clearText);
        expect(clearButton.hasAttribute('aria-label')).toBe(false);
      });
      it('should render the anchor as presentational', async () => {
        const { page } = await setup();
        expect(page.root?.shadowRoot?.querySelector('.anchor')?.getAttribute('role')).toBe('presentation');
      });
    });
    describe('focus management', () => {
      it('should render tabbable focus sentinels around the dropdown content', async () => {
        const { page, sentinels } = await setup();
        const focusScope = page.root?.shadowRoot?.querySelector('.wpp-popover-focus-scope');
        const children = Array.from(focusScope.children);
        expect(sentinels).toHaveLength(2);
        sentinels.forEach(sentinel => expect(sentinel.getAttribute('tabindex')).toBe('0'));
        expect(children[0]).toBe(sentinels[0]);
        expect(children[1].classList.contains('wpp-popover-content')).toBe(true);
        expect(children[2]).toBe(sentinels[1]);
      });
      it('should focus the content once the dropdown is shown', async () => {
        const { instance, contentEl } = await setup();
        const contentFocusSpy = jest.spyOn(contentEl, 'focus');
        instance.getTippyLifecycleCallbacks().onShown({});
        expect(contentFocusSpy).toHaveBeenCalledTimes(1);
      });
      it('should focus the search input instead of the content once shown with search', async () => {
        const { instance, contentEl } = await setup(DEFAULT_TRIGGER, 'with-search');
        const contentFocusSpy = jest.spyOn(contentEl, 'focus');
        const setFocus = jest.fn(() => Promise.resolve());
        instance.searchInputEl = { setFocus };
        instance.getTippyLifecycleCallbacks().onShown({});
        expect(setFocus).toHaveBeenCalledTimes(1);
        expect(contentFocusSpy).not.toHaveBeenCalled();
      });
      describe('search input focus ring', () => {
        const openWith = async (event) => {
          const { instance } = await setup(DEFAULT_TRIGGER, 'with-search');
          const setFocus = jest.fn(() => Promise.resolve());
          const callbacks = instance.getTippyLifecycleCallbacks();
          instance.searchInputEl = { setFocus };
          if (event)
            callbacks.onTrigger({}, event);
          callbacks.onShown({});
          return { instance, callbacks, setFocus };
        };
        it('should not paint the ring when the dropdown is opened with a pointer click', async () => {
          const { setFocus } = await openWith({ type: 'click', detail: 1 });
          expect(setFocus).toHaveBeenCalledWith(false);
        });
        it('should paint the ring when the dropdown is opened with Enter or Space on the trigger', async () => {
          const { setFocus } = await openWith({ type: 'click', detail: 0 });
          expect(setFocus).toHaveBeenCalledWith(true);
        });
        it('should call the consumer onTrigger callback', async () => {
          const { instance } = await setup(DEFAULT_TRIGGER, 'with-search');
          const onTrigger = jest.fn();
          const event = { type: 'click', detail: 1 };
          instance.config = { onTrigger };
          instance.getTippyLifecycleCallbacks().onTrigger({}, event);
          expect(onTrigger).toHaveBeenCalledWith({}, event);
        });
      });
      it('should focus the trigger and keep the dropdown open when focus leaves it backwards', async () => {
        const { hide, focusSpy, sentinels } = await setup();
        sentinels[0].dispatchEvent(new Event('focus'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
        expect(hide).not.toHaveBeenCalled();
      });
      it('should focus the trigger and close the dropdown when focus leaves it forwards', async () => {
        const { hide, focusSpy, sentinels } = await setup();
        sentinels[1].dispatchEvent(new Event('focus'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
        expect(hide).toHaveBeenCalledTimes(1);
      });
      it('should use setFocus when the trigger is a component exposing it', async () => {
        const { trigger, focusSpy, sentinels } = await setup(`<wpp-button slot='trigger-element'>Trigger Button</wpp-button>`);
        const setFocus = jest.fn(() => Promise.resolve());
        trigger.setFocus = setFocus;
        sentinels[0].dispatchEvent(new Event('focus'));
        expect(setFocus).toHaveBeenCalledTimes(1);
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it('should ignore keyboard and focus events before the dropdown is created', async () => {
        const { page, instance, trigger, focusSpy, sentinels } = await setup();
        const escapeInContent = createKeyEvent('Escape');
        instance.tippyInstance = undefined;
        trigger.removeAttribute('aria-expanded');
        const escapeOnTrigger = pressKeyOnAnchor(page, 'Escape', trigger);
        instance.handlePopperKeyDown(escapeInContent);
        instance.handleTriggerSlotChange();
        expect(() => sentinels[1].dispatchEvent(new Event('focus'))).not.toThrow();
        expect(escapeOnTrigger.stopPropagation).not.toHaveBeenCalled();
        expect(escapeInContent.stopPropagation).not.toHaveBeenCalled();
        expect(trigger.hasAttribute('aria-expanded')).toBe(false);
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should not fail when the sentinels are focused without a trigger', async () => {
        const page = await createPage(`<wpp-popover><div>Content</div></wpp-popover>`);
        const instance = page.rootInstance;
        instance.tippyInstance = { state: { isShown: true }, hide: jest.fn() };
        expect(() => instance.handleStartSentinelFocus()).not.toThrow();
        expect(() => instance.handleEndSentinelFocus()).not.toThrow();
      });
    });
    describe('keyboard interaction', () => {
      it('should move focus into the open dropdown when Tab is pressed on the trigger', async () => {
        const { page, hide, trigger, contentEl } = await setup();
        const contentFocusSpy = jest.spyOn(contentEl, 'focus');
        const preventDefault = pressTab(page, trigger);
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(contentFocusSpy).toHaveBeenCalledTimes(1);
        expect(hide).not.toHaveBeenCalled();
      });
      it('should move focus to the search input when Tab is pressed on the trigger', async () => {
        const { page, instance, trigger } = await setup();
        const setFocus = jest.fn(() => Promise.resolve());
        instance.searchInputEl = { setFocus };
        pressTab(page, trigger);
        expect(setFocus).toHaveBeenCalledTimes(1);
      });
      it('should close the dropdown and keep the native focus move when Shift+Tab is pressed on the trigger', async () => {
        const { page, hide, trigger, contentEl } = await setup();
        const contentFocusSpy = jest.spyOn(contentEl, 'focus');
        const preventDefault = pressTab(page, trigger, true);
        expect(hide).toHaveBeenCalledTimes(1);
        expect(preventDefault).not.toHaveBeenCalled();
        expect(contentFocusSpy).not.toHaveBeenCalled();
      });
      it('should not intercept Tab on the trigger while the dropdown is closed', async () => {
        const { page, instance, hide, trigger } = await setup();
        instance.tippyInstance.state.isVisible = false;
        expect(pressTab(page, trigger)).not.toHaveBeenCalled();
        expect(pressTab(page, trigger, true)).not.toHaveBeenCalled();
        expect(hide).not.toHaveBeenCalled();
      });
      it('should not intercept Tab coming from other elements than the trigger', async () => {
        const { page, hide } = await setup();
        const otherElement = document.createElement('button');
        expect(pressTab(page, otherElement)).not.toHaveBeenCalled();
        expect(pressTab(page, otherElement, true)).not.toHaveBeenCalled();
        expect(hide).not.toHaveBeenCalled();
      });
      it('should ignore other keys pressed on the trigger', async () => {
        const { page, hide, trigger } = await setup();
        const { preventDefault, stopPropagation } = pressKeyOnAnchor(page, 'Enter', trigger);
        expect(preventDefault).not.toHaveBeenCalled();
        expect(stopPropagation).not.toHaveBeenCalled();
        expect(hide).not.toHaveBeenCalled();
      });
      it('should not intercept Tab inside the dropdown', async () => {
        const { instance, focusSpy } = await setup();
        const preventDefault = jest.fn();
        instance.handlePopperKeyDown({ key: 'Tab', shiftKey: false, preventDefault });
        expect(preventDefault).not.toHaveBeenCalled();
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it.each(['Escape', 'Esc'])('should close the dropdown when %s is pressed', async (key) => {
        const { instance, hide } = await setup();
        const event = createKeyEvent(key);
        instance.handlePopperKeyDown(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        expect(hide).toHaveBeenCalledTimes(1);
      });
      // Containers such as wpp-modal close on Escape keydown events reaching the document
      it('should stop Escape from propagating out of the rendered content', async () => {
        const { hide, popoverControl } = await setup();
        const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });
        const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
        popoverControl.dispatchEvent(event);
        expect(hide).toHaveBeenCalledTimes(1);
        expect(stopPropagationSpy).toHaveBeenCalled();
      });
      it('should let Escape propagate while the dropdown is hidden', async () => {
        const { instance, hide, popoverControl } = await setup();
        const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });
        const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
        instance.tippyInstance.state.isShown = false;
        popoverControl.dispatchEvent(event);
        expect(hide).not.toHaveBeenCalled();
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      });
      it('should let other keys propagate out of the rendered content', async () => {
        const { hide, popoverControl } = await setup();
        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          composed: true,
          cancelable: true,
        });
        const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
        popoverControl.dispatchEvent(event);
        expect(hide).not.toHaveBeenCalled();
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      });
      it.each(['Escape', 'Esc'])('should close the dropdown when %s is pressed on the trigger', async (key) => {
        const { page, hide, trigger, focusSpy } = await setup();
        const { preventDefault, stopPropagation } = pressKeyOnAnchor(page, key, trigger);
        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(stopPropagation).toHaveBeenCalledTimes(1);
        expect(hide).toHaveBeenCalledTimes(1);
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it('should not handle Escape on the trigger while the dropdown is closed', async () => {
        const { page, instance, hide, trigger } = await setup();
        instance.tippyInstance.state.isVisible = false;
        const { stopPropagation } = pressKeyOnAnchor(page, 'Escape', trigger);
        expect(stopPropagation).not.toHaveBeenCalled();
        expect(hide).not.toHaveBeenCalled();
      });
      it('should not handle Escape coming from other elements than the trigger', async () => {
        const { page, hide } = await setup();
        const { stopPropagation } = pressKeyOnAnchor(page, 'Escape', document.createElement('button'));
        expect(stopPropagation).not.toHaveBeenCalled();
        expect(hide).not.toHaveBeenCalled();
      });
    });
    describe('focus return on hide', () => {
      it('should return focus to the trigger when the dropdown hides with focus inside it', async () => {
        const { instance, focusSpy, popoverControl, setActiveElement } = await setup();
        setActiveElement(popoverControl);
        const result = instance
          .getTippyLifecycleCallbacks()
          .onHide({ popper: { contains: (node) => node === popoverControl } });
        expect(result).toBeUndefined();
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should not move focus when the dropdown hides with focus outside of it', async () => {
        const { instance, focusSpy } = await setup();
        instance.getTippyLifecycleCallbacks().onHide({ popper: { contains: () => false } });
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it('should not move focus when the consumer onHide cancels hiding', async () => {
        const { instance, focusSpy } = await setup();
        const onHide = jest.fn(() => false);
        const tippyInstance = { popper: { contains: () => true } };
        instance.config = { onHide };
        const result = instance.getTippyLifecycleCallbacks().onHide(tippyInstance);
        expect(onHide).toHaveBeenCalledWith(tippyInstance);
        expect(result).toBe(false);
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it('should return focus when the dropdown is closed with the cross button', async () => {
        const { instance, focusSpy, contentEl, setActiveElement } = await setup(DEFAULT_TRIGGER, 'closable');
        const crossButton = contentEl.querySelector('.cross-button');
        mockTippyHideLifecycle(instance, [crossButton]);
        setActiveElement(crossButton);
        crossButton.click();
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should return focus when the dropdown is closed programmatically with focus inside it', async () => {
        const { page, instance, focusSpy, popoverControl, setActiveElement } = await setup();
        mockTippyHideLifecycle(instance, [popoverControl]);
        setActiveElement(popoverControl);
        await page.root?.closePopover();
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should not pull focus to the trigger when closing on an outside click', async () => {
        const { instance, focusSpy, popoverControl, setActiveElement } = await setup();
        const { clickOutside } = mockTippyHideLifecycle(instance, [popoverControl]);
        // Tippy handles outside clicks on mousedown, before the browser moves focus out of the dropdown
        setActiveElement(popoverControl);
        clickOutside();
        expect(focusSpy).not.toHaveBeenCalled();
      });
      it('should return focus on Escape after an earlier outside click', async () => {
        const { instance, focusSpy, popoverControl, setActiveElement } = await setup();
        const { clickOutside, reopen } = mockTippyHideLifecycle(instance, [popoverControl]);
        setActiveElement(popoverControl);
        clickOutside();
        reopen();
        instance.handlePopperKeyDown(createKeyEvent('Escape'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should return focus after an outside click while the dropdown was already hiding', async () => {
        const { instance, focusSpy, popoverControl, setActiveElement } = await setup();
        const { clickOutside, reopen } = mockTippyHideLifecycle(instance, [popoverControl]);
        setActiveElement(popoverControl);
        clickOutside();
        clickOutside();
        reopen();
        instance.handlePopperKeyDown(createKeyEvent('Escape'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should return focus after an outside click cancelled by the consumer onHide', async () => {
        const { instance, focusSpy, popoverControl, setActiveElement } = await setup();
        const { clickOutside } = mockTippyHideLifecycle(instance, [popoverControl]);
        let shouldCancelHide = true;
        instance.config = { onHide: () => (shouldCancelHide ? false : undefined) };
        setActiveElement(popoverControl);
        clickOutside();
        shouldCancelHide = false;
        instance.handlePopperKeyDown(createKeyEvent('Escape'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('should leave focus on the trigger when Tab out is cancelled by the consumer onHide', async () => {
        const { instance, focusSpy, sentinels, setActiveElement } = await setup();
        mockTippyHideLifecycle(instance, [sentinels[1]]);
        instance.config = { onHide: () => false };
        setActiveElement(sentinels[1]);
        sentinels[1].dispatchEvent(new Event('focus'));
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      describe('focus ring', () => {
        // A WPP-like trigger: `setFocus` paints the keyboard ring, its native control lives in the shadow root
        const setupComponentTrigger = async (attributes = '') => {
          const context = await setup(`<wpp-button slot='trigger-element'>Trigger Button</wpp-button>`, attributes);
          const setFocus = jest.fn(() => Promise.resolve());
          const nativeControl = context.page.doc.createElement('button');
          context.trigger.attachShadow({ mode: 'open' }).appendChild(nativeControl);
          context.trigger.setFocus = setFocus;
          const nativeFocusSpy = jest.spyOn(nativeControl, 'focus');
          const { clickOutside } = mockTippyHideLifecycle(context.instance, [context.popoverControl]);
          context.setActiveElement(context.popoverControl);
          return { ...context, setFocus, nativeControl, nativeFocusSpy, clickOutside };
        };
        const pointerDownInside = (element) => element.dispatchEvent(new Event('pointerdown', { bubbles: true }));
        const keyDownInside = (element, key = 'Enter') => element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        it('should focus the native control without the ring when closed after a pointer interaction', async () => {
          const { page, popoverControl, setFocus, nativeFocusSpy } = await setupComponentTrigger();
          pointerDownInside(popoverControl);
          await page.root?.closePopover();
          expect(nativeFocusSpy).toHaveBeenCalledTimes(1);
          expect(setFocus).not.toHaveBeenCalled();
        });
        it('should focus the trigger with the ring when closed after a keyboard interaction', async () => {
          const { page, popoverControl, setFocus, nativeFocusSpy } = await setupComponentTrigger();
          keyDownInside(popoverControl);
          await page.root?.closePopover();
          expect(setFocus).toHaveBeenCalledTimes(1);
          expect(nativeFocusSpy).not.toHaveBeenCalled();
        });
        it('should use the latest interaction when pointer and keyboard are mixed', async () => {
          const { popoverControl, setFocus, nativeFocusSpy } = await setupComponentTrigger();
          pointerDownInside(popoverControl);
          keyDownInside(popoverControl, 'Escape');
          expect(setFocus).toHaveBeenCalledTimes(1);
          expect(nativeFocusSpy).not.toHaveBeenCalled();
        });
        it('should close without the ring when the cross button is clicked with a pointer', async () => {
          const { contentEl, setFocus, nativeFocusSpy, setActiveElement, instance } = await setupComponentTrigger('closable');
          const crossButton = contentEl.querySelector('.cross-button');
          mockTippyHideLifecycle(instance, [crossButton]);
          setActiveElement(crossButton);
          pointerDownInside(crossButton);
          crossButton.click();
          expect(nativeFocusSpy).toHaveBeenCalledTimes(1);
          expect(setFocus).not.toHaveBeenCalled();
        });
        it('should show the ring when closed without any interaction since opening', async () => {
          const { page, instance, popoverControl, setFocus, nativeFocusSpy } = await setupComponentTrigger();
          pointerDownInside(popoverControl);
          instance.getTippyLifecycleCallbacks().onShow({});
          await page.root?.closePopover();
          expect(setFocus).toHaveBeenCalledTimes(1);
          expect(nativeFocusSpy).not.toHaveBeenCalled();
        });
        it('should always show the ring when focus leaves through the sentinels', async () => {
          const { popoverControl, sentinels, setFocus, nativeFocusSpy } = await setupComponentTrigger();
          pointerDownInside(popoverControl);
          sentinels[0].dispatchEvent(new Event('focus'));
          expect(setFocus).toHaveBeenCalledTimes(1);
          expect(nativeFocusSpy).not.toHaveBeenCalled();
        });
        it('should focus a native trigger itself after a pointer interaction', async () => {
          const { page, instance, focusSpy, popoverControl, setActiveElement } = await setup();
          mockTippyHideLifecycle(instance, [popoverControl]);
          setActiveElement(popoverControl);
          pointerDownInside(popoverControl);
          await page.root?.closePopover();
          expect(focusSpy).toHaveBeenCalledTimes(1);
        });
        it('should fall back to the component host when it has no focusable native control', async () => {
          const { page, instance, trigger, popoverControl, setActiveElement } = await setup(`<wpp-button slot='trigger-element'>Trigger Button</wpp-button>`);
          const hostFocusSpy = jest.spyOn(trigger, 'focus');
          trigger.attachShadow({ mode: 'open' }).appendChild(page.doc.createElement('span'));
          mockTippyHideLifecycle(instance, [popoverControl]);
          setActiveElement(popoverControl);
          pointerDownInside(popoverControl);
          await page.root?.closePopover();
          expect(hostFocusSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('trigger wrapped in a tooltip', () => {
      const TOOLTIP_TRIGGER = `<wpp-tooltip slot='trigger-element' text='Share with your team'>
                                 <button id='share'>Share</button>
                               </wpp-tooltip>`;
      const setupWrappedTrigger = async (triggerHtml = TOOLTIP_TRIGGER) => {
        const context = await setup(triggerHtml);
        const control = context.trigger.querySelector('#share');
        const controlFocusSpy = jest.spyOn(control, 'focus');
        return { ...context, tooltip: context.trigger, control, controlFocusSpy };
      };
      it('should expose the state on the wrapped control, not on the tooltip', async () => {
        const { tooltip, control } = await setupWrappedTrigger();
        expect(control.getAttribute('aria-expanded')).toBe('false');
        expect(control.getAttribute('aria-haspopup')).toBe('dialog');
        expect(tooltip.hasAttribute('aria-expanded')).toBe(false);
        expect(tooltip.hasAttribute('role')).toBe(false);
      });
      it('should handle Tab, Shift+Tab and Escape pressed on the wrapped control', async () => {
        const { page, hide, control, contentEl } = await setupWrappedTrigger();
        const contentFocusSpy = jest.spyOn(contentEl, 'focus');
        expect(pressTab(page, control)).toHaveBeenCalledTimes(1);
        expect(contentFocusSpy).toHaveBeenCalledTimes(1);
        pressTab(page, control, true);
        const escape = pressKeyOnAnchor(page, 'Escape', control);
        expect(escape.stopPropagation).toHaveBeenCalledTimes(1);
        expect(hide).toHaveBeenCalledTimes(2);
      });
      it('should not open when the wrapped control is disabled', async () => {
        const { instance } = await setupWrappedTrigger(`<wpp-tooltip slot='trigger-element' text='Share'>
                                                          <button id='share' disabled>Share</button>
                                                        </wpp-tooltip>`);
        expect(instance.getTippyLifecycleCallbacks().onShow({})).toBe(false);
      });
    });
    describe('trigger expanded state', () => {
      it('should mark a native trigger as collapsed dialog trigger once the dropdown is created', async () => {
        const { trigger } = await setup();
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
        expect(trigger.hasAttribute('role')).toBe(false);
      });
      it('should toggle aria-expanded when the dropdown shows and hides', async () => {
        const { instance, trigger } = await setup();
        const callbacks = instance.getTippyLifecycleCallbacks();
        callbacks.onShow({});
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        callbacks.onHide({ popper: { contains: () => false } });
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
      });
      it('should keep aria-expanded when the consumer cancels showing or hiding', async () => {
        const { instance, trigger } = await setup();
        const callbacks = instance.getTippyLifecycleCallbacks();
        instance.config = { onShow: () => false };
        expect(callbacks.onShow({})).toBe(false);
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        instance.config = {};
        callbacks.onShow({});
        instance.config = { onHide: () => false };
        expect(callbacks.onHide({ popper: { contains: () => false } })).toBe(false);
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
      });
      it('should not mark the trigger as expanded when it is disabled', async () => {
        const { instance, trigger } = await setup(`<button slot='trigger-element' disabled>Trigger Button</button>`);
        expect(instance.getTippyLifecycleCallbacks().onShow({})).toBe(false);
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
      });
      it('should expose the state of a trigger that is slotted later', async () => {
        const { page, instance } = await setup();
        const newTrigger = page.doc.createElement('button');
        newTrigger.setAttribute('slot', 'trigger-element');
        page.root?.querySelector('[slot="trigger-element"]')?.remove();
        page.root?.appendChild(newTrigger);
        instance.handleTriggerSlotChange();
        expect(newTrigger.getAttribute('aria-expanded')).toBe('true');
        expect(newTrigger.getAttribute('aria-haspopup')).toBe('dialog');
      });
      it('should keep an aria-haspopup value provided by the consumer', async () => {
        const { trigger } = await setup(`<button slot='trigger-element' aria-haspopup='listbox'>Trigger Button</button>`);
        expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
      });
      it('should derive aria-haspopup from the dropdown role', async () => {
        const { page, instance, trigger } = await setup();
        trigger.removeAttribute('aria-haspopup');
        page.root.ariaProps = { role: 'menu' };
        await page.waitForChanges();
        instance.updateTriggerExpandedState(false);
        expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
        trigger.removeAttribute('aria-haspopup');
        page.root.ariaProps = { role: 'region' };
        await page.waitForChanges();
        instance.updateTriggerExpandedState(false);
        expect(trigger.hasAttribute('aria-haspopup')).toBe(false);
      });
      describe('trigger owning ariaProps', () => {
        const originalMutationObserver = global.MutationObserver;
        let observers;
        // Stencil's mock DOM never notifies MutationObservers, so the trigger's re-render is replayed by hand
        const triggerRerender = (trigger) => observers.filter(observer => observer.target === trigger.shadowRoot).forEach(observer => observer.callback());
        const setupAriaPropsTrigger = async () => {
          const context = await setup(`<wpp-action-button slot='trigger-element'>Share</wpp-action-button>`);
          const trigger = context.trigger;
          trigger.attachShadow({ mode: 'open' });
          return { ...context, trigger };
        };
        beforeEach(() => {
          observers = [];
          global.MutationObserver = class {
            constructor(callback) {
              this.observer = { callback };
              observers.push(this.observer);
            }
            observe(target) {
              this.observer.target = target;
            }
            disconnect() {
              this.observer.target = undefined;
            }
          };
        });
        afterEach(() => {
          global.MutationObserver = originalMutationObserver;
        });
        it('should merge the state into the trigger ariaProps', async () => {
          const { instance, trigger } = await setupAriaPropsTrigger();
          trigger.ariaProps = { label: 'Share' };
          instance.getTippyLifecycleCallbacks().onShow({});
          expect(trigger.ariaProps).toEqual({ label: 'Share', haspopup: 'dialog', expanded: true });
        });
        it('should re-apply the state once a render of the consumer replaces ariaProps', async () => {
          const { instance, trigger } = await setupAriaPropsTrigger();
          const callbacks = instance.getTippyLifecycleCallbacks();
          callbacks.onShow({});
          // e.g. the React wrapper assigning the JSX object again on every render
          trigger.ariaProps = { label: 'Share' };
          triggerRerender(trigger);
          expect(trigger.ariaProps).toEqual({ label: 'Share', haspopup: 'dialog', expanded: true });
          callbacks.onHide({ popper: { contains: () => false } });
          trigger.ariaProps = { label: 'Share', expanded: true };
          triggerRerender(trigger);
          expect(trigger.ariaProps).toEqual({ label: 'Share', haspopup: 'dialog', expanded: false });
        });
        it('should not reassign ariaProps when the render already exposes the state', async () => {
          const { instance, trigger } = await setupAriaPropsTrigger();
          instance.getTippyLifecycleCallbacks().onShow({});
          const ariaProps = trigger.ariaProps;
          triggerRerender(trigger);
          expect(trigger.ariaProps).toBe(ariaProps);
        });
        it('should stop observing the trigger once the popover is disconnected', async () => {
          const { page, instance, trigger } = await setupAriaPropsTrigger();
          instance.getTippyLifecycleCallbacks().onShow({});
          instance.tippyInstance.destroy = jest.fn();
          page.root?.remove();
          expect(observers.some(observer => observer.target === trigger.shadowRoot)).toBe(false);
        });
      });
      it('should add a button role to a non-interactive trigger', async () => {
        const { trigger } = await setup(`<div slot='trigger-element' tabindex='0'>Trigger</div>`);
        expect(trigger.getAttribute('role')).toBe('button');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
      });
      it('should replace a presentation role of the trigger with a button role', async () => {
        const { trigger } = await setup(`<div slot='trigger-element' tabindex='0' role='presentation'>Trigger</div>`);
        expect(trigger.getAttribute('role')).toBe('button');
      });
    });
  });
  describe('Testing Snapshots', () => {
    it('should render component', async () => {
      const page = await createPage(`<wpp-popover>
                                       <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
                                       <div>
                                         <wpp-typography>Some content inside popover</wpp-typography>
                                         <wpp-action-button>Content Button</wpp-action-button>
                                       </div>
                                     </wpp-popover>`);
      expect(page.root).toMatchSnapshot();
    });
    it('should render the closable variant with footer', async () => {
      const page = await createPage(`<wpp-popover closable show-clear-button>
                                       <button slot='trigger-element'>Trigger Button</button>
                                       <div>Content</div>
                                       <wpp-action-button slot='actions'>Apply</wpp-action-button>
                                     </wpp-popover>`);
      expect(page.root).toMatchSnapshot();
    });
    it('should render the search variant', async () => {
      const page = await createPage(`<wpp-popover with-search search-value='john'>
                                       <button slot='trigger-element'>Trigger Button</button>
                                       <div>Content</div>
                                     </wpp-popover>`);
      expect(page.root).toMatchSnapshot();
    });
    it('should match the host CSS classes', async () => {
      const { instance } = await setup();
      expect(instance.hostCssClasses()).toMatchSnapshot();
    });
    it.each([
      ['default', ''],
      ['with search', 'with-search'],
      ['with clear button', 'show-clear-button'],
      ['with external class', `external-class='custom-popover'`],
    ])('should match the content CSS classes %s', async (_, attributes) => {
      const { instance } = await setup(DEFAULT_TRIGGER, attributes);
      expect(instance.contentCssClasses()).toMatchSnapshot();
    });
    it('should match the content CSS classes before the dropdown is created', async () => {
      const { instance } = await setup();
      instance.hidden = true;
      expect(instance.contentCssClasses()).toMatchSnapshot();
    });
  });
});

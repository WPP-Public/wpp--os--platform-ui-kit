import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppModal } from '../wpp-modal';
import { ModalCloseReason } from '../types';
import * as utils from '../../../utils/utils';
import { ANIMATION_PROPERTY_NAME } from '../../../common/consts';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-modal', () => {
  it('Should render defaut modal', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should render open modal', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open></wpp-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // `is-open` is not a real attribute, so this used to snapshot a closed modal.
    expect(page.root?.shadowRoot?.querySelector('.modal')).toHaveClass('visible');
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-modal accessible name', () => {
  it('derives the dialog name from the header slot and emits no dangling IDREF', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open><div slot="header">Delete report</div></wpp-modal>`,
    });
    expect(page.root).toEqualAttribute('aria-label', 'Delete report');
    expect(page.root?.hasAttribute('aria-labelledby')).toBe(false);
  });
  it('honours a consumer supplied ariaProps.labelledby instead of deriving a name', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      template: () => (h("wpp-modal-v4-6-0", { open: true, ariaProps: { role: 'dialog', labelledby: 'their-title' } }, h("div", { slot: "header" }, "Delete report"))),
    });
    expect(page.root).toEqualAttribute('aria-labelledby', 'their-title');
    expect(page.root?.hasAttribute('aria-label')).toBe(false);
  });
  it('honours a consumer supplied ariaProps.label', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      template: () => (h("wpp-modal-v4-6-0", { open: true, ariaProps: { role: 'dialog', label: 'Their label' } }, h("div", { slot: "header" }, "Delete report"))),
    });
    expect(page.root).toEqualAttribute('aria-label', 'Their label');
  });
});
describe('wpp-modal minimal coverage', () => {
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
  it('updates slot state correctly', async () => {
    jest.spyOn(utils, 'getSlotEmptyStates').mockReturnValue({
      header: false,
      body: true,
      actions: false,
    });
    const page = await newSpecPage({
      components: [WppModal],
      html: `
        <wpp-modal>
          <div slot="header"></div>
          <div slot="actions"></div>
        </wpp-modal>
      `,
    });
    const instance = page.rootInstance;
    instance.updateSlotData();
    expect(instance.hasHeaderSlot).toBe(true);
    expect(instance.hasBodySlot).toBe(false);
    expect(instance.hasActionsSlot).toBe(true);
  });
  /** -------------------------------
   * 2. transition start
   --------------------------------*/
  it('handles transition start (open + close)', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    instance.wppModalOpenStart.emit = openSpy;
    instance.wppModalCloseStart.emit = closeSpy;
    // OPEN
    instance['handleTransitionStart']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(openSpy).toHaveBeenCalled();
    // CLOSE
    instance.open = false;
    instance.closeReason = ModalCloseReason.escapePress;
    instance['handleTransitionStart']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(closeSpy).toHaveBeenCalledWith({
      reason: ModalCloseReason.escapePress,
    });
  });
  /** -------------------------------
   * 3. transition end
   --------------------------------*/
  it('handles transition end correctly', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const openComplete = jest.fn();
    const closeComplete = jest.fn();
    instance.wppModalOpenComplete.emit = openComplete;
    instance.wppModalCloseComplete.emit = closeComplete;
    // OPEN END
    instance['handleTransitionEnd']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(openComplete).toHaveBeenCalled();
    // CLOSE END
    instance.open = false;
    instance.closeReason = ModalCloseReason.outsideClick;
    instance['handleTransitionEnd']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(closeComplete).toHaveBeenCalledWith({
      reason: ModalCloseReason.outsideClick,
    });
    expect(instance.closeReason).toBeNull();
  });
  /** -------------------------------
   * 4. ESC key close
   --------------------------------*/
  it('closes modal on ESC key', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.wppModalClose.emit = spy;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(spy).toHaveBeenCalledWith({
      reason: ModalCloseReason.escapePress,
    });
  });
  /** -------------------------------
   * 5. open / close methods
   --------------------------------*/
  it('opens and closes modal using methods', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    const instance = page.rootInstance;
    await instance.openModal();
    expect(instance.open).toBe(true);
    await instance.closeModal();
    expect(instance.open).toBe(false);
  });
  /** -------------------------------
   * 6. outside click handling
   --------------------------------*/
  it('handles outside click correctly', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const spy = jest.fn();
    instance.wppModalClose.emit = spy;
    instance.onOverlayClick();
    expect(spy).toHaveBeenCalledWith({
      reason: ModalCloseReason.outsideClick,
    });
  });
  it('covers close start/end when no closeReason exists', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const closeStartSpy = jest.fn();
    const closeCompleteSpy = jest.fn();
    instance.wppModalCloseStart.emit = closeStartSpy;
    instance.wppModalCloseComplete.emit = closeCompleteSpy;
    // Ensure modal is closed and no reason is set
    instance.open = false;
    instance.closeReason = null;
    // 🔹 Trigger transition start
    instance['handleTransitionStart']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(closeStartSpy).toHaveBeenCalled();
    // 🔹 Trigger transition end
    instance['handleTransitionEnd']({
      propertyName: ANIMATION_PROPERTY_NAME,
    });
    expect(closeCompleteSpy).toHaveBeenCalled();
    expect(instance.closeReason).toBeNull();
  });
  it('does nothing when transition property name does not match', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal open></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const openStartSpy = jest.fn();
    const openCompleteSpy = jest.fn();
    const closeStartSpy = jest.fn();
    const closeCompleteSpy = jest.fn();
    instance.wppModalOpenStart.emit = openStartSpy;
    instance.wppModalOpenComplete.emit = openCompleteSpy;
    instance.wppModalCloseStart.emit = closeStartSpy;
    instance.wppModalCloseComplete.emit = closeCompleteSpy;
    const fakeEvent = {
      propertyName: 'height', // ✅ NOT animation property
    };
    instance['handleTransitionStart'](fakeEvent);
    instance['handleTransitionEnd'](fakeEvent);
    expect(openStartSpy).not.toHaveBeenCalled();
    expect(openCompleteSpy).not.toHaveBeenCalled();
    expect(closeStartSpy).not.toHaveBeenCalled();
    expect(closeCompleteSpy).not.toHaveBeenCalled();
  });
  it('does nothing when disableOutsideClick is true', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    const instance = page.rootInstance;
    const closeSpy = jest.fn();
    instance.wppModalClose.emit = closeSpy;
    instance.disableOutsideClick = true;
    instance.onOverlayClick();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(instance.closeReason).toBeNull();
  });
});
describe('wpp-modal osBarCompatible', () => {
  it('sets topOffset to 0 when osBarCompatible is false', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    expect(page.root?.style.getPropertyValue('--wpp-modal-top-offset')).toBe('0px');
  });
  it('calls getOsBarOffsetHeight when osBarCompatible is true', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(72);
    const page = await newSpecPage({
      components: [WppModal],
      template: () => h("wpp-modal-v4-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-modal-top-offset')).toBe('72px');
    spy.mockRestore();
  });
  it('applies wpp-os-bar-compatible CSS class when osBarCompatible is true', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      template: () => h("wpp-modal-v4-6-0", { osBarCompatible: true }),
    });
    expect(page.root).toHaveClass('wpp-os-bar-compatible');
  });
  it('does not apply wpp-os-bar-compatible CSS class when osBarCompatible is false', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal></wpp-modal>`,
    });
    expect(page.root).not.toHaveClass('wpp-os-bar-compatible');
  });
  it('sets --wpp-modal-top-offset style based on getOsBarOffsetHeight', async () => {
    const spy = jest.spyOn(utils, 'getOsBarOffsetHeight').mockReturnValue(64);
    const page = await newSpecPage({
      components: [WppModal],
      template: () => h("wpp-modal-v4-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-modal-top-offset')).toBe('64px');
    spy.mockRestore();
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
        components: [WppModal],
        html: `<wpp-modal></wpp-modal>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppModal],
        html: `<wpp-modal></wpp-modal>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing `actionsConfig` using snapshots', () => {
    it('Should render only 1 button in the actions section', async () => {
      const page = await newSpecPage({
        components: [WppModal],
        template: () => (h("wpp-modal-v4-6-0", { actionsConfig: {
            primaryButtonConfig: {
              variant: 'primary',
              label: 'Submit',
              onClick: () => console.log('Confirm'),
            },
          } })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render 2 buttons in the actions section', async () => {
      const page = await newSpecPage({
        components: [WppModal],
        template: () => (h("wpp-modal-v4-6-0", { actionsConfig: {
            primaryButtonConfig: {
              variant: 'primary',
              label: 'Submit',
              onClick: () => console.log('Confirm'),
            },
            secondaryButtonConfig: {
              label: 'Cancel',
              onClick: () => console.log('Cancel'),
            },
          } })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render the `actions` slot when there is no `actionsConfig` provided', async () => {
      const page = await newSpecPage({
        components: [WppModal],
        template: () => h("wpp-modal-v4-6-0", null),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
describe('wpp-modal dialog focus', () => {
  // Stencil's mock DOM does not move `document.activeElement` on focus(), so the focused element
  // is driven explicitly here — the component reads it to decide what to restore focus to.
  let stubbedActive = null;
  beforeEach(() => {
    stubbedActive = null;
    Object.defineProperty(document, 'activeElement', { configurable: true, get: () => stubbedActive });
  });
  afterEach(() => {
    delete document.activeElement;
  });
  const flushTimers = () => new Promise(resolve => setTimeout(resolve, 0));
  const mountWithTrigger = async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    stubbedActive = trigger;
    const page = await newSpecPage({
      components: [WppModal],
      html: `<wpp-modal><div slot="header">Title</div><div slot="body">Body</div></wpp-modal>`,
    });
    return { page, trigger };
  };
  it('moves focus into the dialog when it opens, without waiting for the open transition', async () => {
    const { page } = await mountWithTrigger();
    const dialog = page.root?.shadowRoot?.querySelector('[part="content"]');
    const dialogFocus = jest.fn();
    dialog.focus = dialogFocus;
    page.root.open = true;
    await page.waitForChanges();
    // `transitionend` is deliberately never fired here: a reduced-motion user, or a consumer who
    // turns the animation off, never gets one, and focus used to stay outside a dialog that is
    // `aria-modal` — leaving nothing reachable inside it.
    expect(dialogFocus).toHaveBeenCalled();
  });
  it('hands focus back to whatever opened it when it closes', async () => {
    const { page, trigger } = await mountWithTrigger();
    const triggerFocus = jest.spyOn(trigger, 'focus');
    const dialog = page.root?.shadowRoot?.querySelector('[part="content"]');
    page.root.open = true;
    await page.waitForChanges();
    // The dialog is holding focus, so closing it has to give focus back rather than leave it on
    // a container the user can no longer see.
    stubbedActive = dialog;
    page.root.open = false;
    await page.waitForChanges();
    await flushTimers();
    expect(triggerFocus).toHaveBeenCalled();
  });
  it('gives the trigger its keyboard focus ring back when closed with Escape', async () => {
    const { page, trigger } = await mountWithTrigger();
    const setFocus = jest.fn();
    trigger.setFocus = setFocus;
    const triggerFocus = jest.spyOn(trigger, 'focus');
    const dialog = page.root?.shadowRoot?.querySelector('[part="content"]');
    page.root.open = true;
    await page.waitForChanges();
    stubbedActive = dialog;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await page.waitForChanges();
    page.root.open = false;
    await page.waitForChanges();
    await flushTimers();
    // Our controls draw the ring from a class they set in `setFocus()`, not from `:focus-visible`,
    // so a plain `focus()` puts focus back with nothing drawn on it.
    expect(setFocus).toHaveBeenCalled();
    expect(triggerFocus).not.toHaveBeenCalled();
  });
  it('restores focus without the keyboard ring when it was not closed from the keyboard', async () => {
    const { page, trigger } = await mountWithTrigger();
    const setFocus = jest.fn();
    trigger.setFocus = setFocus;
    const triggerFocus = jest.spyOn(trigger, 'focus');
    const dialog = page.root?.shadowRoot?.querySelector('[part="content"]');
    page.root.open = true;
    await page.waitForChanges();
    // Closed by pointer: focus still has to come back, but painting a keyboard ring would show one
    // where the user never had it.
    stubbedActive = dialog;
    page.root.open = false;
    await page.waitForChanges();
    await flushTimers();
    expect(triggerFocus).toHaveBeenCalled();
    expect(setFocus).not.toHaveBeenCalled();
  });
  it('leaves focus alone when the dialog was not holding it', async () => {
    const { page, trigger } = await mountWithTrigger();
    const triggerFocus = jest.spyOn(trigger, 'focus');
    page.root.open = true;
    await page.waitForChanges();
    triggerFocus.mockClear();
    // Closing because focus already moved elsewhere: the dialog must not drag it back.
    stubbedActive = document.body;
    page.root.open = false;
    await page.waitForChanges();
    await flushTimers();
    expect(triggerFocus).not.toHaveBeenCalled();
  });
});

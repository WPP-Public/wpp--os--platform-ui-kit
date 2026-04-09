import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppModal } from '../wpp-modal';
import { ModalCloseReason } from '../types';
import * as utils from '../../../utils/utils';
import { ANIMATION_PROPERTY_NAME } from '../../../common/consts';
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
      html: `<wpp-modal is-open=${true}></wpp-modal>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
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
    instance.wppModalOpen.emit = jest.fn();
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
      template: () => h("wpp-modal-v3-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-modal-top-offset')).toBe('72px');
    spy.mockRestore();
  });
  it('applies wpp-os-bar-compatible CSS class when osBarCompatible is true', async () => {
    const page = await newSpecPage({
      components: [WppModal],
      template: () => h("wpp-modal-v3-6-0", { osBarCompatible: true }),
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
      template: () => h("wpp-modal-v3-6-0", { osBarCompatible: true }),
    });
    expect(page.root?.style.getPropertyValue('--wpp-modal-top-offset')).toBe('64px');
    spy.mockRestore();
  });
});

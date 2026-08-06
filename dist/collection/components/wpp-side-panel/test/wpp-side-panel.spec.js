import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSidePanel } from '../wpp-side-panel';
import { SidePanelCloseReason } from '../types';
import { LOCALES_DEFAULTS, SIDE_PANEL_KEYBOARD_STEP, SIDE_PANEL_MAX_WIDTH, SIDE_PANEL_MIN_WIDTH } from '../const';
describe('wpp-side-panel', () => {
  it('Should render default side panel', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel panel-title="Title"></wpp-side-panel>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should render open side panel with actions config', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      template: () => (h("wpp-side-panel-v4-3-0", { open: true, panelTitle: "Title", actionsConfig: [
          { label: 'Cancel', onClick: () => { } },
          { label: 'Save', onClick: () => { } },
        ] }, h("div", null, "Body content"))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('Should not set an inline width override before any resize (width comes from the stylesheet default)', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel panel-title="Title"></wpp-side-panel>`,
    });
    // The panel width is CSS-driven (SCSS falls back to the 280px min width) until the
    // user drags the resize handle, at which point the var is set imperatively.
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('');
  });
  it('Should resize to the dragged width and emit the final width on pointer release', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
    });
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    const handle = page.root?.shadowRoot?.querySelector('[data-testid="wpp-side-panel-resize-handle"]');
    // The panel starts at the 280px default and is docked to the right edge, so dragging
    // the left handle 100px to the left (500 -> 400) grows it to 380px.
    handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
    document.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('380px');
    document.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
    await page.waitForChanges();
    expect(resizeSpy).toHaveBeenCalledTimes(1);
    expect(resizeSpy.mock.calls[0][0].detail).toEqual({ width: 380 });
  });
  it('Should keep the current width when the handle is pressed and released without any movement', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
    });
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    const handle = page.root?.shadowRoot?.querySelector('[data-testid="wpp-side-panel-resize-handle"]');
    handle.dispatchEvent(new MouseEvent('pointerdown'));
    document.dispatchEvent(new MouseEvent('pointerup'));
    await page.waitForChanges();
    expect(resizeSpy).toHaveBeenCalledTimes(0);
  });
  it('Should abort the resize on pointer cancel and ignore further movement', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
    });
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    const handle = page.root?.shadowRoot?.querySelector('[data-testid="wpp-side-panel-resize-handle"]');
    handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
    document.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('380px');
    // The gesture is cancelled (e.g. the browser takes over the pointer).
    document.dispatchEvent(new MouseEvent('pointercancel', { clientX: 400 }));
    const widthAfterCancel = page.root?.style.getPropertyValue('--wpp-side-panel-current-width');
    // Any further pointer movement must no longer resize the panel.
    document.dispatchEvent(new MouseEvent('pointermove', { clientX: 100 }));
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(widthAfterCancel);
    expect(resizeSpy).toHaveBeenCalled();
  });
  it('Should emit close event with crossClick reason when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
    });
    const closeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelClose', closeSpy);
    const closeButton = page.root?.shadowRoot?.querySelector('.close-button');
    closeButton?.click();
    await page.waitForChanges();
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy.mock.calls[0][0].detail).toEqual({ reason: 'crossClick' });
  });
  it('does not close on Escape when the keydown originates outside the panel', async () => {
    const page = await newSpecPage({
      components: [WppSidePanel],
      html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
    });
    const closeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelClose', closeSpy);
    // Dispatched on document, so the event target is outside the panel and the
    // `isEventTargetContained` guard should suppress the close.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await page.waitForChanges();
    expect(closeSpy).not.toHaveBeenCalled();
  });
});
describe('wpp-side-panel resize handle accessibility', () => {
  const getResizeHandle = (page) => page.root?.shadowRoot?.querySelector('[data-testid="wpp-side-panel-resize-handle"]');
  const pressKey = async (page, handle, key) => {
    handle.dispatchEvent(new KeyboardEvent('keydown', { key }));
    await page.waitForChanges();
  };
  const openPanel = () => newSpecPage({
    components: [WppSidePanel],
    html: `<wpp-side-panel open panel-title="Title"></wpp-side-panel>`,
  });
  it('exposes the ARIA window-splitter semantics on the resize handle', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
    expect(handle.getAttribute('tabindex')).toBe('0');
    expect(handle.getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.resizeHandleLabel);
    // The panel starts at the 280px default and is bounded by the 280–440px range.
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MIN_WIDTH));
    expect(handle.getAttribute('aria-valuemin')).toBe(String(SIDE_PANEL_MIN_WIDTH));
    expect(handle.getAttribute('aria-valuemax')).toBe(String(SIDE_PANEL_MAX_WIDTH));
    expect(handle.getAttribute('aria-valuetext')).toBe(`${SIDE_PANEL_MIN_WIDTH}px`);
  });
  it('keeps aria-valuetext in sync with the width after a keyboard step', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    await pressKey(page, handle, 'ArrowLeft');
    // ArrowLeft grows the panel (docked right) by a single keyboard step: 280 -> 290.
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MIN_WIDTH + SIDE_PANEL_KEYBOARD_STEP));
    expect(handle.getAttribute('aria-valuetext')).toBe(`${SIDE_PANEL_MIN_WIDTH + SIDE_PANEL_KEYBOARD_STEP}px`);
  });
  it('shrinks the panel by one keyboard step on ArrowRight', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    // The panel starts at the 280px min width, so it is first grown away from the lower bound
    // (280 -> 290) before ArrowRight can shrink the right-docked panel by a single step.
    await pressKey(page, handle, 'ArrowLeft');
    await pressKey(page, handle, 'ArrowRight');
    expect(resizeSpy).toHaveBeenCalledTimes(2);
    expect(resizeSpy.mock.calls[1][0].detail).toEqual({ width: SIDE_PANEL_MIN_WIDTH });
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(`${SIDE_PANEL_MIN_WIDTH}px`);
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MIN_WIDTH));
  });
  it('ignores keys that are not resize controls', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    // A key outside the handled set is a no-op: no resize event, no width applied.
    await pressKey(page, handle, 'Enter');
    expect(resizeSpy).not.toHaveBeenCalled();
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('');
  });
  it('does not start a resize on a non-primary pointer button', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    // A right-click (button 2) must not begin a drag.
    handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500, button: 2 }));
    document.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('');
    document.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
    expect(resizeSpy).not.toHaveBeenCalled();
  });
  it('starts the panel at the min width without an inline width override', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    // The width is CSS-driven until the first resize, so no inline var is set up front.
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe('');
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MIN_WIDTH));
  });
  // Complex scenario: a full keyboard-driven resize journey
  it('drives a keyboard resize journey, clamping at both the min and max bounds', async () => {
    const page = await openPanel();
    const handle = getResizeHandle(page);
    const resizeSpy = jest.fn();
    page.root?.addEventListener('wppSidePanelResize', resizeSpy);
    // ArrowLeft grows the panel (docked right) by one step each press. Five steps of
    // SIDE_PANEL_KEYBOARD_STEP: 280 -> 330.
    const widthAfterFiveSteps = SIDE_PANEL_MIN_WIDTH + 5 * SIDE_PANEL_KEYBOARD_STEP;
    for (let i = 0; i < 5; i++) {
      await pressKey(page, handle, 'ArrowLeft');
    }
    expect(resizeSpy).toHaveBeenCalledTimes(5);
    expect(resizeSpy.mock.calls[4][0].detail).toEqual({ width: widthAfterFiveSteps });
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(`${widthAfterFiveSteps}px`);
    expect(handle.getAttribute('aria-valuenow')).toBe(String(widthAfterFiveSteps));
    // End jumps straight to the max width.
    await pressKey(page, handle, 'End');
    expect(resizeSpy).toHaveBeenCalledTimes(6);
    expect(resizeSpy.mock.calls[5][0].detail).toEqual({ width: SIDE_PANEL_MAX_WIDTH });
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(`${SIDE_PANEL_MAX_WIDTH}px`);
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MAX_WIDTH));
    // ArrowLeft at the max is clamped to a no-op: no event, no change.
    await pressKey(page, handle, 'ArrowLeft');
    expect(resizeSpy).toHaveBeenCalledTimes(6);
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(`${SIDE_PANEL_MAX_WIDTH}px`);
    // Home jumps straight to the min width.
    await pressKey(page, handle, 'Home');
    expect(resizeSpy).toHaveBeenCalledTimes(7);
    expect(resizeSpy.mock.calls[6][0].detail).toEqual({ width: SIDE_PANEL_MIN_WIDTH });
    expect(handle.getAttribute('aria-valuenow')).toBe(String(SIDE_PANEL_MIN_WIDTH));
    // ArrowRight at the min is clamped to a no-op.
    await pressKey(page, handle, 'ArrowRight');
    expect(resizeSpy).toHaveBeenCalledTimes(7);
    expect(page.root?.style.getPropertyValue('--wpp-side-panel-current-width')).toBe(`${SIDE_PANEL_MIN_WIDTH}px`);
  });
  it('measures the body scrollbar gutter and exposes it as a CSS var', async () => {
    const page = await openPanel();
    const body = page.root?.shadowRoot?.querySelector('.body');
    // mock-doc computes no layout, so feed the body real box metrics: a 20px border box with a
    // 12px content box leaves an 8px reserved scrollbar gutter.
    Object.defineProperty(body, 'offsetWidth', { value: 20, configurable: true });
    Object.defineProperty(body, 'clientWidth', { value: 12, configurable: true });
    page.rootInstance.setScrollbarWidth();
    expect(page.root?.style.getPropertyValue('--side-panel-scrollbar-width')).toBe('8px');
  });
});
/**
 * These tests exercise the component's logical functions in isolation by instantiating the
 * class directly (without the Stencil runtime / DOM rendering) and mocking the `@Element`
 * host and the `@Event` emitters.
 */
describe('wpp-side-panel logic (isolated)', () => {
  const createInstance = () => {
    const instance = new WppSidePanel();
    // `@Element` (and the `@Event` emitters) compile to getter-only members, so they must be
    // stubbed via `Object.defineProperty` rather than direct assignment.
    const stub = (key, value) => Object.defineProperty(instance, key, { value, writable: true, configurable: true });
    // `contains` is stubbed to true so the escape-close guard (`isEventTargetContained`)
    // treats the keydown as originating inside the panel.
    stub('host', { classList: { add: jest.fn(), remove: jest.fn() }, contains: () => true });
    stub('wppSidePanelClose', { emit: jest.fn() });
    stub('wppSidePanelOpenStart', { emit: jest.fn() });
    stub('wppSidePanelOpenComplete', { emit: jest.fn() });
    stub('wppSidePanelCloseStart', { emit: jest.fn() });
    stub('wppSidePanelCloseComplete', { emit: jest.fn() });
    stub('wppSidePanelResize', { emit: jest.fn() });
    return instance;
  };
  describe('clampWidth', () => {
    it('clamps a value below the minimum up to the minimum', () => {
      const instance = createInstance();
      expect(instance.clampWidth(100)).toBe(SIDE_PANEL_MIN_WIDTH);
    });
    it('clamps a value above the maximum down to the maximum', () => {
      const instance = createInstance();
      expect(instance.clampWidth(1000)).toBe(SIDE_PANEL_MAX_WIDTH);
    });
    it('keeps a value within the allowed range', () => {
      const instance = createInstance();
      expect(instance.clampWidth(360)).toBe(360);
    });
    it('rounds fractional values', () => {
      const instance = createInstance();
      expect(instance.clampWidth(360.6)).toBe(361);
    });
  });
  describe('openPanel / closePanel', () => {
    it('openPanel sets open to true', async () => {
      const instance = createInstance();
      instance.open = false;
      await instance.openPanel();
      expect(instance.open).toBe(true);
    });
    it('closePanel sets open to false', async () => {
      const instance = createInstance();
      instance.open = true;
      await instance.closePanel();
      expect(instance.open).toBe(false);
    });
  });
  describe('handleChangeOpenStatus', () => {
    it('adds the ready class to the host when opening', () => {
      const instance = createInstance();
      instance.handleChangeOpenStatus(true);
      expect(instance.host.classList.add).toHaveBeenCalledWith('wpp-component-ready');
    });
    it('does not touch the host class list when closing', () => {
      const instance = createInstance();
      instance.handleChangeOpenStatus(false);
      expect(instance.host.classList.add).not.toHaveBeenCalled();
    });
  });
  describe('handleCloseOnEsc', () => {
    it('emits close with the escapePress reason when Escape is pressed while open', () => {
      const instance = createInstance();
      instance.open = true;
      instance.handleCloseOnEsc({ key: 'Escape', composedPath: () => [] });
      expect(instance.wppSidePanelClose.emit).toHaveBeenCalledWith({ reason: SidePanelCloseReason.escapePress });
      expect(instance.closeReason).toBe(SidePanelCloseReason.escapePress);
    });
    it('does nothing when Escape is pressed while closed', () => {
      const instance = createInstance();
      instance.open = false;
      instance.handleCloseOnEsc({ key: 'Escape' });
      expect(instance.wppSidePanelClose.emit).not.toHaveBeenCalled();
      expect(instance.closeReason).toBeNull();
    });
    it('ignores non-Escape keys', () => {
      const instance = createInstance();
      instance.open = true;
      instance.handleCloseOnEsc({ key: 'Enter' });
      expect(instance.wppSidePanelClose.emit).not.toHaveBeenCalled();
    });
  });
  describe('handleCloseClick', () => {
    it('emits close with the crossClick reason and records the reason', () => {
      const instance = createInstance();
      instance.handleCloseClick();
      expect(instance.wppSidePanelClose.emit).toHaveBeenCalledWith({ reason: SidePanelCloseReason.crossClick });
      expect(instance.closeReason).toBe(SidePanelCloseReason.crossClick);
    });
  });
  describe('handleTransitionStart', () => {
    it('ignores transitions that are not for the visibility property', () => {
      const instance = createInstance();
      instance.handleTransitionStart({ propertyName: 'opacity' });
      expect(instance.wppSidePanelOpenStart.emit).not.toHaveBeenCalled();
      expect(instance.wppSidePanelCloseStart.emit).not.toHaveBeenCalled();
    });
    it('emits open start and reveals the panel when opening', () => {
      const instance = createInstance();
      instance.open = true;
      instance.isHidden = true;
      instance.handleTransitionStart({ propertyName: 'visibility' });
      expect(instance.isHidden).toBe(false);
      expect(instance.wppSidePanelOpenStart.emit).toHaveBeenCalled();
    });
    it('emits close start with the stored reason when closing', () => {
      const instance = createInstance();
      instance.open = false;
      instance.closeReason = SidePanelCloseReason.crossClick;
      instance.handleTransitionStart({ propertyName: 'visibility' });
      expect(instance.wppSidePanelCloseStart.emit).toHaveBeenCalledWith({ reason: SidePanelCloseReason.crossClick });
    });
    it('emits close start without a reason when none was recorded', () => {
      const instance = createInstance();
      instance.open = false;
      instance.closeReason = null;
      instance.handleTransitionStart({ propertyName: 'visibility' });
      expect(instance.wppSidePanelCloseStart.emit).toHaveBeenCalledWith();
    });
  });
  describe('handleTransitionEnd', () => {
    it('ignores transitions that are not for the visibility property', () => {
      const instance = createInstance();
      instance.handleTransitionEnd({ propertyName: 'opacity' });
      expect(instance.wppSidePanelOpenComplete.emit).not.toHaveBeenCalled();
      expect(instance.wppSidePanelCloseComplete.emit).not.toHaveBeenCalled();
    });
    it('emits open complete when opening', () => {
      const instance = createInstance();
      instance.open = true;
      instance.closeReason = null;
      instance.handleTransitionEnd({ propertyName: 'visibility' });
      expect(instance.wppSidePanelOpenComplete.emit).toHaveBeenCalled();
      expect(instance.closeReason).toBeNull();
    });
    it('hides the panel and emits close complete with the reason when closing', () => {
      const instance = createInstance();
      instance.open = false;
      instance.isHidden = false;
      instance.closeReason = SidePanelCloseReason.escapePress;
      instance.handleTransitionEnd({ propertyName: 'visibility' });
      expect(instance.isHidden).toBe(true);
      expect(instance.wppSidePanelCloseComplete.emit).toHaveBeenCalledWith({ reason: SidePanelCloseReason.escapePress });
      // The reason is reset after the close animation completes.
      expect(instance.closeReason).toBeNull();
    });
    it('emits close complete without a reason when none was recorded', () => {
      const instance = createInstance();
      instance.open = false;
      instance.closeReason = null;
      instance.handleTransitionEnd({ propertyName: 'visibility' });
      expect(instance.wppSidePanelCloseComplete.emit).toHaveBeenCalledWith();
    });
  });
  describe('_locales', () => {
    it('returns the defaults when no locales are provided', () => {
      const instance = createInstance();
      expect(instance._locales).toEqual(LOCALES_DEFAULTS);
    });
    it('merges provided locales over the defaults', () => {
      const instance = createInstance();
      instance.locales = { closeIconLabel: 'Dismiss' };
      expect(instance._locales.closeIconLabel).toBe('Dismiss');
    });
  });
  describe('css class helpers', () => {
    it('hostCssClasses reflects the open/hidden state', () => {
      const instance = createInstance();
      instance.open = true;
      instance.isHidden = false;
      expect(instance.hostCssClasses()).toEqual({
        'wpp-side-panel': true,
        'wpp-side-panel-wrapper': true,
        'wpp-visible': true,
        'wpp-hidden': false,
      });
    });
    it('panelCssClasses toggles visible/hide based on open', () => {
      const instance = createInstance();
      instance.open = true;
      expect(instance.panelCssClasses()).toEqual({ 'side-panel': true, visible: true, hide: false });
      instance.open = false;
      expect(instance.panelCssClasses()).toEqual({ 'side-panel': true, visible: false, hide: true });
    });
  });
  describe('renderActions', () => {
    it('renders nothing when there is no actions config', () => {
      const instance = createInstance();
      instance.actionsConfig = undefined;
      expect(instance.renderActions()).toBeNull();
    });
    it('renders nothing when the actions config does not contain exactly two items', () => {
      const instance = createInstance();
      instance.actionsConfig = [{ label: 'Only one', onClick: () => { } }];
      expect(instance.renderActions()).toBeNull();
    });
    it('renders the actions container when exactly two items are provided', () => {
      const instance = createInstance();
      instance.actionsConfig = [
        { label: 'Cancel', onClick: () => { } },
        { label: 'Save', onClick: () => { } },
      ];
      expect(instance.renderActions()).not.toBeNull();
    });
  });
});

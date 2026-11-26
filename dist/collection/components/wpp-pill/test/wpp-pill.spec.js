import { newSpecPage } from '@stencil/core/testing';
import { WppPill } from '../wpp-pill';
import { WppAvatar } from '../../wpp-avatar/wpp-avatar';
describe('wpp-pill', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='single'/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label Text and checked state', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='single' label='Text' checked/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders display type component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='display'/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders draggable type component', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='draggable'/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with type "multiple" and disabled state', async () => {
    const page = await newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='multiple' disabled label='Text'/>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing accessibility', () => {
    // The pill is the control, so a tooltip avatar in it must not add a nested button or a Tab stop (nested-interactive)
    it('leaves nothing focusable inside an icon-start avatar that has a tooltip', async () => {
      const page = await newSpecPage({
        components: [WppPill, WppAvatar],
        html: `<wpp-pill type="multiple" label="Apple">
          <wpp-avatar slot="icon-start" name="Linkedin" src="avatar.png" with-tooltip></wpp-avatar>
        </wpp-pill>`,
      });
      const avatar = page.body.querySelector('wpp-avatar');
      // The mock DOM neither fires slotchange nor assigns slotted nodes, so hand the slot its avatar.
      const slot = page.root?.shadowRoot?.querySelector('slot[name="icon-start"]');
      slot.assignedElements = () => [avatar];
      slot.dispatchEvent(new Event('slotchange'));
      await page.waitForChanges();
      expect(avatar.getAttribute('role')).toBe('presentation');
      expect(avatar.tabIndex).toBe(-1);
      expect(avatar.shadowRoot?.querySelector('[role="button"], [tabindex]')).toBeNull();
    });
    it('renders the default locales as accessible names of the drag and close icon buttons', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' removable label='Text'/>`,
      });
      expect(page.rootInstance.locales).toEqual({});
      expect(page.rootInstance._locales).toEqual({
        removePillLabel: 'Remove {label}',
        dragPillLabel: 'Drag pill',
        draggablePillRoleDescription: 'Draggable pill',
      });
      expect(page.root?.shadowRoot?.querySelector('[part="drag-icon"]')?.getAttribute('aria-label')).toBe('Drag pill');
      expect(page.root?.shadowRoot?.querySelector('[part="remove-icon"]')?.getAttribute('aria-label')).toBe('Remove Text');
    });
    it('merges partial `locales` with the defaults and renders them', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' removable label='Text'/>`,
      });
      page.root.locales = { dragPillLabel: 'Glisser la pilule' };
      await page.waitForChanges();
      expect(page.rootInstance._locales).toEqual({
        removePillLabel: 'Remove {label}',
        dragPillLabel: 'Glisser la pilule',
        draggablePillRoleDescription: 'Draggable pill',
      });
      expect(page.root?.shadowRoot?.querySelector('[part="drag-icon"]')?.getAttribute('aria-label')).toBe('Glisser la pilule');
      expect(page.root?.shadowRoot?.querySelector('[part="remove-icon"]')?.getAttribute('aria-label')).toBe('Remove Text');
    });
    it('names each close icon button after its own pill', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<div><wpp-pill type='display' removable label='Avocado'></wpp-pill><wpp-pill type='display' removable label='Banana'></wpp-pill></div>`,
      });
      const names = Array.from(page.body.querySelectorAll('wpp-pill')).map(pill => pill.shadowRoot?.querySelector('[part="remove-icon"]')?.getAttribute('aria-label'));
      expect(names).toEqual(['Remove Avocado', 'Remove Banana']);
    });
    it('fills the `{label}` placeholder of a translated `removePillLabel`', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='display' removable label='Avocat'/>`,
      });
      page.root.locales = { removePillLabel: 'Retirer {label}' };
      await page.waitForChanges();
      expect(page.root?.shadowRoot?.querySelector('[part="remove-icon"]')?.getAttribute('aria-label')).toBe('Retirer Avocat');
    });
    it('keeps a disabled pill in the accessibility tree with `aria-disabled` and without `aria-hidden`', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='single' disabled label='Text'/>`,
      });
      expect(page.root?.getAttribute('aria-disabled')).toBe('true');
      expect(page.root?.hasAttribute('aria-hidden')).toBe(false);
      expect(page.root?.getAttribute('tabindex')).toBe('-1');
    });
    it.each([
      { type: 'draggable', iconParts: ['drag-icon', 'remove-icon'] },
      { type: 'display', iconParts: ['remove-icon'] },
    ])('exposes the disabled state on the icon buttons of a disabled `$type` pill', async ({ type, iconParts }) => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='${type}' removable label='Text'/>`,
      });
      const getIcon = (part) => page.root?.shadowRoot?.querySelector(`[part="${part}"]`);
      iconParts.forEach(part => {
        expect(getIcon(part)?.hasAttribute('aria-disabled')).toBe(false);
        expect(getIcon(part)?.getAttribute('tabindex')).toBe('0');
      });
      page.root.disabled = true;
      await page.waitForChanges();
      iconParts.forEach(part => {
        expect(getIcon(part)?.getAttribute('aria-disabled')).toBe('true');
        expect(getIcon(part)?.getAttribute('tabindex')).toBe('-1');
      });
    });
    it('does not set `aria-roledescription` on a standalone draggable pill with role `presentation`', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' label='Text'/>`,
      });
      expect(page.root?.getAttribute('role')).toBe('presentation');
      expect(page.root?.hasAttribute('aria-roledescription')).toBe(false);
    });
    it('sets `aria-roledescription` from the locales when the draggable pill has a role from the group', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' label='Text'/>`,
      });
      page.root.ariaProps = { role: 'listitem' };
      await page.waitForChanges();
      expect(page.root?.getAttribute('aria-roledescription')).toBe('Draggable pill');
      page.root.ariaProps = { role: 'listitem', roleDescription: 'Custom description' };
      await page.waitForChanges();
      expect(page.root?.getAttribute('aria-roledescription')).toBe('Custom description');
    });
    it.each([{ type: 'single' }, { type: 'multiple' }, { type: 'display' }, { type: 'draggable' }])('lets the `$type` pill host trigger the tooltip of a truncated label, so it also opens on keyboard focus', async ({ type }) => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='${type}' removable label='A very long pill label'/>`,
      });
      expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
      // mock-doc measures every box as 0x0, so set the truncation state the overflow check would set.
      page.rootInstance.isOverflowTruncated = true;
      await page.waitForChanges();
      const tooltip = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltip?.getAttribute('text')).toBe('A very long pill label');
      expect(tooltip?.config.triggerTarget).toBe(page.root);
    });
  });
  describe('Testing methods', () => {
    // Both methods focus inside a `setTimeout(..., 0)`, so wait a macrotask before asserting.
    const flushTimeout = () => new Promise(resolve => setTimeout(resolve, 0));
    it('`setFocusDragIcon` focuses the drag icon and switches on its keyboard focus ring', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' removable label='Text'/>`,
      });
      const dragIcon = page.root?.shadowRoot?.querySelector('[part="drag-icon"]');
      // Spec-page elements are proxied, so a `focus` spy on the element itself is not reliable: stub the ref instead.
      const focusSpy = jest.fn();
      page.rootInstance.iconDragRef = { focus: focusSpy };
      await page.rootInstance.setFocusDragIcon();
      await flushTimeout();
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.focusType).toEqual({
        wrapper: 'idle',
        'icon-close': 'idle',
        'icon-draggable': 'tab-focus',
      });
      expect(dragIcon.classList.contains('tab-focus')).toBe(true);
      expect(page.root?.shadowRoot?.querySelector('[part="remove-icon"]')?.classList.contains('idle')).toBe(true);
    });
    it('`setFocusDragIcon(false)` focuses the drag icon without the keyboard focus ring', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' label='Text'/>`,
      });
      const focusSpy = jest.fn();
      page.rootInstance.iconDragRef = { focus: focusSpy };
      await page.rootInstance.setFocusDragIcon(false);
      await flushTimeout();
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.focusType['icon-draggable']).toBe('focus');
      expect(page.root?.shadowRoot?.querySelector('[part="drag-icon"]')?.classList.contains('tab-focus')).toBe(false);
    });
    it('`setFocus` focuses the host and switches on the wrapper focus ring', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='single' label='Text'/>`,
      });
      const focusSpy = jest.fn();
      Object.defineProperty(page.root, 'focus', { value: focusSpy, configurable: true });
      await page.rootInstance.setFocus();
      await flushTimeout();
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.focusType.wrapper).toBe('tab-focus');
      expect(page.root?.shadowRoot?.querySelector('[part="pill-wrapper"]')?.classList.contains('tab-focus')).toBe(true);
    });
  });
  describe('Testing `checkTabIndex`', () => {
    it.each([
      { type: 'single', disabled: false, tabindex: '0' },
      { type: 'multiple', disabled: false, tabindex: '0' },
      { type: 'display', disabled: false, tabindex: null },
      // No `tabindex="-1"`: on a shadow host it would take the drag and remove icon buttons out of the Tab order.
      { type: 'draggable', disabled: false, tabindex: null },
      { type: 'single', disabled: true, tabindex: '-1' },
      { type: 'draggable', disabled: true, tabindex: '-1' },
    ])('`$type` type, disabled=$disabled renders tabindex=$tabindex', async ({ type, disabled, tabindex }) => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='${type}' label='Text' ${disabled ? 'disabled' : ''}/>`,
      });
      expect(page.root?.getAttribute('tabindex')).toBe(tabindex);
    });
  });
  describe('Testing `onMouseDown`', () => {
    it('disabled pill cancels the mousedown so a click cannot focus it', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' disabled label='Text'/>`,
      });
      const mockEvent = new MouseEvent('mousedown', { cancelable: true });
      const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
      page.rootInstance.onMouseDown(mockEvent);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.focusType).toEqual({ wrapper: 'idle', 'icon-close': 'idle', 'icon-draggable': 'idle' });
    });
    it('enabled pill does not cancel the mousedown and tracks the mouse focus type', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='single' label='Text'/>`,
      });
      const mockEvent = new MouseEvent('mousedown', { cancelable: true });
      const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
      page.rootInstance.onMouseDown(mockEvent);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
      expect(page.rootInstance.focusType.wrapper).toBe('focus');
    });
    it('`draggable` type emits `wppDragPress` and sets the `active` state', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' label='Text'/>`,
      });
      const dragPressSpy = jest.fn();
      page.root.addEventListener('wppDragPress', dragPressSpy);
      page.rootInstance.onMouseDown(new MouseEvent('mousedown'));
      expect(dragPressSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.componentState).toBe('active');
    });
    it('disabled `draggable` type does not emit `wppDragPress` and keeps the state unchanged', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='draggable' disabled label='Text'/>`,
      });
      const dragPressSpy = jest.fn();
      page.root.addEventListener('wppDragPress', dragPressSpy);
      page.rootInstance.onMouseDown(new MouseEvent('mousedown'));
      expect(dragPressSpy).not.toHaveBeenCalled();
      expect(page.rootInstance.componentState).toBeUndefined();
    });
    it('non-draggable type does not emit `wppDragPress`', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='display' label='Text'/>`,
      });
      const dragPressSpy = jest.fn();
      page.root.addEventListener('wppDragPress', dragPressSpy);
      page.rootInstance.onMouseDown(new MouseEvent('mousedown'));
      expect(dragPressSpy).not.toHaveBeenCalled();
    });
  });
  describe('Testing `onCloseKeyDown`', () => {
    const buildRemovablePill = (isDisabled = false) => newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='display' ${isDisabled ? 'disabled' : ''} removable label='Text'/>`,
    });
    it.each([{ key: 'Enter' }, { key: ' ' }])('`$key` on the remove icon emits `wppClose` with the keyboard event and stops it from propagating', async ({ key }) => {
      const page = await buildRemovablePill();
      const wppCloseSpy = jest.fn();
      page.root.addEventListener('wppClose', wppCloseSpy);
      const keyboardEvent = new KeyboardEvent('keydown', { key, cancelable: true });
      const preventDefaultSpy = jest.spyOn(keyboardEvent, 'preventDefault');
      const stopPropagationSpy = jest.spyOn(keyboardEvent, 'stopPropagation');
      page.root.shadowRoot.querySelector('[part="remove-icon"]').dispatchEvent(keyboardEvent);
      expect(wppCloseSpy).toHaveBeenCalledTimes(1);
      // Parents (e.g. `wpp-autocomplete`) read the event type to tell a keyboard removal from a mouse one.
      expect(wppCloseSpy.mock.calls[0][0].detail).toBe(keyboardEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
    it('other keys on the remove icon do not emit `wppClose`', async () => {
      const page = await buildRemovablePill();
      const wppCloseSpy = jest.fn();
      page.root.addEventListener('wppClose', wppCloseSpy);
      page
        .root.shadowRoot.querySelector('[part="remove-icon"]')
        .dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      expect(wppCloseSpy).not.toHaveBeenCalled();
    });
    it('a disabled pill does not emit `wppClose`', async () => {
      const page = await buildRemovablePill(true);
      const wppCloseSpy = jest.fn();
      page.root.addEventListener('wppClose', wppCloseSpy);
      page.rootInstance.onCloseKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(wppCloseSpy).not.toHaveBeenCalled();
    });
  });
  describe('Testing `onClick`', () => {
    const buildPill = (type, isDisabled = false) => newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='${type}' ${isDisabled ? 'disabled' : ''} removable label='Text'/>`,
    });
    it.each([{ type: 'single' }, { type: 'multiple' }])('`$type` type focuses the host, never the hidden input', async ({ type }) => {
      const page = await buildPill(type);
      const hostFocusSpy = jest.spyOn(page.root, 'focus');
      const inputFocusSpy = jest.spyOn(page.root.shadowRoot.querySelector('input'), 'focus');
      page.rootInstance.onClick(new MouseEvent('click', { cancelable: true }));
      expect(hostFocusSpy).toHaveBeenCalledTimes(1);
      expect(inputFocusSpy).not.toHaveBeenCalled();
    });
    it('`display` type does not move focus', async () => {
      const page = await buildPill('display');
      const hostFocusSpy = jest.spyOn(page.root, 'focus');
      const inputFocusSpy = jest.spyOn(page.root.shadowRoot.querySelector('input'), 'focus');
      page.rootInstance.onClick(new MouseEvent('click', { cancelable: true }));
      expect(hostFocusSpy).not.toHaveBeenCalled();
      expect(inputFocusSpy).not.toHaveBeenCalled();
    });
    it('`draggable` type focuses the drag icon, as the host itself is not focusable', async () => {
      const page = await buildPill('draggable');
      const dragIconFocusSpy = jest.spyOn(page.root.shadowRoot.querySelector('[part="drag-icon"]'), 'focus');
      const hostFocusSpy = jest.spyOn(page.root, 'focus');
      page.rootInstance.onClick(new MouseEvent('click', { cancelable: true }));
      expect(dragIconFocusSpy).toHaveBeenCalledTimes(1);
      expect(hostFocusSpy).not.toHaveBeenCalled();
    });
    it('`draggable` type keeps focus on the drag icon when the drag icon was clicked', async () => {
      const page = await buildPill('draggable');
      const dragIcon = page.root.shadowRoot.querySelector('[part="drag-icon"]');
      Object.defineProperty(page.root.shadowRoot, 'activeElement', { value: dragIcon, configurable: true });
      const hostFocusSpy = jest.spyOn(page.root, 'focus');
      page.rootInstance.onClick(new MouseEvent('click', { cancelable: true }));
      expect(hostFocusSpy).not.toHaveBeenCalled();
    });
    it('disabled pill neither moves focus nor emits `wppClick`', async () => {
      const page = await buildPill('single', true);
      const hostFocusSpy = jest.spyOn(page.root, 'focus');
      const wppClickSpy = jest.fn();
      page.root.addEventListener('wppClick', wppClickSpy);
      page.rootInstance.onClick(new MouseEvent('click', { cancelable: true }));
      expect(hostFocusSpy).not.toHaveBeenCalled();
      expect(wppClickSpy).not.toHaveBeenCalled();
    });
  });
});

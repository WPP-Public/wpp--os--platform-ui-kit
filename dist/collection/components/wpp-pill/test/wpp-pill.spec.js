import { newSpecPage } from '@stencil/core/testing';
import { WppPill } from '../wpp-pill';
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
  describe('removable pill accessibility (WPPOPENDS-1496)', () => {
    const mkRemovablePill = () => newSpecPage({
      components: [WppPill],
      html: `<wpp-pill type='display' label='Mango' removable/>`,
    });
    it('exposes the remove icon as a named button', async () => {
      const page = await mkRemovablePill();
      const removeIcon = page.root?.shadowRoot?.querySelector('[part="remove-icon"]');
      expect(removeIcon?.getAttribute('role')).toBe('button');
      expect(removeIcon?.getAttribute('aria-label')).toBe('Remove Mango');
      expect(removeIcon?.getAttribute('tabindex')).toBe('0');
    });
    it('setRemoveIconFocus paints the keyboard focus ring on the remove icon', async () => {
      const page = await mkRemovablePill();
      const removeIcon = page.root?.shadowRoot?.querySelector('[part="remove-icon"]');
      const focus = jest.fn();
      removeIcon.focus = focus;
      expect(removeIcon.className).not.toContain('tab-focus');
      await page.rootInstance.setRemoveIconFocus();
      await page.waitForChanges();
      // The ring is otherwise only set from this component's own Tab keyup, so a parent focusing
      // the icon directly would move focus with nothing on screen to show for it.
      expect(focus).toHaveBeenCalledTimes(1);
      expect(removeIcon.className).toContain('tab-focus');
    });
    it.each(['Enter', ' '])('emits wppClose when "%s" is pressed on the remove icon', async (key) => {
      const page = await mkRemovablePill();
      const closeSpy = jest.fn();
      page.root?.addEventListener('wppClose', closeSpy);
      const removeIcon = page.root?.shadowRoot?.querySelector('[part="remove-icon"]');
      removeIcon?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await page.waitForChanges();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
    it('does not emit wppClose from keyboard when disabled', async () => {
      const page = await newSpecPage({
        components: [WppPill],
        html: `<wpp-pill type='display' label='Mango' removable disabled/>`,
      });
      const closeSpy = jest.fn();
      page.root?.addEventListener('wppClose', closeSpy);
      const removeIcon = page.root?.shadowRoot?.querySelector('[part="remove-icon"]');
      expect(removeIcon?.getAttribute('tabindex')).toBe('-1');
      removeIcon?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(closeSpy).not.toHaveBeenCalled();
    });
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WppNavigationItem } from '../wpp-navigation-item';
describe('wpp-navigation-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders selected component with label Title', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item label='Title' selected />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with menu icon', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item menu />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with chevron icon', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item hasNestedItems />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('uses valid ARIA roles instead of the WPP-LIST-ITEM tag name', async () => {
    const extended = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item extended label='Learning' />`,
    });
    expect(extended.root?.getAttribute('role')).toBe('button');
    const menu = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item menu />`,
    });
    expect(menu.root?.getAttribute('role')).toBe('button');
    const nested = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item nested-item label='Case studies' />`,
    });
    expect(nested.root?.getAttribute('role')).toBe('menuitem');
    const link = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item label='Home' />`,
    });
    expect(link.root?.getAttribute('role')).toBeNull();
  });
  it('exposes the label as an accessible name on button-role triggers', async () => {
    const menu = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item menu label='More' />`,
    });
    expect(menu.root?.getAttribute('aria-label')).toBe('More');
    const extended = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item extended label='Learning' />`,
    });
    expect(extended.root?.getAttribute('aria-label')).toBe('Learning');
    const nested = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item nested-item label='Case studies' />`,
    });
    expect(nested.root?.getAttribute('aria-label')).toBeNull();
  });
  it('falls back to the value as an accessible name on label-less triggers', async () => {
    // A chevron-only trigger has no label (e.g. { chevronOnly: true, value: 'learning' })
    // and must not end up as an unnamed button (axe aria-command-name).
    const chevronOnly = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item extended chevron-only value='learning' />`,
    });
    expect(chevronOnly.root?.getAttribute('aria-label')).toBe('learning');
    // The truncated-overflow "more" trigger has neither label nor value.
    const overflowMenu = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item menu />`,
    });
    expect(overflowMenu.root?.getAttribute('aria-label')).toBe('More navigation items');
    const unnamed = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item extended />`,
    });
    expect(unnamed.root?.getAttribute('aria-label')).toBeNull();
  });
  it('marks the structural list item of a nested entry as presentation', async () => {
    const nested = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item nested-item label='Case studies' />`,
    });
    const li = nested.root?.shadowRoot?.querySelector('li.list-item');
    expect(li?.getAttribute('role')).toBe('presentation');
  });
  describe('top-level link', () => {
    const render = (html) => newSpecPage({ components: [WppNavigationItem], html });
    const anchor = (page) => page.root?.shadowRoot?.querySelector('a');
    it('takes focus on the anchor, not the host', async () => {
      const page = await render(`<wpp-navigation-item label="Home" path="/home"></wpp-navigation-item>`);
      expect(page.root?.hasAttribute('tabindex')).toBe(false);
      expect(page.root?.hasAttribute('role')).toBe(false);
      expect(anchor(page).getAttribute('tabindex')).toBe('0');
      expect(anchor(page).getAttribute('href')).toBe('/home');
      expect(anchor(page).hasAttribute('role')).toBe(false);
    });
    it('marks the active link as the current page', async () => {
      const page = await render(`<wpp-navigation-item label="Home" path="/home" active></wpp-navigation-item>`);
      expect(anchor(page).getAttribute('aria-current')).toBe('page');
    });
    it('does not mark an inactive link as the current page', async () => {
      const page = await render(`<wpp-navigation-item label="Home" path="/home"></wpp-navigation-item>`);
      expect(anchor(page).hasAttribute('aria-current')).toBe(false);
    });
    it('follows a link without an href on Enter', async () => {
      const page = await render(`<wpp-navigation-item label="Home" value="home"></wpp-navigation-item>`);
      const changed = jest.fn();
      page.root?.addEventListener('wppActiveNavItemChanged', changed);
      anchor(page).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(anchor(page).getAttribute('role')).toBe('link');
      expect(changed.mock.calls[0][0].detail).toEqual({ path: undefined, value: 'home', label: 'Home' });
    });
    it('keeps the host as the focus target of a nested menu item', async () => {
      const page = await render(`<wpp-navigation-item nested-item label="Case studies" path="/cs"></wpp-navigation-item>`);
      expect(page.root?.getAttribute('tabindex')).toBe('0');
      expect(page.root?.getAttribute('role')).toBe('menuitem');
      expect(anchor(page).getAttribute('tabindex')).toBe('-1');
      expect(anchor(page).hasAttribute('aria-current')).toBe(false);
    });
    it('keeps the host as the focus target of a menu trigger', async () => {
      const page = await render(`<wpp-navigation-item extended label="Learning"></wpp-navigation-item>`);
      expect(page.root?.getAttribute('tabindex')).toBe('0');
      expect(page.root?.getAttribute('role')).toBe('button');
    });
  });
});

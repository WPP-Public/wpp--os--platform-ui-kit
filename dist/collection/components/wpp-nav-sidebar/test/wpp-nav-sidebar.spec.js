import { newSpecPage } from '@stencil/core/testing';
import { WppNavSidebar } from '../wpp-nav-sidebar';
import { WppNavSidebarItem } from '../components/wpp-nav-sidebar-item/wpp-nav-sidebar-item';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-nav-sidebar', () => {
  it('should render close navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render open navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${true} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    });
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
        components: [WppNavSidebar, WppNavSidebarItem],
        html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppNavSidebar, WppNavSidebarItem],
        html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('accessibility (WPPOPENDS-1501)', () => {
    const mkSidebar = (activePath) => newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar${activePath ? ` active-path="${activePath}"` : ''}>
              <wpp-nav-sidebar-item label="Dashboard" path="/dashboard"></wpp-nav-sidebar-item>
              <wpp-nav-sidebar-item label="Projects" extended>
                <wpp-nav-sidebar-item label="Projects 01" path="/project1"></wpp-nav-sidebar-item>
                <wpp-nav-sidebar-item label="Projects 02" path="/project2"></wpp-nav-sidebar-item>
              </wpp-nav-sidebar-item>
            </wpp-nav-sidebar>`,
    });
    it('exposes the sidebar as a labelled navigation landmark', async () => {
      const page = await mkSidebar();
      const nav = page.root?.shadowRoot?.querySelector('nav');
      expect(nav).not.toBeNull();
      expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    });
    it('makes the link itself the tab stop instead of the host', async () => {
      const page = await mkSidebar();
      const item = page.root?.querySelector('wpp-nav-sidebar-item[path="/dashboard"]');
      const link = item?.shadowRoot?.querySelector('a');
      expect(item?.hasAttribute('tabindex')).toBe(false);
      expect(link?.hasAttribute('tabindex')).toBe(false);
    });
    it('marks the active item with aria-current="page" on its link', async () => {
      // `active` is set directly: the sidebar's own query uses versioned tag names, which the
      // spec environment does not register.
      const page = await mkSidebar();
      const item = page.root?.querySelector('wpp-nav-sidebar-item[path="/dashboard"]');
      const link = () => item.shadowRoot?.querySelector('a');
      expect(link()?.hasAttribute('aria-current')).toBe(false);
      item.setAttribute('active', 'true');
      await page.waitForChanges();
      expect(link()?.getAttribute('aria-current')).toBe('page');
    });
    it('exposes group toggles as buttons with aria-expanded and keyboard activation', async () => {
      const page = await mkSidebar();
      const group = page.root?.querySelector('wpp-nav-sidebar-item[extended]');
      const toggle = group.shadowRoot?.querySelector('[part="extended-item"]');
      expect(toggle.getAttribute('role')).toBe('button');
      expect(toggle.getAttribute('tabindex')).toBe('0');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      toggle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(group.expanded).toBe(true);
      expect(group.shadowRoot?.querySelector('[part="extended-item"]')?.getAttribute('aria-expanded')).toBe('true');
    });
    it('keeps collapsed sub-items out of the tab order and the accessibility tree', async () => {
      const page = await mkSidebar();
      const group = page.root?.querySelector('wpp-nav-sidebar-item[extended]');
      const wrapper = () => group.shadowRoot?.querySelector('.sub-items-wrapper');
      expect(wrapper()?.hasAttribute('inert')).toBe(true);
      expect(wrapper()?.getAttribute('aria-hidden')).toBe('true');
      group.expanded = true;
      await page.waitForChanges();
      expect(wrapper()?.hasAttribute('inert')).toBe(false);
      expect(wrapper()?.hasAttribute('aria-hidden')).toBe(false);
    });
    // The rail shortens long labels for layout. Without an explicit name the control is announced
    // as the clipped string — "Scheduled repo…" rather than "Scheduled reporting".
    describe('truncated labels', () => {
      const mkLongLabels = () => newSpecPage({
        components: [WppNavSidebar, WppNavSidebarItem],
        html: `<wpp-nav-sidebar>
                <wpp-nav-sidebar-item label="Shared reports" path="/shared"></wpp-nav-sidebar-item>
                <wpp-nav-sidebar-item label="Scheduled reporting overview" path="/scheduled"></wpp-nav-sidebar-item>
                <wpp-nav-sidebar-item label="Scheduled reporting" extended>
                  <wpp-nav-sidebar-item label="Nested" path="/nested"></wpp-nav-sidebar-item>
                </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
      });
      it('names a truncated link with its full label', async () => {
        const page = await mkLongLabels();
        const item = page.root?.querySelector('wpp-nav-sidebar-item[path="/scheduled"]');
        const link = item?.shadowRoot?.querySelector('a');
        expect(link?.textContent).not.toBe('Scheduled reporting overview');
        expect(link?.getAttribute('aria-label')).toBe('Scheduled reporting overview');
      });
      it('names a truncated group toggle with its full label', async () => {
        const page = await mkLongLabels();
        const group = page.root?.querySelector('wpp-nav-sidebar-item[extended]');
        const toggle = group?.shadowRoot?.querySelector('[role="button"]');
        expect(toggle?.getAttribute('aria-label')).toBe('Scheduled reporting');
      });
      it('leaves a label that fits to name itself from its content', async () => {
        const page = await mkLongLabels();
        const item = page.root?.querySelector('wpp-nav-sidebar-item[path="/shared"]');
        const link = item?.shadowRoot?.querySelector('a');
        expect(link?.textContent).toContain('Shared reports');
        expect(link?.hasAttribute('aria-label')).toBe(false);
      });
    });
    // The parent sets `active` after first render, so the marker has to follow the attribute
    // rather than a class captured on the way in. `active` is set directly for the same reason as
    // above: the sidebar's own query uses versioned tag names the spec environment does not register.
    it('moves the current-page marker when the active item changes', async () => {
      const page = await mkSidebar();
      const dashboard = page.root?.querySelector('wpp-nav-sidebar-item[path="/dashboard"]');
      const projects = page.root?.querySelector('wpp-nav-sidebar-item[extended]');
      const currentOf = (el) => el.shadowRoot?.querySelector('a')?.getAttribute('aria-current') ?? null;
      dashboard.setAttribute('active', 'true');
      await page.waitForChanges();
      expect(currentOf(dashboard)).toBe('page');
      dashboard.removeAttribute('active');
      await page.waitForChanges();
      expect(currentOf(dashboard)).toBeNull();
      // The group toggle is not a link, so it never carries the current-page marker.
      expect(projects.shadowRoot?.querySelector('a')).toBeNull();
    });
  });
});

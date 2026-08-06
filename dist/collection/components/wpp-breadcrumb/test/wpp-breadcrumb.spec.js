import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBreadcrumb } from '../wpp-breadcrumb';
const items = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Alfa',
    path: '/alfa',
  },
  {
    label: 'Bravo (International Radiotelephony Spelling Alphabet)',
    path: '/bravo',
  },
  {
    label: 'Charlie',
    path: '/charlie',
  },
  {
    label: 'Delta (International Radiotelephony Spelling Alphabet)',
    path: '/delta',
  },
  {
    label: 'Echo',
    path: '/echo',
  },
  {
    label: 'Foxtrot',
    path: '/foxtrot',
  },
];
describe('wpp-breadcrumb', () => {
  it('Testing values of default props when initialized', async () => {
    const breadcrumb = new WppBreadcrumb();
    expect(breadcrumb.items.length).toBe(0);
    expect(breadcrumb.maxLabelLength).toBe(30);
    expect(breadcrumb.middleTruncation).toBe(false);
    expect(breadcrumb.nativeLink).toBe(false);
    expect(breadcrumb.dropdownConfig).toEqual({});
    expect(breadcrumb.backBtnLabel).toBe(undefined);
  });
  it('renders correctly with no items', async () => {
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-3-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders correctly with items', async () => {
    const page = await newSpecPage({
      components: [WppBreadcrumb],
      template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('accessibility', () => {
    const items = [
      { label: 'Home', path: '/' },
      { label: 'Alfa', path: '/alfa' },
      { label: 'Bravo', path: '/bravo' },
      { label: 'Charlie', path: '/charlie' },
      { label: 'Delta', path: '/delta' },
      { label: 'Echo', path: '/echo' },
      { label: 'Foxtrot', path: '/foxtrot' },
    ];
    it('exposes the trail as a navigation landmark with a default label', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
      });
      expect(page.root.getAttribute('role')).toBe('navigation');
      expect(page.root.getAttribute('aria-label')).toBe('Breadcrumb');
    });
    it('lets the landmark label be overridden via locales', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items, locales: { navigationLabel: 'Fil dʼAriane' } }),
      });
      expect(page.root.getAttribute('aria-label')).toBe('Fil dʼAriane');
    });
    it('prefers ariaProps.navigation.labelledby over a label', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items, ariaProps: { navigation: { labelledby: 'heading-id' } } }),
      });
      expect(page.root.getAttribute('aria-labelledby')).toBe('heading-id');
      expect(page.root.hasAttribute('aria-label')).toBe(false);
    });
    it('marks the last item as the current page on the link when nativeLink is set', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items, nativeLink: true }),
      });
      const current = page.root.shadowRoot.querySelectorAll('[aria-current="page"]');
      expect(current).toHaveLength(1);
      expect(current[0].tagName).toBe('A');
      expect(current[0].textContent).toContain('Foxtrot');
    });
    it('does not force aria-current on the non-link current page', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
      });
      const current = page.root.shadowRoot.querySelectorAll('[aria-current="page"]');
      expect(current).toHaveLength(0);
    });
    it('forwards an accessible name to the collapsed-items menu trigger', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
      });
      const menu = page.root.shadowRoot.querySelector('.menu');
      expect(menu).not.toBeNull();
      expect(menu.ariaProps?.label).toBe('Show more breadcrumb items');
    });
    // The collapsed-items menu can only be opened by keyboard if its trigger is a tab stop.
    // wpp-icon-more is not focusable on its own and wpp-menu-context leaves tabindex to the
    // consumer, so the tab stop must live on the icon, not on the menu-context host.
    it('makes the collapsed-items menu trigger keyboard-focusable', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
      });
      const menu = page.root.shadowRoot.querySelector('.menu');
      const trigger = menu.querySelector('[slot="trigger-element"]');
      expect(trigger.getAttribute('tabindex')).toBe('0');
      expect(menu.getAttribute('tabindex')).toBeNull();
    });
    it('lets the collapsed-items menu label be overridden via locales', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items, locales: { showMoreLabel: 'More pages' } }),
      });
      const menu = page.root.shadowRoot.querySelector('.menu');
      expect(menu.ariaProps?.label).toBe('More pages');
    });
    it('does not render the navigation landmark for the back-button variant', async () => {
      const page = await newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { backBtnLabel: "Back to dashboard" }),
      });
      expect(page.root.getAttribute('role')).toBeNull();
      expect(page.root.shadowRoot.querySelector('button.back').textContent).toContain('Back to dashboard');
    });
    // WPPOPENDS-1482: the non-native item is a `span`, so without an explicit key handler it was
    // focusable but impossible to activate by keyboard (WCAG 2.1.1).
    describe('keyboard activation', () => {
      const mkPage = (nativeLink = false) => newSpecPage({
        components: [WppBreadcrumb],
        template: () => h("wpp-breadcrumb-v4-3-0", { items: items, nativeLink: nativeLink }),
      });
      const pressKey = (el, key) => {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        el.dispatchEvent(event);
        return event;
      };
      it('exposes non-native items as links', async () => {
        const page = await mkPage();
        const item = page.root.shadowRoot.querySelector('.item:not(.active)');
        expect(item.tagName.toLowerCase()).toBe('span');
        expect(item.getAttribute('role')).toBe('link');
        expect(item.getAttribute('tabindex')).toBe('0');
      });
      it.each(['Enter', ' '])('activates a non-native item with "%s"', async (key) => {
        const page = await mkPage();
        const changes = [];
        page.root.addEventListener('wppChange', (e) => changes.push(e.detail.path));
        const item = page.root.shadowRoot.querySelector('.item:not(.active)');
        pressKey(item, key);
        await page.waitForChanges();
        expect(changes).toEqual(['/']);
      });
      it('leaves Enter on a native link to the browser so it does not navigate twice', async () => {
        const page = await mkPage(true);
        const link = page.root.shadowRoot.querySelector('a.item:not(.active)');
        const event = pressKey(link, 'Enter');
        // Not prevented => the anchor performs its own native activation.
        expect(event.defaultPrevented).toBe(false);
      });
      it('activates a native link with Space, which anchors ignore natively', async () => {
        const page = await mkPage(true);
        const link = page.root.shadowRoot.querySelector('a.item:not(.active)');
        const clicks = [];
        link.addEventListener('click', () => clicks.push(1));
        const event = pressKey(link, ' ');
        await page.waitForChanges();
        expect(event.defaultPrevented).toBe(true);
        expect(clicks).toHaveLength(1);
      });
      it('ignores keys that are not activation keys', async () => {
        const page = await mkPage();
        const changes = [];
        page.root.addEventListener('wppChange', (e) => changes.push(e.detail.path));
        const item = page.root.shadowRoot.querySelector('.item:not(.active)');
        pressKey(item, 'a');
        pressKey(item, 'Tab');
        await page.waitForChanges();
        expect(changes).toEqual([]);
      });
    });
    // WPPOPENDS-1482 follow-up: the collapsed-items menu opens, but Enter/Space on a menu
    // item did nothing because wpp-menu-context activates items by emitting wppChangeListItem
    // (mouse and keyboard share that event) while the breadcrumb only listened for onClick.
    describe('collapsed-items menu activation', () => {
      // With 7 items and maxItems=5 the hidden items are Alfa, Bravo, Charlie.
      const secondHidden = items[2];
      it('routes an SPA menu item selection (wppChangeListItem) to wppChange', async () => {
        const page = await newSpecPage({
          components: [WppBreadcrumb],
          template: () => h("wpp-breadcrumb-v4-3-0", { items: items }),
        });
        const changes = [];
        page.root.addEventListener('wppChange', (e) => changes.push(e.detail));
        const menuItems = page.root.shadowRoot.querySelectorAll('[part="menu-item"]');
        const bravo = menuItems[1];
        bravo.dispatchEvent(new CustomEvent('wppChangeListItem', { bubbles: false, detail: {} }));
        await page.waitForChanges();
        expect(changes).toEqual([{ path: secondHidden.path, label: secondHidden.label }]);
      });
      it('gives native-link menu items an href and does not double-route wppChange', async () => {
        const page = await newSpecPage({
          components: [WppBreadcrumb],
          template: () => h("wpp-breadcrumb-v4-3-0", { items: items, nativeLink: true }),
        });
        const changes = [];
        page.root.addEventListener('wppChange', (e) => changes.push(e.detail));
        const menuItem = page.root.shadowRoot.querySelector('[part="menu-item"]');
        // Native-link menu items navigate through their own inner anchor (mouse or keyboard),
        // so they carry an href and the breadcrumb must NOT also emit wppChange for them.
        expect(menuItem.linkConfig?.href).toBe(items[1].path);
        menuItem.dispatchEvent(new CustomEvent('wppChangeListItem', { bubbles: false, detail: {} }));
        await page.waitForChanges();
        expect(changes).toEqual([]);
      });
    });
  });
});

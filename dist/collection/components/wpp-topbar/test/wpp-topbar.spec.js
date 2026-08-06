import { newSpecPage } from '@stencil/core/testing';
import { WppTopbar } from '../wpp-topbar';
import { WppTopbarItem } from '../components/wpp-topbar-item/wpp-topbar-item';
import { h } from '@stencil/core';
import { Z_INDEX } from '../../../common/consts';
describe('wpp-topbar', () => {
  const topbarZIndex = Z_INDEX.TOPBAR;
  const topbarMenuZIndex = Z_INDEX.TOPBAR_MENU;
  const navigation = [
    {
      label: 'Home',
      value: 'home',
      link: '/home',
    },
    {
      label: 'Client services',
      value: 'clientServices',
      link: '/client-services',
    },
    {
      label: 'Learning',
      value: 'learning',
      children: [
        {
          label: 'Guided tour',
          value: 'guidedTour',
          link: '/learning/guided-tour',
        },
        {
          label: 'Case studies',
          value: 'caseStudies',
          link: '/learning/case-studies',
        },
        {
          label: 'Community',
          value: 'community',
          link: '/learning/community',
        },
      ],
    },
    {
      label: 'Marketplace',
      value: 'marketplace',
      link: '/marketplace',
    },
    {
      label: 'Dev portal',
      value: 'devPortal',
      link: '/devPortal',
    },
  ];
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => h("wpp-topbar-v4-3-0", { navigation: navigation, value: "community" }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with application', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => (h("wpp-topbar-v4-3-0", { navigation: navigation, value: "community" }, h("div", { slot: "app" }, h("img", { src: "https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png", alt: "app-logo" }), h("wpp-typography-v4-3-0", { type: "m-strong", tag: "h3" }, "APP Name")))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('passes topbar z-index to topbar items', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => h("wpp-topbar-v4-3-0", { navigation: navigation, value: "community", zIndex: topbarZIndex }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    const topbarItems = page.root?.shadowRoot?.querySelectorAll('wpp-topbar-item');
    expect(Array.from(topbarItems || []).every(item => item.zIndex === topbarMenuZIndex)).toBe(true);
  });
  it('sets topbar z-index on topbar item menus', async () => {
    const page = await newSpecPage({
      components: [WppTopbarItem],
      template: () => (h("wpp-topbar-item-v4-3-0", { navigation: navigation[2], firstLevel: true, activeItems: [], zIndex: topbarMenuZIndex })),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context');
    expect(menuContext?.dropdownConfig.zIndex).toBe(topbarMenuZIndex);
  });
  // WPPOPENDS-1535: when two adjacent children both have children of their own, each renders as a
  // nested wpp-menu-context (display: inline-block). Their wrapper must be a `.menu-items` column so
  // the nested sub-menus stack vertically instead of flowing horizontally.
  it('wraps a menu item with children in a `.menu-items` column so nested sub-menus stack', async () => {
    const nestedNavigation = {
      label: 'Learning',
      value: 'learning',
      children: [
        { label: 'Guided tour', value: 'guidedTour', link: '/learning/guided-tour' },
        {
          label: 'Case studies',
          value: 'caseStudies',
          children: [{ label: 'People', value: 'caseStudiesPeople', link: '/learning/case-studies/people' }],
        },
        {
          label: 'Community',
          value: 'community',
          children: [{ label: 'People', value: 'communityPeople', link: '/learning/community/people' }],
        },
      ],
    };
    const page = await newSpecPage({
      components: [WppTopbarItem],
      template: () => h("wpp-topbar-item-v4-3-0", { navigation: nestedNavigation, firstLevel: true, activeItems: [] }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const menuItems = page.root?.shadowRoot?.querySelector('.menu-items');
    expect(menuItems).toBeTruthy();
    // Both children-with-children render as nested menu-contexts inside the same `.menu-items` wrapper.
    const nestedMenus = menuItems?.querySelectorAll('wpp-menu-context');
    expect(nestedMenus?.length).toBe(2);
  });
  it('raises the topbar while a topbar item menu is open', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => h("wpp-topbar-v4-3-0", { navigation: navigation, value: "community", zIndex: topbarZIndex }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    const topbarItem = page.root?.shadowRoot?.querySelector('wpp-topbar-item');
    topbarItem?.dispatchEvent(new CustomEvent('wppTopbarItemMenuToggle', { detail: true }));
    await page.waitForChanges();
    expect(page.root?.style.zIndex).toBe(topbarMenuZIndex.toString());
    topbarItem?.dispatchEvent(new CustomEvent('wppTopbarItemMenuToggle', { detail: false }));
    await page.waitForChanges();
    expect(page.root?.style.zIndex).toBe(topbarZIndex.toString());
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WppTopbar } from '../wpp-topbar';
import { WppTopbarItem } from '../components/wpp-topbar-item/wpp-topbar-item';
import { h } from '@stencil/core';
import * as themeUtils from '../../../utils/subscribe-to-theme';
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
      template: () => h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community" }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with application', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => (h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community" }, h("div", { slot: "app" }, h("img", { src: "https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png", alt: "app-logo" }), h("wpp-typography-v4-1-0", { type: "m-strong", tag: "h3" }, "APP Name")))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('passes topbar z-index to topbar items', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community", zIndex: topbarZIndex }),
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
      template: () => (h("wpp-topbar-item-v4-1-0", { navigation: navigation[2], firstLevel: true, activeItems: [], zIndex: topbarMenuZIndex })),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context');
    expect(menuContext?.dropdownConfig.zIndex).toBe(topbarMenuZIndex);
  });
  it('raises the topbar while a topbar item menu is open', async () => {
    const page = await newSpecPage({
      components: [WppTopbar, WppTopbarItem],
      template: () => h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community", zIndex: topbarZIndex }),
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
        components: [WppTopbar, WppTopbarItem],
        template: () => h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community" }),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppTopbar, WppTopbarItem],
        template: () => h("wpp-topbar-v4-1-0", { navigation: navigation, value: "community" }),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

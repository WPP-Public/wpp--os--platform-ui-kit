import { newSpecPage } from '@stencil/core/testing';
import { WppLegacyTopbar } from '../wpp-legacy-topbar';
import { h } from '@stencil/core';
import { WppLegacyTopbarItem } from '../components/wpp-legacy-topbar-item/wpp-legacy-topbar-item';
describe('wpp-legacy-topbar', () => {
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
      components: [WppLegacyTopbar, WppLegacyTopbarItem],
      template: () => h("wpp-legacy-topbar-v4-3-0", { navigation: navigation, value: "community" }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with application', async () => {
    const page = await newSpecPage({
      components: [WppLegacyTopbar, WppLegacyTopbarItem],
      template: () => (h("wpp-legacy-topbar-v4-3-0", { navigation: navigation, value: "community" }, h("div", { slot: "app" }, h("img", { src: "https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png", alt: "app-logo" }), h("wpp-typography-v4-3-0", { type: "m-strong", tag: "h3" }, "APP Name")))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});

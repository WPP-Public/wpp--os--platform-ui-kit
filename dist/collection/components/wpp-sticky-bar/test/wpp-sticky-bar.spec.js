import { newSpecPage } from '@stencil/core/testing';
import { WppStickyBar } from '../wpp-sticky-bar';
import { h } from '@stencil/core';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { Z_INDEX } from '../../../common/consts';
const BUTTONS = [
  {
    variant: 'primary',
    text: 'Primary',
  },
  {
    variant: 'secondary',
    text: 'Secondary 1',
  },
  {
    variant: 'secondary',
    text: 'Secondary 2',
  },
  {
    variant: 'action-button',
    text: 'Action Btn',
  },
];
const TABS = [
  {
    text: 'Tab 1',
    value: 'tab1',
  },
  {
    text: 'Tab 2',
    value: 'tab2',
  },
  {
    text: 'Tab 3',
    value: 'tab3',
  },
  {
    text: 'Tab 4',
    value: 'tab4',
  },
  {
    text: 'Tab 5',
    value: 'tab5',
  },
];
describe('wpp-sticky-bar', () => {
  describe('Testing functionality of WppStickyBar', () => {
    it('Testing initialization', async () => {
      const stickyBar = new WppStickyBar();
      expect(stickyBar).toBeDefined();
      expect(stickyBar.variant).toBe('small');
      expect(stickyBar.barTitle).toBeUndefined();
      expect(stickyBar.offsetFromTop).toBeUndefined();
      expect(stickyBar.zIndex).toBe(Z_INDEX.STICKY_BAR);
      expect(stickyBar.withBackButton).toBe(true);
      expect(stickyBar.scrollTreshold).toBe(200);
      expect(stickyBar.tabSize).toBe('s');
    });
    describe('Testing componentWillLoad', () => {
      it('Testing "small" variant with buttons', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title", buttons: BUTTONS }),
        });
        const stickyBarInstance = page.rootInstance;
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(4);
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "small" variant without buttons', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title" }),
        });
        const stickyBarInstance = page.rootInstance;
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "medium" variant', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-1-0", { variant: "medium", barTitle: "Page Title" }),
        });
        const stickyBarInstance = page.rootInstance;
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "with-tabs" variant with tabs', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
        });
        const stickyBarInstance = page.rootInstance;
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('tab1');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "with-tabs" variant without tabs', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", offsetFromTop: 200 }),
        });
        const stickyBarInstance = page.rootInstance;
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
    });
  });
  describe('Testing componentDidLoad', () => {
    it('Testing "getHeightOfOsBar" called when "offsetFromTop" is not provided', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const getHeightOfOsBarSpy = jest.spyOn(stickyBarInstance, 'getHeightOfOsBar').mockImplementation(() => { });
      expect(getHeightOfOsBarSpy).not.toHaveBeenCalled();
      // Needed so the setTimeout in componentDidLoad gets executed
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(getHeightOfOsBarSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing "offsetFromTop" is set when provided', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", offsetFromTop: 150 }),
      });
      const stickyBarInstance = page.rootInstance;
      const getHeightOfOsBarSpy = jest.spyOn(stickyBarInstance, 'getHeightOfOsBar').mockImplementation(() => { });
      expect(getHeightOfOsBarSpy).not.toHaveBeenCalled();
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('150px');
    });
  });
  describe('Testing watchers', () => {
    it('Testing "tabs" watcher when new value is an Array of length 2', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const newTabs = [
        {
          text: 'New Tab 1',
          value: 'new-tab-1',
        },
        {
          text: 'New Tab 2',
          value: 'new-tab-2',
        },
      ];
      expect(stickyBarInstance.currentTab).toBe('');
      page.root.tabs = newTabs;
      await page.waitForChanges();
      expect(stickyBarInstance.tabs.length).toBe(2);
      expect(stickyBarInstance.currentTab).toBe('new-tab-1');
    });
    it('Testing "tabs" watcher when new value is an empty Array', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.currentTab).toBe('tab1');
      expect(stickyBarInstance.tabs.length).toBe(5);
      page.root.tabs = [];
      await page.waitForChanges();
      expect(stickyBarInstance.tabs.length).toBe(0);
      expect(stickyBarInstance.currentTab).toBe('');
    });
    it('Testing "tabs" watcher when new value is undefined', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.currentTab).toBe('tab1');
      expect(stickyBarInstance.tabs.length).toBe(5);
      page.root.tabs = undefined;
      await page.waitForChanges();
      expect(stickyBarInstance.tabs).toBeUndefined();
      expect(stickyBarInstance.currentTab).toBe('');
    });
    it('Testing "buttons" watcher for "small" variant', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const getButtonsListSpy = jest.spyOn(stickyBarInstance, 'getButtonsList').mockImplementation(() => { });
      page.root.buttons = BUTTONS;
      await page.waitForChanges();
      expect(getButtonsListSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing "buttons" watcher for non-"small" variant', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "medium", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const getButtonsListSpy = jest.spyOn(stickyBarInstance, 'getButtonsList').mockImplementation(() => { });
      page.root.buttons = BUTTONS;
      await page.waitForChanges();
      expect(getButtonsListSpy).not.toHaveBeenCalled();
    });
    it('Testing "offsetFromTop" watcher', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('');
      page.root.offsetFromTop = 180;
      await page.waitForChanges();
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('180px');
    });
    it('Testing "handleScroll" listener', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title", scrollTreshold: 100 }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.visibility).toBe('');
      // Simulate scrolling down to 250px
      Object.defineProperty(window, 'scrollY', { value: 250 });
      window.dispatchEvent(new Event('scroll'));
      await page.waitForChanges();
      expect(stickyBarInstance.visibility).toBe('visible');
      // Simulate scrolling up to 50px
      Object.defineProperty(window, 'scrollY', { value: 50 });
      window.dispatchEvent(new Event('scroll'));
      await page.waitForChanges();
      expect(stickyBarInstance.visibility).toBe('invisible');
    });
  });
  describe('Testing snapshots', () => {
    it('render small sticky bar', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title" }),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('render medium sticky bar with custom content', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => (h("wpp-sticky-bar-v4-1-0", { variant: "medium", barTitle: "Page Title", buttons: BUTTONS }, h("div", { slot: "content" }, h("wpp-typography-v4-1-0", { type: "m-body" }, "Body Content")))),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('render with-tabs sticky bar', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "with-tabs", barTitle: "Page Title", buttons: BUTTONS, tabs: TABS }),
      });
      expect(page.root).toMatchSnapshot();
    });
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
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title" }),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-1-0", { variant: "small", barTitle: "Page Title" }),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

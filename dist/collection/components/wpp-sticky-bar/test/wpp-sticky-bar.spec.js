import { newSpecPage } from '@stencil/core/testing';
import { WppStickyBar } from '../wpp-sticky-bar';
import { h } from '@stencil/core';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { Z_INDEX } from '../../../common/consts';
import { DISABLED_LOADING_BUTTONS, STICKY_BAR_BUTTONS } from './mocks';
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
      await new Promise(resolve => setTimeout(resolve, 0));
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
          template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title", buttons: BUTTONS }),
        });
        const stickyBarInstance = page.rootInstance;
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(4);
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "small" variant without buttons', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title" }),
        });
        const stickyBarInstance = page.rootInstance;
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "medium" variant', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-2-0", { variant: "medium", barTitle: "Page Title" }),
        });
        const stickyBarInstance = page.rootInstance;
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "with-tabs" variant with tabs', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
        });
        const stickyBarInstance = page.rootInstance;
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('tab1');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
      it('Testing "with-tabs" variant without tabs', async () => {
        const page = await newSpecPage({
          components: [WppStickyBar],
          template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", offsetFromTop: 200 }),
        });
        const stickyBarInstance = page.rootInstance;
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stickyBarInstance.buttonsList.length).toBe(0);
        expect(stickyBarInstance.currentTab).toBe('');
        expect(stickyBarInstance.zIndex).toBe(Z_INDEX.STICKY_BAR);
      });
    });
  });
  describe('Testing componentDidLoad', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      jest.restoreAllMocks(); // prevents spy stacking between tests
    });
    it('Testing "updateOffsetFromTop" is called when component loads', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title" }),
      });
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const updateOffsetFromTopSpy = jest.spyOn(page.rootInstance, 'updateOffsetFromTop');
      const getHeightOfOsBarSpy = jest.spyOn(page.rootInstance, 'getHeightOfOsBar');
      expect(updateOffsetFromTopSpy).not.toHaveBeenCalled();
      // Needed so the setTimeout in componentDidLoad gets executed
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(updateOffsetFromTopSpy).toHaveBeenCalledTimes(1);
      expect(updateOffsetFromTopSpy).toHaveBeenCalledWith(undefined);
      expect(getHeightOfOsBarSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing "offsetFromTop" is set correctly when "0" is provided as its value', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", offsetFromTop: 0 }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(page.rootInstance?.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('0px');
    });
    it('Testing "offsetFromTop" is set when provided', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", offsetFromTop: 150 }),
      });
      const stickyBarInstance = page.rootInstance;
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const updateOffsetFromTopSpy = jest.spyOn(page.rootInstance, 'updateOffsetFromTop');
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
      expect(updateOffsetFromTopSpy).toHaveBeenCalledTimes(1);
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('150px');
    });
  });
  describe('Testing watchers', () => {
    it('Testing "tabs" watcher when new value is an Array of length 2', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title" }),
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
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(stickyBarInstance.tabs.length).toBe(2);
      expect(stickyBarInstance.currentTab).toBe('new-tab-1');
    });
    it('Testing "tabs" watcher when new value is an empty Array', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.currentTab).toBe('tab1');
      expect(stickyBarInstance.tabs.length).toBe(5);
      page.root.tabs = [];
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(stickyBarInstance.tabs.length).toBe(0);
      expect(stickyBarInstance.currentTab).toBe('');
    });
    it('Testing "tabs" watcher when new value is undefined', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", tabs: TABS }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.currentTab).toBe('tab1');
      expect(stickyBarInstance.tabs.length).toBe(5);
      page.root.tabs = undefined;
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(stickyBarInstance.tabs).toBeUndefined();
      expect(stickyBarInstance.currentTab).toBe('');
    });
    it('Testing "buttons" watcher for "small" variant', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const getButtonsListSpy = jest.spyOn(stickyBarInstance, 'getButtonsList').mockImplementation(() => { });
      page.root.buttons = BUTTONS;
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(getButtonsListSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing "buttons" watcher for non-"small" variant', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "medium", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      const getButtonsListSpy = jest.spyOn(stickyBarInstance, 'getButtonsList').mockImplementation(() => { });
      page.root.buttons = BUTTONS;
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(getButtonsListSpy).not.toHaveBeenCalled();
    });
    it('Testing "offsetFromTop" watcher', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title" }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('');
      page.root.offsetFromTop = 180;
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(stickyBarInstance.host.style.getPropertyValue('--wpp-sticky-bar-offset-top')).toBe('180px');
    });
    it('Testing "handleScroll" listener', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title", scrollTreshold: 100 }),
      });
      const stickyBarInstance = page.rootInstance;
      expect(stickyBarInstance.visibility).toBe('');
      // Simulate scrolling down to 250px
      Object.defineProperty(window, 'scrollY', { value: 250 });
      window.dispatchEvent(new Event('scroll'));
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(stickyBarInstance.visibility).toBe('visible');
      // Simulate scrolling up to 50px
      Object.defineProperty(window, 'scrollY', { value: 50 });
      window.dispatchEvent(new Event('scroll'));
      await page.waitForChanges();
      expect(stickyBarInstance.visibility).toBe('invisible');
    });
    it('Testing "onUpdateOffsetFromTop" watcher', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { barTitle: "Page Title" }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      const updateOffsetFromTopSpy = jest.spyOn(page.rootInstance, 'updateOffsetFromTop');
      page.rootInstance.onUpdateOffsetFromTop(150);
      expect(updateOffsetFromTopSpy).toHaveBeenCalledWith(150);
    });
  });
  describe('Testing clicking buttons', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      jest.restoreAllMocks(); // prevents spy stacking between tests
    });
    it('Test that the `wppClickBtn` event is fired when clicking a valid button', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title", buttons: STICKY_BAR_BUTTONS }),
      });
      const wppClickBtnEmitSpy = jest.spyOn(page.rootInstance.wppClickBtn, 'emit');
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const btnEl = page.root?.shadowRoot?.querySelector('wpp-button');
      expect(btnEl).toBeDefined();
      btnEl?.dispatchEvent(new MouseEvent('click'));
      expect(wppClickBtnEmitSpy).toHaveBeenCalledTimes(1);
    });
    it('Test that the `wppClickBtn` event is not fired when clicking a "disabled" / "loading" button', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title", buttons: DISABLED_LOADING_BUTTONS }),
      });
      const wppClickBtnEmitSpy = jest.spyOn(page.rootInstance.wppClickBtn, 'emit');
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const disabledBtnEl = page.root?.shadowRoot?.querySelector('.wpp-button.wpp-disabled');
      const loadingBtnEl = page.root?.shadowRoot?.querySelector('.wpp-button.wpp-loading');
      expect(disabledBtnEl).toBeDefined();
      disabledBtnEl?.dispatchEvent(new MouseEvent('click'));
      expect(loadingBtnEl).toBeDefined();
      loadingBtnEl?.dispatchEvent(new MouseEvent('click'));
      expect(wppClickBtnEmitSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('Testing snapshots', () => {
    it('render small sticky bar', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title" }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(page.root).toMatchSnapshot();
    });
    it('render small sticky bar with buttons', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title", buttons: STICKY_BAR_BUTTONS }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(page.root).toMatchSnapshot();
    });
    it('render medium sticky bar with custom content', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => (h("wpp-sticky-bar-v4-2-0", { variant: "medium", barTitle: "Page Title", buttons: BUTTONS }, h("div", { slot: "content" }, h("wpp-typography-v4-2-0", { type: "m-body" }, "Body Content")))),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(page.root).toMatchSnapshot();
    });
    it('render with-tabs sticky bar', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "with-tabs", barTitle: "Page Title", buttons: BUTTONS, tabs: TABS }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
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
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title" }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppStickyBar],
        template: () => h("wpp-sticky-bar-v4-2-0", { variant: "small", barTitle: "Page Title" }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBasicNode } from '../wpp-basic-node';
import { ResizeObserverMock } from '../../wpp-artefact/test/mocks';
import { LOCALES_DEFAULTS } from '../consts';
describe('WppBasicNode', () => {
  describe('Testing initialization of the component', () => {
    it('should initialize with default properties', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Default Title"></wpp-basic-node>`,
      });
      const basicNode = page.rootInstance;
      expect(basicNode).toBeDefined();
      expect(basicNode.nodeTitle).toBe('Default Title');
      expect(basicNode.isLoading).toBe(false);
      expect(basicNode.actions).toEqual([]);
      expect(basicNode.locales).toEqual({});
      expect(basicNode.isSelected).toEqual(false);
    });
  });
  describe('Testing ResizeObserver from connectedCallback and disconnectedCallback', () => {
    let resizeObserverInstance;
    beforeEach(() => {
      // Mocking ResizeObserver to test the hasScrollbar state
      global.ResizeObserver = jest.fn().mockImplementation(callback => {
        resizeObserverInstance = new ResizeObserverMock(callback);
        return resizeObserverInstance;
      });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should set hasScrollbar to true when content height exceeds maximum height', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const mockCheckBodyForScroll = jest.spyOn(page.rootInstance, 'checkBodyForScroll');
      resizeObserverInstance.triggerResize(1500);
      await page.waitForChanges();
      expect(mockCheckBodyForScroll).toHaveBeenCalled();
    });
    it('should disconnect ResizeObserver on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      // trigger disconnectedCallback by removing the component from the DOM
      page.root?.remove();
      await page.waitForChanges();
      expect(resizeObserverInstance.disconnect).toHaveBeenCalled();
    });
  });
  describe('Testing watchers', () => {
    it('Testing onUpdateLocales', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const newLocales = { playAction: 'Ejecutar comando' };
      await page.waitForChanges();
      expect(page.rootInstance._locales).toEqual(LOCALES_DEFAULTS);
      page.rootInstance.onUpdateLocales(newLocales);
      expect(page.rootInstance._locales).toEqual({
        ...LOCALES_DEFAULTS,
        ...newLocales,
      });
    });
  });
  describe('Testing action click event emission', () => {
    it('should emit wppActionClick event with the correct action detail when an action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const mockAction = {
        icon: 'wpp-icon-download',
        label: 'Download',
      };
      page.rootInstance.handleActionClick(mockAction);
      await page.waitForChanges();
      expect(wppActionClickSpy).toHaveBeenCalledWith(mockAction);
    });
  });
  describe('Testing clicking actions', () => {
    it('Should emit wppActionClick event when a default action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const openSettingsAction = {
        icon: 'wpp-icon-gear',
        label: 'Settings',
      };
      await page.waitForChanges();
      const actionButton = page.root?.querySelector('wpp-action-button[data-testid="wpp-settings-btn"]');
      expect(actionButton).toBeTruthy();
      actionButton?.dispatchEvent(new MouseEvent('click'));
      expect(wppActionClickSpy).toHaveBeenCalledWith(openSettingsAction);
    });
    it('Should emit wppActionClick event when an additional action from the dropdown menu is clicked', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-1-0", { nodeTitle: "Test Artefact" }, h("div", { slot: "body" }))),
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const additionalListItem = page.root?.querySelectorAll('wpp-list-item')[0];
      expect(additionalListItem).toBeTruthy();
      await page.waitForChanges();
      additionalListItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-file',
        label: 'Upload',
      });
    });
    it('Should emit wppActionClick event when the play / pause action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => h("wpp-basic-node-v4-1-0", { nodeTitle: "Test Artefact" }),
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const playBtn = page.root?.querySelector('[data-testid="wpp-play-button"]');
      expect(playBtn).toBeTruthy();
      playBtn?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-play',
        label: 'Run',
      });
      page.rootInstance.isLoading = true;
      playBtn?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-stop',
        label: 'Stop',
      });
    });
  });
  describe('Testing render output', () => {
    it('Should render the component with the correct structure and content', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact">
                 <div slot="body">Body Content</div>
               </wpp-basic-node>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render additional actions in the dropdown menu when provided via the actions prop and a scrollbar in the body when the height exceeds the maximum', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-1-0", { nodeTitle: "Test Artefact", actions: [{ icon: 'wpp-icon-edit', label: 'Edit' }] }, h("div", { slot: "body" }, h("div", { style: { height: '1300px' } }, h("p", null, "Body content with height 1300px"))))),
      });
      page.rootInstance.hasScrollbar = true;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render the node in loading state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-1-0", { nodeTitle: "Test Artefact", isLoading: true }, h("div", { slot: "body" }, h("div", { style: { height: '100px' } }, h("p", null, "Body content with height 100px"))))),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

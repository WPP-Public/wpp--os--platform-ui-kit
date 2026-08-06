import { readFileSync } from 'fs';
import { join } from 'path';
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
      expect(basicNode.isReRun).toBe(false);
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
  describe('Testing locales', () => {
    it('should derive labels from defaults and the latest locale prop without stale overrides', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const playBtn = page.root?.querySelector('[data-testid="wpp-play-button"]');
      const settingsBtn = page.root?.querySelector('[data-testid="wpp-settings-btn"]');
      await page.waitForChanges();
      page.root.locales = { playAction: 'Execute' };
      await page.waitForChanges();
      playBtn?.dispatchEvent(new MouseEvent('click'));
      expect(wppActionClickSpy).toHaveBeenLastCalledWith({
        icon: 'wpp-icon-play',
        label: 'Execute',
      });
      page.root.locales = { filterAction: 'Configure' };
      await page.waitForChanges();
      playBtn?.dispatchEvent(new MouseEvent('click'));
      settingsBtn?.dispatchEvent(new MouseEvent('click'));
      expect(wppActionClickSpy).toHaveBeenNthCalledWith(2, {
        icon: 'wpp-icon-play',
        label: LOCALES_DEFAULTS.playAction,
      });
      expect(wppActionClickSpy).toHaveBeenNthCalledWith(3, {
        icon: 'wpp-icon-gear',
        label: 'Configure',
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
        template: () => (h("wpp-basic-node-v4-3-0", { nodeTitle: "Test Artefact" }, h("div", { slot: "body" }))),
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
        template: () => h("wpp-basic-node-v4-3-0", { isSelected: true, nodeTitle: "Test Artefact" }),
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
  describe('Testing re-run state', () => {
    it('Should render the re-run button with the refresh icon and emit wppActionClick when clicked', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => h("wpp-basic-node-v4-3-0", { isReRun: true, nodeTitle: "Test Artefact" }),
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const reRunBtn = page.root?.querySelector('[data-testid="wpp-rerun-button"]');
      expect(reRunBtn).toBeTruthy();
      expect(page.root?.querySelector('[data-testid="wpp-play-button"]')).toBeFalsy();
      reRunBtn?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-refresh',
        label: 'Re-run',
      });
    });
    it('Should prioritise the loading (stop) state over the re-run state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => h("wpp-basic-node-v4-3-0", { isReRun: true, isLoading: true, nodeTitle: "Test Artefact" }),
      });
      expect(page.root?.querySelector('[data-testid="wpp-pause-button"]')).toBeTruthy();
      expect(page.root?.querySelector('[data-testid="wpp-rerun-button"]')).toBeFalsy();
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
    it('Should render the component in isSelected state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-3-0", { isSelected: true, nodeTitle: "Test Artefact" }, h("div", { slot: "body" }, "Body Content"))),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render additional actions in the dropdown menu when provided via the actions prop and a scrollbar in the body when the height exceeds the maximum', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-3-0", { nodeTitle: "Test Artefact", actions: [{ icon: 'wpp-icon-edit', label: 'Edit' }] }, h("div", { slot: "body" }, h("div", { style: { height: '1300px' } }, h("p", null, "Body content with height 1300px"))))),
      });
      page.rootInstance.hasScrollbar = true;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render the node in loading state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-3-0", { nodeTitle: "Test Artefact", isLoading: true }, h("div", { slot: "body" }, h("div", { style: { height: '100px' } }, h("p", null, "Body content with height 100px"))))),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('Selected state overlay (no layout shift)', () => {
    const getWrapper = (root) => root?.querySelector('.node-wrapper');
    it('should toggle only the is-selected class on the wrapper when selected', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test"><div slot="body">Body</div></wpp-basic-node>`,
      });
      expect(getWrapper(page.root)?.classList.contains('is-selected')).toBe(false);
      page.rootInstance.isSelected = true;
      await page.waitForChanges();
      expect(getWrapper(page.root)?.classList.contains('is-selected')).toBe(true);
    });
    it('should draw the selected border only on the ::before overlay, never on the wrapper itself', () => {
      // The spec page does not inject the compiled scoped stylesheet, so we assert against the
      // SCSS source of truth: the selected border must live on the ::before overlay. A real border
      // on the box-sizing: border-box wrapper would shrink the content box and shift inner content.
      const styles = readFileSync(join(__dirname, '..', 'wpp-basic-node.scss'), 'utf8');
      // The overlay rule must exist (border painted on ::before).
      expect(styles).toMatch(/\.node-wrapper\.is-selected::before\s*\{[\s\S]*?border:\s*var\(--wpp-border-width-s\) solid var\(--wpp-primary-color-500\)/);
      // The layout-affecting border on the wrapper itself must not be (re)introduced.
      expect(styles).not.toMatch(/\.node-wrapper\.is-selected\s*\{[\s\S]*?border:\s*1px solid/);
    });
    it('should keep identical inner content structure between unselected and selected states', async () => {
      const innerHtml = (selected) => `<wpp-basic-node node-title="Test"${selected ? ' is-selected="true"' : ''}><div slot="body">Body</div></wpp-basic-node>`;
      const unselectedPage = await newSpecPage({ components: [WppBasicNode], html: innerHtml(false) });
      const selectedPage = await newSpecPage({ components: [WppBasicNode], html: innerHtml(true) });
      const unselectedWrapper = getWrapper(unselectedPage.root);
      const selectedWrapper = getWrapper(selectedPage.root);
      const childStructure = (wrapper) => Array.from(wrapper?.children ?? []).map(child => child.className || child.tagName.toLowerCase());
      // Selection must not add or remove any layout nodes (header/body/actions stay identical).
      expect(childStructure(selectedWrapper)).toEqual(childStructure(unselectedWrapper));
    });
    it('should draw the loading animation only on an overlay, never affecting layout', () => {
      // The spec page does not inject the compiled scoped stylesheet, so we assert against the
      // SCSS source: the loading border animation must live on the .node-container.loading-node::before
      // overlay with inset: -2px so the animated ring is visible outside the card while preserving
      // the exact inner wrapper layout.
      const styles = readFileSync(join(__dirname, '..', 'wpp-basic-node.scss'), 'utf8');
      // The overlay rule must exist (animated gradient on ::before).
      expect(styles).toMatch(/\.loading-node::before\s*\{[\s\S]*?animation:\s*loading-rotate/);
      expect(styles).toMatch(/\.loading-node::before\s*\{[\s\S]*?inset:\s*-2px/);
      // The layout-affecting padding on the container itself must not be (re)introduced.
      expect(styles).not.toMatch(/\.loading-node\s*\{[\s\S]*?padding:\s*2px/);
    });
    it('should keep identical inner content structure between normal and loading states', async () => {
      const innerHtml = (loading) => `<wpp-basic-node node-title="Test"${loading ? ' is-loading="true"' : ''}><div slot="body">Body</div></wpp-basic-node>`;
      const normalPage = await newSpecPage({ components: [WppBasicNode], html: innerHtml(false) });
      const loadingPage = await newSpecPage({ components: [WppBasicNode], html: innerHtml(true) });
      const normalWrapper = getWrapper(normalPage.root);
      const loadingWrapper = getWrapper(loadingPage.root);
      const childStructure = (wrapper) => Array.from(wrapper?.children ?? []).map(child => child.className || child.tagName.toLowerCase());
      // Loading must not add or remove any layout nodes (header/body/actions stay identical).
      expect(childStructure(loadingWrapper)).toEqual(childStructure(normalWrapper));
    });
  });
  describe('Testing hasContent state driven by slotted body content', () => {
    // A capturing MutationObserver mock so tests can trigger the callback and assert observe/disconnect.
    // The global setup mock returns a fresh anonymous object per call, which we cannot introspect.
    class MutationObserverMock {
      constructor(callback) {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
        this.takeRecords = jest.fn(() => []);
        this.callback = callback;
      }
      // Helper to manually run the observer callback in tests.
      trigger() {
        this.callback([], this);
      }
    }
    let mutationObserverInstance;
    let originalMutationObserver;
    beforeEach(() => {
      originalMutationObserver = global.MutationObserver;
      global.MutationObserver = jest.fn().mockImplementation((callback) => {
        mutationObserverInstance = new MutationObserverMock(callback);
        return mutationObserverInstance;
      });
    });
    afterEach(() => {
      global.MutationObserver = originalMutationObserver;
      jest.clearAllMocks();
    });
    const getPlayButton = (root) => root?.querySelector('[data-testid="wpp-play-button"]');
    it('should set hasContent true and enable the primary action when the body slot has content', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test">
                 <div slot="body"><input /></div>
               </wpp-basic-node>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(true);
      expect(getPlayButton(page.root)?.hasAttribute('disabled')).toBe(false);
    });
    it('should keep hasContent false when the body slot has no content', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test"></wpp-basic-node>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(false);
      expect(getPlayButton(page.root)?.hasAttribute('disabled')).toBe(true);
    });
    it('should keep hasContent false when only an empty body slot wrapper is present', async () => {
      // Frameworks such as React keep the `slot="body"` wrapper mounted and toggle its inner
      // content, so an empty wrapper must NOT count as content.
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(false);
      expect(getPlayButton(page.root)?.hasAttribute('disabled')).toBe(true);
    });
    it('should observe the body element and re-evaluate hasContent when content is added inside the wrapper', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test">
                 <div slot="body"></div>
               </wpp-basic-node>`,
      });
      const body = page.root?.querySelector('.node-body');
      expect(mutationObserverInstance.observe).toHaveBeenCalledWith(body, { childList: true, subtree: true });
      expect(page.rootInstance.hasContent).toBe(false);
      // Simulate the consumer rendering content inside the persistent body slot wrapper.
      const content = page.doc.createElement('input');
      page.root?.querySelector('[slot="body"]')?.appendChild(content);
      mutationObserverInstance.trigger();
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(true);
      expect(getPlayButton(page.root)?.hasAttribute('disabled')).toBe(false);
    });
    it('should flip hasContent back to false when the body content is cleared from the wrapper', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test">
                 <div slot="body"><input /></div>
               </wpp-basic-node>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(true);
      const wrapper = page.root?.querySelector('[slot="body"]');
      if (wrapper)
        wrapper.innerHTML = '';
      mutationObserverInstance.trigger();
      await page.waitForChanges();
      expect(page.rootInstance.hasContent).toBe(false);
      expect(getPlayButton(page.root)?.hasAttribute('disabled')).toBe(true);
    });
    it('should disconnect the MutationObserver on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node is-selected="true" node-title="Test">
                 <div slot="body"><input /></div>
               </wpp-basic-node>`,
      });
      page.root?.remove();
      await page.waitForChanges();
      expect(mutationObserverInstance.disconnect).toHaveBeenCalled();
    });
  });
});

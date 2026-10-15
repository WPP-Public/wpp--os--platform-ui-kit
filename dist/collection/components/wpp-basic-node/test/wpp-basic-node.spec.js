import { readFileSync } from 'fs';
import { join } from 'path';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppBasicNode } from '../wpp-basic-node';
import { ResizeObserverMock } from '../../wpp-artefact/test/mocks';
import { LOCALES_DEFAULTS } from '../consts';
import * as loadingHalo from '../../../utils/loading-halo';
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
      expect(basicNode.errorMessage).toBeUndefined();
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
  describe('Testing lifecycle methods', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should register the loading animation angle on connectedCallback', async () => {
      const registerSpy = jest.spyOn(loadingHalo, 'registerLoadingHaloAngle');
      await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Artefact"></wpp-basic-node>`,
      });
      expect(registerSpy).toHaveBeenCalled();
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
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Artefact" }, h("div", { slot: "body" }))),
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
        template: () => h("wpp-basic-node-v4-5-0", { isSelected: true, nodeTitle: "Test Artefact" }),
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
        template: () => h("wpp-basic-node-v4-5-0", { isReRun: true, nodeTitle: "Test Artefact" }),
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
        template: () => h("wpp-basic-node-v4-5-0", { isReRun: true, isLoading: true, nodeTitle: "Test Artefact" }),
      });
      expect(page.root?.querySelector('[data-testid="wpp-pause-button"]')).toBeTruthy();
      expect(page.root?.querySelector('[data-testid="wpp-rerun-button"]')).toBeFalsy();
    });
  });
  describe('Testing error state', () => {
    it('should not render the error icon or the error inline message when errorMessage is not provided', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Node"></wpp-basic-node>`,
      });
      expect(page.root?.querySelector('.node-header wpp-icon-error')).toBeNull();
      expect(page.root?.querySelector('.node-body wpp-inline-message')).toBeNull();
    });
    it('should render the error icon in the header and an L error inline message at the top of the body', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Node", errorMessage: "Something went wrong" }, h("div", { slot: "body" }, "Body Content"))),
      });
      expect(page.root?.querySelector('.node-header wpp-icon-error')).not.toBeNull();
      const body = page.root?.querySelector('.node-body');
      const inlineMessage = body.querySelector('wpp-inline-message');
      // wpp-inline-message is not registered in this spec, so its props are reflected as attributes.
      expect(body.firstElementChild?.classList.contains('error-region')).toBe(true);
      expect(inlineMessage.parentElement).toBe(body.firstElementChild);
      expect(inlineMessage.getAttribute('size')).toBe('l');
      expect(inlineMessage.getAttribute('type')).toBe('error');
      expect(inlineMessage.getAttribute('message')).toBe('Something went wrong');
      expect(inlineMessage.hasAttribute('titletext')).toBe(false);
      expect(inlineMessage.hasAttribute('iscompact')).toBe(true);
      expect(inlineMessage.hasAttribute('hideclosebtn')).toBe(false);
      expect(inlineMessage.locales).toEqual({ close: LOCALES_DEFAULTS.dismissErrorAction });
    });
    it('should toggle the error state when errorMessage changes', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Node"></wpp-basic-node>`,
      });
      page.root.errorMessage = 'Something went wrong';
      await page.waitForChanges();
      expect(page.root?.querySelector('wpp-icon-error')).not.toBeNull();
      expect(page.root?.querySelector('wpp-inline-message')).not.toBeNull();
      page.root.errorMessage = undefined;
      await page.waitForChanges();
      expect(page.root?.querySelector('wpp-icon-error')).toBeNull();
      expect(page.root?.querySelector('wpp-inline-message')).toBeNull();
    });
    it('should space the inline message from the body only when the body has content', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Node", errorMessage: "Something went wrong" }, h("div", { slot: "body" }))),
      });
      const inlineMessage = () => page.root?.querySelector('wpp-inline-message');
      expect(inlineMessage().classList.contains('with-content')).toBe(false);
      page.rootInstance.hasContent = true;
      await page.waitForChanges();
      expect(inlineMessage().classList.contains('with-content')).toBe(true);
    });
    it('should match the snapshot of the error message classes', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Node" error-message="Something went wrong"></wpp-basic-node>`,
      });
      expect(page.rootInstance.getErrorMessageClasses()).toMatchSnapshot();
      page.rootInstance.hasContent = true;
      expect(page.rootInstance.getErrorMessageClasses()).toMatchSnapshot();
    });
    it('should render the node in error state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Node", errorMessage: "Something went wrong" }, h("div", { slot: "body" }, "Body Content"))),
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('Testing error dismissal', () => {
    const renderErrorNode = () => newSpecPage({
      components: [WppBasicNode],
      template: () => h("wpp-basic-node-v4-5-0", { nodeTitle: "Image generator", errorMessage: "Something went wrong" }),
    });
    // wpp-tooltip is not registered in this spec, so its props are reflected as attributes, except objects like `config`.
    const getErrorTooltip = (page) => page.root?.querySelector('.node-header wpp-tooltip:not(.title-tooltip)');
    const dismiss = async (page) => {
      page.root?.querySelector('wpp-inline-message')?.dispatchEvent(new CustomEvent('wppClickCloseBtn'));
      await page.waitForChanges();
    };
    it('should keep the error icon decorative and its tooltip disabled while the inline message is shown', async () => {
      const page = await renderErrorNode();
      const icon = page.root?.querySelector('.node-header wpp-icon-error');
      const tooltip = getErrorTooltip(page);
      expect(page.rootInstance.isErrorDismissed).toBe(false);
      expect(icon.hasAttribute('tabindex')).toBe(false);
      expect(icon.hasAttribute('role')).toBe(false);
      expect(icon.hasAttribute('aria-label')).toBe(false);
      expect(tooltip.hasAttribute('disabled')).toBe(true);
    });
    it('should remove only the inline message and the announcement when the close button is clicked', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      expect(page.rootInstance.isErrorDismissed).toBe(true);
      expect(page.root?.querySelector('wpp-inline-message')).toBeNull();
      expect(page.root?.querySelector('.error-region .sr-only')).toBeNull();
      expect(page.root?.querySelector('.error-region[role="alert"]')).not.toBeNull();
      expect(page.root?.querySelector('.node-header wpp-icon-error')).not.toBeNull();
    });
    it('should expose the error message through the icon tooltip once dismissed', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      const icon = page.root?.querySelector('.node-header wpp-icon-error');
      const tooltip = getErrorTooltip(page);
      expect(tooltip.hasAttribute('disabled')).toBe(false);
      expect(tooltip.getAttribute('text')).toBe('Something went wrong');
      expect(icon.getAttribute('tabindex')).toBe('0');
      expect(icon.getAttribute('role')).toBe('img');
      expect(icon.getAttribute('aria-label')).toBe('Image generator error: Something went wrong');
    });
    it('should emit wppDismissError when the inline message is dismissed', async () => {
      const page = await renderErrorNode();
      const dismissSpy = jest.spyOn(page.rootInstance.wppDismissError, 'emit');
      await dismiss(page);
      expect(dismissSpy).toHaveBeenCalledTimes(1);
    });
    it('should move focus to the error icon only for the tooltip created by the dismissal', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      const icon = page.root?.querySelector('.node-header wpp-icon-error');
      const { onCreate } = getErrorTooltip(page).config;
      const focusSpy = jest.spyOn(icon, 'focus');
      // wpp-tooltip is not registered in this spec, so its tippy `onCreate` hook is invoked directly.
      // The second call stands for the tooltip being re-created later (e.g. the node re-attached to the DOM).
      onCreate();
      onCreate();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
    it('should render the node with the inline message dismissed', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      expect(page.root).toMatchSnapshot();
    });
    it('should show the inline message again when a new error message is set', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      page.root.errorMessage = 'Another error';
      await page.waitForChanges();
      expect(page.rootInstance.isErrorDismissed).toBe(false);
      expect(page.root?.querySelector('wpp-inline-message')?.getAttribute('message')).toBe('Another error');
      expect(getErrorTooltip(page)?.hasAttribute('disabled')).toBe(true);
    });
    it('should reset the dismissed state when the error is cleared', async () => {
      const page = await renderErrorNode();
      await dismiss(page);
      page.root.errorMessage = undefined;
      await page.waitForChanges();
      expect(page.rootInstance.isErrorDismissed).toBe(false);
      expect(getErrorTooltip(page)).toBeNull();
    });
    it('should use the dismissErrorAction locale for the close button label', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Image generator", errorMessage: "Something went wrong", locales: { dismissErrorAction: 'Fermer le message' } })),
      });
      expect((page.root?.querySelector('wpp-inline-message')).locales).toEqual({ close: 'Fermer le message' });
    });
  });
  describe('Testing accessibility', () => {
    it('should always render the error live region, empty when there is no error, so later errors are announced', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test Node"></wpp-basic-node>`,
      });
      const region = page.root?.querySelector('.node-body .error-region');
      expect(region?.getAttribute('role')).toBe('alert');
      expect(region?.getAttribute('aria-atomic')).toBe('true');
      expect(region?.children.length).toBe(0);
    });
    it('should announce which node is in error with a visually hidden text built from the errorAnnouncement locale', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => h("wpp-basic-node-v4-5-0", { nodeTitle: "Image generator", errorMessage: "Something went wrong" }),
      });
      const getAnnouncement = () => page.root?.querySelector('.error-region[role="alert"] .sr-only')?.textContent;
      expect(getAnnouncement()).toBe('Image generator error:');
      page.root.locales = { errorAnnouncement: 'Erreur dans {nodeTitle} :' };
      await page.waitForChanges();
      expect(getAnnouncement()).toBe('Erreur dans Image generator :');
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
        template: () => (h("wpp-basic-node-v4-5-0", { isSelected: true, nodeTitle: "Test Artefact" }, h("div", { slot: "body" }, "Body Content"))),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render additional actions in the dropdown menu when provided via the actions prop and a scrollbar in the body when the height exceeds the maximum', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Artefact", actions: [{ icon: 'wpp-icon-edit', label: 'Edit' }] }, h("div", { slot: "body" }, h("div", { style: { height: '1300px' } }, h("p", null, "Body content with height 1300px"))))),
      });
      page.rootInstance.hasScrollbar = true;
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render the node in loading state', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test Artefact", isLoading: true }, h("div", { slot: "body" }, h("div", { style: { height: '100px' } }, h("p", null, "Body content with height 100px"))))),
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
      // The overlay rule must exist (border painted on ::before), coloured by the state border colour,
      // which defaults to the selected colour.
      expect(styles).toMatch(/--bn-state-border-color:\s*var\(--wpp-primary-color-500\)/);
      expect(styles).toMatch(/\.node-wrapper\.is-selected::before,[\s\S]*?\{[\s\S]*?border:\s*var\(--wpp-border-width-s\) solid var\(--bn-state-border-color\)/);
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
    it('should draw the loading animation with the loadingHalo mixin overlays, never affecting layout', () => {
      // The spec page does not inject the compiled scoped stylesheet, so we assert against the
      // SCSS source: the loading state must use the loadingHalo mixin (overlays painted outside the card,
      // see src/utils/loading-halo.spec.ts), preserving the exact inner wrapper layout.
      const styles = readFileSync(join(__dirname, '..', 'wpp-basic-node.scss'), 'utf8');
      expect(styles).toMatch(/\.node-container \{[\s\S]*?&\.loading-node \{\s*@include loadingHalo\(var\(--wpp-border-radius-l\)\);/);
      // The layout-affecting padding on the container itself must not be (re)introduced.
      expect(styles).not.toMatch(/\.loading-node\s*\{[^}]*?padding:\s*2px/);
    });
    it('should add the has-error class to the container only while there is an error message', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        html: `<wpp-basic-node node-title="Test"><div slot="body">Body</div></wpp-basic-node>`,
      });
      const getContainer = () => page.root?.querySelector('.node-container');
      expect(getContainer()?.classList.contains('has-error')).toBe(false);
      page.root.errorMessage = 'Something went wrong';
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('has-error')).toBe(true);
      page.root.errorMessage = undefined;
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('has-error')).toBe(false);
    });
    it('should show only the loading animation while loading, suppressing the selected and error borders', async () => {
      const page = await newSpecPage({
        components: [WppBasicNode],
        template: () => (h("wpp-basic-node-v4-5-0", { nodeTitle: "Test", isLoading: true, isSelected: true, errorMessage: "Something went wrong" }, h("div", { slot: "body" }, "Body"))),
      });
      const container = page.root?.querySelector('.node-container');
      expect(container?.classList.contains('loading-node')).toBe(true);
      expect(container?.classList.contains('has-error')).toBe(false);
      expect(getWrapper(page.root)?.classList.contains('is-selected')).toBe(false);
      page.root.isLoading = false;
      await page.waitForChanges();
      expect(container?.classList.contains('has-error')).toBe(true);
      expect(getWrapper(page.root)?.classList.contains('is-selected')).toBe(true);
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

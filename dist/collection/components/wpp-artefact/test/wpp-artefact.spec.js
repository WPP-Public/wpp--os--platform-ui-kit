import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppArtefact } from '../wpp-artefact';
import { ResizeObserverMock } from './mocks';
import { LOCALES_DEFAULTS } from '../consts';
describe('WppArtefact', () => {
  describe('Testing initialization of the component', () => {
    it('should initialize with default properties', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Default Title"></wpp-artefact>`,
      });
      const artefact = page.rootInstance;
      expect(artefact).toBeDefined();
      expect(artefact.artefactTitle).toBe('Default Title');
      expect(artefact.size).toBe('xs');
      expect(artefact.actions).toEqual([]);
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
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
      });
      resizeObserverInstance.triggerResize(1500);
      await page.waitForChanges();
      expect(page.rootInstance.hasScrollbar).toBe(true);
    });
    it('should set hasScrollbar to false when content height is within maximum height', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
      });
      resizeObserverInstance.triggerResize(400);
      await page.waitForChanges();
      expect(page.rootInstance.hasScrollbar).toBe(false);
    });
    it('should disconnect ResizeObserver on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
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
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
      });
      const newLocales = { duplicateAction: 'Duplicate the artefact' };
      const mockFn = jest.spyOn(page.rootInstance, 'updateDropdownActions');
      await page.waitForChanges();
      expect(page.rootInstance._locales).toEqual(LOCALES_DEFAULTS);
      page.rootInstance.onUpdateLocales(newLocales);
      expect(page.rootInstance._locales).toEqual({
        ...LOCALES_DEFAULTS,
        ...newLocales,
      });
      expect(mockFn).toHaveBeenCalled();
    });
    it('Testing onUpdatePinAction', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
      });
      const mockFn = jest.spyOn(page.rootInstance, 'updateDropdownActions');
      page.rootInstance.withPinAction = false;
      expect(mockFn).toHaveBeenCalled();
      page.rootInstance.pinActionPosition = 1;
      expect(mockFn).toHaveBeenCalled();
    });
  });
  describe('Testing action click event emission', () => {
    it('should emit wppActionClick event with the correct action detail when an action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
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
        components: [WppArtefact],
        html: `<wpp-artefact artefact-title="Test Artefact">
                 <div slot="body"></div>
               </wpp-artefact>`,
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const copyAction = {
        icon: 'wpp-icon-copy',
        label: 'Copy',
      };
      await page.waitForChanges();
      const actionButton = page.root?.querySelector('wpp-action-button');
      const defaultListItem = page.root?.querySelector('wpp-list-item');
      expect(actionButton).toBeTruthy();
      actionButton?.dispatchEvent(new MouseEvent('click'));
      expect(wppActionClickSpy).toHaveBeenCalledWith(copyAction);
      defaultListItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-unpinned',
        label: 'Pin',
      });
    });
    it('Should emit wppActionClick event when an additional action from the dropdown menu is clicked', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        template: () => (h("wpp-artefact-v4-1-0", { artefactTitle: "Test Artefact", actions: [{ icon: 'wpp-icon-edit', label: 'Edit' }] }, h("div", { slot: "body" }))),
      });
      const wppActionClickSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const additionalListItem = page.root?.querySelectorAll('wpp-list-item')[1];
      expect(additionalListItem).toBeTruthy();
      await page.waitForChanges();
      additionalListItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(wppActionClickSpy).toHaveBeenCalledWith({
        icon: 'wpp-icon-edit',
        label: 'Edit',
      });
    });
  });
  describe('Testing render output', () => {
    it('Should render the component with the correct structure and content', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        html: `<wpp-artefact title-icon="wpp-icon-document" artefact-title="Test Artefact">
                 <div slot="body">Body Content</div>
               </wpp-artefact>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Should render additional actions in the dropdown menu when provided via the actions prop and a scrollbar in the body when the height exceeds the maximum', async () => {
      const page = await newSpecPage({
        components: [WppArtefact],
        template: () => (h("wpp-artefact-v4-1-0", { artefactTitle: "Test Artefact", actions: [{ icon: 'wpp-icon-edit', label: 'Edit' }] }, h("div", { slot: "body" }, h("div", { style: { height: '1300px' } }, h("p", null, "Body content with height 1300px"))))),
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});

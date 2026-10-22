import { join } from 'path';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFocusArtefact } from '../wpp-focus-artefact';
import { COPIED_CONFIRMATION_TIMEOUT, LOCALES_DEFAULTS, MIN_WIDTH, RESIZE_KEYBOARD_STEP } from '../consts';
import { transformToVersionedTag } from '../../../utils/utils';
import { ResizeObserverMock } from '../../wpp-artefact/test/mocks';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
const VERSIONS = [
  { id: 'v1', label: 'Version 1' },
  { id: 'v2', label: 'Version 2' },
];
const MENU_ACTIONS = [
  { id: 'rename', icon: 'wpp-icon-edit', label: 'Rename' },
  { id: 'delete', icon: 'wpp-icon-trash', label: 'Delete' },
];
const shadow = (page) => page.root.shadowRoot;
// The version selector: a menu whose trigger shows the selected version. Its parts aren't registered in this spec, so
// their primitive props are set as attributes and the others as properties.
const versionMenu = (page) => shadow(page).querySelector('.version-selector');
const versionTrigger = (page) => shadow(page).querySelector('.version-selector > wpp-action-button');
const versionItems = (page) => Array.from(shadow(page).querySelectorAll('.version-selector wpp-list-item'));
const versionLabelOf = (item) => item.querySelector('[slot="label"]').textContent;
const checkedVersionsOf = (page) => versionItems(page)
  .filter(item => item.hasAttribute('checked'))
  .map(versionLabelOf);
// Header actions, in order: the action buttons inside `.actions`, without the "More actions" trigger
const headerActionButtons = (page) => Array.from(shadow(page).querySelectorAll('.actions > wpp-tooltip > wpp-action-button'));
// Icons rendered from a name get the versioned tag, so compare against that
const icon = (name) => transformToVersionedTag(name);
const iconTagsOf = (page) => headerActionButtons(page).map(button => button.querySelector('[slot="icon-start"]').tagName.toLowerCase());
const buttonById = (page, id) => {
  const ids = ['quote', 'pin', 'copy', 'download'];
  return headerActionButtons(page)[ids.indexOf(id)];
};
describe('wpp-focus-artefact', () => {
  describe('Testing initialization of the component', () => {
    it('should create the component', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      expect(page.root).toBeTruthy();
      expect(page.rootInstance).toBeInstanceOf(WppFocusArtefact);
    });
    it('should have the default property values', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const instance = page.rootInstance;
      expect(instance.artefactTitle).toBe('Title');
      expect(instance.titleIcon).toBe('wpp-icon-document');
      expect(instance.menuActions).toEqual([]);
      expect(instance.versions).toEqual([]);
      expect(instance.selectedVersionId).toBeUndefined();
      expect(instance.locales).toEqual({});
      expect(instance.ariaProps).toEqual({});
      expect(instance.width).toBeUndefined();
    });
  });
  describe('Testing the header title', () => {
    it('should render the title and the default document icon', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { artefactTitle: "Campaign brief" }),
      });
      expect(shadow(page).querySelector('.title')?.textContent).toBe('Campaign brief');
      expect(shadow(page).querySelector(`.title-wrapper ${icon('wpp-icon-document')}`)).not.toBeNull();
    });
    it('should render a custom title icon', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { titleIcon: "wpp-icon-image" }),
      });
      expect(shadow(page).querySelector(`.title-wrapper ${icon('wpp-icon-image')}`)).not.toBeNull();
      expect(shadow(page).querySelector(`.title-wrapper ${icon('wpp-icon-document')}`)).toBeNull();
    });
    it('should show the title tooltip only when the title is truncated', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { artefactTitle: "A long title" }),
      });
      const title = shadow(page).querySelector('.title');
      const { onShow } = shadow(page).querySelector('.title-tooltip').config;
      Object.defineProperty(title, 'clientWidth', { configurable: true, value: 100 });
      Object.defineProperty(title, 'scrollWidth', { configurable: true, value: 100 });
      expect(onShow()).toBe(false);
      Object.defineProperty(title, 'scrollWidth', { configurable: true, value: 200 });
      expect(onShow()).toBeUndefined();
    });
  });
  describe('Testing the header actions', () => {
    it('should render the default Quote, Pin, Copy and Download actions in order', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-unpinned', 'wpp-icon-copy', 'wpp-icon-download'].map(icon));
    });
    it('should emit wppActionClick with the clicked action', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const onActionClick = jest.fn();
      page.root.addEventListener('wppActionClick', onActionClick);
      buttonById(page, 'download').click();
      expect(onActionClick).toHaveBeenCalledTimes(1);
      expect(onActionClick.mock.calls[0][0].detail).toEqual({
        id: 'download',
        icon: 'wpp-icon-download',
        label: LOCALES_DEFAULTS.downloadAction,
      });
    });
    it('should flip the pin action and emit the state it ends in', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const onActionClick = jest.fn();
      page.root.addEventListener('wppActionClick', onActionClick);
      buttonById(page, 'pin').click();
      await page.waitForChanges();
      expect(onActionClick.mock.calls[0][0].detail).toMatchObject({ id: 'pin', isActive: true });
      expect(iconTagsOf(page)[1]).toBe(icon('wpp-icon-pinned'));
      buttonById(page, 'pin').click();
      await page.waitForChanges();
      expect(onActionClick.mock.calls[1][0].detail).toMatchObject({ id: 'pin', isActive: false });
      expect(iconTagsOf(page)[1]).toBe(icon('wpp-icon-unpinned'));
    });
    describe('the Copy action', () => {
      // Spied rather than faked, as in the chat message spec: the component schedules its timer with Node's
      // setTimeout, which mock-doc's window doesn't see
      let setTimeoutSpy;
      let clearTimeoutSpy;
      const confirmationTimers = () => setTimeoutSpy.mock.calls
        .map(([callback, delay], index) => ({
        end: callback,
        delay,
        handle: setTimeoutSpy.mock.results[index].value,
      }))
        .filter(({ delay }) => delay === COPIED_CONFIRMATION_TIMEOUT);
      beforeEach(() => {
        setTimeoutSpy = jest.spyOn(global, 'setTimeout');
        clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      });
      // A real timer left running would fire once the spec page is gone
      afterEach(() => {
        confirmationTimers().forEach(({ handle }) => clearTimeout(handle));
        setTimeoutSpy.mockRestore();
        clearTimeoutSpy.mockRestore();
      });
      const renderArtefact = (html = `<wpp-focus-artefact></wpp-focus-artefact>`) => newSpecPage({ components: [WppFocusArtefact], html });
      const clickCopy = async (page) => {
        buttonById(page, 'copy').click();
        await page.waitForChanges();
      };
      // wpp-tooltip isn't registered in this spec, so its text is an attribute
      const copyTooltipText = (page) => buttonById(page, 'copy').parentElement.getAttribute('text');
      const copyAriaLabel = (page) => buttonById(page, 'copy').ariaProps;
      it('should show a checkmark and "Copied" after a click, and emit the Copy action', async () => {
        const page = await renderArtefact();
        const onActionClick = jest.fn();
        page.root.addEventListener('wppActionClick', onActionClick);
        await clickCopy(page);
        expect(onActionClick.mock.calls[0][0].detail).toEqual({
          id: 'copy',
          icon: 'wpp-icon-copy',
          label: LOCALES_DEFAULTS.copyAction,
        });
        expect(iconTagsOf(page)[2]).toBe(icon('wpp-icon-done'));
        expect(copyTooltipText(page)).toBe(LOCALES_DEFAULTS.copiedAction);
        expect(copyAriaLabel(page)).toEqual({ label: LOCALES_DEFAULTS.copiedAction });
      });
      it('should show Copy again once the confirmation ends', async () => {
        const page = await renderArtefact();
        await clickCopy(page);
        const [timer] = confirmationTimers();
        clearTimeout(timer.handle);
        timer.end();
        await page.waitForChanges();
        expect(iconTagsOf(page)[2]).toBe(icon('wpp-icon-copy'));
        expect(copyTooltipText(page)).toBe(LOCALES_DEFAULTS.copyAction);
      });
      it('should start the confirmation again on a repeat click instead of stacking timers', async () => {
        const page = await renderArtefact();
        await clickCopy(page);
        const [first] = confirmationTimers();
        await clickCopy(page);
        expect(clearTimeoutSpy).toHaveBeenCalledWith(first.handle);
        expect(confirmationTimers()).toHaveLength(2);
      });
      it('should stop the confirmation when removed, so it sets no state afterwards', async () => {
        const page = await renderArtefact();
        await clickCopy(page);
        const [timer] = confirmationTimers();
        page.root.remove();
        expect(clearTimeoutSpy).toHaveBeenCalledWith(timer.handle);
      });
      it('should take the "Copied" text from locales', async () => {
        const page = await newSpecPage({
          components: [WppFocusArtefact],
          template: () => h("wpp-focus-artefact-v4-6-0", { locales: { copiedAction: 'Copiado' } }),
        });
        await clickCopy(page);
        expect(copyTooltipText(page)).toBe('Copiado');
      });
    });
  });
  describe('Testing the "More actions" menu', () => {
    it('should not render the menu without menu actions', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      expect(shadow(page).querySelector('.more-menu')).toBeNull();
    });
    it('should emit wppActionClick with the picked menu action', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { menuActions: MENU_ACTIONS }),
      });
      const onActionClick = jest.fn();
      page.root.addEventListener('wppActionClick', onActionClick);
      shadow(page).querySelectorAll('.more-menu wpp-list-item')[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(onActionClick.mock.calls[0][0].detail).toEqual(MENU_ACTIONS[1]);
    });
  });
  describe('Testing the version selector', () => {
    it('should not render the selector without versions', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      expect(versionMenu(page)).toBeNull();
    });
    it('should render an action button showing the selected version, with a menu of the versions', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS }),
      });
      const chevron = versionTrigger(page).querySelector('[slot="icon-end"]');
      expect(versionTrigger(page).getAttribute('variant')).toBe('secondary');
      expect(versionTrigger(page).textContent).toBe('Version 1');
      expect(chevron.tagName.toLowerCase()).toBe('wpp-icon-chevron');
      expect(chevron.getAttribute('direction')).toBe('down');
      expect(versionItems(page).map(versionLabelOf)).toEqual(['Version 1', 'Version 2']);
      expect(versionItems(page).map(item => item.getAttribute('role'))).toEqual(['menuitemradio', 'menuitemradio']);
    });
    it('should name the selector after what it selects and the selected version', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS, selectedVersionId: "v2" }),
      });
      expect(versionTrigger(page).ariaProps).toMatchObject({
        label: `${LOCALES_DEFAULTS.versionSelectorLabel}: Version 2`,
      });
      page.root.locales = { versionSelectorLabel: 'Versión' };
      await page.waitForChanges();
      expect(versionTrigger(page).ariaProps).toMatchObject({ label: 'Versión: Version 2' });
    });
    it('should select the first version when none is selected', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS }),
      });
      expect(checkedVersionsOf(page)).toEqual(['Version 1']);
      expect(versionItems(page).map(item => item.getAttribute('aria-checked'))).toEqual(['true', 'false']);
    });
    it('should select the first version when the given one matches none', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS, selectedVersionId: "missing" }),
      });
      expect(versionTrigger(page).textContent).toBe('Version 1');
      expect(checkedVersionsOf(page)).toEqual(['Version 1']);
    });
    it('should select the given version', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS, selectedVersionId: "v2" }),
      });
      expect(versionTrigger(page).textContent).toBe('Version 2');
      expect(checkedVersionsOf(page)).toEqual(['Version 2']);
      expect(versionItems(page).map(item => item.getAttribute('aria-checked'))).toEqual(['false', 'true']);
    });
    it('should select a version, show it in the trigger and emit wppVersionSelect', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS }),
      });
      const onVersionSelect = jest.fn();
      page.root.addEventListener('wppVersionSelect', onVersionSelect);
      versionItems(page)[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(onVersionSelect.mock.calls[0][0].detail).toEqual(VERSIONS[1]);
      expect(page.root.selectedVersionId).toBe('v2');
      expect(versionTrigger(page).textContent).toBe('Version 2');
      expect(checkedVersionsOf(page)).toEqual(['Version 2']);
    });
    it('should emit nothing when the selected version is picked again', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS }),
      });
      const onVersionSelect = jest.fn();
      page.root.addEventListener('wppVersionSelect', onVersionSelect);
      versionItems(page)[0].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(onVersionSelect).not.toHaveBeenCalled();
      expect(page.root.selectedVersionId).toBeUndefined();
    });
    it('should expose the menu state on the trigger and turn the chevron while the menu is open', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { versions: VERSIONS }),
      });
      const chevronDirection = () => versionTrigger(page).querySelector('[slot="icon-end"]').getAttribute('direction');
      expect(versionTrigger(page).ariaProps).toMatchObject({ haspopup: 'menu', expanded: false });
      versionMenu(page).dropdownConfig.onShow();
      await page.waitForChanges();
      expect(versionTrigger(page).ariaProps.expanded).toBe(true);
      expect(chevronDirection()).toBe('up');
      versionMenu(page).dropdownConfig.onHide();
      await page.waitForChanges();
      expect(versionTrigger(page).ariaProps.expanded).toBe(false);
      expect(chevronDirection()).toBe('down');
    });
    it('should size the selector to its content, so it leaves the title its space', () => {
      const styles = readStyleSheet(join(__dirname, '..', 'wpp-focus-artefact.scss'));
      expect(scssDeclarations(styles, ['.title-wrapper', '.version-selector'])).toMatchObject({
        '--wpp-mc-wrapper-width': 'fit-content',
        'flex-shrink': '0',
      });
    });
  });
  describe('Testing the close button', () => {
    it('should emit wppClose when clicked', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const onClose = jest.fn();
      page.root.addEventListener('wppClose', onClose);
      shadow(page).querySelector('.close-button').click();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
    it('should always render the close button at the end of the header', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { menuActions: MENU_ACTIONS }),
      });
      const lastHeaderElement = shadow(page).querySelector('.actions-wrapper').lastElementChild;
      expect(lastHeaderElement.querySelector('.close-button')).not.toBeNull();
    });
  });
  describe('Testing locales', () => {
    it('should use the default English labels', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { menuActions: MENU_ACTIONS }),
      });
      expect(buttonById(page, 'quote').ariaProps.label).toBe('Quote');
      expect(shadow(page).querySelector('.close-button').ariaProps.label).toBe('Close');
      expect(shadow(page).querySelector('.more-menu wpp-action-button').ariaProps.label).toBe('More actions');
    });
    it('should merge partial locale overrides with the defaults', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { locales: { quoteAction: 'Citer', closeAction: 'Fermer' } }),
      });
      expect(buttonById(page, 'quote').ariaProps.label).toBe('Citer');
      expect(buttonById(page, 'copy').ariaProps.label).toBe(LOCALES_DEFAULTS.copyAction);
      expect(shadow(page).querySelector('.close-button').ariaProps.label).toBe('Fermer');
    });
    it('should use the unpin label once the pin action is on', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      buttonById(page, 'pin').click();
      await page.waitForChanges();
      expect(buttonById(page, 'pin').ariaProps.label).toBe(LOCALES_DEFAULTS.unpinAction);
    });
  });
  describe('Testing accessibility', () => {
    it('should be a region named after the title by default', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { artefactTitle: "Campaign brief" }),
      });
      expect(page.root.getAttribute('role')).toBe('region');
      expect(page.root.getAttribute('aria-label')).toBe('Campaign brief');
    });
    it('should use the label from ariaProps', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { artefactTitle: "Campaign brief", ariaProps: { label: 'Focused artefact' } }),
      });
      expect(page.root.getAttribute('aria-label')).toBe('Focused artefact');
    });
    it('should not add the title as aria-label when the region is labelled by reference', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { ariaProps: { labelledby: 'heading-id' } }),
      });
      expect(page.root.getAttribute('aria-labelledby')).toBe('heading-id');
      expect(page.root.hasAttribute('aria-label')).toBe(false);
    });
    it('should name the pin after what a click does', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const pin = () => buttonById(page, 'pin');
      // wpp-tooltip isn't registered in this spec, so its `text` is set as an attribute
      const tooltipText = () => pin().parentElement.getAttribute('text');
      expect(pin().ariaProps).toEqual({ label: LOCALES_DEFAULTS.pinAction });
      expect(tooltipText()).toBe(LOCALES_DEFAULTS.pinAction);
      pin().click();
      await page.waitForChanges();
      expect(pin().ariaProps).toEqual({ label: LOCALES_DEFAULTS.unpinAction });
      expect(tooltipText()).toBe(LOCALES_DEFAULTS.unpinAction);
      pin().click();
      await page.waitForChanges();
      expect(pin().ariaProps).toEqual({ label: LOCALES_DEFAULTS.pinAction });
    });
    it('should expose the more menu as a popup and reflect its open state', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { menuActions: MENU_ACTIONS }),
      });
      const moreMenu = shadow(page).querySelector('.more-menu');
      const moreTrigger = () => shadow(page).querySelector('.more-menu wpp-action-button');
      expect(moreTrigger().ariaProps).toMatchObject({ haspopup: 'menu', expanded: false });
      moreMenu.dropdownConfig.onShow();
      await page.waitForChanges();
      expect(moreTrigger().ariaProps.expanded).toBe(true);
      moreMenu.dropdownConfig.onHide();
      await page.waitForChanges();
      expect(moreTrigger().ariaProps.expanded).toBe(false);
    });
    it('should keep the more menu config stable across renders', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { menuActions: MENU_ACTIONS }),
      });
      const config = shadow(page).querySelector('.more-menu').dropdownConfig;
      config.onShow();
      await page.waitForChanges();
      expect(shadow(page).querySelector('.more-menu').dropdownConfig).toBe(config);
    });
  });
  describe('Testing the scrollable body', () => {
    let observers;
    beforeEach(() => {
      observers = [];
      global.ResizeObserver = jest.fn().mockImplementation(callback => {
        const observer = new ResizeObserverMock(callback);
        observers.push(observer);
        return observer;
      });
    });
    afterEach(() => {
      global.ResizeObserver = ResizeObserverMock;
    });
    const renderArtefact = (locales) => newSpecPage({
      components: [WppFocusArtefact],
      template: () => (h("wpp-focus-artefact-v4-6-0", { locales: locales }, h("div", { slot: "body" }, "Content"))),
    });
    const body = (page) => shadow(page).querySelector('.body');
    // The latest observer watching the body: a slot change replaces it
    const bodyObserver = (page) => [...observers].reverse().find(observer => observer.observe.mock.calls.some(([target]) => target === body(page)));
    // The mock DOM lays nothing out, so the content's height and the body's are set by hand
    const resizeContent = async (page, contentHeight, bodyHeight = 200) => {
      Object.defineProperty(body(page), 'scrollHeight', { configurable: true, value: contentHeight });
      Object.defineProperty(body(page), 'clientHeight', { configurable: true, value: bodyHeight });
      bodyObserver(page).triggerResize(contentHeight);
      await page.waitForChanges();
    };
    const tabStopOf = (page) => ({
      tabindex: body(page).getAttribute('tabindex'),
      role: body(page).getAttribute('role'),
      label: body(page).getAttribute('aria-label'),
    });
    it('should not be a tab stop while its content fits', async () => {
      const page = await renderArtefact();
      await resizeContent(page, 200);
      expect(tabStopOf(page)).toEqual({ tabindex: null, role: null, label: null });
    });
    it('should be a named region in the tab order while its content overflows', async () => {
      const page = await renderArtefact();
      await resizeContent(page, 600);
      expect(tabStopOf(page)).toEqual({ tabindex: '0', role: 'region', label: LOCALES_DEFAULTS.bodyLabel });
    });
    it('should leave the tab order once its content fits again', async () => {
      const page = await renderArtefact();
      await resizeContent(page, 600);
      await resizeContent(page, 180);
      expect(tabStopOf(page)).toEqual({ tabindex: null, role: null, label: null });
    });
    it('should take its name from locales', async () => {
      const page = await renderArtefact({ bodyLabel: 'Contenido' });
      await resizeContent(page, 600);
      expect(tabStopOf(page).label).toBe('Contenido');
    });
    it('should watch the body and its content, again when the content changes', async () => {
      const page = await renderArtefact();
      const content = page.root.querySelector('[slot="body"]');
      const firstObserver = bodyObserver(page);
      expect(firstObserver.observe).toHaveBeenCalledWith(body(page));
      expect(firstObserver.observe).toHaveBeenCalledWith(content);
      shadow(page).querySelector('slot[name="body"]').dispatchEvent(new Event('slotchange'));
      expect(firstObserver.disconnect).toHaveBeenCalled();
      expect(bodyObserver(page)).not.toBe(firstObserver);
      expect(bodyObserver(page).observe).toHaveBeenCalledWith(content);
    });
    it('should stop watching the body once disconnected', async () => {
      const page = await renderArtefact();
      const observer = bodyObserver(page);
      page.root.remove();
      await page.waitForChanges();
      expect(observer.disconnect).toHaveBeenCalled();
    });
  });
  describe('Testing resizing', () => {
    // The parent's content width, which percentages and `calc()` resolve against
    let parentWidth = 1200;
    // The parent is the page's <body>, which the following pages share, so its stubbed width is removed after each test
    let stubbedParent = null;
    beforeEach(() => {
      parentWidth = 1200;
    });
    afterEach(() => {
      if (stubbedParent)
        Reflect.deleteProperty(stubbedParent, 'clientWidth');
      stubbedParent = null;
    });
    // The spec has no stylesheet, so this stands in for it: it resolves the lengths the tests use (pixels, percentages,
    // `calc(100% - <n>px)` and `min(<n>px, 100%)`) against the parent, as the browser would
    const resolve = (length) => {
      const calc = length.match(/^calc\(100% - (\d+)px\)$/);
      const capped = length.match(/^min\((-?[\d.]+)px, 100%\)$/);
      if (calc)
        return parentWidth - Number(calc[1]);
      if (capped)
        return Math.min(Number(capped[1]), parentWidth);
      if (length.endsWith('%'))
        return (parseFloat(length) / 100) * parentWidth;
      return parseFloat(length);
    };
    // The rendered width: `--fa-width` (100% until it's set), kept between the minimum width and the `max-width` (100%
    // until the app sets one on the element)
    const renderedWidth = (host) => {
      const width = resolve(host.style.getPropertyValue('--fa-width') || '100%');
      const maxWidth = resolve(host.style.getPropertyValue('max-width') || '100%');
      return Math.max(MIN_WIDTH, Math.min(width, maxWidth));
    };
    // With the default `max-width`, the artefact fills its parent, so this is the width it starts at
    const DEFAULT_MAX_WIDTH = 1200;
    // The width and the `max-width` are set once the page and its window exist, so the stubs apply to them
    const setup = async ({ width, maxWidth } = {}) => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        html: `<wpp-focus-artefact></wpp-focus-artefact>`,
      });
      const onResize = jest.fn();
      stubbedParent = page.root.parentElement;
      Object.defineProperty(stubbedParent, 'clientWidth', { get: () => parentWidth, configurable: true });
      // A whole number of pixels, as in the browser
      Object.defineProperty(page.root, 'offsetWidth', {
        get: () => Math.round(renderedWidth(page.root)),
        configurable: true,
      });
      page.root.width = width;
      // As the app would, on the element
      if (maxWidth)
        page.root.style.setProperty('max-width', maxWidth);
      const widthVar = () => page.root.style.getPropertyValue('--fa-width');
      const handle = shadow(page).querySelector('[data-testid="wpp-focus-artefact-resize-handle"]');
      // The spec has no pointer capture, so this stands in for it: once a drag is captured, the browser releases it
      // right after the button is released or the drag is cancelled, and fires `lostpointercapture`
      let isCaptured = false;
      const releaseCapture = () => {
        if (!isCaptured)
          return;
        isCaptured = false;
        handle.dispatchEvent(new Event('lostpointercapture'));
      };
      Object.assign(handle, {
        setPointerCapture: () => (isCaptured = true),
        hasPointerCapture: () => isCaptured,
      });
      handle.addEventListener('pointerup', releaseCapture);
      handle.addEventListener('pointercancel', releaseCapture);
      const pressKey = async (key) => {
        handle.dispatchEvent(new KeyboardEvent('keydown', { key }));
        await page.waitForChanges();
      };
      // The component measures the layout when the handle is focused, which is when a screen reader announces it
      const focusHandle = async () => {
        handle.dispatchEvent(new FocusEvent('focus'));
        await page.waitForChanges();
      };
      const setParentWidth = async (newParentWidth) => {
        parentWidth = newParentWidth;
        await focusHandle();
      };
      await focusHandle();
      page.root.addEventListener('wppResize', onResize);
      return { page, handle, onResize, widthVar, pressKey, focusHandle, setParentWidth };
    };
    it('should fill its parent, up to the default max-width, until it is resized', async () => {
      const { handle, widthVar } = await setup();
      // Left to the stylesheet
      expect(widthVar()).toBe('');
      expect(handle.getAttribute('aria-valuenow')).toBe(String(DEFAULT_MAX_WIDTH));
    });
    it('should expose the window splitter semantics on the left border', async () => {
      const { handle } = await setup();
      expect(handle.getAttribute('role')).toBe('separator');
      expect(handle.getAttribute('aria-orientation')).toBe('vertical');
      expect(handle.getAttribute('tabindex')).toBe('0');
      expect(handle.getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.resizeHandleLabel);
      expect(handle.getAttribute('aria-valuenow')).toBe(String(DEFAULT_MAX_WIDTH));
      // The value is read as is, so there's no text to translate
      expect(handle.hasAttribute('aria-valuetext')).toBe(false);
      expect(handle.getAttribute('aria-valuemin')).toBe(String(MIN_WIDTH));
      expect(handle.getAttribute('aria-valuemax')).toBe(String(DEFAULT_MAX_WIDTH));
    });
    it('should use the label from locales', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { locales: { resizeHandleLabel: 'Redimensionar' } }),
      });
      expect(shadow(page).querySelector('.resize-handle')?.getAttribute('aria-label')).toBe('Redimensionar');
    });
    it('should pass width to the stylesheet: a number, or a number given as a string, as capped pixels, a percentage as is', async () => {
      const { page, widthVar } = await setup({ width: 700 });
      expect(widthVar()).toBe('min(700px, 100%)');
      // e.g. from the width attribute
      page.root.width = '600';
      await page.waitForChanges();
      expect(widthVar()).toBe('min(600px, 100%)');
      page.root.width = '40%';
      await page.waitForChanges();
      expect(widthVar()).toBe('40%');
      page.root.width = undefined;
      await page.waitForChanges();
      expect(widthVar()).toBe('');
    });
    it('should measure the widest width its max-width allows, never below the minimum width', async () => {
      const { page, handle, widthVar, focusHandle } = await setup({ maxWidth: '900px' });
      // The app changes it on the element, and the handle measures it again once it's used
      const setMaxWidth = async (maxWidth) => {
        page.root.style.setProperty('max-width', maxWidth);
        await focusHandle();
      };
      expect(handle.getAttribute('aria-valuemax')).toBe('900');
      // The width it asks for to measure is restored
      expect(widthVar()).toBe('');
      await setMaxWidth('100%');
      expect(handle.getAttribute('aria-valuemax')).toBe('1200');
      await setMaxWidth('calc(100% - 400px)');
      expect(handle.getAttribute('aria-valuemax')).toBe('800');
      await setMaxWidth('300px');
      expect(handle.getAttribute('aria-valuemax')).toBe(String(MIN_WIDTH));
    });
    it('should apply the width before the first render', async () => {
      const originalRender = WppFocusArtefact.prototype.render;
      const widthsAtRender = [];
      const renderSpy = jest.spyOn(WppFocusArtefact.prototype, 'render').mockImplementation(function () {
        widthsAtRender.push(this.host.style.getPropertyValue('--fa-width'));
        return originalRender.call(this);
      });
      await newSpecPage({
        components: [WppFocusArtefact],
        template: () => h("wpp-focus-artefact-v4-6-0", { width: 600 }),
      });
      renderSpy.mockRestore();
      expect(widthsAtRender[0]).toBe('min(600px, 100%)');
    });
    it('should measure the layout again when the width changes', async () => {
      const { page, handle } = await setup();
      page.root.width = 700;
      await page.waitForChanges();
      expect(handle.getAttribute('aria-valuenow')).toBe('700');
    });
    describe('when the parent resizes', () => {
      let parentObserver;
      beforeEach(() => {
        parentObserver = undefined;
        global.ResizeObserver = jest.fn().mockImplementation(callback => {
          const observer = new ResizeObserverMock(callback);
          // The parent's is the first, made on connection; the body's follows once the artefact has rendered
          parentObserver ?? (parentObserver = observer);
          return observer;
        });
      });
      it('should observe its parent, and stop once disconnected', async () => {
        const { page } = await setup();
        expect(parentObserver.observe).toHaveBeenCalledWith(page.root.parentElement);
        page.root.remove();
        await page.waitForChanges();
        expect(parentObserver.disconnect).toHaveBeenCalled();
      });
      it('should measure the bounds again, without the handle being focused', async () => {
        const { page, handle } = await setup({ width: 480 });
        // e.g. the window got narrower
        parentWidth = 800;
        parentObserver.triggerResize(0);
        await page.waitForChanges();
        expect(handle.getAttribute('aria-valuemax')).toBe('800');
      });
      it('should keep the width of a drag in progress', async () => {
        const { handle, widthVar } = await setup({ width: 600 });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        parentObserver.triggerResize(0);
        expect(widthVar()).toBe('min(700px, 100%)');
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
      });
    });
    it('should measure the bounds again when the handle is focused after the parent got narrower', async () => {
      const { handle, widthVar, pressKey, setParentWidth } = await setup({ width: 480 });
      await setParentWidth(800);
      expect(handle.getAttribute('aria-valuemax')).toBe('800');
      await pressKey('End');
      expect(widthVar()).toBe('min(800px, 100%)');
    });
    it('should never be wider than its parent, even when its max-width allows more', async () => {
      const { handle, widthVar, pressKey } = await setup({ width: 600, maxWidth: '200%' });
      expect(handle.getAttribute('aria-valuemax')).toBe('1200');
      await pressKey('End');
      expect(widthVar()).toBe('min(1200px, 100%)');
    });
    it('should keep the minimum width when the parent leaves less room than that', async () => {
      const { handle, onResize, pressKey, setParentWidth } = await setup();
      await setParentWidth(400);
      expect(handle.getAttribute('aria-valuenow')).toBe(String(MIN_WIDTH));
      expect(handle.getAttribute('aria-valuemax')).toBe(String(MIN_WIDTH));
      await pressKey('End');
      expect(onResize).not.toHaveBeenCalled();
    });
    describe('with the pointer', () => {
      it('should widen the artefact while the left border is dragged to the left, and emit the width on release', async () => {
        const { page, handle, onResize, widthVar } = await setup({ width: 600 });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        // Capped at the container, so it never makes a container sized by its content grow
        expect(widthVar()).toBe('min(700px, 100%)');
        expect(onResize).not.toHaveBeenCalled();
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
        await page.waitForChanges();
        expect(onResize).toHaveBeenCalledTimes(1);
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 700 });
        expect(page.root.width).toBe(700);
        expect(handle.getAttribute('aria-valuenow')).toBe('700');
      });
      it('should keep the width the stylesheet bounds the drag to, down to the minimum width', async () => {
        const { page, handle, onResize, widthVar } = await setup({ width: 600 });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 900 }));
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 900 }));
        await page.waitForChanges();
        expect(page.root.width).toBe(MIN_WIDTH);
        expect(widthVar()).toBe(`min(${MIN_WIDTH}px, 100%)`);
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: MIN_WIDTH });
      });
      it('should keep the width the stylesheet bounds the drag to, up to the max-width', async () => {
        const { page, handle, onResize } = await setup({ width: 600, maxWidth: '650px' });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 100 }));
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 100 }));
        await page.waitForChanges();
        expect(page.root.width).toBe(650);
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 650 });
      });
      it('should report a percentage width of the slot it is placed in, when slotted into another component', async () => {
        const { page, handle, onResize } = await setup({ width: '50%' });
        // The other component renders the slot in a 1000px wrapper, while the parent element is 1200px wide
        const wrapper = document.createElement('div');
        const slot = document.createElement('slot');
        wrapper.appendChild(slot);
        Object.defineProperty(wrapper, 'clientWidth', { value: 1000, configurable: true });
        Object.defineProperty(page.root, 'assignedSlot', { value: slot, configurable: true });
        // 600px, widened by 100px
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
        await page.waitForChanges();
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: '70%' });
      });
      it('should end the drag when the pointer capture is lost without a release', async () => {
        const { page, handle, onResize } = await setup({ width: 600 });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        handle.dispatchEvent(new Event('lostpointercapture'));
        await page.waitForChanges();
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 700 });
      });
      it('should not start a resize with a button other than the primary one', async () => {
        const { handle, onResize, widthVar } = await setup();
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500, button: 2 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
        expect(widthVar()).toBe('');
        expect(onResize).not.toHaveBeenCalled();
      });
      it('should end the resize on pointer cancel and ignore further movement', async () => {
        const { page, handle, widthVar } = await setup({ width: 600 });
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        handle.dispatchEvent(new MouseEvent('pointercancel', { clientX: 400 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 100 }));
        await page.waitForChanges();
        expect(widthVar()).toBe('min(700px, 100%)');
      });
    });
    describe('with a percentage width', () => {
      it('should keep it a percentage of the parent after a drag', async () => {
        const { page, handle, onResize, widthVar } = await setup({ width: '50%' });
        // 50% of the 1200px parent is 600px; dragging 100px to the left makes it 700px, i.e. 58.33%
        handle.dispatchEvent(new MouseEvent('pointerdown', { clientX: 500 }));
        handle.dispatchEvent(new MouseEvent('pointermove', { clientX: 400 }));
        handle.dispatchEvent(new MouseEvent('pointerup', { clientX: 400 }));
        await page.waitForChanges();
        expect(page.root.width).toBe('58.33%');
        expect(widthVar()).toBe('58.33%');
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: '58.33%' });
        expect(handle.getAttribute('aria-valuenow')).toBe('700');
      });
      it('should keep it a percentage of the parent after a keyboard step', async () => {
        const { page, onResize, pressKey } = await setup({ width: '50%' });
        await pressKey('ArrowLeft');
        // 600px + one 10px step = 610px of the 1200px parent
        expect(page.root.width).toBe('50.83%');
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: '50.83%' });
      });
      it('should report a pixel width as a number of pixels', async () => {
        const { onResize, pressKey } = await setup({ width: 600 });
        await pressKey('ArrowLeft');
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 610 });
      });
    });
    describe('with the keyboard', () => {
      it('should widen the artefact by one step on ArrowLeft and narrow it on ArrowRight', async () => {
        const { handle, onResize, widthVar, pressKey } = await setup({ width: 600 });
        await pressKey('ArrowLeft');
        expect(widthVar()).toBe(`min(${600 + RESIZE_KEYBOARD_STEP}px, 100%)`);
        expect(handle.getAttribute('aria-valuenow')).toBe(String(600 + RESIZE_KEYBOARD_STEP));
        expect(onResize.mock.calls[0][0].detail).toEqual({ width: 600 + RESIZE_KEYBOARD_STEP });
        await pressKey('ArrowRight');
        expect(widthVar()).toBe('min(600px, 100%)');
        expect(handle.getAttribute('aria-valuenow')).toBe('600');
        expect(onResize).toHaveBeenCalledTimes(2);
      });
      it('should go to the minimum width on Home and to the maximum on End', async () => {
        const { widthVar, pressKey } = await setup({ maxWidth: '900px' });
        await pressKey('Home');
        expect(widthVar()).toBe(`min(${MIN_WIDTH}px, 100%)`);
        await pressKey('End');
        expect(widthVar()).toBe('min(900px, 100%)');
      });
      it('should stay interactive at a bound, ignoring only the keys that go past it', async () => {
        const { onResize, widthVar, pressKey } = await setup({ maxWidth: '900px' });
        // It starts at the maximum width
        await pressKey('ArrowLeft');
        await pressKey('End');
        expect(onResize).not.toHaveBeenCalled();
        expect(widthVar()).toBe('');
        await pressKey('ArrowRight');
        expect(widthVar()).toBe(`min(${900 - RESIZE_KEYBOARD_STEP}px, 100%)`);
        expect(onResize).toHaveBeenCalledTimes(1);
      });
      it('should ignore keys that are not resize controls, without measuring the layout', async () => {
        const { page, onResize, widthVar, pressKey } = await setup();
        const measure = jest.spyOn(page.root, 'offsetWidth', 'get');
        measure.mockClear();
        await pressKey('Tab');
        expect(measure).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();
        expect(widthVar()).toBe('');
      });
    });
  });
  describe('Testing Snapshots', () => {
    it('should render the default focus artefact', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => (h("wpp-focus-artefact-v4-6-0", { artefactTitle: "Campaign brief" }, h("div", { slot: "body" }, "Content"))),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render the focus artefact with versions and menu actions', async () => {
      const page = await newSpecPage({
        components: [WppFocusArtefact],
        template: () => (h("wpp-focus-artefact-v4-6-0", { artefactTitle: "Campaign brief", versions: VERSIONS, selectedVersionId: "v2", menuActions: MENU_ACTIONS })),
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});

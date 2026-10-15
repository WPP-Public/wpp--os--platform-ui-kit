import { newSpecPage } from '@stencil/core/testing';
import { WppChatInput } from '../wpp-chat-input';
import * as themeUtils from '../../../../../utils/subscribe-to-theme';
import * as loadingHalo from '../../../../../utils/loading-halo';
import { h } from '@stencil/core';
import { MockSpeechRecognition } from './mocks';
import { PRIMARY_ACTION_TRANSITION_MS } from '../consts';
const createMouseEvent = () => ({
  stopPropagation: jest.fn(),
  preventDefault: jest.fn(),
});
describe('wpp-chat-input', () => {
  it('should render chat input with attachments enabled', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input enableAttach="true"></wpp-chat-input>`,
    });
    // Paired with the root snapshot: the model-selector trigger leaves aria-expanded and
    // aria-haspopup to wpp-menu-context, which is why they no longer appear in it.
    const trigger = page.root?.shadowRoot?.querySelector('.select-model-trigger');
    expect(trigger?.hasAttribute('aria-expanded')).toBe(false);
    expect(trigger?.hasAttribute('aria-haspopup')).toBe(false);
    expect(page.root).toMatchSnapshot();
    expect(page.root).toHaveAttribute('enableAttach');
  });
  it('should apply custom file upload configuration', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input fileUploadConfig='{"maxFiles": 3, "size": 100, "acceptConfig": {"image/jpeg": [".jpg"], "image/png": [".png"]}}'></wpp-chat-input>`,
    });
    // Paired with the snapshot, which this change also touched: the default model row is a
    // single-select menu item and the trigger no longer authors its own aria-haspopup
    // (WPPOPENDS-1593).
    const dropdown = page.root?.shadowRoot?.querySelector('.wpp-model-dropdown');
    expect(dropdown?.querySelector('wpp-list-item')?.getAttribute('role')).toBe('menuitemradio');
    expect(page.root?.shadowRoot?.querySelector('.select-model-trigger')?.hasAttribute('aria-haspopup')).toBe(false);
    expect(page.root).toMatchSnapshot();
  });
  it('should trigger wppSend event when sending a message', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input></wpp-chat-input>`,
    });
    const chatInput = page.rootInstance;
    const sendSpy = jest.fn();
    chatInput.wppSend = { emit: sendSpy };
    chatInput.textValue = 'Hello, World!';
    chatInput.handleSend();
    expect(sendSpy).toHaveBeenCalledWith({
      message: 'Hello, World!',
      attachments: [],
      // The model in use rides along so consumers can forward it with the request. "Auto"
      // offers no reasoning/verbosity levels, so neither key is present.
      model: expect.objectContaining({ id: 'auto', label: 'Auto' }),
    });
  });
  it('should stop audio recording when clicking send and isAudioRecording is true', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input></wpp-chat-input>`,
    });
    const mockRecognition = new MockSpeechRecognition();
    Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
    page.rootInstance.isAudioRecording = true;
    page.rootInstance.textValue = 'Hello, World!';
    page.rootInstance.handleSend();
    expect(page.rootInstance.isAudioRecording).toBe(false);
    expect(mockRecognition.stop).toHaveBeenCalledTimes(1);
  });
  it('should render stop action and emit wppStop while generating', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input is-generating="true"></wpp-chat-input>`,
    });
    const stopSpy = jest.fn();
    const sendSpy = jest.fn();
    page.root?.addEventListener('wppStop', stopSpy);
    page.root?.addEventListener('wppSend', sendSpy);
    const actionButton = page.root?.shadowRoot?.querySelector('[data-testid="stop-icon-only-button"]');
    // While generating, the send button is replaced by the stop action rather than restyled.
    expect(page.root?.shadowRoot?.querySelector('[data-testid="send-icon-only-button"]')).toBeNull();
    expect(actionButton.disabled).not.toBe(true);
    expect(actionButton.ariaProps.label).toBe('Stop response');
    expect(actionButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
    actionButton.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(stopSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).not.toHaveBeenCalled();
    // Pressing stop starts the hide timer; tear the component down so it does not outlive the test.
    page.root?.remove();
  });
  describe('send/stop primary action', () => {
    const getStopBtn = (page) => page.root?.shadowRoot?.querySelector('[data-testid="stop-icon-only-button"]');
    const getSendBtn = (page) => page.root?.shadowRoot?.querySelector('[data-testid="send-icon-only-button"]');
    it('keeps the hidden send button out of the tab order and a11y tree via inert (WCAG 4.1.2)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      // Nothing to send yet, so the button is only visually collapsed and must be inert.
      expect(getSendBtn(page)?.hasAttribute('inert')).toBe(true);
      page.rootInstance.internalValue = 'Hello';
      await page.waitForChanges();
      expect(getSendBtn(page)?.hasAttribute('inert')).toBe(false);
    });
    it('holds the stop button for one transition after it is pressed, inert while it animates out', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input is-generating="true"></wpp-chat-input>`,
      });
      expect(getStopBtn(page)?.hasAttribute('inert')).toBe(false);
      getStopBtn(page)?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.isStopBtnHiding).toBe(true);
      // A consumer flips `isGenerating` off in response to `wppStop`. Without the hide timer the
      // stop button would be swapped for send on this very render.
      page.rootInstance.isGenerating = false;
      await page.waitForChanges();
      // Still mounted so it can collapse away, but no longer an invisible focus target.
      const stopBtn = getStopBtn(page);
      expect(stopBtn).not.toBeNull();
      expect(stopBtn?.classList.contains('is-hidden')).toBe(true);
      expect(stopBtn?.hasAttribute('inert')).toBe(true);
      await new Promise(resolve => setTimeout(resolve, PRIMARY_ACTION_TRANSITION_MS + 50));
      await page.waitForChanges();
      expect(page.rootInstance.isStopBtnHiding).toBe(false);
      expect(getStopBtn(page)).toBeNull();
      expect(getSendBtn(page)).not.toBeNull();
    });
    it('clears the pending hide timer on disconnect', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input is-generating="true"></wpp-chat-input>`,
      });
      getStopBtn(page)?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.stopBtnHideTimeout).not.toBeNull();
      page.rootInstance.disconnectedCallback();
      expect(page.rootInstance.stopBtnHideTimeout).toBeNull();
    });
  });
  it('Testing that isFocused is set when handleOnFocus is called', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input></wpp-chat-input>`,
    });
    expect(page.rootInstance.isFocused).toBeFalsy();
    page.rootInstance.handleOnFocus();
    expect(page.rootInstance.isFocused).toBeTruthy();
  });
  describe('Testing handleSimpleBlur', () => {
    it('should set isFocused to false and removeExpandedListeners for size-s', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input size="s"></wpp-chat-input>`,
      });
      const removeExpandedListenersSpy = jest.fn();
      page.rootInstance.isFocused = true;
      page.rootInstance.removeExpandedListeners = removeExpandedListenersSpy;
      page.rootInstance.isChatInputExpanded = true;
      page.rootInstance.handleSimpleBlur();
      expect(page.rootInstance.isChatInputExpanded).toBe(false);
      expect(removeExpandedListenersSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isFocused).toBe(false);
    });
    it('should set isFocused to false and removeExpandedListeners for size-m', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const removeExpandedListenersSpy = jest.fn();
      page.rootInstance.isFocused = true;
      page.rootInstance.removeExpandedListeners = removeExpandedListenersSpy;
      page.rootInstance.isChatInputExpanded = true;
      page.rootInstance.handleSimpleBlur();
      expect(page.rootInstance.isChatInputExpanded).toBe(true);
      expect(removeExpandedListenersSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isFocused).toBe(false);
    });
  });
  describe('outside-interaction guard while expanded', () => {
    const getInputArea = (page) => page.root?.shadowRoot?.querySelector('.input-area');
    /**
     * Puts the `s` variant into the expanded, focused state the guard listens in. The expansion
     * is set directly because mock-doc never dispatches the host click that normally triggers it;
     * the `focus` event is real, and is what registers the document listeners under test.
     */
    const expand = async (page) => {
      page.rootInstance.isChatInputExpanded = true;
      page.root.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
    };
    /** A portalled dropdown: tippy appends its popup to the body under an `id="tippy-N"` root. */
    const appendPortalledRow = (page) => {
      const portal = page.doc.createElement('div');
      portal.id = 'tippy-1';
      const row = page.doc.createElement('div');
      portal.appendChild(row);
      page.doc.body.appendChild(portal);
      return row;
    };
    it('stays expanded when a row inside a portalled dropdown is pressed', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input size="s"></wpp-chat-input>`,
      });
      await expand(page);
      expect(getInputArea(page)?.className).toContain('expanded');
      appendPortalledRow(page).dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
      await page.waitForChanges();
      expect(getInputArea(page)?.className).toContain('expanded');
    });
    it('collapses when the press lands outside both the input and its dropdowns', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input size="s"></wpp-chat-input>`,
      });
      await expand(page);
      expect(getInputArea(page)?.className).toContain('expanded');
      const elsewhere = page.doc.createElement('div');
      page.doc.body.appendChild(elsewhere);
      elsewhere.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
      await page.waitForChanges();
      expect(getInputArea(page)?.className).toContain('minimized');
    });
  });
  describe('Testing handleClickAudioRecording', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testing that speech recognition starts when isAudioRecording is false (initially)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const wppMicSpy = jest.fn();
      const mockRecognition = new MockSpeechRecognition();
      Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
      jest.spyOn(page.rootInstance.recognition, 'isSupported', 'get').mockReturnValue(true);
      page.rootInstance.wppMic = { emit: wppMicSpy };
      const startRecognitionSpy = jest.spyOn(page.rootInstance.recognition, 'startRecognition');
      expect(page.rootInstance.isAudioRecording).toBe(false);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(true);
      expect(wppMicSpy).toHaveBeenCalledWith({ isRecording: true });
      expect(startRecognitionSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing that speech recognition stops when isAudioRecording is true (initially)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const mockRecognition = new MockSpeechRecognition();
      Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
      jest.spyOn(page.rootInstance.recognition, 'isSupported', 'get').mockReturnValue(true);
      page.rootInstance.isAudioRecording = true;
      const stopRecognitionSpy = jest.spyOn(page.rootInstance.recognition, 'stopRecognition');
      expect(page.rootInstance.isAudioRecording).toBe(true);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(false);
      expect(stopRecognitionSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing that `isAudioRecording` does not change if recognition not defined', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const wppMicSpy = jest.fn();
      page.rootInstance.wppMic = { emit: wppMicSpy };
      Reflect.set(page.rootInstance.recognition, 'recognition', null);
      expect(page.rootInstance.isAudioRecording).toBe(false);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(false);
      expect(wppMicSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('Testing shouldDisplaySend', () => {
    it('Testing that it returns false when component is disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-5-0", { disabled: true }),
      });
      expect(page.rootInstance.shouldDisplaySend()).toBe(false);
    });
    it('Testing that it returns true when component is generating and not disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-5-0", { disabled: false, isGenerating: true }),
      });
      expect(page.rootInstance.shouldDisplaySend()).toBe(true);
    });
    it('Testing that it returns true when component is audio recording with a value and not disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-5-0", { disabled: false }),
      });
      page.rootInstance.internalValue = 'Testing';
      page.rootInstance.isAudioRecording = true;
      expect(page.rootInstance.shouldDisplaySend()).toBe(true);
    });
  });
  describe('actions menu (actions prop)', () => {
    const sampleActions = [{ id: 'pinboard', icon: 'wpp-icon-pinned', label: 'Pinboard' }];
    it('should only render the actions-menu with the "upload" action when actions is empty', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const trigger = page.root?.shadowRoot?.querySelector('[data-testid="actions-menu-trigger-button"]');
      const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu');
      const listItems = menuContext?.querySelectorAll('wpp-list-item');
      expect(trigger).not.toBeNull();
      expect(menuContext).not.toBeNull();
      expect(listItems?.[0].querySelector('[slot="left"]')?.tagName.toLowerCase()).toMatch(/^wpp-icon-attach/);
      expect(listItems?.[0].querySelector('span[slot="label"]')?.textContent).toBe('Attach file');
    });
    it('should render the wpp-icon-plus trigger and one wpp-list-item per action', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      await page.waitForChanges();
      const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu');
      const trigger = menuContext?.querySelector('[data-testid="actions-menu-trigger-button"]');
      const iconPlus = trigger?.querySelector('wpp-icon-plus');
      const listItems = menuContext?.querySelectorAll('wpp-list-item');
      expect(menuContext).not.toBeNull();
      expect(trigger).not.toBeNull();
      expect(iconPlus).not.toBeNull();
      expect(listItems?.length).toBe(sampleActions.length + 1);
      expect(listItems?.[0].querySelector('[slot="left"]')?.tagName.toLowerCase()).toMatch(/^wpp-icon-attach/);
      expect(listItems?.[0].querySelector('span[slot="label"]')?.textContent).toBe('Attach file');
      expect(listItems?.[1].querySelector('[slot="left"]')?.tagName.toLowerCase()).toMatch(/^wpp-icon-pinned/);
    });
    it('should propagate the custom actionsMenuLabel from locales to the trigger aria-label', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      page.root.locales = { actionsMenuLabel: 'Custom plus label' };
      await page.waitForChanges();
      const trigger = page.root?.shadowRoot?.querySelector('[data-testid="actions-menu-trigger-button"]');
      expect(trigger?.ariaProps?.label).toBe('Custom plus label');
    });
    it('should emit wppActionsMenuToggle when the menu-context dropdownConfig opens/closes', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      await page.waitForChanges();
      const toggleSpy = jest.fn();
      page.root?.addEventListener('wppActionsMenuToggle', e => toggleSpy(e.detail));
      const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu');
      menuContext?.dropdownConfig?.onShow?.();
      expect(toggleSpy).toHaveBeenCalledWith({ open: true });
      menuContext?.dropdownConfig?.onHide?.();
      expect(toggleSpy).toHaveBeenCalledWith({ open: false });
    });
    it('should emit wppActionsMenuItemClick with the action when an item is clicked', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      await page.waitForChanges();
      const itemClickSpy = jest.fn();
      page.root?.addEventListener('wppActionsMenuItemClick', e => itemClickSpy(e.detail));
      // Dispatch the real wppChangeListItem event from the rendered list-item so
      // we exercise the JSX onWppChangeListItem binding rather than the private
      // handler in isolation.
      const items = page.root?.shadowRoot?.querySelectorAll('wpp-menu-context.actions-menu wpp-list-item');
      items?.[1].dispatchEvent(new CustomEvent('wppChangeListItem', { detail: sampleActions[0] }));
      await page.waitForChanges();
      expect(itemClickSpy).toHaveBeenCalledWith(sampleActions[0]);
    });
    it('should not emit wppActionsMenuItemClick for an action whose `disabled` flag is true', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const disabledActions = [{ id: 'pinboard', icon: 'wpp-icon-pinned', label: 'Pinboard', disabled: true }];
      page.root.actions = disabledActions;
      await page.waitForChanges();
      const itemClickSpy = jest.fn();
      page.root?.addEventListener('wppActionsMenuItemClick', e => itemClickSpy(e.detail));
      const item = page.root?.shadowRoot?.querySelectorAll('wpp-menu-context.actions-menu wpp-list-item')[1];
      item?.dispatchEvent(new CustomEvent('wppChangeListItem', { detail: disabledActions[0] }));
      await page.waitForChanges();
      expect(itemClickSpy).not.toHaveBeenCalled();
    });
    it('should auto-trigger the file picker when the reserved upload action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      await page.waitForChanges();
      const fileInput = page.root?.shadowRoot?.querySelector('input.file-loader');
      const clickSpy = jest.fn();
      fileInput.click = clickSpy;
      const uploadItem = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu wpp-list-item[data-testid="actions-menu-item-upload"]');
      uploadItem?.dispatchEvent(new CustomEvent('wppChangeListItem', { detail: sampleActions[0] }));
      await page.waitForChanges();
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isFileDialogOpen).toBe(true);
    });
    it('should not open the file picker for the reserved upload action when disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input disabled="true"></wpp-chat-input>`,
      });
      page.root.actions = sampleActions;
      await page.waitForChanges();
      const fileInput = page.root?.shadowRoot?.querySelector('input.file-loader');
      const clickSpy = jest.fn();
      if (fileInput)
        fileInput.click = clickSpy;
      const itemClickSpy = jest.fn();
      page.root?.addEventListener('wppActionsMenuItemClick', e => itemClickSpy(e.detail));
      const uploadItem = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu wpp-list-item[data-testid="actions-menu-item-upload"]');
      uploadItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(clickSpy).not.toHaveBeenCalled();
      // The event still emits so consumers can handle disabled-state UX themselves
      expect(itemClickSpy).not.toHaveBeenCalledWith();
    });
  });
  describe('references slot', () => {
    it('reveals the references wrapper when references are slotted', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input><wpp-chat-reference slot="references" name="creative-brief.pdf"></wpp-chat-reference></wpp-chat-input>`,
      });
      page.rootInstance.updateSlotData();
      await page.waitForChanges();
      expect(page.rootInstance.hasReferencesSlot).toBe(true);
      const referencesWrapper = page.root?.shadowRoot?.querySelector('.references');
      expect(referencesWrapper).not.toBeNull();
      expect(referencesWrapper?.hasAttribute('hidden')).toBe(false);
    });
    it('keeps the references wrapper hidden when nothing is slotted', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.rootInstance.updateSlotData();
      await page.waitForChanges();
      expect(page.rootInstance.hasReferencesSlot).toBe(false);
      expect(page.root?.shadowRoot?.querySelector('.references')?.hasAttribute('hidden')).toBe(true);
    });
    it('does not dismiss the alert when a reference emits its close event', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const referenceEl = document.createElement('div');
      referenceEl.setAttribute('slot', 'references');
      page.rootInstance.handleAlertClose({ target: referenceEl });
      expect(page.rootInstance.isAlertDismissed).toBe(false);
    });
    it('dismisses the alert when the alert emits its close event', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const alertEl = document.createElement('div');
      alertEl.setAttribute('slot', 'alert');
      page.rootInstance.handleAlertClose({ target: alertEl });
      expect(page.rootInstance.isAlertDismissed).toBe(true);
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
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('loading animation', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should register the loading animation angle when it connects (connectedCallback)', async () => {
      const registerSpy = jest.spyOn(loadingHalo, 'registerLoadingHaloAngle');
      await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      expect(registerSpy).toHaveBeenCalled();
    });
    it('should add the is-loading class to the container only while generating', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const getContainer = () => page.root?.shadowRoot?.querySelector('.chat-input-container');
      expect(getContainer()?.classList.contains('is-loading')).toBe(false);
      page.root.isGenerating = true;
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('is-loading')).toBe(true);
    });
    it('should keep the is-focused class alongside is-loading while generating, so focus stays visible (WCAG 2.4.7)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const getContainer = () => page.root?.shadowRoot?.querySelector('.chat-input-container');
      page.rootInstance.isFocused = true;
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('is-focused')).toBe(true);
      page.root.isGenerating = true;
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('is-loading')).toBe(true);
      expect(getContainer()?.classList.contains('is-focused')).toBe(true);
      page.root.isGenerating = false;
      await page.waitForChanges();
      expect(getContainer()?.classList.contains('is-loading')).toBe(false);
      expect(getContainer()?.classList.contains('is-focused')).toBe(true);
    });
  });
  describe('Testing Speech Recognition', () => {
    it('Testing speech recognition setup wiring', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const setupRecognitionSpy = jest.spyOn(page.rootInstance.recognition, 'setupRecognition');
      page.rootInstance.componentDidLoad();
      expect(setupRecognitionSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing speech recognition stop wiring', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
      page.rootInstance.isAudioRecording = true;
      page.rootInstance.internalValue = 'Hello, World!';
      page.rootInstance.handleSend();
      expect(mockRecognition.stop).toHaveBeenCalled();
      expect(mockRecognition.onresult).toBe(null);
    });
    it('Testing that speech recognition stops when component disconnects', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
      page.root?.remove();
      expect(mockRecognition.stop).toHaveBeenCalledTimes(1);
    });
    it('Testing that isAudioRecording is set to false when SpeechRecognition throws error or ends', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      Reflect.set(page.rootInstance.recognition, 'recognition', mockRecognition);
      const wppMicSpy = jest.fn();
      page.rootInstance.wppMic = { emit: wppMicSpy };
      page.rootInstance.isAudioRecording = true;
      jest.spyOn(page.rootInstance.recognition, 'isSupported', 'get').mockReturnValue(true);
      page.rootInstance.handleClickAudioRecording(createMouseEvent());
      mockRecognition.onerror?.({ error: 'not-allowed' });
      expect(page.rootInstance.isAudioRecording).toBeFalsy();
      expect(wppMicSpy).toHaveBeenLastCalledWith({ isRecording: false });
      page.rootInstance.isAudioRecording = true;
      page.rootInstance.handleClickAudioRecording(createMouseEvent());
      mockRecognition.onend?.();
      expect(page.rootInstance.isAudioRecording).toBeFalsy();
      expect(wppMicSpy).toHaveBeenLastCalledWith({ isRecording: false });
    });
  });
  describe('AI model selector', () => {
    const customModels = [
      { id: 'gpt-x', label: 'GPT-X', logo: 'https://example.com/gpt-x.svg' },
      { id: 'claude', label: 'Claude', logo: 'https://example.com/claude.svg' },
    ];
    describe('getSelectedModel', () => {
      it('returns the default "Auto" option when selectedModel is "auto"', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        const selected = page.rootInstance.getSelectedModel();
        expect(selected).toMatchObject({ id: 'auto', label: 'Auto' });
      });
      it('returns the default "Premium" option when selectedModel is "premium"', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input selected-model="premium"></wpp-chat-input>`,
        });
        const selected = page.rootInstance.getSelectedModel();
        expect(selected).toMatchObject({ id: 'premium', label: 'Premium' });
      });
      it('returns the raw selectedModel object when models list is empty', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.rootInstance.selectedModel = customModels[0];
        expect(page.rootInstance.getSelectedModel()).toBe(customModels[0]);
      });
      it('finds the selected model within a non-empty models list by id', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.rootInstance.models = customModels;
        page.rootInstance.selectedModel = { id: 'claude' };
        expect(page.rootInstance.getSelectedModel()).toBe(customModels[1]);
      });
      it('returns the `auto` model when the selected model id is not present in the models list', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.rootInstance.models = customModels;
        page.rootInstance.selectedModel = { id: 'missing' };
        expect(page.rootInstance.getSelectedModel()).toMatchObject({ id: 'auto', label: 'Auto' });
      });
    });
    describe('menu open state', () => {
      it('handleModelMenuShow sets isModelMenuOpen to true', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.rootInstance.handleModelMenuShow();
        expect(page.rootInstance.isModelMenuOpen).toBe(true);
      });
      it('handleModelMenuHide sets isModelMenuOpen to false', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.rootInstance.isModelMenuOpen = true;
        page.rootInstance.handleModelMenuHide();
        expect(page.rootInstance.isModelMenuOpen).toBe(false);
      });
    });
    describe('handleModelSelect', () => {
      it('normalises the default "auto" option to the "auto" keyword and emits the model object', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input selected-model="premium"></wpp-chat-input>`,
        });
        const changeModelSpy = jest.fn();
        page.rootInstance.wppModelSelect = { emit: changeModelSpy };
        const autoModel = { id: 'auto', label: 'Auto', caption: '', logo: '' };
        page.rootInstance.handleModelSelect(autoModel);
        expect(page.rootInstance.selectedModel).toBe('auto');
        expect(changeModelSpy).toHaveBeenCalledWith(autoModel);
      });
      it('normalises the default "premium" option to the "premium" keyword and emits the model object', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        const changeModelSpy = jest.fn();
        page.rootInstance.wppModelSelect = { emit: changeModelSpy };
        const premiumModel = { id: 'premium', label: 'Premium', caption: '', logo: '' };
        page.rootInstance.handleModelSelect(premiumModel);
        expect(page.rootInstance.selectedModel).toBe('premium');
        expect(changeModelSpy).toHaveBeenCalledWith(premiumModel);
      });
      it('stores the whole model object for a custom model and emits it', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        const changeModelSpy = jest.fn();
        page.rootInstance.wppModelSelect = { emit: changeModelSpy };
        page.rootInstance.handleModelSelect(customModels[0]);
        expect(page.rootInstance.selectedModel).toBe(customModels[0]);
        expect(changeModelSpy).toHaveBeenCalledWith(customModels[0]);
      });
    });
    describe('handleModelChange', () => {
      it('emits wppModelBrowse', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        const selectModelSpy = jest.fn();
        page.rootInstance.wppModelBrowse = { emit: selectModelSpy };
        page.rootInstance.handleModelChange();
        expect(selectModelSpy).toHaveBeenCalledTimes(1);
      });
    });
    // Rendering output (renderModelSelector / renderModelListItem) via snapshots.
    describe('rendering (snapshots)', () => {
      const getSelector = (page) => page.root?.shadowRoot?.querySelector('.select-model-trigger');
      const getDropdown = (page) => page.root?.shadowRoot?.querySelector('.wpp-model-dropdown');
      it('renders the model selector trigger and dropdown with the default options', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        // Paired with the snapshot: the model rows form a single-select group, which is what
        // makes `aria-checked` legal on them (WPPOPENDS-1593).
        const rows = getDropdown(page).querySelectorAll('wpp-list-item');
        expect(rows[0].getAttribute('role')).toBe('menuitemradio');
        expect(rows[0].getAttribute('aria-checked')).toBe('true');
        expect(rows[1].getAttribute('aria-checked')).toBe('false');
        expect(getSelector(page)).toMatchSnapshot('trigger');
        expect(getDropdown(page)).toMatchSnapshot('dropdown');
      });
      it('renders a "Select model or agent" list item when the models list is empty', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        const dropdown = getDropdown(page);
        const listItems = dropdown?.querySelectorAll('wpp-list-item');
        // Two default options + the "Select model or agent" fallback item.
        expect(listItems?.[listItems.length - 1].querySelector('span[slot="label"]')?.textContent).toBe('Select model or agent');
        expect(dropdown).toMatchSnapshot();
      });
      it('renders one list item per custom model when the models list is provided', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        page.root.models = customModels;
        await page.waitForChanges();
        const rows = Array.from(getDropdown(page).querySelectorAll('wpp-list-item'));
        expect(rows).toHaveLength(2 + customModels.length);
        expect(rows.every(row => row.getAttribute('role') === 'menuitemradio')).toBe(true);
        expect(getDropdown(page)).toMatchSnapshot();
      });
      it('renders only the avatar (no label) in the trigger for size "s"', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input size="s"></wpp-chat-input>`,
        });
        page.rootInstance.isChatInputExpanded = false;
        await page.waitForChanges();
        // The "s" trigger is avatar-only, so it carries no label — and therefore never shows a
        // reasoning level either (WPPOPENDS-1593).
        expect(getSelector(page)?.querySelector('span[slot="label"]')).toBeNull();
        expect(getSelector(page)).toMatchSnapshot();
      });
    });
    describe('reasoning and verbosity options (WPPOPENDS-1593)', () => {
      const REASONING_OPTIONS = [
        { id: 'none', label: 'None' },
        { id: 'medium', label: 'Medium', caption: 'Balanced with moderate reasoning' },
        { id: 'high', label: 'High', caption: 'Thorough with deep reasoning' },
      ];
      const VERBOSITY_OPTIONS = [
        { id: 'low', label: 'Low', caption: 'Concise and direct' },
        { id: 'high', label: 'High', caption: 'Comprehensive and detailed' },
      ];
      const GPT_MODEL = {
        id: 'gpt',
        label: 'GPT 5.4 Mini',
        logo: 'gpt.svg',
        reasoningOptions: REASONING_OPTIONS,
        verbosityOptions: VERBOSITY_OPTIONS,
      };
      const GEMINI_MODEL = {
        id: 'gemini',
        label: 'Gemini 3.5 Flash',
        logo: 'gemini.svg',
        reasoningOptions: REASONING_OPTIONS,
      };
      const getDropdown = (page) => page.root?.shadowRoot?.querySelector('.wpp-model-dropdown');
      const getTriggerLabel = (page) => page.root?.shadowRoot?.querySelector('.select-model-trigger > span[slot="label"]');
      /** The trigger label's text with runs of whitespace collapsed, which is what a user reads. */
      const getTriggerLabelText = (page) => getTriggerLabel(page)?.textContent?.replace(/\s+/g, ' ').trim();
      /** The submenu whose trigger row carries `label`, or null when no such row is rendered. */
      const getSubmenu = (page, label) => Array.from(getDropdown(page)?.querySelectorAll('wpp-menu-context') || []).find(menu => menu.querySelector('[slot="trigger-element"] span[slot="label"]')?.textContent === label) || null;
      /** Direct `wpp-list-item` children of the dropdown — mock-doc has no `:scope` support. */
      const getModelRow = (page, label) => Array.from(getDropdown(page)?.children || []).find(child => child.tagName.toLowerCase() === 'wpp-list-item' &&
        child.querySelector('span[slot="label"]')?.textContent === label) || null;
      const getOptionRows = (page, label) => Array.from(getSubmenu(page, label)?.querySelectorAll('.wpp-model-options-dropdown > wpp-list-item') || []);
      /**
       * Mounts with the model ALREADY selected. That matters: once a model is selected the
       * component owns the levels for it (remembering the user's choice, else applying the
       * defaults), so assigning `selectedModel` after mount would re-derive them and discard any
       * level passed here. Passing both up front is how a consumer seeds an initial selection.
       */
      const mountWithModel = async (model, extraProps = {}) => {
        const page = await newSpecPage({
          components: [WppChatInput],
          template: () => h("wpp-chat-input-v4-5-0", { selectedModel: model, ...extraProps }),
        });
        await page.waitForChanges();
        return page;
      };
      it('renders no option rows for the built-in "auto" and "premium" models', async () => {
        const page = await newSpecPage({ components: [WppChatInput], html: `<wpp-chat-input></wpp-chat-input>` });
        expect(getSubmenu(page, 'Reasoning')).toBeNull();
        expect(getSubmenu(page, 'Verbosity')).toBeNull();
        page.root.selectedModel = 'premium';
        await page.waitForChanges();
        expect(getSubmenu(page, 'Reasoning')).toBeNull();
        expect(getSubmenu(page, 'Verbosity')).toBeNull();
      });
      it('renders a Reasoning row but no Verbosity row for a model that supplies only reasoningOptions', async () => {
        const page = await mountWithModel(GEMINI_MODEL);
        expect(getSubmenu(page, 'Reasoning')).not.toBeNull();
        expect(getSubmenu(page, 'Verbosity')).toBeNull();
      });
      it('renders both rows for a model that supplies both option lists', async () => {
        const page = await mountWithModel(GPT_MODEL);
        expect(getSubmenu(page, 'Reasoning')).not.toBeNull();
        expect(getSubmenu(page, 'Verbosity')).not.toBeNull();
      });
      it('renders the option label and caption, and omits the caption element when none is supplied', async () => {
        const page = await mountWithModel(GPT_MODEL);
        const rows = getOptionRows(page, 'Reasoning');
        expect(rows.map(row => row.querySelector('span[slot="label"]')?.textContent)).toEqual([
          'None',
          'Medium',
          'High',
        ]);
        // `none` carries no caption, so it must render a single-line row.
        expect(rows[0].querySelector('span[slot="caption"]')).toBeNull();
        expect(rows[1].querySelector('span[slot="caption"]')?.textContent).toBe('Balanced with moderate reasoning');
      });
      it('renders the level rows one step smaller than the row that opens them', async () => {
        const page = await mountWithModel(GPT_MODEL);
        const triggerRow = getSubmenu(page, 'Reasoning')?.querySelector('[slot="trigger-element"]');
        // The submenu trigger keeps the dropdown's default body type; only the levels inside it
        // step down to `s-midi`.
        expect(triggerRow?.labelTypography).toBeUndefined();
        expect(getOptionRows(page, 'Reasoning').map(row => row.labelTypography?.type)).toEqual(['s-midi', 's-midi', 's-midi']);
      });
      it('exposes the option rows as a single-select group through role and aria-checked', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
        const rows = getOptionRows(page, 'Reasoning');
        expect(rows.map(row => row.getAttribute('role'))).toEqual(['menuitemradio', 'menuitemradio', 'menuitemradio']);
        expect(rows.map(row => row.getAttribute('aria-checked'))).toEqual(['false', 'false', 'true']);
      });
      it('checks nothing when the selected id matches no option', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'does-not-exist' });
        expect(getOptionRows(page, 'Reasoning').map(row => row.getAttribute('aria-checked'))).toEqual([
          'false',
          'false',
          'false',
        ]);
        // An id that matches nothing must not put a dangling separator in the trigger.
        expect(getTriggerLabelText(page)).toBe('GPT 5.4 Mini');
      });
      it('renders the selected custom model as a checked row when the models list is empty', async () => {
        const page = await mountWithModel(GPT_MODEL);
        const rowLabels = Array.from(getDropdown(page).children)
          .map(child => child.querySelector('span[slot="label"]')?.textContent)
          .filter(Boolean);
        expect(rowLabels).toEqual([
          'Auto',
          'Premium',
          'GPT 5.4 Mini',
          'Reasoning',
          'Verbosity',
          'Select model or agent',
        ]);
        const modelRow = getModelRow(page, 'GPT 5.4 Mini');
        expect(modelRow?.getAttribute('role')).toBe('menuitemradio');
        expect(modelRow?.getAttribute('aria-checked')).toBe('true');
      });
      it('appends the selected reasoning level to the trigger label and drops it when nothing is selected', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
        // Taken verbatim from the Figma text node (102312:26471): "<model>\u30FB<level>", one
        // colour, U+30FB KATAKANA MIDDLE DOT and NO surrounding spaces — the glyph's own side
        // bearings produce the visual gap. Asserted on the raw text, not the normalised one, so a
        // stray space would fail here.
        expect(getTriggerLabel(page)?.textContent).toBe('GPT 5.4 Mini\u30FBHigh');
        page.root.selectedReasoning = undefined;
        await page.waitForChanges();
        expect(getTriggerLabelText(page)).toBe('GPT 5.4 Mini');
      });
      it('emits wppReasoningSelect with the resulting state and updates selectedReasoning', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedVerbosity: 'low' });
        const spy = jest.fn();
        page.root.addEventListener('wppReasoningSelect', spy);
        getOptionRows(page, 'Reasoning')[2].dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('high');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0].detail).toEqual({
          model: GPT_MODEL,
          reasoning: REASONING_OPTIONS[2],
          verbosity: VERBOSITY_OPTIONS[0],
        });
        expect(getOptionRows(page, 'Reasoning').map(row => row.getAttribute('aria-checked'))).toEqual([
          'false',
          'false',
          'true',
        ]);
      });
      it('stays silent when the level already in force is picked again', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high', selectedVerbosity: 'low' });
        const reasoningSpy = jest.fn();
        const verbositySpy = jest.fn();
        page.root.addEventListener('wppReasoningSelect', reasoningSpy);
        page.root.addEventListener('wppVerbositySelect', verbositySpy);
        getOptionRows(page, 'Reasoning')[2].dispatchEvent(new CustomEvent('wppChangeListItem'));
        getOptionRows(page, 'Verbosity')[0].dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(reasoningSpy).not.toHaveBeenCalled();
        expect(verbositySpy).not.toHaveBeenCalled();
        expect(page.root.selectedReasoning).toBe('high');
        expect(page.root.selectedVerbosity).toBe('low');
      });
      it('emits wppVerbositySelect without disturbing the reasoning selection', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
        const spy = jest.fn();
        page.root.addEventListener('wppVerbositySelect', spy);
        getOptionRows(page, 'Verbosity')[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedVerbosity).toBe('high');
        expect(page.root.selectedReasoning).toBe('high');
        expect(spy.mock.calls[0][0].detail).toEqual({
          model: GPT_MODEL,
          reasoning: REASONING_OPTIONS[2],
          verbosity: VERBOSITY_OPTIONS[1],
        });
      });
      it('remembers the levels per model and restores them when the user comes back', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high', selectedVerbosity: 'low' });
        page.root.models = [GPT_MODEL, GEMINI_MODEL];
        await page.waitForChanges();
        // Away to Gemini: GPT's pair is remembered, Gemini takes its own defaults.
        getModelRow(page, 'Gemini 3.5 Flash').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('medium');
        expect(page.root.selectedVerbosity).toBeUndefined();
        // Choose something different on Gemini, then go back to GPT.
        getOptionRows(page, 'Reasoning')[0].dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('none');
        getModelRow(page, 'GPT 5.4 Mini').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('high');
        expect(page.root.selectedVerbosity).toBe('low');
        // And Gemini still holds what was chosen for it.
        getModelRow(page, 'Gemini 3.5 Flash').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('none');
      });
      it('defaults a first-time model to Auto, falling back to Medium, and Verbosity to Medium', async () => {
        // Offers `auto` for reasoning and `medium` for verbosity, so both documented defaults apply.
        const withAuto = {
          ...GPT_MODEL,
          reasoningOptions: [{ id: 'auto', label: 'Auto' }, ...REASONING_OPTIONS],
          verbosityOptions: [...VERBOSITY_OPTIONS, { id: 'medium', label: 'Medium' }],
        };
        const page = await mountWithModel(GEMINI_MODEL);
        // GEMINI_MODEL offers no `auto`, so reasoning falls back to `medium`; it has no verbosity
        // list at all, so verbosity stays unset rather than being guessed.
        expect(page.root.selectedReasoning).toBe('medium');
        expect(page.root.selectedVerbosity).toBeUndefined();
        page.root.selectedModel = withAuto;
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('auto');
        expect(page.root.selectedVerbosity).toBe('medium');
      });
      it('leaves a model that offers none of the default ids with nothing selected', async () => {
        const page = await mountWithModel({
          id: 'odd',
          label: 'Odd model',
          logo: 'odd.svg',
          reasoningOptions: [{ id: 'turbo', label: 'Turbo' }],
        });
        expect(page.root.selectedReasoning).toBeUndefined();
        expect(getOptionRows(page, 'Reasoning').map(row => row.getAttribute('aria-checked'))).toEqual(['false']);
      });
      it('emits the levels it applies on a model change, so a controlled consumer stays in step', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high', selectedVerbosity: 'low' });
        page.root.models = [GPT_MODEL, GEMINI_MODEL];
        await page.waitForChanges();
        const reasoningSpy = jest.fn();
        const verbositySpy = jest.fn();
        page.root.addEventListener('wppReasoningSelect', reasoningSpy);
        page.root.addEventListener('wppVerbositySelect', verbositySpy);
        getModelRow(page, 'Gemini 3.5 Flash').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        // Silently rewriting a controlled prop would be undone by the consumer's next render.
        expect(reasoningSpy.mock.calls[0][0].detail.reasoning).toEqual(REASONING_OPTIONS[1]);
        expect(verbositySpy.mock.calls[0][0].detail.verbosity).toBeNull();
      });
      it('does not emit for a level the model change left alone', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
        page.root.models = [GPT_MODEL, GEMINI_MODEL];
        await page.waitForChanges();
        const verbositySpy = jest.fn();
        page.root.addEventListener('wppVerbositySelect', verbositySpy);
        // GPT's verbosity was never chosen, so `medium` applies on mount and Gemini offers none —
        // it changes, so it emits. Going back to a model whose pair is unchanged must stay quiet.
        getModelRow(page, 'Gemini 3.5 Flash').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        verbositySpy.mockClear();
        getModelRow(page, 'Gemini 3.5 Flash').dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
        expect(verbositySpy).not.toHaveBeenCalled();
      });
      it('carries the model and both levels on wppSend, and omits the levels when the model has none', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high', selectedVerbosity: 'low' });
        const spy = jest.fn();
        page.root.addEventListener('wppSend', spy);
        page.rootInstance.internalValue = 'hello';
        await page.waitForChanges();
        page
          .root.shadowRoot.querySelector('[data-testid="send-icon-only-button"]')
          .dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        expect(spy.mock.calls[0][0].detail).toMatchObject({
          message: 'hello',
          model: GPT_MODEL,
          reasoning: REASONING_OPTIONS[2],
          verbosity: VERBOSITY_OPTIONS[0],
        });
        page.root.selectedModel = 'auto';
        page.rootInstance.internalValue = 'second';
        await page.waitForChanges();
        page
          .root.shadowRoot.querySelector('[data-testid="send-icon-only-button"]')
          .dispatchEvent(new MouseEvent('click'));
        await page.waitForChanges();
        const secondDetail = spy.mock.calls[1][0].detail;
        expect(Object.prototype.hasOwnProperty.call(secondDetail, 'reasoning')).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(secondDetail, 'verbosity')).toBe(false);
      });
      it('leaves aria-expanded and aria-haspopup on the trigger to wpp-menu-context', async () => {
        const page = await newSpecPage({ components: [WppChatInput], html: `<wpp-chat-input></wpp-chat-input>` });
        const trigger = page.root?.shadowRoot?.querySelector('.select-model-trigger');
        // The component used to declare both itself, which re-stamped a raw boolean over the
        // value wpp-menu-context writes and left aria-expanded="" while the menu was open.
        // menu-context is now the single writer, so nothing is rendered here.
        expect(trigger?.hasAttribute('aria-expanded')).toBe(false);
        expect(trigger?.hasAttribute('aria-haspopup')).toBe(false);
        expect(trigger?.getAttribute('aria-label')).toBe('Select AI model');
      });
      it('survives the transient null selectedModel React produces, and still remembers the model it left', async () => {
        const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
        page.root.models = [GPT_MODEL, GEMINI_MODEL];
        await page.waitForChanges();
        // React removes the `selectedModel` attribute when the value goes from a string preset to a
        // model object, and Stencil assigns that removal as null before the property lands. The
        // watch used to resolve it and throw "Cannot read properties of null (reading 'id')".
        page.root.selectedModel = null;
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('high');
        page.root.selectedModel = GEMINI_MODEL;
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('medium');
        // The null must not have been treated as the previous model, or GPT's levels would have
        // been remembered against it and lost.
        page.root.selectedModel = GPT_MODEL;
        await page.waitForChanges();
        expect(page.root.selectedReasoning).toBe('high');
      });
      it('renders the row labels from locales', async () => {
        const page = await mountWithModel(GPT_MODEL);
        page.root.locales = { modelReasoningLabel: 'Raisonnement', modelVerbosityLabel: 'Verbosite' };
        await page.waitForChanges();
        expect(getSubmenu(page, 'Raisonnement')).not.toBeNull();
        expect(getSubmenu(page, 'Verbosite')).not.toBeNull();
      });
    });
    describe('trigger disabled state and size behaviour', () => {
      const getSelector = (page) => page.root?.shadowRoot?.querySelector('.select-model-trigger');
      it('disables the model selector trigger when the component is disabled', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input disabled="true"></wpp-chat-input>`,
        });
        expect(getSelector(page)?.hasAttribute('disabled')).toBe(true);
      });
      it('does not disable the model selector trigger when the component is enabled', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input></wpp-chat-input>`,
        });
        expect(getSelector(page)?.hasAttribute('disabled')).toBe(false);
      });
      it('does not render the model selector for size "s" even when withSelect is true', async () => {
        const page = await newSpecPage({
          components: [WppChatInput],
          html: `<wpp-chat-input size="s" with-select="true"></wpp-chat-input>`,
        });
        page.rootInstance.isChatInputExpanded = false;
        await page.waitForChanges();
        expect(getSelector(page)).toBeNull();
      });
    });
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WppChatInput } from '../wpp-chat-input';
import * as themeUtils from '../../../../../utils/subscribe-to-theme';
import { h } from '@stencil/core';
import { MockSpeechRecognition } from './mocks';
describe('wpp-chat-input', () => {
  it('should render chat input with attachments enabled', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input enableAttach="true"></wpp-chat-input>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root).toHaveAttribute('enableAttach');
  });
  it('should apply custom file upload configuration', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input fileUploadConfig='{"maxFiles": 3, "size": 100, "acceptConfig": {"image/jpeg": [".jpg"], "image/png": [".png"]}}'></wpp-chat-input>`,
    });
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
    });
  });
  it('should stop audio recording when clicking send and isAudioRecording is true', async () => {
    const page = await newSpecPage({
      components: [WppChatInput],
      html: `<wpp-chat-input></wpp-chat-input>`,
    });
    const stopSpeechRecognitionSpy = jest.fn();
    page.rootInstance.stopSpeechRecognition = stopSpeechRecognitionSpy;
    page.rootInstance.isAudioRecording = true;
    page.rootInstance.textValue = 'Hello, World!';
    page.rootInstance.handleSend();
    expect(page.rootInstance.isAudioRecording).toBe(false);
    expect(stopSpeechRecognitionSpy).toHaveBeenCalledTimes(1);
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
    const actionButton = page.root?.shadowRoot?.querySelector('[data-testid="send-icon-only-button"]');
    expect(actionButton.disabled).not.toBe(true);
    expect(actionButton.ariaProps.label).toBe('Stop response');
    expect(actionButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
    actionButton.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(stopSpy).toHaveBeenCalledTimes(1);
    expect(sendSpy).not.toHaveBeenCalled();
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
  describe('Testing handleClickAudioRecording', () => {
    const createMouseEvent = () => ({
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Testing that `startSpeechRecognition` is called when isAudioRecording is false (initially)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const startSpeechRecognitionSpy = jest.fn();
      page.rootInstance.startSpeechRecognition = startSpeechRecognitionSpy;
      const mockRecognition = new MockSpeechRecognition();
      page.rootInstance.recognition = mockRecognition;
      expect(page.rootInstance.isAudioRecording).toBe(false);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(true);
      expect(startSpeechRecognitionSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing that `stopSpeechRecognition` is called when isAudioRecording is true (initially)', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const stopSpeechRecognitionSpy = jest.fn();
      page.rootInstance.stopSpeechRecognition = stopSpeechRecognitionSpy;
      page.rootInstance.isAudioRecording = true;
      const mockRecognition = new MockSpeechRecognition();
      page.rootInstance.recognition = mockRecognition;
      expect(page.rootInstance.isAudioRecording).toBe(true);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(false);
      expect(stopSpeechRecognitionSpy).toHaveBeenCalledTimes(1);
    });
    it('Testing that `isAudioRecording` does not change if recognition not defined', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const event = createMouseEvent();
      const stopSpeechRecognitionSpy = jest.fn();
      const startSpeechRecognitionSpy = jest.fn();
      page.rootInstance.startSpeechRecognition = startSpeechRecognitionSpy;
      page.rootInstance.stopSpeechRecognition = stopSpeechRecognitionSpy;
      expect(page.rootInstance.isAudioRecording).toBe(false);
      page.rootInstance.handleClickAudioRecording(event);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(page.rootInstance.isAudioRecording).toBe(false);
      expect(startSpeechRecognitionSpy).toHaveBeenCalledTimes(0);
      expect(stopSpeechRecognitionSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('Testing shouldDisplaySend', () => {
    it('Testing that it returns false when component is disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-2-0", { disabled: true }),
      });
      expect(page.rootInstance.shouldDisplaySend()).toBe(false);
    });
    it('Testing that it returns true when component is generating and not disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-2-0", { disabled: false, isGenerating: true }),
      });
      expect(page.rootInstance.shouldDisplaySend()).toBe(true);
    });
    it('Testing that it returns true when component is audio recording with a value and not disabled', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        template: () => h("wpp-chat-input-v4-2-0", { disabled: false }),
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
  describe('Testing Speech Recognition', () => {
    it('Testing startSpeechRecognition', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      page.rootInstance.recognition = mockRecognition;
      page.rootInstance.startSpeechRecognition();
      expect(mockRecognition.onresult).not.toBe(null);
      expect(mockRecognition.start).toHaveBeenCalled();
    });
    it('Testing stopSpeechRecognition', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      page.rootInstance.recognition = mockRecognition;
      page.rootInstance.stopSpeechRecognition();
      expect(mockRecognition.stop).toHaveBeenCalled();
      expect(mockRecognition.onresult).toBe(null);
    });
    it('Testing that stopSpeechRecognition is called when component disconnects', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockStop = jest.fn();
      page.rootInstance.stopSpeechRecognition = mockStop;
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
    it('Testing that isAudioRecording is set to false when SpeechRecognition throws error or ends', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const mockRecognition = new MockSpeechRecognition();
      page.rootInstance.recognition = mockRecognition;
      page.rootInstance.isAudioRecording = true;
      page.rootInstance.startSpeechRecognition();
      mockRecognition.onerror?.({ error: 'not-allowed' });
      expect(page.rootInstance.isAudioRecording).toBeFalsy();
      page.rootInstance.isAudioRecording = true;
      mockRecognition.onend?.();
      expect(page.rootInstance.isAudioRecording).toBeFalsy();
    });
  });
});

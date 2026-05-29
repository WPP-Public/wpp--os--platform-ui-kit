import { newSpecPage } from '@stencil/core/testing';
import { WppChatInput } from '../wpp-chat-input';
import * as themeUtils from '../../../../../utils/subscribe-to-theme';
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
  describe('actions menu (actions prop)', () => {
    const sampleActions = [
      { id: 'upload', icon: 'wpp-icon-attach', label: 'Upload file' },
      { id: 'pinboard', icon: 'wpp-icon-pinned', label: 'Pinboard' },
    ];
    it('should not render the actions-menu trigger when actions is empty', async () => {
      const page = await newSpecPage({
        components: [WppChatInput],
        html: `<wpp-chat-input></wpp-chat-input>`,
      });
      const trigger = page.root?.shadowRoot?.querySelector('[data-testid="actions-menu-trigger-button"]');
      const menuContext = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu');
      expect(trigger).toBeNull();
      expect(menuContext).toBeNull();
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
      expect(listItems?.length).toBe(sampleActions.length);
      expect(listItems?.[0].querySelector('[slot="left"]')?.tagName.toLowerCase()).toMatch(/^wpp-icon-attach/);
      expect(listItems?.[0].querySelector('span[slot="label"]')?.textContent).toBe('Upload file');
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
      items?.[1].dispatchEvent(new CustomEvent('wppChangeListItem', { detail: sampleActions[1] }));
      await page.waitForChanges();
      expect(itemClickSpy).toHaveBeenCalledWith(sampleActions[1]);
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
      const item = page.root?.shadowRoot?.querySelector('wpp-menu-context.actions-menu wpp-list-item');
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
      uploadItem?.dispatchEvent(new CustomEvent('wppChangeListItem', { detail: sampleActions[0] }));
      await page.waitForChanges();
      expect(clickSpy).not.toHaveBeenCalled();
      // The event still emits so consumers can handle disabled-state UX themselves
      expect(itemClickSpy).toHaveBeenCalledWith(sampleActions[0]);
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
});

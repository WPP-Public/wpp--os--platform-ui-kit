import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatConversation } from '../wpp-chat-conversation';
import { WppChatConversationMessage } from '../components/wpp-chat-conversation-message';
const messages = [
  { id: 'msg-1', role: 'user', content: 'Hello', status: 'complete' },
  { id: 'msg-2', role: 'assistant', content: 'Hi there', status: 'complete' },
];
describe('wpp-chat-conversation', () => {
  describe('legacy messages path', () => {
    it('renders data-driven messages', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", { messages: messages }),
      });
      await page.waitForChanges();
      const msgEls = page.root?.shadowRoot?.querySelectorAll('wpp-chat-conversation-message');
      expect(msgEls?.length).toBe(2);
    });
    it('slot is empty on legacy path (no regression)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", { messages: messages }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
    });
    it('auto-scrolls when messages change', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", { messages: messages }),
      });
      await page.waitForChanges();
      const scrollToMock = jest.fn();
      const instance = page.rootInstance;
      instance.conversationContainerRef = { scrollHeight: 500, scrollTo: scrollToMock };
      instance.handleMessagesChange();
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(scrollToMock).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' });
    });
  });
  describe('public scrollToBottom()', () => {
    it('scrolls the container on demand', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", null),
      });
      await page.waitForChanges();
      const scrollToMock = jest.fn();
      const instance = page.rootInstance;
      instance.conversationContainerRef = { scrollHeight: 800, scrollTo: scrollToMock };
      await instance.scrollToBottom();
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(scrollToMock).toHaveBeenCalledWith({ top: 800, behavior: 'smooth' });
    });
    it('does not throw when container ref is absent', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", null),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.conversationContainerRef = undefined;
      await expect(instance.scrollToBottom()).resolves.toBeUndefined();
    });
  });
  describe('slot composition', () => {
    it('renders slotted wpp-chat-conversation-message children', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        html: `
          <wpp-chat-conversation>
            <wpp-chat-conversation-message id="slotted-1" role="assistant" content="Hello" status="complete"></wpp-chat-conversation-message>
          </wpp-chat-conversation>
        `,
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
    });
    it('slot renders after data-driven messages when both present', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => (h("wpp-chat-conversation-v4-3-0", { messages: [messages[0]] }, h("wpp-chat-conversation-message-v4-3-0", { id: "slotted-1", role: "assistant", content: "Slotted", status: "complete" }))),
      });
      await page.waitForChanges();
      const dataMsgEls = page.root?.shadowRoot?.querySelectorAll('wpp-chat-conversation-message');
      expect(dataMsgEls?.length).toBe(1);
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
    });
    it('does not auto-scroll when slot content changes', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", null),
      });
      await page.waitForChanges();
      const scrollToMock = jest.fn();
      page.rootInstance.conversationContainerRef = { scrollHeight: 200, scrollTo: scrollToMock };
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(scrollToMock).not.toHaveBeenCalled();
    });
  });
  describe('getLastMessageElement', () => {
    it('resolves via legacy messages map (unchanged)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", { messages: messages }),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      const lastEl = instance.getLastMessageElement();
      expect(lastEl).not.toBeNull();
    });
  });
  describe('avatar rendering (shouldRenderAvatar)', () => {
    it('returns false for `false` and empty configs, true for non-empty configs', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", null),
      });
      const instance = page.rootInstance;
      instance.userAvatarConfig = false;
      instance.assistantAvatarConfig = {};
      expect(instance.shouldRenderAvatar('user')).toBe(false);
      expect(instance.shouldRenderAvatar('assistant')).toBe(false);
      instance.userAvatarConfig = { name: 'John' };
      instance.assistantAvatarConfig = { icon: 'wpp-icon-ai' };
      expect(instance.shouldRenderAvatar('user')).toBe(true);
      expect(instance.shouldRenderAvatar('assistant')).toBe(true);
    });
    it('flags both no-avatar classes on the input wrapper for the default empty config', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", null),
      });
      await page.waitForChanges();
      const inputWrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
      expect(inputWrapper?.classList.contains('no-user-avatar')).toBe(true);
      expect(inputWrapper?.classList.contains('no-assistant-avatar')).toBe(true);
    });
    it('drops the no-avatar class for the type whose avatar config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-3-0", { userAvatarConfig: { name: 'John' }, assistantAvatarConfig: false }),
      });
      await page.waitForChanges();
      const inputWrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
      expect(inputWrapper?.classList.contains('no-user-avatar')).toBe(false);
      expect(inputWrapper?.classList.contains('no-assistant-avatar')).toBe(true);
    });
  });
});

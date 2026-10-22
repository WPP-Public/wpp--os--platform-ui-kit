import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatConversation } from '../wpp-chat-conversation';
import { WppChatInput } from '../../wpp-chat/components/wpp-chat-input/wpp-chat-input';
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
        template: () => h("wpp-chat-conversation-v4-6-0", { messages: messages }),
      });
      await page.waitForChanges();
      const msgEls = page.root?.shadowRoot?.querySelectorAll('wpp-chat-conversation-message');
      expect(msgEls?.length).toBe(2);
    });
    it('slot is empty on legacy path (no regression)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-6-0", { messages: messages }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).not.toBeNull();
    });
    it('auto-scrolls when messages change', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-6-0", { messages: messages }),
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
        template: () => h("wpp-chat-conversation-v4-6-0", null),
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
        template: () => h("wpp-chat-conversation-v4-6-0", null),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.conversationContainerRef = undefined;
      await expect(instance.scrollToBottom()).resolves.toBeUndefined();
    });
  });
  describe('chat input event forwarding', () => {
    const GPT = { id: 'gpt', label: 'GPT 5.4 Mini', logo: 'gpt.svg' };
    const HIGH = { id: 'high', label: 'High' };
    it.each([
      ['wppModelSelect', GPT],
      ['wppModelBrowse', undefined],
      ['wppReasoningSelect', { model: GPT, reasoning: HIGH, verbosity: null }],
      ['wppVerbositySelect', { model: GPT, reasoning: null, verbosity: HIGH }],
    ])('re-emits %s from the chat input', async (name, detail) => {
      const page = await newSpecPage({
        components: [WppChatConversation],
        template: () => h("wpp-chat-conversation-v4-6-0", null),
      });
      await page.waitForChanges();
      const spy = jest.fn();
      page.root.addEventListener(name, spy);
      page.root.shadowRoot.querySelector('wpp-chat-input').dispatchEvent(new CustomEvent(name, { detail }));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual(detail ?? undefined);
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
        template: () => (h("wpp-chat-conversation-v4-6-0", { messages: [messages[0]] }, h("wpp-chat-conversation-message-v4-6-0", { id: "slotted-1", role: "assistant", content: "Slotted", status: "complete" }))),
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
        template: () => h("wpp-chat-conversation-v4-6-0", null),
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
        template: () => h("wpp-chat-conversation-v4-6-0", { messages: messages }),
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
        template: () => h("wpp-chat-conversation-v4-6-0", null),
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
        template: () => h("wpp-chat-conversation-v4-6-0", null),
      });
      await page.waitForChanges();
      const inputWrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
      expect(inputWrapper?.classList.contains('no-user-avatar')).toBe(true);
      expect(inputWrapper?.classList.contains('no-assistant-avatar')).toBe(true);
    });
    it('drops the no-avatar class for the type whose avatar config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversation, WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-v4-6-0", { userAvatarConfig: { name: 'John' }, assistantAvatarConfig: false }),
      });
      await page.waitForChanges();
      const inputWrapper = page.root?.shadowRoot?.querySelector('.input-wrapper');
      expect(inputWrapper?.classList.contains('no-user-avatar')).toBe(false);
      expect(inputWrapper?.classList.contains('no-assistant-avatar')).toBe(true);
    });
  });
});
describe('chatInputConfig.fileUploadConfig pass-through', () => {
  it('hands a wildcard acceptConfig down to the nested chat-input', async () => {
    const page = await newSpecPage({
      components: [WppChatConversation, WppChatInput],
      template: () => (h("wpp-chat-conversation-v4-6-0", { chatInputConfig: { fileUploadConfig: { acceptConfig: { 'image/*': [] } } } })),
    });
    // Versioned tags apply here, so the child is resolved by prefix rather than an exact tag.
    const chatInput = [...page.root.shadowRoot.querySelectorAll('*')].find(element => element.tagName.toLowerCase().startsWith('wpp-chat-input'));
    expect(chatInput).toBeDefined();
    const fileInput = chatInput.shadowRoot.querySelector('input[type="file"]');
    expect(fileInput?.getAttribute('accept')).toBe('image/*');
  });
});
describe('wpp-chat-conversation — footer action bridge (WPPOPENDS-1594)', () => {
  it('re-emits wppMessageActionClick from a message rendered via the messages prop', async () => {
    const page = await newSpecPage({
      components: [WppChatConversation, WppChatConversationMessage],
      template: () => h('wpp-chat-conversation', {
        messages: [{ id: 'm1', role: 'assistant', content: 'Bridge me', status: 'complete' }],
      }),
    });
    await page.waitForChanges();
    const emitted = [];
    page.root.addEventListener('wppMessageActionClick', (event) => emitted.push(event.detail));
    // The inner message's event is {bubbles:false, composed:false}, so without the bridge nothing
    // ever reaches the outer element — which is exactly what left Quote and Pin unreachable for
    // consumers on the declarative path.
    const message = page.root.shadowRoot.querySelector('wpp-chat-conversation-message');
    const quote = message.shadowRoot.querySelector('[part="action-toolbar"] wpp-action-button');
    quote.click();
    await page.waitForChanges();
    expect(emitted).toHaveLength(1);
    expect(emitted[0].action.id).toBe('quote');
    expect(emitted[0].content).toBe('Bridge me');
  });
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatConversationMessage } from '../wpp-chat-conversation-message';
describe('wpp-chat-conversation-message', () => {
  describe('hasTextContent guard', () => {
    it('renders markdown when content is present (complete)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hello world", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl.querySelector('.message-text')).not.toBeNull();
    });
    it('does not render markdown block when content is empty (slot-only message)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl?.querySelector('.message-text')).toBeNull();
    });
    it('does not render markdown block when content is whitespace only', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "   ", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl?.querySelector('.message-text')).toBeNull();
    });
  });
  describe('custom-content slot', () => {
    it('slot wrapper is always present in complete state', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hello", status: "complete" }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('.custom-content slot');
      expect(slot).toBeNull();
    });
    it('slot wrapper is not present in streaming state', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "", status: "streaming" }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('.custom-content slot');
      expect(slot).toBeNull();
    });
  });
  describe('streaming', () => {
    it('renderStreaming is shown when status is streaming', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "", status: "streaming" }),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.currentStatus = 'streaming';
      await page.waitForChanges();
      const streamingEl = page.root?.shadowRoot?.querySelector('.streaming-live');
      expect(streamingEl).not.toBeNull();
    });
  });
  describe('avatar rendering (shouldRenderAvatar)', () => {
    const setConfigs = (instance, user, assistant) => {
      instance.userAvatarConfig = user;
      instance.assistantAvatarConfig = assistant;
    };
    it('returns false for an explicit `false` config', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi" }),
      });
      setConfigs(page.rootInstance, false, false);
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(false);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(false);
    });
    it('returns false for an empty config object (the default)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi" }),
      });
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(false);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(false);
    });
    it('returns true for a non-empty config object', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi" }),
      });
      setConfigs(page.rootInstance, { name: 'John' }, { icon: 'wpp-icon-ai' });
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(true);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(true);
    });
    it('renders the assistant avatar wrapper when the assistant config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => (h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi", assistantAvatarConfig: { icon: 'wpp-icon-ai' } })),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar')).not.toBeNull();
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar wpp-avatar')).not.toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(false);
    });
    it('renders the user avatar wrapper when the user config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "user", content: "Hi", userAvatarConfig: { name: 'John' } }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.user-avatar')).not.toBeNull();
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.user-avatar wpp-avatar')).not.toBeNull();
      expect(container?.classList.contains('no-user-avatar')).toBe(false);
    });
    it('renders no avatar wrappers and flags both no-avatar classes for the default empty config', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi" }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper')).toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(true);
      expect(container?.classList.contains('no-user-avatar')).toBe(true);
    });
    it('renders no assistant avatar wrapper when the assistant config is `false`', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-3-0", { role: "assistant", content: "Hi", assistantAvatarConfig: false }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar')).toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(true);
    });
  });
});

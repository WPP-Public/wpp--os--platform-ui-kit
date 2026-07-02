import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatConversationMessage } from '../wpp-chat-conversation-message';
describe('wpp-chat-conversation-message', () => {
  describe('hasTextContent guard', () => {
    it('renders markdown when content is present (complete)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "Hello world", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl.querySelector('.message-text')).not.toBeNull();
    });
    it('does not render markdown block when content is empty (slot-only message)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl?.querySelector('.message-text')).toBeNull();
    });
    it('does not render markdown block when content is whitespace only', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "   ", status: "complete" }),
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
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "Hello", status: "complete" }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('.custom-content slot');
      expect(slot).toBeNull();
    });
    it('slot wrapper is not present in streaming state', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "", status: "streaming" }),
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
        template: () => h("wpp-chat-conversation-message-v4-2-0", { role: "assistant", content: "", status: "streaming" }),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.currentStatus = 'streaming';
      await page.waitForChanges();
      const streamingEl = page.root?.shadowRoot?.querySelector('.streaming-live');
      expect(streamingEl).not.toBeNull();
    });
  });
});

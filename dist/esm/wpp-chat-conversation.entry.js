import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-93f63aaa.js';

const wppChatConversationCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;min-height:0;padding:10px;border:var(--wpp-border-width-s) solid var(--wpp-border-color);border-radius:var(--wpp-border-radius-m)}.conversation-container{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow:hidden auto;scrollbar-gutter:stable both-edges;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:24px;padding:16px 0;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.conversation-container::-webkit-scrollbar{width:4px;height:4px}.conversation-container::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.conversation-container slot{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:24px;width:100%}.input-wrapper{margin:auto auto 0;width:100%;max-width:calc(80ch + 88px)}.input-wrapper.no-user-avatar,.input-wrapper.no-assistant-avatar{max-width:calc(80ch + 44px)}.input-wrapper.no-user-avatar.no-assistant-avatar{max-width:80ch}";

const WppChatConversation = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppSend = createEvent(this, "wppSend", 1);
    this.wppStop = createEvent(this, "wppStop", 1);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppMessageChanged = createEvent(this, "wppMessageChanged", 1);
    this.wppActionsMenuToggle = createEvent(this, "wppActionsMenuToggle", 1);
    this.wppActionsMenuItemClick = createEvent(this, "wppActionsMenuItemClick", 1);
    this.messageElementsMap = new Map();
    this.shouldRenderAvatar = (type) => {
      if (this.userAvatarConfig === false && type === 'user')
        return false;
      if (this.assistantAvatarConfig === false && type === 'assistant')
        return false;
      const config = type === 'user' ? this.userAvatarConfig : this.assistantAvatarConfig;
      return Object.keys(config).length > 0;
    };
    this.inputWrapperCssClasses = () => ({
      'input-wrapper': true,
      'no-assistant-avatar': !this.shouldRenderAvatar('assistant'),
      'no-user-avatar': !this.shouldRenderAvatar('user'),
    });
    this.messages = [];
    this.assistantAvatarConfig = {};
    this.userAvatarConfig = {};
    this.chatInputConfig = {};
  }
  /**
   * Appends a chunk of text to the last message.
   */
  async appendChunk(chunk) {
    const messageEl = this.getLastMessageElement();
    if (messageEl) {
      await messageEl.appendChunk(chunk);
      this.scrollContainerToBottom();
    }
  }
  /**
   * Completes the stream for the last message.
   */
  async completeStream() {
    const messageEl = this.getLastMessageElement();
    if (messageEl) {
      await messageEl.completeStream();
    }
  }
  /**
   * Sets the status of the last message.
   */
  async setStatus(status) {
    const messageEl = this.getLastMessageElement();
    if (messageEl) {
      await messageEl.setStatus(status);
    }
  }
  /**
   * Handles changes in the messages prop and scrolls to the bottom.
   */
  handleMessagesChange() {
    this.scrollContainerToBottom();
  }
  getLastMessageElement() {
    const lastMessage = this.messages[this.messages.length - 1];
    if (!lastMessage) {
      return null;
    }
    return this.messageElementsMap.get(lastMessage.id) || null;
  }
  /**
   * Scrolls the conversation to the bottom. Use this when composing messages via the slot — the component
   * does not auto-scroll on slot changes.
   */
  async scrollToBottom() {
    this.scrollContainerToBottom();
  }
  scrollContainerToBottom() {
    setTimeout(() => {
      if (!this.conversationContainerRef)
        return;
      this.conversationContainerRef.scrollTo({
        top: this.conversationContainerRef.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }
  render() {
    return (h(Host, null, h("div", { class: "conversation-container", ref: el => (this.conversationContainerRef = el) }, this.messages?.map(message => (h("wpp-chat-conversation-message-v4-3-0", { key: message.id, id: message.id, ref: el => {
        if (el)
          this.messageElementsMap.set(message.id, el);
      }, role: message.role, content: message.content, status: message.status, attachments: message.attachments, actionButtonsConfig: message.actionButtonsConfig, sourcesActionConfig: message.sourcesActionConfig, menuContextListItems: message.menuContextListItems, assistantAvatarConfig: this.assistantAvatarConfig, userAvatarConfig: this.userAvatarConfig }))), h("slot", null)), h("div", { class: this.inputWrapperCssClasses() }, h("wpp-chat-input-v4-3-0", { ...this.chatInputConfig, onWppSend: e => this.wppSend.emit(e.detail), onWppStop: () => this.wppStop.emit(), onWppChange: e => this.wppChange.emit(e.detail), onWppMessageChanged: e => this.wppMessageChanged.emit(e.detail), onWppActionsMenuToggle: e => this.wppActionsMenuToggle.emit(e.detail), onWppActionsMenuItemClick: e => this.wppActionsMenuItemClick.emit(e.detail) }))));
  }
  static get registryIs() { return "wpp-chat-conversation-v4-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "messages": ["handleMessagesChange"]
  }; }
};
WppChatConversation.style = wppChatConversationCss;

export { WppChatConversation as wpp_chat_conversation };

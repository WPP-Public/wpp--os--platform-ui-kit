'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const wppChatConversationCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;min-height:0;padding:10px;border:1px solid var(--wpp-border-color);border-radius:var(--wpp-border-radius-m);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.conversation-container{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow:hidden auto;scrollbar-gutter:stable both-edges;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:24px;padding:16px 0;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.conversation-container::-webkit-scrollbar{width:4px;height:4px}.conversation-container::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.input-wrapper{margin:auto auto 0;width:100%;max-width:calc(80ch + 128px)}.input-wrapper.no-user-avatar,.input-wrapper.no-assistant-avatar{max-width:calc(80ch + 64px)}.input-wrapper.no-user-avatar.no-assistant-avatar{max-width:80ch}";

const WppChatConversation = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppSend = index.createEvent(this, "wppSend", 1);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppMessageChanged = index.createEvent(this, "wppMessageChanged", 1);
    this.wppActionsMenuToggle = index.createEvent(this, "wppActionsMenuToggle", 1);
    this.wppActionsMenuItemClick = index.createEvent(this, "wppActionsMenuItemClick", 1);
    this.messageElementsMap = new Map();
    this.inputWrapperCssClasses = () => ({
      'input-wrapper': true,
      'no-assistant-avatar': !this.assistantAvatarConfig,
      'no-user-avatar': !this.userAvatarConfig,
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
      this.scrollToBottom();
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
    this.scrollToBottom();
  }
  getLastMessageElement() {
    const lastMessage = this.messages[this.messages.length - 1];
    if (!lastMessage) {
      return null;
    }
    return this.messageElementsMap.get(lastMessage.id) || null;
  }
  scrollToBottom() {
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
    return (index.h(index.Host, null, index.h("div", { class: "conversation-container", ref: el => (this.conversationContainerRef = el) }, this.messages?.map(message => (index.h("wpp-chat-conversation-message-v4-1-0", { key: message.id, id: message.id, ref: el => {
        if (el)
          this.messageElementsMap.set(message.id, el);
      }, role: message.role, content: message.content, status: message.status, attachments: message.attachments, actionButtonsConfig: message.actionButtonsConfig, sourcesActionConfig: message.sourcesActionConfig, menuContextListItems: message.menuContextListItems, assistantAvatarConfig: this.assistantAvatarConfig, userAvatarConfig: this.userAvatarConfig })))), index.h("div", { class: this.inputWrapperCssClasses() }, index.h("wpp-chat-input-v4-1-0", { ...this.chatInputConfig, onWppSend: e => this.wppSend.emit(e.detail), onWppChange: e => this.wppChange.emit(e.detail), onWppMessageChanged: e => this.wppMessageChanged.emit(e.detail), onWppActionsMenuToggle: e => this.wppActionsMenuToggle.emit(e.detail), onWppActionsMenuItemClick: e => this.wppActionsMenuItemClick.emit(e.detail) }))));
  }
  static get registryIs() { return "wpp-chat-conversation-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "messages": ["handleMessagesChange"]
  }; }
};
WppChatConversation.style = wppChatConversationCss;

exports.wpp_chat_conversation = WppChatConversation;

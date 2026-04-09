import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$F } from './wpp-action-button2.js';
import { d as defineCustomElement$E } from './wpp-avatar2.js';
import { d as defineCustomElement$D } from './wpp-chat-conversation-message2.js';
import { d as defineCustomElement$C } from './wpp-chat-input2.js';
import { d as defineCustomElement$B } from './wpp-checkbox2.js';
import { d as defineCustomElement$A } from './wpp-divider2.js';
import { d as defineCustomElement$z } from './wpp-file-upload-item2.js';
import { d as defineCustomElement$y } from './wpp-icon-attach2.js';
import { d as defineCustomElement$x } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$w } from './wpp-icon-copy2.js';
import { d as defineCustomElement$v } from './wpp-icon-cross2.js';
import { d as defineCustomElement$u } from './wpp-icon-dash2.js';
import { d as defineCustomElement$t } from './wpp-icon-database2.js';
import { d as defineCustomElement$s } from './wpp-icon-document2.js';
import { d as defineCustomElement$r } from './wpp-icon-download2.js';
import { d as defineCustomElement$q } from './wpp-icon-error2.js';
import { d as defineCustomElement$p } from './wpp-icon-file2.js';
import { d as defineCustomElement$o } from './wpp-icon-file-zip2.js';
import { d as defineCustomElement$n } from './wpp-icon-image2.js';
import { d as defineCustomElement$m } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$l } from './wpp-icon-mic-on2.js';
import { d as defineCustomElement$k } from './wpp-icon-more2.js';
import { d as defineCustomElement$j } from './wpp-icon-music2.js';
import { d as defineCustomElement$i } from './wpp-icon-pitch2.js';
import { d as defineCustomElement$h } from './wpp-icon-send2.js';
import { d as defineCustomElement$g } from './wpp-icon-spreadsheet2.js';
import { d as defineCustomElement$f } from './wpp-icon-success2.js';
import { d as defineCustomElement$e } from './wpp-icon-tick2.js';
import { d as defineCustomElement$d } from './wpp-icon-video-clip2.js';
import { d as defineCustomElement$c } from './wpp-icon-warning2.js';
import { d as defineCustomElement$b } from './wpp-inline-message2.js';
import { d as defineCustomElement$a } from './wpp-internal-label2.js';
import { d as defineCustomElement$9 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$8 } from './wpp-label2.js';
import { d as defineCustomElement$7 } from './wpp-list-item2.js';
import { d as defineCustomElement$6 } from './wpp-menu-context2.js';
import { d as defineCustomElement$5 } from './wpp-spinner2.js';
import { d as defineCustomElement$4 } from './wpp-toast2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppChatConversationCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;min-height:0;padding:10px;border:1px solid var(--wpp-border-color);border-radius:var(--wpp-border-radius-m);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.conversation-container{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow:hidden auto;scrollbar-gutter:stable both-edges;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;gap:24px;padding:16px 0;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.conversation-container::-webkit-scrollbar{width:4px;height:4px}.conversation-container::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.input-wrapper{margin:auto auto 0;width:100%;max-width:calc(80ch + 128px)}.input-wrapper.no-user-avatar,.input-wrapper.no-assistant-avatar{max-width:calc(80ch + 64px)}.input-wrapper.no-user-avatar.no-assistant-avatar{max-width:80ch}";

const WppChatConversation$1 = /*@__PURE__*/ proxyCustomElement(class WppChatConversation extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSend = createEvent(this, "wppSend", 1);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppMessageChanged = createEvent(this, "wppMessageChanged", 1);
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
    return (h(Host, null, h("div", { class: "conversation-container", ref: el => (this.conversationContainerRef = el) }, this.messages?.map(message => (h("wpp-chat-conversation-message-v3-6-0", { key: message.id, id: message.id, ref: el => {
        if (el)
          this.messageElementsMap.set(message.id, el);
      }, role: message.role, content: message.content, status: message.status, attachments: message.attachments, actionButtonsConfig: message.actionButtonsConfig, sourcesActionConfig: message.sourcesActionConfig, menuContextListItems: message.menuContextListItems, assistantAvatarConfig: this.assistantAvatarConfig, userAvatarConfig: this.userAvatarConfig })))), h("div", { class: this.inputWrapperCssClasses() }, h("wpp-chat-input-v3-6-0", { ...this.chatInputConfig, onWppSend: e => this.wppSend.emit(e.detail), onWppChange: e => this.wppChange.emit(e.detail), onWppMessageChanged: e => this.wppMessageChanged.emit(e.detail) }))));
  }
  static get registryIs() { return "wpp-chat-conversation-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "messages": ["handleMessagesChange"]
  }; }
  static get style() { return wppChatConversationCss; }
}, [1, "wpp-chat-conversation", "wpp-chat-conversation-v3-6-0", {
    "messages": [16],
    "assistantAvatarConfig": [4, "assistant-avatar-config"],
    "userAvatarConfig": [4, "user-avatar-config"],
    "chatInputConfig": [16],
    "appendChunk": [64],
    "completeStream": [64],
    "setStatus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-chat-conversation-v3-6-0", "wpp-action-button-v3-6-0", "wpp-avatar-v3-6-0", "wpp-chat-conversation-message-v3-6-0", "wpp-chat-input-v3-6-0", "wpp-checkbox-v3-6-0", "wpp-divider-v3-6-0", "wpp-file-upload-item-v3-6-0", "wpp-icon-attach-v3-6-0", "wpp-icon-chevron-v3-6-0", "wpp-icon-copy-v3-6-0", "wpp-icon-cross-v3-6-0", "wpp-icon-dash-v3-6-0", "wpp-icon-database-v3-6-0", "wpp-icon-document-v3-6-0", "wpp-icon-download-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-file-v3-6-0", "wpp-icon-file-zip-v3-6-0", "wpp-icon-image-v3-6-0", "wpp-icon-info-message-v3-6-0", "wpp-icon-mic-on-v3-6-0", "wpp-icon-more-v3-6-0", "wpp-icon-music-v3-6-0", "wpp-icon-pitch-v3-6-0", "wpp-icon-send-v3-6-0", "wpp-icon-spreadsheet-v3-6-0", "wpp-icon-success-v3-6-0", "wpp-icon-tick-v3-6-0", "wpp-icon-video-clip-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-inline-message-v3-6-0", "wpp-internal-label-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-label-v3-6-0", "wpp-list-item-v3-6-0", "wpp-menu-context-v3-6-0", "wpp-spinner-v3-6-0", "wpp-toast-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-chat-conversation-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppChatConversation$1);
      }
      break;
    case "wpp-action-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$F();
      }
      break;
    case "wpp-avatar-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$E();
      }
      break;
    case "wpp-chat-conversation-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$D();
      }
      break;
    case "wpp-chat-input-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$C();
      }
      break;
    case "wpp-checkbox-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$B();
      }
      break;
    case "wpp-divider-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$A();
      }
      break;
    case "wpp-file-upload-item-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$z();
      }
      break;
    case "wpp-icon-attach-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$y();
      }
      break;
    case "wpp-icon-chevron-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "wpp-icon-copy-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "wpp-icon-cross-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "wpp-icon-dash-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "wpp-icon-database-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "wpp-icon-document-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "wpp-icon-download-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-icon-file-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-icon-file-zip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-image-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-info-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-mic-on-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-more-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-music-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-pitch-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-send-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-spreadsheet-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-success-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-tick-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-video-clip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-inline-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-internal-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-list-item-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-menu-context-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-toast-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppChatConversation = WppChatConversation$1;
const defineCustomElement = defineCustomElement$1;

export { WppChatConversation, defineCustomElement };

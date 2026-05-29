import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-3463d13f.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-2f801cf6.js';
import './consts-744c144f.js';

const LOCALES_DEFAULTS = {
  attachAction: 'Attach file',
  actionsMenu: 'Open chat actions',
  messageInputLabel: 'Message',
  messageInput: 'Message...',
  sendMessage: 'Send message',
  stopResponse: 'Stop response',
  copyMessageAction: 'Copy',
  likeMessageAction: 'Like',
  dislikeMessageAction: 'Dislike',
  regenerateMessageAction: 'Regenerate',
};
const getDefaultMessageActions = (locales) => [
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyMessageAction },
  { id: 'like', icon: 'wpp-icon-thumbs-up', label: locales.likeMessageAction },
  { id: 'dislike', icon: 'wpp-icon-thumbs-down', label: locales.dislikeMessageAction },
  { id: 'regenerate', icon: 'wpp-icon-refresh', label: locales.regenerateMessageAction },
];

const wppChatNodeCss = ".sc-wpp-chat-node-h{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;width:100%;height:100%;min-width:280px;max-width:440px;min-height:280px;max-height:600px;-webkit-box-sizing:border-box;box-sizing:border-box}.wpp-size-s.sc-wpp-chat-node-h{min-height:64px;max-height:64px}.wpp-size-s.sc-wpp-chat-node-h .loading-node.sc-wpp-chat-node{padding:0;background:none;-webkit-animation:none;animation:none}.node-container.sc-wpp-chat-node{position:relative;-ms-flex:1 1 0px;flex:1 1 0;min-height:0;width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;border-radius:calc(var(--wpp-border-radius-l) + 2px);-webkit-box-sizing:border-box;box-sizing:border-box}.node-container.selected-node.sc-wpp-chat-node:not(.loading-node)::before{content:\"\";position:absolute;z-index:0;inset:-1px;pointer-events:none;border:1px solid var(--wpp-primary-color-500);border-radius:calc(var(--wpp-border-radius-l) + 1px)}.node-wrapper.sc-wpp-chat-node{position:relative;-ms-flex:1 1 0px;flex:1 1 0;min-height:0;border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:visible;z-index:1}.node-wrapper.sc-wpp-chat-node:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.node-header.sc-wpp-chat-node{padding:15px 16px;height:64px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:10px;-ms-flex:0 0 auto;flex:0 0 auto;min-width:0}.title-icon.sc-wpp-chat-node,.sc-wpp-chat-node-s>[slot=left-icon]{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex:0 0 auto;flex:0 0 auto;width:20px;height:20px;color:var(--wpp-grey-color-800)}.title-tooltip.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;overflow:hidden}.title-tooltip.sc-wpp-chat-node::part(anchor){width:100%;min-width:0}.node-title.sc-wpp-chat-node{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.node-body.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow-y:auto;padding:0 6px 0 16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:0;-webkit-box-sizing:border-box;box-sizing:border-box;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.node-body.sc-wpp-chat-node::-webkit-scrollbar-track{background:transparent}.node-body.sc-wpp-chat-node::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400);border-radius:2px}.chat-message.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:16px;width:100%;max-width:100%;padding:24px 0;-webkit-box-sizing:border-box;box-sizing:border-box}.chat-message.sc-wpp-chat-node .message-avatar.sc-wpp-chat-node{-ms-flex:0 0 32px;flex:0 0 32px;width:32px;height:32px}.chat-message-content.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;gap:12px;min-width:0;max-width:100%}.chat-message-user.sc-wpp-chat-node{-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:start;justify-content:flex-start}.chat-message-user.chat-message-no-avatar.sc-wpp-chat-node{-ms-flex-pack:end;justify-content:flex-end}.chat-message-user.sc-wpp-chat-node .chat-message-content.sc-wpp-chat-node{-ms-flex-align:end;align-items:flex-end;max-width:480px}.chat-message-assistant.sc-wpp-chat-node{-ms-flex-pack:start;justify-content:flex-start}.chat-message-assistant.sc-wpp-chat-node .chat-message-content.sc-wpp-chat-node{-ms-flex-align:start;align-items:flex-start}.chat-bubble.sc-wpp-chat-node{max-width:100%;padding:12px;border-radius:8px;-webkit-box-sizing:border-box;box-sizing:border-box;word-wrap:break-word}.chat-bubble.sc-wpp-chat-node .wpp-typography.sc-wpp-chat-node{display:initial}.chat-bubble-user.sc-wpp-chat-node{width:100%;background-color:var(--wpp-primary-color-100);border-radius:8px 0 8px 8px}.chat-bubble-assistant.sc-wpp-chat-node{padding:0;background-color:transparent;border-radius:0}.chat-attachments.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:start;align-items:flex-start;gap:8px;width:100%;overflow:auto hidden;scrollbar-width:none}.chat-attachments.sc-wpp-chat-node::-webkit-scrollbar{display:none}.chat-attachment.sc-wpp-chat-node{position:relative;display:-ms-flexbox;display:flex;-ms-flex:0 0 82px;flex:0 0 82px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:82px;height:80px;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid var(--wpp-grey-color-000);border-radius:4px;background:var(--wpp-grey-color-200);color:var(--wpp-grey-color-600)}.chat-attachment.sc-wpp-chat-node img.sc-wpp-chat-node{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.chat-attachment.is-broken.sc-wpp-chat-node img.sc-wpp-chat-node{display:none}.chat-attachment.is-broken.sc-wpp-chat-node .chat-attachment-broken-icon.sc-wpp-chat-node{display:-ms-flexbox;display:flex}.chat-attachment-video.sc-wpp-chat-node{background:var(--wpp-grey-color-1000)}.chat-attachment-fallback.sc-wpp-chat-node,.chat-attachment-broken-icon.sc-wpp-chat-node{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--wpp-grey-color-600)}.chat-attachment-fallback.sc-wpp-chat-node{display:-ms-flexbox;display:flex}.chat-attachment-broken-icon.sc-wpp-chat-node{display:none;position:absolute;inset:0;background:var(--wpp-grey-color-200)}.chat-attachment-play.sc-wpp-chat-node{position:absolute;top:50%;left:50%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:31px;height:31px;border-radius:50%;color:var(--wpp-grey-color-000);background:rgba(18, 22, 25, 0.6);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.chat-message-actions.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;gap:4px;width:100%}.chat-message-actions.sc-wpp-chat-node wpp-tooltip.sc-wpp-chat-node,.chat-message-actions.sc-wpp-chat-node wpp-action-button.sc-wpp-chat-node{-ms-flex:0 0 auto;flex:0 0 auto}.node-chat-bar.sc-wpp-chat-node{position:relative;z-index:3;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;padding:16px;gap:4px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex:0 0 auto;flex:0 0 auto}.node-chat-bar.sc-wpp-chat-node wpp-tooltip.sc-wpp-chat-node,.node-chat-bar.sc-wpp-chat-node wpp-menu-context.sc-wpp-chat-node,.node-chat-bar.sc-wpp-chat-node wpp-action-button.sc-wpp-chat-node{--wpp-mc-wrapper-width:fit-content;-ms-flex:0 0 auto;flex:0 0 auto}.node-chat-bar.sc-wpp-chat-node .chat-actions-menu-context.sc-wpp-chat-node{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;max-width:-webkit-fit-content;max-width:-moz-fit-content;max-width:fit-content}.chat-actions-menu-divider.sc-wpp-chat-node{display:block;margin:4px 0}.chat-input.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:var(--wpp-font-family);font-size:14px;font-weight:400;line-height:22px;color:var(--wpp-grey-color-1000)}.chat-input.sc-wpp-chat-node::-webkit-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::-moz-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node:-ms-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::-ms-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::placeholder{color:var(--wpp-grey-color-800)}@property --loading-angle{syntax:\"<angle>\";initial-value:0deg;inherits:false}@-webkit-keyframes loading-rotate{to{--loading-angle:360deg}}@keyframes loading-rotate{to{--loading-angle:360deg}}.loading-node.sc-wpp-chat-node{padding:2px;background:conic-gradient(from var(--loading-angle), var(--wpp-primary-color-500), var(--wpp-primary-color-100), var(--wpp-primary-color-500));-webkit-animation:loading-rotate 2s linear infinite;animation:loading-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px)}.sc-wpp-chat-node-s>[slot=handles]{position:absolute;inset:0;pointer-events:none;-ms-flex:none;flex:none}[data-wpp-theme=dark].sc-wpp-chat-node-h .node-wrapper.sc-wpp-chat-node{background-color:var(--wpp-grey-color-100)}";

const ACTIVE_STATE_TIMEOUT_MS = 3000;
const RESPONSE_WAIT_TIMEOUT_MS = 30000;
const WppChatNode = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppSend = createEvent(this, "wppSend", 7);
    this.wppStop = createEvent(this, "wppStop", 7);
    this.wppAttach = createEvent(this, "wppAttach", 7);
    this.wppActionClick = createEvent(this, "wppActionClick", 7);
    this.wppModelSelect = createEvent(this, "wppModelSelect", 7);
    this.wppMessageActionClick = createEvent(this, "wppMessageActionClick", 7);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this._locales = LOCALES_DEFAULTS;
    this.handleInput = (event) => {
      const target = event.target;
      this.activateNode();
      this.inputValue = target.value;
    };
    this.handleSend = () => {
      if (!this.inputValue.trim())
        return;
      this.activateNode();
      this.startWaitingForResponse();
      const message = {
        id: `msg-${Date.now()}`,
        content: this.inputValue.trim(),
        role: 'user',
      };
      this.messages = [...this.messages, message];
      this.wppSend.emit({ message: message.content });
      this.inputValue = '';
      this.scrollToBottom();
    };
    this.handleStop = () => {
      this.activateNode();
      this.clearWaitingForResponse();
      this.wppStop.emit();
    };
    this.handleKeyDown = (event) => {
      this.activateNode();
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleSend();
      }
    };
    this.handleAttach = () => {
      this.activateNode();
      this.wppAttach.emit();
    };
    this.handleActionClick = (action) => {
      this.activateNode();
      this.wppActionClick.emit(action);
    };
    this.handleModelSelect = (model) => {
      this.activateNode();
      this.activeModelId = model.id;
      this.wppModelSelect.emit(model);
    };
    this.handleMessageActionClick = (message, action) => {
      this.activateNode();
      this.wppMessageActionClick.emit({ message, action });
    };
    this.handleNodeInteraction = () => {
      this.activateNode();
    };
    this.handleWindowPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node) || !this.host.contains(target)) {
        this.clearActiveState();
      }
    };
    this.activateNode = () => {
      const hostElement = this.host;
      this.isActive = true;
      this.clearActiveStateTimer();
      this.activeStateTimer = setTimeout(() => {
        this.activeStateTimer = undefined;
        if (hostElement.isConnected) {
          this.isActive = false;
        }
      }, ACTIVE_STATE_TIMEOUT_MS);
      WppChatNode.unrefTimer(this.activeStateTimer);
    };
    this.clearActiveState = () => {
      this.clearActiveStateTimer();
      this.isActive = false;
    };
    this.clearActiveStateTimer = () => {
      if (this.activeStateTimer !== undefined) {
        clearTimeout(this.activeStateTimer);
        this.activeStateTimer = undefined;
      }
    };
    this.startWaitingForResponse = () => {
      const hostElement = this.host;
      this.isWaitingForResponse = true;
      this.clearResponseWaitTimer();
      this.responseWaitTimer = setTimeout(() => {
        this.responseWaitTimer = undefined;
        if (hostElement.isConnected) {
          this.isWaitingForResponse = false;
        }
      }, RESPONSE_WAIT_TIMEOUT_MS);
      WppChatNode.unrefTimer(this.responseWaitTimer);
    };
    this.clearWaitingForResponse = () => {
      this.clearResponseWaitTimer();
      this.isWaitingForResponse = false;
    };
    this.clearResponseWaitTimer = () => {
      if (this.responseWaitTimer !== undefined) {
        clearTimeout(this.responseWaitTimer);
        this.responseWaitTimer = undefined;
      }
    };
    this.handleAttachmentImageError = (event) => {
      const attachment = event.target.closest('.chat-attachment');
      attachment?.classList.add('is-broken');
    };
    this.nodeTitle = 'New canvas';
    this.titleIcon = undefined;
    this.isLoading = false;
    this.isSelected = false;
    this.size = 'm';
    this.userAvatarConfig = false;
    this.assistantAvatarConfig = { icon: 'wpp-icon-ai' };
    this.actions = [];
    this.models = [];
    this.messageActions = undefined;
    this.selectedModelId = undefined;
    this.locales = {};
    this.inputValue = '';
    this.messages = [];
    this.activeModelId = undefined;
    this.isActive = false;
    this.isWaitingForResponse = false;
    this.defaultMessageActions = [];
  }
  static unrefTimer(timer) {
    if (typeof timer === 'object' && timer !== null && 'unref' in timer) {
      const unref = timer.unref;
      if (typeof unref === 'function') {
        unref.call(timer);
      }
    }
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
    this.defaultMessageActions = getDefaultMessageActions(this._locales);
  }
  componentWillLoad() {
    this._locales = { ...LOCALES_DEFAULTS, ...this.locales };
    this.defaultMessageActions = getDefaultMessageActions(this._locales);
  }
  connectedCallback() {
    this.themeSubscription.start();
    window.addEventListener('pointerdown', this.handleWindowPointerDown, true);
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    window.removeEventListener('pointerdown', this.handleWindowPointerDown, true);
    this.clearActiveStateTimer();
    this.clearResponseWaitTimer();
  }
  /**
   * Programmatically add a message (user or assistant) to the chat body.
   */
  async addMessage(message) {
    this.messages = [...this.messages, message];
    if (message.role === 'assistant' && message.content.trim()) {
      this.clearWaitingForResponse();
    }
    this.scrollToBottom();
  }
  /**
   * Append text to the last assistant message (for streaming).
   */
  async appendChunk(chunk) {
    const last = this.messages[this.messages.length - 1];
    if (last && last.role === 'assistant') {
      if (chunk.trim()) {
        this.clearWaitingForResponse();
      }
      this.messages = [...this.messages.slice(0, -1), { ...last, content: last.content + chunk }];
      this.scrollToBottom();
    }
  }
  scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.bodyRef) {
        this.bodyRef.scrollTop = this.bodyRef.scrollHeight;
      }
    });
  }
  getSelectedModel() {
    if (this.models.length === 0)
      return undefined;
    const selectedId = this.selectedModelId || this.activeModelId;
    return this.models.find(model => model.id === selectedId) || this.models[0];
  }
  renderIcon(icon, slot) {
    if (!icon)
      return null;
    return h(transformToVersionedTag(icon), slot ? { slot } : {});
  }
  renderTitleIcon() {
    if (!this.titleIcon)
      return null;
    return h("span", { class: "title-icon" }, h(transformToVersionedTag(this.titleIcon)));
  }
  renderActionMenu() {
    const hasActions = this.actions.length > 0;
    const hasModels = this.models.length > 0;
    const selectedModel = this.getSelectedModel();
    if (!hasActions && !hasModels) {
      return (h("wpp-tooltip-v4-1-0", { text: this._locales.attachAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", ariaProps: { label: this._locales.attachAction }, onClick: this.handleAttach }, h("wpp-icon-plus-v4-1-0", { slot: "icon-start" }))));
    }
    return (h("wpp-menu-context-v4-1-0", { appendToListWrapper: true, class: "chat-actions-menu-context", style: { width: 'fit-content' } }, h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this._locales.actionsMenu } }, h("wpp-icon-plus-v4-1-0", { slot: "icon-start" })), h("div", { class: "chat-actions-menu" }, this.actions.map(action => (h("wpp-list-item-v4-1-0", { key: `${action.icon}-${action.label}`, onWppChangeListItem: () => this.handleActionClick(action) }, this.renderIcon(action.icon, 'left'), h("span", { slot: "label" }, action.label)))), hasActions && hasModels && h("wpp-divider-v4-1-0", { class: "chat-actions-menu-divider" }), hasModels && (h("wpp-menu-context-v4-1-0", { appendToListWrapper: true }, h("wpp-list-item-v4-1-0", { slot: "trigger-element", isExtended: true }, this.renderIcon(selectedModel?.icon || 'wpp-icon-ai', 'left'), h("span", { slot: "label" }, selectedModel?.label)), h("div", { class: "chat-models-menu" }, this.models.map(model => (h("wpp-list-item-v4-1-0", { key: model.id, checked: model.id === selectedModel?.id, onWppChangeListItem: () => this.handleModelSelect(model) }, this.renderIcon(model.icon || 'wpp-icon-ai', 'left'), h("span", { slot: "label" }, model.label))))))))));
  }
  renderChatBar(isLoadingActive) {
    const sendIcon = isLoadingActive ? 'wpp-icon-stop' : 'wpp-icon-send';
    const sendActionLabel = isLoadingActive ? this._locales.stopResponse : this._locales.sendMessage;
    return (h("div", { class: "node-chat-bar" }, this.renderActionMenu(), h("input", { class: "chat-input", type: "text", "aria-label": this._locales.messageInputLabel, placeholder: this._locales.messageInput, value: this.inputValue, onInput: this.handleInput, onKeyDown: this.handleKeyDown }), h("wpp-action-button-v4-1-0", { variant: "secondary", ariaProps: { label: sendActionLabel }, onClick: isLoadingActive ? this.handleStop : this.handleSend }, this.renderIcon(sendIcon, 'icon-start'))));
  }
  renderAvatar(config) {
    if (config === false)
      return null;
    return (h("wpp-avatar-v4-1-0", { class: "message-avatar", size: "s", variant: "circle", name: config.name || '', icon: config.icon, color: config.color }));
  }
  getAttachmentKind(attachment) {
    if (attachment.type.startsWith('image/'))
      return 'image';
    if (attachment.type.startsWith('video/'))
      return 'video';
    return 'file';
  }
  renderAttachmentFallback(kind) {
    const fallbackIcon = kind === 'video' ? 'wpp-icon-video-clip' : kind === 'image' ? 'wpp-icon-image' : 'wpp-icon-document';
    return h("span", { class: "chat-attachment-fallback" }, this.renderIcon(fallbackIcon));
  }
  renderMessageAttachments(message) {
    const attachments = message.attachments ?? [];
    if (attachments.length === 0)
      return null;
    return (h("div", { class: "chat-attachments", role: "list" }, attachments.map((attachment, index) => {
      const kind = this.getAttachmentKind(attachment);
      const imageSource = attachment.thumbnailUrl || attachment.url;
      return (h("div", { class: `chat-attachment chat-attachment-${kind}`, role: "listitem", "aria-label": attachment.name, key: `${attachment.name}-${index}` }, imageSource ? (h("img", { src: imageSource, alt: attachment.alt || attachment.name, loading: "lazy", onError: this.handleAttachmentImageError })) : (this.renderAttachmentFallback(kind)), h("span", { class: "chat-attachment-broken-icon" }, this.renderAttachmentFallback(kind)), kind === 'video' && (h("span", { class: "chat-attachment-play", "aria-hidden": "true" }, this.renderIcon('wpp-icon-play-filled')))));
    })));
  }
  renderMessageActions(message) {
    if (message.role !== 'assistant')
      return null;
    const actions = message.actions ?? this.messageActions ?? this.defaultMessageActions;
    const hasRenderableContent = Boolean(message.content.trim() || message.attachments?.length);
    if (!hasRenderableContent || actions.length === 0)
      return null;
    return (h("div", { class: "chat-message-actions" }, actions.map(action => (h("wpp-tooltip-v4-1-0", { key: action.id, text: action.label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", ariaProps: { label: action.label }, onClick: () => this.handleMessageActionClick(message, action) }, this.renderIcon(action.icon, 'icon-start')))))));
  }
  renderMessages() {
    if (this.messages.length === 0)
      return null;
    return this.messages.map(msg => {
      const avatarConfig = msg.role === 'user' ? this.userAvatarConfig : this.assistantAvatarConfig;
      const hasContent = msg.content.length > 0;
      const hasAttachments = Boolean(msg.attachments?.length);
      if (!hasContent && !hasAttachments)
        return null;
      return (h("div", { class: {
          'chat-message': true,
          [`chat-message-${msg.role}`]: true,
          'chat-message-no-avatar': avatarConfig === false,
        }, key: msg.id }, this.renderAvatar(avatarConfig), h("div", { class: `chat-message-content chat-message-content-${msg.role}` }, hasContent && (h("div", { class: `chat-bubble chat-bubble-${msg.role}` }, h("wpp-typography-v4-1-0", { type: "s-body" }, msg.content))), this.renderMessageAttachments(msg), this.renderMessageActions(msg))));
    });
  }
  render() {
    const isSizeS = this.size === 's';
    const isLoadingActive = !isSizeS && (this.isLoading || this.isWaitingForResponse);
    const isSelectedActive = this.isSelected || this.isActive;
    const containerClasses = {
      'node-container': true,
      'loading-node': isLoadingActive,
      'selected-node': isSelectedActive,
    };
    const wrapperClasses = {
      'node-wrapper': true,
      'is-selected': isSelectedActive && !isLoadingActive,
    };
    if (isSizeS) {
      return (h(Host, { class: { 'wpp-chat-node': true, 'wpp-size-s': true }, onFocusin: this.handleNodeInteraction, onPointerDown: this.handleNodeInteraction }, h("div", { class: containerClasses }, h("div", { class: wrapperClasses }, this.renderChatBar(false))), h("slot", { name: "handles" })));
    }
    return (h(Host, { class: { 'wpp-chat-node': true, 'wpp-size-m': true }, onFocusin: this.handleNodeInteraction, onPointerDown: this.handleNodeInteraction }, h("div", { class: containerClasses }, h("div", { class: wrapperClasses }, h("div", { class: "node-header" }, h("slot", { name: "left-icon" }, this.renderTitleIcon()), h("wpp-tooltip-v4-1-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef || this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), h("wpp-divider-v4-1-0", null), h("div", { class: "node-body", ref: el => (this.bodyRef = el) }, this.renderMessages(), h("slot", null)), h("wpp-divider-v4-1-0", null), this.renderChatBar(isLoadingActive))), h("slot", { name: "handles" })));
  }
  static get registryIs() { return "wpp-chat-node-v4-1-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
};
WppChatNode.style = wppChatNodeCss;

export { WppChatNode as wpp_chat_node };

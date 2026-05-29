import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
import { getDefaultMessageActions, LOCALES_DEFAULTS } from './consts';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
const ACTIVE_STATE_TIMEOUT_MS = 3000;
const RESPONSE_WAIT_TIMEOUT_MS = 30000;
/**
 * Card-style node intended for use inside a React Flow canvas.
 * It renders a chat bar footer, an optional messages body,
 * and left/right handles positioned outside the card wrapper so they are never clipped.
 *
 * Selection is driven by an `isSelected` prop.
 * Loading shows an animated gradient border.
 * Resize is handled externally by React Flow's `<NodeResizer />`.
 *
 * @slot left-icon - Optional icon rendered before the node title in the header.
 * @slot - Default slot for the messages body (e.g. chat messages list).
 * @slot handles - Slot for React Flow `<Handle>` elements. Positioned outside the card so they are not clipped.
 */
export class WppChatNode {
  constructor() {
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
  static get is() { return "wpp-chat-node"; }
  static get registryIs() { return "wpp-chat-node-v4-1-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-node.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-node.css"]
    };
  }
  static get properties() {
    return {
      "nodeTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the title of the node, displayed in the header."
        },
        "attribute": "node-title",
        "reflect": false,
        "defaultValue": "'New canvas'"
      },
      "titleIcon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}` | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines an optional title icon rendered before the node title. Use `left-icon` slot for custom icon markup."
        },
        "attribute": "title-icon",
        "reflect": false
      },
      "isLoading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines whether the node is in a loading state. If true, the border animates."
        },
        "attribute": "is-loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "isSelected": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines whether the node is in the selected/active state. Shows a blue border."
        },
        "attribute": "is-selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WppChatNodeSize",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "WppChatNodeSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::WppChatNodeSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the chat node size. `'s'` renders the compact chat bar only."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "userAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAvatarConfig | false",
          "resolved": "ChatNodeAvatarConfig | boolean",
          "references": {
            "ChatNodeAvatarConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the user avatar configuration. Set to `false` to hide the user avatar."
        },
        "attribute": "user-avatar-config",
        "reflect": false,
        "defaultValue": "false"
      },
      "assistantAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAvatarConfig | false",
          "resolved": "ChatNodeAvatarConfig | boolean",
          "references": {
            "ChatNodeAvatarConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the assistant avatar configuration. Set to `false` to hide the assistant avatar."
        },
        "attribute": "assistant-avatar-config",
        "reflect": false,
        "defaultValue": "{ icon: 'wpp-icon-ai' }"
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAction[]",
          "resolved": "ChatNodeAction[]",
          "references": {
            "ChatNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the actions shown in the + menu."
        },
        "defaultValue": "[]"
      },
      "models": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeModel[]",
          "resolved": "ChatNodeModel[]",
          "references": {
            "ChatNodeModel": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeModel"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the available chat models shown in the nested + menu."
        },
        "defaultValue": "[]"
      },
      "messageActions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeMessageAction[]",
          "resolved": "ChatNodeMessageAction[] | undefined",
          "references": {
            "ChatNodeMessageAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessageAction"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines action buttons shown below assistant messages. If omitted, localized default actions are shown.\nSet to an empty array to hide them."
        }
      },
      "selectedModelId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the selected chat model id. If omitted, the first model is shown as selected."
        },
        "attribute": "selected-model-id",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatNodeLocales>",
          "resolved": "{ attachAction?: string | undefined; actionsMenu?: string | undefined; messageInputLabel?: string | undefined; messageInput?: string | undefined; sendMessage?: string | undefined; stopResponse?: string | undefined; copyMessageAction?: string | undefined; likeMessageAction?: string | undefined; dislikeMessageAction?: string | undefined; regenerateMessageAction?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatNodeLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the locales for the chat-node component."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "inputValue": {},
      "messages": {},
      "activeModelId": {},
      "isActive": {},
      "isWaitingForResponse": {},
      "defaultMessageActions": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSend",
        "name": "wppSend",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the send button or presses Enter."
        },
        "complexType": {
          "original": "{ message: string }",
          "resolved": "{ message: string; }",
          "references": {}
        }
      }, {
        "method": "wppStop",
        "name": "wppStop",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the stop button while the node is loading."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppAttach",
        "name": "wppAttach",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the + (attach) button."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppActionClick",
        "name": "wppActionClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an action from the + menu is selected."
        },
        "complexType": {
          "original": "ChatNodeAction",
          "resolved": "ChatNodeAction",
          "references": {
            "ChatNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAction"
            }
          }
        }
      }, {
        "method": "wppModelSelect",
        "name": "wppModelSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a chat model from the nested + menu is selected."
        },
        "complexType": {
          "original": "ChatNodeModel",
          "resolved": "ChatNodeModel",
          "references": {
            "ChatNodeModel": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeModel"
            }
          }
        }
      }, {
        "method": "wppMessageActionClick",
        "name": "wppMessageActionClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a message action button is clicked."
        },
        "complexType": {
          "original": "ChatNodeMessageActionClickDetail",
          "resolved": "ChatNodeMessageActionClickDetail",
          "references": {
            "ChatNodeMessageActionClickDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessageActionClickDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "addMessage": {
        "complexType": {
          "signature": "(message: ChatNodeMessage) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "ChatNodeMessage": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessage"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Programmatically add a message (user or assistant) to the chat body.",
          "tags": []
        }
      },
      "appendChunk": {
        "complexType": {
          "signature": "(chunk: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Append text to the last assistant message (for streaming).",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}

import { h, Host, Fragment } from '@stencil/core';
import { findSafeBoundary, getMarkdownTokens } from './utils';
import { transformToVersionedTag } from '../../../utils/utils';
import DOMPurify from 'dompurify';
import { renderToken } from './renderToken';
import { renderSlotsInListItem } from '../../wpp-autocomplete/utils';
import { LIB_COMPONENTS_PREFIX } from '../../../utils/const';
export class WppChatConversationMessage {
  constructor() {
    this._actionButtonConfig = [
      { icon: 'wpp-icon-thumbs-up' },
      { icon: 'wpp-icon-thumbs-down' },
      { icon: 'wpp-icon-refresh' },
      { icon: 'wpp-icon-copy' },
    ];
    // Streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.rafHandle = null;
    this.renderActionButton = (data) => {
      if (!data.icon)
        return null;
      return (h("wpp-action-button-v4-0-0", { variant: "secondary", ...data }, h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
    };
    this.renderMenuContextListItems = () => (h(Fragment, null, this.menuContextListItems.map(item => {
      const { label, slots, ...rest } = item;
      return (h("wpp-list-item-v4-0-0", { ...rest, id: item.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" }, h("span", { slot: "label" }, label), slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    })));
    this.hostCssClasses = () => ({
      'wpp-chat-conversation': true,
    });
    this.containerCssClasses = () => ({
      container: true,
      [`container-${this.role}`]: true,
      'no-user-avatar': !this.userAvatarConfig,
      'no-assistant-avatar': !this.assistantAvatarConfig,
    });
    this.contentCssClasses = () => ({
      content: true,
      [`content-${this.role}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      [`message-${this.role}`]: true,
      [`message-${this.currentStatus}`]: true,
    });
    this.committedTokens = [] // parsed + rendered blocks
    ;
    this.liveText = '' // current in-progress raw text
    ;
    this.currentStatus = 'complete';
    this.finalContent = '';
    this.role = 'user';
    this.content = '';
    this.status = 'complete';
    this.actionButtonsConfig = undefined;
    this.menuContextListItems = undefined;
    this.sourcesActionConfig = undefined;
    this.assistantAvatarConfig = {};
    this.userAvatarConfig = {};
    this.attachments = [];
  }
  async appendChunk(chunk) {
    this.accumulatedText += chunk;
    this.scheduleRefresh();
  }
  async completeStream() {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    const remaining = this.accumulatedText.slice(this.committedLength);
    if (remaining.trim()) {
      const tokens = getMarkdownTokens(remaining);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
    }
    this.finalContent = this.accumulatedText;
    this.currentStatus = 'complete';
    // Reset streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.committedTokens = [];
    this.liveText = '';
  }
  async setStatus(status) {
    if (status === 'streaming') {
      this.accumulatedText = '';
      this.committedLength = 0;
      this.committedTokens = [];
      this.liveText = '';
    }
    this.currentStatus = status;
  }
  onStatusChange(newValue) {
    if (newValue === 'complete' && this.currentStatus === 'streaming') {
      this.completeStream();
    }
    else {
      this.currentStatus = newValue;
    }
  }
  onContentChange(newValue) {
    this.finalContent = newValue;
  }
  componentWillLoad() {
    this.currentStatus = this.status;
    this.finalContent = this.content;
    if (this.actionButtonsConfig) {
      this._actionButtonConfig = this.actionButtonsConfig.map((button, ndx) => ({
        ...(this._actionButtonConfig[ndx] || {}),
        ...button,
        onClick: () => {
          button.onClick?.();
        },
      }));
    }
  }
  scheduleRefresh() {
    if (this.rafHandle !== null)
      return;
    this.rafHandle = requestAnimationFrame(() => {
      this.rafHandle = null;
      this.refreshDisplay();
    });
  }
  refreshDisplay() {
    const uncommitted = this.accumulatedText.slice(this.committedLength);
    const boundary = findSafeBoundary(uncommitted);
    if (boundary !== -1) {
      const toCommit = uncommitted.slice(0, boundary);
      const tokens = getMarkdownTokens(toCommit);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
      this.committedLength += boundary;
      this.liveText = uncommitted.slice(boundary);
      // Multiple blocks may have completed this frame
      this.refreshDisplay();
    }
    else {
      this.liveText = uncommitted;
    }
  }
  renderStreaming() {
    return (h("div", { class: "message-text" }, this.committedTokens.map((token) => renderToken(token, this.role)), h("span", { class: "streaming-live" }, DOMPurify.sanitize(this.liveText), h("span", { class: "cursor", "aria-hidden": "true" }))));
  }
  renderComplete() {
    const tokens = getMarkdownTokens(this.finalContent);
    if (!Array.isArray(tokens)) {
      return (h("wpp-typography-v4-0-0", { type: "s-body", tag: "p" }, DOMPurify.sanitize(this.finalContent)));
    }
    return h("div", { class: "message-text" }, tokens.map((token) => renderToken(token, this.role)));
  }
  renderAttachments() {
    const images = this.attachments?.filter(file => file.type?.startsWith('image/'));
    const otherFiles = this.attachments?.filter(file => !file.type?.startsWith('image/'));
    if ((!images || images.length === 0) && (!otherFiles || otherFiles.length === 0))
      return null;
    return (h("div", { class: "attachments" }, images.length > 0 && (h("div", { class: "chat-image-grid-row" }, images.map(image => (h("div", { class: "chat-image-grid-item chat-image-error-wrap" }, h("img", { src: image.url, alt: image.name, loading: "lazy", onError: (e) => {
        const wrap = e.target.closest('.chat-image-error-wrap');
        wrap?.classList.add('chat-image-broken');
        wrap?.setAttribute('data-error-message', 'Image unavailable');
      } })))))), otherFiles && otherFiles.length > 0 && (h("div", { class: "chat-file-attachments-column" }, otherFiles.map(file => (h("wpp-file-upload-item-v4-0-0", { file: {
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size || 0,
        deletable: false,
        ...file.fileItemProps,
      } })))))));
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("div", { class: this.containerCssClasses() }, this.assistantAvatarConfig && (h("div", { class: "avatar-wrapper" }, this.role === 'assistant' && (h("wpp-avatar-v4-0-0", { size: "s", icon: "wpp-icon-ai", role: "presentation", ...this.assistantAvatarConfig })))), h("div", { class: this.contentCssClasses() }, h("div", { class: this.messageCssClasses() }, this.currentStatus === 'streaming' && this.renderStreaming(), this.currentStatus === 'complete' && this.renderComplete(), this.currentStatus === 'complete' && this.attachments.length > 0 && this.renderAttachments()), this.role === 'assistant' && this.status === 'complete' && (h("div", { class: "actions" }, h("div", { class: "action-toolbar" }, this._actionButtonConfig.map(this.renderActionButton), this.menuContextListItems && (h("wpp-menu-context-v4-0-0", null, h("wpp-action-button-v4-0-0", { variant: "secondary", slot: "trigger-element" }, h("wpp-icon-more-v4-0-0", { slot: "icon-start", direction: "horizontal" })), this.renderMenuContextListItems()))), this.sourcesActionConfig && (h("div", { class: "sources-action" }, h("wpp-action-button-v4-0-0", { variant: "secondary", ...this.sourcesActionConfig }, this.sourcesActionConfig.text)))))), this.userAvatarConfig && (h("div", { class: "avatar-wrapper" }, this.role === 'user' && h("wpp-avatar-v4-0-0", { size: "s", role: "presentation", ...this.userAvatarConfig }))))));
  }
  static get is() { return "wpp-chat-conversation-message"; }
  static get registryIs() { return "wpp-chat-conversation-message-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-conversation-message.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-conversation-message.css"]
    };
  }
  static get properties() {
    return {
      "role": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MessageRole",
          "resolved": "\"assistant\" | \"user\"",
          "references": {
            "MessageRole": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageRole"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the role of the message."
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'user'"
      },
      "content": {
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
          "text": "Defines the content of the message."
        },
        "attribute": "content",
        "reflect": false,
        "defaultValue": "''"
      },
      "status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MessageStatus",
          "resolved": "\"complete\" | \"loading\" | \"streaming\"",
          "references": {
            "MessageStatus": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageStatus"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the status of the message."
        },
        "attribute": "status",
        "reflect": false,
        "defaultValue": "'complete'"
      },
      "actionButtonsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionButtonDataConfig[]",
          "resolved": "ActionButtonDataConfig[]",
          "references": {
            "ActionButtonDataConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ActionButtonDataConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the action buttons configuration."
        }
      },
      "menuContextListItems": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ListItemInterface[]",
          "resolved": "ListItemInterface[]",
          "references": {
            "ListItemInterface": {
              "location": "import",
              "path": "../../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::ListItemInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the list items for the context menu."
        }
      },
      "sourcesActionConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionButtonDataConfig",
          "resolved": "Partial<ActionButtonData> & { text?: string | undefined; }",
          "references": {
            "ActionButtonDataConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ActionButtonDataConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the source action button configuration."
        }
      },
      "assistantAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "AvatarConfig | false",
          "resolved": "boolean | { icon?: string | undefined; name?: string | undefined; ariaProps?: AriaProps | undefined; src?: string | undefined; color?: string | undefined; withTooltip?: boolean | undefined; }",
          "references": {
            "AvatarConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar configuration for the assistant avatar."
        },
        "attribute": "assistant-avatar-config",
        "reflect": false,
        "defaultValue": "{}"
      },
      "userAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "AvatarConfig | false",
          "resolved": "boolean | { icon?: string | undefined; name?: string | undefined; ariaProps?: AriaProps | undefined; src?: string | undefined; color?: string | undefined; withTooltip?: boolean | undefined; }",
          "references": {
            "AvatarConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar configuration for the user avatar."
        },
        "attribute": "user-avatar-config",
        "reflect": false,
        "defaultValue": "{}"
      },
      "attachments": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatAttachment[]",
          "resolved": "ChatAttachment[]",
          "references": {
            "ChatAttachment": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ChatAttachment"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the attachments for the message."
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "committedTokens": {},
      "liveText": {},
      "currentStatus": {},
      "finalContent": {}
    };
  }
  static get methods() {
    return {
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
          "text": "",
          "tags": []
        }
      },
      "completeStream": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "setStatus": {
        "complexType": {
          "signature": "(status: MessageStatus) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "MessageStatus": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageStatus"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "status",
        "methodName": "onStatusChange"
      }, {
        "propName": "content",
        "methodName": "onContentChange"
      }];
  }
}

import { h, Host } from '@stencil/core';
export class WppChatConversation {
  constructor() {
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
    return (h(Host, null, h("div", { class: "conversation-container", ref: el => (this.conversationContainerRef = el) }, this.messages?.map(message => (h("wpp-chat-conversation-message-v4-0-0", { key: message.id, id: message.id, ref: el => {
        if (el)
          this.messageElementsMap.set(message.id, el);
      }, role: message.role, content: message.content, status: message.status, attachments: message.attachments, actionButtonsConfig: message.actionButtonsConfig, sourcesActionConfig: message.sourcesActionConfig, menuContextListItems: message.menuContextListItems, assistantAvatarConfig: this.assistantAvatarConfig, userAvatarConfig: this.userAvatarConfig })))), h("div", { class: this.inputWrapperCssClasses() }, h("wpp-chat-input-v4-0-0", { ...this.chatInputConfig, onWppSend: e => this.wppSend.emit(e.detail), onWppChange: e => this.wppChange.emit(e.detail), onWppMessageChanged: e => this.wppMessageChanged.emit(e.detail) }))));
  }
  static get is() { return "wpp-chat-conversation"; }
  static get registryIs() { return "wpp-chat-conversation-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-conversation.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-conversation.css"]
    };
  }
  static get properties() {
    return {
      "messages": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatMessage[]",
          "resolved": "ChatMessage[]",
          "references": {
            "ChatMessage": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/types.ts::ChatMessage"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the list of messages in the conversation."
        },
        "defaultValue": "[]"
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
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar configuration for the assistant."
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
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar configuration for the user."
        },
        "attribute": "user-avatar-config",
        "reflect": false,
        "defaultValue": "{}"
      },
      "chatInputConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatInputConfig",
          "resolved": "{ ariaProps?: ChatInputAriaProps | undefined; attachments?: FileItemType[] | undefined; charactersLimit?: number | undefined; debounceDelay?: number | undefined; debounceEnabled?: boolean | undefined; disabled?: boolean | undefined; enableAttach?: boolean | undefined; enableMic?: boolean | undefined; fileUploadConfig?: Partial<FileUploadConfig> | undefined; htmlAttributes?: ChatInputAttributes | undefined; locales?: Partial<ChatInputLocaleInterface> | undefined; placeholder?: string | undefined; size?: ChatInputSize | undefined; textValue?: string | undefined; textareaAriaLabel?: string | undefined; textareaId?: string | undefined; textareaName?: string | undefined; withSelect?: boolean | undefined; zIndex?: number | undefined; }",
          "references": {
            "ChatInputConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/types.ts::ChatInputConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the configuration for the chat input."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get events() {
    return [{
        "method": "wppSend",
        "name": "wppSend",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the \"Send\" button."
        },
        "complexType": {
          "original": "SendEventDetail",
          "resolved": "SendEventDetail",
          "references": {
            "SendEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::SendEventDetail"
            }
          }
        }
      }, {
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the value of the input changes."
        },
        "complexType": {
          "original": "FileUploadEventDetail",
          "resolved": "FileUploadEventDetail",
          "references": {
            "FileUploadEventDetail": {
              "location": "import",
              "path": "../wpp-file-upload/types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadEventDetail"
            }
          }
        }
      }, {
        "method": "wppMessageChanged",
        "name": "wppMessageChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the message in the input message changes."
        },
        "complexType": {
          "original": "MessageChangeEventDetail",
          "resolved": "{ value: string; }",
          "references": {
            "MessageChangeEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::MessageChangeEventDetail"
            }
          }
        }
      }];
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
          "text": "Appends a chunk of text to the last message.",
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
          "text": "Completes the stream for the last message.",
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
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageStatus"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets the status of the last message.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "messages",
        "methodName": "handleMessagesChange"
      }];
  }
}

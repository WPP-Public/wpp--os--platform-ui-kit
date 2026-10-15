import { h, Host } from '@stencil/core';
/**
 * @slot - Message elements composed by the consumer, rendered above the composer.
 * @slot input-references - Reference chips (e.g. `wpp-chat-reference`) stacked above the composer's
 * textarea. Use this to show a quoted reply after the `wppMessageActionClick` quote action.
 */
export class WppChatConversation {
  constructor() {
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
    this.locales = undefined;
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
    return (h(Host, null, h("div", { class: "conversation-container", ref: el => (this.conversationContainerRef = el) }, this.messages?.map(message => (h("wpp-chat-conversation-message-v4-5-0", { key: message.id, id: message.id, ref: el => {
        if (el)
          this.messageElementsMap.set(message.id, el);
      }, role: message.role, content: message.content, status: message.status, attachments: message.attachments, actionButtonsConfig: message.actionButtonsConfig, sourcesActionConfig: message.sourcesActionConfig, menuContextListItems: message.menuContextListItems, tokenCount: message.tokenCount, tokenCountIcon: message.tokenCountIcon, locales: message.locales ?? this.locales, onWppMessageActionClick: e => this.wppMessageActionClick.emit(e.detail), assistantAvatarConfig: this.assistantAvatarConfig, userAvatarConfig: this.userAvatarConfig }))), h("slot", null)), h("div", { class: this.inputWrapperCssClasses() }, h("wpp-chat-input-v4-5-0", { ...this.chatInputConfig, onWppSend: e => this.wppSend.emit(e.detail), onWppStop: () => this.wppStop.emit(), onWppChange: e => this.wppChange.emit(e.detail), onWppMessageChanged: e => this.wppMessageChanged.emit(e.detail), onWppActionsMenuToggle: e => this.wppActionsMenuToggle.emit(e.detail), onWppActionsMenuItemClick: e => this.wppActionsMenuItemClick.emit(e.detail), onWppModelSelect: e => this.wppModelSelect.emit(e.detail), onWppModelBrowse: () => this.wppModelBrowse.emit(), onWppReasoningSelect: e => this.wppReasoningSelect.emit(e.detail), onWppVerbositySelect: e => this.wppVerbositySelect.emit(e.detail) }, h("slot", { name: "input-references", slot: "references" })))));
  }
  static get is() { return "wpp-chat-conversation"; }
  static get registryIs() { return "wpp-chat-conversation-v4-5-0"; }
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
          "tags": [{
              "name": "deprecated",
              "text": "- The component should no longer render an avatar for the AI model."
            }],
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
          "tags": [{
              "name": "deprecated",
              "text": "- The component should no longer render an avatar for the user."
            }],
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
          "resolved": "{ actions?: ChatInputAction[] | undefined; ariaProps?: ChatInputAriaProps | undefined; attachments?: FileItemType[] | undefined; charactersLimit?: number | undefined; debounceDelay?: number | undefined; debounceEnabled?: boolean | undefined; disabled?: boolean | undefined; enableAttach?: boolean | undefined; enableMic?: boolean | undefined; fileUploadConfig?: Partial<FileUploadConfig> | undefined; htmlAttributes?: ChatInputAttributes | undefined; isGenerating?: boolean | undefined; locales?: Partial<ChatInputLocaleInterface> | undefined; models?: ChatInputModel[] | undefined; placeholder?: string | undefined; selectedModel?: ChatInputSelectedModel | undefined; selectedReasoning?: string | undefined; selectedVerbosity?: string | undefined; size?: ChatInputSize | undefined; textValue?: string | undefined; textareaAriaLabel?: string | undefined; textareaId?: string | undefined; textareaName?: string | undefined; withSelect?: boolean | undefined; zIndex?: number | undefined; }",
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
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatConversationMessageLocales>",
          "resolved": "undefined | { quoteAction?: string | undefined; copyAction?: string | undefined; copiedAction?: string | undefined; pinAction?: string | undefined; unpinAction?: string | undefined; tokenCountLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatConversationMessageLocales": {
              "location": "import",
              "path": "./components/types",
              "id": "src/components/wpp-chat-conversation/components/types.ts::ChatConversationMessageLocales"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Partial translation overrides applied to every message's footer. A message can override this\nfor itself via `ChatMessage.locales`."
        }
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
        "method": "wppStop",
        "name": "wppStop",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the \"Stop\" button while an AI response is generating."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
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
      }, {
        "method": "wppMessageActionClick",
        "name": "wppMessageActionClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a footer action (Quote / Copy / Pin, or a custom one) is clicked on a message this\ncomponent renders from its `messages` prop. Re-emitted from `wpp-chat-conversation-message`,\nwhose own event does not bubble, so the declarative `[messages]` path can reach it."
        },
        "complexType": {
          "original": "ChatConversationMessageActionClickDetail",
          "resolved": "ChatConversationMessageActionClickDetail",
          "references": {
            "ChatConversationMessageActionClickDetail": {
              "location": "import",
              "path": "./components/types",
              "id": "src/components/wpp-chat-conversation/components/types.ts::ChatConversationMessageActionClickDetail"
            }
          }
        }
      }, {
        "method": "wppActionsMenuToggle",
        "name": "wppActionsMenuToggle",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the consolidated actions menu (the `wpp-icon-plus` dropdown\nconfigured via `chatInputConfig.actions`) opens or closes."
        },
        "complexType": {
          "original": "ActionsMenuToggleEventDetail",
          "resolved": "{ open: boolean; }",
          "references": {
            "ActionsMenuToggleEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ActionsMenuToggleEventDetail"
            }
          }
        }
      }, {
        "method": "wppActionsMenuItemClick",
        "name": "wppActionsMenuItemClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an entry inside the consolidated actions menu is clicked.\nThe detail is the originating `ChatInputAction` object."
        },
        "complexType": {
          "original": "ChatInputActionItemClickEventDetail",
          "resolved": "ChatInputAction",
          "references": {
            "ChatInputActionItemClickEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputActionItemClickEventDetail"
            }
          }
        }
      }, {
        "method": "wppModelSelect",
        "name": "wppModelSelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Re-emitted from the chat input: the model picked from its selector."
        },
        "complexType": {
          "original": "ChatInputSelectableModel",
          "resolved": "ChatInputDefaultModel | ChatInputModel",
          "references": {
            "ChatInputSelectableModel": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputSelectableModel"
            }
          }
        }
      }, {
        "method": "wppModelBrowse",
        "name": "wppModelBrowse",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Re-emitted from the chat input: the \"Select model or agent\" action, shown when\n`chatInputConfig.models` is empty."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppReasoningSelect",
        "name": "wppReasoningSelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Re-emitted from the chat input: a reasoning level was picked. The detail carries the\nresulting state of the whole selection."
        },
        "complexType": {
          "original": "ChatInputModelOptionsEventDetail",
          "resolved": "ChatInputModelOptionsEventDetail",
          "references": {
            "ChatInputModelOptionsEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputModelOptionsEventDetail"
            }
          }
        }
      }, {
        "method": "wppVerbositySelect",
        "name": "wppVerbositySelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Re-emitted from the chat input: a verbosity level was picked, with the same payload as\n`wppReasoningSelect`."
        },
        "complexType": {
          "original": "ChatInputModelOptionsEventDetail",
          "resolved": "ChatInputModelOptionsEventDetail",
          "references": {
            "ChatInputModelOptionsEventDetail": {
              "location": "import",
              "path": "../wpp-chat/components/wpp-chat-input/types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputModelOptionsEventDetail"
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
      },
      "scrollToBottom": {
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
          "text": "Scrolls the conversation to the bottom. Use this when composing messages via the slot \u2014 the component\ndoes not auto-scroll on slot changes.",
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

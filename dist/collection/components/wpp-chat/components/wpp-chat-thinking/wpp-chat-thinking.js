import { h, Host } from '@stencil/core';
/**
 * @part thinking - root container
 * @part spinner - loading spinner
 * @part label - thinking label text
 */
export class WppChatThinking {
  constructor() {
    this.label = 'Thinking...';
  }
  render() {
    return (h(Host, { role: "status", "aria-live": "polite" }, h("div", { class: "thinking", part: "thinking" }, h("wpp-spinner-v4-2-0", { class: "spinner", part: "spinner", size: "s", "aria-hidden": "true" }), h("wpp-typography-v4-2-0", { class: "label", type: "s-body", part: "label" }, this.label))));
  }
  static get is() { return "wpp-chat-thinking"; }
  static get registryIs() { return "wpp-chat-thinking-v4-2-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-thinking.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-thinking.css"]
    };
  }
  static get properties() {
    return {
      "label": {
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
          "text": "Label shown next to the spinner while the assistant is processing.\nThis is the localisation hook: pass an already-translated string."
        },
        "attribute": "label",
        "reflect": false,
        "defaultValue": "'Thinking...'"
      }
    };
  }
}

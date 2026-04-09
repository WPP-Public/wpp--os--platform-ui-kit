import { h, Host } from '@stencil/core';
import TurndownService from 'turndown';
export class WppRichtextMarkdown {
  constructor() {
    this.markdown = '';
    this.turndown = new TurndownService();
    this.value = undefined;
  }
  handleValueChange(newValue) {
    this.markdown = newValue ? this.turndown.turndown(newValue) : '';
  }
  connectedCallback() {
    this.handleValueChange(this.value);
  }
  render() {
    return (h(Host, null, h("wpp-quill-styles-v3-6-0", null), h("wpp-richtext-common-styles-v3-6-0", null), h("pre", { class: "richtext-markdown" }, this.markdown)));
  }
  static get is() { return "wpp-richtext-markdown"; }
  static get registryIs() { return "wpp-richtext-markdown-v3-6-0"; }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Editor value"
        },
        "attribute": "value",
        "reflect": true
      }
    };
  }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "handleValueChange"
      }];
  }
}

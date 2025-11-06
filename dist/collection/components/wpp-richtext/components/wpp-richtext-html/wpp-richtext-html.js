import { h, Host } from '@stencil/core';
export class WppRichtextHtml {
  constructor() {
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp quill-view-html`;
    return (h(Host, null, h("wpp-quill-styles-v2-22-0", null), h("wpp-richtext-common-styles-v2-22-0", null), h("div", { class: classes }, h("div", { class: "ql-editor", innerHTML: this.value }))));
  }
  static get is() { return "wpp-richtext-html"; }
  static get registryIs() { return "wpp-richtext-html-v2-22-0"; }
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
        "reflect": false
      }
    };
  }
}

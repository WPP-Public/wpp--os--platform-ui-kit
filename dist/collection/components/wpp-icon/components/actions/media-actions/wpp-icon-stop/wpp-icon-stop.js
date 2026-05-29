import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconStop {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-stop", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.6389 4.16667C15.7463 4.16667 15.8333 4.25372 15.8333 4.36111V15.6389C15.8333 15.7463 15.7463 15.8333 15.6389 15.8333H4.36111C4.25372 15.8333 4.16667 15.7463 4.16667 15.6389V4.36111C4.16667 4.25372 4.25372 4.16667 4.36111 4.16667H15.6389ZM4.36111 3C3.60939 3 3 3.60939 3 4.36111V15.6389C3 16.3906 3.60939 17 4.36111 17H15.6389C16.3906 17 17 16.3906 17 15.6389V4.36111C17 3.60939 16.3906 3 15.6389 3H4.36111Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-stop"; }
  static get registryIs() { return "wpp-icon-stop-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../../wpp-icon.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon size, where `s` is **16px** and `m` is **20px**."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "width": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same."
        },
        "attribute": "width",
        "reflect": false
      },
      "height": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      },
      "color": {
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
          "text": "Defines the icon color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-icon-color)'"
      }
    };
  }
}

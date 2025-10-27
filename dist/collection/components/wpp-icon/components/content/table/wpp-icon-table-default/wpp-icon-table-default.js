import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconTableDefault {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-table-default", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V7.27778H7.27778V4.16667H5.52778ZM4.16667 8.44444V11.5556H7.27778V8.44444H4.16667ZM8.44444 8.44444L8.44444 11.5556H11.5556V8.44444H8.44444ZM12.7222 8.44444L12.7222 11.5556H15.8333V8.44444H12.7222ZM11.5556 12.7222H8.44444V15.8333H11.5556V12.7222ZM12.7222 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V12.7222H12.7222V15.8333ZM12.7222 7.27778H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H12.7222V7.27778ZM11.5556 4.16667H8.44444V7.27778H11.5556V4.16667ZM4.16667 12.7222V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H7.27778V12.7222H4.16667Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-table-default"; }
  static get registryIs() { return "wpp-icon-table-default-v3-3-0"; }
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

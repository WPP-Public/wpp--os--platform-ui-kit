import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconUpload {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-upload", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L13.5303 8.46967C13.8232 8.76256 13.8232 9.23744 13.5303 9.53033C13.2374 9.82322 12.7626 9.82322 12.4697 9.53033L10.75 7.81066L10.75 17C10.75 17.4142 10.4142 17.75 10 17.75C9.58579 17.75 9.25 17.4142 9.25 17L9.25 7.81066L7.53033 9.53033C7.23744 9.82322 6.76256 9.82322 6.46967 9.53033C6.17678 9.23744 6.17678 8.76256 6.46967 8.46967L9.46967 5.46967Z", fill: "currentColor" }), h("path", { d: "M3.5 3.75C3.08579 3.75 2.75 3.41421 2.75 3C2.75 2.58579 3.08579 2.25 3.5 2.25L16.5 2.25C16.9142 2.25 17.25 2.58578 17.25 3C17.25 3.41421 16.9142 3.75 16.5 3.75L3.5 3.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-upload"; }
  static get registryIs() { return "wpp-icon-upload-v3-4-0"; }
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

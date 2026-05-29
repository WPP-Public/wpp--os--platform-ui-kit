import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMusic {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-music", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M16.0581 2.11863C16.2103 2.23185 16.3 2.41034 16.3 2.60001V13.4C16.3 13.4213 16.2988 13.4424 16.2967 13.4632C16.2988 13.5085 16.3 13.5541 16.3 13.6C16.3 15.1464 15.0463 16.4 13.5 16.4C11.9536 16.4 10.7 15.1464 10.7 13.6C10.7 12.0536 11.9536 10.8 13.5 10.8C14.0949 10.8 14.6464 10.9855 15.1 11.3019V6.60642L8.29995 8.64642V15C8.29995 15.0213 8.29884 15.0424 8.29667 15.0631C8.29885 15.1085 8.29995 15.1541 8.29995 15.2C8.29995 16.7464 7.04635 18 5.49995 18C3.95355 18 2.69995 16.7464 2.69995 15.2C2.69995 13.6536 3.95355 12.4 5.49995 12.4C6.09485 12.4 6.64642 12.5855 7.09995 12.9019V5.00001C7.09995 4.73504 7.27375 4.50145 7.52754 4.42531L15.5275 2.02531C15.7092 1.97081 15.9059 2.00541 16.0581 2.11863ZM8.29995 7.39359L15.1 5.35359V3.40642L8.29995 5.44642V7.39359ZM5.49995 13.6C4.6163 13.6 3.89995 14.3163 3.89995 15.2C3.89995 16.0837 4.6163 16.8 5.49995 16.8C6.38361 16.8 7.09995 16.0837 7.09995 15.2C7.09995 14.3163 6.38361 13.6 5.49995 13.6ZM11.9 13.6C11.9 14.4837 12.6163 15.2 13.5 15.2C14.3836 15.2 15.1 14.4837 15.1 13.6C15.1 12.7163 14.3836 12 13.5 12C12.6163 12 11.9 12.7163 11.9 13.6Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-music"; }
  static get registryIs() { return "wpp-icon-music-v4-1-0"; }
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

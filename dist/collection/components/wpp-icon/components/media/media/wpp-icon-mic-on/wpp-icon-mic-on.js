import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMicOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mic-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15 9.2C15.3038 9.2 15.5548 9.42572 15.5945 9.71858L15.6 9.8V10.2C15.6 13.0475 13.396 15.3803 10.6008 15.5854L10.6 17.4C10.6 17.7314 10.3314 18 10 18C9.69627 18 9.44523 17.7743 9.4055 17.4814L9.40002 17.4L9.40004 15.5854C6.66661 15.3853 4.49829 13.1504 4.40327 10.3891L4.40002 10.2V9.8C4.40002 9.46863 4.66865 9.2 5.00002 9.2C5.30378 9.2 5.55482 9.42572 5.59455 9.71858L5.60002 9.8V10.2C5.60002 12.4616 7.38758 14.3057 9.6269 14.3965L9.80002 14.4H10.2C12.4616 14.4 14.3057 12.6124 14.3965 10.3731L14.4 10.2V9.8C14.4 9.46863 14.6687 9.2 15 9.2ZM10 2C11.7673 2 13.2 3.43269 13.2 5.2V10C13.2 11.7673 11.7673 13.2 10 13.2C8.23271 13.2 6.80002 11.7673 6.80002 10V5.2C6.80002 3.43269 8.23271 2 10 2ZM10 3.2C8.89545 3.2 8.00002 4.09543 8.00002 5.2V10C8.00002 11.1046 8.89545 12 10 12C11.1046 12 12 11.1046 12 10V5.2C12 4.09543 11.1046 3.2 10 3.2Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-mic-on"; }
  static get registryIs() { return "wpp-icon-mic-on-v3-3-1"; }
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

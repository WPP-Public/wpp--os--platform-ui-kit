import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSend {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-send", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.82799 9L2.04367 1.84033C1.84989 1.34203 2.33578 0.865489 2.81645 1.03488L2.8922 1.06708L17.6575 8.44973C18.0826 8.66228 18.1092 9.2443 17.7372 9.50304L17.6575 9.55027L2.8922 16.9329C2.41398 17.172 1.89449 16.7324 2.01862 16.2381L2.04367 16.1597L4.82799 9L2.04367 1.84033L4.82799 9ZM3.76856 2.88094L5.9087 8.38429L11.3453 8.38478C11.6567 8.38478 11.9141 8.61623 11.9549 8.91652L11.9605 9C11.9605 9.31146 11.729 9.56887 11.4287 9.6096L11.3453 9.61522L5.9087 9.61473L3.76856 15.1191L16.0067 9L3.76856 2.88094Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-send"; }
  static get registryIs() { return "wpp-icon-send-v2-22-0"; }
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

import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconGps {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-gps", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C10.3038 2 10.5548 2.22572 10.5945 2.51858L10.6 2.6L10.5993 4.03017C13.4343 4.31006 15.6899 6.56575 15.9706 9.40203L16 9.4H17.4C17.7314 9.4 18 9.66863 18 10C18 10.3038 17.7743 10.5548 17.4814 10.5945L17.4 10.6L15.9693 10.5992C15.6899 13.4343 13.4343 15.6899 10.598 15.9706L10.6 16V17.4C10.6 17.7314 10.3314 18 10 18C9.69624 18 9.44521 17.7743 9.40548 17.4814L9.4 17.4L9.40077 15.9693C6.56575 15.6899 4.31006 13.4343 4.02942 10.598L4 10.6H2.6C2.26863 10.6 2 10.3314 2 10C2 9.69624 2.22572 9.44521 2.51858 9.40548L2.6 9.4L4.03017 9.40075C4.31006 6.56575 6.56575 4.31006 9.40203 4.02942L9.4 4V2.6C9.4 2.26863 9.66863 2 10 2ZM10 5.2C7.34903 5.2 5.2 7.34903 5.2 10C5.2 12.651 7.34903 14.8 10 14.8C12.651 14.8 14.8 12.651 14.8 10C14.8 7.34903 12.651 5.2 10 5.2ZM10 6.8C11.7673 6.8 13.2 8.23269 13.2 10C13.2 11.7673 11.7673 13.2 10 13.2C8.23269 13.2 6.8 11.7673 6.8 10C6.8 8.23269 8.23269 6.8 10 6.8Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-gps"; }
  static get registryIs() { return "wpp-icon-gps-v3-5-0"; }
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

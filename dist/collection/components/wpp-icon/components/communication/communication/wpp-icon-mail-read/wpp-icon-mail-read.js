import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMailRead {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mail-read", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.88006 7.13542L9.69336 3.08428C9.85534 2.98796 10.0514 2.9742 10.2231 3.043L10.3066 3.08428L17.1199 7.13542C17.6266 7.4367 17.9511 7.96512 17.9949 8.54735L18 8.68259V14.8C18 16.1864 16.9148 17.3194 15.5475 17.3959L15.4 17.4H4.6C3.21357 17.4 2.0806 16.3148 2.00412 14.9475L2 14.8V8.68259C2 8.0931 2.28834 7.54409 2.76642 7.2089L2.88006 7.13542L9.69336 3.08428L2.88006 7.13542ZM16.8 9.328L10.2775 12.732C10.1326 12.8076 9.96453 12.8202 9.81188 12.7698L9.72246 12.732L3.2 9.328V14.8C3.2 15.5345 3.76569 16.137 4.48518 16.1954L4.6 16.2H15.4C16.1345 16.2 16.737 15.6343 16.7954 14.9148L16.8 14.8V9.328ZM10 4.29805L3.5264 8.1464L10 11.5232L16.472 8.1456L10 4.29805Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-mail-read"; }
  static get registryIs() { return "wpp-icon-mail-read-v2-22-0"; }
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

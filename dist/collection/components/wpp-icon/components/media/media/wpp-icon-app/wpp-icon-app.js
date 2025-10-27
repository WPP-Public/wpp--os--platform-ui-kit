import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconApp {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-app", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.8243 2.54552L17.4556 5.17686C18.183 5.90422 18.183 7.0835 17.4556 7.81086L15.3163 9.94979C16.2127 10.0843 16.9001 10.8577 16.9001 11.7916V16.1375C16.9001 17.1661 16.0663 18 15.0376 18H3.86252C2.83388 18 2 17.1661 2 16.1375V4.96238C2 3.93374 2.83388 3.09986 3.86252 3.09986H8.20839C9.14291 3.09986 9.91668 3.78812 10.0505 4.68541L12.1903 2.54552C12.9176 1.81816 14.0969 1.81816 14.8243 2.54552ZM3.24168 16.1375C3.24168 16.4804 3.51964 16.7583 3.86252 16.7583L8.8284 16.7578L8.82923 11.1708L3.24168 11.1702V16.1375ZM10.0701 16.7578L15.0376 16.7583C15.3805 16.7583 15.6585 16.4804 15.6585 16.1375V11.7916C15.6585 11.4487 15.3805 11.1708 15.0376 11.1708L10.0701 11.1702V16.7578ZM8.20839 4.34154H3.86252C3.51964 4.34154 3.24168 4.6195 3.24168 4.96238V9.92853H8.82923V4.96238C8.82923 4.6195 8.55127 4.34154 8.20839 4.34154ZM10.0709 8.32263V9.92909L11.6768 9.92853L10.0709 8.32263ZM13.0683 3.42352L10.4369 6.05486C10.1945 6.29731 10.1945 6.6904 10.4369 6.93286L13.0683 9.5642C13.3107 9.80665 13.7038 9.80665 13.9463 9.5642L16.5776 6.93286C16.8201 6.6904 16.8201 6.29731 16.5776 6.05486L13.9463 3.42352C13.7038 3.18106 13.3107 3.18106 13.0683 3.42352Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-app"; }
  static get registryIs() { return "wpp-icon-app-v3-3-0"; }
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

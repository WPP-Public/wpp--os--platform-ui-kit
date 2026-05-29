import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDocumentBlocked {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-document-blocked", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.1667 16.5714C15.1667 16.794 14.9853 16.9762 14.7619 16.9762H10.1215C9.88906 17.4223 9.59453 17.8308 9.24939 18.1905H14.7619C15.6556 18.1905 16.381 17.4651 16.381 16.5714V8.33695C16.381 7.90791 16.2101 7.49586 15.9066 7.19229L11.1879 2.47438C11.1758 2.46228 11.162 2.45178 11.1484 2.44135C11.1384 2.43364 11.1283 2.42597 11.119 2.41771C11.0616 2.3659 11.0049 2.3149 10.9418 2.272C10.9213 2.25819 10.8989 2.24729 10.8766 2.23644C10.8636 2.23011 10.8507 2.22381 10.8381 2.21695C10.8246 2.20934 10.8112 2.20154 10.7977 2.19374C10.7538 2.16836 10.7097 2.14286 10.6633 2.12305C10.5038 2.05667 10.3322 2.02348 10.1581 2.01133C10.1422 2.01032 10.1264 2.00816 10.1105 2.006C10.0886 2.003 10.0666 2 10.044 2H5.04762C4.1539 2 3.42857 2.72533 3.42857 3.61905V9.68899C3.81243 9.52891 4.2193 9.413 4.64286 9.3476V3.61905C4.64286 3.39643 4.82419 3.21429 5.04762 3.21429H9.90476V6.85714C9.90476 7.75086 10.6301 8.47619 11.5238 8.47619H15.1667V16.5714ZM11.119 4.12176L14.2584 7.2619H11.5238C11.3004 7.2619 11.119 7.07976 11.119 6.85714V4.12176ZM9.90476 14.5476C9.90476 17.0066 7.91136 19 5.45238 19C2.9934 19 1 17.0066 1 14.5476C1 12.0886 2.9934 10.0952 5.45238 10.0952C7.91136 10.0952 9.90476 12.0886 9.90476 14.5476ZM2.21429 14.5476C2.21429 15.2224 2.42067 15.8489 2.77377 16.3676L7.27237 11.869C6.7537 11.5159 6.12714 11.3095 5.45238 11.3095C3.66403 11.3095 2.21429 12.7593 2.21429 14.5476ZM5.45238 17.7857C7.24073 17.7857 8.69048 16.336 8.69048 14.5476C8.69048 13.8729 8.48409 13.2463 8.13099 12.7276L3.6324 17.2262C4.15106 17.5793 4.77762 17.7857 5.45238 17.7857Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-document-blocked"; }
  static get registryIs() { return "wpp-icon-document-blocked-v4-1-0"; }
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

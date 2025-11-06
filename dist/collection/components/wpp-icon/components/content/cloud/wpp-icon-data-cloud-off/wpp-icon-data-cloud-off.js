import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataCloudOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-cloud-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L5.82845 6.67705C5.55776 7.13883 5.36522 7.6524 5.26928 8.19996L5.2 8.19995C3.43268 8.19995 2 9.63263 2 11.3999C2 13.1672 3.43268 14.5999 5.19998 14.5999H13.7512L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM12.5512 13.3999H5.19998C4.09541 13.3999 3.19999 12.5045 3.19999 11.3999C3.19999 10.2954 4.09541 9.39994 5.19998 9.39994L5.80486 9.39996C6.12477 9.39997 6.38842 9.14899 6.40415 8.82947C6.42634 8.3789 6.53604 7.952 6.71641 7.56502L12.5512 13.3999ZM16.3999 11.3999C16.3999 12.0683 16.072 12.6601 15.5683 13.0233L16.4238 13.8787C17.1416 13.2919 17.5999 12.3994 17.5999 11.3999C17.5999 9.63263 16.1672 8.19995 14.3999 8.19995L14.3306 8.19996C13.9511 6.03418 12.0603 4.39998 9.79994 4.39998C8.97927 4.39998 8.20731 4.61541 7.5387 4.99348L8.43187 5.88667C8.85093 5.70224 9.31389 5.59997 9.79994 5.59997C11.6143 5.59997 13.1069 7.02496 13.1957 8.82947C13.2115 9.14899 13.4751 9.39997 13.795 9.39996L14.3999 9.39994C15.5045 9.39994 16.3999 10.2954 16.3999 11.3999Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-cloud-off"; }
  static get registryIs() { return "wpp-icon-data-cloud-off-v2-22-0"; }
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

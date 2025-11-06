import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCommentOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-comment-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L2.73741 3.58594C2.28109 4.05439 2 4.69436 2 5.39998V12.1999C2 13.6359 3.16405 14.7999 4.59998 14.7999H5.19935L5.19998 16.9998C5.19998 17.2156 5.26986 17.4257 5.39918 17.5986C5.72997 18.0408 6.35665 18.1312 6.79891 17.8004L10.8099 14.7999H13.9512L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM12.7512 13.5999H10.4107L6.39985 16.6004L6.399 13.5999H4.59998C3.82679 13.5999 3.19999 12.9731 3.19999 12.1999V5.39998C3.19999 5.02573 3.34684 4.68578 3.58606 4.43461L12.7512 13.5999ZM16.7999 12.1999C16.7999 12.7556 16.4762 13.2356 16.0071 13.4618L16.8818 14.3365C17.5575 13.867 17.9999 13.0851 17.9999 12.1999V5.39998C17.9999 3.96405 16.8358 2.8 15.3999 2.8H5.34555L6.54552 3.99999H15.3999C16.1731 3.99999 16.7999 4.62679 16.7999 5.39998V12.1999Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-comment-off"; }
  static get registryIs() { return "wpp-icon-comment-off-v2-22-0"; }
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

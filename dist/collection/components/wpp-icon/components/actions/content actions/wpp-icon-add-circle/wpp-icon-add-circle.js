import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconAddCircle {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-plus", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 5.7085C10.4142 5.7085 10.75 6.04428 10.75 6.4585V9.25024H13.5418C13.956 9.25024 14.2918 9.58603 14.2918 10.0002C14.2918 10.4145 13.956 10.7502 13.5418 10.7502H10.75V13.5418C10.75 13.956 10.4142 14.2918 10 14.2918C9.58579 14.2918 9.25 13.956 9.25 13.5418V10.7502H6.4585C6.04428 10.7502 5.7085 10.4145 5.7085 10.0002C5.7085 9.58603 6.04428 9.25024 6.4585 9.25024H9.25V6.4585C9.25 6.04428 9.58579 5.7085 10 5.7085Z", fill: "currentColor" }), h("path", { d: "M1.5415 10.0003C1.5415 5.32892 5.32843 1.54199 9.99984 1.54199C14.6712 1.54199 18.4582 5.32892 18.4582 10.0003C18.4582 14.6717 14.6712 18.4587 9.99984 18.4587C5.32843 18.4587 1.5415 14.6717 1.5415 10.0003ZM9.99984 3.04199C6.15686 3.04199 3.0415 6.15734 3.0415 10.0003C3.0415 13.8433 6.15686 16.9587 9.99984 16.9587C13.8428 16.9587 16.9582 13.8433 16.9582 10.0003C16.9582 6.15734 13.8428 3.04199 9.99984 3.04199Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-add-circle"; }
  static get registryIs() { return "wpp-icon-add-circle-v3-6-0"; }
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

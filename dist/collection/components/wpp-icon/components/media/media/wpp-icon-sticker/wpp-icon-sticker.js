import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSticker {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sticker", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.4722 3C15.8683 3 17 4.13172 17 5.52778V10.8779C17 11.342 16.8156 11.7871 16.4874 12.1153L12.1153 16.4874C11.7871 16.8156 11.342 17 10.8779 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722ZM14.4722 4.16667H5.52778C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H10.7778L10.7785 13.4506C10.6065 13.4763 10.4317 13.4933 10.2542 13.5016L10.0007 13.5074C8.95188 13.5074 7.99322 13.2105 7.14037 12.6206C6.8754 12.4373 6.80917 12.074 6.99244 11.809C7.1757 11.544 7.53906 11.4778 7.80403 11.6611C8.46113 12.1156 9.18814 12.3408 10.0007 12.3408C10.3603 12.3408 10.7031 12.2967 11.0305 12.2081C11.4163 11.408 12.2099 10.8437 13.1408 10.7832L13.3065 10.7778H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667ZM15.0081 11.9444H13.3066C12.5925 11.9447 12.0067 12.4947 11.9496 13.194L11.945 13.3057L11.9444 15.0081L15.0081 11.9444ZM7.66702 6.69535C8.20365 6.69535 8.63868 7.13038 8.63868 7.66702C8.63868 8.20365 8.20365 8.63868 7.66702 8.63868C7.13038 8.63868 6.69535 8.20365 6.69535 7.66702C6.69535 7.13038 7.13038 6.69535 7.66702 6.69535ZM12.3337 6.69535C12.8703 6.69535 13.3054 7.13038 13.3054 7.66702C13.3054 8.20365 12.8703 8.63868 12.3337 8.63868C11.797 8.63868 11.362 8.20365 11.362 7.66702C11.362 7.13038 11.797 6.69535 12.3337 6.69535Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-sticker"; }
  static get registryIs() { return "wpp-icon-sticker-v4-0-0"; }
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

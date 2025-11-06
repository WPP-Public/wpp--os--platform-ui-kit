import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconSplit {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'horizontal';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-split", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.2007 11.6003L9.13341 11.5422C8.89852 11.3679 8.56519 11.3872 8.35217 11.6003L8.00102 11.9514L8.00083 8.80059L12.0006 8.80059L12.0008 11.9529L11.5912 11.6004L11.5239 11.5423C11.289 11.368 10.9557 11.3873 10.7426 11.6003C10.5083 11.8345 10.5082 12.2144 10.7425 12.4488L12.1755 13.825L12.2428 13.8831C12.4777 14.0574 12.8111 14.0381 13.0242 13.825L14.4003 12.4489L14.4583 12.3817C14.6326 12.1468 14.6133 11.8134 14.4003 11.6004L14.333 11.5423C14.0981 11.368 13.7647 11.3874 13.5517 11.6004L13.2008 11.9513L13.2005 8.19956L13.1951 8.11814C13.1553 7.82528 12.9043 7.59956 12.6005 7.59956L12.5853 7.60059H10.6005L10.6003 4.99956L10.5949 4.91814C10.5551 4.62528 10.3041 4.39956 10.0003 4.39956L9.91891 4.40504C9.62605 4.44477 9.40033 4.6958 9.40033 4.99956L9.40054 7.60059H7.43532C7.42389 7.59994 7.41237 7.59961 7.40078 7.59961L7.31937 7.60509C7.0265 7.64482 6.80078 7.89585 6.80078 8.19961L6.80102 11.953L6.44931 11.6003L6.38203 11.5422C6.14717 11.3678 5.81384 11.3871 5.60078 11.6001C5.36642 11.8344 5.36635 12.2143 5.60062 12.4486L6.97578 13.825L7.04307 13.8831C7.27796 14.0575 7.61135 14.0381 7.82439 13.8251L9.2007 12.4488L9.25879 12.3815C9.43308 12.1466 9.41371 11.8133 9.2007 11.6003ZM2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10ZM16.8 10C16.8 13.7555 13.7555 16.8 10 16.8C6.24446 16.8 3.2 13.7555 3.2 10C3.2 6.24446 6.24446 3.2 10 3.2C13.7555 3.2 16.8 6.24446 16.8 10Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-split"; }
  static get registryIs() { return "wpp-icon-split-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-icon.css"]
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
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'horizontal' | 'vertical'",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon direction."
        },
        "attribute": "direction",
        "reflect": false,
        "defaultValue": "'horizontal'"
      }
    };
  }
}

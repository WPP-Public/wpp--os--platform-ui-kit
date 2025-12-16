import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconOwner {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-owner", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.3983 2C11.6078 2 13.399 3.79118 13.399 6.00071C13.399 8.21024 11.6078 10.0014 9.3983 10.0014C7.18877 10.0014 5.39759 8.21024 5.39759 6.00071C5.39759 3.79118 7.18877 2 9.3983 2ZM9.3983 3.20021C7.85163 3.20021 6.59781 4.45404 6.59781 6.00071C6.59781 7.54738 7.85163 8.80121 9.3983 8.80121C10.945 8.80121 12.1988 7.54738 12.1988 6.00071C12.1988 4.45404 10.945 3.20021 9.3983 3.20021Z", fill: "currentColor" }), h("path", { d: "M3.71875 15.8081C4.90505 17.1973 6.679 17.9205 9 17.9938V17C9 16.9299 9.00473 16.8609 9.01397 16.7935C7.02221 16.7268 5.57465 16.1332 4.63146 15.0287C4.35313 14.7027 4.20021 14.2882 4.20021 13.8596V13.3974C4.20021 13.0664 4.46849 12.7982 4.79942 12.7982H12.0024C12.0168 12.3836 12.0958 11.9817 12.242 11.5979H4.79942C3.80563 11.5979 3 12.4036 3 13.3974V13.8596C3 14.5739 3.25486 15.2649 3.71875 15.8081Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.1484 18.8516C10.0495 18.7526 10 18.6354 10 18.5V17C10 16.8646 10.0495 16.7474 10.1484 16.6484L13.0859 13.7109C13.0286 13.4401 13 13.1823 13 12.9375C13 12.5312 13.0807 12.151 13.2422 11.7969C13.4036 11.4427 13.6224 11.1302 13.8984 10.8594C14.1745 10.5885 14.4922 10.3802 14.8516 10.2344C15.2109 10.0885 15.5938 10.0104 16 10C16.4167 10 16.8073 10.0781 17.1719 10.2344C17.5365 10.3906 17.8542 10.6042 18.125 10.875C18.3958 11.1458 18.6094 11.4635 18.7656 11.8281C18.9219 12.1927 19 12.5833 19 13C19 13.401 18.9245 13.7812 18.7734 14.1406C18.6224 14.5 18.4115 14.8203 18.1406 15.1016C17.8698 15.3828 17.5599 15.6016 17.2109 15.7578C16.862 15.9141 16.4792 15.9948 16.0625 16C15.8802 16 15.7005 15.987 15.5234 15.9609C15.3464 15.9349 15.1719 15.8906 15 15.8281V16.0234C15 16.0964 15.0026 16.1719 15.0078 16.25C15.0078 16.3438 15.0026 16.4349 14.9922 16.5234C14.9818 16.612 14.9583 16.6901 14.9219 16.7578C14.8854 16.8255 14.8333 16.8828 14.7656 16.9297C14.6979 16.9766 14.6094 17 14.5 17H14C14 17.2448 13.9948 17.4323 13.9844 17.5625C13.974 17.6927 13.9349 17.7917 13.8672 17.8594C13.7995 17.9271 13.6979 17.9661 13.5625 17.9766C13.4271 17.987 13.2396 17.9948 13 18V18.2656C13 18.3542 12.9948 18.4401 12.9844 18.5234C12.974 18.6068 12.9531 18.6849 12.9219 18.7578C12.8906 18.8307 12.8411 18.888 12.7734 18.9297C12.7057 18.9714 12.6146 18.9948 12.5 19H10.5C10.3646 19 10.2474 18.9505 10.1484 18.8516ZM17.5 12.25C17.5 12.0417 17.4271 11.8646 17.2812 11.7188C17.1354 11.5729 16.9583 11.5 16.75 11.5C16.5417 11.5 16.3646 11.5729 16.2188 11.7188C16.0729 11.8646 16 12.0417 16 12.25C16 12.4583 16.0729 12.6354 16.2188 12.7812C16.3646 12.9271 16.5417 13 16.75 13C16.9583 13 17.1354 12.9271 17.2812 12.7812C17.4271 12.6354 17.5 12.4583 17.5 12.25Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-owner"; }
  static get registryIs() { return "wpp-icon-owner-v3-4-0"; }
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

import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconZoo {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-zoo", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.25 7.5C8.49264 7.5 9.5 6.26878 9.5 4.75C9.5 3.23122 8.49264 2 7.25 2C6.00736 2 5 3.23122 5 4.75C5 6.26878 6.00736 7.5 7.25 7.5ZM7.68005 5.74469C7.85509 5.53076 8 5.18401 8 4.75C8 4.31599 7.85509 3.96924 7.68005 3.75531C7.50755 3.54447 7.34768 3.5 7.25 3.5C7.15232 3.5 6.99245 3.54447 6.81995 3.75531C6.64491 3.96924 6.5 4.31599 6.5 4.75C6.5 5.18401 6.64491 5.53076 6.81995 5.74469C6.99245 5.95553 7.15232 6 7.25 6C7.34768 6 7.50755 5.95553 7.68005 5.74469Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.75 7.5C13.9926 7.5 15 6.26878 15 4.75C15 3.23122 13.9926 2 12.75 2C11.5074 2 10.5 3.23122 10.5 4.75C10.5 6.26878 11.5074 7.5 12.75 7.5ZM13.1801 5.74469C13.3551 5.53076 13.5 5.18401 13.5 4.75C13.5 4.31599 13.3551 3.96924 13.1801 3.75531C13.0075 3.54447 12.8477 3.5 12.75 3.5C12.6523 3.5 12.4925 3.54447 12.3199 3.75531C12.1449 3.96924 12 4.31599 12 4.75C12 5.18401 12.1449 5.53076 12.3199 5.74469C12.4925 5.95553 12.6523 6 12.75 6C12.8477 6 13.0075 5.95553 13.1801 5.74469Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.5 9.75C6.5 11.2688 5.49264 12.5 4.25 12.5C3.00736 12.5 2 11.2688 2 9.75C2 8.23122 3.00736 7 4.25 7C5.49264 7 6.5 8.23122 6.5 9.75ZM5 9.75C5 10.184 4.85509 10.5308 4.68005 10.7447C4.50755 10.9555 4.34768 11 4.25 11C4.15232 11 3.99245 10.9555 3.81995 10.7447C3.64491 10.5308 3.5 10.184 3.5 9.75C3.5 9.31599 3.64491 8.96924 3.81995 8.75531C3.99245 8.54447 4.15232 8.5 4.25 8.5C4.34768 8.5 4.50755 8.54447 4.68005 8.75531C4.85509 8.96924 5 9.31599 5 9.75Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.75 12.5C16.9926 12.5 18 11.2688 18 9.75C18 8.23122 16.9926 7 15.75 7C14.5074 7 13.5 8.23122 13.5 9.75C13.5 11.2688 14.5074 12.5 15.75 12.5ZM16.1801 10.7447C16.3551 10.5308 16.5 10.184 16.5 9.75C16.5 9.31599 16.3551 8.96924 16.1801 8.75531C16.0075 8.54447 15.8477 8.5 15.75 8.5C15.6523 8.5 15.4925 8.54447 15.3199 8.75531C15.1449 8.96924 15 9.31599 15 9.75C15 10.184 15.1449 10.5308 15.3199 10.7447C15.4925 10.9555 15.6523 11 15.75 11C15.8477 11 16.0075 10.9555 16.1801 10.7447Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 7.75C8.85542 7.75 8.09638 8.54237 7.6434 9.29817C7.19521 10.046 6.9344 10.9289 6.80929 11.585C6.16743 12.1315 5.25 13.3165 5.25 15C5.25 17.4924 8.05547 18.734 10 17.4625C11.9445 18.734 14.75 17.4924 14.75 15C14.75 13.3165 13.8326 12.1315 13.1907 11.585C13.0656 10.9289 12.8048 10.046 12.3566 9.29817C11.9036 8.54237 11.1446 7.75 10 7.75ZM8.2738 11.9139C8.37471 11.3592 8.59155 10.634 8.93002 10.0693C9.27761 9.48933 9.63998 9.25 10 9.25C10.36 9.25 10.7224 9.48933 11.07 10.0693C11.4084 10.634 11.6253 11.3592 11.7262 11.9139C11.7872 12.2491 11.9722 12.5228 12.1995 12.7112C12.61 13.0517 13.25 13.86 13.25 15C13.25 16.167 11.8702 16.9122 10.8037 16.1957C10.3216 15.8717 9.67843 15.8717 9.19627 16.1957C8.12975 16.9122 6.75 16.167 6.75 15C6.75 13.86 7.38998 13.0517 7.80053 12.7112C8.02781 12.5228 8.21281 12.2491 8.2738 11.9139Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-zoo"; }
  static get registryIs() { return "wpp-icon-zoo-v3-3-0"; }
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
      }
    };
  }
}

import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBookFaq {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-book-faq", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.99986 6.81402C8.99241 7.13891 8.72671 7.39999 8.40002 7.39999C7.80002 7.39999 7.80003 6.79912 7.80003 6.79912L7.80003 6.79821L7.80003 6.79631L7.80007 6.79214C7.80028 6.7804 7.8006 6.76867 7.80118 6.75694C7.80212 6.73758 7.80381 6.71328 7.8068 6.68472C7.81275 6.62782 7.82399 6.55274 7.84534 6.46549C7.88781 6.29194 7.97255 6.06122 8.14281 5.83125C8.50603 5.34066 9.15858 4.98182 10.2105 5.00008C10.9702 5.01327 11.6447 5.33198 12.0672 5.85638C12.4968 6.38963 12.6414 7.11216 12.3571 7.82282C12.0674 8.54712 11.4119 8.83492 11.0354 9.00027L10.9946 9.0182C10.7718 9.11656 10.6651 9.16793 10.6011 9.2192L10.6 9.22004L10.6 9.79935C10.6001 10.1307 10.3315 10.4 10.0001 10.4C9.66873 10.4 9.40007 10.1314 9.40004 9.80004L9.40002 9.19999C9.40002 8.78154 9.60162 8.48234 9.85069 8.28276C10.0508 8.12242 10.3021 8.01187 10.4793 7.93392L10.51 7.92039C10.9434 7.7291 11.1495 7.61077 11.2429 7.37716C11.3587 7.08782 11.3032 6.82076 11.1327 6.60922C10.9552 6.38883 10.6297 6.20754 10.1896 6.1999C9.44149 6.18691 9.19403 6.42807 9.10725 6.54529C9.0525 6.61923 9.02474 6.69437 9.01096 6.7507C9.00418 6.7784 9.00136 6.79926 9.00028 6.80957L8.99986 6.81402ZM10 12.8C10.4419 12.8 10.8 12.4418 10.8 12C10.8 11.5582 10.4419 11.2 10 11.2C9.5582 11.2 9.20002 11.5582 9.20002 12C9.20002 12.4418 9.5582 12.8 10 12.8ZM3.40002 4C3.40002 2.89543 4.29546 2 5.40002 2H14.6C15.7046 2 16.6 2.89543 16.6 4V15.4C16.6 15.7314 16.3314 16 16 16H4.60002C4.60002 16.4418 4.9582 16.8 5.40002 16.8H16C16.3314 16.8 16.6 17.0686 16.6 17.4C16.6 17.7314 16.3314 18 16 18H5.40002C4.29546 18 3.40002 17.1046 3.40002 16V4ZM4.60002 4V14.8H15.4V4C15.4 3.55817 15.0419 3.2 14.6 3.2H5.40002C4.9582 3.2 4.60002 3.55817 4.60002 4Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-book-faq"; }
  static get registryIs() { return "wpp-icon-book-faq-v4-1-0"; }
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

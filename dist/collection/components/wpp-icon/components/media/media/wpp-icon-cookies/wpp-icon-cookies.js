import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCookies {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cookies", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C10.5711 2 11.1349 2.05995 11.6847 2.17783C12.1492 2.27743 12.3192 2.85177 11.9837 3.18817C11.6118 3.5611 11.4 4.06294 11.4 4.6C11.4 5.53635 12.0489 6.34175 12.9487 6.549C13.2447 6.6172 13.4431 6.89592 13.4105 7.19798C13.4035 7.26296 13.4 7.33046 13.4 7.4C13.4 8.50457 14.2954 9.4 15.4 9.4C15.9813 9.4 16.521 9.15144 16.8988 8.72426C17.2421 8.33609 17.8829 8.53635 17.9441 9.05093C17.9813 9.3638 18 9.68069 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.5494 16.8 16.4636 14.0806 16.7729 10.6117L16.788 10.4068L16.7936 10.2808L16.6388 10.3512C16.3743 10.4623 16.0939 10.538 15.804 10.5746L15.5849 10.5947L15.4 10.6C13.7951 10.6 12.4662 9.41859 12.2355 7.87802L12.2155 7.7174L12.204 7.568L12.0881 7.51971C11.0607 7.05818 10.3359 6.07679 10.2172 4.93252L10.2039 4.7597L10.2 4.6C10.2 4.2425 10.259 3.89411 10.3709 3.56621L10.4443 3.37203L10.512 3.22L10.291 3.2061L10 3.2ZM12.4 13.2C12.8418 13.2 13.2 13.5582 13.2 14C13.2 14.4418 12.8418 14.8 12.4 14.8C11.9582 14.8 11.6 14.4418 11.6 14C11.6 13.5582 11.9582 13.2 12.4 13.2ZM6.8 12.4C7.24183 12.4 7.6 12.7582 7.6 13.2C7.6 13.6418 7.24183 14 6.8 14C6.35817 14 6 13.6418 6 13.2C6 12.7582 6.35817 12.4 6.8 12.4ZM10 9.2C10.4418 9.2 10.8 9.55817 10.8 10C10.8 10.4418 10.4418 10.8 10 10.8C9.55817 10.8 9.2 10.4418 9.2 10C9.2 9.55817 9.55817 9.2 10 9.2ZM6 6.8C6.44183 6.8 6.8 7.15817 6.8 7.6C6.8 8.04183 6.44183 8.4 6 8.4C5.55817 8.4 5.2 8.04183 5.2 7.6C5.2 7.15817 5.55817 6.8 6 6.8Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-cookies"; }
  static get registryIs() { return "wpp-icon-cookies-v3-3-0"; }
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

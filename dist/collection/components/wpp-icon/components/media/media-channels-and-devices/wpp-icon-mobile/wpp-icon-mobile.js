import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMobile {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mobile", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.1667 14.3334C11.1667 14.8857 10.719 15.3334 10.1667 15.3334C9.61439 15.3334 9.16667 14.8857 9.16667 14.3334C9.16667 13.7811 9.61439 13.3334 10.1667 13.3334C10.719 13.3334 11.1667 13.7811 11.1667 14.3334Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.75 5C4.75 3.48122 5.98122 2.25 7.5 2.25H12.5C14.0188 2.25 15.25 3.48122 15.25 5V15C15.25 16.5188 14.0188 17.75 12.5 17.75H7.5C5.98122 17.75 4.75 16.5188 4.75 15V5ZM7.5 3.75C6.80964 3.75 6.25 4.30964 6.25 5V15C6.25 15.6904 6.80964 16.25 7.5 16.25H12.5C13.1904 16.25 13.75 15.6904 13.75 15V5C13.75 4.30964 13.1904 3.75 12.5 3.75H7.5Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-mobile"; }
  static get registryIs() { return "wpp-icon-mobile-v3-4-0"; }
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

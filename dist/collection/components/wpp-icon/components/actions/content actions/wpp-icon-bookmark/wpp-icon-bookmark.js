import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBookmark {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-bookmark", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.87508 3.45831C6.13888 3.45831 5.54175 4.05544 5.54175 4.79165V15.8275L9.56185 12.933C9.82361 12.7445 10.1766 12.7445 10.4383 12.933L14.4584 15.8275V4.79165C14.4584 4.05544 13.8613 3.45831 13.1251 3.45831H6.87508ZM4.04175 4.79165C4.04175 3.22702 5.31045 1.95831 6.87508 1.95831H13.1251C14.6897 1.95831 15.9584 3.22702 15.9584 4.79165V17.2916C15.9584 17.5731 15.8008 17.8309 15.5503 17.9592C15.2998 18.0875 14.9986 18.0647 14.7702 17.9003L10.0001 14.4658L5.22998 17.9003C5.00157 18.0647 4.70032 18.0875 4.44982 17.9592C4.19932 17.8309 4.04175 17.5731 4.04175 17.2916V4.79165Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-bookmark"; }
  static get registryIs() { return "wpp-icon-bookmark-v3-6-0"; }
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

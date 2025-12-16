import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
// @deprecated - this component will be deleted in 4.0.0.
export class WppIconBookmarkFilled {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-bookmark-filled component is deprecated. Please, use wpp-icon-bookmark-selected instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-bookmark-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.87484 1.95837C5.31021 1.95837 4.0415 3.22708 4.0415 4.79171V17.2917C4.0415 17.5732 4.19908 17.8309 4.44958 17.9592C4.70008 18.0875 5.00133 18.0648 5.22973 17.9004L9.99984 14.4659L14.7699 17.9004C14.9983 18.0648 15.2996 18.0875 15.5501 17.9592C15.8006 17.8309 15.9582 17.5732 15.9582 17.2917V4.79171C15.9582 3.22708 14.6895 1.95837 13.1248 1.95837H6.87484Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-bookmark-filled"; }
  static get registryIs() { return "wpp-icon-bookmark-filled-v3-4-0"; }
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

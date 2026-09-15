import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
var DoubleChevronDirectionIconPath;
(function (DoubleChevronDirectionIconPath) {
  DoubleChevronDirectionIconPath["up"] = "M15.2929 10.7071C15.6834 11.0976 16.3166 11.0976 16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289L10.7071 3.29289C10.3166 2.90237 9.68342 2.90237 9.29289 3.29289L3.29289 9.29289C2.90237 9.68342 2.90237 10.3166 3.29289 10.7071C3.68342 11.0976 4.31658 11.0976 4.70711 10.7071L10 5.41421L15.2929 10.7071ZM15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L10.7071 9.29289C10.3166 8.90237 9.68342 8.90237 9.29289 9.29289L3.29289 15.2929C2.90237 15.6834 2.90237 16.3166 3.29289 16.7071C3.68342 17.0976 4.31658 17.0976 4.70711 16.7071L10 11.4142L15.2929 16.7071Z";
  DoubleChevronDirectionIconPath["right"] = "M3.29289 15.2929C2.90237 15.6834 2.90237 16.3166 3.29289 16.7071C3.68342 17.0976 4.31658 17.0976 4.70711 16.7071L10.7071 10.7071C11.0976 10.3166 11.0976 9.68342 10.7071 9.29289L4.70711 3.29289C4.31658 2.90237 3.68342 2.90237 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L8.58579 10L3.29289 15.2929ZM9.29289 15.2929C8.90237 15.6834 8.90237 16.3166 9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289L10.7071 3.29289C10.3166 2.90237 9.68342 2.90237 9.29289 3.29289C8.90237 3.68342 8.90237 4.31658 9.29289 4.70711L14.5858 10L9.29289 15.2929Z";
  DoubleChevronDirectionIconPath["down"] = "M4.70711 3.29289C4.31658 2.90237 3.68342 2.90237 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L9.29289 10.7071C9.68342 11.0976 10.3166 11.0976 10.7071 10.7071L16.7071 4.70711C17.0976 4.31658 17.0976 3.68342 16.7071 3.29289C16.3166 2.90237 15.6834 2.90237 15.2929 3.29289L10 8.58579L4.70711 3.29289ZM4.70711 9.29289C4.31658 8.90237 3.68342 8.90237 3.29289 9.29289C2.90237 9.68342 2.90237 10.3166 3.29289 10.7071L9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289C16.3166 8.90237 15.6834 8.90237 15.2929 9.29289L10 14.5858L4.70711 9.29289Z";
  DoubleChevronDirectionIconPath["left"] = "M10.7071 4.70711C11.0976 4.31658 11.0976 3.68342 10.7071 3.29289C10.3166 2.90237 9.68342 2.90237 9.29289 3.29289L3.29289 9.29289C2.90237 9.68342 2.90237 10.3166 3.29289 10.7071L9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071C11.0976 16.3166 11.0976 15.6834 10.7071 15.2929L5.41421 10L10.7071 4.70711ZM16.7071 4.70711C17.0976 4.31658 17.0976 3.68342 16.7071 3.29289C16.3166 2.90237 15.6834 2.90237 15.2929 3.29289L9.29289 9.29289C8.90237 9.68342 8.90237 10.3166 9.29289 10.7071L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L11.4142 10L16.7071 4.70711Z";
})(DoubleChevronDirectionIconPath || (DoubleChevronDirectionIconPath = {}));
export class WppIconDoubleChevron {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-double-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: DoubleChevronDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-double-chevron"; }
  static get registryIs() { return "wpp-icon-double-chevron-v4-4-0"; }
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
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'up' | 'right' | 'down' | 'left'",
          "resolved": "\"down\" | \"left\" | \"right\" | \"up\"",
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
        "defaultValue": "'right'"
      }
    };
  }
}

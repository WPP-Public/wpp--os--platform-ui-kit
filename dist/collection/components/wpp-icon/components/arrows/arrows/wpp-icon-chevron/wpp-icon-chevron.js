import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
var ChevronDirectionIconPath;
(function (ChevronDirectionIconPath) {
  // @deprecated: top should be removed in 4.0.0 release
  ChevronDirectionIconPath["top"] = "M4 13L10 7L16 13";
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  ChevronDirectionIconPath["up"] = "M4 13L10 7L16 13";
  ChevronDirectionIconPath["right"] = "M8 4L14 10L8 16";
  ChevronDirectionIconPath["down"] = "M16 8L10 14L4 8";
  ChevronDirectionIconPath["left"] = "M12 16L6 10L12 4";
})(ChevronDirectionIconPath || (ChevronDirectionIconPath = {}));
export class WppIconChevron {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ChevronDirectionIconPath[this.direction], stroke: "currentColor", "stroke-width": "2", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get is() { return "wpp-icon-chevron"; }
  static get registryIs() { return "wpp-icon-chevron-v3-4-0"; }
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
          "original": "'top' | 'up' | 'right' | 'down' | 'left'",
          "resolved": "\"down\" | \"left\" | \"right\" | \"top\" | \"up\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon direction."
        },
        "attribute": "direction",
        "reflect": true,
        "defaultValue": "'right'"
      }
    };
  }
}

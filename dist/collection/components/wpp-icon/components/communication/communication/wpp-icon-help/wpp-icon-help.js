import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconArrow {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-help", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.99999 17.7083C14.2572 17.7083 17.7083 14.2572 17.7083 9.99999C17.7083 5.74279 14.2572 2.29166 9.99999 2.29166C5.74279 2.29166 2.29166 5.74279 2.29166 9.99999C2.29166 14.2572 5.74279 17.7083 9.99999 17.7083Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { d: "M9.99999 15C10.4602 15 10.8333 14.6269 10.8333 14.1667C10.8333 13.7064 10.4602 13.3333 9.99999 13.3333C9.53975 13.3333 9.16666 13.7064 9.16666 14.1667C9.16666 14.6269 9.53975 15 9.99999 15Z", fill: "currentColor" }), h("path", { d: "M10 11.4583C10 9.61291 11.875 10.2083 11.875 7.91666C11.875 6.88124 11.0354 6.04166 10 6.04166C8.96458 6.04166 8.125 6.88124 8.125 7.91666V8.12499", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get is() { return "wpp-icon-help"; }
  static get registryIs() { return "wpp-icon-help-v4-1-0"; }
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
          "original": "'right' | 'down'",
          "resolved": "\"down\" | \"right\"",
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

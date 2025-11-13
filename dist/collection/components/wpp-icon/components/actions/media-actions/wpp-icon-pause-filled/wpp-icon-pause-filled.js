import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
/**
 * @internal
 */
export class WppIconPauseFilled {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pause-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.375 2.5C3.33945 2.5 2.5 3.33948 2.5 4.375V15.625C2.5 16.6605 3.33945 17.5 4.375 17.5H6.25C7.28555 17.5 8.125 16.6605 8.125 15.625V4.375C8.125 3.33948 7.28555 2.5 6.25 2.5H4.375ZM13.75 2.5C12.7145 2.5 11.875 3.33948 11.875 4.375V15.625C11.875 16.6605 12.7145 17.5 13.75 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625V4.375C17.5 3.33948 16.6605 2.5 15.625 2.5H13.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-pause-filled"; }
  static get registryIs() { return "wpp-icon-pause-filled-v3-3-1"; }
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

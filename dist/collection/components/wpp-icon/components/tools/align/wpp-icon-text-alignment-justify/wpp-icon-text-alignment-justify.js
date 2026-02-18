import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconTextAlignmentJustify {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-text-alignment-justify", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2 4.25C2 3.83579 2.33579 3.5 2.75 3.5H17.25C17.6642 3.5 18 3.83579 18 4.25C18 4.66421 17.6642 5 17.25 5H2.75C2.33579 5 2 4.66421 2 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM2.75 13.5C2.33579 13.5 2 13.8358 2 14.25C2 14.6642 2.33579 15 2.75 15H17.25C17.6642 15 18 14.6642 18 14.25C18 13.8358 17.6642 13.5 17.25 13.5H2.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-text-alignment-justify"; }
  static get registryIs() { return "wpp-icon-text-alignment-justify-v3-5-0"; }
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

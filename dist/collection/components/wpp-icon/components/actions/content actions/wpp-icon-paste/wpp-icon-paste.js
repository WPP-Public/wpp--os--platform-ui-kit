import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconPaste {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-paste", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.91691 4.29163H5.20837C4.93217 4.29163 4.70837 4.51542 4.70837 4.79163V16.0416C4.70837 16.3178 4.93217 16.5416 5.20837 16.5416H14.7917C15.0679 16.5416 15.2917 16.3178 15.2917 16.0416V4.79163C15.2917 4.51542 15.0679 4.29163 14.7917 4.29163H13.083C12.72 4.79635 12.1275 5.125 11.4583 5.125H8.54163C7.87238 5.125 7.27995 4.79635 6.91691 4.29163ZM13.4306 2.79163H14.7917C15.8963 2.79163 16.7917 3.687 16.7917 4.79163V16.0416C16.7917 17.1463 15.8963 18.0416 14.7917 18.0416H5.20837C4.10374 18.0416 3.20837 17.1463 3.20837 16.0416V4.79163C3.20837 3.687 4.10374 2.79163 5.20837 2.79163H6.56928C6.72798 1.8457 7.55058 1.125 8.54163 1.125H11.4583C12.4493 1.125 13.2719 1.8457 13.4306 2.79163ZM8.04163 3.125C8.04163 2.8488 8.26542 2.625 8.54163 2.625H11.4583C11.7345 2.625 11.9583 2.8488 11.9583 3.125C11.9583 3.4012 11.7345 3.625 11.4583 3.625H8.54163C8.26542 3.625 8.04163 3.4012 8.04163 3.125Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-paste"; }
  static get registryIs() { return "wpp-icon-paste-v3-4-0"; }
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

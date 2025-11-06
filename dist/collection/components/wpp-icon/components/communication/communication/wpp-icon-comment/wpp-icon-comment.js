import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconComment {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-comment", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.37496 4.29163C3.63876 4.29163 3.04163 4.88876 3.04163 5.62496V12.7083C3.04163 13.4445 3.63876 14.0416 4.37496 14.0416H5.62496C6.03917 14.0416 6.37496 14.3774 6.37496 14.7916V17.0416L10.175 14.1916C10.3048 14.0943 10.4627 14.0416 10.625 14.0416H15.625C16.3612 14.0416 16.9583 13.4445 16.9583 12.7083V5.62496C16.9583 4.88876 16.3612 4.29163 15.625 4.29163H4.37496ZM1.54163 5.62496C1.54163 4.06033 2.81033 2.79163 4.37496 2.79163H15.625C17.1896 2.79163 18.4583 4.06033 18.4583 5.62496V12.7083C18.4583 14.2729 17.1896 15.5416 15.625 15.5416H10.875L6.74163 18.6416L6.74148 18.6417C5.97295 19.2178 4.87496 18.6702 4.87496 17.7083V15.5416H4.37496C2.81033 15.5416 1.54163 14.2729 1.54163 12.7083V5.62496Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-comment"; }
  static get registryIs() { return "wpp-icon-comment-v2-22-0"; }
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

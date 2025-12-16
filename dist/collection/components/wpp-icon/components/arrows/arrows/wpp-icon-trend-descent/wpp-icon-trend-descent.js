import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconTrendDescent {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-trend-descent", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.9887 5.92798C1.69581 5.63509 1.22094 5.63509 0.928044 5.92798C0.635151 6.22088 0.635151 6.69575 0.928044 6.98864L6.76138 12.822C7.05427 13.1149 7.52914 13.1149 7.82204 12.822L12.2917 8.35231L16.7311 12.7917H14.7916C14.3774 12.7917 14.0416 13.1275 14.0416 13.5417C14.0416 13.9559 14.3774 14.2917 14.7916 14.2917H18.5416C18.9558 14.2917 19.2916 13.9559 19.2916 13.5417V9.79169C19.2916 9.37747 18.9558 9.04169 18.5416 9.04169C18.1274 9.04169 17.7916 9.37747 17.7916 9.79169V11.7309L12.822 6.76132C12.5291 6.46842 12.0543 6.46842 11.7614 6.76132L7.29171 11.231L1.9887 5.92798Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-trend-descent"; }
  static get registryIs() { return "wpp-icon-trend-descent-v3-4-0"; }
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

import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconLockOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-lock-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.29175 7.2915C7.29175 7.2915 7.29175 6.49567 7.29175 4.99984C7.29175 3.504 8.50425 2.2915 10.0001 2.2915C11.4959 2.2915 12.7084 3.504 12.7084 4.99984C12.7084 5.82484 12.7084 7.2915 12.7084 7.2915", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10" }), h("path", { d: "M14.7916 17.7082H5.20825C4.51784 17.7082 3.95825 17.1486 3.95825 16.4582V8.5415C3.95825 7.85109 4.51784 7.2915 5.20825 7.2915H14.7916C15.482 7.2915 16.0416 7.85109 16.0416 8.5415V16.4582C16.0416 17.1486 15.482 17.7082 14.7916 17.7082Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10" }), h("path", { d: "M10 13.75C10.6904 13.75 11.25 13.1904 11.25 12.5C11.25 11.8096 10.6904 11.25 10 11.25C9.30964 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 9.30964 13.75 10 13.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-lock-on"; }
  static get registryIs() { return "wpp-icon-lock-on-v2-22-0"; }
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

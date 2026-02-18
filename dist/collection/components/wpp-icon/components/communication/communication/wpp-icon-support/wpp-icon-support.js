import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSupport {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-support", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.8481 17.6689L15.9692 17.6807C16.2428 17.7365 16.4487 17.9785 16.4487 18.2686C16.4487 18.5586 16.2428 18.8006 15.9692 18.8564L15.8481 18.8682H4.15186C3.82048 18.8682 3.55225 18.5999 3.55225 18.2686C3.55225 17.9372 3.82048 17.6689 4.15186 17.6689H15.8481Z", fill: "currentColor" }), h("path", { d: "M10.5996 18.2688L10.5879 18.3899C10.5318 18.6631 10.2898 18.8684 10 18.8684C9.71019 18.8684 9.4682 18.6631 9.41211 18.3899L9.40039 18.2688V15.3401C9.40039 15.0087 9.66863 14.7405 10 14.7405C10.3314 14.7405 10.5996 15.0087 10.5996 15.3401V18.2688Z", fill: "currentColor" }), h("path", { d: "M16.2812 8.41284C16.2812 4.9438 13.469 2.13159 10 2.13159C6.53096 2.13159 3.71875 4.9438 3.71875 8.41284C3.71875 11.8819 6.53096 14.6941 10 14.6941V15.6941C5.97868 15.6941 2.71875 12.4342 2.71875 8.41284C2.71875 4.39152 5.97868 1.13159 10 1.13159C14.0213 1.13159 17.2812 4.39152 17.2812 8.41284C17.2812 12.4342 14.0213 15.6941 10 15.6941V14.6941C13.469 14.6941 16.2812 11.8819 16.2812 8.41284Z", fill: "currentColor" }), h("path", { d: "M13.2446 8.41321C13.2446 6.6213 11.7923 5.16829 10.0005 5.16809C8.20846 5.16809 6.75537 6.62118 6.75537 8.41321C6.75557 10.2051 8.20858 11.6573 10.0005 11.6573V12.6573L9.78174 12.6525C7.61116 12.5425 5.87112 10.8016 5.76123 8.63098L5.75537 8.41321C5.75537 6.0689 7.65618 4.16809 10.0005 4.16809L10.2183 4.17395C12.4612 4.2875 14.2446 6.14206 14.2446 8.41321L14.2397 8.63098C14.1262 10.8738 12.2715 12.6572 10.0005 12.6573V11.6573C11.7922 11.6572 13.2444 10.2049 13.2446 8.41321Z", fill: "currentColor" }), h("path", { d: "M14.1064 3.46081L14.8135 4.16792L13.0596 5.92188L12.3525 5.21477L14.1064 3.46081Z", fill: "currentColor" }), h("path", { d: "M6.80222 5.75232L7.50933 5.04522L5.75537 3.29126L5.04826 3.99837L6.80222 5.75232Z", fill: "currentColor" }), h("path", { d: "M5.58547 13.3649L4.87837 12.6578L6.63232 10.9038L7.33943 11.6109L5.58547 13.3649Z", fill: "currentColor" }), h("path", { d: "M14.415 13.3649L15.1221 12.6578L13.3682 10.9038L12.6611 11.6109L14.415 13.3649Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-support"; }
  static get registryIs() { return "wpp-icon-support-v3-5-0"; }
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

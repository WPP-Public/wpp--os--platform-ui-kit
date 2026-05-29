import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCast {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cast", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2 5.39961C2 4.4055 2.80589 3.59961 3.8 3.59961H16.2C17.1941 3.59961 18 4.4055 18 5.39961V14.5996C18 15.5937 17.1941 16.3996 16.2 16.3996H3.8C2.80589 16.3996 2 15.5937 2 14.5996V5.39961ZM3.8 4.79961C3.46863 4.79961 3.2 5.06824 3.2 5.39961V14.5996C3.2 14.931 3.46863 15.1996 3.8 15.1996H16.2C16.5314 15.1996 16.8 14.931 16.8 14.5996V5.39961C16.8 5.06824 16.5314 4.79961 16.2 4.79961H3.8ZM5.99672 13.196C5.99672 13.6369 5.63928 13.9943 5.19836 13.9943C4.75744 13.9943 4.4 13.6369 4.4 13.196C4.4 12.7551 4.75744 12.3976 5.19836 12.3976C5.63928 12.3976 5.99672 12.7551 5.99672 13.196ZM4.39664 10.6001C4.39664 10.2687 4.66527 10.0001 4.99664 10.0001C6.8731 10.0001 8.39427 11.5212 8.39427 13.3977C8.39427 13.7291 8.12564 13.9977 7.79427 13.9977C7.4629 13.9977 7.19427 13.7291 7.19427 13.3977C7.19427 12.184 6.21036 11.2001 4.99664 11.2001C4.66527 11.2001 4.39664 10.9314 4.39664 10.6001ZM4.39664 8.19465C4.39664 7.86327 4.66527 7.59465 4.99664 7.59465C8.20157 7.59465 10.7997 10.1928 10.7997 13.3977C10.7997 13.7291 10.5311 13.9977 10.1997 13.9977C9.86831 13.9977 9.59968 13.7291 9.59968 13.3977C9.59968 10.8555 7.53883 8.79465 4.99664 8.79465C4.66527 8.79465 4.39664 8.52602 4.39664 8.19465Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-cast"; }
  static get registryIs() { return "wpp-icon-cast-v4-1-0"; }
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

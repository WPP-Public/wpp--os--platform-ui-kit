import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconGallery {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-gallery", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.3596 7.66377C11.8958 7.66377 12.3304 7.22913 12.3304 6.69298C12.3304 6.15683 11.8958 5.7222 11.3596 5.7222C10.8235 5.7222 10.3888 6.15683 10.3888 6.69298C10.3888 7.22913 10.8235 7.66377 11.3596 7.66377ZM5.52775 3C4.13171 3 3 4.13171 3 5.52775V12.5277C3 13.9237 4.13171 15.0554 5.52775 15.0554H12.5277C13.9237 15.0554 15.0554 13.9237 15.0554 12.5277V5.52775C15.0554 4.13171 13.9237 3 12.5277 3H5.52775ZM4.16666 5.52775C4.16666 4.77604 4.77604 4.16666 5.52775 4.16666H12.5277C13.2794 4.16666 13.8888 4.77604 13.8888 5.52775V12.5277C13.8888 12.7075 13.8539 12.8791 13.7906 13.0362L10.2229 9.69877C9.55016 9.06942 8.50468 9.06942 7.83192 9.69877L4.26467 13.0358C4.20145 12.8788 4.16666 12.7073 4.16666 12.5277V5.52775ZM9.42592 10.5507L12.9297 13.8284C12.8026 13.8677 12.6676 13.8888 12.5277 13.8888H5.52775C5.38764 13.8888 5.25247 13.8676 5.12528 13.8283L8.62892 10.5507C8.85317 10.341 9.20167 10.341 9.42592 10.5507ZM7.47214 17C6.57718 17 5.79084 16.5349 5.34167 15.8332H7.4523L7.47214 15.8333H12.9165C14.5274 15.8333 15.8332 14.5275 15.8332 12.9167V5.34193C16.5348 5.79112 16.9998 6.57741 16.9998 7.47231V12.9167C16.9998 15.1718 15.1717 17 12.9165 17H7.47214Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-gallery"; }
  static get registryIs() { return "wpp-icon-gallery-v2-22-0"; }
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

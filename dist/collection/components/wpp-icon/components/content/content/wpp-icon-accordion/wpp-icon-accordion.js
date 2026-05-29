import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconAccordion {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-accordion", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.03033 8.46967C7.73744 8.17678 7.26256 8.17678 6.96967 8.46967C6.67678 8.76256 6.67678 9.23744 6.96967 9.53033L9.46967 12.0303C9.76256 12.3232 10.2374 12.3232 10.5303 12.0303L13.0303 9.53033C13.3232 9.23744 13.3232 8.76256 13.0303 8.46967C12.7374 8.17678 12.2626 8.17678 11.9697 8.46967L10 10.4393L8.03033 8.46967Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 13.5C2 15.0188 3.23122 16.25 4.75 16.25L15.25 16.25C16.7688 16.25 18 15.0188 18 13.5V6.5C18 4.98122 16.7688 3.75 15.25 3.75H4.75C3.23122 3.75 2 4.98122 2 6.5V13.5ZM4.75 14.75C4.05964 14.75 3.5 14.1904 3.5 13.5L3.5 6.5C3.5 5.80965 4.05964 5.25 4.75 5.25L15.25 5.25C15.9404 5.25 16.5 5.80964 16.5 6.5V13.5C16.5 14.1904 15.9404 14.75 15.25 14.75L4.75 14.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-accordion"; }
  static get registryIs() { return "wpp-icon-accordion-v4-1-0"; }
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

import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataLine {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-line", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.6 3.9998C14.9373 3.9998 14.4 4.53706 14.4 5.1998C14.4 5.86255 14.9373 6.3998 15.6 6.3998C16.2627 6.3998 16.8 5.86255 16.8 5.1998C16.8 4.53706 16.2627 3.9998 15.6 3.9998ZM13.2 5.1998C13.2 3.87432 14.2745 2.7998 15.6 2.7998C16.9255 2.7998 18 3.87432 18 5.1998C18 6.52529 16.9255 7.5998 15.6 7.5998C15.4706 7.5998 15.3435 7.58956 15.2197 7.56984L13.5892 10.2566C13.8485 10.6399 14 11.1021 14 11.5998C14 12.9253 12.9255 13.9998 11.6 13.9998C10.8777 13.9998 10.2299 13.6807 9.78996 13.1758L6.79667 14.6722C6.79888 14.7145 6.8 14.757 6.8 14.7998C6.8 16.1253 5.72548 17.1998 4.4 17.1998C3.07452 17.1998 2 16.1253 2 14.7998C2 13.4743 3.07452 12.3998 4.4 12.3998C5.25293 12.3998 6.00194 12.8447 6.4276 13.5152L9.25279 12.1028C9.2182 11.9406 9.2 11.7723 9.2 11.5998C9.2 10.2743 10.2745 9.1998 11.6 9.1998C11.9858 9.1998 12.3504 9.29085 12.6734 9.45262L14.1116 7.08267C13.5563 6.64309 13.2 5.96306 13.2 5.1998ZM11.6 10.3998C10.9373 10.3998 10.4 10.9371 10.4 11.5998C10.4 12.2625 10.9373 12.7998 11.6 12.7998C12.2627 12.7998 12.8 12.2625 12.8 11.5998C12.8 10.9371 12.2627 10.3998 11.6 10.3998ZM4.4 13.5998C3.73726 13.5998 3.2 14.1371 3.2 14.7998C3.2 15.4625 3.73726 15.9998 4.4 15.9998C5.06274 15.9998 5.6 15.4625 5.6 14.7998C5.6 14.1371 5.06274 13.5998 4.4 13.5998Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-line"; }
  static get registryIs() { return "wpp-icon-data-line-v4-1-0"; }
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

import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconWrapOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-wrap-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L3.12627 3.83337C3.04651 3.95254 3 4.09584 3 4.25C3 4.66421 3.33579 5 3.75 5H4.29289L7.79289 8.5H6.25C4.45507 8.5 3 9.95507 3 11.75C3 13.5449 4.45508 15 6.25 15H14.2929L15.0012 15.7083C14.9898 15.9139 15.0626 16.1233 15.2197 16.2803C15.3767 16.4374 15.5861 16.5102 15.7917 16.4988L17.1464 17.8536C17.3417 18.0488 17.6583 18.0488 17.8536 17.8536C18.0488 17.6583 18.0488 17.3417 17.8536 17.1464L2.85355 2.14645ZM12.7929 13.5H6.25C5.2835 13.5 4.5 12.7165 4.5 11.75C4.5 10.7835 5.2835 10 6.25 10H9.29289L12.7929 13.5Z", fill: "currentColor" }), h("path", { d: "M13.75 8.5H10.6213L12.1213 10H13.75C15.5449 10 17 8.54493 17 6.75C17 4.95507 15.5449 3.5 13.75 3.5H5.62134L7.12134 5H13.75C14.7165 5 15.5 5.7835 15.5 6.75C15.5 7.7165 14.7165 8.5 13.75 8.5Z", fill: "currentColor" }), h("path", { d: "M17.341 15.2197L15.0135 12.8922C14.9682 12.6561 15.0369 12.4025 15.2197 12.2197C15.5126 11.9268 15.9874 11.9268 16.2803 12.2197L17.7803 13.7197C18.0732 14.0126 18.0732 14.4874 17.7803 14.7803L17.341 15.2197Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-wrap-off"; }
  static get registryIs() { return "wpp-icon-wrap-off-v4-1-0"; }
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

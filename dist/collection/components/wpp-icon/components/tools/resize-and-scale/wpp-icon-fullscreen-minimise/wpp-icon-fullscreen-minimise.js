import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconFullscreenMinimise {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-fullscreen-minimise", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.08333 3.125C7.08333 2.77982 6.80351 2.5 6.45833 2.5C6.11316 2.5 5.83333 2.77982 5.83333 3.125V5.20833C5.83333 5.55351 5.55351 5.83333 5.20833 5.83333H3.125C2.77982 5.83333 2.5 6.11316 2.5 6.45833C2.5 6.80351 2.77982 7.08333 3.125 7.08333H5.20833C6.24387 7.08333 7.08333 6.24387 7.08333 5.20833V3.125ZM7.08333 16.875C7.08333 17.2202 6.80351 17.5 6.45833 17.5C6.11316 17.5 5.83333 17.2202 5.83333 16.875V14.7917C5.83333 14.4465 5.55351 14.1667 5.20833 14.1667H3.125C2.77982 14.1667 2.5 13.8868 2.5 13.5417C2.5 13.1965 2.77982 12.9167 3.125 12.9167H5.20833C6.24387 12.9167 7.08333 13.7561 7.08333 14.7917V16.875ZM13.5417 2.5C13.1965 2.5 12.9167 2.77982 12.9167 3.125V5.20833C12.9167 6.24387 13.7561 7.08333 14.7917 7.08333H16.875C17.2202 7.08333 17.5 6.80351 17.5 6.45833C17.5 6.11316 17.2202 5.83333 16.875 5.83333H14.7917C14.4465 5.83333 14.1667 5.55351 14.1667 5.20833V3.125C14.1667 2.77982 13.8868 2.5 13.5417 2.5ZM12.9167 16.875C12.9167 17.2202 13.1965 17.5 13.5417 17.5C13.8868 17.5 14.1667 17.2202 14.1667 16.875V14.7917C14.1667 14.4465 14.4465 14.1667 14.7917 14.1667H16.875C17.2202 14.1667 17.5 13.8868 17.5 13.5417C17.5 13.1965 17.2202 12.9167 16.875 12.9167H14.7917C13.7561 12.9167 12.9167 13.7561 12.9167 14.7917V16.875Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-fullscreen-minimise"; }
  static get registryIs() { return "wpp-icon-fullscreen-minimise-v3-4-0"; }
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

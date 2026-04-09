import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconUserTag {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-user-tag", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.39817 2C10.6077 2 12.3989 3.79118 12.3989 6.00071C12.3989 8.21024 10.6077 10.0014 8.39817 10.0014C6.18864 10.0014 4.39746 8.21024 4.39746 6.00071C4.39746 3.79118 6.18864 2 8.39817 2ZM8.39817 3.20021C6.8515 3.20021 5.59767 4.45404 5.59767 6.00071C5.59767 7.54738 6.8515 8.80121 8.39817 8.80121C9.94484 8.80121 11.1987 7.54738 11.1987 6.00071C11.1987 4.45404 9.94484 3.20021 8.39817 3.20021Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.7957 18.5142L9.55689 15.2176C9.26001 14.9155 9.09375 14.5094 9.09375 14.0866V11.7094C9.09375 10.8173 9.81904 10.0941 10.7143 10.0935L13.0762 10.0918C13.5036 10.0915 13.9138 10.2593 14.2179 10.5587L17.5179 13.8083C18.1568 14.4374 18.1611 15.464 17.5277 16.0982L15.1046 18.524C14.4669 19.1625 13.4283 19.1581 12.7957 18.5142ZM11.5198 13.3299C11.9664 13.3299 12.3284 12.9674 12.3284 12.5203C12.3284 12.0732 11.9664 11.7108 11.5198 11.7108C11.0732 11.7108 10.7112 12.0732 10.7112 12.5203C10.7112 12.9674 11.0732 13.3299 11.5198 13.3299Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.3983 16.7998C8.83648 16.7998 9.25 16.7759 9.63923 16.7283L10.6618 17.7691C9.97269 17.9233 9.21765 18 8.3983 18C5.88117 18 3.97202 17.2757 2.71875 15.8081C2.25486 15.2648 2 14.5739 2 13.8596V13.3974C2 12.4036 2.80563 11.5979 3.79942 11.5979H8.09608C8.09453 11.6349 8.09375 11.6721 8.09375 11.7094V12.7981H3.79942C3.46849 12.7981 3.20021 13.0664 3.20021 13.3974V13.8596C3.20021 14.2882 3.35313 14.7027 3.63146 15.0287C4.63429 16.203 6.20727 16.7998 8.3983 16.7998Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-user-tag"; }
  static get registryIs() { return "wpp-icon-user-tag-v3-6-0"; }
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

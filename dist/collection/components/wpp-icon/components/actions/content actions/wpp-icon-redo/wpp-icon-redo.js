import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRedo {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-redo", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9 6C8.94015 5.99788 9.06037 6 9 6C9.02294 5.99789 9.22651 6 9.25 6H13.6434L11.3754 3.73202C11.0825 3.43913 11.0825 2.96425 11.3754 2.67136C11.6683 2.37847 12.1432 2.37847 12.4361 2.67136L15.789 6.02427C15.963 6.19831 16.0337 6.43661 16.0009 6.6628C15.9821 6.82493 15.9106 6.98212 15.7862 7.10649L12.5391 10.3536C12.2462 10.6465 11.7714 10.6465 11.4785 10.3536C11.1856 10.0607 11.1856 9.5858 11.4785 9.29291L13.2714 7.5H9C7.067 7.5 5.5 9.067 5.5 11C5.5 12.933 7.067 14.5 9 14.5H13.25C13.6642 14.5 14 14.8358 14 15.25C14 15.6642 13.6642 16 13.25 16H9.25C9.22651 16 9 16 9 16C6.23858 16 4 13.7614 4 11C4 8.23858 6.23858 6 9 6Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-redo"; }
  static get registryIs() { return "wpp-icon-redo-v3-4-0"; }
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

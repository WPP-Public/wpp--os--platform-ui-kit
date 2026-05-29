import { Host, h } from '@stencil/core';
export class WppHandle {
  constructor() {
    this.getHostClasses = () => ({
      'wpp-handle': true,
      'wpp-selected-handle': this.isSelected,
      [`wpp-handle-${this.type}`]: true,
      'wpp-loading-handle': this.isLoading,
    });
    this.type = undefined;
    this.isSelected = undefined;
    this.isLoading = false;
    this.color = 'var(--wpp-grey-color-600)';
  }
  render() {
    return h(Host, { class: this.getHostClasses(), style: { backgroundColor: this.color } });
  }
  static get is() { return "wpp-handle"; }
  static get registryIs() { return "wpp-handle-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-handle.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-handle.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CustomHandleType",
          "resolved": "\"source\" | \"target\"",
          "references": {
            "CustomHandleType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-handle/types.ts::CustomHandleType"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the type of the WppHandle. Setting this property will help to position the handle on the center of the border.\nTarget handles are placed on the left of the Node, while source handles are placed on the right."
        },
        "attribute": "type",
        "reflect": false
      },
      "isSelected": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines if the WppHandle is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow.\nSetting this value will help positioning the Handle on the center of the border when it's selected."
        },
        "attribute": "is-selected",
        "reflect": false
      },
      "isLoading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "This property helps to position the WppHandle on the center of the board when the Node is in loading state."
        },
        "attribute": "is-loading",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the background color of the handle. Only colours from the theme should be used."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-grey-color-600)'"
      }
    };
  }
}

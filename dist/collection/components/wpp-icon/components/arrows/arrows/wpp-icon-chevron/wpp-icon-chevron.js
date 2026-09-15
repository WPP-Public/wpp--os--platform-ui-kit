import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
const CHEVRON_ICON_PATH = 'M5.20921 7.21967C5.48816 6.92678 5.94042 6.92678 6.21936 7.21967L10 11.1893L13.7806 7.21967C14.0596 6.92678 14.5118 6.92678 14.7908 7.21967C15.0697 7.51256 15.0697 7.98744 14.7908 8.28033L10.5051 12.7803C10.2261 13.0732 9.77387 13.0732 9.49492 12.7803L5.20921 8.28033C4.93026 7.98744 4.93026 7.51256 5.20921 7.21967Z';
const ChevronDirectionTransform = {
  up: 'rotate(180 10 10)',
  right: 'rotate(-90 10 10)',
  down: undefined,
  left: 'rotate(90 10 10)',
};
export class WppIconChevron {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: CHEVRON_ICON_PATH, fill: "currentColor", transform: ChevronDirectionTransform[this.direction] })));
  }
  static get is() { return "wpp-icon-chevron"; }
  static get registryIs() { return "wpp-icon-chevron-v4-4-0"; }
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
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'up' | 'right' | 'down' | 'left'",
          "resolved": "\"down\" | \"left\" | \"right\" | \"up\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon direction."
        },
        "attribute": "direction",
        "reflect": true,
        "defaultValue": "'right'"
      }
    };
  }
}

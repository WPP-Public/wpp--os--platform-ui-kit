import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconEyedropper {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-eyedropper", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M17.1648 2.83507C16.0514 1.72164 14.2461 1.72164 13.1327 2.83507L11.5634 4.40443L11.5533 4.39442C11.0088 3.8499 10.126 3.8499 9.58149 4.39442L9.11476 4.86115C8.57024 5.40566 8.57024 6.2885 9.11476 6.83301L9.12482 6.84308L3.72264 12.2453C3.38644 12.5815 3.19757 13.0374 3.19757 13.5129V14.0606L2.17747 15.9308C1.51137 17.152 2.84802 18.4886 4.06921 17.8225L5.93939 16.8024H6.48711C6.96256 16.8024 7.41854 16.6136 7.75474 16.2774L13.1569 10.8752L13.1669 10.8851C13.7114 11.4296 14.5942 11.4296 15.1387 10.8851L15.6055 10.4184C16.15 9.87388 16.15 8.99105 15.6055 8.44654L15.5955 8.43653L17.1648 6.86717C18.2782 5.75374 18.2782 3.94851 17.1648 2.83507ZM13.9778 3.68016C14.6245 3.03345 15.673 3.03345 16.3197 3.68016C16.9664 4.32686 16.9664 5.37538 16.3197 6.02209L14.3278 8.01398C14.0945 8.24735 14.0945 8.6257 14.3278 8.85907L14.7604 9.29162C14.8382 9.36941 14.8382 9.49553 14.7604 9.57331L14.2937 10.04C14.2159 10.1178 14.0897 10.1178 14.012 10.04L9.95984 5.98793C9.88205 5.91014 9.88205 5.78402 9.95984 5.70623L10.4266 5.2395C10.5044 5.16172 10.6305 5.16171 10.7083 5.2395L11.1408 5.67206C11.3742 5.90542 11.7525 5.90542 11.9859 5.67206L13.9778 3.68016ZM12.3118 10.0301L6.90965 15.4323C6.79759 15.5443 6.64559 15.6073 6.48711 15.6073H5.78702C5.68704 15.6073 5.58865 15.6324 5.50087 15.6803L3.49692 16.7733C3.44184 16.8034 3.40092 16.8047 3.37036 16.7993C3.33472 16.793 3.29492 16.7735 3.26069 16.7393C3.22645 16.7051 3.20699 16.6653 3.20069 16.6296C3.19528 16.5991 3.19662 16.5582 3.22667 16.5031L4.31974 14.4991C4.36761 14.4114 4.3927 14.313 4.3927 14.213V13.5129C4.3927 13.3544 4.45566 13.2024 4.56772 13.0903L9.96991 7.68816L12.3118 10.0301Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-eyedropper"; }
  static get registryIs() { return "wpp-icon-eyedropper-v3-3-1"; }
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

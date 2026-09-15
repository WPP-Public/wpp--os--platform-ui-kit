import { h } from '@stencil/core';
import { EmptyStateGraphic } from '../../../lottie/empty-state-graphic';
import { EmptyStateGraphicView } from '../../../lottie/EmptyStateGraphicView';
export class WppEmptyCards {
  constructor() {
    this.graphic = new EmptyStateGraphic('wpp-empty-cards');
    this.width = undefined;
    this.height = undefined;
  }
  connectedCallback() {
    this.graphic.connect(this.host);
  }
  disconnectedCallback() {
    this.graphic.disconnect();
  }
  render() {
    return (h(EmptyStateGraphicView, { graphic: this.graphic, name: "wpp-empty-cards", width: this.width, height: this.height }));
  }
  static get is() { return "wpp-empty-cards"; }
  static get registryIs() { return "wpp-empty-cards-v4-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-image.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-image.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Defines the image width and changes its default size. If you use `width` only, the image width and height will be the same."
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
          "text": "Defines the image height and changes its default size. If you use `height` only, the image width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      }
    };
  }
  static get elementRef() { return "host"; }
}

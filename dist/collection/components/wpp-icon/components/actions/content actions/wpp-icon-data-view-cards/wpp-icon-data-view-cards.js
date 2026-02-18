import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataViewCards {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-view-cards", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.5 4C2.5 3.17157 3.17157 2.5 4 2.5H7.72414C8.55256 2.5 9.22414 3.17157 9.22414 4V7.72414C9.22414 8.55256 8.55256 9.22414 7.72414 9.22414H4C3.17157 9.22414 2.5 8.55256 2.5 7.72414V4ZM4 4H7.72414L7.72414 7.72414L4 7.72414L4 4Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.5 12.2759C2.5 11.4474 3.17157 10.7759 4 10.7759H7.72414C8.55256 10.7759 9.22414 11.4474 9.22414 12.2759V16C9.22414 16.8284 8.55256 17.5 7.72414 17.5H4C3.17157 17.5 2.5 16.8284 2.5 16V12.2759ZM4 12.2759H7.72414L7.72414 16L4 16L4 12.2759Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.2759 2.5C11.4474 2.5 10.7759 3.17157 10.7759 4V7.72414C10.7759 8.55256 11.4474 9.22414 12.2759 9.22414H16C16.8284 9.22414 17.5 8.55256 17.5 7.72414V4C17.5 3.17157 16.8284 2.5 16 2.5H12.2759ZM16 4H12.2759V7.72414L16 7.72414L16 4Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.7759 12.2759C10.7759 11.4474 11.4474 10.7759 12.2759 10.7759H16C16.8284 10.7759 17.5 11.4474 17.5 12.2759V16C17.5 16.8284 16.8284 17.5 16 17.5H12.2759C11.4474 17.5 10.7759 16.8284 10.7759 16V12.2759ZM12.2759 12.2759H16L16 16L12.2759 16V12.2759Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-view-cards"; }
  static get registryIs() { return "wpp-icon-data-view-cards-v4-0-0"; }
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

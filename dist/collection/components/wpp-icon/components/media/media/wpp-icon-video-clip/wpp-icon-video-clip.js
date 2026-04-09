import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconVideoClip {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-video-clip", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8 7.90744V12.0928C8 12.5484 8.48794 12.8378 8.88778 12.6192L12.7167 10.5263C13.133 10.2988 13.133 9.70088 12.7166 9.47336L8.88773 7.38093C8.48789 7.16243 8 7.4518 8 7.90744ZM4.6 2.7998C3.16406 2.7998 2 3.96386 2 5.3998V14.5998C2 16.0357 3.16406 17.1998 4.6 17.1998H15.4C16.8359 17.1998 18 16.0357 18 14.5998V5.3998C18 3.96386 16.8359 2.7998 15.4 2.7998H4.6ZM3.2 5.3998C3.2 4.62661 3.8268 3.9998 4.6 3.9998H15.4C16.1732 3.9998 16.8 4.62661 16.8 5.3998V14.5998C16.8 15.373 16.1732 15.9998 15.4 15.9998H4.6C3.8268 15.9998 3.2 15.373 3.2 14.5998V5.3998Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-video-clip"; }
  static get registryIs() { return "wpp-icon-video-clip-v3-6-0"; }
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

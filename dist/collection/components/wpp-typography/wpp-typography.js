import { h, Host } from '@stencil/core';
/**
 * @part typography - Main content wrapper element
 * @part inner - Content slot element
 */
export class WppTypography {
  constructor() {
    this.typographyCssClasses = () => ({
      typography: true,
      italic: this.type.includes('emphasis'),
      [`type-${this.type.split('-')[0]}`]: true,
      [`wpp-typography-${this.type}`]: true,
    });
    this.type = 'm-body';
    this.tag = 'span';
    this.color = 'var(--wpp-text-color)';
  }
  render() {
    const TypographyTag = this.tag;
    return (h(Host, { class: "wpp-typography", exportparts: "typography, inner", style: { '--typography-color': this.color } }, h(TypographyTag, { class: this.typographyCssClasses(), part: "typography", exportparts: "typography" }, h("slot", { part: "inner" }))));
  }
  static get is() { return "wpp-typography"; }
  static get registryIs() { return "wpp-typography-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-typography.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-typography.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TypographyType",
          "resolved": "\"5xl-display\" | \"5xl-display-light\" | \"5xl-display-strong\" | \"5xl-display-emphasis\" | \"4xl-display\" | \"4xl-display-light\" | \"4xl-display-strong\" | \"4xl-display-emphasis\" | \"3xl-heading\" | \"3xl-heading-light\" | \"3xl-heading-strong\" | \"3xl-heading-emphasis\" | \"2xl-heading\" | \"2xl-heading-light\" | \"2xl-heading-strong\" | \"2xl-heading-emphasis\" | \"xl-heading\" | \"xl-heading-light\" | \"xl-heading-strong\" | \"xl-heading-emphasis\" | \"l-strong\" | \"l-midi\" | \"l-body\" | \"l-light\" | \"l-emphasis\" | \"m-strong\" | \"m-midi\" | \"m-body\" | \"m-light\" | \"m-emphasis\" | \"s-strong\" | \"s-midi\" | \"s-body\" | \"s-light\" | \"s-emphasis\" | \"xs-strong\" | \"xs-midi\" | \"xs-body\" | \"xs-light\" | \"xs-emphasis\" | \"2xs-strong\"",
          "references": {
            "TypographyType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-typography/types.ts::TypographyType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the typography style."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'m-body'"
      },
      "tag": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
          "resolved": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | \"p\" | \"span\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the typography semantic tag."
        },
        "attribute": "tag",
        "reflect": false,
        "defaultValue": "'span'"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Color",
          "resolved": "`var(--wpp-${string})`",
          "references": {
            "Color": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-typography/types.ts::Color"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the text color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-text-color)'"
      }
    };
  }
  static get elementRef() { return "host"; }
}

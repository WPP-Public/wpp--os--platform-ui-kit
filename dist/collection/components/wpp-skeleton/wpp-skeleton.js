import { Host, h } from '@stencil/core';
export class WppSkeleton {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-skeleton': true,
      [`wpp-${this.variant}`]: true,
      'wpp-animated': true,
    });
    this.getSizeWithDimension = (initialValue) => String(initialValue || '').replace(/^(\d+)(\S+)?$/, (...match) => match[1] + (match[2] || 'px'));
    this.variant = 'rectangle';
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const style = {
      '--skeleton-width': this.getSizeWithDimension(this.width),
      '--skeleton-height': this.getSizeWithDimension(this.height),
    };
    return h(Host, { class: this.hostCssClasses(), style: style, "aria-hidden": "true" });
  }
  static get is() { return "wpp-skeleton"; }
  static get registryIs() { return "wpp-skeleton-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-skeleton.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-skeleton.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'rectangle' | 'circle'",
          "resolved": "\"circle\" | \"rectangle\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the skeleton variant"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'rectangle'"
      },
      "width": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Width of skeleton, if width is not passed, then it use default values. For rectangle it's 240px, for circle - 80px"
        },
        "attribute": "width",
        "reflect": false
      },
      "height": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "string | number",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Height of skeleton, if width is not passed, then it use default value - 80px"
        },
        "attribute": "height",
        "reflect": false
      }
    };
  }
}

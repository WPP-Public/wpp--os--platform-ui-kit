import { h, Host } from '@stencil/core';
import { CSS_ATTRIBUTES, PREFIX_FOR_TYPE, VARIABLE_PREFIX } from './consts';
/**
 * @part typography - Main content wrapper element
 * @part inner - Content slot element
 */
export class WppTypography {
  constructor() {
    this.updateTypographyClasses = () => {
      const fontStyle = getComputedStyle(this.host).getPropertyValue('--wpp-typography-font-style').trim();
      if (fontStyle === 'italic') {
        this.host.classList.add('italic');
      }
      else {
        this.host.classList.remove('italic');
      }
    };
    this.getAvailableTypeFromTheme = () => {
      const typeParts = this.type.split('-');
      const CSSVariable = `${VARIABLE_PREFIX}-${this.type}-font-size`;
      if (getComputedStyle(this.host).getPropertyValue(CSSVariable) ||
        getComputedStyle(document.body).getPropertyValue(CSSVariable)) {
        return this.type;
      }
      if (['9xl', '8xl', '7xl', '6xl'].includes(typeParts[0])) {
        return '5xl-display';
      }
      if (typeParts.length === 3) {
        return `${typeParts[0]}-${typeParts[1]}`;
      }
      if (typeParts.length === 2 && ['light', 'emphasis'].includes(typeParts[1])) {
        return `${typeParts[0]}-body`;
      }
      return this.type;
    };
    this.getTypographyStylesFromTheme = () => {
      const typographyStyles = {};
      const availableType = this.getAvailableTypeFromTheme();
      CSS_ATTRIBUTES.forEach((attribute) => {
        const cssVariableName = `${VARIABLE_PREFIX}-${availableType}-${attribute}`;
        let propertyValue;
        if (getComputedStyle(this.host).getPropertyValue(cssVariableName).trim()) {
          propertyValue = getComputedStyle(this.host).getPropertyValue(cssVariableName).trim();
        }
        else {
          propertyValue = getComputedStyle(document.body).getPropertyValue(cssVariableName).trim();
        }
        typographyStyles[`${PREFIX_FOR_TYPE}-${attribute}`] = propertyValue;
      });
      Object.entries(typographyStyles).forEach(([property, value]) => {
        this.host.style.setProperty(property, value);
      });
    };
    this.typographyCssClasses = () => ({
      typography: true,
      italic: this.host.classList.contains('italic'),
    });
    this.type = 'm-body';
    this.tag = 'span';
  }
  handleTypeChange() {
    this.getTypographyStylesFromTheme();
    this.updateTypographyClasses();
  }
  componentWillLoad() {
    this.getTypographyStylesFromTheme();
    this.updateTypographyClasses();
  }
  render() {
    const TypographyTag = this.tag;
    return (h(Host, { class: "wpp-typography", exportparts: "typography, inner" }, h(TypographyTag, { class: this.typographyCssClasses(), part: "typography", exportparts: "typography" }, h("slot", { part: "inner" }))));
  }
  static get is() { return "wpp-typography"; }
  static get registryIs() { return "wpp-typography-v2-22-0"; }
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
          "resolved": "\"9xl-display\" | \"9xl-display-light\" | \"9xl-display-strong\" | \"9xl-display-emphasis\" | \"8xl-display\" | \"8xl-display-light\" | \"8xl-display-strong\" | \"8xl-display-emphasis\" | \"7xl-display\" | \"7xl-display-light\" | \"7xl-display-strong\" | \"7xl-display-emphasis\" | \"6xl-display\" | \"6xl-display-light\" | \"6xl-display-strong\" | \"6xl-display-emphasis\" | \"5xl-display\" | \"5xl-display-light\" | \"5xl-display-strong\" | \"5xl-display-emphasis\" | \"4xl-display\" | \"4xl-display-light\" | \"4xl-display-strong\" | \"4xl-display-emphasis\" | \"3xl-heading\" | \"3xl-heading-light\" | \"3xl-heading-strong\" | \"3xl-heading-emphasis\" | \"2xl-heading\" | \"2xl-heading-light\" | \"2xl-heading-strong\" | \"2xl-heading-emphasis\" | \"xl-heading\" | \"xl-heading-light\" | \"xl-heading-strong\" | \"xl-heading-emphasis\" | \"l-strong\" | \"l-midi\" | \"l-body\" | \"l-light\" | \"l-emphasis\" | \"m-strong\" | \"m-midi\" | \"m-body\" | \"m-light\" | \"m-emphasis\" | \"s-strong\" | \"s-midi\" | \"s-body\" | \"s-light\" | \"s-emphasis\" | \"xs-strong\" | \"xs-midi\" | \"xs-body\" | \"xs-light\" | \"xs-emphasis\" | \"2xs-strong\"",
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
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "type",
        "methodName": "handleTypeChange"
      }];
  }
}

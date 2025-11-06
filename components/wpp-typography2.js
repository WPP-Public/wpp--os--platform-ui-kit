import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const CSS_ATTRIBUTES = [
  'font-weight',
  'font-size',
  'font-family',
  'font-style',
  'line-height',
  'letter-spacing',
  'text-trasnform',
  'text-decoration',
];
const VARIABLE_PREFIX = '--wpp-typography';
const PREFIX_FOR_TYPE = '--wpp-default-type';

const wppTypographyCss = ":host{--typography-color:var(--wpp-typography-color, var(--wpp-text-color));--typography-font-weight:var(--wpp-default-type-font-weight, 400);--typography-font-size:var(--wpp-default-type-font-size, 16px);--typography-font-family:var(--wpp-default-type-font-family, var(--wpp-font-family));--typography-font-style:var(--wpp-default-type-font-style, normal);--typography-line-height:var(--wpp-default-type-line-height, normal);--typography-letter-spacing:var(--wpp-default-letter-spacing, normal);--typography-text-transform:var(--wpp-default-text-transform, none);--typography-text-decoration:var(--wpp-default-text-decoration, none);--typography-italic-padding-right:var(--wpp-typography-italic-padding-right, 0.12em);display:-ms-inline-flexbox;display:inline-flex;color:var(--typography-color)}.typography{margin:0;overflow:hidden;text-overflow:ellipsis;color:currentcolor;font-weight:var(--wpp-typography-font-weight, var(--typography-font-weight));font-size:var(--wpp-typography-font-size, var(--typography-font-size));font-family:var(--wpp-typography-font-family, var(--typography-font-family));font-style:var(--wpp-typography-font-style, var(--typography-font-style));line-height:var(--wpp-typography-line-height, var(--typography-line-height));letter-spacing:var(--wpp-typography-letter-spacing, var(--typography-letter-spacing));text-transform:var(--wpp-typography-text-transform, var(--typography-text-transform));-webkit-text-decoration:var(--wpp-typography-text-decoration, var(--typography-text-decoration));text-decoration:var(--wpp-typography-text-decoration, var(--typography-text-decoration))}.typography.italic{padding-right:var(--typography-italic-padding-right)}";

const WppTypography = /*@__PURE__*/ proxyCustomElement(class WppTypography extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get registryIs() { return "wpp-typography-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "type": ["handleTypeChange"]
  }; }
  static get style() { return wppTypographyCss; }
}, [1, "wpp-typography", "wpp-typography-v2-22-0", {
    "type": [513],
    "tag": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTypography);
      }
      break;
  } });
}

export { WppTypography as W, defineCustomElement as d };

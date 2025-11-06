import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconError = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-danger-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-error", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.6205 2.68236L17.2903 8.25996C18.2258 9.18045 18.2377 10.6847 17.3183 11.6203L11.7398 17.2904C10.8194 18.2258 9.3149 18.238 8.37946 17.3176L2.70966 11.7396C1.77419 10.8192 1.76202 9.31476 2.68236 8.37933L8.26011 2.70963C9.18053 1.77418 10.6851 1.76203 11.6205 2.68236ZM10 5.33295C10.5198 5.33295 10.9412 5.75433 10.9412 6.27413V10.98C10.9412 11.4998 10.5198 11.9212 10 11.9212C9.4802 11.9212 9.05882 11.4998 9.05882 10.98V6.27413C9.05882 5.75433 9.4802 5.33295 10 5.33295ZM10.9412 13.7647C10.9412 14.2845 10.5198 14.7059 10 14.7059C9.4802 14.7059 9.05882 14.2845 9.05882 13.7647C9.05882 13.2449 9.4802 12.8235 10 12.8235C10.5198 12.8235 10.9412 13.2449 10.9412 13.7647Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-error-v2-22-0"; }
};
WppIconError.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconWarning = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-warning-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-warning", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.83422 2.68592L1.77378 15.024C1.26617 15.9112 1.92884 17 2.97644 17H17.0978C18.1454 17 18.808 15.9112 18.3004 15.024L11.2395 2.68592C10.716 1.77136 9.35779 1.77136 8.83422 2.68592ZM10.0374 5.75C10.5552 5.74994 10.9749 6.16963 10.975 6.68739L10.9751 11.3746L9.10014 11.3749L9.09999 6.68761C9.09993 6.16984 9.51962 5.75006 10.0374 5.75ZM10.9751 11.3746C10.9751 11.8923 10.5554 12.3125 10.0376 12.3125C9.51985 12.3125 9.10013 11.8927 9.10014 11.3749L10.9751 11.3746ZM10.9746 14.1875C10.9746 14.7053 10.5549 15.125 10.0371 15.125C9.51934 15.125 9.09961 14.7053 9.09961 14.1875C9.09961 13.6697 9.51934 13.25 10.0371 13.25C10.5549 13.25 10.9746 13.6697 10.9746 14.1875Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-warning-v2-22-0"; }
};
WppIconWarning.style = wppIconCss;

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

const WppTypography = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get host() { return getElement(this); }
  static get watchers() { return {
    "type": ["handleTypeChange"]
  }; }
};
WppTypography.style = wppTypographyCss;

export { WppIconError as wpp_icon_error, WppIconWarning as wpp_icon_warning, WppTypography as wpp_typography };

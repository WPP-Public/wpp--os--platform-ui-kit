import { proxyCustomElement, HTMLElement, h, Fragment, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './wpp-icon-error2.js';
import { d as defineCustomElement$1 } from './wpp-icon-warning2.js';

const wppInternalTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:100%}.tooltip-wrapper{width:100%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center;padding:var(--internal-tooltip-padding);border-radius:var(--internal-tooltip-border-radius);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;-ms-hyphens:auto;-webkit-box-sizing:border-box;box-sizing:border-box}.tooltip-wrapper .content-with-icon{display:-ms-flexbox;display:flex;gap:4px;-ms-flex-align:start;align-items:flex-start}.tooltip-wrapper .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.tooltip-wrapper .text{width:100%;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.tooltip-wrapper .header{width:100%;margin-bottom:var(--internal-tooltip-text-margin-bottom);font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.tooltip-wrapper .value{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.tooltip-wrapper.with-header{padding:var(--internal-tooltip-with-header-padding)}.tooltip-wrapper.with-header .content-with-icon .icon-wrapper .left-icon{padding-top:2px}.tooltip-wrapper.with-value{padding:var(--internal-tooltip-with-value-padding)}.tooltip-wrapper.dark{background-color:var(--internal-tooltip-dark-bg-color)}.tooltip-wrapper.dark .text{color:var(--internal-tooltip-dark-text-color)}.tooltip-wrapper.dark .header{color:var(--internal-tooltip-dark-header-text-color)}.tooltip-wrapper.dark.with-header .header{color:var(--internal-tooltip-dark-with-header-header-color)}.tooltip-wrapper.dark.with-header .text{color:var(--internal-tooltip-dark-with-header-text-color)}.tooltip-wrapper.dark.with-value .text{color:var(--internal-tooltip-dark-with-value-text-color)}.tooltip-wrapper.dark.with-value .value{color:var(--internal-tooltip-dark-with-value-value-color)}.tooltip-wrapper.dark .value{color:var(--internal-tooltip-dark-value-color)}.tooltip-wrapper.dark:not(.with-header):not(.with-value) .text{color:var(--internal-tooltip-dark-text-color)}.tooltip-wrapper.light{-webkit-box-shadow:var(--internal-tooltip-light-box-shadow);box-shadow:var(--internal-tooltip-light-box-shadow);background-color:var(--internal-tooltip-light-bg-color)}.tooltip-wrapper.light .text{color:var(--internal-tooltip-light-text-color)}.tooltip-wrapper.light .header{color:var(--internal-tooltip-light-header-text-color)}.tooltip-wrapper.light.with-header .header{color:var(--internal-tooltip-light-with-header-header-color)}.tooltip-wrapper.light.with-header .text{color:var(--internal-tooltip-light-with-header-text-color)}.tooltip-wrapper.light.with-value .text{color:var(--internal-tooltip-light-with-value-text-color)}.tooltip-wrapper.light.with-value .value{color:var(--internal-tooltip-light-with-value-value-color)}.tooltip-wrapper.light .value{color:var(--internal-tooltip-light-value-color)}.tooltip-wrapper.light:not(.with-header):not(.with-value) .text{color:var(--internal-tooltip-light-text-color)}.tooltip-wrapper.error,.tooltip-wrapper.warning{position:relative;background-color:var(--internal-tooltip-error-bg-color);-webkit-box-shadow:var(--internal-tooltip-variant-box-shadow);box-shadow:var(--internal-tooltip-variant-box-shadow)}.tooltip-wrapper.error.with-value .text,.tooltip-wrapper.warning.with-value .text{color:var(--internal-tooltip-error-with-value-text-color)}.tooltip-wrapper.error.with-value .value,.tooltip-wrapper.warning.with-value .value{color:var(--internal-tooltip-error-with-value-value-color)}.tooltip-wrapper.error .header,.tooltip-wrapper.warning .header{color:var(--internal-tooltip-error-header-text-color)}.tooltip-wrapper.error .text,.tooltip-wrapper.warning .text{color:var(--internal-tooltip-error-text-color)}.tooltip-wrapper.error.with-header .header,.tooltip-wrapper.warning.with-header .header{color:var(--internal-tooltip-error-with-header-header-color)}.tooltip-wrapper.error.with-header .text,.tooltip-wrapper.warning.with-header .text{color:var(--internal-tooltip-error-with-header-text-color)}.tooltip-wrapper.error:not(.with-header):not(.with-value) .text,.tooltip-wrapper.warning:not(.with-header):not(.with-value) .text{color:var(--internal-tooltip-error-text-color)}.tooltip-wrapper.warning{background-color:var(--internal-tooltip-warning-bg-color)}";

const WppTooltip = /*@__PURE__*/ proxyCustomElement(class WppTooltip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.cssClasses = () => ({
      'tooltip-wrapper': true,
      [`${this.theme}`]: true,
      'with-header': !!this.header,
      'with-value': !!this.value,
      error: this.error,
      warning: this.warning,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-tooltip': true,
      [`${this.externalClass}`]: true,
    });
    this.headerCssClasses = () => ({
      header: !!this.header,
    });
    this.textCssClasses = () => ({
      text: !!this.text,
    });
    this.valueCssClasses = () => ({
      value: !!this.value,
    });
    this.getIconBasedOnProps = () => {
      if (this.error) {
        return h("wpp-icon-error-v3-3-0", { class: "left-icon", part: "icon-error" });
      }
      if (this.warning) {
        return h("wpp-icon-warning-v3-3-0", { color: "var(--wpp-warning-color-400)", class: "left-icon" });
      }
      return null;
    };
    this.getTextLines = () => {
      if (!this.text)
        return null;
      return this.text
        .trim()
        .split('\n')
        .map((line) => (h(Fragment, null, line, h("br", null))));
    };
    this.cssStyle = undefined;
    this.header = undefined;
    this.text = undefined;
    this.wordBreak = 'break-word';
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.theme = 'dark';
    this.allowHTML = undefined;
    this.externalClass = '';
    this.ariaProp = {};
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), style: this.cssStyle, exportparts: "tooltip-content" }, h("div", { class: this.cssClasses(), style: { wordBreak: this.wordBreak }, part: "tooltip-content" }, h("div", { class: "content-with-icon", id: this.ariaProp.describedby }, this.getIconBasedOnProps() && h("div", { class: "icon-wrapper" }, this.getIconBasedOnProps()), h("div", { class: "content-wrapper" }, !!this.header && (h("span", { class: this.headerCssClasses(), part: "header" }, this.header)), !!this.text && (h("span", { class: this.textCssClasses(), part: "text" }, this.getTextLines())), !!this.value && (h("span", { class: this.valueCssClasses(), part: "value" }, this.value)))))));
  }
  static get registryIs() { return "wpp-internal-tooltip-v3-3-0"; }
  get host() { return this; }
  static get style() { return wppInternalTooltipCss; }
}, [1, "wpp-internal-tooltip", "wpp-internal-tooltip-v3-3-0", {
    "cssStyle": [16],
    "header": [1],
    "text": [1],
    "wordBreak": [1, "word-break"],
    "value": [1],
    "error": [4],
    "warning": [4],
    "theme": [1],
    "allowHTML": [4, "allow-h-t-m-l"],
    "externalClass": [1, "external-class"],
    "ariaProp": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-internal-tooltip-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-warning-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTooltip);
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTooltip as W, defineCustomElement as d };

import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

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
  static get registryIs() { return "wpp-icon-error-v4-0-0"; }
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
  static get registryIs() { return "wpp-icon-warning-v4-0-0"; }
};
WppIconWarning.style = wppIconCss;

const wppTypographyCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--typography-color)}:host .type-5xl{font-weight:var(--wpp-typography-5xl-display-font-weight);font-size:var(--wpp-typography-5xl-display-font-size);line-height:var(--wpp-typography-5xl-display-line-height);letter-spacing:var(--wpp-typography-5xl-display-letter-spacing);font-family:var(--wpp-typography-5xl-display-font-family)}:host .wpp-typography-5xl-display-light{font-weight:400}:host .wpp-typography-5xl-display-strong{font-weight:700}:host .wpp-typography-5xl-display-emphasis{font-style:italic}:host .type-4xl{font-weight:var(--wpp-typography-4xl-display-font-weight);font-size:var(--wpp-typography-4xl-display-font-size);line-height:var(--wpp-typography-4xl-display-line-height);letter-spacing:var(--wpp-typography-4xl-display-letter-spacing);font-family:var(--wpp-typography-4xl-display-font-family)}:host .wpp-typography-4xl-display-light{font-weight:400}:host .wpp-typography-4xl-display-strong{font-weight:700}:host .wpp-typography-4xl-display-emphasis{font-style:italic}:host .type-3xl{font-weight:var(--wpp-typography-3xl-heading-font-weight);font-size:var(--wpp-typography-3xl-heading-font-size);line-height:var(--wpp-typography-3xl-heading-line-height);letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing);font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family))}:host .wpp-typography-3xl-display-light{font-weight:400}:host .wpp-typography-3xl-display-strong{font-weight:700}:host .wpp-typography-3xl-display-emphasis{font-style:italic}:host .type-2xl{font-weight:var(--wpp-typography-2xl-heading-font-weight);font-size:var(--wpp-typography-2xl-heading-font-size);line-height:var(--wpp-typography-2xl-heading-line-height);letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing);font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family))}:host .wpp-typography-2xl-display-light{font-weight:400}:host .wpp-typography-2xl-display-strong{font-weight:700}:host .wpp-typography-2xl-display-emphasis{font-style:italic}:host .type-xl{font-weight:var(--wpp-typography-xl-heading-font-weight);font-size:var(--wpp-typography-xl-heading-font-size);line-height:var(--wpp-typography-xl-heading-line-height);letter-spacing:var(--wpp-typography-xl-heading-letter-spacing);font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family))}:host .wpp-typography-xl-display-light{font-weight:400}:host .wpp-typography-xl-display-strong{font-weight:700}:host .wpp-typography-xl-display-emphasis{font-style:italic}:host .type-l{font-weight:var(--wpp-typography-l-body-font-weight);font-size:var(--wpp-typography-l-body-font-size);line-height:var(--wpp-typography-l-body-line-height);letter-spacing:var(--wpp-typography-l-body-letter-spacing);font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family))}:host .wpp-typography-l-body{font-weight:400}:host .wpp-typography-l-midi{font-weight:500}:host .wpp-typography-l-strong{font-weight:600}:host .wpp-typography-l-emphasis{font-style:italic}:host .type-m{font-weight:var(--wpp-typography-m-body-font-weight);font-size:var(--wpp-typography-m-body-font-size);line-height:var(--wpp-typography-m-body-line-height);letter-spacing:var(--wpp-typography-m-body-letter-spacing);font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family))}:host .wpp-typography-m-body{font-weight:400}:host .wpp-typography-m-midi{font-weight:500}:host .wpp-typography-m-strong{font-weight:600}:host .wpp-typography-m-emphasis{font-style:italic}:host .type-s{font-weight:var(--wpp-typography-s-body-font-weight);font-size:var(--wpp-typography-s-body-font-size);line-height:var(--wpp-typography-s-body-line-height);letter-spacing:var(--wpp-typography-s-body-letter-spacing);font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family))}:host .wpp-typography-s-body{font-weight:400}:host .wpp-typography-s-midi{font-weight:500}:host .wpp-typography-s-strong{font-weight:600}:host .wpp-typography-s-emphasis{font-style:italic}:host .type-xs{font-weight:var(--wpp-typography-xs-body-font-weight);font-size:var(--wpp-typography-xs-body-font-size);line-height:var(--wpp-typography-xs-body-line-height);letter-spacing:var(--wpp-typography-xs-body-letter-spacing);font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family))}:host .wpp-typography-xs-body{font-weight:400}:host .wpp-typography-xs-midi{font-weight:500}:host .wpp-typography-xs-strong{font-weight:600}:host .wpp-typography-xs-emphasis{font-style:italic}:host .type-2xs{font-weight:var(--wpp-typography-2xs-strong-font-weight);font-size:var(--wpp-typography-2xs-strong-font-size);line-height:var(--wpp-typography-2xs-strong-line-height);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing);font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));text-transform:uppercase}:host .italic{padding-right:0.12em}.typography{margin:0;overflow:hidden;text-overflow:ellipsis;color:currentcolor}";

const WppTypography = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  static get registryIs() { return "wpp-typography-v4-0-0"; }
  get host() { return getElement(this); }
};
WppTypography.style = wppTypographyCss;

export { WppIconError as wpp_icon_error, WppIconWarning as wpp_icon_warning, WppTypography as wpp_typography };

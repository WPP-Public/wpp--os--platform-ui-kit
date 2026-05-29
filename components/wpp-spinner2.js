import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const wppSpinnerCss = ":host{--spinner-padding-s:var(--wpp-spinner-padding-s, 3px);--spinner-padding-m:var(--wpp-spinner-padding-m, 8px);--spinner-padding-l:var(--wpp-spinner-padding-l, 8px);display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-size-s){padding:var(--spinner-padding-s)}:host(.wpp-size-m){padding:var(--spinner-padding-m)}:host(.wpp-size-l){padding:var(--spinner-padding-l)}.spinner{-webkit-animation:rotate-spinner 3s linear infinite;animation:rotate-spinner 3s linear infinite}@-webkit-keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}.spinner.size-s{width:14px;height:14px;-webkit-transform-origin:7px 7px 0;transform-origin:7px 7px 0}.spinner.size-s circle{-webkit-animation:spinner-s 3s linear infinite;animation:spinner-s 3s linear infinite;stroke-dasharray:43.96px;stroke-dashoffset:14;stroke-width:2}.spinner.size-m{width:32px;height:32px;-webkit-transform-origin:16px 16px 0;transform-origin:16px 16px 0}.spinner.size-m circle{-webkit-animation:spinner-m 3s linear infinite;animation:spinner-m 3s linear infinite;stroke-dasharray:100.48px;stroke-dashoffset:32;stroke-width:4}.spinner.size-l{width:64px;height:64px;-webkit-transform-origin:32px 32px 0;transform-origin:32px 32px 0}.spinner.size-l circle{-webkit-animation:spinner-l 3s linear infinite;animation:spinner-l 3s linear infinite;stroke-dasharray:200.96px;stroke-dashoffset:64;stroke-width:6}@-webkit-keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@media (prefers-reduced-motion: reduce){:host .spinner{-webkit-animation:none !important;animation:none !important;}}";

const SPINNER_SIZES = {
  s: 7,
  m: 16,
  l: 32,
};
const SPINNER_RADIUS = {
  s: 6,
  m: 14,
  l: 29,
};
const WppSpinner = /*@__PURE__*/ proxyCustomElement(class WppSpinner extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-spinner': true,
      [`wpp-size-${this.size}`]: true,
    });
    this.spinnerCssClasses = () => ({
      spinner: true,
      [`size-${this.size}`]: true,
    });
    this.color = 'var(--wpp-primary-color-500)';
    this.size = 's';
    this.ariaProps = undefined;
  }
  render() {
    const isAnnounced = this.ariaProps?.label && this.ariaProps?.label !== '';
    return (h(Host, { class: this.hostCssClasses(), role: isAnnounced ? 'status' : null, "aria-hidden": isAnnounced ? null : 'true', "aria-live": isAnnounced ? 'polite' : null, "aria-label": isAnnounced ? this.ariaProps?.label : null, exportparts: "circle" }, h("svg", { class: this.spinnerCssClasses(), "aria-hidden": "true", focusable: "false" }, h("circle", { cx: SPINNER_SIZES[this.size], cy: SPINNER_SIZES[this.size], r: SPINNER_RADIUS[this.size], fill: "transparent", stroke: this.color, "stroke-linecap": "round", part: "circle" }))));
  }
  static get registryIs() { return "wpp-spinner-v4-1-0"; }
  static get style() { return wppSpinnerCss; }
}, [1, "wpp-spinner", "wpp-spinner-v4-1-0", {
    "color": [1],
    "size": [1],
    "ariaProps": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-spinner-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSpinner);
      }
      break;
  } });
}

export { WppSpinner as W, defineCustomElement as d };

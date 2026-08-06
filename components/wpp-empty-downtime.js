import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyDowntime$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyDowntime extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const width = this.width || 160;
    const height = this.height || width;
    const viewBoxSize = 160;
    return (h(WppImage, { name: "wpp-empty-downtime", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-danger-color-200)" }), h("path", { d: "M133.825 80.8329C134.18 79.5166 136.129 79.5166 136.484 80.8329L136.669 81.5227C136.798 82.0005 137.195 82.3691 137.697 82.4776L138.084 82.5613C139.512 82.87 139.512 84.8214 138.084 85.1301L137.697 85.2138C137.195 85.3223 136.798 85.6909 136.669 86.1687L136.484 86.8585C136.129 88.1748 134.18 88.1748 133.825 86.8585L133.639 86.1687C133.511 85.6909 133.114 85.3223 132.612 85.2138L132.225 85.1301C130.797 84.8214 130.797 82.87 132.225 82.5613L132.612 82.4776C133.114 82.3691 133.511 82.0005 133.639 81.5227L133.825 80.8329Z", fill: "var(--wpp-danger-color-400)" }), h("ellipse", { cx: "141.308", cy: "71.8457", rx: "1.9999", ry: "2", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M74.3387 9.1568C74.7822 7.51153 77.2182 7.51154 77.6616 9.15681L77.894 10.0191C78.0549 10.6163 78.5506 11.0771 79.178 11.2127L79.6617 11.3173C81.4465 11.7032 81.4465 14.1425 79.6617 14.5284L79.178 14.633C78.5506 14.7686 78.0549 15.2294 77.894 15.8266L77.6616 16.6889C77.2182 18.3342 74.7822 18.3342 74.3387 16.6889L74.1064 15.8266C73.9454 15.2294 73.4498 14.7686 72.8223 14.633L72.3386 14.5284C70.5538 14.1425 70.5538 11.7032 72.3386 11.3173L72.8223 11.2127C73.4498 11.0771 73.9454 10.6163 74.1064 10.0191L74.3387 9.1568Z", fill: "var(--wpp-danger-color-300)" }), h("circle", { cx: "87", cy: "20.3076", r: "2", fill: "var(--wpp-danger-color-400)" }), h("circle", { cx: "16.6162", cy: "55.6924", r: "2", fill: "var(--wpp-danger-color-100)" }), h("path", { opacity: "0.8", d: "M104 57C104 54.2386 106.239 52 109 52C111.761 52 114 54.2386 114 57V134C114 135.105 113.105 136 112 136H106C104.895 136 104 135.105 104 134V57Z", fill: "var(--wpp-danger-color-500)" }), h("path", { opacity: "0.8", d: "M44 57C44 54.2386 46.2386 52 49 52C51.7614 52 54 54.2386 54 57V134C54 135.105 53.1046 136 52 136H46C44.8954 136 44 135.105 44 134V57Z", fill: "var(--wpp-danger-color-500)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_26773_48)" }, h("rect", { x: "29", y: "46", width: "100", height: "25", rx: "4", fill: "var(--wpp-danger-color-500)" })), h("rect", { x: "29", y: "43", width: "100", height: "28", rx: "4", fill: "white" }), h("mask", { id: "mask0_26773_48", style: { maskType: 'alpha' }, maskUnits: "userSpaceOnUse", x: "29", y: "43", width: "100", height: "28" }, h("path", { d: "M29 47C29 44.7909 30.7909 43 33 43H125C127.209 43 129 44.7909 129 47V67C129 69.2091 127.209 71 125 71H33C30.7909 71 29 69.2091 29 67V47Z", fill: "white" })), h("g", { mask: "url(#mask0_26773_48)" }, h("path", { d: "M28.7942 72.4824C28.3556 72.1468 28.2721 71.5191 28.6077 71.0805L52.9365 39.2836C53.2721 38.845 53.8997 38.7615 54.3383 39.0971L57.5151 41.5277C57.9537 41.8633 58.0373 42.4909 57.7017 42.9296L33.3728 74.7265C33.0372 75.1651 32.4096 75.2486 31.971 74.913L28.7942 72.4824Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M53.3425 71.993C52.9039 71.6574 52.8204 71.0297 53.156 70.5911L77.4848 38.7942C77.8204 38.3556 78.4481 38.2721 78.8867 38.6077L82.0635 41.0383C82.5021 41.3739 82.5856 42.0016 82.25 42.4402L57.9212 74.2371C57.5856 74.6757 56.9579 74.7592 56.5193 74.4236L53.3425 71.993Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M76.3425 71.993C75.9039 71.6574 75.8204 71.0297 76.156 70.5911L100.485 38.7942C100.82 38.3556 101.448 38.2721 101.887 38.6077L105.063 41.0383C105.502 41.3739 105.586 42.0016 105.25 42.4402L80.9212 74.2371C80.5856 74.6757 79.9579 74.7592 79.5193 74.4236L76.3425 71.993Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M99.3425 72.993C98.9039 72.6574 98.8204 72.0297 99.156 71.5911L123.485 39.7942C123.82 39.3556 124.448 39.2721 124.887 39.6077L128.063 42.0383C128.502 42.3739 128.586 43.0016 128.25 43.4402L103.921 75.2371C103.586 75.6757 102.958 75.7592 102.519 75.4236L99.3425 72.993Z", fill: "var(--wpp-danger-color-300)" })), h("g", { opacity: "0.5", filter: "url(#filter1_f_26773_48)" }, h("rect", { x: "29", y: "82", width: "100", height: "25", rx: "4", fill: "var(--wpp-danger-color-500)" })), h("rect", { x: "29", y: "79", width: "100", height: "28", rx: "4", fill: "white" }), h("mask", { id: "mask1_26773_48", style: { maskType: 'alpha' }, maskUnits: "userSpaceOnUse", x: "29", y: "79", width: "100", height: "28" }, h("path", { d: "M29 83C29 80.7909 30.7909 79 33 79H125C127.209 79 129 80.7909 129 83V103C129 105.209 127.209 107 125 107H33C30.7909 107 29 105.209 29 103V83Z", fill: "white" })), h("g", { mask: "url(#mask1_26773_48)" }, h("path", { d: "M28.7942 108.482C28.3556 108.147 28.2721 107.519 28.6077 107.081L52.9365 75.2836C53.2721 74.845 53.8997 74.7615 54.3383 75.0971L57.5151 77.5277C57.9537 77.8633 58.0373 78.4909 57.7017 78.9296L33.3728 110.726C33.0372 111.165 32.4096 111.249 31.971 110.913L28.7942 108.482Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M53.3425 107.993C52.9039 107.657 52.8204 107.03 53.156 106.591L77.4848 74.7942C77.8204 74.3556 78.4481 74.2721 78.8867 74.6077L82.0635 77.0383C82.5021 77.3739 82.5856 78.0016 82.25 78.4402L57.9212 110.237C57.5856 110.676 56.9579 110.759 56.5193 110.424L53.3425 107.993Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M76.3425 107.993C75.9039 107.657 75.8204 107.03 76.156 106.591L100.485 74.7942C100.82 74.3556 101.448 74.2721 101.887 74.6077L105.063 77.0383C105.502 77.3739 105.586 78.0016 105.25 78.4402L80.9212 110.237C80.5856 110.676 79.9579 110.759 79.5193 110.424L76.3425 107.993Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M99.3425 108.993C98.9039 108.657 98.8204 108.03 99.156 107.591L123.485 75.7942C123.82 75.3556 124.448 75.2721 124.887 75.6077L128.063 78.0383C128.502 78.3739 128.586 79.0016 128.25 79.4402L103.921 111.237C103.586 111.676 102.958 111.759 102.519 111.424L99.3425 108.993Z", fill: "var(--wpp-danger-color-300)" })), h("circle", { cx: "80", cy: "143.539", r: "3", fill: "var(--wpp-danger-color-300)" }), h("defs", null, h("filter", { id: "filter0_f_26773_48", x: "19", y: "36", width: "120", height: "45", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_26773_48" })), h("filter", { id: "filter1_f_26773_48", x: "19", y: "72", width: "120", height: "45", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_26773_48" })))));
  }
  static get registryIs() { return "wpp-empty-downtime-v4-3-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-downtime", "wpp-empty-downtime-v4-3-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-downtime-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-downtime-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyDowntime$1);
      }
      break;
  } });
}

const WppEmptyDowntime = WppEmptyDowntime$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyDowntime, defineCustomElement };

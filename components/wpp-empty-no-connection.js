import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyNoConnection$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyNoConnection extends HTMLElement {
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
    return (h(WppImage, { name: "wpp-empty-no-connection", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("ellipse", { cx: "140", cy: "99", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-300)" }), h("path", { d: "M76.3387 15.1568C76.7822 13.5115 79.2182 13.5115 79.6616 15.1568L79.894 16.0191C80.0549 16.6163 80.5506 17.0771 81.178 17.2127L81.6617 17.3173C83.4465 17.7032 83.4465 20.1425 81.6617 20.5284L81.178 20.633C80.5506 20.7686 80.0549 21.2294 79.894 21.8266L79.6616 22.6889C79.2182 24.3342 76.7822 24.3342 76.3387 22.6889L76.1064 21.8266C75.9454 21.2294 75.4498 20.7686 74.8223 20.633L74.3386 20.5284C72.5538 20.1425 72.5538 17.7032 74.3386 17.3173L74.8223 17.2127C75.4498 17.0771 75.9454 16.6163 76.1064 16.0191L76.3387 15.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "89", cy: "26.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("path", { d: "M15.6709 73.9872C16.0256 72.6709 17.9744 72.6709 18.3291 73.9872L18.515 74.677C18.6438 75.1548 19.0403 75.5234 19.5422 75.6319L19.9291 75.7156C21.357 76.0243 21.357 77.9757 19.9291 78.2844L19.5422 78.3681C19.0403 78.4766 18.6438 78.8452 18.515 79.323L18.3291 80.0128C17.9744 81.3291 16.0256 81.3291 15.6709 80.0128L15.485 79.323C15.3562 78.8452 14.9597 78.4766 14.4578 78.3681L14.0709 78.2844C12.643 77.9757 12.643 76.0243 14.0709 75.7156L14.4578 75.6319C14.9597 75.5234 15.3562 75.1548 15.485 74.677L15.6709 73.9872Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "79.9998", cy: "143", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-200)" }), h("ellipse", { cx: "88.9999", cy: "138", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-300)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_291)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M41 48C37.6863 48 35 50.6863 35 54V112C35 115.314 37.6863 118 41 118H70.6509C72.513 118 74.2695 118.865 75.4054 120.34L78.1776 123.941C78.9782 124.981 80.5466 124.981 81.3472 123.941L84.1194 120.34C85.2553 118.865 87.0118 118 88.8739 118H119C122.314 118 125 115.314 125 112V54C125 50.6863 122.314 48 119 48H41Z", fill: "var(--wpp-primary-color-500)" })), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M41 43C37.6863 43 35 45.6863 35 49V112C35 115.314 37.6863 118 41 118H73.604L78.1776 123.941C78.9782 124.981 80.5466 124.981 81.3472 123.941L85.9208 118H119C122.314 118 125 115.314 125 112V49C125 45.6863 122.314 43 119 43H41Z", fill: "var(--wpp-grey-color-000)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M112.164 70.1037C112.937 70.8592 112.915 72.0958 112.151 72.86L109.33 75.6809C108.529 76.4825 107.225 76.4543 106.41 75.6667C99.5737 69.0628 90.2669 65 80.0112 65C69.7555 65 60.4487 69.0628 53.6125 75.6667C52.7972 76.4543 51.4937 76.4825 50.6921 75.6809L47.8712 72.86C47.107 72.0958 47.0851 70.8592 47.8579 70.1037C56.1511 61.9967 67.4976 57 80.0112 57C92.5248 57 103.871 61.9967 112.164 70.1037ZM99.1164 83.3648C99.8089 84.1148 99.7407 85.2705 99.0188 85.9924L96.2375 88.7737C95.3683 89.6429 93.9317 89.5222 93.0868 88.6294C89.8058 85.1627 85.1611 83 80.0112 83C74.8613 83 70.2166 85.1627 66.9356 88.6294C66.0907 89.5222 64.6541 89.6429 63.7849 88.7737L61.0036 85.9924C60.2817 85.2705 60.2135 84.1148 60.9061 83.3648C65.6563 78.2212 72.4576 75 80.0112 75C87.5648 75 94.3661 78.2212 99.1164 83.3648ZM80.0113 105C83.325 105 86.0113 102.314 86.0113 99C86.0113 95.6863 83.325 93 80.0113 93C76.6976 93 74.0113 95.6863 74.0113 99C74.0113 102.314 76.6976 105 80.0113 105Z", fill: "var(--wpp-primary-color-500)" }), h("path", { opacity: "0.8", d: "M121 63C129.836 63 137 55.8366 137 47C137 38.1635 129.836 31 121 31C112.163 31 105 38.1635 105 47C105 55.8366 112.163 63 121 63Z", fill: "var(--wpp-primary-color-300)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M119.835 38.6859L112.774 51.024C112.267 51.9112 112.929 53 113.977 53H128.098C129.146 53 129.809 51.9112 129.301 51.024L122.24 38.6859C121.716 37.7714 120.358 37.7714 119.835 38.6859ZM121.038 41.75C121.556 41.7499 121.975 42.1696 121.975 42.6874L121.976 47.3746L120.101 47.3749L120.1 42.6876C120.1 42.1698 120.52 41.7501 121.038 41.75ZM121.976 47.3746C121.976 47.8923 121.556 48.3125 121.038 48.3125C120.52 48.3125 120.101 47.8927 120.101 47.3749L121.976 47.3746ZM121.975 50.1875C121.975 50.7053 121.555 51.125 121.038 51.125C120.52 51.125 120.1 50.7053 120.1 50.1875C120.1 49.6697 120.52 49.25 121.038 49.25C121.555 49.25 121.975 49.6697 121.975 50.1875Z", fill: "var(--wpp-primary-color-600)" }), h("defs", null, h("filter", { id: "filter0_f_18170_291", x: "22", y: "35", width: "116", height: "102.721", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "6.5", result: "effect1_foregroundBlur_18170_291" })))));
  }
  static get registryIs() { return "wpp-empty-no-connection-v2-22-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-no-connection", "wpp-empty-no-connection-v2-22-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-no-connection-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-no-connection-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyNoConnection$1);
      }
      break;
  } });
}

const WppEmptyNoConnection = WppEmptyNoConnection$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyNoConnection, defineCustomElement };

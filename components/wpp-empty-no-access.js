import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyNoAccess$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyNoAccess extends HTMLElement {
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
    return (h(WppImage, { name: "wpp-empty-no-access", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("ellipse", { cx: "140", cy: "109", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-300)" }), h("path", { d: "M122.339 28.1568C122.782 26.5115 125.218 26.5115 125.662 28.1568L125.894 29.0191C126.055 29.6163 126.551 30.0771 127.178 30.2127L127.662 30.3173C129.447 30.7032 129.447 33.1425 127.662 33.5284L127.178 33.633C126.551 33.7686 126.055 34.2294 125.894 34.8266L125.662 35.6889C125.218 37.3342 122.782 37.3342 122.339 35.6889L122.106 34.8266C121.945 34.2294 121.45 33.7686 120.822 33.633L120.339 33.5284C118.554 33.1425 118.554 30.7032 120.339 30.3173L120.822 30.2127C121.45 30.0771 121.945 29.6163 122.106 29.0191L122.339 28.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "89", cy: "26.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("path", { d: "M15.6709 73.9872C16.0256 72.6709 17.9744 72.6709 18.3291 73.9872L18.515 74.677C18.6438 75.1548 19.0403 75.5234 19.5422 75.6319L19.9291 75.7156C21.357 76.0243 21.357 77.9757 19.9291 78.2844L19.5422 78.3681C19.0403 78.4766 18.6438 78.8452 18.515 79.323L18.3291 80.0128C17.9744 81.3291 16.0256 81.3291 15.6709 80.0128L15.485 79.323C15.3562 78.8452 14.9597 78.4766 14.4578 78.3681L14.0709 78.2844C12.643 77.9757 12.643 76.0243 14.0709 75.7156L14.4578 75.6319C14.9597 75.5234 15.3562 75.1548 15.485 74.677L15.6709 73.9872Z", fill: "var(--wpp-primary-color-400)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M93 56V43C93 35.8203 87.1797 30 80 30C72.8203 30 67 35.8203 67 43V56H93ZM80 18C66.1929 18 55 29.1929 55 43V68H105V43C105 29.1929 93.8071 18 80 18Z", fill: "var(--wpp-primary-color-400)" }), h("rect", { width: "12", height: "4", transform: "matrix(1 0 0 -1 55 54)", fill: "var(--wpp-primary-color-600)" }), h("rect", { width: "12", height: "4", transform: "matrix(1 0 0 -1 93 54)", fill: "var(--wpp-primary-color-600)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_310)" }, h("path", { d: "M37.3803 65.5327C37.6242 62.4097 40.2296 60 43.362 60H116.638C119.77 60 122.376 62.4097 122.62 65.5327L124.967 95.5797C124.989 95.8595 124.991 96.1406 124.972 96.4207C123.405 119.82 103.967 138 80.515 138H79.485C56.0327 138 36.5951 119.82 35.0282 96.4207C35.0094 96.1406 35.011 95.8595 35.0328 95.5797L37.3803 65.5327Z", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M37.461 59.2492C37.6588 56.2951 40.1127 54 43.0734 54H116.927C119.887 54 122.341 56.2951 122.539 59.2492L125 96L124.824 98.6312C123.34 120.787 104.936 138 82.7306 138H77.2694C55.064 138 36.6598 120.787 35.1762 98.6312L35 96L37.461 59.2492Z", fill: "var(--wpp-grey-color-000)" }), h("g", { opacity: "0.8", filter: "url(#filter1_f_18170_310)" }, h("path", { d: "M83.6669 98.112C86.2406 96.7824 88 94.0966 88 91C88 86.5817 84.4183 83 80 83C75.5817 83 72 86.5817 72 91C72 94.0966 73.7594 96.7824 76.3331 98.112L74.2592 107.79C74.1258 108.413 74.6003 109 75.237 109H84.763C85.3997 109 85.8742 108.413 85.7408 107.79L83.6669 98.112Z", stroke: "var(--wpp-primary-color-300)", "stroke-width": "16" })), h("path", { d: "M83.6669 98.112C86.2406 96.7824 88 94.0966 88 91C88 86.5817 84.4183 83 80 83C75.5817 83 72 86.5817 72 91C72 94.0966 73.7594 96.7824 76.3331 98.112L74.2592 107.79C74.1258 108.413 74.6003 109 75.237 109H84.763C85.3997 109 85.8742 108.413 85.7408 107.79L83.6669 98.112Z", fill: "var(--wpp-primary-color-500)" }), h("circle", { cx: "134", cy: "41.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("defs", null, h("filter", { id: "filter0_f_18170_310", x: "22.0151", y: "47", width: "115.97", height: "104", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "6.5", result: "effect1_foregroundBlur_18170_310" })), h("filter", { id: "filter1_f_18170_310", x: "40", y: "51", width: "80", height: "90", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "12", result: "effect1_foregroundBlur_18170_310" })))));
  }
  static get registryIs() { return "wpp-empty-no-access-v3-4-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-no-access", "wpp-empty-no-access-v3-4-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-no-access-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-no-access-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyNoAccess$1);
      }
      break;
  } });
}

const WppEmptyNoAccess = WppEmptyNoAccess$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyNoAccess, defineCustomElement };

import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyError$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyError extends HTMLElement {
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
    return (h(WppImage, { name: "wpp-empty-error", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("path", { d: "M160 80C160 124.183 124.183 160 80 160C35.8172 160 0 124.183 0 80C0 35.8172 35.8172 0 80 0C124.183 0 160 35.8172 160 80Z", fill: "var(--wpp-danger-color-200)" }), h("ellipse", { cx: "43.4608", cy: "32.0001", rx: "2.99985", ry: "3", fill: "var(--wpp-danger-color-300)" }), h("g", { opacity: "0.36", filter: "url(#filter0_f_18170_277)" }, h("path", { d: "M75.7574 26.7426C78.1006 24.3995 81.8996 24.3995 84.2427 26.7427L133.257 75.7574C135.601 78.1005 135.601 81.8995 133.257 84.2427L84.2427 133.257C81.8996 135.601 78.1006 135.601 75.7574 133.257L26.7427 84.2426C24.3996 81.8995 24.3996 78.1005 26.7427 75.7574L75.7574 26.7426Z", fill: "var(--wpp-danger-color-500)" })), h("path", { d: "M75.7574 26.7426C78.1006 24.3995 81.8996 24.3995 84.2427 26.7427L133.257 75.7574C135.601 78.1005 135.601 81.8995 133.257 84.2427L84.2427 133.257C81.8996 135.601 78.1006 135.601 75.7574 133.257L26.7427 84.2426C24.3996 81.8995 24.3996 78.1005 26.7427 75.7574L75.7574 26.7426Z", fill: "white" }), h("path", { d: "M74 56C74 52.6863 76.6863 50 80 50C83.3137 50 86 52.6863 86 56V86C86 89.3137 83.3137 92 80 92C76.6863 92 74 89.3137 74 86V56Z", fill: "var(--wpp-danger-color-500)" }), h("path", { d: "M80 98C76.6863 98 74 100.686 74 104C74 107.314 76.6863 110 80 110C83.3137 110 86 107.314 86 104C86 100.686 83.3137 98 80 98Z", fill: "var(--wpp-danger-color-500)" }), h("path", { d: "M39.6463 122.695C40.0897 121.05 42.5256 121.05 42.969 122.696L43.2014 123.558C43.3623 124.155 43.8579 124.616 44.4854 124.751L44.969 124.856C46.7538 125.242 46.7538 127.681 44.969 128.067L44.4853 128.172C43.8579 128.307 43.3623 128.768 43.2014 129.365L42.969 130.228C42.5256 131.873 40.0897 131.873 39.6463 130.228L39.4139 129.365C39.2529 128.768 38.7573 128.307 38.1299 128.172L37.6462 128.067C35.8614 127.681 35.8614 125.242 37.6462 124.856L38.1299 124.751C38.7573 124.616 39.2529 124.155 39.4139 123.558L39.6463 122.695Z", fill: "var(--wpp-danger-color-400)" }), h("path", { d: "M122.671 117.449C123.026 116.132 124.974 116.132 125.329 117.449L125.515 118.139C125.644 118.616 126.04 118.985 126.542 119.093L126.929 119.177C128.357 119.486 128.357 121.437 126.929 121.746L126.542 121.83C126.04 121.938 125.644 122.307 125.515 122.785L125.329 123.474C124.974 124.791 123.026 124.791 122.671 123.474L122.485 122.785C122.356 122.307 121.96 121.938 121.458 121.83L121.071 121.746C119.643 121.437 119.643 119.486 121.071 119.177L121.458 119.093C121.96 118.985 122.356 118.616 122.485 118.139L122.671 117.449Z", fill: "var(--wpp-danger-color-100)" }), h("ellipse", { cx: "51.4608", cy: "140", rx: "2.99985", ry: "3", fill: "var(--wpp-danger-color-100)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M30.3333 46.7436C32.1743 46.7436 33.6667 45.2513 33.6667 43.4104C35.5076 43.4104 37 44.9027 37 46.7436C37 48.5845 35.5076 50.0768 33.6667 50.0768C31.8257 50.0768 30.3333 48.5845 30.3333 46.7436ZM30.3333 46.7436C30.3333 44.9027 31.8257 43.4104 33.6667 43.4104C33.6667 41.5695 32.1743 40.0771 30.3333 40.0771C28.4924 40.0771 27 41.5695 27 43.4104C27 45.2513 28.4924 46.7436 30.3333 46.7436Z", fill: "var(--wpp-danger-color-100)" }), h("path", { d: "M128.339 46.234C128.782 44.5887 131.218 44.5887 131.662 46.234L131.894 47.0962C132.055 47.6935 132.551 48.1542 133.178 48.2899L133.662 48.3945C135.447 48.7804 135.447 51.2196 133.662 51.6055L133.178 51.7101C132.551 51.8458 132.055 52.3066 131.894 52.9038L131.662 53.766C131.218 55.4113 128.782 55.4113 128.339 53.766L128.106 52.9038C127.945 52.3066 127.45 51.8458 126.822 51.7101L126.339 51.6055C124.554 51.2196 124.554 48.7804 126.339 48.3945L126.822 48.2899C127.45 48.1542 127.945 47.6934 128.106 47.0962L128.339 46.234Z", fill: "var(--wpp-danger-color-300)" }), h("path", { d: "M143 57.3848C143 58.4893 142.105 59.3848 141 59.3848C139.895 59.3848 139 58.4893 139 57.3848C139 56.2802 139.895 55.3848 141 55.3848C142.105 55.3848 143 56.2802 143 57.3848Z", fill: "var(--wpp-danger-color-400)" }), h("defs", null, h("filter", { id: "filter0_f_18170_277", x: "9.98535", y: "9.98529", width: "140.029", height: "140.029", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "7.5", result: "effect1_foregroundBlur_18170_277" })))));
  }
  static get registryIs() { return "wpp-empty-error-v4-3-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-error", "wpp-empty-error-v4-3-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-error-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-error-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyError$1);
      }
      break;
  } });
}

const WppEmptyError = WppEmptyError$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyError, defineCustomElement };

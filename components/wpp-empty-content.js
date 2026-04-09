import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyContent$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyContent extends HTMLElement {
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
    return (h(WppImage, { name: "wpp-empty-content", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_195)" }, h("rect", { x: "25", y: "45", width: "110", height: "75", rx: "6", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M25 46C25 42.6863 27.6863 40 31 40H129C132.314 40 135 42.6863 135 46V114C135 117.314 132.314 120 129 120H31C27.6863 120 25 117.314 25 114V46Z", fill: "var(--wpp-grey-color-000)" }), h("path", { d: "M25 46C25 42.6863 27.6863 40 31 40H129C132.314 40 135 42.6863 135 46V48H25V46Z", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "32", y: "54", width: "28", height: "28", rx: "4", fill: "var(--wpp-primary-color-500)" }), h("path", { d: "M43.9201 62.56C42.0644 62.56 40.5601 64.0643 40.5601 65.92C40.5601 67.6127 41.8118 69.0131 43.4401 69.246V70.2136C41.2801 69.9749 39.6001 68.1436 39.6001 65.92C39.6001 63.5341 41.5342 61.6 43.9201 61.6C46.1437 61.6 47.975 63.28 48.2137 65.44H47.2461C47.0132 63.8117 45.6128 62.56 43.9201 62.56ZM46.1601 66.08C45.0113 66.08 44.0801 67.0113 44.0801 68.16V72.32C44.0801 73.4688 45.0113 74.4 46.1601 74.4H50.3201C51.4689 74.4 52.4001 73.4688 52.4001 72.32V68.16C52.4001 67.0113 51.4689 66.08 50.3201 66.08H46.1601ZM45.0401 68.16C45.0401 67.5414 45.5415 67.04 46.1601 67.04H50.3201C50.9387 67.04 51.4401 67.5414 51.4401 68.16V72.32C51.4401 72.9386 50.9387 73.44 50.3201 73.44H46.1601C45.5415 73.44 45.0401 72.9386 45.0401 72.32V68.16Z", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "32", y: "86", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-200)" }), h("rect", { x: "66", y: "86", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-200)" }), h("rect", { x: "100", y: "86", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-200)" }), h("rect", { x: "32", y: "96", width: "28", height: "17", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "66", y: "96", width: "28", height: "17", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "100", y: "96", width: "28", height: "17", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "66", y: "54", width: "28", height: "28", rx: "4", fill: "var(--wpp-primary-color-500)" }), h("rect", { x: "100", y: "54", width: "28", height: "28", rx: "4", fill: "var(--wpp-primary-color-500)" }), h("path", { d: "M77.9201 62.56C76.0644 62.56 74.5601 64.0643 74.5601 65.92C74.5601 67.6127 75.8118 69.0131 77.4401 69.246V70.2136C75.2801 69.9749 73.6001 68.1436 73.6001 65.92C73.6001 63.5341 75.5342 61.6 77.9201 61.6C80.1437 61.6 81.975 63.28 82.2137 65.44H81.2461C81.0132 63.8117 79.6128 62.56 77.9201 62.56ZM80.1601 66.08C79.0113 66.08 78.0801 67.0113 78.0801 68.16V72.32C78.0801 73.4688 79.0113 74.4 80.1601 74.4H84.3201C85.4689 74.4 86.4001 73.4688 86.4001 72.32V68.16C86.4001 67.0113 85.4689 66.08 84.3201 66.08H80.1601ZM79.0401 68.16C79.0401 67.5414 79.5415 67.04 80.1601 67.04H84.3201C84.9387 67.04 85.4401 67.5414 85.4401 68.16V72.32C85.4401 72.9386 84.9387 73.44 84.3201 73.44H80.1601C79.5415 73.44 79.0401 72.9386 79.0401 72.32V68.16Z", fill: "var(--wpp-grey-color-000)" }), h("path", { d: "M111.92 62.56C110.064 62.56 108.56 64.0643 108.56 65.92C108.56 67.6127 109.812 69.0131 111.44 69.246V70.2136C109.28 69.9749 107.6 68.1436 107.6 65.92C107.6 63.5341 109.534 61.6 111.92 61.6C114.144 61.6 115.975 63.28 116.214 65.44H115.246C115.013 63.8117 113.613 62.56 111.92 62.56ZM114.16 66.08C113.011 66.08 112.08 67.0113 112.08 68.16V72.32C112.08 73.4688 113.011 74.4 114.16 74.4H118.32C119.469 74.4 120.4 73.4688 120.4 72.32V68.16C120.4 67.0113 119.469 66.08 118.32 66.08H114.16ZM113.04 68.16C113.04 67.5414 113.542 67.04 114.16 67.04H118.32C118.939 67.04 119.44 67.5414 119.44 68.16V72.32C119.44 72.9386 118.939 73.44 118.32 73.44H114.16C113.542 73.44 113.04 72.9386 113.04 72.32V68.16Z", fill: "var(--wpp-grey-color-000)" }), h("ellipse", { cx: "13.4608", cy: "64.0001", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-300)" }), h("path", { d: "M84.3387 18.1568C84.7822 16.5115 87.2182 16.5115 87.6616 18.1568L87.894 19.0191C88.0549 19.6163 88.5506 20.0771 89.178 20.2127L89.6617 20.3173C91.4465 20.7032 91.4465 23.1425 89.6617 23.5284L89.178 23.633C88.5506 23.7686 88.0549 24.2294 87.894 24.8266L87.6616 25.6889C87.2182 27.3342 84.7822 27.3342 84.3387 25.6889L84.1064 24.8266C83.9454 24.2294 83.4498 23.7686 82.8223 23.633L82.3386 23.5284C80.5538 23.1425 80.5538 20.7032 82.3386 20.3173L82.8223 20.2127C83.4498 20.0771 83.9454 19.6163 84.1064 19.0191L84.3387 18.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "97", cy: "29.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("path", { d: "M70.6463 137.695C71.0897 136.05 73.5256 136.05 73.969 137.695L74.2014 138.558C74.3623 139.155 74.8579 139.616 75.4854 139.751L75.969 139.856C77.7538 140.242 77.7538 142.681 75.969 143.067L75.4853 143.172C74.8579 143.307 74.3623 143.768 74.2014 144.365L73.969 145.227C73.5256 146.873 71.0897 146.873 70.6463 145.227L70.4139 144.365C70.2529 143.768 69.7573 143.307 69.1299 143.172L68.6462 143.067C66.8614 142.681 66.8614 140.242 68.6462 139.856L69.1299 139.751C69.7573 139.616 70.2529 139.155 70.4139 138.558L70.6463 137.695Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "98.4608", cy: "136", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-200)" }), h("defs", null, h("filter", { id: "filter0_f_18170_195", x: "12", y: "32", width: "136", height: "101", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "6.5", result: "effect1_foregroundBlur_18170_195" })))));
  }
  static get registryIs() { return "wpp-empty-content-v3-6-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-content", "wpp-empty-content-v3-6-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-content-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-content-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyContent$1);
      }
      break;
  } });
}

const WppEmptyContent = WppEmptyContent$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyContent, defineCustomElement };

import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppImage } from './WppImage.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyNothingFound$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyNothingFound extends HTMLElement {
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
    return (h(WppImage, { name: "wpp-empty-nothing-found", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("path", { d: "M142.646 59.6955C143.09 58.0502 145.526 58.0502 145.969 59.6955L146.201 60.5578C146.362 61.155 146.858 61.6158 147.485 61.7514L147.969 61.856C149.754 62.2419 149.754 64.6812 147.969 65.0671L147.485 65.1717C146.858 65.3073 146.362 65.7681 146.201 66.3653L145.969 67.2276C145.526 68.8729 143.09 68.8729 142.646 67.2276L142.414 66.3653C142.253 65.7681 141.757 65.3073 141.13 65.1717L140.646 65.0671C138.861 64.6812 138.861 62.2419 140.646 61.856L141.13 61.7514C141.757 61.6158 142.253 61.155 142.414 60.5578L142.646 59.6955Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "22.4607", cy: "91.0001", rx: "3.9998", ry: "4", fill: "var(--wpp-primary-color-200)" }), h("ellipse", { cx: "17.4608", cy: "79", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-200)" }), h("ellipse", { cx: "79.9998", cy: "147", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-200)" }), h("path", { d: "M85.6613 11.1568C85.2178 9.51153 82.7818 9.51154 82.3384 11.1568L82.106 12.0191C81.9451 12.6163 81.4494 13.0771 80.822 13.2127L80.3383 13.3173C78.5535 13.7032 78.5535 16.1425 80.3383 16.5284L80.822 16.633C81.4494 16.7686 81.9451 17.2294 82.106 17.8266L82.3384 18.6889C82.7818 20.3342 85.2178 20.3342 85.6613 18.6889L85.8936 17.8266C86.0546 17.2294 86.5502 16.7686 87.1777 16.633L87.6614 16.5284C89.4462 16.1425 89.4462 13.7032 87.6614 13.3173L87.1777 13.2127C86.5502 13.0771 86.0546 12.6163 85.8936 12.0191L85.6613 11.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "2", cy: "2", r: "2", transform: "matrix(-1 0 0 1 75 20.3076)", fill: "var(--wpp-primary-color-400)" }), h("rect", { x: "37", y: "54", width: "68", height: "80", rx: "6", fill: "var(--wpp-primary-color-300)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_248)" }, h("path", { d: "M64 114H120C123.314 114 126 111.314 126 108V59.0722C126 57.3713 125.278 55.7503 124.014 54.6124L111.711 43.5402C110.61 42.5487 109.18 42 107.698 42H64C60.6863 42 58 44.6863 58 48V108C58 111.314 60.6863 114 64 114Z", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M64 114H120C123.314 114 126 111.314 126 108V50L110 34H64C60.6863 34 58 36.6863 58 40V108C58 111.314 60.6863 114 64 114Z", fill: "var(--wpp-grey-color-000)" }), h("path", { d: "M110 50H126L110 34V50Z", fill: "var(--wpp-primary-color-300)" }), h("g", { filter: "url(#filter1_b_18170_248)" }, h("path", { d: "M69.7165 103.433C89.4422 103.433 105.433 87.4422 105.433 67.7165C105.433 47.9908 89.4422 32 69.7165 32C49.9908 32 34 47.9908 34 67.7165C34 87.4422 49.9908 103.433 69.7165 103.433Z", fill: "var(--wpp-grey-color-000)", "fill-opacity": "0.4" })), h("path", { d: "M83.4266 58.336L79.0971 54.0065L69.7165 63.387L60.336 54.0065L56.0065 58.336L65.387 67.7165L56.0065 77.0971L60.336 81.4266L69.7165 72.046L79.0971 81.4266L83.4266 77.0971L74.046 67.7165L83.4266 58.336Z", fill: "var(--wpp-primary-color-500)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M91.1083 96.3241C77.1185 106.813 57.1843 105.695 44.4611 92.9719C30.513 79.0238 30.513 56.4093 44.4611 42.4611C58.4093 28.513 81.0238 28.513 94.9719 42.4611C107.695 55.1843 108.813 75.1185 98.3241 89.1083L126 116.784L118.784 124L91.1083 96.3241ZM90.6424 88.6424C79.0854 100.2 60.3477 100.2 48.7906 88.6424C37.2336 77.0854 37.2336 58.3477 48.7906 46.7906C60.3477 35.2336 79.0854 35.2336 90.6424 46.7906C102.2 58.3477 102.2 77.0854 90.6424 88.6424Z", fill: "var(--wpp-primary-color-500)" }), h("defs", null, h("filter", { id: "filter0_f_18170_248", x: "45", y: "29", width: "94", height: "98", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "6.5", result: "effect1_foregroundBlur_18170_248" })), h("filter", { id: "filter1_b_18170_248", x: "18.6667", y: "16.6667", width: "102.1", height: "102.1", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feGaussianBlur", { in: "BackgroundImageFix", stdDeviation: "7.66667" }), h("feComposite", { in2: "SourceAlpha", operator: "in", result: "effect1_backgroundBlur_18170_248" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect1_backgroundBlur_18170_248", result: "shape" })))));
  }
  static get registryIs() { return "wpp-empty-nothing-found-v3-5-0"; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-nothing-found", "wpp-empty-nothing-found-v3-5-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-nothing-found-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-nothing-found-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyNothingFound$1);
      }
      break;
  } });
}

const WppEmptyNothingFound = WppEmptyNothingFound$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyNothingFound, defineCustomElement };

import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppImage } from './WppImage-3094f282.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmpty404 = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const width = this.width || 160;
    const height = this.height || width;
    const viewBoxSize = 160;
    return (h(WppImage, { name: "wpp-empty-404", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_265)" }, h("path", { d: "M25 53C25 49.6863 27.6863 47 31 47H129C132.314 47 135 49.6863 135 53V114C135 117.314 132.314 120 129 120H31C27.6863 120 25 117.314 25 114V53Z", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M25 46C25 42.6863 27.6863 40 31 40H129C132.314 40 135 42.6863 135 46V114C135 117.314 132.314 120 129 120H31C27.6863 120 25 117.314 25 114V46Z", fill: "var(--wpp-grey-color-000)" }), h("path", { d: "M25 46C25 42.6863 27.6863 40 31 40H129C132.314 40 135 42.6863 135 46V50H25V46Z", fill: "var(--wpp-primary-color-300)" }), h("ellipse", { cx: "13.4608", cy: "64.0001", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-300)" }), h("path", { d: "M84.3387 18.1568C84.7822 16.5115 87.2182 16.5115 87.6616 18.1568L87.894 19.0191C88.0549 19.6163 88.5506 20.0771 89.178 20.2127L89.6617 20.3173C91.4465 20.7032 91.4465 23.1425 89.6617 23.5284L89.178 23.633C88.5506 23.7686 88.0549 24.2294 87.894 24.8266L87.6616 25.6889C87.2182 27.3342 84.7822 27.3342 84.3387 25.6889L84.1064 24.8266C83.9454 24.2294 83.4498 23.7686 82.8223 23.633L82.3386 23.5284C80.5538 23.1425 80.5538 20.7032 82.3386 20.3173L82.8223 20.2127C83.4498 20.0771 83.9454 19.6163 84.1064 19.0191L84.3387 18.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "97", cy: "29.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("path", { d: "M54.3648 99.0762V92.9661H40V87.2606L53.1914 67.6759H61.2842V87.2606H65.007V92.9661H61.2842V99.0762H54.3648ZM46.9599 87.2606H54.3648V76.2948L46.9599 87.2606Z", fill: "var(--wpp-primary-color-600)" }), h("path", { d: "M79.8946 99.7236C71.1947 99.7236 67.8767 92.9661 67.8767 83.376C67.8767 73.786 70.952 67.0284 79.8946 67.0284C89.2014 67.0284 91.9934 73.786 91.9934 83.376C91.9934 92.9661 88.6349 99.7236 79.8946 99.7236ZM74.877 92.8042H84.9931V73.9478H74.877V92.8042Z", fill: "var(--wpp-primary-color-600)" }), h("path", { d: "M109.358 99.0762V92.9661H94.993V87.2606L108.184 67.6759H116.277V87.2606H120V92.9661H116.277V99.0762H109.358ZM101.953 87.2606H109.358V76.2948L101.953 87.2606Z", fill: "var(--wpp-primary-color-600)" }), h("path", { d: "M70.6463 137.695C71.0897 136.05 73.5256 136.05 73.969 137.695L74.2014 138.558C74.3623 139.155 74.8579 139.616 75.4854 139.751L75.969 139.856C77.7538 140.242 77.7538 142.681 75.969 143.067L75.4853 143.172C74.8579 143.307 74.3623 143.768 74.2014 144.365L73.969 145.227C73.5256 146.873 71.0897 146.873 70.6463 145.227L70.4139 144.365C70.2529 143.768 69.7573 143.307 69.1299 143.172L68.6462 143.067C66.8614 142.681 66.8614 140.242 68.6462 139.856L69.1299 139.751C69.7573 139.616 70.2529 139.155 70.4139 138.558L70.6463 137.695Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "98.4608", cy: "136", rx: "2.99985", ry: "3", fill: "var(--wpp-primary-color-200)" }), h("defs", null, h("filter", { id: "filter0_f_18170_265", x: "12", y: "34", width: "136", height: "99", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "6.5", result: "effect1_foregroundBlur_18170_265" })))));
  }
  static get registryIs() { return "wpp-empty-404-v3-5-0"; }
};
WppEmpty404.style = wppImageCss;

export { WppEmpty404 as wpp_empty_404 };

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppImage = require('./WppImage-dda1b38e.js');

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex}";

const WppEmptyDataviz = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const width = this.width || 160;
    const height = this.height || width;
    const viewBoxSize = 160;
    return (index.h(WppImage.WppImage, { name: "wpp-empty-dataviz", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, index.h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), index.h("path", { d: "M50 32H30V128H50V32Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M76.6667 74H56.6667V128H76.6667V74Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M83.3333 50H103.333V128H83.3333V50Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M130 92H110V128H130V92Z", fill: "var(--wpp-primary-color-500)" }), index.h("mask", { id: "mask0_18170_218", style: { 'mask-type': 'alpha' }, maskUnits: "userSpaceOnUse", x: "30", y: "32", width: "100", height: "96" }, index.h("path", { d: "M50 32H30V128H50V32Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M76.667 74H56.667V128H76.667V74Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M83.333 50H103.333V128H83.333V50Z", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M130 92H110V128H130V92Z", fill: "var(--wpp-primary-color-500)" })), index.h("g", { mask: "url(#mask0_18170_218)" }, index.h("rect", { x: "110", y: "84", width: "20", height: "32", fill: "var(--wpp-primary-color-300)" }), index.h("rect", { x: "81", y: "43", width: "24", height: "46", fill: "var(--wpp-primary-color-300)" }), index.h("rect", { x: "55", y: "43", width: "24", height: "57", fill: "var(--wpp-primary-color-300)" }), index.h("rect", { x: "28", y: "23", width: "24", height: "57", fill: "var(--wpp-primary-color-300)" }), index.h("rect", { x: "28", y: "24", width: "24", height: "31", fill: "var(--wpp-grey-color-000)" }), index.h("rect", { x: "55", y: "43", width: "24", height: "37", fill: "var(--wpp-grey-color-000)" }), index.h("rect", { x: "81", y: "43", width: "24", height: "31", fill: "var(--wpp-grey-color-000)" }), index.h("rect", { x: "110", y: "84", width: "20", height: "16", fill: "var(--wpp-grey-color-000)" })), index.h("rect", { x: "28", y: "128", width: "104", height: "2", fill: "var(--wpp-primary-color-700)" }), index.h("ellipse", { cx: "15.4608", cy: "76.0001", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-300)" }), index.h("ellipse", { cx: "125", cy: "70.0001", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-500)" }), index.h("path", { d: "M78.671 14.9872C79.0257 13.6709 80.9745 13.6709 81.3293 14.9872L81.5152 15.677C81.6439 16.1548 82.0405 16.5234 82.5424 16.6319L82.9294 16.7156C84.3572 17.0243 84.3572 18.9757 82.9294 19.2844L82.5424 19.3681C82.0405 19.4766 81.6439 19.8452 81.5152 20.323L81.3293 21.0128C80.9745 22.3291 79.0257 22.3291 78.671 21.0128L78.4851 20.323C78.3563 19.8452 77.9598 19.4766 77.4579 19.3681L77.0709 19.2844C75.643 18.9757 75.643 17.0243 77.0709 16.7156L77.4579 16.6319C77.9598 16.5234 78.3563 16.1548 78.4851 15.677L78.671 14.9872Z", fill: "var(--wpp-primary-color-200)" }), index.h("circle", { cx: "121", cy: "39.5386", r: "3", fill: "var(--wpp-primary-color-300)" }), index.h("path", { d: "M130.339 46.234C130.782 44.5887 133.218 44.5887 133.662 46.234L133.894 47.0962C134.055 47.6935 134.551 48.1542 135.178 48.2899L135.662 48.3945C137.447 48.7804 137.447 51.2196 135.662 51.6055L135.178 51.7101C134.551 51.8458 134.055 52.3066 133.894 52.9038L133.662 53.766C133.218 55.4113 130.782 55.4113 130.339 53.766L130.106 52.9038C129.945 52.3066 129.45 51.8458 128.822 51.7101L128.339 51.6055C126.554 51.2196 126.554 48.7804 128.339 48.3945L128.822 48.2899C129.45 48.1542 129.945 47.6934 130.106 47.0962L130.339 46.234Z", fill: "var(--wpp-primary-color-400)" })));
  }
  static get registryIs() { return "wpp-empty-dataviz-v2-22-0"; }
};
WppEmptyDataviz.style = wppImageCss;

exports.wpp_empty_dataviz = WppEmptyDataviz;

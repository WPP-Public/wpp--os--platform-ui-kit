'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconExperiment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-experiment", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M16.4352 15.2778L14.1633 11.4112L13.3025 9.92947C12.992 9.39323 12.8227 8.77232 12.8227 8.15141V2.94424H13.5283C13.9234 2.94424 14.2338 2.63378 14.2338 2.23866C14.2338 1.84354 13.9234 1.53308 13.5283 1.53308H6.47246C6.07733 1.53308 5.76688 1.84354 5.76688 2.23866C5.76688 2.63378 6.07733 2.94424 6.47246 2.94424H7.17804V8.15141C7.17804 8.77232 7.0087 9.39323 6.69824 9.92947L5.83744 11.4112L3.56547 15.2778C2.747 16.6889 3.76303 18.467 5.39998 18.467H14.6007C16.2377 18.467 17.2537 16.6889 16.4352 15.2778ZM14.6007 17.0558H5.39998C4.84962 17.0558 4.51095 16.4631 4.79318 15.9975L6.6418 12.8223L7.46027 11.4112L7.91184 10.6351C8.36341 9.88714 8.5892 9.02633 8.5892 8.15141V2.94424H11.4115V8.15141C11.4115 9.02633 11.6373 9.88714 12.0889 10.6351L12.5404 11.4112L13.3589 12.8223L15.2075 15.9975C15.4756 16.4631 15.137 17.0558 14.6007 17.0558Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-experiment-v4-0-0"; }
};
WppIconExperiment.style = wppIconCss;

exports.wpp_icon_experiment = WppIconExperiment;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTrain = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-train", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.75 13C7.16421 13 7.5 12.6642 7.5 12.25C7.5 11.8358 7.16421 11.5 6.75 11.5C6.33579 11.5 6 11.8358 6 12.25C6 12.6642 6.33579 13 6.75 13Z", fill: "currentColor" }), index.h("path", { d: "M14 12.25C14 12.6642 13.6642 13 13.25 13C12.8358 13 12.5 12.6642 12.5 12.25C12.5 11.8358 12.8358 11.5 13.25 11.5C13.6642 11.5 14 11.8358 14 12.25Z", fill: "currentColor" }), index.h("path", { d: "M8.25 5.25C8.25 4.83579 8.58579 4.5 9 4.5H11C11.4142 4.5 11.75 4.83579 11.75 5.25C11.75 5.66421 11.4142 6 11 6H9C8.58579 6 8.25 5.66421 8.25 5.25Z", fill: "currentColor" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.25 4.75C3.25 3.23122 4.48122 2 6 2H14C15.5188 2 16.75 3.23122 16.75 4.75V12.75C16.75 14.2688 15.5188 15.5 14 15.5H13.9148L15.9249 16.882C16.2662 17.1166 16.3527 17.5836 16.118 17.9249C15.8834 18.2662 15.4164 18.3527 15.0751 18.118L11.587 15.7199C11.3786 15.5767 11.1317 15.5 10.8788 15.5H9.12118C8.86831 15.5 8.62139 15.5767 8.41302 15.7199L4.9249 18.118C4.58357 18.3527 4.11663 18.2662 3.88197 17.9249C3.6473 17.5836 3.73377 17.1166 4.0751 16.882L6.08524 15.5H6C4.48122 15.5 3.25 14.2688 3.25 12.75V4.75ZM14 14C14.6904 14 15.25 13.4404 15.25 12.75V10.5H4.75V12.75C4.75 13.4404 5.30964 14 6 14H14ZM15.25 4.75V9H4.75V4.75C4.75 4.05964 5.30964 3.5 6 3.5H14C14.6904 3.5 15.25 4.05964 15.25 4.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-train-v2-22-0"; }
};
WppIconTrain.style = wppIconCss;

exports.wpp_icon_train = WppIconTrain;

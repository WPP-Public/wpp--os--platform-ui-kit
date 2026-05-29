'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss$3 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconGear = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-gear", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 1.5415C9.33201 1.5415 8.68936 1.62631 8.07631 1.76893C7.76617 1.84108 7.5354 2.1012 7.50072 2.41772L7.36821 3.62697C7.32923 3.98301 7.12281 4.29937 6.8123 4.47877C6.50244 4.65779 6.12511 4.67841 5.79694 4.53413L4.68541 4.04503C4.39425 3.91691 4.05394 3.9864 3.83632 4.21841C2.96027 5.15238 2.28777 6.28388 1.90546 7.54768C1.81336 7.85215 1.92334 8.1816 2.17987 8.36968L3.16508 9.09203C3.45449 9.30472 3.625 9.64157 3.625 9.99984C3.625 10.3583 3.45434 10.695 3.16514 10.9072L2.17987 11.6296C1.92334 11.8177 1.81336 12.1471 1.90546 12.4516C2.28772 13.7152 2.95977 14.8468 3.83645 15.781C4.05409 16.0129 4.39432 16.0823 4.68541 15.9542L5.79694 15.4651C6.12515 15.3208 6.50239 15.3414 6.8123 15.5205C7.12281 15.6999 7.32924 16.0163 7.36822 16.3724L7.50072 17.5815C7.53538 17.8979 7.7659 18.1579 8.0758 18.2302C8.68919 18.3734 9.332 18.4582 10 18.4582C10.668 18.4582 11.3107 18.3734 11.9237 18.2307C12.2338 18.1586 12.4646 17.8985 12.4993 17.5819L12.6318 16.3723C12.6708 16.0162 12.8772 15.6999 13.1877 15.5205C13.4976 15.3414 13.8749 15.3208 14.2031 15.4651L15.3146 15.9542C15.6058 16.0824 15.9461 16.0129 16.1637 15.7809C17.0397 14.8469 17.7122 13.7154 18.0945 12.4516C18.1866 12.1471 18.0767 11.8177 17.8201 11.6296L16.8349 10.9072C16.5457 10.695 16.375 10.3583 16.375 9.99984C16.375 9.64137 16.5457 9.30464 16.8349 9.09249L17.8201 8.3701C18.0767 8.18201 18.1866 7.85256 18.0945 7.54809C17.7122 6.2843 17.0397 5.15279 16.1637 4.21882C15.9461 3.98681 15.6058 3.91732 15.3146 4.04544L14.2029 4.53461C13.8748 4.67888 13.4976 4.65821 13.1877 4.47918C12.8772 4.29979 12.6708 3.98335 12.6318 3.62731L12.4993 2.41814C12.4646 2.10181 12.2341 1.84179 11.9242 1.76946C11.3108 1.62631 10.668 1.5415 10 1.5415ZM8.8593 3.79021L8.93182 3.12842C9.28229 3.07219 9.63842 3.0415 10 3.0415C10.3616 3.0415 10.7178 3.0722 11.0682 3.12854L11.1407 3.7907C11.2318 4.62213 11.7137 5.3599 12.4373 5.77799C13.1616 6.19644 14.042 6.24406 14.8071 5.90757L15.4142 5.64042C15.8619 6.19415 16.2264 6.81531 16.4878 7.487L15.9476 7.88302C15.2735 8.37754 14.875 9.1633 14.875 9.99984C14.875 10.8364 15.2737 11.6222 15.9478 12.1168L16.4878 12.5127C16.2264 13.1844 15.8619 13.8055 15.4142 14.3593L14.8069 14.092C14.0418 13.7556 13.1616 13.8032 12.4373 14.2217C11.7136 14.6398 11.2317 15.3776 11.1407 16.2091L11.0682 16.8713C10.7177 16.9275 10.3616 16.9582 10 16.9582C9.63836 16.9582 9.28223 16.9275 8.93185 16.8711L8.85929 16.209C8.76825 15.3775 8.28635 14.6398 7.5627 14.2217C6.83845 13.8032 5.95806 13.7556 5.19293 14.0921L4.58573 14.3593C4.13792 13.8056 3.77351 13.1845 3.51222 12.5127L4.05237 12.1167C4.7265 11.6221 5.125 10.8364 5.125 9.99984C5.125 9.16323 4.72598 8.37732 4.05222 7.88249L3.51224 7.48658C3.77356 6.8149 4.1381 6.19374 4.58583 5.64001L5.19307 5.90721C5.9582 6.2437 6.83845 6.19602 7.5627 5.77757C8.28635 5.35948 8.76826 4.62163 8.8593 3.79021ZM8.04169 9.99984C8.04169 8.91828 8.91846 8.0415 10 8.0415C11.0816 8.0415 11.9584 8.91828 11.9584 9.99984C11.9584 11.0814 11.0816 11.9582 10 11.9582C8.91846 11.9582 8.04169 11.0814 8.04169 9.99984ZM10 6.5415C8.09004 6.5415 6.54169 8.08985 6.54169 9.99984C6.54169 11.9098 8.09004 13.4582 10 13.4582C11.91 13.4582 13.4584 11.9098 13.4584 9.99984C13.4584 8.08985 11.91 6.5415 10 6.5415Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-gear-v4-1-0"; }
};
WppIconGear.style = wppIconCss$3;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-play", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.5 15.9991C5.5 16.1906 5.70646 16.311 5.87311 16.2167L16.4757 10.2175C16.6449 10.1218 16.6449 9.8781 16.4757 9.78237L5.87311 3.78326C5.70646 3.68896 5.5 3.80935 5.5 4.00084V15.9991ZM6.23868 2.26663L17.5989 8.69445C18.614 9.2688 18.614 10.7311 17.5989 11.3055L6.23868 17.7333C5.23874 18.2991 4 17.5767 4 16.4278V3.57214C4 2.42323 5.23874 1.70085 6.23868 2.26663Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-play-v4-1-0"; }
};
WppIconPlay.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconService = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-service", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M14.0604 8.06071C13.7677 8.35343 13.3837 8.5 12.9998 8.5C12.6158 8.5 12.2318 8.35343 11.9391 8.06071C11.3533 7.47529 11.3533 6.52514 11.9391 5.93971L14.882 2.99671C14.2499 2.68171 13.5397 2.5 12.7855 2.5C10.182 2.5 8.0714 4.61071 8.0714 7.21429C8.0714 7.88757 8.21497 8.527 8.46953 9.10643L3.00205 14.5737C2.33265 15.2431 2.33265 16.3287 3.00205 16.9977C3.33718 17.3324 3.77559 17.5 4.21443 17.5C4.65327 17.5 5.09168 17.3324 5.4268 16.9977L10.8939 11.5304C11.4733 11.785 12.1122 11.9286 12.7859 11.9286C15.3894 11.9286 17.5 9.81786 17.5 7.21429C17.5 6.46 17.3183 5.74986 17.0037 5.11771L14.0604 8.06071Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-service-v4-1-0"; }
};
WppIconService.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-stop", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M15.6389 4.16667C15.7463 4.16667 15.8333 4.25372 15.8333 4.36111V15.6389C15.8333 15.7463 15.7463 15.8333 15.6389 15.8333H4.36111C4.25372 15.8333 4.16667 15.7463 4.16667 15.6389V4.36111C4.16667 4.25372 4.25372 4.16667 4.36111 4.16667H15.6389ZM4.36111 3C3.60939 3 3 3.60939 3 4.36111V15.6389C3 16.3906 3.60939 17 4.36111 17H15.6389C16.3906 17 17 16.3906 17 15.6389V4.36111C17 3.60939 16.3906 3 15.6389 3H4.36111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-v4-1-0"; }
};
WppIconStop.style = wppIconCss;

exports.wpp_icon_gear = WppIconGear;
exports.wpp_icon_play = WppIconPlay;
exports.wpp_icon_service = WppIconService;
exports.wpp_icon_stop = WppIconStop;

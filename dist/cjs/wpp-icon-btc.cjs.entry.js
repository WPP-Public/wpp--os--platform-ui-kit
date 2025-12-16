'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBtc = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-btc", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.94922 1.75C8.35696 1.75 8.6875 2.08579 8.6875 2.5V4.25H10.4922V2.5C10.4922 2.08579 10.8227 1.75 11.2305 1.75C11.6382 1.75 11.9687 2.08579 11.9687 2.5V4.25H12.0508C12.8993 4.25 13.713 4.59241 14.313 5.2019C14.9129 5.8114 15.25 6.63805 15.25 7.5C15.25 8.36195 14.9129 9.1886 14.313 9.7981C14.2431 9.86906 14.1704 9.9364 14.095 10C14.1704 10.0636 14.2431 10.1309 14.313 10.2019C14.9129 10.8114 15.25 11.638 15.25 12.5C15.25 13.362 14.9129 14.1886 14.313 14.7981C13.713 15.4076 12.8993 15.75 12.0508 15.75H11.9687V17.5C11.9687 17.9142 11.6382 18.25 11.2305 18.25C10.8227 18.25 10.4922 17.9142 10.4922 17.5V15.75H8.6875V17.5C8.6875 17.9142 8.35696 18.25 7.94922 18.25C7.54148 18.25 7.21094 17.9142 7.21094 17.5V15.75H5.48828C5.08054 15.75 4.75 15.4142 4.75 15C4.75 14.5858 5.08054 14.25 5.48828 14.25H6.39062V5.75H5.48828C5.08054 5.75 4.75 5.41421 4.75 5C4.75 4.58579 5.08054 4.25 5.48828 4.25H7.21094V2.5C7.21094 2.08579 7.54148 1.75 7.94922 1.75ZM7.86719 5.75V9.25H12.0508C12.5077 9.25 12.9458 9.06563 13.2689 8.73744C13.5919 8.40925 13.7734 7.96413 13.7734 7.5C13.7734 7.03587 13.5919 6.59075 13.2689 6.26256C12.9458 5.93437 12.5077 5.75 12.0508 5.75H7.86719ZM12.0508 10.75H7.86719V14.25H12.0508C12.5077 14.25 12.9458 14.0656 13.2689 13.7374C13.5919 13.4092 13.7734 12.9641 13.7734 12.5C13.7734 12.0359 13.5919 11.5908 13.2689 11.2626C12.9458 10.9344 12.5077 10.75 12.0508 10.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-btc-v3-4-0"; }
};
WppIconBtc.style = wppIconCss;

exports.wpp_icon_btc = WppIconBtc;

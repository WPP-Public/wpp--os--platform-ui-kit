'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBookmarkFilled = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-bookmark-filled component is deprecated. Please, use wpp-icon-bookmark-selected instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-bookmark-filled", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.87484 1.95837C5.31021 1.95837 4.0415 3.22708 4.0415 4.79171V17.2917C4.0415 17.5732 4.19908 17.8309 4.44958 17.9592C4.70008 18.0875 5.00133 18.0648 5.22973 17.9004L9.99984 14.4659L14.7699 17.9004C14.9983 18.0648 15.2996 18.0875 15.5501 17.9592C15.8006 17.8309 15.9582 17.5732 15.9582 17.2917V4.79171C15.9582 3.22708 14.6895 1.95837 13.1248 1.95837H6.87484Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bookmark-filled-v3-3-0"; }
};
WppIconBookmarkFilled.style = wppIconCss;

exports.wpp_icon_bookmark_filled = WppIconBookmarkFilled;

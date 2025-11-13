'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCommunication = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-communication", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", fill: "currentColor" }), index.h("path", { d: "M10 4.2C6.24446 4.2 3.2 7.24446 3.2 11C3.2 12.8758 3.95872 14.5732 5.18746 15.8041C5.42157 16.0386 5.42124 16.4185 5.18672 16.6526C4.9522 16.8867 4.5723 16.8864 4.33819 16.6519C2.89404 15.2052 2 13.2064 2 11C2 6.58172 5.58172 3 10 3C14.4183 3 18 6.58172 18 11C18 13.2064 17.106 15.2052 15.6618 16.6519C15.4277 16.8864 15.0478 16.8867 14.8133 16.6526C14.5788 16.4185 14.5784 16.0386 14.8125 15.8041C16.0413 14.5732 16.8 12.8758 16.8 11C16.8 7.24446 13.7555 4.2 10 4.2ZM10 7C7.79086 7 6 8.79086 6 11C6 12.1054 6.44762 13.1052 7.17293 13.8298C7.40736 14.064 7.40754 14.4439 7.17334 14.6783C6.93914 14.9127 6.55924 14.9129 6.32481 14.6787C5.38342 13.7382 4.8 12.4367 4.8 11C4.8 8.12812 7.12812 5.8 10 5.8C12.8719 5.8 15.2 8.12812 15.2 11C15.2 12.4367 14.6166 13.7382 13.6752 14.6787C13.4408 14.9129 13.0609 14.9127 12.8267 14.6783C12.5925 14.4439 12.5926 14.064 12.8271 13.8298C13.5524 13.1052 14 12.1054 14 11C14 8.79086 12.2091 7 10 7ZM10 9C8.89543 9 8 9.89543 8 11C8 12.1046 8.89543 13 10 13C11.1046 13 12 12.1046 12 11C12 9.89543 11.1046 9 10 9ZM9.2 11C9.2 10.5582 9.55817 10.2 10 10.2C10.4418 10.2 10.8 10.5582 10.8 11C10.8 11.4418 10.4418 11.8 10 11.8C9.55817 11.8 9.2 11.4418 9.2 11Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-communication-v3-3-1"; }
};
WppIconCommunication.style = wppIconCss;

exports.wpp_icon_communication = WppIconCommunication;

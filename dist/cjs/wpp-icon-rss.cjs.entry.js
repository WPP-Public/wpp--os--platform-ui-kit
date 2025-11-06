'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-be5823e9.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRss = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-rss", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.91667 6.5C5.60162 6.5 5.33333 6.25326 5.33333 5.93821V5.8959C5.33333 5.59016 5.57061 5.3348 5.87634 5.33342L5.91667 5.33333C10.7492 5.33333 14.6667 9.25084 14.6667 14.0833L14.6666 14.1237C14.6652 14.4294 14.4098 14.6667 14.1041 14.6667H14.0618C13.7467 14.6667 13.5 14.3984 13.5 14.0833C13.5 9.89517 10.1048 6.5 5.91667 6.5Z", fill: "currentColor" }), index.h("path", { d: "M11.0064 14.6667C11.3015 14.6667 11.5519 14.4434 11.5552 14.1484C11.5554 14.1267 11.5556 14.105 11.5556 14.0833C11.5556 10.9691 9.03094 8.44444 5.91667 8.44444C5.89496 8.44444 5.87328 8.44457 5.85163 8.44481C5.55663 8.44815 5.33333 8.69855 5.33333 8.99357V9.06385C5.33333 9.37391 5.60661 9.61111 5.91667 9.61111C8.38661 9.61111 10.3889 11.6134 10.3889 14.0833C10.3889 14.3934 10.6261 14.6667 10.9361 14.6667H11.0064Z", fill: "currentColor" }), index.h("path", { d: "M7.66667 13.5C7.66667 14.1443 7.14433 14.6667 6.5 14.6667C5.85567 14.6667 5.33333 14.1443 5.33333 13.5C5.33333 12.8557 5.85567 12.3333 6.5 12.3333C7.14433 12.3333 7.66667 12.8557 7.66667 13.5Z", fill: "currentColor" }), index.h("path", { d: "M5.52778 3C4.13172 3 3 4.13172 3 5.52778V14.4722C3 15.8683 4.13172 17 5.52778 17H14.4722C15.8683 17 17 15.8683 17 14.4722V5.52778C17 4.13172 15.8683 3 14.4722 3H5.52778ZM4.16667 5.52778C4.16667 4.77606 4.77606 4.16667 5.52778 4.16667H14.4722C15.2239 4.16667 15.8333 4.77606 15.8333 5.52778V14.4722C15.8333 15.2239 15.2239 15.8333 14.4722 15.8333H5.52778C4.77606 15.8333 4.16667 15.2239 4.16667 14.4722V5.52778Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-rss-v2-22-0"; }
};
WppIconRss.style = wppIconCss;

exports.wpp_icon_rss = WppIconRss;

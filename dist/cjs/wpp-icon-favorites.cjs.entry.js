'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFavorites = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-favorites component is deprecated. Please, use wpp-icon-favourites instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-favorites", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.0001 1.95831C10.2842 1.95831 10.5439 2.11881 10.6709 2.3729L12.7891 6.60934L17.8225 7.3837C18.1018 7.42668 18.3333 7.62304 18.4212 7.89164C18.5091 8.16024 18.4386 8.45546 18.2388 8.65531L14.7575 12.1366L15.533 17.1776C15.576 17.457 15.4582 17.7369 15.2283 17.9015C14.9984 18.0661 14.6955 18.0874 14.4448 17.9566L10.0001 15.6376L5.55536 17.9566C5.30469 18.0874 5.00178 18.0661 4.77188 17.9015C4.54198 17.7369 4.42416 17.457 4.46716 17.1776L5.2427 12.1366L1.76144 8.65531C1.56159 8.45546 1.49106 8.16024 1.57899 7.89164C1.66692 7.62304 1.89838 7.42668 2.17773 7.3837L7.21106 6.60934L9.32928 2.3729C9.45633 2.11881 9.71602 1.95831 10.0001 1.95831ZM10.0001 4.38536L8.37925 7.62706C8.27047 7.84463 8.06291 7.99594 7.82248 8.03293L3.86865 8.64121L6.5721 11.3446C6.74103 11.5136 6.81937 11.7529 6.78305 11.989L6.17499 15.9414L9.65318 14.1267C9.87056 14.0133 10.1296 14.0133 10.347 14.1267L13.8252 15.9414L13.2172 11.989C13.1808 11.7529 13.2592 11.5136 13.4281 11.3446L16.1315 8.64121L12.1777 8.03293C11.9373 7.99594 11.7297 7.84463 11.6209 7.62706L10.0001 4.38536Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-favorites-v3-6-0"; }
};
WppIconFavorites.style = wppIconCss;

exports.wpp_icon_favorites = WppIconFavorites;

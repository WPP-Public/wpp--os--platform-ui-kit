'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconGraph = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-graph", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.125 2.375C3.53921 2.375 3.875 2.71079 3.875 3.125V16.125H16.875C17.2892 16.125 17.625 16.4608 17.625 16.875C17.625 17.2892 17.2892 17.625 16.875 17.625H3.125C2.71079 17.625 2.375 17.2892 2.375 16.875V3.125C2.375 2.71079 2.71079 2.375 3.125 2.375ZM17.2725 3.739C17.6238 3.95853 17.7305 4.42125 17.511 4.7725L14.386 9.7725C14.2549 9.98221 14.0289 10.1138 13.7818 10.1243C13.5348 10.1348 13.2984 10.0228 13.15 9.825L11.9442 8.21733L10.0181 11.4275C9.88964 11.6417 9.66302 11.7778 9.41364 11.7907C9.16426 11.8035 8.92483 11.6914 8.775 11.4917L7.5474 9.85487L6.25588 11.8639C6.03189 12.2123 5.56786 12.3132 5.21943 12.0892C4.871 11.8652 4.77013 11.4012 4.99412 11.0528L6.86912 8.1361C7.00193 7.92949 7.22749 7.80101 7.47294 7.79215C7.7184 7.78329 7.95263 7.89518 8.1 8.09167L9.30575 9.69934L11.2319 6.48913C11.3604 6.275 11.587 6.13886 11.8364 6.126C12.0857 6.11313 12.3252 6.22523 12.475 6.425L13.6937 8.04995L16.239 3.9775C16.4585 3.62625 16.9212 3.51947 17.2725 3.739Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-graph-v3-6-0"; }
};
WppIconGraph.style = wppIconCss;

exports.wpp_icon_graph = WppIconGraph;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEraser = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-eraser", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M13.2597 2.55511L17.4449 6.74027C18.185 7.48041 18.185 8.68042 17.4449 9.42057L10.1319 16.7324L15.2684 16.7326C15.5882 16.7326 15.8525 16.9703 15.8944 17.2786L15.9001 17.3644C15.9001 17.6842 15.6625 17.9485 15.3541 17.9903L15.2684 17.9961L8.18431 17.9972C7.66526 18.0255 7.13678 17.8414 6.74027 17.4449L2.55511 13.2597C1.81496 12.5196 1.81496 11.3196 2.55511 10.5794L10.5794 2.55511C11.3196 1.81496 12.5196 1.81496 13.2597 2.55511ZM4.70053 10.2195L3.44854 11.4729C3.20182 11.7196 3.20182 12.1196 3.44854 12.3663L7.6337 16.5515C7.75706 16.6748 7.91874 16.7365 8.08042 16.7365L8.10474 16.7326L8.13717 16.734C8.27945 16.7212 8.41823 16.6604 8.52713 16.5515L9.77897 15.2988L4.70053 10.2195ZM11.4729 3.44854L5.59424 9.32579L10.6727 14.4051L16.5515 8.52714C16.7982 8.28042 16.7982 7.88042 16.5515 7.6337L12.3663 3.44854C12.1196 3.20182 11.7196 3.20182 11.4729 3.44854Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-eraser-v3-6-0"; }
};
WppIconEraser.style = wppIconCss;

exports.wpp_icon_eraser = WppIconEraser;

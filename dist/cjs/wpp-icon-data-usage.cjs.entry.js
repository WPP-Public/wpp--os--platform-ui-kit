'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataUsage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-data-usage", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M14.8611 3C16.0424 3 17 3.95761 17 5.13889V14.8611C17 16.0424 16.0424 17 14.8611 17H5.13889C3.95761 17 3 16.0424 3 14.8611V5.13889C3 3.95761 3.95761 3 5.13889 3H14.8611ZM14.8611 4.16667H5.13889C4.60195 4.16667 4.16667 4.60195 4.16667 5.13889V14.8611C4.16667 15.3981 4.60195 15.8333 5.13889 15.8333H14.8611C15.3981 15.8333 15.8333 15.3981 15.8333 14.8611V5.13889C15.8333 4.60195 15.3981 4.16667 14.8611 4.16667ZM6.69444 7.66924C6.98976 7.66924 7.23383 7.88775 7.27245 8.17125L7.27778 8.25007V13.3106C7.27778 13.6314 7.01661 13.8915 6.69444 13.8915C6.39913 13.8915 6.15506 13.673 6.11644 13.3895L6.11111 13.3106V8.25007C6.11111 7.92928 6.37228 7.66924 6.69444 7.66924ZM13.3056 6.11368C13.6009 6.11368 13.8449 6.32711 13.8836 6.60402L13.8889 6.681V13.3241C13.8889 13.6375 13.6277 13.8915 13.3056 13.8915C13.0102 13.8915 12.7662 13.678 12.7275 13.4011L12.7222 13.3241V6.681C12.7222 6.36768 12.9834 6.11368 13.3056 6.11368ZM9.98064 10C10.269 9.99723 10.5094 10.2074 10.5499 10.4828L10.5558 10.5594L10.5833 13.3184C10.5864 13.6304 10.3339 13.8858 10.0194 13.8889C9.73102 13.8917 9.4906 13.6815 9.45014 13.4062L9.44417 13.3296L9.4167 10.5705C9.41359 10.2586 9.66607 10.0031 9.98064 10Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-data-usage-v3-4-0"; }
};
WppIconDataUsage.style = wppIconCss;

exports.wpp_icon_data_usage = WppIconDataUsage;

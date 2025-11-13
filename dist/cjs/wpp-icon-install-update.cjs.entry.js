'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconInstallUpdate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-install-update", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.7085 3.95817C4.7085 3.45197 5.11896 3.0415 5.62516 3.0415H8.3335V1.5415H5.62516C4.29053 1.5415 3.2085 2.62354 3.2085 3.95817V15.2082V16.0415C3.2085 17.3761 4.29053 18.4582 5.62516 18.4582H14.3752C15.7098 18.4582 16.7918 17.3761 16.7918 16.0415V15.2082V3.95817C16.7918 2.62354 15.7098 1.5415 14.3752 1.5415H11.6668V3.0415H14.3752C14.8814 3.0415 15.2918 3.45197 15.2918 3.95817V12.9714C15.0091 12.8555 14.6996 12.7915 14.3752 12.7915H5.62516C5.30071 12.7915 4.99118 12.8555 4.7085 12.9714V3.95817ZM4.7085 15.2082V16.0415C4.7085 16.5477 5.11896 16.9582 5.62516 16.9582H14.3752C14.8814 16.9582 15.2918 16.5477 15.2918 16.0415V15.2082C15.2918 14.702 14.8814 14.2915 14.3752 14.2915H5.62516C5.11896 14.2915 4.7085 14.702 4.7085 15.2082ZM6.0415 16.25C6.38668 16.25 6.6665 15.9702 6.6665 15.625C6.6665 15.2798 6.38668 15 6.0415 15C5.69633 15 5.4165 15.2798 5.4165 15.625C5.4165 15.9702 5.69633 16.25 6.0415 16.25ZM10 1.5415C10.4142 1.5415 10.75 1.87729 10.75 2.2915V8.81467L12.3865 7.17817C12.6794 6.88527 13.1543 6.88527 13.4472 7.17817C13.7401 7.47106 13.7401 7.94593 13.4472 8.23883L10.5305 11.1555C10.2376 11.4484 9.76273 11.4484 9.46983 11.1555L6.55317 8.23883C6.26027 7.94593 6.26027 7.47106 6.55317 7.17817C6.84606 6.88527 7.32093 6.88527 7.61383 7.17817L9.25 8.81434V2.2915C9.25 1.87729 9.58579 1.5415 10 1.5415Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-install-update-v3-3-1"; }
};
WppIconInstallUpdate.style = wppIconCss;

exports.wpp_icon_install_update = WppIconInstallUpdate;

import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconImage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-image", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.79167 3.875C4.28546 3.875 3.875 4.28546 3.875 4.79167V15.09L8.74115 10.383C9.44315 9.70374 10.5575 9.70372 11.2596 10.3829C11.2596 10.3829 11.2596 10.383 11.2596 10.383L16.125 15.0897V4.79167C16.125 4.28546 15.7145 3.875 15.2083 3.875H4.79167ZM15.0378 16.125L10.2166 11.461L10.2166 11.461C10.0961 11.3444 9.90468 11.3444 9.7842 11.461L9.78412 11.461L4.9625 16.125H15.0378ZM2.375 4.79167C2.375 3.45704 3.45704 2.375 4.79167 2.375H15.2083C16.543 2.375 17.625 3.45704 17.625 4.79167V15.2083C17.625 16.543 16.543 17.625 15.2083 17.625H4.79167C3.45704 17.625 2.375 16.543 2.375 15.2083V4.79167ZM12.7085 6.79175C12.4324 6.79175 12.2085 7.01561 12.2085 7.29175C12.2085 7.56789 12.4324 7.79175 12.7085 7.79175C12.9846 7.79175 13.2085 7.56789 13.2085 7.29175C13.2085 7.01561 12.9846 6.79175 12.7085 6.79175ZM10.7085 7.29175C10.7085 6.18718 11.6039 5.29175 12.7085 5.29175C13.8131 5.29175 14.7085 6.18718 14.7085 7.29175C14.7085 8.39632 13.8131 9.29175 12.7085 9.29175C11.6039 9.29175 10.7085 8.39632 10.7085 7.29175Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-image-v3-3-1"; }
};
WppIconImage.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconVideoClip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-video-clip", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8 7.90744V12.0928C8 12.5484 8.48794 12.8378 8.88778 12.6192L12.7167 10.5263C13.133 10.2988 13.133 9.70088 12.7166 9.47336L8.88773 7.38093C8.48789 7.16243 8 7.4518 8 7.90744ZM4.6 2.7998C3.16406 2.7998 2 3.96386 2 5.3998V14.5998C2 16.0357 3.16406 17.1998 4.6 17.1998H15.4C16.8359 17.1998 18 16.0357 18 14.5998V5.3998C18 3.96386 16.8359 2.7998 15.4 2.7998H4.6ZM3.2 5.3998C3.2 4.62661 3.8268 3.9998 4.6 3.9998H15.4C16.1732 3.9998 16.8 4.62661 16.8 5.3998V14.5998C16.8 15.373 16.1732 15.9998 15.4 15.9998H4.6C3.8268 15.9998 3.2 15.373 3.2 14.5998V5.3998Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-video-clip-v3-3-1"; }
};
WppIconVideoClip.style = wppIconCss;

export { WppIconImage as W, WppIconVideoClip as a };

import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCloudDismiss = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cloud-dismiss", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.26931 5.8C5.64877 3.63421 7.53966 2 9.8 2C12.0603 2 13.9512 3.63421 14.3307 5.8L14.4 5.8C16.1673 5.8 17.6 7.23269 17.6 9C17.6 9.14969 17.5897 9.29698 17.5698 9.4412C17.2066 9.01229 16.7751 8.64304 16.2921 8.3502C16.0223 7.56461 15.2771 7 14.4 7L13.7951 7.00002C13.4752 7.00003 13.2115 6.74905 13.1958 6.42953C13.107 4.625 11.6144 3.2 9.8 3.2C7.98562 3.2 6.49304 4.625 6.40419 6.42953C6.38845 6.74905 6.1248 7.00003 5.80489 7.00002L5.2 7C4.09543 7 3.2 7.89543 3.2 9C3.2 10.1046 4.09543 11 5.2 11H8.71997C8.57939 11.381 8.48215 11.783 8.43424 12.2H5.2C3.43269 12.2 2 10.7673 2 9C2 7.23269 3.43269 5.8 5.20002 5.8L5.26931 5.8ZM18 12.8C18 15.2301 16.0301 17.2 13.6 17.2C11.1699 17.2 9.2 15.2301 9.2 12.8C9.2 10.3699 11.1699 8.4 13.6 8.4C16.0301 8.4 18 10.3699 18 12.8ZM12.2828 10.9172C12.1266 10.7609 11.8734 10.7609 11.7172 10.9172C11.5609 11.0734 11.5609 11.3266 11.7172 11.4828L13.0343 12.8L11.7172 14.1172C11.5609 14.2734 11.5609 14.5266 11.7172 14.6828C11.8734 14.8391 12.1266 14.8391 12.2828 14.6828L13.6 13.3657L14.9172 14.6828C15.0734 14.8391 15.3266 14.8391 15.4828 14.6828C15.6391 14.5266 15.6391 14.2734 15.4828 14.1172L14.1657 12.8L15.4828 11.4828C15.6391 11.3266 15.6391 11.0734 15.4828 10.9172C15.3266 10.7609 15.0734 10.7609 14.9172 10.9172L13.6 12.2343L12.2828 10.9172Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cloud-dismiss-v4-0-0"; }
};
WppIconCloudDismiss.style = wppIconCss;

export { WppIconCloudDismiss as wpp_icon_cloud_dismiss };

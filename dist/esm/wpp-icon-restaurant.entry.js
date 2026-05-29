import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRestaurant = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-restaurant", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.75 2.75C4.75 2.33579 4.41421 2 4 2C3.58579 2 3.25 2.33579 3.25 2.75V6.25C3.25 8.06422 4.53832 9.57753 6.25 9.92499V17.25C6.25 17.6642 6.58579 18 7 18C7.41421 18 7.75 17.6642 7.75 17.25V9.92499C9.46168 9.57753 10.75 8.06422 10.75 6.25V2.75C10.75 2.33579 10.4142 2 10 2C9.58579 2 9.25 2.33579 9.25 2.75V6.25C9.25 7.22966 8.62389 8.06309 7.75 8.37197V2.75C7.75 2.33579 7.41421 2 7 2C6.58579 2 6.25 2.33579 6.25 2.75V8.37197C5.37611 8.06309 4.75 7.22966 4.75 6.25V2.75Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.25 5.75C12.25 3.67893 13.9289 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V17.25C16.75 17.6642 16.4142 18 16 18C15.5858 18 15.25 17.6642 15.25 17.25V14H14C13.0335 14 12.25 13.2165 12.25 12.25V5.75ZM15.25 12.5V3.62803C14.3761 3.93691 13.75 4.77034 13.75 5.75V12.25C13.75 12.3881 13.8619 12.5 14 12.5H15.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-restaurant-v4-1-0"; }
};
WppIconRestaurant.style = wppIconCss;

export { WppIconRestaurant as wpp_icon_restaurant };

import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCalendarAdd = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-calendar-add", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.6 10.2C17.0301 10.2 19 12.1699 19 14.6C19 17.0301 17.0301 19 14.6 19C12.1699 19 10.2 17.0301 10.2 14.6C10.2 12.1699 12.1699 10.2 14.6 10.2ZM14.8 3C16.2359 3 17.4 4.16406 17.4 5.6L17.401 10.2181C17.0302 9.9806 16.6274 9.78889 16.2003 9.65091L16.2 7.4H4.2V14.8C4.2 15.5732 4.8268 16.2 5.6 16.2L9.65091 16.2003C9.78889 16.6274 9.9806 17.0302 10.2181 17.401L5.6 17.4C4.16406 17.4 3 16.2359 3 14.8V5.6C3 4.16406 4.16406 3 5.6 3H14.8ZM14.6 11.8L14.5281 11.8064C14.3648 11.8361 14.2361 11.9648 14.2064 12.1281L14.2 12.2V14.2H12.2L12.1281 14.2064C11.9648 14.2361 11.8361 14.3648 11.8064 14.5281L11.8 14.6L11.8064 14.6719C11.8361 14.8352 11.9648 14.9639 12.1281 14.9936L12.2 15H14.2V17L14.2064 17.0719C14.2361 17.2352 14.3648 17.3639 14.5281 17.3936L14.6 17.4L14.6719 17.3936C14.8352 17.3639 14.9639 17.2352 14.9936 17.0719L15 17V15H17L17.0719 14.9936C17.2352 14.9639 17.3639 14.8352 17.3936 14.6719L17.4 14.6L17.3936 14.5281C17.3639 14.3648 17.2352 14.2361 17.0719 14.2064L17 14.2H15V12.2L14.9936 12.1281C14.9639 11.9648 14.8352 11.8361 14.6719 11.8064L14.6 11.8ZM14.8 4.2H5.6C4.8268 4.2 4.2 4.8268 4.2 5.6V6.2H16.2V5.6C16.2 4.8268 15.5732 4.2 14.8 4.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-calendar-add-v3-5-0"; }
};
WppIconCalendarAdd.style = wppIconCss;

export { WppIconCalendarAdd as wpp_icon_calendar_add };

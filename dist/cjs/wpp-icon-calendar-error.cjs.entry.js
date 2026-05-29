'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCalendarError = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-calendar-error", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M14.8 3C16.2359 3 17.4 4.16406 17.4 5.6V10.2175C17.0294 9.9802 16.6268 9.78867 16.2 9.6508V7.4H4.2V14.8C4.2 15.5732 4.8268 16.2 5.6 16.2H9.6508C9.78867 16.6268 9.9802 17.0294 10.2175 17.4H5.6C4.16406 17.4 3 16.2359 3 14.8V5.6C3 4.16406 4.16406 3 5.6 3H14.8ZM14.8 4.2H5.6C4.8268 4.2 4.2 4.8268 4.2 5.6V6.2H16.2V5.6C16.2 4.8268 15.5732 4.2 14.8 4.2ZM19 14.6C19 17.0301 17.0301 19 14.6 19C12.1699 19 10.2 17.0301 10.2 14.6C10.2 12.1699 12.1699 10.2 14.6 10.2C17.0301 10.2 19 12.1699 19 14.6ZM14.6 11.8C14.3791 11.8 14.2 11.9791 14.2 12.2V15.4C14.2 15.6209 14.3791 15.8 14.6 15.8C14.8209 15.8 15 15.6209 15 15.4V12.2C15 11.9791 14.8209 11.8 14.6 11.8ZM14.6 17.5C14.8761 17.5 15.1 17.2761 15.1 17C15.1 16.7239 14.8761 16.5 14.6 16.5C14.3239 16.5 14.1 16.7239 14.1 17C14.1 17.2761 14.3239 17.5 14.6 17.5Z", fill: "currentColor" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-calendar-error-v4-1-0"; }
};
WppIconCalendarError.style = wppIconCss;

exports.wpp_icon_calendar_error = WppIconCalendarError;

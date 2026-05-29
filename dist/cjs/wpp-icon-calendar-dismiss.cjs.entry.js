'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCalendarDismiss = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-calendar-dismiss", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M14.6 10.2C17.0301 10.2 19 12.1699 19 14.6C19 17.0301 17.0301 19 14.6 19C12.1699 19 10.2 17.0301 10.2 14.6C10.2 12.1699 12.1699 10.2 14.6 10.2ZM12.619 12.6193C12.4628 12.7755 12.4628 13.0288 12.619 13.185L14.0344 14.6008L12.6211 16.014C12.4649 16.1702 12.4649 16.4235 12.6211 16.5797C12.7773 16.7359 13.0306 16.7359 13.1868 16.5797L14.6 15.1664L16.0155 16.5815C16.1717 16.7377 16.425 16.7377 16.5812 16.5815C16.7374 16.4253 16.7374 16.172 16.5812 16.0158L15.1664 14.6008L16.5834 13.185C16.7396 13.0288 16.7396 12.7756 16.5834 12.6193C16.4272 12.4631 16.1739 12.4631 16.0177 12.6193L14.6008 14.0352L13.1847 12.6193C13.0285 12.4631 12.7752 12.4631 12.619 12.6193ZM14.8 3C16.2359 3 17.4 4.16406 17.4 5.6L17.401 10.2181C17.0302 9.9806 16.6274 9.78889 16.2003 9.65091L16.2 7.4H4.2V14.8C4.2 15.5732 4.8268 16.2 5.6 16.2L9.65091 16.2003C9.78889 16.6274 9.9806 17.0302 10.2181 17.401L5.6 17.4C4.16406 17.4 3 16.2359 3 14.8V5.6C3 4.16406 4.16406 3 5.6 3H14.8ZM14.8 4.2H5.6C4.8268 4.2 4.2 4.8268 4.2 5.6V6.2H16.2V5.6C16.2 4.8268 15.5732 4.2 14.8 4.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-calendar-dismiss-v4-1-0"; }
};
WppIconCalendarDismiss.style = wppIconCss;

exports.wpp_icon_calendar_dismiss = WppIconCalendarDismiss;

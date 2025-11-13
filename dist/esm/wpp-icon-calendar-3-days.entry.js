import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCalendar3Days = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-calendar-3-days", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.4722 3C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722ZM14.4722 4.16667H5.52778C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667ZM6.69444 6.11111C6.98976 6.11111 7.23383 6.33056 7.27245 6.61529L7.27778 6.69444V13.3056C7.27778 13.6277 7.01661 13.8889 6.69444 13.8889C6.39913 13.8889 6.15506 13.6694 6.11644 13.3847L6.11111 13.3056V6.69444C6.11111 6.37228 6.37228 6.11111 6.69444 6.11111ZM13.3056 6.11111C13.6009 6.11111 13.8449 6.33056 13.8836 6.61529L13.8889 6.69444V13.3056C13.8889 13.6277 13.6277 13.8889 13.3056 13.8889C13.0102 13.8889 12.7662 13.6694 12.7275 13.3847L12.7222 13.3056V6.69444C12.7222 6.37228 12.9834 6.11111 13.3056 6.11111ZM10 6.11111C10.2953 6.11111 10.5394 6.33056 10.578 6.61529L10.5833 6.69444V13.3056C10.5833 13.6277 10.3222 13.8889 10 13.8889C9.70468 13.8889 9.46062 13.6694 9.42199 13.3847L9.41667 13.3056V6.69444C9.41667 6.37228 9.67783 6.11111 10 6.11111Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-calendar-3-days-v3-3-1"; }
};
WppIconCalendar3Days.style = wppIconCss;

export { WppIconCalendar3Days as wpp_icon_calendar_3_days };

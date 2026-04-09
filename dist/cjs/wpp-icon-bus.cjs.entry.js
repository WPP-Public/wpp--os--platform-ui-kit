'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBus = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-bus", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M7 13.25C7.41421 13.25 7.75 12.9142 7.75 12.5C7.75 12.0858 7.41421 11.75 7 11.75C6.58579 11.75 6.25 12.0858 6.25 12.5C6.25 12.9142 6.58579 13.25 7 13.25Z", fill: "currentColor" }), index.h("path", { d: "M13.75 12.5C13.75 12.9142 13.4142 13.25 13 13.25C12.5858 13.25 12.25 12.9142 12.25 12.5C12.25 12.0858 12.5858 11.75 13 11.75C13.4142 11.75 13.75 12.0858 13.75 12.5Z", fill: "currentColor" }), index.h("path", { d: "M8 5.5C8 5.08579 8.33579 4.75 8.75 4.75H11.25C11.6642 4.75 12 5.08579 12 5.5C12 5.91421 11.6642 6.25 11.25 6.25H8.75C8.33579 6.25 8 5.91421 8 5.5Z", fill: "currentColor" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.25 4.75C3.25 3.23122 4.48122 2 6 2H14C15.5188 2 16.75 3.23122 16.75 4.75V7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H16.75V16.75C16.75 17.4404 16.1904 18 15.5 18H13.5C12.8096 18 12.25 17.4404 12.25 16.75V15.25H7.75V16.75C7.75 17.4404 7.19036 18 6.5 18H4.5C3.80964 18 3.25 17.4404 3.25 16.75V9.25H2.75C2.33579 9.25 2 8.91421 2 8.5C2 8.08579 2.33579 7.75 2.75 7.75H3.25V4.75ZM13.75 15.25V16.5H15.25V15.25H13.75ZM4.75 15.25H6.25V16.5H4.75V15.25ZM4.75 11.25V13.75H15.25V11.25H4.75ZM15.25 9.75H4.75V4.75C4.75 4.05964 5.30964 3.5 6 3.5H14C14.6904 3.5 15.25 4.05964 15.25 4.75V9.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bus-v4-0-0"; }
};
WppIconBus.style = wppIconCss;

exports.wpp_icon_bus = WppIconBus;
